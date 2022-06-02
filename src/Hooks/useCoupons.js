import { useEffect, useState } from "react";
import Axios from "axios";
import { SERVER_ADDRESS } from "../Constants/generalConstants";

export default function useCoupons() {
  const [couponArr, setCouponsArr] = useState([]);

  const fetchCoupons = async () => {
    let resultArray = await Axios.get(SERVER_ADDRESS + "/Coupons/getcoupons");
    setCouponsArr(resultArray.data);
  };

  const addCoupon = async (code, discount) => {
    console.log(code)
    let result = await Axios.post(SERVER_ADDRESS + "/coupons/addcoupon", {
      code: code,
      discount: discount
    });
    if (result?.data?.success) return true;
    return false;
  };

  const deleteCoupon = async (code) => {
    let result = await Axios.post(SERVER_ADDRESS + "/coupons/removecoupon", {
      code: code,
    });
    if (result?.data?.success) return true;
    return false;
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  return [couponArr, addCoupon, deleteCoupon];
}
