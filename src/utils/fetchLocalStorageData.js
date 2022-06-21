export const fetchUser = () => {
  const useInfo =
    localStorage.getItem('user') !== undefined
      ? JSON.parse(localStorage.getItem('user'))
      : localStorage.clear();
  return useInfo;
};

export const fetchCart = () => {
  const cartInfo =
    localStorage.getItem('cartItems') !== undefined
      ? JSON.parse(localStorage.getItem('cartItems'))
      : localStorage.clear();
  return cartInfo ? cartInfo : [];
};
