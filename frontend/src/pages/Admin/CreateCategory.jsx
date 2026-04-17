import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { toast } from "react-toastify";
import axios from "axios";
import { Button, Modal } from "antd";
import CategoryForm from "../../components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updateName, setUpdateName] = useState("");

  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.Cannot create new category.");
    }
  };

  //Update form
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`,{name:updateName});
        if (data.success) {
            toast.success(data.message)
            setUpdateName("");
            setSelected(null)
            setOpen(false)
            getAllCategory();

        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Delete form
  const handleDelete = async (id) => {
    try {
        const {data} = await axios.delete(`/api/v1/category/delete-category/${id}`);
        if (data.success) {
            toast.success(data.message)
            getAllCategory();

        }
        else{
            toast.error(data.message)
        }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  //Get All Category
  const getAllCategory = async () => {
    try { 
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div className=" grid grid-cols-4">
        <div className="px-5 col-span-1 text-xl border-r-5 border-zinc-300">
          <AdminMenu></AdminMenu>
        </div>
        <div className="p-5 col-span-2 mr-5">
          <h1 className="text-4xl p-5">Manage Category</h1>
          <div className="p-5">
            <CategoryForm
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
          </div>
          <div className=" p-5">
            <table className="table-fixed">
              <thead>
                <tr className="h-full w-full border-y-3 border-zinc-500">
                  <th className="text-left p-5">Name</th>
                  <th className="text-center w-9">Action</th>
                </tr>
              </thead>
              <tbody className="borderb-2 border-zinc-300">
                {categories.map((c) => (
                  <>
                    <tr key={c._id} className="h-full w-full border-b-2 border-zinc-300">
                      <td  className="w-full p-5 text-left">
                        {c.name}
                      </td>
                      <td className="w-full text-left flex">
                        <Button
                          onClick={() => {
                            setOpen(true);
                            setUpdateName(c.name);
                            setSelected(c)
                          }}
                          type="primary"
                          className=" text-center  rounded-md p-3 my-4 text-zinc-100"
                        >
                          Edit
                        </Button>
                        <Button
                          type="primary"
                          danger
                          className="rounded-md p-3 m-4 text-zinc-100" onClick={() => {handleDelete(c._id)}}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>
          </div>
          <Modal onCancel={() => setOpen(false)} footer={null} open={open}>
            <CategoryForm
              value={updateName}
              setValue={setUpdateName}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
