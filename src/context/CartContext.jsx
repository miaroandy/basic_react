import { createContext, useContext, useMemo, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find((item) => item.id === action.product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      return {
        items: [...state.items, { ...action.product, quantity: 1 }],
      }
    }
    case 'REMOVE':
      return { items: state.items.filter((item) => item.id !== action.id) }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const value = useMemo(() => {
    const count = state.items.reduce((sum, item) => sum + item.quantity, 0)
    const total = state.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    )

    return {
      items: state.items,
      count,
      total,
      add: (product) => dispatch({ type: 'ADD', product }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      clear: () => dispatch({ type: 'CLEAR' }),
    }
  }, [state])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart doit être utilisé dans CartProvider')
  }
  return ctx
}
