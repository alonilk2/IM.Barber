import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
import { SERVER_ADDRESS } from "../Constants/generalConstants";

export default function useProducts(props) {
  const [FilteredProductList, setFilteredProductList] = useState([]);
  const [TotalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(false);
  const [fetching, setFetching] = useState(false);
  const { filterBy } = useSelector((state) => state.search);
  const [ProductList, setProductList] = useState([]);
  const location = useLocation();
  const Pagination = useRef(0);
  let category = props?.category;

  useEffect(() => {
    FilterResults();
  }, [filterBy]);

  useEffect(() => {
    if (!error && (props?.allProducts || props.product)) fetchProductList();
  }, []);

  function FilterResults() {
    let tempProducts = [];
    if (filterBy?.length > 0 && !location.pathname.startsWith("/product")) {
      let filter = filterBy.toLowerCase();
      ProductList.forEach((product) => {
        if (
          product.producttitle?.toLowerCase().includes(filter) ||
          product.brand?.toLowerCase().includes(filter) ||
          product.description?.toLowerCase().includes(filter)
        )
          tempProducts.push(product);
      });
      setFilteredProductList(tempProducts);
    } else setFilteredProductList(null);
  }

  async function fetchProductList() {
    try {
      if (fetching) return;
      setFetching(true);
      let response;
      if (props?.product) {
        // If products hook initialized with a product id
        response = await Axios.get(
          SERVER_ADDRESS + `/products/getproduct/${props?.product}`
        );
        return setProductList(response.data);
      } else {
        if (category && category !== "all" && category !== null) {
          // If products hook initialized with a category id
          response = await Axios.get(
            SERVER_ADDRESS +
              `/products/getproduct/category/${
                category.categoryid ? category.categoryid : category
              }&p=${Pagination.current}`
          );
        } else if (props?.allProducts) {
          response = await Axios.get(SERVER_ADDRESS + `/products/getproducts`);
        } else {
          response = await Axios.get(
            SERVER_ADDRESS + `/products/getproducts&p=${Pagination.current}`
          );
        }
        console.log(response)
        if (
          response?.data?.products?.rows.length > 0 &&
          ProductList.length < response.data.products?.count
        )
        setTotalCount(response.data.products.count);
        setProductList([...ProductList, ...response.data.products.rows]);

      }
    } catch (error) {
      setError(true)
    } finally {
      setFetching(false);
    }
  }

  async function uploadProduct(newProduct, edit, imageArr) {
    try {
      const fdata = new FormData();
      for (var i = 0; i < imageArr.length; i++) {
        fdata.append("image", imageArr[i]);
      }
      fdata.append("id", newProduct.id);
      fdata.append("producttitle", newProduct.producttitle.trim());
      fdata.append("price", newProduct.price);
      fdata.append("categoryid", newProduct.categoryid.label);
      fdata.append("brand", newProduct.brand);
      fdata.append("description", newProduct.description);
      fdata.append("instock", newProduct.instock?.value);
      let result;
      if (
        newProduct.categoryid === "" ||
        newProduct.producttitle === "" ||
        newProduct.price === "" ||
        newProduct.description === "" ||
        newProduct.brand === ""
      )
        alert("לא כל השדות מולאו, יש למלא את כולן לפני השליחה.");
      else if (edit) {
        result = await Axios.post(
          SERVER_ADDRESS + "/products/updateProduct",
          fdata
        );
      } else {
        result = await Axios.post(
          SERVER_ADDRESS + "/products/addProduct",
          fdata
        );
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  async function removeProduct(product) {
    try {
      let result = await Axios.post(
        SERVER_ADDRESS + "/products/removeproduct",
        {
          id: product.id,
        }
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  function nextPage(page) {
    if (
      (Pagination.current === 0 || Pagination.current < TotalCount) &&
      fetching === false
    ) {
      if (TotalCount - Pagination.current >= 6) {
        Pagination.current = Pagination.current + 6;
        fetchProductList();
      } else {
        fetchProductList();
      }
    }
  }
  if (FilteredProductList) return [FilteredProductList];
  else
    return [
      ProductList,
      uploadProduct,
      removeProduct,
      nextPage,
      TotalCount,
      fetching,
    ];
}
