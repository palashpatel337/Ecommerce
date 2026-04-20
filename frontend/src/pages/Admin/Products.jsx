import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { Link } from "react-router-dom";
import {Card} from "antd";
import { toast } from "react-toastify";


const {Meta} = Card;

const Products = () => {

  const [products,setProducts] = useState([]);

  const getAllProducts = async() => {
    try {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product`)

      if (data?.success){
        setProducts(data.products)
        console.log(data?.products);
        
      } 
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

useEffect(() => {
  getAllProducts()
}, []);

  return (
    <Layout>
      <div className=" grid grid-cols-4">
        <div className="px-5 h-full col-span-1 text-xl border-r-5 border-zinc-300">
          <AdminMenu></AdminMenu>
        
        </div>

        <div className=" col-span-3 p-5 mr-5">
            <h1 className="text-4xl p-5">All Products</h1>
            <div className=" w-full grid grid-cols-4 mr-5">
              {products?.map((p) =>(
                <Link key={p._id} to={`/dashboard/admin/update-product/${p.slug}`} className="h-full w-full col-span-1 mb-5">
                  <div className="m-2 ">
                    <Card
                      className="object-contain"
                      hoverable
                      style={{padding: 20 }}
                      cover={<img alt={p.name} src={p?.photo?.data} />} 
                    >
                      <Meta title={p.name} description={p.description} />
                    </Card>
                    
                  </div>
                </Link>
              ))}
            </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
