import c1 from "../../Images/1.png";
import c2 from "../../Images/2.webp";
import c3 from "../../Images/3.webp";
import Roll from "react-reveal/Roll";
import Fade from "react-reveal/Fade";

export default function StoreSection(props) {
  return (
    <div className="store-home-container">
      <div className="row crew-row">
        <div className="row product-homepage-content">
          <Fade left cascade>
            <h2 className="discover-homepage-title">
              {" "}
              גלה את <span className="beauty">הטיפוח</span> מחדש{" "}
            </h2>
            <h1 style={{ textAlign: 'center' }}>
                {" "}
                בחנות המוצרים של IM.Barber{" "}
              </h1>
            <div className="storetitle">

              <button
                className="enter-shop-btn bounce"
                onClick={() => props.history.push("/store")}
              >
                כניסה לחנות >>
              </button>
            </div>
          </Fade>
        </div>
        <div className="row product-homepage-row">
          <img
            src={c1}
            className="product-homepage-img"
            alt="קרם פנים"
          ></img>{" "}
          <img
            src={c2}
            className="product-homepage-img"
            style={{ transform: 'scale(1.4)' }}
            alt="קרם לשיער"
          ></img>
          <img
            src={c3}
            className="product-homepage-img"
            alt="קרם לגבר"
          ></img>
        </div>
      </div>
    </div>
  );
}
