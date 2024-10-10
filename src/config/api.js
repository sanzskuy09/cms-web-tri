import axios from "axios";

// export const BASE_URL = "http://localhost:5500/api/v1";
export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const ENDPOINTS = {
  AUTH_LOGIN: "/transweb/auth/login",
  // ==================== HOMEPAGE ========================= //
  // TOP SLIDER
  GET_TOP_SLIDER: "/transweb/sliderTop/getAll",
  CREATE_TOP_SLIDER: "/transweb/sliderTop/create",
  UPDATE_TOP_SLIDER: "/transweb/sliderTop/update",
  DELETE_TOP_SLIDER: "/transweb/sliderTop/delete",

  // IMAGE HEADER
  GET_IMAGE_HEADER: "/transweb/imageHeader/getAll",
  CREATE_IMAGE_HEADER: "/transweb/imageHeader/create",
  UPDATE_IMAGE_HEADER: "/transweb/imageHeader/update",
  DELETE_IMAGE_HEADER: "/transweb/imageHeader/delete",

  // PROMO SEPUH
  GET_PROMO_SEPUH: "/transweb/promosepuh/getAll",
  CREATE_PROMO_SEPUH: "/transweb/promosepuh/create",
  UPDATE_PROMO_SEPUH: "/transweb/promosepuh/update",
  DELETE_PROMO_SEPUH: "/transweb/promosepuh/delete",

  // IMAGE DISKON
  GET_IMAGE_DISKON: "/transweb/imagediscount/getAll",
  CREATE_IMAGE_DISKON: "/transweb/imagediscount/create",
  UPDATE_IMAGE_DISKON: "/transweb/imagediscount/update",
  DELETE_IMAGE_DISKON: "/transweb/imagediscount/delete",

  // IMAGE PROMO
  GET_IMAGE_PROMO: "/transweb/imagepromo/getAll",
  CREATE_IMAGE_PROMO: "/transweb/imagepromo/create",
  UPDATE_IMAGE_PROMO: "/transweb/imagepromo/update",
  DELETE_IMAGE_PROMO: "/transweb/imagepromo/delete",

  // ==================== KATAOG ========================= //
  // Dept Store
  GET_DEPTSTORE: "/transweb/katalog/deptstore/getAll",
  CREATE_DEPTSTORE: "/transweb/katalog/deptstore/create",
  UPDATE_DEPTSTORE: "/transweb/katalog/deptstore/update",
  DELETE_DEPTSTORE: "/transweb/katalog/deptstore/delete",

  // Elpro
  GET_ELPRO: "/transweb/katalog/elpro/getAll",
  CREATE_ELPRO: "/transweb/katalog/elpro/create",
  UPDATE_ELPRO: "/transweb/katalog/elpro/update",
  DELETE_ELPRO: "/transweb/katalog/elpro/delete",

  // Fresh
  GET_FRESH: "/transweb/katalog/fresh/getAll",
  CREATE_FRESH: "/transweb/katalog/fresh/create",
  UPDATE_FRESH: "/transweb/katalog/fresh/update",
  DELETE_FRESH: "/transweb/katalog/fresh/delete",

  // FMCGG
  GET_FMCG: "/transweb/katalog/fmcg/getAll",
  CREATE_FMCG: "/transweb/katalog/fmcg/create",
  UPDATE_FMCG: "/transweb/katalog/fmcg/update",
  DELETE_FMCG: "/transweb/katalog/fmcg/delete",

  // F&b
  GET_FnB: "/transweb/katalog/fnb/getAll",
  CREATE_FnB: "/transweb/katalog/fnb/create",
  UPDATE_FnB: "/transweb/katalog/fnb/update",
  DELETE_FnB: "/transweb/katalog/fnb/delete",

  // GROCERIES
  GET_GROCERIES: "/transweb/katalog/groceries/getAll",
  CREATE_GROCERIES: "/transweb/katalog/groceries/create",
  UPDATE_GROCERIES: "/transweb/katalog/groceries/update",
  DELETE_GROCERIES: "/transweb/katalog/groceries/delete",

  // METROSTYLE
  GET_METROSTYLE: "/transweb/katalog/metrostyle/getAll",
  CREATE_METROSTYLE: "/transweb/katalog/metrostyle/create",
  UPDATE_METROSTYLE: "/transweb/katalog/metrostyle/update",
  DELETE_METROSTYLE: "/transweb/katalog/metrostyle/delete",

  // TRANSLIVING
  GET_TRANSLIVING: "/transweb/katalog/transliving/getAll",
  CREATE_TRANSLIVING: "/transweb/katalog/transliving/create",
  UPDATE_TRANSLIVING: "/transweb/katalog/transliving/update",
  DELETE_TRANSLIVING: "/transweb/katalog/transliving/delete",

  // TRANSHARDWARE
  GET_TRANSHARDWARE: "/transweb/katalog/transhardware/getAll",
  CREATE_TRANSHARDWARE: "/transweb/katalog/transhardware/create",
  UPDATE_TRANSHARDWARE: "/transweb/katalog/transhardware/update",
  DELETE_TRANSHARDWARE: "/transweb/katalog/transhardware/delete",

  // auth
  // AUTH_LOGIN: "/auth/login",
  // AUTH_REGISTER: "/auth/register",
  // PROGRAM_LIST: "/program",
  // PROGRAM_CREATE: "/program/add",
};
