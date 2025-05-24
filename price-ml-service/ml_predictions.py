import os
import joblib
import pandas as pd
from datetime import datetime
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TeaPricePredictor:
    def __init__(self, model_dir = os.path.join(os.path.dirname(__file__), 'models')):
        """
        Initialize the TeaPricePredictor with the directory containing the saved models.

        Args:
            model_dir (str): Path to the directory containing the saved Prophet models
        """
        self.model_dir = model_dir
        self._validate_model_directory()

    def _validate_model_directory(self):
        """Validate that the model directory exists and contains required model files."""
        if not os.path.exists(self.model_dir):
            raise FileNotFoundError(f"Model directory not found: {self.model_dir}")

    def _load_model(self, region_name):
        """
        Load a specific region's model from disk.

        Args:
            region_name (str): Name of the region (will be converted to lowercase for filename)

        Returns:
            Prophet model object
        """
        model_path = os.path.join(self.model_dir, f'{region_name.lower()}_model.joblib')
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found: {model_path}")
        return joblib.load(model_path)

    def _format_predictions(self, forecast_df, periods=3):
        """
        Format the predictions into a clean DataFrame with only required columns.

        Args:
            forecast_df (DataFrame): Raw forecast DataFrame from Prophet
            periods (int): Number of future periods to include

        Returns:
            DataFrame with formatted predictions
        """
        result = forecast_df.tail(periods)[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]
        result = result.round(2)
        result['ds'] = result['ds'].dt.strftime('%Y-%m-%d')
        return result

    def predict_nuwara_eliya(self, periods=3):
        """
        Make predictions for Nuwara Eliya region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('nuwara_eliya')
            future = model.make_future_dataframe(periods=periods, freq='ME')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Nuwara Eliya: {str(e)}")
            raise

    def predict_dimbula(self, periods=3):
        """
        Make predictions for Dimbula region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('dimbula')
            future = model.make_future_dataframe(periods=periods, freq='M')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Dimbula: {str(e)}")
            raise

    def predict_kandy(self, periods=3):
        """
        Make predictions for Kandy region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('kandy')
            future = model.make_future_dataframe(periods=periods, freq='M')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Kandy: {str(e)}")
            raise

    def predict_sabaragamuwa(self, periods=3):
        """
        Make predictions for Sabaragamuwa region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('sabaragamuwa')
            future = model.make_future_dataframe(periods=periods, freq='M')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Sabaragamuwa: {str(e)}")
            raise

    def predict_udapussellawa(self, periods=3):
        """
        Make predictions for Udapussellawa region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('udapussellawa')
            future = model.make_future_dataframe(periods=periods, freq='M')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Udapussellawa: {str(e)}")
            raise

    def predict_uva(self, periods=3):
        """
        Make predictions for Uva region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('uva')
            future = model.make_future_dataframe(periods=periods, freq='M')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Uva: {str(e)}")
            raise

    def predict_ruhuna(self, periods=3):
        """
        Make predictions for Ruhuna region.

        Args:
            periods (int): Number of months to forecast (default: 3)

        Returns:
            DataFrame containing the predictions with confidence intervals
        """
        try:
            model = self._load_model('ruhuna')
            future = model.make_future_dataframe(periods=periods, freq='M')
            forecast = model.predict(future)
            return self._format_predictions(forecast, periods)
        except Exception as e:
            logger.error(f"Error predicting for Ruhuna: {str(e)}")
            raise

# # Example usage
# if __name__ == "__main__":
#     predictor = TeaPricePredictor()

#     # Example of making predictions for each region
#     try:
#         print("\nNuwara Eliya Predictions:")
#         print(predictor.predict_nuwara_eliya(periods=10))

#         print("\nDimbula Predictions:")
#         print(predictor.predict_dimbula())

#         print("\nKandy Predictions:")
#         print(predictor.predict_kandy())

#         print("\nSabaragamuwa Predictions:")
#         print(predictor.predict_sabaragamuwa())

#         print("\nUdapussellawa Predictions:")
#         print(predictor.predict_udapussellawa())

#         print("\nUva Predictions:")
#         print(predictor.predict_uva())

#         print("\nRuhuna Predictions:")
#         print(predictor.predict_ruhuna())

#     except Exception as e:
#         logger.error(f"Error during prediction: {str(e)}")