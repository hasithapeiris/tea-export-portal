import pickle
import pandas as pd
from itertools import product
import numpy as np

# Load the trained model from a pickle file
MODEL_PATH = "models/forex_model.pickle"
with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

# Define realistic production volume ranges
HIGH_PROD_RANGE = range(100000, 500001, 50000)  # High-grown production range
MEDIUM_PROD_RANGE = range(100000, 500001, 50000)  # Medium-grown production range
LOW_PROD_RANGE = range(100000, 500001, 50000)

def predict_best_fee(data):
    """
    Calculate predicted production volumes and Foreign Exchange Earnings (FEE).
    
    :param data: Dictionary containing the input data.
    :return: Dictionary containing the predicted results.
    """
    try:
        # Extract input values
        year = int(data.get("year", 0))
        month = int(data.get("month", 0))
        export_quantity = data.get("exportQuantity", 0)
        export_price = data.get("exportPrice", 0)
        exchange_rate = data.get("exchangeRate", 0)

       # Initialize variables to track the best solution
        max_fee = -float("inf")
        best_production = {"high": 0, "medium": 0, "low": 0}

        # Perform Grid Search
        for high, medium, low in product(HIGH_PROD_RANGE, MEDIUM_PROD_RANGE, LOW_PROD_RANGE):
            # Combine current production values with other input features
            features = np.array([
                [
                    year,
                    month,
                    export_quantity,
                    export_price,
                    high,
                    medium,
                    low,
                    exchange_rate
                ]
            ])

        # Predict FEE using the model
        predicted_fee = model.predict(features)[0]

        # Update the best solution if current FEE is higher
        if predicted_fee > max_fee:
            max_fee = predicted_fee
            best_production = {"high": high, "medium": medium, "low": low}

        # Return the optimized results
        return {
            "HighGrownProduction": best_production["high"],
            "MediumGrownProduction": best_production["medium"],
            "LowGrownProduction": best_production["low"],
            "maxFEE": max_fee,
        }
    except Exception as e:
        raise ValueError(f"Error in prediction logic: {str(e)}")
