import IDAN from "../../Images/idan.webp";
import Fade from "react-reveal/Fade";

export default function AcademySection(props) {
  return (
    <div className="third-container">
      <div className="row crew-row">
        <div className="row academy-row">
          <Fade left cascade delay={100}>
            <div className="col button-col">
              <h1 className="sec-title">האקדמיה של IM.Barber יוצאת לדרך</h1>
              <button onClick={() => props.history.push("/academy")}>
                <div className="academy-button">גלה עוד...</div>
              </button>
            </div>
          </Fade>
          <Fade top cascade delay={400}>
            <div className="col idan-logo">
              <img
                src={IDAN}
                className="academy-idan-logo"
                alt="עידן מבלייב תמונה"
              ></img>
            </div>
          </Fade>

          <Fade right cascade delay={600}>
            <div className="col title-col">
              <div className="row product-homepage-content" style={{justifyContent: 'flex-start'}}>
                <h2 className="academy-homepage-title">
                  {" "}
                  רוצה ללמוד<br /><span className="beauty">עיצוב שיער</span><br /> לגברים ?
                </h2>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}
