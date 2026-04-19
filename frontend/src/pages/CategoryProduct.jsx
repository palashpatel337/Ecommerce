import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Button, Card } from "antd";
import { LiaRupeeSignSolid } from "react-icons/lia";

const { Meta } = Card;

const CategoryProduct = () => {
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState();

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/category-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  return (
    <Layout>
      <div className="m-10 text-3xl">
        <div className="text-center ">
          <h1>Category- {category?.name}</h1>
          <h1>{products?.length} results found</h1>
        </div>
        <div className=" w-full grid grid-cols-3 p-">
          {products?.map((p) => (
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
                      type="ghost"
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
      </div>
    </Layout>
  );
};

export default CategoryProduct;
