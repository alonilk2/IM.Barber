export default function VideoSection(props) {
  return (
    <div className="first-container">
      <video loop autoPlay playsInline muted>
        <source
          src={"https://alonilk2.github.io/map1/3.mp4"}
          type="video/mp4" />
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
