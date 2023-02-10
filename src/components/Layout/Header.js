import React, {Fragment} from 'react';
import classes from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
  return <Fragment>
    <header className={classes.header}>
      <h1>ReactMeals</h1>
      <HeaderCartButton onClick={props.onShowCart}/>
    </header>
    <div className={classes['main-image']}>
      <img src='https://img.freepik.com/premium-photo/group-friends-eating-together_53876-9934.jpg?w=826' alt='A table full of delicious food!'/>
    </div>
  </Fragment>
};

export default Header;