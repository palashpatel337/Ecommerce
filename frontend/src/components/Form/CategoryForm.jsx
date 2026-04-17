import React from "react";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="w-4/5">
          <input
            className="w-full h-9 p-5 rounded-md bg-zinc-100 border-blue-300 border-3 outline-none "
            type="text"
            placeholder="Enter category name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div className="text-right">
            <button
              className="bg-blue-700 mt-5 p-2 text-zinc-100 rounded-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
