import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { MdAddShoppingCart } from 'react-icons/md';
import NotFound from '../img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

const RowContainer = ({ flag, data, scrollValue }) => {
  const rowContainerRef = useRef();
  const [items, setItems] = useState([]);

  const [{ cartItems }, dispatch] = useStateValue();

  const addtocart = (product) => {
    /* console.log(product); */
    const ProductExist = cartItems.find(
      (item) => item.id === product.id,
    );
    if (ProductExist) {
      setItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...ProductExist,
                qty: ProductExist.qty + 1,
              }
            : item,
        ),
      );
    } else {
      setItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  useEffect(() => {
    dispatch({
      type: actionType.SET_CARTITEMS,
      cartItems: items,
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);
  return (
    <div
      ref={rowContainerRef}
      className={`w-full flex items-center gap-3 my-12 bg-rowBg scroll-smooth ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}
    >
      {data ? (
        data.map((item) => (
          <div
            key={item?.id}
            className="w-275 h-[225px] min-w-[275px] md:w-300 md:min-w-[300px] flex flex-col items-center justify-evenly relative my-10 px-4 rounded-lg bg-gray-100 backdrop-blur-lg hover:drop-shadow-lg"
          >
            <div className="w-full flex items-center justify-between">
              <motion.div
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.3 }}
                className="w-40 h-40 -mt-2 drop-shadow-2xl"
              >
                <img
                  src={item?.imageURL}
                  alt={item?.title}
                  className="w-full h-full object-contain"
                />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center cursor-pointer hover:bg-red-600 hover:shadow-md transition-all duration-100 ease-in-out"
                onClick={() => addtocart(item)}
              >
                <MdAddShoppingCart className="text-base text-white" />
              </motion.div>
            </div>

            <div className="w-full -mt-8 flex flex-col gap-2 items-end justify-end">
              <p className="text-textColor font-semibold text-base md:text-lg">
                {item?.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item?.calories}
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-headingColor font-semibold">
                  <span className="text-red-600 text-sm">$</span>
                  {item?.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <img className="h-340" src={NotFound} alt="not-found" />
          <p className="text-xl text-headingColor font-semibold my-2">
            Items Not Available
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
