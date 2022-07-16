import React, { useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  HIDE_CATEGORY, SERVER_ADDRESS, SHOW_ADD_CART
} from "../../Constants/generalConstants";
import "../../CSS/Store.css";
import useCategories from "../../Hooks/useCategories";
import useProducts from "../../Hooks/useProducts";
import animationData from "../../Lotties/loading";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function ProductsList(props) {
  const [add, showAdd] = useState(false);
  const [_category, setCategory] = useState();
  const dispatch = useDispatch();
  const [ProductList, upload, remove, nextPage, TotalCount, fetching] =
    useProducts({
      category: props?.category,
    });
  const CategoryArr = useCategories();
  const location = useLocation();
  const initialRender = useRef(true);
  const searchFlag = useRef(false);
  const search = useSelector((state) => state.search);
  const category = useSelector((state) => state.general?.category);

  const addCartItem = (e, product) => {
    e.preventDefault();
    props.addToCart(product);
    dispatch({ type: SHOW_ADD_CART });
  };

  console.log(ProductList.length + " Total: " + TotalCount);
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

  useEffect(() => {
    dispatch({ type: HIDE_CATEGORY });
  }, [location]);

  useEffect(() => {
    CategoryArr?.forEach((cat) => {
      if (cat.categoryid === category) setCategory(cat);
    });
  }, [category, CategoryArr]);


  useEffect(() => {}, [ProductList]);

  const renderProductList = () => {
    if (ProductList) {
      return ProductList.map(function (product, idx) {
        return (
          <div className="col featured-products-col">
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
              <h5 className="bestseller-price">₪{product.price?.toFixed(2)}</h5>
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

  console.log(ProductList.length + " ___ " + TotalCount);

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
  console.log(TotalCount)
  return (
    <div>
      {categoryImagesRender()}
      {titleRender()}
      {searchTitleRender()}
      <div className="featured-products" style={{ border: "unset" }}>
        <InfiniteScroll
          loadMore={nextPage}
          pageStart={1}
          hasMore={ProductList.length === 0 || ProductList.length < TotalCount}
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
