import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { Select } from "antd";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/Auth";
const { Option } = Select;

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState(null);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

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

  //Cloudinary Upload
    const handleUpload = async (file) => {
      try {
            const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/upload`,
      formData,
    );

    return res.data.url;

      } catch (error) {
        console.log("Upload error:", error?.response?.data || error?.message);
        toast?.error("Image upload failed");
        return null;
      }
  };


  //Create Product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      // const productData = new FormData();
      // productData.append("name", name);
      // productData.append("description", description);
      // productData.append("price", price);
      // productData.append("quantity", quantity);
      // productData.append("photo", photo);
      // productData.append("category", category);
      // productData.append("shipping", shipping);

      let photoUrl = "";

      if (photo) {
        photoUrl = await handleUpload(photo);
      }



      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/create-product`,
        {
        name,
        description,
        price,
        quantity,
        shipping,
        category,
        photo: photoUrl
        },
        // {
        //   headers: {
        //     Authorization: `Bearer ${auth?.token}`,
        //   },
        // }
      );

      if (data?.success) {
        setName("");
        setDescription("");
        setPrice(""); 
        setQuantity("");
        setShipping("");
        setCategory("");
        setPhoto(null);
        toast.success("Product created successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
        console.log(error?.response?.data);

      }
    } catch (error) {
      console.log(error?.response?.data);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className=" grid grid-cols-4">
        <div className="px-5 h-full col-span-1 text-xl border-r-5 border-zinc-300">
          <AdminMenu></AdminMenu>
        </div>
        <div className="p-5 col-span-2 ">
          <h1 className="text-4xl p-5  ml-5">Create Product</h1>
          <div className="m-1 p-9 w-full">
            <Select
              placeholder="Select a category"
              size="large"
              className="form-select mb-3 w-200"
              onChange={(value) => {
                setCategory(value);
              }}
              showSearch
            >
              {categories.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>
            <div className="mt-7 w-100">
              <label className="inline-block w-200 cursor-pointer text-center bg-zinc-200 text-zinc-500 border-2 border-zinc-300 rounded-md px-4 py-2 transition">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  className="hidden"
                />
              </label>
            </div>
            <div className="mt-7">
              {photo instanceof File && (
                <img
                  src={URL.createObjectURL(photo)}
                  alt="product_photo"
                  className="h-[200px] w-200"
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
            >
              <Option value="0">no</Option>
              <Option value="1">yes</Option>
            </Select>
            <div className="mt-7 justify-center">
              <button
                onClick={handleCreate}
                className="w-90 bg-blue-700 py-3 text-zinc-100 text-xl rounded-md"
              >
                Create Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
