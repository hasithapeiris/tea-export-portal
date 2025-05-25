import os
import pandas as pd
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain.schema import Document
from langchain.text_splitter import CharacterTextSplitter
from langchain.prompts import PromptTemplate
from langchain_community.llms import OpenAI
from langchain_community.llms import Ollama
from dotenv import load_dotenv

load_dotenv()

def load_csv_data():
    # Load CSVs
    dfs = {
        "FEE": pd.read_csv("data/fee_forecast.csv"),
        "Elevation": pd.read_csv("data/elevation_forecast.csv"),
        "National": pd.read_csv("data/national_production.csv")
    }

    # Convert to single document string per file
    docs = []
    for name, df in dfs.items():
        content = f"{name} Data:\n" + df.to_csv(index=False)
        docs.append(Document(page_content=content, metadata={"source": name}))

    return docs

def prepare_vectorstore(docs):
    # Embeddings model (free)
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    chunks = text_splitter.split_documents(docs)

    # Chroma DB
    vectorstore = Chroma.from_documents(documents=chunks, embedding=embeddings, persist_directory="db")
    vectorstore.persist()
    return vectorstore

def get_retriever():
    # Load from persisted DB
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    return Chroma(persist_directory="db", embedding_function=embeddings).as_retriever()

# Define the RAG Chain
from langchain.chains import RetrievalQA

def get_llm(model="ollama"):
    if model == "openai":
        return OpenAI(temperature=0.2, openai_api_key=os.getenv("OPENAI_API_KEY"))
    elif model == "ollama":
        return Ollama(model="tinyllama")
    else:
        raise ValueError("Unsupported model")

def build_qa_chain(llm, retriever):
    prompt_template = PromptTemplate(
        input_variables=["context", "question"],
        template="""
You are a helpful expert in Sri Lankan Tea Exports and Forecasts.
Use the below context (CSV forecast data) to answer the question.
If unsure, say "I don't know".

Context:
{context}

Question:
{question}

Answer:
"""
    )

    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt_template}
    )
