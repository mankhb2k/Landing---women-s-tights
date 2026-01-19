import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

// Định nghĩa kiểu dữ liệu cho một sản phẩm trong giỏ hàng
interface CartItem {
  id: string; // Sử dụng một ID duy nhất cho mỗi item, ví dụ: 'product-id-M'
  name: string;
  image: string;
  size: string;
  quantity: number;
  price: number; // Thêm giá sản phẩm để tính tổng tiền
}

// Định nghĩa kiểu dữ liệu cho Store
interface CartState {
  // State
  cartItems: CartItem[]; // Mảng chứa các sản phẩm trong giỏ
  isOpen: boolean; // Trạng thái đóng/mở modal chọn size (giữ lại nếu cần)

  // Actions
  addToCart: (product: Omit<CartItem, 'id' | 'quantity'> & { quantityToAdd: number }) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  openSelectModal: () => void;
  closeSelectModal: () => void;
}

// Helper function để tạo ID duy nhất cho mỗi item trong giỏ hàng
const generateItemId = (productName: string, size: string) => `${productName}-${size}`;

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      // --- Giá trị mặc định ---
      cartItems: [],
      isOpen: false,

      // --- Hàm thêm vào giỏ ---
      addToCart: ({ name, image, size, price, quantityToAdd }) =>
        set((state) => {
          const itemId = generateItemId(name, size);
          const existingItem = state.cartItems.find((item) => item.id === itemId);

          let newCartItems = [];

          if (existingItem) {
            // Nếu sản phẩm với size này đã có, chỉ cập nhật số lượng
            newCartItems = state.cartItems.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity + quantityToAdd }
                : item
            );
          } else {
            // Nếu chưa có, thêm sản phẩm mới vào giỏ
            const newItem: CartItem = {
              id: itemId,
              name,
              image,
              size,
              price,
              quantity: quantityToAdd,
            };
            newCartItems = [...state.cartItems, newItem];
          }

          return { cartItems: newCartItems, isOpen: false }; // Đóng modal sau khi thêm
        }),

      // --- Hàm xóa khỏi giỏ ---
      removeFromCart: (itemId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((item) => item.id !== itemId),
        })),

      // --- Hàm cập nhật số lượng ---
      updateQuantity: (itemId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((item) =>
            item.id === itemId ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      // --- Hàm làm sạch giỏ hàng ---
      clearCart: () => set({ cartItems: [] }),

      // --- Hàm xử lý Modal (giữ lại nếu cần) ---
      openSelectModal: () => set({ isOpen: true }),
      closeSelectModal: () => set({ isOpen: false }),

    }),
    {
      name: 'cart-storage', // Tên key trong LocalStorage
      storage: createJSONStorage(() => localStorage),
      // Chỉ lưu trữ những gì cần thiết
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

// --- Selectors (Hàm tiện ích để lấy dữ liệu từ store) ---

// Lấy tổng số lượng sản phẩm trong giỏ
export const useCartTotalItems = () =>
  useCart((state) =>
    state.cartItems.reduce((total, item) => total + item.quantity, 0)
  );

// Lấy tổng giá trị giỏ hàng
export const useCartTotalPrice = () =>
  useCart((state) =>
    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  );
