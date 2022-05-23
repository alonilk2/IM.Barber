import "../../CSS/Store.css";
import { PostOrder } from "../../Actions/ordersActions";
import { SHIPPING_PRICE } from "../../Constants/generalConstants";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import useUser from "../../Hooks/useUser";
import useCart from "../../Hooks/useCart";
// This values are the props in the UI
const currency = "ILS";
const style = { layout: "vertical" };

export default function Delivery() {
  const [validated, setValidated] = useState(false);
  const [saved, setSaved] = useState(false);
  const [FirstName, setFirstName] = useState(null);
  const [LastName, setLastName] = useState(null);
  const [Phone, setPhone] = useState(null);
  const [City, setCity] = useState(null);
  const [Street, setStreet] = useState(null);
  const [House, setHouse] = useState(null);
  const [Zip, setZip] = useState(null);
  const [OrderId, setOrderId] = useState(null);
  const user = useUser();
  const cartObject = useCart();
  const cartResponse = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  let totalSum = cartObject.totalSum.toFixed(2);

  const handleSubmit = (event) => {
    const jsonAddress = {
      city: City,
      street: Street,
      house: House,
      zip: Zip,
    };
    dispatch(
      PostOrder(
        cartObject.cart,
        user.data.user,
        cartObject.totalSum,
        jsonAddress,
        OrderId,
        Phone
      )
    );
  };

  const handleSaveDelivery = (e) => {
    e.preventDefault();
    let isPhone = /^\d+$/.test(Phone) && Phone.length === 10;
    if (isPhone) {
      if (FirstName && LastName && Phone && City && Street && House && Zip)
        setValidated(true);
      setSaved(true);
    } else alert("מספר הפלאפון שהוזן אינו תקין. יש להקליד מספר בן 10 ספרות");
  };

  let storage = localStorage.getItem("cart");

  if (!storage) return <Redirect to={"/store"} />;
  return (
    <div className="cart-container">
      <h3 className="title">פרטי משלוח ותשלום</h3>

      <div className="box-row">
        {AddressBox()}
        {PaymentBox()}
        <div className="summery-box">
          <h4 className="title">סיכום הזמנה</h4>
          <div className="spaced-line">
            <p>עלות המוצרים: </p>
            <p>₪{(cartObject.totalSum - SHIPPING_PRICE).toFixed(2)}</p>
          </div>
          {cartResponse?.coupon?.discount > 0 && (
            <div className="spaced-line">
              <p>הנחת קופון ({cartResponse?.coupon?.discount}%):</p>
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
        </div>
      </div>
    </div>
  );

  function PaymentBox() {
    return (
      <div className="list-box">
        <h3 className="title">פרטי תשלום</h3>
        {saved ? (
          <PayPalButtons
            style={style}
            forceReRender={[cartObject.totalSum, currency, style]}
            createOrder={(data, actions) => {
              return actions.order
                .create({
                  purchase_units: [
                    {
                      amount: {
                        currency_code: currency,
                        value: cartObject.totalSum.toFixed(2),
                      },
                    },
                  ],
                  application_context: {
                    shipping_preference: "NO_SHIPPING",
                  },
                })
                .then((orderId) => {
                  setOrderId(orderId);
                  return orderId;
                });
            }}
            onApprove={function (data, actions) {
              return actions.order.capture().then(function () {
                handleSubmit();
              });
            }}
            onError={function (data) {
              console.log("error");
              console.log(data);
            }}
          />
        ) : (
          <h5 style={{ marginTop: "30%" }}>יש להזין קודם פרטי משלוח</h5>
        )}
      </div>
    );
  }

  function AddressBox() {
    return (
      <div className="list-box">
        <h3 className="title">פרטי משלוח</h3>
        <Form noValidate validated={validated}>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom01">
              <Form.Label>שם פרטי</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="שם פרטי"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                יש להזין שם פרטי
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom02">
              <Form.Label>שם משפחה</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="שם משפחה"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                יש להזין שם משפחה
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>עיר</Form.Label>
              <Form.Control
                type="text"
                placeholder="עיר"
                required
                onChange={(e) => setCity(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                יש להזין עיר
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom03">
              <Form.Label>רחוב</Form.Label>
              <Form.Control
                type="text"
                placeholder="רחוב"
                required
                onChange={(e) => setStreet(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                יש להזין רחוב
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label>מספר בית</Form.Label>
              <Form.Control
                type="text"
                placeholder="מספר בית"
                onChange={(e) => setHouse(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                יש להזין מספר בית
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationCustom05">
              <Form.Label>מיקוד</Form.Label>
              <Form.Control
                type="text"
                placeholder="מיקוד"
                onChange={(e) => setZip(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                יש להזין מיקוד
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustom05">
              <Form.Label>מספר טלפון</Form.Label>
              <Form.Control
                type="text"
                placeholder="מספר טלפון"
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                יש להזין מספר טלפון
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button onClick={handleSaveDelivery}>שמירה</Button>
        </Form>
      </div>
    );
  }
}
