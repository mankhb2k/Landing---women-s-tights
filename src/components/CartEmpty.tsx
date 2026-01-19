import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';

export default function CartEmpty() {
  return (
    <div className="flex flex-col items-center justify-center text-center h-[calc(100vh-300px)]">
      <ShoppingCart size={64} className="text-gray-200" />
      <h2 className="mt-4 text-xl font-semibold text-gray-700">Giỏ hàng của bạn đang trống</h2>
      <p className="mt-2 text-gray-400 text-sm">Hãy quay lại và chọn cho mình sản phẩm ưng ý nhé.</p>
      <Link href="/" className="mt-8 rounded-full bg-black px-8 py-3 font-bold text-white transition hover:bg-gray-800 active:scale-95">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}