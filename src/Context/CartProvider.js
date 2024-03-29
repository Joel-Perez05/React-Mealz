import { useReducer } from 'react'
import CartContext from './CartContext'

const defaultCartState = {
  items: [],
  totalAmount: 0
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount

    const existingCartItemIdx = state.items.findIndex(
      item => item.id === action.item.id
    );

    const existingCartItem = state.items[existingCartItemIdx]

    let updatedItems;
    
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount
      }
      updatedItems = [...state.items] 
      updatedItems[existingCartItemIdx] = updatedItem
    } else {
      updatedItems = state.items.concat(action.item)
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  if (action.type === "REMOVE") {
    const existingCartItemIdx = state.items.findIndex(
      (item) => item.id === action.id
      );

    const existingCartItem = state.items[existingCartItemIdx]

    const updatedTotalAmount = state.totalAmount - existingCartItem.price
    
    let updatedItems;
    if (existingCartItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount - 1 }
      updatedItems = [...state.items];
      updatedItems[existingCartItemIdx] = updatedItem;
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    }
  }

  return defaultCartState;
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

  const addToCartHandler = (item) => {
    dispatchCartAction({
      type: "ADD", 
      item: item
    })
  }

  const removeFromCartHandler = (id) => {
    dispatchCartAction({
      type: "REMOVE", 
      id: id
    })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addToCartHandler,
    removeItem: removeFromCartHandler,
  }

  return <CartContext.Provider value={cartContext}>
    {props.children}
  </CartContext.Provider>
}

export default CartProvider