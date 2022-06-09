import c1 from "../../Images/1.png";
import c2 from "../../Images/2.webp";
import c3 from "../../Images/3.webp";
import Fade from "react-reveal/Fade";
import useWindowSize from '../../Hooks/useWindowSize'
export default function StoreSection(props) {
  const size = useWindowSize();
  return (
    <div className="store-home-container">
      <div className="row crew-row">
        <div className="row product-homepage-content">
          <Fade left cascade>
            <h2 className="discover-homepage-title">
              {" "}
              גלה את <br />
              <span className="beauty" style={{ fontSize: "6vw" }}>
                הטיפוח
              </span>{" "}
              <br />
              מחדש{" "}
            </h2>
            <h4 style={{ textAlign: "center", fontWeight: 'lighter' }}>
              {" "}
              בחנות המוצרים של IM.Barber{" "}
            </h4>
          </Fade>
        </div>
        <div className="row product-homepage-row">
          <img src={c1} className="product-homepage-img" alt="קרם פנים"></img>{" "}
          <img
            src={c2}
            className="product-homepage-img"
            style={{ transform: "scale(1.4)" }}
            alt="קרם לשיער"
          ></img>
          <img src={c3} className="product-homepage-img" alt="קרם לגבר"></img>
        </div>
        {size.width > 800 && <div style={{margin: '3%'}}></div>}
        <div className="storetitle">
          <button
            className="enter-shop-btn bounce"
            onClick={() => props.history.push("/store")}
          >
            כניסה לחנות >>
          </button>
        </div>
      </div>
    </div>
  );
}
