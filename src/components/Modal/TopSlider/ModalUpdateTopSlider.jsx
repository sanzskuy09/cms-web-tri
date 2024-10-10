import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { toastSuccess } from "@/utils/Toastify";
import { API, ENDPOINTS } from "@/config/api";

import { Modal, Input, Button } from "antd";
const { TextArea } = Input;

// eslint-disable-next-line react/prop-types
const ModalUpdateTopSlider = ({ open, setOpen, getData, data }) => {
  const initialValues = {
    title: data ? data?.title : "",
    image: null,
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
      enableReinitialize={true}
      validationSchema={Yup.object({
        title: Yup.string()
          .min(3, "Must be 3 characters or more")
          .required("Required"),
        image: Yup.mixed()
          .nullable()
          .test("fileSize", "File size is too large", (value) => {
            return !value || value.size <= 10048576; // 1MB
          })
          .test("fileType", "Unsupported file type", (value) => {
            return (
              !value ||
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
          {
            values.image !== null && formData.append("image", values.image);
          }
          // formData.append("image", values.image);

          const config = {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          };

          const res = await API.put(
            `${ENDPOINTS.UPDATE_TOP_SLIDER}/${data?.id}`,
            formData,
            config
          );

          onClose();

          setTimeout(() => {
            setSubmitting(false);
            toastSuccess(`Top Slider berhasil diupdate`);
            resetForm();
            getData();
          }, 400);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <Modal
          title="Update Top Slider"
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
                Image Top Slider <span className="text-red-600">*</span>{" "}
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
                onBlur={formik.handleBlur}
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

            {/* <p>{JSON.stringify(formik.values.image, null, 2)}</p> */}

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

export default ModalUpdateTopSlider;
