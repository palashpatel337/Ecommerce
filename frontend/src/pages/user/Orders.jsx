import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/Auth";
import AdminMenu from "../../components/Layout/AdminMenu";

const Orders = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/order/user-orders/${auth?.user?.email}`
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.user?.email) {
      getOrders();
    }
  }, [auth?.user?.email]);

  return (
    <Layout title={"Your Orders"}>
        <div className="h-auto w-auto">
            <AdminMenu/>
        </div>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-5">My Orders</h1>

        {orders.length === 0 ? (
          <h2 className="text-gray-600 text-lg">No Orders Found</h2>
        ) : (
          orders.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 shadow-md rounded-md p-5 mb-5"
            >
              <h2 className="text-xl font-bold text-green-700">
                Order Amount: ₹ {order.payment.amount}
              </h2>

              <p className="text-gray-600">
                Payment ID: {order.payment.paymentId}
              </p>

              <p className="text-gray-600">
                Order Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="text-gray-600">
                Status:{" "}
                <span className="font-semibold text-blue-600">
                  {order.payment.status}
                </span>
              </p>

              <hr className="my-3" />

              <h3 className="text-lg font-bold mb-2">Products</h3>

              {order.products.map((p, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b py-2"
                >
                  <span>{p.name}</span>
                  <span className="font-semibold text-green-600">
                    ₹ {p.price}
                  </span>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </Layout>
  );
};

export default Orders;