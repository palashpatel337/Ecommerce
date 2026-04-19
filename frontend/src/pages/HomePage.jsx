
import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Card, Checkbox, Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Prices } from "../components/Price";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useCart } from "../context/Cart";

const { Meta } = Card;

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      if (data?.success) {
        setProducts(data?.products || []);
        // setPage(1);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-count`);
      if (data?.success) setTotal(data.total);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts([...products, ...data?.products]);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"Best offers"}>
      <div className="flex flex-col lg:flex-row">
        {/* ================= FILTER SIDEBAR ================= */}
        <div className="hidden sm:block
          w-full lg:w-72
          lg:fixed lg:top-20 lg:h-[70vh] 
          border-r border-zinc-200
          bg-white z-10
        ">
          <h1 className="text-2xl m-4 pb-2 border-b">
            Filter By Category
          </h1>

          {categories?.map((c) => (
            <div className="mx-6 my-2" key={c._id}>
              <Checkbox
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            </div>
          ))}

          <h1 className="text-2xl m-4 pb-2 border-b">
            Filter By Price
          </h1>

          <Radio.Group
            onChange={(e) => setRadio(e.target.value)}
            className="mx-6"
          >
            {Prices?.map((p) => (
              <div key={p._id} className="my-2">
                <Radio value={p.array}>{p.name}</Radio>
              </div>
            ))}
          </Radio.Group>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <div className="w-full lg:ml-80 px-4">
          {/* ================= HERO ================= */}
          <section className="flex justify-center bg-gray-50 py-6">
            <div className="w-full max-w-6xl rounded-2xl bg-white shadow-lg px-6 py-6">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-600">
                    ✨ New Season • Premium Picks
                  </span>

                  <h1 className="mt-4 text-3xl font-extrabold">
                    Elevate Your Everyday Style
                  </h1>

                  <p className="mt-2 text-sm text-gray-600">
                    Curated essentials and unbeatable deals — only on{" "}
                    <span className="font-semibold">muin</span>.
                  </p>

                  <div className="mt-4 flex gap-3">
                    <button className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700">
                      Shop Now
                    </button>
                    <button className="rounded-lg border px-6 py-2 text-sm font-semibold hover:bg-gray-100">
                      Explore
                    </button>
                  </div>
                </div>

                <div className="hidden md:flex justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
                    alt="Product"
                    className="h-44 rounded-xl object-cover shadow-md"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* ================= PRODUCT GRID ================= */}
          <div className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            lg:m-b-[2000px]
            mb-5
          ">
            {products?.map((p) => (
              <Card
                key={p._id}
                hoverable
                className="w-full"
                style={{
                  padding: 16,
                  backgroundColor: "rgba(243,247,252,0.37)",
                }}
                cover={
                  <img
                    alt={p.name}
                    src={`/api/v1/product/get-photo/${p._id}`}
                  />
                }
                actions={[
                  <button
                    className="bg-indigo-600 text-white px-3 py-2 rounded-lg"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    Details
                  </button>,
                  <button
                    className="border px-3 py-2 rounded-lg"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                    }}
                  >
                    Add
                  </button>,
                ]}
              >
                <Meta title={p.name} description={p.description} />
                <p className="flex items-center mt-2 font-semibold">
                  <LiaRupeeSignSolid />
                  <span className="ml-1">{p.price}</span>
                </p>
              </Card>
            ))}
          </div>

          {/* ================= LOAD MORE ================= */}
          {products.length < total && (
            <div className="flex justify-center my-6">
              <button
                className="bg-yellow-500 px-6 py-2 rounded-md"
                onClick={() => setPage(page + 1)}
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
