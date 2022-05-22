import "../CSS/HomePageCSS.css";
import Delivery from "../Components/Store/Delivery";
import MenuComponent from "../Components/MenuComponent";
import Footer from "../Components/Footer";
import Breadcrumb from "../Components/Breadcrumb";

function DeliveryView(props) {
  return (
    <>
      <MenuComponent />
      <div style={{ margin: "2%" }}></div>
      <Breadcrumb
        PageArr={[
          { name: "דף הבית", url: "/" },
          { name: "חנות המוצרים", url: "/store" },
          { name: "סל הקניות", url: "/cart" },
          { name: "משלוח וסליקה", url: "/delivery" },
        ]}
      />

      <Delivery />
      <Footer />
    </>
  );
}
export default DeliveryView;
