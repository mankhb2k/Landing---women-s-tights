import { z } from "zod";

export const CheckoutSchema = z.object({
  fullName: z.string().min(2, "Họ tên quá ngắn"),
  phoneNumber: z
    .string()
    .regex(/^[0-0][0-9]{9}$/, "Số điện thoại không hợp lệ"),
  address: z.string().min(5, "Vui lòng nhập địa chỉ chi tiết"),
});

export type CheckoutInput = z.infer<typeof CheckoutSchema>;
