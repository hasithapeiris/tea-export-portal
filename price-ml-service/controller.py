from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from ml_predictions import TeaPricePredictor
from typing import Dict, List
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize predictor and router
predictor = TeaPricePredictor()
router = APIRouter()

# Request model
class PredictionRequest(BaseModel):
    periods: int = Field(
        default=3, 
        gt=0, 
        le=12,
        description="Number of months to forecast (1-12 months)"
    )

# Response model for each region
class RegionPrediction(BaseModel):
    date: str
    predicted_price: float
    lower_bound: float
    upper_bound: float

# Response model for all predictions
class PredictionResponse(BaseModel):
    nuwara_eliya: List[RegionPrediction]
    dimbula: List[RegionPrediction]
    kandy: List[RegionPrediction]
    sabaragamuwa: List[RegionPrediction]
    udapussellawa: List[RegionPrediction]
    uva: List[RegionPrediction]
    ruhuna: List[RegionPrediction]

def format_prediction(prediction_df) -> List[RegionPrediction]:
    """Helper function to format prediction DataFrame into response model"""
    return [
        RegionPrediction(
            date=row['ds'],
            predicted_price=row['yhat'],
            lower_bound=row['yhat_lower'],
            upper_bound=row['yhat_upper']
        )
        for _, row in prediction_df.iterrows()
    ]

@router.post("/predict", response_model=PredictionResponse)
async def predict_tea_prices(request: PredictionRequest):
    """
    Get tea price predictions for all regions
    """
    try:
        # Get predictions for all regions
        predictions = {
            'nuwara_eliya': format_prediction(predictor.predict_nuwara_eliya(periods=request.periods)),
            'dimbula': format_prediction(predictor.predict_dimbula(periods=request.periods)),
            'kandy': format_prediction(predictor.predict_kandy(periods=request.periods)),
            'sabaragamuwa': format_prediction(predictor.predict_sabaragamuwa(periods=request.periods)),
            'udapussellawa': format_prediction(predictor.predict_udapussellawa(periods=request.periods)),
            'uva': format_prediction(predictor.predict_uva(periods=request.periods)),
            'ruhuna': format_prediction(predictor.predict_ruhuna(periods=request.periods))
        }

        return PredictionResponse(**predictions)

    except Exception as e:
        logger.error(f"Error making predictions: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error making predictions: {str(e)}"
        )

# Health check endpoint
@router.get("/health")
async def health_check():
    """
    Health check endpoint to verify the service is running
    """
    return {"status": "healthy"}
