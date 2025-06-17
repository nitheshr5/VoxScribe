from flask import Flask, request, jsonify
from flask_cors import CORS
import stripe
import os
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)
CORS(app)  # To allow requests from frontend

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

@app.route('/api/create-checkout-session', methods=['POST'])
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': '10,000 Coins',
                    },
                    'unit_amount': 500,  # 500 cents = $5
                },
                'quantity': 1,
            }],
            mode='payment',
            success_url='http://localhost:3000/success',
            cancel_url='http://localhost:3000/cancel',
        )
        return jsonify({'sessionId': session.id})
    except Exception as e:
        return jsonify(error=str(e)), 500

# Optional: run this if backend is standalone
if __name__ == '__main__':
    app.run(port=5000)
