// import React, { useEffect, useState } from "react";
// import Layout from "../components/Layout/Layout";
// import { useCart } from "../context/Cart";
// import { useAuth } from "../context/Auth";
// import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
// import axios from "axios";
// import CustomBraintreeForm from "../components/CustomBraintreeForm";


// const CartPage = () => {
//   const [cart, setCart] = useCart([]);
//   const [auth, setAuth] = useAuth();
//   const [clientToken, setClientToken] = useState('');
//   const [instance, setInstance] = useState(null);
//   const [loading, setLoading] = useState(false)
//     const [amount, setAmount] = useState(500);

//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   const handlePayment = async () => {
//     const res = await loadRazorpayScript();

//     if (!res) {
//       alert("Razorpay SDK failed to load. Check your internet.");
//       return;
//     }

//     // Step 1: Create order from backend
//     const orderResponse = await fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/api/payment/create-order`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ amount }),
//       }
//     );

//     const orderData = await orderResponse.json();

//     if (!orderData.success) {
//       alert("Order creation failed");
//       return;
//     }

//     const options = {
//       key: orderData.key,
//       amount: orderData.order.amount,
//       currency: orderData.order.currency,
//       name: "My Ecommerce Store",
//       description: "Test Payment",
//       order_id: orderData.order.id,

//       handler: async function (response) {
//         // Step 2: Verify payment from backend
//         const verifyResponse = await fetch(
//           `${import.meta.env.VITE_BACKEND_URL}/api/payment/verify-payment`,
//           {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               amount: amount,
//               userEmail: "test@gmail.com",
//               userName: "Palash Patel",
//             }),
//           }
//         );

//         const verifyData = await verifyResponse.json();

//         if (verifyData.success) {
//           alert("Payment Successful & Verified!");
//           console.log("Payment Saved:", verifyData.payment);
//         } else {
//           alert("Payment Verification Failed!");
//         }
//       },

//       prefill: {
//         name: "Palash Patel",
//         email: "test@gmail.com",
//         contact: "9999999999",
//       },

//       theme: {
//         color: "#3399cc",
//       },
//     };

//     const paymentObject = new window.Razorpay(options);
//     paymentObject.open();
//   };



//   console.log(cart)
//   const navigate = useNavigate();

//   const removeCartItem = async (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);

//       if (index !== -1) {
//         myCart.splice(index, 1);
//         setCart(myCart);
//         localStorage.setItem("cart", JSON.stringify(myCart));
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };


//   const totalPrice = () => {
//     let total = 0;
//     cart.map((item) => {
//       total = total + item.price;
//     });
//     return total;
//   };


//   return (
//     <Layout>
//       <div className="m-5 relative h-300">        
//         <div className="grid grid-cols-6 ">
//           {cart.map((p) => (
//             <div
//               className="col-span-4 mx-10 h-60 flex border-1 border-zinc-200 rounded-sm p-3 shadow-xl/10 "
//               key={p._id}
//             >
//               <div className="w-50 ">
//                 <img alt={p.name} src={p?.photo} />
//               </div>
//               <div className="px-5">
//                 <h1>{p.name}</h1>
//                 <h1>{p.price}</h1>
//                 <h1>{p?.description}</h1>
//                 <button
//                   className="bg-red-500 p-1 rounded-md mt-3 text-white"
//                   onClick={() => removeCartItem(p._id)}
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="col-span-2 text-center absolute top-0 right-0 p-10">
//           <div className="text-center">
//           <h1>{`Hello ${auth?.token && auth?.user?.name}`}</h1>
//           <div className="m-5">
//             {cart?.length > 1
//               ? `You have ${cart.length} items in your cart ${
//                   auth?.token ? "" : "please login to checkout"
//                 }.`
//               : "Your cart is empty"}
//           </div>
//         </div>

//             <h1 className="text-3xl mb-3">Cart Summary</h1>
//             <h1 className="mb-2">Total | Checkout | Payment</h1>
//             <hr />
//             <div className="h1 my-2 text-2xl">
//               <h1>Total</h1>
//               <h5>
//                 {totalPrice().toLocaleString("en-IN", {
//                   style: "currency",
//                   currency: "INR",
//                 })}
//               </h5>
//             </div>
//             {auth?.user?.address ? (
//               <>
//                 <div className="my-5 text-xl">
//                   <h1 className="text-3xl">Current Address</h1>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     className="bg-yellow-600 text-white rounded-md p-1 text-sm "
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <button
//                     className="bg-yellow-600 text-white rounded-md p-1 text-sm "
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="bg-yellow-600 text-white rounded-md p-1 text-sm tracking-lighter"
//                     onClick={() => navigate("/login", { state: "/cart" })}
//                   >
//                     Please Login To Checkout
//                   </button>
//                 )}
//               </div>
//             )}
//               <div className="mb-5 h-100">
//                 <CustomBraintreeForm
//                 cart={cart}
//                 onSuccess={() => {
//                   localStorage.removeItem("cart");
//                   setCart([]);
//                   navigate("/dashboard/user/orders");
//                 }}
//               />

//               </div>
//           </div>
//         </div>
//       </div>
//           <div style={{ padding: "50px" }}>
//       <h2>Checkout Page</h2>

//       <h3>Pay ₹{amount}</h3>

//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(Number(e.target.value))}
//         style={{ padding: "10px", marginBottom: "10px" }}
//       />

//       <br />

//       <button
//         onClick={handlePayment}
//         style={{
//           padding: "12px 20px",
//           background: "green",
//           color: "white",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Pay Now
//       </button>
//     </div>

//     </Layout>
//   );
// };

// export default CartPage;


import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cart, setCart] = useCart([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Remove item from cart
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

  // Total price
  const totalPrice = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  // Razorpay Payment
  const handlePayment = async () => {
    try {
      if (!auth?.token) {
        alert("Please login to checkout");
        navigate("/login", { state: "/cart" });
        return;
      }

      if (!auth?.user?.address) {
        alert("Please update your address before payment");
        navigate("/dashboard/user/profile");
        return;
      }

      if (cart.length === 0) {
        alert("Cart is empty");
        return;
      }

      setLoading(true);

      const res = await loadRazorpayScript();

      if (!res) {
        alert("Razorpay SDK failed to load. Check your internet.");
        setLoading(false);
        return;
      }

      const amount = totalPrice();

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
        setLoading(false);
        return;
      }

      const options = {
        key: orderData.key,
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: "My Ecommerce Store",
        description: "Order Payment",
        order_id: orderData.order.id,

        handler: async function (response) {
          // Step 2: Verify payment
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
                userEmail: auth?.user?.email,
                userName: auth?.user?.name,
                cartItems: cart,
              }),
            }
          );

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            alert("Payment Successful!");

            // Clear cart
            localStorage.removeItem("cart");
            setCart([]);

            // Redirect to orders page
            navigate("/dashboard/user/orders");
          } else {
            alert("Payment Verification Failed!");
          }

          setLoading(false);
        },

        prefill: {
          name: auth?.user?.name,
          email: auth?.user?.email,
          contact: auth?.user?.phone || "9999999999",
        },

        theme: {
          color: "#16a34a", // green
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.log(error);
      alert("Something went wrong in payment");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="m-5 relative">
        <div className="grid grid-cols-6 gap-5">
          {/* CART ITEMS */}
          <div className="col-span-4">
            {cart.map((p) => (
              <div
                className="mx-10 mb-5 h-60 flex border border-zinc-200 rounded-sm p-3 shadow-md"
                key={p._id}
              >
                <div className="w-40">
                  <img
                    alt={p.name}
                    src={p?.photo}
                    className="h-40 w-40 object-cover rounded-md"
                  />
                </div>

                <div className="px-5 flex flex-col justify-between">
                  <div>
                    <h1 className="text-xl font-bold">{p.name}</h1>
                    <h1 className="text-lg text-green-600 font-semibold">
                      ₹ {p.price}
                    </h1>
                    <p className="text-sm text-gray-600">{p?.description}</p>
                  </div>

                  <button
                    className="bg-red-500 p-2 rounded-md text-white w-24"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* CART SUMMARY */}
          <div className="col-span-2 bg-white border border-zinc-200 shadow-md rounded-md p-5 h-fit">
            <div className="text-center mb-4">
              <h1 className="text-xl font-semibold">
                Hello {auth?.token && auth?.user?.name}
              </h1>

              <p className="text-gray-600 mt-2">
                {cart?.length > 0
                  ? `You have ${cart.length} items in your cart.`
                  : "Your cart is empty"}
              </p>
            </div>

            <h1 className="text-2xl font-bold mb-2">Cart Summary</h1>
            <hr />

            <div className="my-4 text-lg">
              <h1 className="font-semibold">Total Amount</h1>
              <h5 className="text-green-600 text-xl font-bold">
                {totalPrice().toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </h5>
            </div>

            <hr />

            {/* ADDRESS SECTION */}
            {auth?.user?.address ? (
              <div className="my-4 text-sm">
                <h1 className="text-lg font-bold">Delivery Address</h1>
                <p className="text-gray-600">{auth?.user?.address}</p>

                <button
                  className="bg-yellow-600 text-white rounded-md px-3 py-2 text-sm mt-2"
                  onClick={() => navigate("/dashboard/user/profile")}
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="my-4">
                {auth?.token ? (
                  <button
                    className="bg-yellow-600 text-white rounded-md px-3 py-2 text-sm w-full"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="bg-yellow-600 text-white rounded-md px-3 py-2 text-sm w-full"
                    onClick={() => navigate("/login", { state: "/cart" })}
                  >
                    Please Login To Checkout
                  </button>
                )}
              </div>
            )}

            {/* PAYMENT BUTTON */}
            <button
              onClick={handlePayment}
              disabled={loading || cart.length === 0}
              className={`w-full py-3 rounded-md text-white font-semibold mt-4 ${
                loading || cart.length === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Processing Payment..." : "Pay with Razorpay"}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;