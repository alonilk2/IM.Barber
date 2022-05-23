import IDAN from "../../Images/idan.webp";
import Bounce from "react-reveal/Bounce";

export default function AcademySection(props) {
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
