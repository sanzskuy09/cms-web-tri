import { Modal, Input, Button } from "antd";
import { Formik } from "formik";
import * as Yup from "yup";
import { toastSuccess } from "@/utils/Toastify";

const { TextArea } = Input;

export default function FormInput({ open, setOpen }) {
  const initialValues = {
    name: "",
    desc: "",
  };

  const onClose = () => {
    setOpen();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string()
          .min(5, "Must be 5 characters or then")
          .required("Required"),
        desc: Yup.string()
          .min(10, "Must be 10 characters or then")
          .required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          alert(JSON.stringify(values, null, 2));
          onClose();

          setTimeout(() => {
            setSubmitting(false);
            toastSuccess(`Create Program Success`);
            resetForm();
          }, 400);
        } catch (error) {
          console.log(error);
        }
      }}
    >
      {(formik) => (
        <Modal
          title="Create New Program"
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
              <label htmlFor="name">
                Program Name <span className="text-red-600">*</span>{" "}
              </label>
              <Input
                placeholder="Program name here.."
                {...formik.getFieldProps("name")}
                className="my-2"
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="text-red-600">{formik.errors.name}</div>
              ) : null}
            </div>

            <div>
              <label htmlFor="desc">
                Description <span className="text-red-600">*</span>
              </label>
              <TextArea
                placeholder="Description here.."
                {...formik.getFieldProps("desc")}
                className="my-2"
              />
              {formik.touched.desc && formik.errors.desc ? (
                <div className="text-red-600">{formik.errors.desc}</div>
              ) : null}
            </div>

            <div className="flex justify-end gap-5 mt-3">
              <Button
                size="xs"
                variant="light"
                type="button"
                className="text-title"
                onClick={() => {
                  formik.resetForm();
                  onClose();
                }}
              >
                Cancel
              </Button>
              <Button
                size="xs"
                className="px-6 bg-primary hover:bg-primary hover:opacity-80 outline-none border-none"
                htmlType="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </Formik>
  );
}
