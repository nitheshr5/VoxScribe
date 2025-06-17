import { loadStripe } from '@stripe/stripe-js';

export default function BuyCoins() {
  const handleBuy = async () => {
    const res = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const data = await res.json();
    const stripe = await loadStripe('pk_test_51RQsyoJ7btJJkAlCvSmhLenAxaiz8zx3NY716zyN0c1ARZubAuOH72zft4yHNNgq0mLarV1ENKgPonFxMNBVZwBK002417VYds');
    if (stripe) {
      stripe.redirectToCheckout({ sessionId: data.sessionId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-10">
      <h2 className="text-2xl mb-4">Buy More Coins</h2>
      <button
        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
        onClick={handleBuy}
      >
        Buy 10,000 Coins - $5
      </button>
    </div>
  );
}
