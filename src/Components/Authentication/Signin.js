import "../../CSS/SignIn.css";
import Alert from "@mui/material/Alert";
import bg from "../../Images/login-bg.png";
import useWindowSize from "../../Hooks/useWindowSize";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { signin } from "../../Actions/authActions";
import { useState } from "react";

function SigninComponent(props) {
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const errorFromServer = useSelector((state) => state.user.error);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const size = useWindowSize();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (location?.state?.cartFlag === true)
      dispatch(
        signin(
          Email.toLowerCase(),
          password,
          location.state
        )
      );
    else if (user.admin === true)
      dispatch(signin(Email.toLowerCase(), password, null, null, null, true));
    dispatch(signin(Email.toLowerCase(), password));
  };

  return (
    <div>
      <div id="SignIncontainer">
        <div className="row justify-content-center">
          <div id="SignIn">
            {size.width > 768 ? (
              <div className="col">
                <img src={bg} width={"100%"} alt="" />
              </div>
            ) : null}
            <form
              onSubmit={handleSubmit}
              className="col signin-form"
              autocomplete="on"
            >
              {errorFromServer === 0 && (
                <Alert severity="error" sx={{ direction: "rtl" }}>
                  אימייל ו\או סיסמה אינם נכונים!
                </Alert>
              )}
              <p id="title">התחברות</p>
              <div className="input-field">
                <div className="webflow-style-input-transparent">
                  <input
                    className=""
                    type="email"
                    placeholder="Email Address"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                  <button type="submit">
                    <i className="icon ion-android-arrow-forward"></i>
                  </button>
                  <div className="inner-grad-1"> </div>
                </div>
              </div>
              <div className="input-field">
                <div className="webflow-style-input-transparent">
                  <input
                    className=""
                    type="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <button type="submit">
                    <i className="icon ion-android-arrow-forward"></i>
                  </button>
                  <div className="inner-grad-1"> </div>
                </div>
              </div>
              <div className="row">
                <a id="forgot" href="/forgot">
                  שכחת סיסמה?
                </a>
              </div>
              <div className="row">
                <button className="home-btn signin-custom-btn" type="submit">
                  התחבר
                </button>
              </div>
              <div className="row">
                <div className="need-acc-txt">
                  אין לך חשבון?{" "}
                  <a href="/SignUp">
                    <b>להרשמה</b>
                  </a>{" "}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SigninComponent;
/*                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6Ldn5DEaAAAAALYRhCaGFStvoKGWXRUxuBJVNPrn"
                                onChange={onChange}
                            />
                            */
