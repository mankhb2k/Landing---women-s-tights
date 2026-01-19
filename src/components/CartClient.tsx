'use client';

import { useCart, useCartTotalPrice } from '@/lib/store/useCart';
import Image from 'next/image';
import { Minus, Plus, Trash2, ChevronLeft } from 'lucide-react';
import NavBottom from './NavBottom';
import Link from 'next/link';
import { useState } from 'react';
import FormCheckout from './FormCheckOut';
import CartEmpty from './CartEmpty';

export default function CartClient() {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const totalPrice = useCartTotalPrice();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length > 0) setIsCheckingOut(true);
  };

  return (
    <div className="p-4 pb-32 max-w-2xl mx-auto">
      {/* ---- Header: Luôn hiển thị ---- */}
      <div className="relative flex items-center justify-center mb-6 py-2">
        <Link href="/" className="absolute left-0 p-2 text-gray-600 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-xl font-bold uppercase tracking-tight">Giỏ hàng</h1>
        {cartItems.length > 0 && (
          <button 
            onClick={clearCart} 
            className="absolute right-0 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>

      {/* ---- Nội dung chính: Sử dụng toán tử 3 ngôi ---- */}
      {cartItems.length === 0 ? (
        <CartEmpty />
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-gray-50">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={90}
                  height={90}
                  className="rounded-xl object-cover bg-gray-100"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-bold truncate">{item.name}</p>
                  <p className="text-xs text-gray-500 mb-1">Size: {item.size}</p>
                  <p className="font-black text-black">{(item.price).toLocaleString('vi-VN')}đ</p>
                </div>
                
                <div className="flex flex-col items-end gap-3">
                  <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-full border border-gray-100">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-sm disabled:opacity-30"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-6 w-6 flex items-center justify-center rounded-full bg-white shadow-sm"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)} 
                    className="text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:text-red-500"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-dashed">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-medium">Tổng thanh toán:</span>
              <span className="text-2xl font-black text-black">{totalPrice.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          <NavBottom isCartPage={true} onCheckout={handleCheckout} />
        </>
      )}

      <FormCheckout isOpen={isCheckingOut} onClose={() => setIsCheckingOut(false)} />
    </div>
  );
}