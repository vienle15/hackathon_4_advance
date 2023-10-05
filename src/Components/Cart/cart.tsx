ProductList;
import { ProductList, Product } from "../../models/data";
import "./style.css";


interface CartProps {
  cartItems: Product[];
  onClick: () => void;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product[]>>; // Cập nhật kiểu này
}

function Cart({ cartItems, onClick, setSelectedProduct }: CartProps) {
  // Tính tổng giá tiền trong giỏ hàng
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );
  const clearCart = () => {
    setSelectedProduct([]); // Đặt giỏ hàng là mảng rỗng để xóa hết sản phẩm
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
            {cartItems.map((product) => (
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
                      onClick={() =>
                        setSelectedProduct(() => {
                          // Xóa sản phẩm khỏi giỏ hàng
                          const updatedCart = cartItems.filter(
                            (item) => item !== product
                          );
                          return updatedCart;
                        })
                      }
                    >
                      -
                    </button>
                    <span>{product.qty}</span>
                    <button
                      onClick={() =>
                        setSelectedProduct(() => {
                          // Xóa sản phẩm khỏi giỏ hàng
                          const updatedCart = cartItems.filter(
                            (item) => item !== product
                          );
                          return updatedCart;
                        })
                      }
                    >
                      +
                    </button>
                  </div>
                </td>
                <td>${(product.price * product.qty).toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => {
                      // Xóa sản phẩm khỏi giỏ hàng
                      const updatedCart = cartItems.filter(
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
                  <button id="submitbtn" onClick={onClick}>
                    Checkout Now
                  </button>
                  <button id="submitbtn" onClick={clearCart}>
                    Xóa hết sản phẩm trong giỏ hàng
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
