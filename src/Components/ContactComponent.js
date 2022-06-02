import React, { useState, forwardRef } from "react";
import "../CSS/HomePageCSS.css";
import Axios from "axios";
import { GiPositionMarker } from "react-icons/gi";
import { BsFillTelephoneFill } from "react-icons/bs";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { GrMail } from "react-icons/gr";
import { SERVER_ADDRESS } from "../Constants/generalConstants";
import Fade from "react-reveal/Fade";

const ContactComponent = forwardRef((props, ref) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit() {
    const mailContent = {
      name: name,
      email: email,
      content: content,
      phone: phone,
    };
    try {
      let response = await Axios.post(SERVER_ADDRESS + "/sendmail", {
        mailContent,
      });
      if (response) {
        if (response.data.success) console.log(response);
      } else console.log("Error: could not fetch posts list from server.");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="fourth-container">
      <Fade left>
        <div className="row map">
          <iframe
            width="700"
            height="400"
            loading="lazy"
            style={{ padding: 0 }}
            allowFullScreen
            title="Map"
            src="https://www.google.com/maps/embed/v1/place?q=place_id:ChIJVVVZIohOHBURZqZWbpTBPg8&key=AIzaSyCTZk_p4VVZUVKlIAX-tV1K9NaoqpgjWwY"
          ></iframe>
        </div>
      </Fade>

      <div className="row contact-row">
        <h1 className="title" ref={ref}>
          צור קשר
        </h1>
        <div className="col contact-container">
          <TextField
            fullWidth
            id="standard-basic"
            label="שם מלא"
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="אימייל"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            id="standard-basic"
            label="פלאפון"
            variant="standard"
            onChange={(e) => setPhone(e.target.value)}
          />
          <TextField
            id="standard-multiline-static"
            label="פירוט ההודעה"
            multiline
            fullWidth
            rows={4}
            variant="standard"
            onChange={(e) => setContent(e.target.value)}
          />

          <Button variant="outlined" onClick={() => handleSubmit()}>
            שליחה
          </Button>
        </div>
        <Fade right>
          <div className="col contact-description">
            <div className="column">
              <div className="row address-row">
                <div className="col icon">
                  <GiPositionMarker className="icon" />
                </div>
                <div className="col text">
                  <p className="contact-text">
                    כתובתנו: <br />
                    רחוב הגפן 1,
                    <br />
                    נוף הגליל 17500
                  </p>
                </div>
              </div>
              <div className="row address-row">
                <div className="col icon">
                  <BsFillTelephoneFill className="icon" />
                </div>
                <div className="col text">
                  <p className="contact-text">
                    פלאפון:
                    <br />
                    052-7481028
                  </p>
                </div>
              </div>
              <div className="row address-row">
                <div className="col icon">
                  <GrMail className="icon" />
                </div>
                <div className="col text">
                  <p className="contact-text">
                    אימייל: <br />
                    imbarberil2@gmail.com
                    <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
});
export default ContactComponent;
