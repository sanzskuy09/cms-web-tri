import React, { useEffect, useState } from "react";

import { API, ENDPOINTS } from "@/config/api";

import ModalCreateKatalog from "@/components/Modal/Katalog/ModalCreateKatalog";
import ModalUpdateKatalog from "@/components/Modal/Katalog/ModalUpdateKatalog";
import KatalogTable from "@/components/KatalogTable";

import { ConfigProvider, Popover } from "antd";

import InfoIcon from "@/assets/icons/info.svg";
import InfoImage from "@/assets/info-katalog.png";

const text = <span>Example Image</span>;
const content = (
  <div className="w-52">
    <img src={InfoImage} alt="" />
  </div>
);

const MetroStylePage = () => {
  const [data, setData] = useState();
  const [dataCover, setDataCover] = useState();

  const [open, setOpen] = useState(false);
  const [openCover, setOpenCover] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  const [view, setView] = useState(false);

  const fecthData = async () => {
    const res = await API.get(ENDPOINTS.GET_METROSTYLE);

    const filterCover = res.data.filter((item) => item.tag === "cover");
    const filterNonCover = res.data.filter((item) => item.tag !== "cover");

    setDataCover(filterCover);
    setData(filterNonCover);
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <div className="px-8 py-4 w-full">
      <div className="flex gap-2">
        <h1 className="text-4xl font-bold">Katalog Metro Style</h1>

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

      <KatalogTable
        data={data}
        dataCover={dataCover}
        fecthData={fecthData}
        setOpen={setOpen}
        setOpenCover={setOpenCover}
        setOpenUpdate={setOpenUpdate}
        setView={setView}
        // ubah code dibawah ini saja
        urlDelete={ENDPOINTS.DELETE_METROSTYLE}
      />

      {/* Modal */}
      <ModalCreateKatalog
        open={open}
        setOpen={setOpen}
        getData={fecthData}
        endpoint={ENDPOINTS.CREATE_METROSTYLE}
        title="Metro Style"
      />

      {/* Modal Create Cover */}
      <ModalCreateKatalog
        open={openCover}
        setOpen={setOpenCover}
        getData={fecthData}
        endpoint={ENDPOINTS.CREATE_METROSTYLE}
        title="Metro Style"
        isCover={true}
      />

      {/* Modal Update */}
      <ModalUpdateKatalog
        open={openUpdate}
        setOpen={setOpenUpdate}
        getData={fecthData}
        data={view}
        endpoint={ENDPOINTS.UPDATE_METROSTYLE}
        title="Metro Style"
      />
    </div>
  );
};

export default MetroStylePage;
