'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const cardElementOptions = {
  style: {
    base: {
      fontSize: '14px',
      color: '#232f3e',
      fontFamily: 'Amazon Ember, Arial, sans-serif',
      '::placeholder': {
        color: '#767676',
      },
    },
    invalid: {
      color: '#d13212',
    },
  },
  hidePostalCode: true,
};

function CheckoutForm({ onClose, onPurchaseSuccess }) {
  const { user } = useAuthContext();
  const stripe = useStripe();
  const elements = useElements();

  const [selectedPackage, setSelectedPackage] = useState(1000);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tokenPackages = [
    { tokens: 1000, price: 1.00, label: '1,000 tokens' },
    { tokens: 2500, price: 2.00, label: '2,500 tokens', savings: '20% bonus' },
    { tokens: 5000, price: 3.50, label: '5,000 tokens', savings: '43% bonus' },
    { tokens: 10000, price: 6.00, label: '10,000 tokens', savings: '67% bonus' }
  ];

  const selectedPrice = tokenPackages.find(pkg => pkg.tokens === selectedPackage)?.price || 1.00;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !user) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.uid,
          amount: Math.round(selectedPrice * 100),
        }),
      });

      const { clientSecret } = await res.json();
      if (!clientSecret) throw new Error('Payment initialization failed.');

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: { 
            email: user.email,
            name: user.displayName || user.email 
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        const updateRes = await fetch('/api/update-tokens', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.uid, coins: selectedPackage }),
        });

        const updateData = await updateRes.json();
        if (updateData.success) {
          toast.success(`${selectedPackage.toLocaleString()} tokens added successfully`);
          onPurchaseSuccess(updateData.newTokenCount);
          onClose();
        } else {
          setError('Payment processed but token update failed. Please contact support.');
        }
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment failed. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Purchase Tokens</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Token Package Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select package
            </label>
            <div className="space-y-2">
              {tokenPackages.map((pkg) => (
                <label
                  key={pkg.tokens}
                  className={`flex items-center justify-between p-3 border rounded cursor-pointer hover:bg-gray-50 ${
                    selectedPackage === pkg.tokens
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="package"
                      value={pkg.tokens}
                      checked={selectedPackage === pkg.tokens}
                      onChange={(e) => setSelectedPackage(parseInt(e.target.value))}
                      className="mr-3 text-blue-600"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {pkg.label}
                      </div>
                      {pkg.savings && (
                        <div className="text-xs text-green-600">{pkg.savings}</div>
                      )}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-900">
                    ${pkg.price.toFixed(2)}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment information
            </label>
            <div className="border border-gray-300 rounded px-3 py-2 focus-within:border-blue-500">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded p-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">
                {tokenPackages.find(pkg => pkg.tokens === selectedPackage)?.label}
              </span>
              <span className="font-medium">${selectedPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mt-1 text-sm font-medium border-t pt-2 mt-2">
              <span>Total</span>
              <span>${selectedPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 disabled:opacity-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!stripe || loading}
              className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : `Pay $${selectedPrice.toFixed(2)}`}
            </button>
          </div>

          {/* Security Notice */}
          <p className="text-xs text-gray-500 text-center">
            Secure payment powered by Stripe
          </p>
        </form>
      </div>
    </div>
  );
}

export default function BuyCoins({ onClose, onPurchaseSuccess }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm onClose={onClose} onPurchaseSuccess={onPurchaseSuccess} />
    </Elements>
  );
}