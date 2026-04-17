import React, { useEffect, useState } from "react";
import braintree from "braintree-web";
import axios from "axios";

export default function CustomBraintreeForm({ cart, onSuccess }) {
  const [clientToken, setClientToken] = useState("");
  const [hostedFieldsInstance, setHostedFieldsInstance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get client token from backend
  useEffect(() => {
    const fetchToken = async () => {
      try {
        const { data } = await axios.get("/api/v1/product/braintree/token");
        setClientToken(data?.clientToken);
      } catch (err) {
        console.error("Error getting client token:", err);
      }
    };
    fetchToken();
  }, []);

  // Initialize Hosted Fields after token is fetched
  useEffect(() => {
    if (clientToken) {
      braintree.client.create({ authorization: clientToken }, (err, clientInstance) => {
        if (err) return console.error("Braintree Client Error:", err);

        braintree.hostedFields.create(
          {
            client: clientInstance,
            styles: {
              input: { "font-size": "16px", color: "#333" },
              "input.invalid": { color: "red" },
              "input.valid": { color: "green" },
            },
            fields: {
              number: { selector: "#card-number", placeholder: "4111 1111 1111 1111" },
              cvv: { selector: "#cvv", placeholder: "123" },
              expirationDate: { selector: "#expiration-date", placeholder: "MM/YY" },
            },
          },
          (err, hf) => {
            if (err) return console.error("Hosted Fields Error:", err);
            setHostedFieldsInstance(hf);
          }
        );
      });
    }
  }, [clientToken]);

  const handlePayment = () => {
    if (!hostedFieldsInstance) return;

    setLoading(true);
    hostedFieldsInstance.tokenize(async (err, payload) => {
      if (err) {
        console.error("Tokenization Error:", err);
        setLoading(false);
        return;
      }
      console.log("✅ Nonce:", payload.nonce);

      try {
        const { data } = await axios.post("/api/v1/product/braintree/payment", {
          nonce: payload.nonce,
          cart,
        });
        console.log("Payment Response:", data);

        setLoading(false);
        if (data.success) {
          onSuccess();
          alert("Payment Successful ✅");
        } else {
          alert("Payment Failed ❌");
        }
      } catch (error) {
        console.error("Payment API Error:", error);
        setLoading(false);
      }
    });
  };

  return (
    <div className="border p-4 rounded-lg shadow-md bg-white">
      <h2 className="text-xl mb-3">Pay with Card</h2>

      <div id="card-number" className="border p-2 rounded mb-2"></div>
      <div id="expiration-date" className="border p-2 rounded mb-2"></div>
      <div id="cvv" className="border p-2 rounded mb-2"></div>

      <button
        onClick={handlePayment}
        disabled={!hostedFieldsInstance || loading}
        className="bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
}
