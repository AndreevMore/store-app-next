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
import { Button } from "@/components/ui/button";

export function OrderModal({ isModalOpen }: OrderModalProps) {
  const { setIsModalOpen, orderToEdit } = useModalContext();
  const isEditMode = Boolean(orderToEdit);
  const addOrderMutation = useAddOrderMutation(setIsModalOpen);
  const editOrderMutation = useEditOrderMutation();

  if (!isModalOpen) return null;

  return (
    <div
      onClick={() => setIsModalOpen(false)}
      className="fixed inset-0 flex items-center justify-center overflow-y-auto bg-gray-900/90 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[70vh] w-96 overflow-y-auto rounded bg-[var(--background)] p-6 text-[var(--foreground)] shadow-lg"
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
              addOrderMutation.mutate(newOrder);
            }

            resetForm();
            setIsModalOpen(false);
          }}
        >
          <Form>
            <OrderFormFields />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {isEditMode ? "Save Changes" : "Add Order"}
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
