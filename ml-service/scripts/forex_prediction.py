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
LOW_PROD_RANGE = range(100000, 500001, 50000)  # Low-grown production range

def predict_fee(data):
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

        # Define realistic constraints for production volumes
        high_range = np.arange(8500000, 9000000, 50000)  # Step size = 50k
        medium_range = np.arange(3500000, 4000000, 50000)
        low_range = np.arange(17000000, 18000000, 50000)

        # Create all possible combinations of production volumes
        grid = np.array(np.meshgrid(high_range, medium_range, low_range)).T.reshape(-1, 3)
        high_values, medium_values, low_values = grid[:, 0], grid[:, 1], grid[:, 2]

        # Create a DataFrame for all combinations
        input_df = pd.DataFrame({
            "Year": year,
            "Month": month,
            "Export_Quantity_(Kg)": export_quantity,
            "Export_Price_(Rs.)": export_price,
            "High_Grown_Quantity_(Kg)": high_values,
            "Medium_Grown_Quantity_(Kg)": medium_values,
            "Low_Grown_Quantity_(Kg)": low_values,
            "Avg_Exchange_Rate": exchange_rate
        })

        # Predict FEE for all combinations
        predictions = model.predict(input_df)

       # Find the combination with the maximum FEE
        max_index = np.argmax(predictions)
        max_fee = float(predictions[max_index])  
        best_high = int(high_values[max_index]) 
        best_medium = int(medium_values[max_index]) 
        best_low = int(low_values[max_index]) 

        # Return the prediction results
        return {
            "HighGrownProduction": best_high,
            "MediumGrownProduction": best_medium,
            "LowGrownProduction": best_low,
            "maxFEE": max_fee,
        }

    except Exception as e:
        raise ValueError(f"Error in prediction logic: {str(e)}")
