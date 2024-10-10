import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toastFailed, toastSuccess } from "@/utils/Toastify";
import { API, ENDPOINTS } from "@/config/api";

import { Modal, Input, Button } from "antd";
const { TextArea } = Input;

// eslint-disable-next-line react/prop-types
const ModalCreateDiskonCard = ({ open, setOpen, getData }) => {
  const initialValues = {
    title: "",
    status: 1,
    image: "",
    imagePreview: "",
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleImageChange = (e, formik) => {
    const file = e.target.files[0];
    formik.setFieldValue("image", file);
    formik.setFieldValue("imagePreview", URL.createObjectURL(file));
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, "Must be 3 characters or more")
          .required("Required"),
        image: Yup.mixed()
          .required("Image is required")
          .test("fileSize", "File size is too large", (value) => {
            return value && value.size <= 10048576; // 1MB
          })
          .test("fileType", "Unsupported file type", (value) => {
            return (
              value &&
              ["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
                value.type
              )
            );
          }),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          const formData = new FormData();
          formData.append("title", values.title);
          formData.append("status", values.status);
          formData.append("image", values.image);
          // alert(JSON.stringify(values, null, 2));

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          const res = await API.post(
            `${ENDPOINTS.CREATE_IMAGE_DISKON}`,
            formData,
            config
          );

          onClose();

          setTimeout(() => {
            setSubmitting(false);
            toastSuccess(`Diskon Card berhasil dibuat`);
            resetForm();
            getData();
          }, 400);
        } catch (error) {
          toastFailed(`Diskon Card gagal dibuat`);
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <Modal
          title="Tambah Diskon Card"
          open={open}
          closable={false}
          onCancel={onClose}
          footer={[]}
        >
          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-1 mt-4"
          >
            <div>
              <label htmlFor="title">
                Title <span className="text-red-600">*</span>{" "}
              </label>
              <Input
                placeholder="masukan title..."
                {...formik.getFieldProps("title")}
                onBlur={formik.handleBlur}
                className="my-2"
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="text-red-600">{formik.errors.title}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="image">
                Image Diskon Card <span className="text-red-600">*</span>{" "}
                <span className="text-red-600 text-[12px]">
                  rekomendasi nama file tidak mengandung spasi
                </span>
              </label>
              <br />
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => handleImageChange(e, formik)}
                className="my-2"
              />
              {formik.values.imagePreview && (
                <img
                  src={formik.values.imagePreview}
                  alt="Image Preview"
                  style={{ maxWidth: "100px", maxHeight: "100px" }}
                />
              )}
              {formik.touched.image && formik.errors.image ? (
                <div className="text-red-600">{formik.errors.image}</div>
              ) : null}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-1 rounded-lg bg-primary hover:bg-primary text-white hover:opacity-80 outline-none border-none"
              >
                Submit
              </button>
            </div>
          </form>
        </Modal>
      )}
    </Formik>
  );
};

export default ModalCreateDiskonCard;
