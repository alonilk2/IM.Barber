import { forwardRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import VideoSection from './VideoSection'
import AboutSection from './AboutSection'
import StoreSection from './StoreSection'
import AcademySection from './AcademySection'

import "../../CSS/HomePageCSS.css";
import ContactComponent from "../ContactComponent";
import useWindowSize from "../../Hooks/useWindowSize";

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
        <title>IM.Barber - דף הבית</title>‍
      </Helmet>
      <VideoSection history={history} />
      <AboutSection size={size} />
      <AcademySection history={history} />
      <StoreSection history={history} />
      <ContactComponent ref={ref} />
    </div>
  );
});
export default HomeComponent;
