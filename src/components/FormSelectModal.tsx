"use client";
import { useCart } from "@/lib/store/useCart";
import { Minus, Plus, X } from "lucide-react";

export default function FormSelectModal() {
  const {
    isOpen,
    closeSelectModal,
    size,
    setSize,
    addToCart,
    quantity,
    setQuantity,
  } = useCart();

  if (!isOpen) return null;

  const PRICE_PER_UNIT = 199000;
  const totalPrice = (PRICE_PER_UNIT * quantity).toLocaleString("vi-VN");

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/50 backdrop-blur-sm">
      <div className="animate-slide-up relative w-full rounded-t-3xl bg-white p-6 shadow-2xl">
        {/* Close Button */}
        <button
          onClick={closeSelectModal}
          className="absolute top-4 right-4 rounded-full bg-gray-100 p-2 text-gray-500 transition hover:bg-gray-200 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        <h3 className="mb-6 text-center text-lg font-bold text-gray-800">
          Tùy chọn sản phẩm
        </h3>

        {/* Size Selection */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-gray-500">Kích thước</p>
          <div className="flex justify-center gap-3">
            {["S", "M", "L", "XL"].map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold transition-all duration-300 ${
                  size === s
                    ? "border-orange-500 bg-orange-50 text-orange-600 shadow-md"
                    : "border-gray-200 bg-white text-gray-700 hover:border-gray-400"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-gray-500">Số lượng</p>
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition active:bg-gray-200 disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus size={16} />
            </button>
            <span className="w-10 text-center text-xl font-bold text-gray-800">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition active:bg-gray-200"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Price and Confirmation */}
        <div className="mt-8 border-t border-gray-100 pt-6">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-gray-500">Tạm tính</p>
            <p className="text-2xl font-bold text-orange-600">{totalPrice}đ</p>
          </div>
          <button
            onClick={addToCart}
            className="w-full rounded-full bg-black from-orange-500 to-red-500 py-4 text-center font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-100"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
