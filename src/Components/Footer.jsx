import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../CSS/HomePageCSS.css";
import abdev from "../Images/abdev.webp";
import { SocialIcon } from "react-social-icons";
import { DISPLAY_CONTACT } from "../Constants/generalConstants";
function Footer() {
  const history = useHistory();
  const dispatch = useDispatch();

  async function handleContact() {
    dispatch({ type: DISPLAY_CONTACT });
    history.push("/");
  }

  return (
    <div className="foot">
      <div className="row">
        <div className="col sitemap-container">
          <h5 className="title">מפת האתר</h5>
          <a className="foot-link" href="/">
            דף הבית
          </a>
          <a className="foot-link" href="/store">
            חנות המוצרים
          </a>
          <a
            className="foot-link"
            href="https://www.instagram.com/_im.barber_/"
          >
            תיק עבודות
          </a>
          <button className="foot-link" onClick={handleContact}>
            צור קשר
          </button>
          <a className="foot-link" href="/whatsapp">
            קביעת תור
          </a>
          <a className="foot-link" href="/academy">
            האקדמיה לספרות
          </a>
          <a className="foot-link" href="#">
            תנאי שימוש ותקנון פרטיות
          </a>
        </div>
        <div className="col contact-home">
          <SocialIcon url="https://www.facebook.com/idan.mavlyev" />
          <SocialIcon url="https://www.instagram.com/_im.barber_/" />
          <SocialIcon
            url="https://www.tiktok.com/@idan_mavlayev?lang=he-IL"
            network="tiktok"
            bgColor="#ff5a01"
          />
          <div className="row">
            <div className="row copyright_txt abdev">
              כל הזכויות שמורות © Idan Mavlayev
            </div>
            <a className="abdev" href="https://github.com/alonilk2">
              <img src={abdev} alt="ABdev" className="abdev-img" />
              <span
                style={{
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  fontSize: 12,
                  margin: 5,
                  color: 'rgba(255,255,255,0.4)',
                  whiteSpace: 'nowrap'
                }}
              >
                Built by
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
