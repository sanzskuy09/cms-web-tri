import { useEffect, useState } from "react";
import Routes from "./router";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "./redux/action/auth";

import Loading from "@/components/Loading";

export default function AppLayout() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const isLogin = useSelector((state) => state?.auth?.isLogin);

  const tokenExist = localStorage.getItem("token-cms");
  const stateLoading = useSelector((state) => state?.auth?.loading);

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.setItem("token-cms", "");
  };

  // useEffect(() => {
  //   // Simulate loading delay (you would replace this with your actual loading logic)
  //   if (stateLoading) {
  //     const timeout = setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000); // 2 seconds

  //     return () => clearTimeout(timeout);
  //   }

  //   if (!stateLoading) {
  //     setIsLoading(true);
  //   }
  // }, [stateLoading]);

  // <div className="max-h-screen h-screen flex flex-col">
  //   {/* Navbar */}
  //   <div className="flex justify-between px-8 py-4 bg-primary">
  //     <Link to="/">
  //       <h2 className="text-center font-semibold text-3xl text-white">
  //         CMS
  //       </h2>
  //     </Link>
  //     <button className="px-4 text-white" onClick={handleLogout}>
  //       Logout
  //     </button>
  //   </div>

  //   {/* Content */}
  //   <div className="flex h-full">
  //     <Navbar />
  //     <Routes />
  //   </div>
  // </div>

  return (
    <>
      <ToastContainer position="top-center" />

      {tokenExist ? (
        stateLoading ? (
          <Loading />
        ) : (
          <div className="max-h-screen h-screen flex flex-col">
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-primary px-8 py-4 flex justify-between">
              <Link to="/">
                <h2 className="text-center font-semibold text-3xl text-white">
                  CMS
                </h2>
              </Link>
              <button className="px-4 text-white" onClick={handleLogout}>
                Logout
              </button>
            </div>

            {/* content */}
            <div className="flex flex-1 overflow-hidden">
              <Navbar />

              <div className="flex-1 overflow-y-auto">
                <Routes />
              </div>
            </div>
          </div>
        )
      ) : (
        // if islogin false direct to /login
        <Routes />
      )}
    </>
  );
}
