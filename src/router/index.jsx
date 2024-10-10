import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useRoutes } from "react-router-dom";

import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import About from "@/pages/About";
import Page404 from "@/pages/404";
import SliderTopPage from "@/pages/Homepage/SliderTop";
import KatalogHome from "@/pages/Homepage/Katalog";
import PromoSepuh from "@/pages/Homepage/PromoSepuh";
import DiskonPage from "@/pages/Homepage/Diskon";
import ECommercePage from "@/pages/ECommerce";
import KatalogMain from "@/pages/Katalog/KatalogMain";
import ElproPage from "@/pages/Katalog/Elpro";
import FMCGPage from "@/pages/Katalog/FMCG";
import FreshPage from "@/pages/Katalog/Fresh";
import FandBPage from "@/pages/Katalog/F&B";
import GroceriesPage from "@/pages/Katalog/Groceries";
import TranshardwarePage from "@/pages/Katalog/Transhardware";
import TranslivingPage from "@/pages/Katalog/Transliving";
import MetroStylePage from "@/pages/Katalog/MetroStyle";
import DeptStorePage from "@/pages/Katalog/DeptStore";
import PromoCard from "@/pages/Homepage/PromoCard";

export default function Routes() {
  const isLogin = useSelector((state) => state?.auth?.isLogin);
  const navigate = useNavigate();

  const tokenExist = localStorage.getItem("token-cms");

  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Router Protected
  function ProtectedRoute({ token, children }) {
    if (!token || token == "") {
      return <Navigate to="/login" replace />;
    }

    return children;
  }

  const element = useRoutes([
    // { path: "/", element: <Dashboard /> },
    { path: "/login", element: <Login /> },
    { path: "*", element: <Page404 /> },

    {
      path: "/dashboard",
      element: (
        <ProtectedRoute token={tokenExist}>
          <Dashboard />
        </ProtectedRoute>
      ),
    },

    // HomePage item router
    {
      path: "/homepage/slider-top",
      element: (
        <ProtectedRoute token={tokenExist}>
          <SliderTopPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/homepage/katalog",
      element: (
        <ProtectedRoute token={tokenExist}>
          <KatalogHome />
        </ProtectedRoute>
      ),
    },
    {
      path: "/homepage/promo-sepuh",
      element: (
        <ProtectedRoute token={tokenExist}>
          <PromoSepuh />
        </ProtectedRoute>
      ),
    },
    {
      path: "/homepage/diskon-card",
      element: (
        <ProtectedRoute token={tokenExist}>
          <DiskonPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/homepage/promo-card",
      element: (
        <ProtectedRoute token={tokenExist}>
          <PromoCard />
        </ProtectedRoute>
      ),
    },

    // Katalog item router
    {
      path: "/katalog",
      element: (
        <ProtectedRoute token={tokenExist}>
          <KatalogMain />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/dept-store",
      element: (
        <ProtectedRoute token={tokenExist}>
          <DeptStorePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/elpro",
      element: (
        <ProtectedRoute token={tokenExist}>
          <ElproPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/fmcg",
      element: (
        <ProtectedRoute token={tokenExist}>
          <FMCGPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/Fresh",
      element: (
        <ProtectedRoute token={tokenExist}>
          <FreshPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/F&B",
      element: (
        <ProtectedRoute token={tokenExist}>
          <FandBPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/groceries",
      element: (
        <ProtectedRoute token={tokenExist}>
          <GroceriesPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/transhardware",
      element: (
        <ProtectedRoute token={tokenExist}>
          <TranshardwarePage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/transliving",
      element: (
        <ProtectedRoute token={tokenExist}>
          <TranslivingPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/katalog/metrostyle",
      element: (
        <ProtectedRoute token={tokenExist}>
          <MetroStylePage />
        </ProtectedRoute>
      ),
    },

    // E-Commerce page router
    {
      path: "/ecommerce",
      element: (
        <ProtectedRoute token={tokenExist}>
          <ECommercePage />
        </ProtectedRoute>
      ),
    },

    {
      path: "/about",
      element: (
        <ProtectedRoute token={tokenExist}>
          <About />
        </ProtectedRoute>
      ),
    },
  ]);
  return element;
}
