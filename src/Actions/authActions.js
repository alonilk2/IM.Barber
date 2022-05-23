import Axios from "axios";
import Cookie from "js-cookie";
import {
  USER_SIGNIN_ATTEMPT,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAILED,
  USER_SIGNUP_ATTEMPT,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILED,
  USER_SIGNOUT_SUCCESS,
} from "../Constants/userConst";
import { SERVER_ADDRESS } from "../Constants/generalConstants";
import { history } from "../history";

function signin(email, password, cartObject, admin) {
  return (dispatch) => {
    dispatch({ type: USER_SIGNIN_ATTEMPT, payload: {} });
    Axios.post(SERVER_ADDRESS + "/signin", {
      email: email,
      password: password,
    })
      .then(function (response) {
        if (response.data.success === true) {
          dispatch({ type: USER_SIGNIN_SUCCESS, payload: response });
          Cookie.set("userInstance", JSON.stringify(response));
          RouteAfterSuccess();
        } else {
          dispatch({ type: USER_SIGNIN_FAILED, payload: 0 });
          alert("הפרטים שהוזנו שגויים. יש לבדוק את הפרטים ולנסות שנית.");
          if (response.data.error === 1) {
            dispatch({ type: USER_SIGNIN_FAILED, payload: 1 });
            alert(
              "חשבונך איננו פעיל עדיין, משום שאימות הדואר האלקטרוני לא הושלם. יש להשלים את התהליך ולנסות שנית."
            );
          }
        }
      })
      .catch(function (error) {
        dispatch({ type: USER_SIGNIN_FAILED, payload: error });
      });
  };

  function RouteAfterSuccess() {
    if (cartObject?.cartFlag === true)
      return history.push("/delivery", {
        cart: cartObject.cart,
        discount: cartObject.discount,
        totalDiscount: cartObject.totalDiscount,
        totalSum: cartObject.totalSum,
      });
    else if (admin) return history.push("/admin");
    return history.push("/store");
  }
}

const signup = (email, password, firstname, lastname) => async (dispatch) => {
  dispatch({ type: USER_SIGNUP_ATTEMPT, payload: {} });
  try {
    const user = await Axios.post(SERVER_ADDRESS + "/signup", {
      email: email,
      password: password,
      firstname: firstname,
      lastname: lastname,
    });
    if (user.data.success) {
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: user });
      history.push("/store");
      alert(
        "אימייל נשלח לכתובת המייל שלך לצורת אימות. אנא הכנס/י לתיבת הדואר האלקטרוני ופעל לפי ההוראות בהודעה."
      );
    } else {
      if (user.data.error === 0)
        dispatch({ type: USER_SIGNUP_FAILED, payload: 0 });
      else if (user.data.error === 1)
        dispatch({ type: USER_SIGNUP_FAILED, payload: 1 });
      else if (user.data.error === 3) {
        dispatch({ type: USER_SIGNUP_FAILED, payload: 3 });
        alert("Bad PromoCode!");
      }
    }
  } catch (err) {
    dispatch({ type: USER_SIGNUP_FAILED, payload: err });
  }
};

const forgotPassword = (email) => async (dispatch) => {
  try {
    const response = await Axios.post(SERVER_ADDRESS + "/forgotPass", {
      email: email,
    });
    if (response.data.success === true) {
      alert(
        "אימייל נשלח לכתובת המייל שלך לצורת אימות. אנא הכנס/י לתיבת הדואר האלקטרוני ופעל לפי ההוראות בהודעה."
      );
    } else {
      alert("This email is not registered.");
    }
  } catch (err) {
    console.log(err);
  }
};

const updatePass = (email, oldpass, newpass) => async (dispatch) => {
  try {
    const response = await Axios.post(SERVER_ADDRESS + "/updatePass", {
      email: email,
      oldpass: oldpass,
      newpass: newpass,
    });
    if (response.data.success === true) {
      dispatch(signout());
      history.push("/");
      alert("הסיסמה שונתה בהצלחה.");
    } else {
      alert("הסיסמה הישנה שהזנת איננה נכונה. סיסמתך לא שונתה.");
    }
  } catch (err) {
    console.log(err);
  }
};

const restorePass = (email, token, newpass) => async (dispatch) => {
  try {
    const response = await Axios.post(SERVER_ADDRESS + "/restorepass", {
      email: email,
      token: token,
      newpass: newpass,
    });
    if (response.data.success === true) {
      history.push("/");
      alert("סיסמתך שונתה בהצלחה. אנא התחבר/י");
    } else alert("We encountered a problem.");
  } catch (err) {
    console.log(err);
  }
};

const approveUser = (userid, token) => async (dispatch) => {
  try {
    const response = await Axios.post(SERVER_ADDRESS + "/approve_user", {
      userid: userid,
      token: token,
    });
    if (response.data.success === true) {
      history.push("/");
      alert("חשבונך אומת בהצלחה. אנא התחבר/י");
    } else alert("We encountered a problem.");
  } catch (err) {
    console.log(err);
  }
};

const signout = () => (dispatch) => {
  Cookie.remove("userInstance");
  dispatch({ type: USER_SIGNOUT_SUCCESS });
  history.push("/store");
};

export {
  signin,
  signup,
  signout,
  forgotPassword,
  updatePass,
  approveUser,
  restorePass,
};
