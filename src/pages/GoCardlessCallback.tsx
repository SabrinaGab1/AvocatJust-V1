import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GocardlessCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const access_token = sessionStorage.getItem("access_token");
    const subscription = sessionStorage.getItem("subscription_plan");
    const params = new URLSearchParams(window.location.search);
    const flowId = params.get("redirect_flow_id");
    console.log(subscription);

    async function completeFlow() {
      if (!flowId || !subscription) return;
      await fetch(`http://localhost:8000/gocardless/complete?flow_id=${flowId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${access_token}`
        }
      });

      // Call subscribe endpoint with the subscription plan
      const subscribe_response = await fetch(`http://localhost:8000/gocardless/subscribe?plan=${subscription}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${access_token}`,
          "Content-Type": "application/json"
        }
        //body: JSON.stringify({ plan: subscription })
      });
      const subscribe_data = await subscribe_response.json();
      console.log(subscribe_data);
      // Optionally handle subscribe_data

      navigate('/dashbord'); // or wherever you want
    }

    completeFlow();
  }, [navigate]);

  return <div>Traitement du paiement...</div>;
}