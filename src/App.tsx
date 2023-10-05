import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import "./App.css";
import { ProductList, Product } from "./models/data";
import Cart from "./Components/Cart/cart";

function App() {
  const [isCart, setIsCart] = useState<boolean>(false);
  const [cartElement, setCartElement] = useState<Product[]>([]);
  const [checkProductList, setcheckProductList] = useState<(Product | null)[]>(
    []
  );

  const toggleCart = () => {
    setIsCart(!isCart);
  };

  const closeCart = () => {
    setIsCart(false);
  };

  const addToCart = (index: number) => {
    const addProductToCart = ProductList[index];

    if (addProductToCart) {
      const existingItem = cartElement.find(
        (item) => item.name === addProductToCart.name
      );

      if (existingItem) {
        const updatedCart = cartElement.map((item) =>
          item.name === addProductToCart.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        setCartElement(updatedCart);
      } else {
        setCartElement([...cartElement, { ...addProductToCart, qty: 1 }]);
      }
    }
  };

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalCartItem = cartElement.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <div className="App">
      <header>
        <FaShoppingCart className="icon-cart" onClick={toggleCart} />
        {/* Hiển thị tổng số lượng sản phẩm */}
        <div id="total-item">{totalCartItem}</div>
      </header>
      <div className="cart">
        {isCart && (
          <Cart
            cartElement={cartElement}
            onClick={closeCart}
            setSelectedProduct={setCartElement}
          />
        )}
      </div>
      <main>
        {ProductList.map((product, index) => (
          <div className="product-card" key={product.name}>
            <div className="product-stock"></div>
            <div className="product-image">
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <div className="product-name">
                <h3>{product.name}</h3>
              </div>
              <div className="product-price">
                <h4>{product.price}</h4>
                <div className="quantity-control">
                  {/* Hiển thị số lượng sản phẩm của sản phẩm đang chọn */}
                </div>
                <button
                  onClick={() => {
                    addToCart(index);
                  }}
                  className="custom-button"
                >
                  Add
                </button>
                {/* <button
                  className="btn btb-add"
                  onClick={() => {
                    addToCart(index);
                  }}
                >
                  Add
                </button> */}
              </div>

              <p>{product.des}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
