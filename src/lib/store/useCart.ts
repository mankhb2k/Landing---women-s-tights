import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Định nghĩa kiểu dữ liệu cho Store
interface CartState {
  // State
  isOpen: boolean; // Trạng thái đóng/mở modal chọn size
  size: string; // Size đang chọn (S, M, L, XL)
  quantity: number; // Số lượng đang chọn trong modal
  cartCount: number; // Tổng số lượng sản phẩm trong giỏ hàng

  // Actions
  openSelectModal: () => void;
  closeSelectModal: () => void;
  setSize: (size: string) => void;
  setQuantity: (qty: number) => void;
  addToCart: () => void;
  clearCart: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      // --- Giá trị mặc định ---
      isOpen: false,
      size: "M",
      quantity: 1,
      cartCount: 0,

      // --- Hàm xử lý Modal ---
      openSelectModal: () => set({ isOpen: true }),
      closeSelectModal: () => set({ isOpen: false, quantity: 1 }), // Reset quantity khi đóng

      // --- Hàm xử lý chọn cấu hình ---
      setSize: (size) => set({ size }),

      setQuantity: (qty) =>
        set({
          quantity: Math.max(1, qty), // Đảm bảo số lượng luôn >= 1
        }),

      // --- Hàm thêm vào giỏ ---
      addToCart: () =>
        set((state) => ({
          cartCount: state.cartCount + state.quantity, // Cộng dồn số lượng đã chọn vào giỏ
          isOpen: false, // Đóng modal
          quantity: 1, // Reset số lượng cho lần chọn sau
        })),

      // --- Hàm làm sạch giỏ hàng (Dùng sau khi thanh toán thành công) ---
      clearCart: () =>
        set({
          cartCount: 0,
          size: "M",
          quantity: 1,
          isOpen: false,
        }),
    }),
    {
      name: "cart-storage", // Tên key trong LocalStorage
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu trữ cartCount và size vào máy người dùng
      // Không lưu isOpen và quantity để tránh lỗi giao diện khi load lại trang
      partialize: (state) => ({
        cartCount: state.cartCount,
        size: state.size,
      }),
    },
  ),
);
