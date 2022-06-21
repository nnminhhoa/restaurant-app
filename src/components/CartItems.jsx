import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { BiMinus, BiPlus } from 'react-icons/bi';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

const CartItems = ({ item, flag, setFlag }) => {
  const [qty, setQty] = useState(item.qty);
  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const cartDispatch = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
  };

  const updateQty = (action, id) => {
    if (action === 'add') {
      setQty(qty + 1);
      cartItems.map((item) => {
        if (item.id === id) {
          item.qty += 1;
          setFlag(flag + 1);
        }
      });
      cartDispatch(items);
    } else {
      if (qty === 1) {
        let items = cartItems.filter((item) => item.id !== id);
        setFlag(flag + 1);
        cartDispatch(items);
      } else {
        setQty(qty - 1);
        cartItems.map((item) => {
          if (item.id === id) {
            item.qty -= 1;
            setFlag(flag + 1);
          }
        });
        cartDispatch(items);
      }
    }
  };

  useEffect(() => {
    setQty(item.qty);
    setItems(cartItems);
  }, [cartItems, item]);
  return (
    <div
      key={item?.id}
      className="w-full p-1 px-2 rounded-lg bg-cartItem flex items-center gap-2 "
    >
      <img
        className="w-20 h-20 max-w-[60px] rounded-full object-contain"
        src={item?.imageURL}
        alt={item?.title}
      />
      {/* name section */}
      <div className="flex flex-col gap-2">
        <p className="text-base text-gray-50 ">{item?.title}</p>
        <p className="text-sm blok text-gray-300 font-semibold">
          <span className="mr-1">$</span>
          {parseFloat(item?.price) * qty}
        </p>
      </div>
      {/* button section */}
      <div className="group flex items-center gap-2 ml-auto cursor-pointer">
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty('remove', item?.id)}
        >
          <BiMinus className="text-gray-50" />
        </motion.div>
        <p className="w-5 h-5 rousm bg-cartBg text-gray-50 flex items-center justify-center cursor-default">
          {qty}
        </p>
        <motion.div
          whileTap={{ scale: 0.75 }}
          onClick={() => updateQty('add', item?.id)}
        >
          <BiPlus className="text-gray-50" />
        </motion.div>
      </div>
    </div>
  );
};

export default CartItems;
