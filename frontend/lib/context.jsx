import React, { createContext, useContext, useState } from 'react';

export const ShopContext = createContext();

// export const CardContext = createContext(null);

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [qty, setQty] = useState(1);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  //Increase product countity
  const increaseQty = () => {
    setQty(prevQty => prevQty + 1);
  };
  //Decrease product quantity
  const decreaseQty = () => {
    setQty(prevQty => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  // Add Product to the Cart
  const onAdd = (product, quantity) => {
    setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity);

    setTotalQuantities(prevTotal => prevTotal + quantity);

    const exist = cartItems.find(item => item.slug === product.slug);

    if (exist) {
      setCartItems(
        cartItems.map(item =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: quantity }]);
      setQty(1);
    }
  };

  const onRemove = product => {
    setTotalPrice(prevTotalPrice => prevTotalPrice - product.price);

    setTotalQuantities(prevTotal => prevTotal - 1);

    const exist = cartItems.find(item => item.slug === product.slug);

    if (exist.quantity === 1) {
      setCartItems(cartItems.filter(item => item.slug !== exist.slug));
    } else {
      setCartItems(
        cartItems.map(item =>
          item.slug === product.slug
            ? { ...exist, quantity: exist.quantity - 1 }
            : item
        )
      );
    }
  };

  return (
    <ShopContext.Provider
      value={{
        qty,
        increaseQty,
        decreaseQty,
        showCart,
        setShowCart,
        cartItems,
        onAdd,
        onRemove,
        totalPrice,
        totalQuantities,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useStateContext = () => useContext(ShopContext);
