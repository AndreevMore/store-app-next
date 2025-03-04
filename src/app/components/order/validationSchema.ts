import * as Yup from "yup";

export const orderValidationSchema = Yup.object({
  status: Yup.string().oneOf(["pending", "paid", "shipped"]).required("Status is required"),
  products: Yup.array().of(
    Yup.object({
      productId: Yup.string().required("Product ID is required"),
      quantity: Yup.number().required("Quantity is required").moreThan(0, "Quantity must be greater than 0").integer("Must be an integer"),
    })
  ),
});
