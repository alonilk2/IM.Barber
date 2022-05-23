import c1 from "../../Images/1.webp";
import c2 from "../../Images/2.webp";
import c3 from "../../Images/3.webp";
import Roll from "react-reveal/Roll";

export default function StoreSection(props) {
  return (
    <div className="store-home-container">
      <div className="row crew-row">
        <Roll right>
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
            <img src={c1} className="col product-homepage-img" alt="קרם פנים"></img>
            <img
              src={c2}
              className="col product-homepage-img"

              alt="קרם לשיער"
            ></img>
            <img src={c3} className="col product-homepage-img" alt="קרם לגבר"></img>
          </div>
        </Roll>
      </div>
    </div>
  );
}
