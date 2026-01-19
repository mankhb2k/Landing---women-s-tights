'use client';

import { useCart, useCartTotalPrice } from '@/lib/store/useCart';
import Image from 'next/image';
import { Minus, Plus, Trash2, ShoppingCart, ChevronLeft } from 'lucide-react';
import NavBottom from './NavBottom';
import Link from 'next/link';
import { useState } from 'react';
import FormCheckout from './FormCheckOut'; // Import FormCheckout

export default function CartClient() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const totalPrice = useCartTotalPrice();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Hàm này sẽ được gọi khi nhấn nút "Thanh toán"
  const handleCheckout = () => {
    if (cartItems.length > 0) {
        setIsCheckingOut(true); // Mở form checkout
    }
  };

  const handleCloseCheckout = () => {
    setIsCheckingOut(false);
  }

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-200px)]">
        <ShoppingCart size={64} className="text-gray-300" />
        <h2 className="mt-4 text-xl font-semibold text-gray-700">Giỏ hàng của bạn đang trống</h2>
        <p className="mt-2 text-gray-500">Hãy quay lại và chọn cho mình sản phẩm ưng ý nhé.</p>
        <Link href="/" className="mt-6 rounded-full bg-black px-6 py-3 font-bold text-white transition hover:bg-gray-800">
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 pb-32">
      {/* ---- Header với nút Back ---- */}
      <div className="relative flex items-center justify-center mb-6">
          <Link href="/" className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full p-2 text-gray-600 hover:bg-gray-100 transition-colors">
              <ChevronLeft size={24} />
          </Link>
          <h1 className="text-2xl font-bold">Giỏ hàng</h1>
          <button onClick={clearCart} className="absolute right-0 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
              <Trash2 size={14}/> 
          </button>
      </div>

      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
            <Image
              src={item.image}
              alt={item.name}
              width={80}
              height={80}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-500">Size: {item.size}</p>
              <p className="text-sm font-bold text-orange-600">{(item.price).toLocaleString('vi-VN')}đ</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition active:bg-gray-200"
                  disabled={item.quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition active:bg-gray-200"
                >
                  <Plus size={14} />
                </button>
              </div>
              <button onClick={() => removeFromCart(item.id)} className="text-xs text-gray-400 hover:text-red-500">
                Xóa
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t">
          <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Tổng cộng:</span>
              <span className="text-2xl font-bold text-orange-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
          </div>
      </div>

      {/* Thanh điều hướng cuối trang */}
      <NavBottom isCartPage={true} onCheckout={handleCheckout} />

      {/* Modal thanh toán */}
      <FormCheckout isOpen={isCheckingOut} onClose={handleCloseCheckout} />

    </div>
  );
}
