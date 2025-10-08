import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Types
export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  occasion: string;
  fabric: string;
  embroidery: string;
  colors: string[];
  sizes: string[];
  description: string;
  careInstructions: string;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

export interface AppState {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  notification: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
    action?: { label: string; onClick: () => void };
  } | null;
  filters: {
    category: string;
    occasion: string;
    priceRange: [number, number];
    colors: string[];
  };
  searchQuery: string;
  user: null | { id: string; name: string; email: string };
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'TOGGLE_WISHLIST'; payload: string }
  | { type: 'SET_FILTERS'; payload: Partial<AppState['filters']> }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SHOW_NOTIFICATION'; payload: { message: string; type: 'success' | 'error' | 'info'; action?: { label: string; onClick: () => void } } }
  | { type: 'HIDE_NOTIFICATION' }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  products: [],
  cart: [],
  wishlist: [],
  notification: null,
  filters: {
    category: '',
    occasion: '',
    priceRange: [0, 100000],
    colors: []
  },
  searchQuery: '',
  user: null
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(
        item => item._id === action.payload._id &&
        item.selectedSize === action.payload.selectedSize &&
        item.selectedColor === action.payload.selectedColor
      );
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item._id === action.payload._id &&
            item.selectedSize === action.payload.selectedSize &&
            item.selectedColor === action.payload.selectedColor
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          notification: {
            show: true,
            message: `You've added ${action.payload.name} to cart!`,
            type: 'success',
            action: {
              label: 'Open Cart',
              onClick: () => window.location.href = '/cart'
            }
          }
        };
      }
      
      return {
        ...state,
        cart: [...state.cart, action.payload],
        notification: {
          show: true,
          message: `You've added ${action.payload.name} to cart!`,
          type: 'success',
          action: {
            label: 'Open Cart',
            onClick: () => window.location.href = '/cart'
          }
        }
      };

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload),
        notification: {
          show: true,
          message: 'Item removed from cart',
          type: 'info'
        }
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'TOGGLE_WISHLIST':
      const isInWishlist = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload],
        notification: {
          show: true,
          message: isInWishlist ? 'Removed from wishlist' : 'Added to wishlist!',
          type: isInWishlist ? 'info' : 'success'
        }
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        searchQuery: action.payload
      };

    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        notification: {
          show: true,
          message: action.payload.message,
          type: action.payload.type,
          action: action.payload.action
        }
      };

    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        notification: null
      };

    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };

    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}