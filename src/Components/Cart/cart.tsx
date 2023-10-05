import { ProductList, Product } from "../../models/data";
import "./style.css";

interface CartProps {
  cartElement: Product[];
  onClick: () => void;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product[]>>;
}

function Cart({ cartElement, onClick, setSelectedProduct }: CartProps) {
  const totalAmount = cartElement.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const clearCart = () => {
    setSelectedProduct([]);
  };

  return (
    <div id="page-cart">
      <div className="container">
        <table id="cart">
          <thead>
            <tr>
              <th className="first">Ảnh</th>
              <th className="second">Tên</th>
              <th className="third">Số lượng</th>
              <th className="fourth">Giá</th>
              <th className="fifth">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {cartElement.map((product) => (
              <tr className="productitm" key={product.name}>
                <td>
                  <img
                    src={product.imgUrl}
                    className="thumb"
                    alt={product.name}
                  />
                </td>
                <td>
                  <p>{product.name}</p>
                </td>
                <td>
                  <div className="td-qyt">
                    <button
                      onClick={() => {
                        const updatedCart = cartElement.map((item) => {
                          if (item === product && item.qty > 1) {
                            return { ...item, qty: item.qty - 1 };
                          }
                          return item;
                        });
                        setSelectedProduct(updatedCart);
                      }}
                    >
                      -
                    </button>
                    <span>{product.qty}</span>
                    <button
                      onClick={() => {
                        const updatedCart = cartElement.map((item) => {
                          if (item === product) {
                            return { ...item, qty: item.qty + 1 };
                          }
                          return item;
                        });
                        setSelectedProduct(updatedCart);
                      }}
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(product.price * product.qty).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => {
                      const updatedCart = cartElement.filter(
                        (item) => item !== product
                      );
                      setSelectedProduct(updatedCart);
                    }}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
            <tr className="totalprice">
              <td colSpan={3}>&nbsp;</td>
              <td colSpan={2}>
                <div className="td-total-price">
                  <p>Tổng giá tiền</p>
                  <span className="thick">${totalAmount.toFixed(2)}</span>
                </div>
              </td>
            </tr>
            <tr className="checkoutrow">
              <td colSpan={5}>
                <div className="checkout">
                  <button
                    id="submitbtn"
                    onClick={() => {
                      onClick();
                      alert("Mua hàng xong!");
                    }}
                  >
                    Buy
                  </button>
                  <button id="submitbtn" onClick={clearCart}>
                    Clear All
                  </button>
                  <button id="submitbtn" onClick={onClick}>
                    Close
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Cart;
