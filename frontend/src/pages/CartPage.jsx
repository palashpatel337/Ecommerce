import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import CustomBraintreeForm from "../components/CustomBraintreeForm";


const CartPage = () => {
  const [cart, setCart] = useCart([]);
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState('');
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false)
    const [amount, setAmount] = useState(500);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      alert("Razorpay SDK failed to load. Check your internet.");
      return;
    }

    // Step 1: Create order from backend
    const orderResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );

    const orderData = await orderResponse.json();

    if (!orderData.success) {
      alert("Order creation failed");
      return;
    }

    const options = {
      key: orderData.key,
      amount: orderData.order.amount,
      currency: orderData.order.currency,
      name: "My Ecommerce Store",
      description: "Test Payment",
      order_id: orderData.order.id,

      handler: async function (response) {
        // Step 2: Verify payment from backend
        const verifyResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: amount,
              userEmail: "test@gmail.com",
              userName: "Palash Patel",
            }),
          }
        );

        const verifyData = await verifyResponse.json();

        if (verifyData.success) {
          alert("Payment Successful & Verified!");
          console.log("Payment Saved:", verifyData.payment);
        } else {
          alert("Payment Verification Failed!");
        }
      },

      prefill: {
        name: "Palash Patel",
        email: "test@gmail.com",
        contact: "9999999999",
      },

      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };



  console.log(cart)
  const navigate = useNavigate();

  const removeCartItem = async (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);

      if (index !== -1) {
        myCart.splice(index, 1);
        setCart(myCart);
        localStorage.setItem("cart", JSON.stringify(myCart));
      }
    } catch (error) {
      console.log(error);
    }
  };


  const totalPrice = () => {
    let total = 0;
    cart.map((item) => {
      total = total + item.price;
    });
    return total;
  };


  return (
    <Layout>
      <div className="m-5 relative h-300">        
        <div className="grid grid-cols-6 ">
          {cart.map((p) => (
            <div
              className="col-span-4 mx-10 h-60 flex border-1 border-zinc-200 rounded-sm p-3 shadow-xl/10 "
              key={p._id}
            >
              <div className="w-50 ">
                <img alt={p.name} src={p?.photo} />
              </div>
              <div className="px-5">
                <h1>{p.name}</h1>
                <h1>{p.price}</h1>
                <h1>{p?.description}</h1>
                <button
                  className="bg-red-500 p-1 rounded-md mt-3 text-white"
                  onClick={() => removeCartItem(p._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="col-span-2 text-center absolute top-0 right-0 p-10">
          <div className="text-center">
          <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
          <div className="m-5">
            {cart?.length > 1
              ? `You have ${cart.length} items in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }.`
              : "Your cart is empty"}
          </div>
        </div>

            <h1 className="text-3xl mb-3">Cart Summary</h1>
            <h1 className="mb-2">Total | Checkout | Payment</h1>
            <hr />
            <div className="h1 my-2 text-2xl">
              <h1>Total</h1>
              <h5>
                {totalPrice().toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h5>
            </div>
            {auth?.user?.address ? (
              <>
                <div className="my-5 text-xl">
                  <h1 className="text-3xl">Current Address</h1>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="bg-yellow-600 text-white rounded-md p-1 text-sm "
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="bg-yellow-600 text-white rounded-md p-1 text-sm "
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="bg-yellow-600 text-white rounded-md p-1 text-sm tracking-lighter"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}
              {/* <div className="border border-zinc-300 rounded-lg shadow-md p-4 my-4 bg-white w-full max-w-md mx-auto">
                {clientToken && (
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      console.log("✅ DropIn instance:", instance);
                      setInstance(instance);
                    }}
                  />
                )}

                <button
                  className="bg-blue-600 text-white rounded-md p-1 text-sm tracking-lighter mt-3"
                  onClick={handlePayment}
                  disabled={!instance || loading}
                >
                  {loading ? "Processing..." : "Make Payment"}
                </button>
              </div> */}
              <div className="mb-5 h-100">
                <CustomBraintreeForm
                cart={cart}
                onSuccess={() => {
                  localStorage.removeItem("cart");
                  setCart([]);
                  navigate("/dashboard/user/orders");
                }}
              />

              </div>
          </div>
        </div>
      </div>
          <div style={{ padding: "50px" }}>
      <h2>Checkout Page</h2>

      <h3>Pay ₹{amount}</h3>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{ padding: "10px", marginBottom: "10px" }}
      />

      <br />

      <button
        onClick={handlePayment}
        style={{
          padding: "12px 20px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>

    </Layout>
  );
};

export default CartPage;
