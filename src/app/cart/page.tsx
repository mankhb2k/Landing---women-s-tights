import CartClient from '@/components/CartClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Giỏ hàng',
  description: 'Xem lại các sản phẩm trong giỏ hàng của bạn.',
};

function CartSkeleton() {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-6" />
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4 items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-lg" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="mx-auto max-w-md">
      {/* Sử dụng Skeleton thay vì text thuần túy */}
      <Suspense fallback={<CartSkeleton />}>
        <CartClient />
      </Suspense>
    </div>
  );
}
