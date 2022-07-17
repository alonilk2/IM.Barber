import { useState } from "react";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import useUser from "../../Hooks/useUser";
import useCart from "../../Hooks/useCart";
import {
  SHIPPING_PRICE,
  SERVER_ADDRESS,
} from "../../Constants/generalConstants";
import TextField from "@mui/material/TextField";
import paypal from "../../Images/paypal-logo.png";
const QuantitiesArray = Array.from({ length: 8 }, (_, i) => i + 1);

export default function Cart(props) {
  const [quantities, setQuantities] = useState(Array(8).fill(1));
  const [coupon, setCoupon] = useState();
  const history = useHistory();
  const user = useUser();
  const cartObject = useCart();

  function handleChangeQuantity(e, index, item) {
    let quantityArr = [...quantities],
      value = parseInt(e.target.value);
    if (quantityArr && quantityArr[index]) quantityArr[index] = parseInt(value);
    cartObject.changeQuantity(item, value);
    setQuantities(quantityArr);
  }

  function handleDelete(e, item) {
    e.preventDefault();
    cartObject.deleteFromCart(item);
  }

  const handleSubmitOrder = () => {
    cartObject.signCoupon(coupon);
    if (user) {
      return history.push("/delivery", {
        cart: cartObject.cart,
        discount: cartObject.discount,
        totalDiscount: cartObject.totalDiscount,
        totalSum: cartObject.totalSum,
      });
    }
    history.push("/signin", {
      cartFlag: true, //for auto redirect back to cart after signin
      cart: cartObject.cart,
      discount: cartObject.discount,
      totalDiscount: cartObject.totalDiscount,
      totalSum: cartObject.totalSum,
    });
  };

  const ItemsRowMapper = cartObject.cart.map((item, index) => {
    return (
      <div className="item">
        <div className="title-column">
          <img
            src={SERVER_ADDRESS + "/uploads/" + item.imgname}
            alt={item.producttitle}
            width="100px"
          ></img>
          <p className="title">{item.producttitle}</p>
        </div>

        <div className="price-column">
          <h5 className="price">₪{item.price.toFixed(2)}</h5>
          <Form.Select
            aria-label="Default select example"
            value={item.quantity}
            onChange={(e) => handleChangeQuantity(e, index, item)}
          >
            {QuantitiesArray.map((item) => {
              return (
                <option value={item} key={item}>
                  {item}
                </option>
              );
            })}
          </Form.Select>
          <button className="edit" onClick={(e) => handleDelete(e, item)}>
            מחיקה
          </button>
        </div>
      </div>
    );
  });

  const handleCoupon = (e) => {
    setCoupon(e.target.value);
  };

  return (
    <div className="cart-container">
      <h3 className="title">סל הקניות שלך</h3>
      <div className="box-row">
        <div className="list-box">
          {ItemsRowMapper.length > 0 ? (
            ItemsRowMapper
          ) : (
            <h4 className="empty-title"> הסל שלך ריק </h4>
          )}
        </div>
        <div className="summery-box">
          <h4 className="title">סיכום הזמנה</h4>
          <div className="spaced-line">
            <p>עלות המוצרים: </p>
            <p>₪{(cartObject.totalSum - SHIPPING_PRICE).toFixed(2)}</p>
          </div>
          {cartObject.discount > 0 && (
            <div className="spaced-line">
              <p>הנחת קופון ({cartObject.discount}%):</p>
              <p>₪{cartObject.totalDiscount}</p>
            </div>
          )}
          <div className="spaced-line">
            <p>עלות המשלוח: </p>
            <p>₪{SHIPPING_PRICE}</p>
          </div>
          <div className="spaced-line sum">
            <p>סה"כ לתשלום: </p>
            <h2>₪{cartObject.totalSum.toFixed(2)}</h2>
          </div>
          <TextField
            id="outlined-basic"
            label="יש לך קוד קופון?"
            variant="outlined"
            onChange={handleCoupon}
          />
          <button className="buy-btn" onClick={() => handleSubmitOrder()}>
            בצע הזמנה
          </button>
          <img
            src={paypal}
            width={"85%"}
            style={{ margin: "0 auto" }}
            alt="secure checkout"
          />
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
            <img
              src={"https://cdn-icons-png.flaticon.com/512/483/483408.png"}
              alt="lock"
              width={18}
              style={{margin: '0 1%', objectFit: 'contain'}}
            />
                        <span>רכישה מאובטחת</span>
                        <img
              src={"https://cdn-icons-png.flaticon.com/512/483/483408.png"}
              alt="lock"
              width={18}
              style={{margin: '0 1%', objectFit: 'contain'}}
            />

          </div>
        </div>
      </div>
    </div>
  );
}
