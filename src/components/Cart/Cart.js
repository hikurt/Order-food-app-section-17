import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

import classes from './Cart.module.css';


const Cart = (props) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
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
  
  const submitOrderHandler = async (userData) => {
    setIsSubmitting(true);
    await fetch('https://custom-5f570-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
      method: 'POST',
      body: JSON.stringify({
        user: userData,
        orderedItems: cartCtx.items
      })
    });
    setIsSubmitting(false);
    setDidSubmit(true);
    cartCtx.clearCart();
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
      <button className={classes['button--alt']} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler} >
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {showCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
      {!showCheckout && modalActions}
    </React.Fragment>
  );
  
    const isSubmittingModalContent = <p>Sending order data...</p>;

    const didSubmitModalContent = (
      <React.Fragment>
        <p>Successfully sent the order!</p>  
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onClose}>
          Close
        </button>
        </div>
      </React.Fragment>
    );

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;