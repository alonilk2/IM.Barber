import "react-medium-image-zoom/dist/styles.css";
import "../../CSS/Store/Product.css";
import "../../CSS/Store.css";
import useCart from "../../Hooks/useCart";
import useProducts from "../../Hooks/useProducts";
import useWindowSize from "../../Hooks/useWindowSize";
import StoreHeader from "./StoreHeader";
import Skeleton from "@mui/material/Skeleton";
import Carousel from "react-bootstrap/Carousel";
import Breadcrumb from "../Breadcrumb";
import Zoom from "react-medium-image-zoom";
import Accordion from "react-bootstrap/Accordion";
import { AddToCartAnimation } from "../Utils";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  SERVER_ADDRESS,
  SHOW_ADD_CART,
  DISPLAY_PRODUCT,
} from "../../Constants/generalConstants";
import {
  FacebookShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";

function Product(props) {
  const [imageArr, setImageArr] = useState([]);
  const [product, setProduct] = useState();
  const [productsList, setProductsList] = useState([]);
  const cartObject = useCart();
  const _product = useProducts({ product: props.pid });
  const _productsList = useProducts({ allProducts: true });
  const dispatch = useDispatch();
  const history = useHistory();
  const size = useWindowSize();
  var counter = 0;

  useEffect(() => {
    if (_product) setProduct(_product[0]);
  }, [_product]);

  useEffect(() => {
    setProductsList(_productsList[0]);
  }, [_productsList]);

  useEffect(() => {
    if (product) dispatch({ type: DISPLAY_PRODUCT, payload: product });
    initializeImageArray();
  }, [product]);

  const initializeImageArray = () => {
    let arr = [];
    for (const key in product) {
      if (key.startsWith("imgname")) arr.push(product[key]);
    }
    setImageArr(arr);
  };

  const addCartItem = (e, product, now = false) => {
    e.preventDefault();
    cartObject.addToCart(product);
    if (now) history.push("/cart");
    else dispatch({ type: SHOW_ADD_CART });
  };

  const priceInstead = (product) => {
    let priceBeforeSale = Math.floor(product?.price + 0.3 * product?.price);
    return priceBeforeSale - (priceBeforeSale % 5);
  };

  const similarProducts = productsList?.map((prod, idx) => {
    if (Math.random() < 0.7 && counter < 4) {
      counter++;
      return (
        <div className="col featured-products-col">
          <a href={`/product/${prod.id}`} className="product-container">
            <img
              src={SERVER_ADDRESS + "/uploads/" + prod.imgname}
              className="bestseller-img"
              alt={prod.producttitle}
              key={idx}
            />
            <h4 className="bestseller-title-product">{prod.producttitle}</h4>
            <h5 className="bestseller-price"> ₪{prod?.price?.toFixed(2)} </h5>
          </a>
          <button
            className="add-to-cart-btn"
            onClick={(e) => addCartItem(e, prod)}
          >
            הוסף לסל
          </button>
        </div>
      );
    }
  });

  const shareRow = (url) => {
    return (
      <div
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
      </div>
    );
  };

  const imageMapper = imageArr?.map((img) => {
    if (img) {
      return (
        <Carousel.Item>
          <Zoom>
            <img
              src={SERVER_ADDRESS + "/uploads/" + img}
              className="product-img w-75"
              alt="Product"
            />
          </Zoom>
        </Carousel.Item>
      );
    }
  });

  return (
    <div className="store-container" style={{ padding: 0 }}>
      <Helmet>
        <title>{`I.M Barber - ${
          product ? product.producttitle : "חנות המוצרים"
        }`}</title>
        ‍
        <meta
          name="description"
          content="חנות המוצרים של I.M Barber - כל מוצרי הטיפוח הכי שווים לגבר, במחירי רצפה!"
        />
      </Helmet>

      <Breadcrumb
        PageArr={[
          { name: "דף הבית", url: "/" },
          { name: "חנות המוצרים", url: "/store" },
          { name: product?.producttitle, url: "/store" },
        ]}
      />

      <div className="product">
        <AddToCartAnimation />
        <StoreHeader
          cart={cartObject.cart}
          count={cartObject.count}
          totalSum={cartObject.totalSum}
        />
        <div className="col product-img-container">
          {product ? (
            <Carousel variant="dark">{imageMapper}</Carousel>
          ) : (
            <Skeleton variant="rectangular" width="380px" height="350px" />
          )}
        </div>
        <div className="col product-info-container">
          <h2 className=" product-info-row product-title">
            {product ? (
              product.producttitle
            ) : (
              <Skeleton variant="text" width="400px" />
            )}
          </h2>
          <>
            <p className=" product-info-row lineover">
              מחיר : ₪
              {product ? (
                product.inStock === false ? (
                  <h4 className=" product-info-row product-price">
                    המוצר אזל מהמלאי
                  </h4>
                ) : (
                  priceInstead(product)
                )
              ) : (
                <Skeleton variant="text" width="80px" />
              )}
            </p>
            <h4 className=" product-info-row product-price">
              מחיר: ₪
              {product ? (
                product?.price?.toFixed(2)
              ) : (
                <Skeleton variant="text" width="80px" />
              )}
            </h4>
          </>

          <Accordion defaultActiveKey="0" flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>תיאור:</Accordion.Header>
              <Accordion.Body>
                <p className=" product-info-row product-about">
                  {product ? (
                    product.description
                  ) : (
                    <Skeleton
                      variant="rectangular"
                      width="380px"
                      height="100px"
                    />
                  )}
                </p>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          {shareRow()}
          {product?.inStock && (
            <>
              <div
                className="product-info-bottom"
                style={{ marginBottom: "1%" }}
              >
                <div className="add-to-cart">
                  <button
                    onClick={(e) => addCartItem(e, product)}
                    className="add-cart-btn"
                  >
                    הוסף לסל
                  </button>
                </div>
              </div>
              <div className="product-info-bottom" style={{ margin: 0 }}>
                <div className="add-to-cart">
                  <button
                    onClick={(e) => addCartItem(e, product, true)}
                    className="add-cart-btn"
                  >
                    קנה עכשיו
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <h4 style={{ direction: "rtl", textAlign: "center" }}>
        אולי יעניין אותך גם...
      </h4>
      {size.width > 800 ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          {similarProducts}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          {similarProducts}
        </div>
      )}
    </div>
  );
}
export default Product;
