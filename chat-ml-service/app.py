from flask import Flask, render_template, request
from rag_utils import load_csv_data, prepare_vectorstore, get_llm, build_qa_chain, get_retriever
import os

app = Flask(__name__)

# First-time setup
if not os.path.exists("db"):
    docs = load_csv_data()
    prepare_vectorstore(docs)

retriever = get_retriever()

@app.route("/", methods=["GET", "POST"])
def index():
    answer = ""
    sources = []
    if request.method == "POST":
        query = request.form["query"]
        model = request.form["model"]
        llm = get_llm(model)
        chain = build_qa_chain(llm, retriever)
        result = chain({"query": query})
        answer = result["result"]
        sources = [doc.metadata["source"] for doc in result["source_documents"]]

    return render_template("index.html", answer=answer, sources=sources)

if __name__ == "__main__":
    app.run(debug=True)
