import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Accordion from "react-bootstrap/Accordion";
import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import { CircularProgress } from "@mui/material";
import useCoupons from "../../Hooks/useCoupons";

export default function CouponsManagement(eKey) {
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: 0,
  });
  const [success, setSuccess] = useState();
  const [loading, setLoading] = useState(false);
  const [couponArr, addCoupon, deleteCoupon] = useCoupons();

  const triggerSuccess = async () => {
    setSuccess(true);
    await new Promise((r) => setTimeout(r, 7000));
    setSuccess(false);
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(newCoupon)
    let result = await addCoupon(newCoupon.code, newCoupon.discount);
    if (result == true) triggerSuccess();
    setLoading(false);
  };

  const handleDeleteCoupon = async (e, code) => {
    e.preventDefault();
    let result = await deleteCoupon(code);
    if (result == true) triggerSuccess();
  };

  const mapper = () => {
    let counter = 0;
    if (couponArr) {
      return couponArr.map((coupon, idx) => {
        counter++;
        return (
          <tr key={idx}>
            <td>{counter}</td>
            <td>{coupon.code}</td>
            <td>{coupon.discount}</td>
            <td>
              <button
                type="button"
                class="upbtn"
                style={{ backgroundColor: "red", height: "28px" }}
                onClick={(e) => handleDeleteCoupon(e, coupon.code)}
              >
                הסר
              </button>
            </td>
          </tr>
        );
      });
    } else return null;
  };

  const successAlert = () => {
    return (
      <Zoom>
        <Alert variant="success" style={{ position: "absolute" }}>
          <Alert.Heading>הפעולה בוצעה בהצלחה !</Alert.Heading>
        </Alert>
      </Zoom>
    );
  };
  return (
    <Accordion.Item eventKey={eKey}>
      <Accordion.Header>ניהול קופונים</Accordion.Header>

      <Accordion.Body style={{ display: "flex", flexDirection: "row" }}>
        <div className="row">
          {success ? successAlert() : null}
          <div className="col add-barber">
            <Fade left duration={400}>
              <h5 className="sub-title">הוספת קופון</h5>
              <Form.Control
                type="text"
                placeholder="קוד קופון"
                value={newCoupon.code}
                onChange={(e) =>
                  {
                    console.log(e)
                    setNewCoupon({
                      ...newCoupon,
                      code: e.target.value,
                    })
                  }

                }
              />
              <Form.Control
                type="number"
                placeholder="אחוזי הנחה"
                value={newCoupon.discount}
                onChange={(e) =>
                  setNewCoupon({
                    ...newCoupon,
                    discount: e.target.value,
                  })
                }
              />
              <div className="row add-category-btn">
                <div
                  className="rightcol"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {loading && <CircularProgress />}
                  <button
                    type="button"
                    class="upbtn"
                    style={{ width: "200px", height: "50px", padding: "1%" }}
                    onClick={handleAddCoupon}
                  >
                    הוסף קופון
                  </button>
                </div>
              </div>
            </Fade>
          </div>
          <div
            className="col delete-category-row"
            style={{ height: "500px", overflowY: "scroll" }}
          >
            <h5 className="sub-title">הסרת קופון</h5>
            <div className="rightcol">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>קוד קופון</th>
                    <th>אחוזי הנחה</th>
                    <th>הסרה</th>
                  </tr>
                </thead>
                <tbody>{mapper()}</tbody>
              </Table>
            </div>
          </div>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
}
