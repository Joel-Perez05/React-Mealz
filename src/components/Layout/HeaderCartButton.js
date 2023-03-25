import React, {useContext, useEffect, useState} from 'react'
import CartIcon from '../Cart/CartIcon'
import classes from "../Layout/HeaderCartButton.module.css"
import CartContext from '../../Context/CartContext'

const HeaderCartButton = (props) => {
  const { showCartHandler } = props

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  
  const cartCtx = useContext(CartContext)

  const {items} = cartCtx;

  const numOfCartItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0)

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ""}`

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    setBtnIsHighlighted(true);
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300);

    return () => {
      clearTimeout(timer)
    }
  }, [items])
  

  return (
    <button onClick={showCartHandler} className={btnClasses}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{ numOfCartItems }</span>
    </button>
  )
}

export default HeaderCartButton