import c1 from "../../Images/1.webp";
import c2 from "../../Images/2.webp";
import c3 from "../../Images/3.webp";
import Roll from "react-reveal/Roll";
import Fade from "react-reveal/Fade";

export default function StoreSection(props) {
  return (
    <div className="store-home-container">
      <Fade right cascade>
        <div className="row crew-row">
          <div className="row product-homepage-content">
            <h2 className="discover-homepage-title">
              {" "}
              גלה את <span className="beauty">הטיפוח</span> מחדש{" "}
            </h2>
            <div className="storetitle">
              <h1 style={{ display: "flex", alignItems: "flex-end" }}>
                {" "}
                חנות המוצרים של IM.Barber{" "}
              </h1>
              <button
                className="enter-shop-btn bounce"
                onClick={() => props.history.push("/store")}
              >
                כניסה לחנות >>
              </button>
            </div>
          </div>
          <div className="row product-homepage-row">
            <Roll right delay={100}>
              <img
                src={c1}
                className="col product-homepage-img"
                alt="קרם פנים"
              ></img>
            </Roll>{" "}
            <Roll right delay={250}>
              <img
                src={c2}
                className="col product-homepage-img"
                alt="קרם לשיער"
              ></img>
            </Roll>{" "}
            <Roll right delay={400}>
              <img
                src={c3}
                className="col product-homepage-img"
                alt="קרם לגבר"
              ></img>
            </Roll>
          </div>
        </div>
      </Fade>
    </div>
  );
}
