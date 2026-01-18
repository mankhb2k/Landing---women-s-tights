"use client";

interface FormCheckProps {
  size: string;
  price: string;
}

export function FormCheck({ size, price }: FormCheckProps) {
  return (
    <div className="mb-6 rounded-2xl border border-orange-100 bg-orange-50 p-4">
      <div className="flex items-center gap-4">
        {/* Ảnh thumbnail nhỏ của sản phẩm */}
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-200 bg-[url('https://images.unsplash.com/photo-1582880985227-445b21458383?q=80&w=200')] bg-cover bg-center"></div>

        <div className="flex-1">
          <h4 className="text-sm font-bold text-gray-800 uppercase">
            Quần Tất Silk Pro
          </h4>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Phân loại: <b className="text-orange-600">Size {size}</b>
            </span>
            <span className="font-bold text-gray-900">{price}đ</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-orange-200 pt-3 text-sm">
        <span className="font-medium text-gray-600">Tổng thanh toán:</span>
        <span className="text-lg font-extrabold text-red-600">{price}đ</span>
      </div>
    </div>
  );
}
