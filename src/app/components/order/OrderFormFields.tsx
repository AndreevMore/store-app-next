import { Field, FieldArray, ErrorMessage as FormikError } from "formik";

export function OrderFormFields() {
  return (
    <>
      <div className="mb-4">
        <label className="block">Status</label>
        <Field as="select" name="status" className="w-full border p-2">
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
        </Field>
        <FormikError name="status" component="div" className="text-red-500" />
      </div>

      <FieldArray name="products">
        {({ push, remove }) => (
          <div>
            <label className="block font-bold">Products</label>
            <FieldArray name="products">
              {({ form }) =>
                form.values.products.map(
                  (
                    _: { productId: string; quantity: number },
                    index: number,
                  ) => (
                    <div key={index} className="mb-4 border-b pb-2">
                      <label className="block">Product ID</label>
                      <Field
                        name={`products.${index}.productId`}
                        className="w-full border p-2"
                      />
                      <FormikError
                        name={`products.${index}.productId`}
                        component="div"
                        className="text-red-500"
                      />

                      <label className="block">Quantity</label>
                      <Field
                        name={`products.${index}.quantity`}
                        type="number"
                        className="w-full border p-2"
                      />
                      <FormikError
                        name={`products.${index}.quantity`}
                        component="div"
                        className="text-red-500"
                      />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 cursor-pointer text-red-500"
                      >
                        Remove
                      </button>
                    </div>
                  ),
                )
              }
            </FieldArray>
            <button
              type="button"
              onClick={() => push({ productId: "", quantity: "" })}
              className="cursor-pointer text-blue-500"
            >
              Add Product
            </button>
          </div>
        )}
      </FieldArray>
    </>
  );
}
