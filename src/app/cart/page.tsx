import CartClient from '@/components/CartClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Giỏ hàng',
  description: 'Xem lại các sản phẩm trong giỏ hàng của bạn.',
};

export default function CartPage() {
  return (
    <div className="mx-auto max-w-md">
        <Suspense fallback={<p>Đang tải giỏ hàng...</p>}>
            <CartClient />
        </Suspense>
    </div>
  );
}
