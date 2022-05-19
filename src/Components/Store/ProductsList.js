import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  SHOW_ADD_CART,
  SERVER_ADDRESS,
  HIDE_CATEGORY,
} from "../../Constants/generalConstants";
import "../../CSS/Store.css";
import useProducts from "../../Hooks/useProducts";
import useCategories from "../../Hooks/useCategories";
import animationData from "../../Lotties/loading";
import Lottie from "react-lottie";
import InfiniteScroll from "react-infinite-scroller";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ProductsList(props) {
  const [_category, setCategory] = useState();
  const dispatch = useDispatch();
  const [ProductList, upload, remove, nextPage, TotalCount, fetching] =
    useProducts({
      category: props?.category,
    });
  const CategoryArr = useCategories();
  const location = useLocation();
  const searchFlag = useRef(false);
  const search = useSelector((state) => state.search);
  const category = useSelector((state) => state.general?.category);

  useEffect(() => {
    dispatch({ type: HIDE_CATEGORY });
  }, [location]);

  useEffect(() => {
    CategoryArr?.forEach((cat) => {
      if (cat.categoryid === category) setCategory(cat);
    });
  }, [category, CategoryArr]);

  const addCartItem = (e, product) => {
    e.preventDefault();
    props.addToCart(product);
    dispatch({ type: SHOW_ADD_CART });
  };

  const searchTitleRender = () => {
    if (search && search.filterBy?.length > 0) {
      searchFlag.current = true;
      return <h2 className="featured-products-title">תוצאות החיפוש</h2>;
    } else {
      searchFlag.current = false;
      return null;
    }
  };

  const titleRender = () => {
    if (search && search.filterBy?.length > 0) {
      return null;
    } else {
      return <h2 className="featured-products-title">החדשים ביותר</h2>;
    }
  };

  const renderProductList = () => {
    if (ProductList) {
      return ProductList.map(function (product, idx) {
        return (
          <div className="col featured-products-col" key={idx}>
            <a href={`/product/${product.id}`} className={"product-container"}>
              <img
                src={SERVER_ADDRESS + "/uploads/" + product.imgname}
                className="bestseller-img"
                alt={product.producttitle}
                key={idx}
              />
              <h4 className="bestseller-title-product">
                {product.producttitle}
              </h4>
              <h5 className="bestseller-price">
                {" "}
                ₪{product.price?.toFixed(2)}{" "}
              </h5>
            </a>
            {product?.inStock ? (
              <button
                className="add-to-cart-btn"
                onClick={(e) => addCartItem(e, product)}
              >
                הוסף לסל
              </button>
            ) : (
              <button
                className="add-to-cart-btn"
                style={{ color: "#960000", opacity: 0.5 }}
              >
                המוצר אזל
              </button>
            )}
          </div>
        );
      });
    }
    return <Lottie options={defaultOptions} height={150} width={150} />;
  };

  const categoryImagesRender = () => {
    if (_category)
      return (
        <div
          className="category-image-item full"
          style={{
            backgroundImage: `url("${SERVER_ADDRESS}/categories/${_category?.imgname}"),linear-gradient(338deg, rgba(18,18,18,0.1) 0%, rgba(223,181,75,0.8) 100%)`,
            backgroundSize: "cover",
          }}
        >
          <div className="darkener">
            <h1 className="category-image-title header">
              {_category?.categoryid}
            </h1>
          </div>
        </div>
      );
  };

  return (
    <div>
      {categoryImagesRender()}
      {titleRender()}
      {searchTitleRender()}
      <div className="featured-products" style={{ border: "unset" }}>
        <InfiniteScroll
          loadMore={nextPage}
          hasMore={ProductList.length < TotalCount && !fetching}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          <div className="row featured-products-container">
            {renderProductList()}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
}
export default ProductsList;
