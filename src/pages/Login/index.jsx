import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { loginUserAsync } from "@/redux/action/auth";

import { Button, ConfigProvider, Form, Input } from "antd";
import TeamColImage from "../../assets/icons/team_collaboration.svg";
import { API, ENDPOINTS } from "@/config/api";
import { toastFailed, toastSuccess } from "@/utils/Toastify";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      const res = await API.post(
        `${ENDPOINTS.AUTH_LOGIN}`,
        JSON.stringify(values)
      );

      const token = res.data.token;
      localStorage.setItem("token-cms", token);

      // dispatch(loginUserAsync({ email, password }));
      dispatch(
        loginUserAsync({ email: values.email, password: values.password })
      );

      // dispatch(loginUser({ ...values, token: token }));
      toastSuccess(`Sign in Success`);
      navigate("/");
    } catch (error) {
      console.log("error: ", error);
      toastFailed(`Email atau Password Salah`);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="bg-[#4F709C] hidden md:flex flex-col gap-14 justify-center p-20 max-h-screen ">
        <h1 className="text-white font-bold text-4xl leading-tight lg:text-5xl lg:leading-tight xl:text-6xl xl:leading-tight">
          Management <br /> Your <span className="text-[#F6B17A]">Content</span>
        </h1>
        <div>
          <img src={TeamColImage} alt="" className="" />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center max-h-screen">
        <h1 className="text-primary font-bold text-4xl leading-tight mb-14 text-center md:hidden">
          Management <br /> Your{" "}
          <span className="text-[#F6B17A]">Collection</span>
        </h1>
        <div className="w-2/3 ">
          <h1 className="text-primary font-bold text-4xl mb-1">Welcome Back</h1>
          <p className="text-[#B4B4B3] text-sm mb-6">Management your content</p>

          <Form
            name="basic"
            layout="vertical"
            className=""
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <ConfigProvider
                theme={{
                  components: {
                    Button: {
                      colorPrimary: "#26577C",
                      algorithm: true, // Enable algorithm
                    },
                  },
                }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  className="bg-primary w-full my-2"
                >
                  Login
                </Button>
              </ConfigProvider>
            </Form.Item>
          </Form>

          {/* <p className="font-semibold text-sm text-center text-[#B4B4B3]">
            Don`t have an account?{" "}
            <span className="text-primary">Register</span>
          </p> */}
        </div>

        <p className="fixed bottom-8 text-sm text-primary">
          &#169; 2024 all rights reserved
        </p>
      </div>
    </div>
  );
};

export default Login;
