/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ConfigProvider, Modal, Space, Table } from "antd";
const { confirm } = Modal;

import { ExclamationCircleFilled } from "@ant-design/icons";

import { API, ENDPOINTS } from "@/config/api";
import { toastFailed, toastSuccess } from "@/utils/Toastify";

const KatalogTable = ({
  dataCover,
  data,
  fecthData,
  urlDelete,
  setOpen,
  setOpenCover,
  setOpenUpdate,
  setView,
}) => {
  const [loading, setLoading] = useState(false);

  const showModal = (e) => {
    switch (e) {
      case "create":
        setOpen((value) => !value);
        break;
      case "createCover":
        setOpenCover((value) => !value);
        break;
      case "update":
        setOpenUpdate((value) => !value);
        break;
      default:
        break;
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => index + 1,
      width: 80,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <p className="font-semibold">{text}</p>,
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      width: 400,
      render: (text) => <img src={text} alt="img-top-slider" width={100} />,
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      width: 200,
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              showModal("update");
              setView(record);
            }}
            className="font-semibold text-blue-500 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(record.id)}
            className="font-semibold text-red-500 hover:underline"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const columnsCover = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (value, item, index) => index + 1,
      width: 80,
    },
    {
      title: "Title Cover",
      dataIndex: "title",
      key: "title",
      render: (text) => <p className="font-semibold">{text}</p>,
    },
    {
      title: "Image Cover",
      dataIndex: "image_url",
      key: "image_url",
      width: 400,
      render: (text) => <img src={text} alt="img-top-slider" width={100} />,
    },

    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      width: 200,

      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              showModal("update");
              setView(record);
            }}
            className="font-semibold text-blue-500 hover:underline"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(record.id)}
            className="font-semibold text-red-500 hover:underline"
          >
            Delete
          </button>
        </Space>
      ),
    },
  ];

  const handleDelete = async (e) => {
    confirm({
      title: "Are you sure delete this Image?",
      icon: <ExclamationCircleFilled />,
      centered: true,
      // content: "Some descriptions",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        try {
          setLoading(true);
          await API.delete(`${urlDelete}/${e}`);
          await fecthData();

          toastSuccess(`Image Success Deleted`);

          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
        toastFailed(`Image Failed Deleted`);
      },
    });
  };

  return (
    <div>
      <div className="overflow-auto mt-8">
        <div className="flex gap-2">
          <button
            onClick={() => showModal("create")}
            className="border-solid border-2 border-primary p-2 px-3 rounded-md hover:bg-primary hover:text-white transition-all font-semibold mb-4"
          >
            Add Katalog
          </button>
          <button
            onClick={() => showModal("createCover")}
            className="border-solid border-2 border-primary p-2 px-3 rounded-md hover:bg-primary hover:text-white transition-all font-semibold mb-4"
          >
            Add Cover
          </button>
        </div>

        {/* Table Katalog Cover */}
        <div className="mb-6">
          <ConfigProvider
            theme={{
              components: {
                Table: {
                  colorPrimary: "#26577C",
                  headerColor: "#fff",
                  headerBg: "#26577C",
                  headerBorderRadius: 6,
                  algorithm: true,
                  // borderColor: "#000",
                },
              },
            }}
          >
            <Table
              columns={columnsCover}
              dataSource={dataCover}
              pagination={false}
            />
          </ConfigProvider>
        </div>

        <ConfigProvider
          theme={{
            components: {
              Table: {
                colorPrimary: "#26577C",
                headerColor: "#fff",
                headerBg: "#26577C",
                headerBorderRadius: 6,
                algorithm: true,
                // borderColor: "#000",
              },
              Pagination: {
                colorPrimary: "#26577C",
                colorPrimaryHover: "#26577C",
                colorPrimaryBorder: "#26577C",
                algorithm: true,
              },
            },
          }}
        >
          <Table columns={columns} dataSource={data} />
        </ConfigProvider>
      </div>
    </div>
  );
};

export default KatalogTable;
