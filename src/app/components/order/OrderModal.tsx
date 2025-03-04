import { OrderModalProps } from "./types";
import { Order } from "@/types/types";
import { generateUniqueNumber } from "@/utils/generateUniqueNumber";
import { Formik, Form } from "formik";
import { useModalContext } from "@/providers/ModalContext";
import {
  useAddOrderMutation,
  useEditOrderMutation,
} from "@/mutations/mutations";
import { orderValidationSchema } from "./validationSchema";
import { OrderFormFields } from "./OrderFormFields";

export function OrderModal({ isModalOpen }: OrderModalProps) {
  const { setIsModalOpen, orderToEdit } = useModalContext();
  const isEditMode = Boolean(orderToEdit);
  const addOrderMutation = useAddOrderMutation(setIsModalOpen);
  const editOrderMutation = useEditOrderMutation();

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900/50 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[70vh] w-96 overflow-y-auto rounded bg-white p-6 shadow-lg"
      >
        <h2 className="mb-4 text-xl font-bold">
          {isEditMode ? "Edit Order" : "Add New Order"}
        </h2>
        <Formik
          initialValues={{
            status: isEditMode ? orderToEdit?.status : "paid",
            products: isEditMode
              ? orderToEdit?.products || [{ productId: "", quantity: "" }]
              : [{ productId: "", quantity: "" }],
          }}
          validationSchema={orderValidationSchema}
          onSubmit={(values, { resetForm }) => {
            const newOrder: Order = {
              id: orderToEdit?.id ?? generateUniqueNumber(),
              date: new Date().toISOString(),
              status: values.status || "paid",
              products: values.products.map((product) => ({
                productId: Number(product.productId),
                quantity: Number(product.quantity),
              })),
            };

            if (isEditMode) {
              editOrderMutation.mutate({
                id: newOrder.id,
                cartData: newOrder,
              });
            } else {
              addOrderMutation.mutate(newOrder); //666
            }

            resetForm();
            setIsModalOpen(false);
          }}
        >
          <Form>
            <OrderFormFields />
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                className="cursor-pointer rounded border p-2"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="cursor-pointer rounded border bg-blue-500 p-2 text-white"
              >
                {isEditMode ? "Save Changes" : "Add Order"}
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
