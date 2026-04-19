import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("")

  const navigate = useNavigate();
  const params = useParams();

  const getSingleProduct = async() => {
    try {
        const {data} = await axios.get(`/api/v1/product/get-product/${params.slug}`)
        setName(data.product.name)
        setId(data.product._id)
        setPrice(data.product.price)
        setDescription(data.product.description)
        setShipping(data.product.shipping)
        setQuantity(data.product.quantity)
        setCategory(data.product.category._id)
        setPhoto(data.product.photo)
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong")
    }
  }

    useEffect(() => {
    getSingleProduct();
  }, []);


  //Get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      toast.error("Something went wrong in getting category");
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Create Product
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${id}`,
        productData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };


  //Delete Product
  const handleDelete = async() => {
    try {
      let answer = window.prompt("DELETE PRODUCT")
      if (!answer) return
      const {data} = await axios.delete(`/api/v1/product/delete-product/${id}`)
      toast.success(data.message)
      navigate('/dashboard/admin/products')
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className=" grid grid-cols-4">
        <div className="px-5 h-full col-span-1 text-xl border-r-5 border-zinc-300">
          <AdminMenu></AdminMenu>
        </div>
        <div className="p-5 col-span-2 mr-5">
          <h1 className="text-4xl p-5 ml-5 ">Update Product</h1>
          <div className="m-1 p-9 w-full">
            <Select
              placeholder="Select a category"
              size="large"
              className="form-select mb-3 w-200"
              onChange={(value) => {
                setCategory(value);
              }}
              showSearch
              value={category}
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-7 w-200">
              <label className="inline-block w-200 cursor-pointer text-center bg-zinc-200 text-zinc-500 border-2 border-zinc-300 rounded-md px-4 py-2 transition">
                {photo ? photo.name : "Change Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
            <div className="mt-7 ml-35 flex justify-center align-items-center">
              {photo ? (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="h-[200px] w-200"
                />
              ) : (
                <img
                  src={`/api/v1/product/get-photo/${id}`}
                  alt="product_photo"
                  className="h-[200px] w-[200px] "
                />
              )}
            </div>
            <div className="mt-7">
              <input
                type="text"
                value={name}
                placeholder="Write a name"
                className="w-200 p-2 rounded-md outline-none border-2 border-zinc-300"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mt-7">
              <textarea
                type="text"
                value={description}
                placeholder="Description"
                className="p-2 w-200 rounded-md outline-none border-2 border-zinc-300 resize"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-7">
              <input
                type="number"
                value={price}
                placeholder="Price"
                className="p-2 w-200 rounded-md outline-none border-2 border-zinc-300"
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mt-7">
              <input
                type="number"
                value={quantity}
                placeholder="Quantity"
                className="p-2 w-200 rounded-md outline-none border-2 border-zinc-300 mb-7 "
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <Select
              placeholder="Select shipping"
              size="large"
              className="form-select w-200 "
              onChange={(value) => {
                setShipping(value);
              }}
              value={shipping ? "yes" : "no"}
            >
              <Option value="0">no</Option>
              <Option value="1">yes</Option>
            </Select>
            <div className="mt-7 justify-center">
              <button
                onClick={handleUpdate}
                className="w-90 bg-blue-700 py-3 text-zinc-100 text-xl rounded-md"
              >
                Update Product
              </button>
            </div>
            <div className="mt-7 justify-center">
              <button
                onClick={handleDelete}
                className="w-90 bg-red-600 py-3 text-zinc-100 text-xl rounded-md"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
