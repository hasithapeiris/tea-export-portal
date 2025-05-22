from flask import Flask, request, jsonify
from flask_cors import CORS
from scripts.forex_prediction import predict_fee
from scripts.forex_pred_grid import predict_best_fee

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    if not data:
        return jsonify({"message": "Invalid input"}), 400

    try:
        result = predict_fee(data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)