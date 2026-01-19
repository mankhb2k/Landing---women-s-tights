'use client';

// Định nghĩa lại kiểu của CartItem để có thể tái sử dụng
interface CartItem {
  id: string;
  name: string;
  image: string;
  size: string;
  quantity: number;
  price: number;
}

interface FormCheckProps {
  cartItems: CartItem[];
  totalPrice: number;
}

export default function FormCheck({ cartItems, totalPrice }: FormCheckProps) {
  if (!cartItems || cartItems.length === 0) {
    return <p>Không có sản phẩm nào trong giỏ hàng.</p>;
  }

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
        <h4 className="font-bold text-gray-800 mb-3">
          Tóm tắt đơn hàng
        </h4>
        <div className="max-h-40 overflow-y-auto space-y-3 pr-2">
          {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                  <div>
                      <p className="font-medium">{item.name} <span className="text-gray-500">(x{item.quantity})</span></p>
                      <p className="text-xs text-gray-500">Phân loại: Size {item.size}</p>
                  </div>
                  <p className="font-semibold">{(item.price * item.quantity).toLocaleString('vi-VN')}đ</p>
              </div>
          ))}
        </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-300 pt-3 text-sm">
        <span className="font-medium text-gray-600">Tổng thanh toán:</span>
        <span className="text-lg font-extrabold text-orange-600">{totalPrice.toLocaleString('vi-VN')}đ</span>
      </div>
    </div>
  );
}
