import React, { useState } from 'react';
import { motion } from 'framer-motion';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { app } from '../firebase.config';

import { MdLogout } from 'react-icons/md';
import { BsShop } from 'react-icons/bs';
import { CgAddR } from 'react-icons/cg';

import Logo from '../img/logo.png';
import Avatar from '../img/avatar.png';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reduce';

const Header = () => {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

  const [isMenu, setIsMenu] = useState(false);

  const login = async () => {
    if (!user) {
      const {
        // eslint-disable-next-line no-unused-vars
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);

      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);

    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    setIsMenu(false);
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* Desktop and tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link
          to={'/'}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8"
          >
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Home
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Menu
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              About us
            </li>
            <li
              className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
              onClick={() => setIsMenu(false)}
            >
              Service
            </li>
          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <BsShop className="text-textColor text-2xl cursor-pointer hover:scale-110 transition-all duration-100 ease-in-out" />

            {cartItems && cartItems.length > 0 && (
              <div className="absolute -top-3 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-cartNumbg opacity-80">
                <p className="text-xs text-white font-semibold">
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative" onClick={login}>
            <motion.img
              whileTap={{ scale: 0.6 }}
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              src={user ? user.photoURL : Avatar}
              alt="useprofile"
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="flex flex-col w-36 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 overflow-hidden"
              >
                {user &&
                  user.email === 'daotackid27111999@gmail.com' && (
                    <Link to={'/createItem'}>
                      <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base">
                        New Item <CgAddR />
                      </p>
                    </Link>
                  )}
                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <BsShop className="text-textColor text-2xl cursor-pointer hover:text-3xl" />
          {cartItems && cartItems.length > 0 && (
            <div className="absolute -top-3 -right-3 flex items-center justify-center w-5 h-5 rounded-full bg-cartNumbg opacity-80">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>
        <Link
          to={'/'}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img className="w-8 object-cover" src={Logo} alt="logo" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative" onClick={login}>
          <motion.img
            whileTap={{ scale: 0.6 }}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            src={user ? user.photoURL : Avatar}
            alt="useprofile"
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="flex flex-col w-36 bg-gray-50 shadow-xl rounded-lg absolute top-12 right-0 overflow-hidden"
            >
              {user && user.email === 'daotackid27111999@gmail.com' && (
                <Link to={'/createItem'}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor hover:text-headingColor text-base">
                    New Item <CgAddR />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col">
                <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200">
                  Home
                </li>
                <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200">
                  Menu
                </li>
                <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200">
                  About us
                </li>
                <li className="px-4 py-2 text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-200">
                  Service
                </li>
              </ul>

              <p
                className="m-2 p-2 rounded-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor hover:text-headingColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
