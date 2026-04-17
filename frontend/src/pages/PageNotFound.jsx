import React from "react";
import Layout from "../components/Layout/Layout";
import { NavLink } from "react-router-dom";


function PageNotFound() {
  return (
      <div className="h-screen w-full bg-neutral-700 text-zinc-400 relative">
        <div className="h-[60vh] w-[40vw] font-family flex flex-col leading-12 items-center absolute top-[calc(50vh-35vh)] left-[calc(50vw-20vw)]">
            <h1 className="mt-9 text-9xl font-bold">404</h1>
            <p className="font-semibold py-5">Error: Page Not Found</p>
            <button className="font-semibold border-2 border-zinc-300 rounded-md px-3 hover:outline-2">
                <NavLink to={'/'}>Back to Home</NavLink>
            </button>
        </div>
      </div>
  );
}

export default PageNotFound;
