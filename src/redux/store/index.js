import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../action/userSlice";
import authReducer from "../action/auth";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
