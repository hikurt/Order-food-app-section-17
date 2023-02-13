import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';


const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);

  const cartCtx = useContext(CartContext);

  const addItemHandler = ( item ) => {
    cartCtx.addItem({...item, amount: 1});
  };

  const removeItemHandler = ( id ) => {
    cartCtx.removeItem(id)
  };

  const orderHandler = () => {
    setShowCheckout(true);
  };

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0

  const cartItems = <ul className={classes['cart-items']}>
    {
     cartCtx.items.map(item => (
      <CartItem 
        key={item.id}
        name={item.name}
        price={item.price}
        amount={item.amount} 
        onAdd={addItemHandler.bind(null, item)}
        onRemove={removeItemHandler.bind(null, item.id)}
      />)
     )
    }
  </ul>;

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
      {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onCancel={props.onClose}/>}
      {!showCheckout && modalActions}
    </Modal>
  );
};

export default Cart;