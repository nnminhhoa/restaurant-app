import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

import {
  MdOutlineKeyboardBackspace,
  MdOutlineClear,
  MdLogin,
} from 'react-icons/md';
import { GiShoppingCart } from 'react-icons/gi';

import EmptyCart from '../img/emptyCart.svg';
import CartItems from './CartItems';

const CartContainer = () => {
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag, cartItems]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: [],
    });

    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      transition={{ duration: 0.4, ease: 'linear' }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]"
    >
      <div className="w-full flex items-center justify-between py-2 px-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          whileTap={{ scale: 0.75 }}
          className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 transition-all ease-in-out cursor-pointer text-base text-textColor"
          onClick={clearCart}
        >
          Clear
          <MdOutlineClear />
        </motion.p>
      </div>

      {/* Botom section */}
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          {/* cart Items section */}
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {/* Cart Item */}
            {cartItems &&
              cartItems.map((item) => (
                <CartItems
                  key={item.id}
                  item={item}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>
          {/* cart total section */}
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">$ {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">$ 2.5</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2"></div>

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">
                Total
              </p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>

            {user ? (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="group flex justify-center items-center w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 text-gray-100 group-hover:text-white text-lg my-2 hover:shadow-xl transition-all duration-150 ease-in-out"
              >
                Check Out
                <GiShoppingCart className="ml-2 text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-100 ease-in-out" />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.75 }}
                className="group flex justify-center items-center w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-500 text-gray-100 group-hover:text-white text-lg my-2 hover:shadow-xl transition-all duration-150 ease-in-out"
              >
                Login to check out
                <MdLogin className="ml-2 text-2xl group-hover:scale-125 group-hover:rotate-12 transition-all duration-100 ease-in-out" />
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img className="w-300" src={EmptyCart} alt="emty-cart" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
