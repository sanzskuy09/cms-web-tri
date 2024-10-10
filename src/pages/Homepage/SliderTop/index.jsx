import React, { useEffect, useState } from "react";
import { ExclamationCircleFilled } from "@ant-design/icons";

import { ConfigProvider, Modal, Space, Table, Popover } from "antd";
import { Link } from "react-router-dom";
const { confirm } = Modal;

import { API, ENDPOINTS } from "@/config/api";
import { toastSuccess } from "@/utils/Toastify";

import ModalCreateTopSlider from "@/components/Modal/TopSlider/ModalCreateTopSlider";
import ModalUpdateTopSlider from "@/components/Modal/TopSlider/ModalUpdateTopSlider";

import InfoIcon from "@/assets/icons/info.svg";
import InfoImage from "@/assets/top-slider.png";

const text = <span>Example Image</span>;
const content = (
  <div className="w-52">
    <img src={InfoImage} alt="" />
  </div>
);

const SliderTop = () => {
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
    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (text) => (
    //     <img
    //       src={"http://localhost:8080/uploads/sliderTop/" + text}
    //       alt="img-top-slider"
    //       width={200}
    //     />
    //   ),
    // },
    {
      title: "Image",
      dataIndex: "image_url",
      key: "image_url",
      render: (text) => <img src={text} alt="img-top-slider" width={200} />,
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
          await API.delete(`${ENDPOINTS.DELETE_TOP_SLIDER}/${e}`);
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
    const res = await API.get(ENDPOINTS.GET_TOP_SLIDER);

    setData(res.data);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div className="px-8 py-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-4xl font-bold">Slider Top Image</h1>

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
          className="border-solid border-2 border-primary p-2 px-3 rounded-md hover:bg-primary hover:text-white transition-all font-semibold mb-4"
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
      <ModalCreateTopSlider open={open} setOpen={setOpen} getData={fecthData} />
      <ModalUpdateTopSlider
        open={open1}
        setOpen={setOpen1}
        getData={fecthData}
        data={view}
      />
    </div>
  );
};

export default SliderTop;
