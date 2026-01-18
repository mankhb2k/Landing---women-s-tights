"use client";
import { useCart } from "@/lib/store/useCart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function NavBottom({
  isCartPage = false,
  onCheckout,
}: {
  isCartPage?: boolean;
  onCheckout?: () => void;
}) {
  const { cartCount, openSelectModal } = useCart();

  return (
    <div className="fixed right-0 bottom-0 left-0 z-20 border-t border-white/20 bg-white/30 p-4 shadow-lg backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center gap-4">
        {!isCartPage ? (
          <>
            <button
              onClick={openSelectModal}
              className="flex-1 rounded-xl bg-black py-3 font-bold text-white transition active:scale-95"
            >
              Thêm vào giỏ
            </button>
            <Link
              href="/cart"
              className="relative rounded-full bg-gray-100 p-2"
            >
              <ShoppingCart />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 rounded-full bg-red-500 px-1.5 text-[10px] text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </>
        ) : (
          <button
            onClick={onCheckout}
            className="flex-1 rounded-xl bg-black from-pink-500 to-orange-400 py-3 font-bold text-white"
          >
            Thanh toán ngay
          </button>
        )}
      </div>
    </div>
  );
}
