import React, { useState } from 'react';

type PaymentStepProps = {
  subscription: 'ENGAGEMENT' | 'SANS-ENGAGEMENT' | null;
  onNext: (data?: any) => void;
  onBack: () => void;
};

export default function PaymentStep({ subscription, onNext, onBack }: PaymentStepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Example: Call backend to create GoCardless payment session
  const handlePayment = async () => {
    setLoading(true);
    setError(null);
		const access_token = sessionStorage.getItem("access_token");
    try {
			// const address = {
			// 	street: "boulevard Jourdan",
			// 	city: "Paris",
			// 	state: "Paris",
			// 	postal_code: "75014",
			// 	country: "France"
			// };

			// const ad = await fetch("http://127.0.0.1:8000/user/address", {
			// 	method: "POST",
			// 	headers: {
			// 		"Authorization": `Bearer ${access_token}`,
			// 		"Content-Type": "application/json",
			// 		"accept": "application/json"
			// 	},
			// 	body: JSON.stringify(address)
			// });
			// console.log(ad.json())

      const response = await fetch("http://127.0.0.1:8000/gocardless/start-flow", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${access_token}`,
					"Content-Type": "application/json"
				}
			});
			
			const data = await response.json();
			console.log(data);
			if (data.redirect_url) {
        // Redirect user to GoCardless flow
				sessionStorage.setItem("subscription_plan", subscription ?? "");
  			window.location.href = data.redirect_url;
        return;
      } else {
        setError('Erreur lors de la création du paiement.');
      }

			const flowId = data.flow_id;
			console.log(flowId);
			const gocardless_response = await fetch(`http://localhost:8000/gocardless/complete?flow_id=${flowId}`, {
				method: "GET",
				headers: {
					"Authorization": `Bearer ${access_token}`
				}
			});
			const gocardless_data = await gocardless_response.json();
			console.log(gocardless_data);
			console.log(JSON.stringify({ plan: subscription }));
			
			const subscribe_response = await fetch("http://localhost:8000/gocardless/subscribe", {
				method: "POST",
				headers: {
					"Authorization": `Bearer ${access_token}`,
					"Content-Type": "application/json"
				},
				body: JSON.stringify({ plan: subscription }) // or "no_engagement"
			});
			const subscribe_data = await subscribe_response.json();
			// Show subscription confirmation, e.g. data.subscription_id

      if (subscribe_data){
				console.log("Payment confirmed")
				onNext({ paymentConfirmed: true });
			}else{
				setError('Erreur de paiement');
			}

    } catch (err) {
      setError('Erreur réseau ou serveur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Paiement par prélèvement SEPA</h2>
      <p>
        Vous allez être redirigé vers GoCardless pour valider votre mandat de prélèvement.
      </p>
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex space-x-4">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded bg-gray-200 text-gray-700"
          disabled={loading}
        >
          Retour
        </button>
        <button
          onClick={handlePayment}
          className="px-4 py-2 rounded bg-orange-500 text-white font-semibold"
          disabled={loading}
        >
          {loading ? 'Traitement...' : 'Continuer vers le paiement'}
        </button>
      </div>
    </div>
  );
}