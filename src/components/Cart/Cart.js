import React, {useContext} from 'react'
import CartContext from '../../Context/CartContext';
import Modal from '../UI/Modal';
import classes from "./Cart.module.css";
import CartItem from './CartItem';

const Cart = (props) => {
  const { hideCartHandler } = props
  
  const cartCtx = useContext(CartContext)
  
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id)
  }
  
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({...item, amount: 1})
  }

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name} 
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
          /> 
      ))}
    </ul>
  )

  return (
    <Modal hideCartHandler={hideCartHandler}>
      {cartItems}
      {!hasItems && <div className={classes.noItems}>
        <p>There Are No Items In Your Cart</p>
      </div>}
      {hasItems && <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>}
      <div className={classes.actions}>
        <button onClick={hideCartHandler} className={classes["button--alt"]}>Close</button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  )
}

export default Cart