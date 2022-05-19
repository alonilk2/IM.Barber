import { forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import "../CSS/HomePageCSS.css";
import IDAN from "../Images/idan.webp";
import c1 from "../Images/1.webp";
import c2 from "../Images/2.webp";
import c3 from "../Images/3.webp";
import Zoom from "react-reveal/Zoom";
import Bounce from "react-reveal/Bounce";
import Roll from "react-reveal/Roll";
import ContactComponent from "./ContactComponent";
import useWindowSize from "../Hooks/useWindowSize";

function VideoRow(props) {
  return (
    <div className="first-container">
      <video loop autoPlay playsInline muted>
        <source
          src={"https://alonilk2.github.io/map1/3.mp4"}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="home-main-btn-appoint">
        <button
          className="appoint-btn"
          onClick={() => props.history.push("/whatsapp")}
        >
          <p style={{ margin: 0 }}>הזמן תור</p>
        </button>
      </div>
      <div className="home-main-btn">
        <button
          className="shop-btn"
          onClick={() => props.history.push("/store")}
        >
          <p style={{ margin: 0 }}>לחנות שלנו</p>
        </button>
      </div>
    </div>
  );
}

function ParagraphRow(props) {
  return (
    <div className="sec-container">
      <Zoom>
        <h1 className="secondary-title">מי אנחנו</h1>
        {props.size.width > 800 ? (
          <p className="secondary-paragraph">
            אנחנו מתמקצעים בתחום ה-Barber, כל שיטות הדירוג, הגזירות והטכניקות
            המתקדמות בארץ ובעולם.
            <br />
            באתר שלנו תוכלו לקבוע תור לתספורות, עיצובי זקן או כל דבר אחר שתרצו.
            <br />
            החלטנו שהגיע הזמן לחלוק את כל הידע שצברנו במשך השנים ולהקים אקדמיה
            ללימוד עיצוב שיער לגברים, <br />
            באקדמיה תלמדו את כל הטכניקות והשיטות הסודיות של IM.BARBER, תלמדו
            שיווק ובתום הלימודים
            <br />
            תקבלו ערכת ספר מתחיל ותעודת Barber מקצועי.
            <br />
            רוצים לשמוע עוד ? גללו למטה
          </p>
        ) : (
          <p className="secondary-paragraph">
            אנחנו מתמקצעים בתחום ה-Barber, כל שיטות הדירוג, הגזירות והטכניקות
            המתקדמות בארץ ובעולם. באתר שלנו תוכלו לקבוע תור לתספורות, עיצובי זקן
            או כל דבר אחר שתרצו. החלטנו שהגיע הזמן לחלוק את כל הידע שצברנו במשך
            השנים ולהקים אקדמיה ללימוד עיצוב שיער לגברים, באקדמיה תלמדו את כל
            הטכניקות והשיטות הסודיות של IM.BARBER, תלמדו שיווק ובתום הלימודים
            תקבלו ערכת ספר מתחיל ותעודת Barber מקצועי.
            <br />
            רוצים לשמוע עוד ? גללו למטה
          </p>
        )}
      </Zoom>
    </div>
  );
}

function AcademyRow(props) {
  return (
    <div className="third-container">
      <div className="row crew-row">
        <Bounce left>
          <div className="row academy-row">
            <div className="col button-col">
              <h1 className="sec-title">האקדמיה של IM.Barber יוצאת לדרך</h1>
              <a href="/academy">
                <div className="academy-button">גלה עוד...</div>
              </a>
            </div>
            <div className="col idan-logo">
              <img
                src={IDAN}
                className="academy-idan-logo"
                alt="עידן מבלייב תמונה"
              ></img>
            </div>

            <div className="col title-col">
              <div className="row product-homepage-content">
                <h2 className="academy-homepage-title">
                  {" "}
                  רוצה ללמוד <span className="beauty">עיצוב שיער</span> לגברים ?
                </h2>
              </div>
            </div>
          </div>
        </Bounce>
      </div>
    </div>
  );
}

function StoreRow(props) {
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

const HomeComponent = forwardRef((props, ref) => {
  const contact = useSelector((state) => state.general.contact);
  const history = useHistory();
  const size = useWindowSize();
  useEffect(() => {
    if (contact && contact === true) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [contact]);
  return (
    <div className="content-container">
      <Helmet>
        <title>I.M Barber - דף הבית</title>‍
      </Helmet>
      <VideoRow history={history} />
      <ParagraphRow size={size} />
      <AcademyRow history={history} />
      <StoreRow history={history} />
      <ContactComponent ref={ref} />
    </div>
  );
});
export default HomeComponent;
