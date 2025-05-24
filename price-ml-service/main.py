from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from controller import router as tea_prediction_router


app = FastAPI()
app.add_middleware(
    CORSMiddleware, 
    allow_origins=["*"] ,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"] 

)

app.include_router(tea_prediction_router , prefix="/tea-project")