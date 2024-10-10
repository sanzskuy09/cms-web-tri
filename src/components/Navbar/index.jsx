import React, { useState } from "react";

import {
  AppstoreOutlined,
  ShoppingCartOutlined,
  ContainerOutlined,
  HomeOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

import { Menu } from "antd";
import { Link } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem(
    <Link to="/dashboard">Dashboard</Link>,
    "menu1",
    <AppstoreOutlined />
  ),
  getItem("Homepage", "sub1", <HomeOutlined />, [
    getItem(<Link to="/homepage/slider-top">Slider Top</Link>, "home1"),
    // getItem(<Link to="/homepage/katalog">Katalog</Link>, "home2"),
    getItem(<Link to="/homepage/promo-sepuh">Promo Sepuh</Link>, "home3"),
    getItem(<Link to="/homepage/diskon-card">Diskon Card</Link>, "home4"),
    getItem(<Link to="/homepage/promo-card">Promo Card</Link>, "home5"),
  ]),
  getItem("Katalog", "sub2", <ContainerOutlined />, [
    getItem(<Link to="/katalog">Katalog Page</Link>, "catalog1"),
    getItem(<Link to="/katalog/dept-store">Dept Store Page</Link>, "catalog8"),
    getItem(<Link to="/katalog/elpro">Elpro Page</Link>, "catalog2"),
    getItem(<Link to="/katalog/fmcg">FMCG Page</Link>, "catalog3"),
    getItem(<Link to="/katalog/Fresh">Fresh Page</Link>, "catalog4"),
    getItem(<Link to="/katalog/F&B">F&B Page</Link>, "catalog5"),
    getItem(<Link to="/katalog/groceries">Groceries Page</Link>, "catalog6"),
    getItem(<Link to="/katalog/metrostyle">Metro Style Page</Link>, "catalog7"),
    getItem(
      <Link to="/katalog/transhardware">Transhardware Page</Link>,
      "catalog8"
    ),
    getItem(
      <Link to="/katalog/transliving">Transliving Page</Link>,
      "catalog9"
    ),
    // getItem("Submenu", "sub3", null, [
    //   getItem("Option 7", "7"),
    //   getItem("Option 8", "8"),
    // ]),
  ]),
  // getItem(
  //   <Link to="/latest_promo">Latest Promo</Link>,
  //   "menu2",
  //   <ShoppingCartOutlined />
  // ),
  // getItem(
  //   <Link to="/ecommerce">E-Commerce</Link>,
  //   "menu3",
  //   <ShoppingCartOutlined />
  // ),
  getItem(
    <Link to="/about">About</Link>,
    "menu4",
    <ExclamationCircleOutlined />
  ),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const Navbar = () => {
  const [openKeys, setOpenKeys] = useState([]);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{
        minWidth: "15%",
        width: "15%",
        // height: "100%",
      }}
      items={items}
    />
  );
};

export default Navbar;
