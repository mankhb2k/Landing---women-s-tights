"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, Trash2 } from "lucide-react";
import { useCart } from "@/lib/store/useCart";
import NavBottom from "@/components/NavBottom";
import FormCheckout from "@/components/FormCheckOut";


export default function CartPage() {
  const router = useRouter();
  const { size, cartCount } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="flex items-center bg-white p-4 shadow-sm">
        <button onClick={() => router.back()}>
          <ChevronLeft size={28} />
        </button>
        <h1 className="flex-1 text-center text-lg font-bold">
          Giỏ hàng ({cartCount})
        </h1>
      </div>

      {/* Item List */}
      <div className="p-4">
        {cartCount > 0 ? (
          <div className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="h-24 w-20 rounded-md bg-gray-200 bg-[url('/pants-thumb.jpg')] bg-cover"></div>
            <div className="flex-1">
              <h3 className="font-semibold">Quần tất cao cấp</h3>
              <p className="text-sm text-gray-500">Size: {size}</p>
              <p className="mt-1 font-bold text-orange-600">199.000đ</p>
            </div>
            <button className="text-gray-400">
              <Trash2 size={20} />
            </button>
          </div>
        ) : (
          <p className="mt-20 text-center text-gray-500">
            Giỏ hàng của bạn đang trống
          </p>
        )}
      </div>

      {/* Form Checkout Modal */}
      <FormCheckout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      {/* NavBottom chuyên dụng cho Cart */}
      <NavBottom isCartPage={true} onCheckout={() => setIsCheckoutOpen(true)} />
    </div>
  );
}
