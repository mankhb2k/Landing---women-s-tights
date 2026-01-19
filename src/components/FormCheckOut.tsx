'use client';
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { z } from "zod";
import { CheckoutSchema, CheckoutInput } from "@/lib/schema";
import { useCart, useCartTotalPrice } from "@/lib/store/useCart";
import FormCheck from "@/components/FormCheck";

export default function FormCheckout({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const supabase = createClient();
  // Lấy dữ liệu từ store giỏ hàng mới
  const { cartItems, clearCart } = useCart();
  const totalPrice = useCartTotalPrice();

  const [formData, setFormData] = useState<CheckoutInput>({
    fullName: "",
    phoneNumber: "",
    address: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof CheckoutInput, string>>
  >({});
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof CheckoutInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const result = CheckoutSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof CheckoutInput, string>> = {};
      result.error.issues.forEach((err: z.ZodIssue) => {
        const fieldName = err.path[0] as keyof CheckoutInput;
        if (fieldName) {
          fieldErrors[fieldName] = err.message;
        }
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    // Tạo bản tóm tắt đơn hàng
    const orderSummary = cartItems.map(item => 
      `${item.name} - Size: ${item.size} - SL: ${item.quantity}`
    ).join('\n'); // Mỗi sản phẩm một dòng

    // Gửi lên Supabase
    const { error } = await supabase.from("orders").insert([
      {
        full_name: formData.fullName,
        phone: formData.phoneNumber,
        address: formData.address,
        order_details: orderSummary, // Lưu tóm tắt vào một cột mới
        total_price: totalPrice,     // Lưu tổng giá trị
      },
    ]);

    setLoading(false);

    if (error) {
      alert("Lỗi: " + error.message);
    } else {
      alert("🎉 Đặt hàng thành công!");
      clearCart(); // Xóa giỏ hàng sau khi thành công
      onClose();
    }
  };

  if (!isOpen || cartItems.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center">
      <div className="animate-slide-up w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-2xl">
        <h2 className="mb-4 text-center text-xl font-bold">
          Xác nhận đơn hàng
        </h2>

        {/* Truyền cartItems và totalPrice vào FormCheck */}
        <FormCheck cartItems={cartItems} totalPrice={totalPrice} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="ml-1 text-sm font-medium text-gray-700">
              Họ và tên
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Nguyễn Văn A"
              className={`mt-1 w-full rounded-xl border p-3 transition outline-none ${errors.fullName ? "border-red-500 bg-red-50" : "focus:border-black"}`}
            />
            {errors.fullName && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.fullName}
              </p>
            )}
          </div>

          <div>
            <label className="ml-1 text-sm font-medium text-gray-700">
              Số điện thoại
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0912345678"
              className={`mt-1 w-full rounded-xl border p-3 transition outline-none ${errors.phoneNumber ? "border-red-500 bg-red-50" : "focus:border-black"}`}
            />
            {errors.phoneNumber && (
              <p className="mt-1 ml-1 text-xs text-red-500">
                {errors.phoneNumber}
              </p>
            )}
          </div>

          <div>
            <label className="ml-1 text-sm font-medium text-gray-700">
              Địa chỉ nhận hàng
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Số nhà, tên đường, phường/xã..."
              className={`mt-1 h-24 w-full rounded-xl border p-3 transition outline-none ${errors.address ? "border-red-500 bg-red-50" : "focus:border-black"}`}
            />
            {errors.address && (
              <p className="mt-1 ml-1 text-xs text-red-500">{errors.address}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-xl py-4 font-bold text-white uppercase shadow-lg transition ${loading ? "bg-gray-400" : "bg-black"}`}
          >
            {loading ? "Đang xử lý..." : `Đặt Hàng - ${totalPrice.toLocaleString('vi-VN')}đ`}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-sm text-gray-400 forn-semibold"
          >
            Hủy bỏ
          </button>
        </form>
      </div>
    </div>
  );
}
