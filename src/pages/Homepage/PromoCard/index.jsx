import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { ConfigProvider, Modal, Space, Table, Popover } from "antd";
import { Link } from "react-router-dom";
const { confirm } = Modal;

import { API, ENDPOINTS } from "@/config/api";
import { toastSuccess } from "@/utils/Toastify";

import ModalCreatePromoCard from "@/components/Modal/PromoCard/ModalCreatePromoCard";
import ModalUpdatePromoCard from "@/components/Modal/PromoCard/ModalUpdatePromoCard";

import InfoIcon from "@/assets/icons/info.svg";
import InfoImage from "@/assets/promo-card.png";

const text = <span>Example Image (6 Images)</span>;
const content = (
  <div className="w-52">
    <img src={InfoImage} alt="" />
  </div>
);

const PromoCard = () => {
  const [data, setData] = useState();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [view, setView] = useState(false);

  const [loading, setLoading] = useState(false);

  const showModal = (e) => {
    switch (e) {
      case "create":
        setOpen((value) => !value);
        break;
      case "update":
        setOpen1((value) => !value);
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
      title: "Kategori",
      dataIndex: "kategori",
      key: "kategori",
      render: (text) => (
        <p className="font-semibold">
          {text != null && text != "" ? text : "-"}
        </p>
      ),
    },
    {
      title: "Link (Optional)",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a
          href={text}
          target="_blank"
          rel="noreferrer"
          className="font-semibold"
        >
          {text != null && text != "" ? text : "-"}
        </a>
      ),
    },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) => <img src={text} alt="img-top-slider" width={100} />,
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
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
          await API.delete(`${ENDPOINTS.DELETE_IMAGE_PROMO}/${e}`);
          await fecthData();

          toastSuccess(`Image Success Deleted`);

          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const fecthData = async () => {
    const res = await API.get(ENDPOINTS.GET_IMAGE_PROMO);

    setData(res.data);
  };

  useEffect(() => {
    fecthData();
  }, []);
  return (
    <div className="px-8 py-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-4xl font-bold">Promo Card Image</h1>

        <ConfigProvider
          theme={{
            components: {
              Popover: {
                /* here is your component tokens */
                titleMinWidth: 120,
              },
            },
          }}
        >
          <Popover
            placement="rightTop"
            title={text}
            content={content}
            className="self-start h-fit w-10"
            arrow={false}
          >
            <img src={InfoIcon} alt="" className="w-3" />
          </Popover>
        </ConfigProvider>
      </div>

      <div className="overflow-auto mt-8">
        <button
          onClick={() => showModal("create")}
          disabled={data?.length >= 6}
          className={`border-solid border-2 border-primary p-2 px-3 rounded-md font-semibold mb-4
            ${
              data?.length >= 6
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-primary hover:text-white transition-all"
            }`}
        >
          Add Image
        </button>
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

      {/* Modal */}
      <ModalCreatePromoCard open={open} setOpen={setOpen} getData={fecthData} />
      <ModalUpdatePromoCard
        open={open1}
        setOpen={setOpen1}
        getData={fecthData}
        data={view}
      />
    </div>
  );
};

export default PromoCard;
