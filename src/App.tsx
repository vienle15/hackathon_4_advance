import React, { useState } from "react";
import { FaBeer, FaApple, FaHeart, FaShoppingCart } from "react-icons/fa";
import "./App.css";
import { ProductList, Product } from "./models/data";
import Cart from "./Components/Cart/cart";

function App() {
  const [isCart, setIsCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<(Product | null)[]>(
    []
  );

  const toggleCart = () => {
    setIsCart(!isCart);
  };

  const closeCart = () => {
    setIsCart(false);
  };

  const addToCart = (index: number) => {
    const productToAdd = ProductList[index];

    if (productToAdd) {
      const existingItem = cartItems.find(
        (item) => item.name === productToAdd.name
      );

      if (existingItem) {
        const updatedCart = cartItems.map((item) =>
          item.name === productToAdd.name
            ? { ...item, qty: item.qty + 1 }
            : item
        );
        setCartItems(updatedCart);
      } else {
        setCartItems([...cartItems, { ...productToAdd, qty: 1 }]);
      }
    }
  };

  const incrementQuantity = (index: number) => {
    const productToIncrement = selectedProducts[index];

    if (productToIncrement) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index] = {
        ...productToIncrement,
        qty: productToIncrement.qty + 1,
      };
      setSelectedProducts(updatedProducts);
    }
  };

  const decrementQuantity = (index: number) => {
    const productToDecrement = selectedProducts[index];

    if (productToDecrement && productToDecrement.qty > 1) {
      const updatedProducts = [...selectedProducts];
      updatedProducts[index] = {
        ...productToDecrement,
        qty: productToDecrement.qty - 1,
      };
      setSelectedProducts(updatedProducts);
    }
  };

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalCartQuantity = cartItems.reduce(
    (total, item) => total + item.qty,
    0
  );

  return (
    <div className="App">
      <header>
        <FaShoppingCart className="icon-cart" onClick={toggleCart} />
        {/* Hiển thị tổng số lượng sản phẩm */}
        <div id="total-item">{totalCartQuantity}</div>
      </header>
      <main>
        {ProductList.map((product, index) => (
          <div className="product-card" key={product.name}>
            <div className="product-stock">
              <i>
                <FaApple className="icon" />
              </i>
              <p>In Stock</p>
            </div>
            <div className="product-image">
              <img src={product.imgUrl} alt={product.name} />
            </div>
            <div className="product-info">
              <div className="product-name">
                <h3>{product.name}</h3>
                <i>
                  <FaApple className="icon" />
                </i>
              </div>
              <div className="product-price">
                <h4>{product.price}</h4>
                <div className="quantity-control">
                  <button
                    className="btn btn-decrement"
                    onClick={() => {
                      decrementQuantity(index);
                    }}
                  >
                    -
                  </button>
                  {/* Hiển thị số lượng sản phẩm của sản phẩm đang chọn */}
                  <span>{selectedProducts[index]?.qty || 0}</span>
                  <button
                    className="btn btn-increment"
                    onClick={() => {
                      incrementQuantity(index);
                    }}
                  >
                    +
                  </button>
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
      <div className="cart">
        {isCart && (
          <Cart
            cartItems={cartItems}
            onClick={closeCart}
            setSelectedProduct={setCartItems}
          />
        )}
      </div>
    </div>
  );
}

export default App;
