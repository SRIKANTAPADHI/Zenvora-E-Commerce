import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Get unique product ID
  const getId = (item) => {
    return item._id || item.id;
  };

  // ADD TO CART
  const addToCart = (product, quantity = 1) => {
    const productId = product._id || product.id;

    const existingProduct = cart.find(
      (item) => (item._id || item.id) === productId,
    );

    const currentQuantity = existingProduct ? existingProduct.quantity : 0;

    const requestedQuantity = currentQuantity + quantity;

    // Check stock
    if (product.stock !== undefined && requestedQuantity > product.stock) {
      alert(`Only ${product.stock} item(s) available in stock`);
      return;
    }

    if (existingProduct) {
      setCart(
        cart.map((item) =>
          (item._id || item.id) === productId
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity,
        },
      ]);
    }
  };

  // INCREMENT
  const increaseQuantity = (id) => {
  setCart((currentCart) =>
    currentCart.map((item) => {
      if ((item._id || item.id) !== id) {
        return item;
      }

      if (
        item.stock !== undefined &&
        item.quantity >= item.stock
      ) {
        alert(
          `Only ${item.stock} item(s) available in stock`
        );

        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    })
  );
};

  // DECREMENT
  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => {
          if (getId(item) === productId) {
            return {
              ...item,
              quantity: item.quantity - 1,
            };
          }

          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  // REMOVE
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => getId(item) !== productId));
  };

  // TOTAL
  const totalPrice = cart.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0,
  );
  //clear cart
  const clearcart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        totalPrice,
        clearcart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};
