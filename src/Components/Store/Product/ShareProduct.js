import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon
} from "react-share";

export function ShareProduct() {
  return <div
    style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <span>שיתוף:</span>
    <FacebookShareButton
      url={window.location.href}
      title={"תראה מה מצאתי בIM.Barber ! "}
      style={{ margin: "1%" }}
    >
      <FacebookIcon size={32} round />
    </FacebookShareButton>
    <WhatsappShareButton
      url={window.location.href}
      title={"תראה מה מצאתי בIM.Barber ! "}
      style={{ margin: "1%" }}
    >
      <WhatsappIcon size={32} round />
    </WhatsappShareButton>
    <EmailShareButton
      url={window.location.href}
      title={"תראה מה מצאתי בIM.Barber ! "}
      style={{ margin: "1%" }}
    >
      <EmailIcon size={32} round />
    </EmailShareButton>
  </div>;
}
