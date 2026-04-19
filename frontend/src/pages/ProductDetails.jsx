import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Button, Card } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useCart } from "../context/Cart";

const { Meta } = Card;

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  const [cart, setCart] = useCart();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`,
      );
      setProduct(data?.product);
      getRelatedProduct(data?.product?._id, data?.product?.category?._id);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const getRelatedProduct = async (cid, pid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${cid}/${pid}`,
      );
      setRelated(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="grid grid-cols-8 flex border-b-2 border-zinc-200 pb-10">
        <div className="col-span-3 m-5">
          {product?._id ? (
            <img
              src={`/api/v1/product/get-photo/${product._id}`}
              alt={product.name}
              className="w-200 shadow-xl/50"
            />
          ) : (
            <h1>{product.namw}</h1>
          )}
        </div>
        <div className="col-span-3 m-5 ">
          <h1 className="text-center text-3xl">Product Details</h1>
          <h1>Name: {product?.name}</h1>
          <h1>Description: {product?.description}</h1>
          <h1 className="flex">
            Price: <LiaRupeeSignSolid /> {product?.price}
          </h1>
          <h1>Category: {product?.category?.slug}</h1>
          <Button
            onClick={() => {
              setCart([...cart, product]);
              localStorage.setItem("cart", JSON.stringify([...cart, product]));
            }}
            type="primary"
          >
            Add to Cart
          </Button>
        </div>
      </div>
      <div className=" mx-10 my-5 text-2xl">
        <h1>Similar Products</h1>
        {related?.length < 1 && (
          <p className="text-center text-xl">No similar products found</p>
        )}
        {related?.map((p) => (
          <Link
            key={p._id}
            to={`/product/${p.slug}`}
            className="h-full w-full col-span-1 mb-2 "
          >
            <div className="m-5 ">
              <Card
                hoverable
                style={{
                  width: 270,
                  padding: 20,
                  backgroundColor: "rgba(243, 247, 252, 0.37)",
                }}
                cover={
                  <img
                    alt={p.name}
                    src={`/api/v1/product/get-photo/${p._id}`}
                  />
                }
                actions={[
                  <Button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    type=""
                  >
                    More Details
                  </Button>,
                  <Button onClick={() => navigate(``)} type="ghost">
                    Add to Cart
                  </Button>,
                ]}
              >
                <Meta title={p.name} description={p.description} />
                <p className="flex mt-2">
                  <LiaRupeeSignSolid />
                  {p.price}
                </p>
              </Card>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default ProductDetails;
