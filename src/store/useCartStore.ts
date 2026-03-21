import { create } from 'zustand';

interface CartItem {
  product: string; // Product ID
  name: string;
  price: number;
  quantity: number;
  coverImage: string;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  totalItems: number;
  totalPrice: number;
  toggleCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isOpen: false,
  totalItems: 0,
  totalPrice: 0,

  toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

  addItem: (item) =>
    set((state) => {
      const existingItem = state.items.find((i) => i.product === item.product);
      const quantityToAdd = item.quantity || 1;
      
      let newItems;
      if (existingItem) {
        newItems = state.items.map((i) =>
          i.product === item.product ? { ...i, quantity: i.quantity + quantityToAdd } : i
        );
      } else {
        newItems = [...state.items, { ...item, quantity: quantityToAdd }];
      }

      const totalItems = newItems.reduce((acc, i) => acc + i.quantity, 0);
      const totalPrice = newItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

      return { items: newItems, totalItems, totalPrice, isOpen: true }; // Open cart when added
    }),

  removeItem: (productId) =>
    set((state) => {
      const newItems = state.items.filter((i) => i.product !== productId);
      const totalItems = newItems.reduce((acc, i) => acc + i.quantity, 0);
      const totalPrice = newItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
      return { items: newItems, totalItems, totalPrice };
    }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      if (quantity < 1) return state; // Don't allow less than 1
      
      const newItems = state.items.map((i) =>
        i.product === productId ? { ...i, quantity } : i
      );
      
      const totalItems = newItems.reduce((acc, i) => acc + i.quantity, 0);
      const totalPrice = newItems.reduce((acc, i) => acc + i.price * i.quantity, 0);
      return { items: newItems, totalItems, totalPrice };
    }),

  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
}));
