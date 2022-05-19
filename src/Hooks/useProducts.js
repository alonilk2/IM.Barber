import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SERVER_ADDRESS } from "../Constants/generalConstants";
import Axios from "axios";

export default function useProducts(props) {
  const [FilteredProductList, setFilteredProductList] = useState([]);
  const [Pagination, setPagination] = useState(0);
  const [TotalCount, setTotalCount] = useState(0);
  const [fetching, setFetching] = useState(false);
  const { filterBy } = useSelector((state) => state.search);
  const ProductList = useRef([]);
  const location = useLocation();
  let category = props?.category;
  let allProducts = props?.allProducts;

  useEffect(() => {
    FilterResults();
  }, [filterBy]);

  useEffect(() => {
    fetchProductList();
  }, [category, Pagination]);

  function FilterResults() {
    let tempProducts = [];
    if (filterBy?.length > 0 && !location.pathname.startsWith("/product")) {
      let filter = filterBy.toLowerCase();
      ProductList.current.forEach((product) => {
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
      let response;
      if (fetching) return;

      setFetching(true);
      if (props?.product) {
        // Products hook initialized with a product id
        response = await Axios.get(
          SERVER_ADDRESS + `/products/getproduct/${props?.product}`
        );
        return (ProductList.current = response.data);
      } else if (allProducts) {
        response = await Axios.get(SERVER_ADDRESS + `/products/getproducts`);
        return (ProductList.current = response.data.products);
      } else {
        if (category && category !== "all" && category !== null) {
          // Products hook initialized with a category id
          response = await Axios.get(
            SERVER_ADDRESS +
              `/products/getproduct/category/${
                category.categoryid ? category.categoryid : category
              }`
          );
        } else {
          // Default
          response = await Axios.get(
            SERVER_ADDRESS + `/products/getproducts&p=${Pagination}`
          );
          setTotalCount(response.data.products.count);
        }
        //prevent duplications
        if (ProductList.current.length < response.data.products?.count)
          //Append rows per page
          ProductList.current = [
            ...ProductList.current,
            ...response.data.products.rows,
          ];
      }
    } catch (error) {
      console.log(error);
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
      fdata.append("instock", newProduct.instock.value);
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

  function nextPage() {
    if ((Pagination === 0 || Pagination < TotalCount) && !fetching)
      if (TotalCount - Pagination >= 6) {
        console.log(Pagination);
        setPagination((Pagination) => Pagination + 6);
      } else {
        console.log(TotalCount - Pagination);
        fetchProductList();
      }
      return false
  }

  if (FilteredProductList) return [FilteredProductList];
  else
    return [
      ProductList.current,
      uploadProduct,
      removeProduct,
      nextPage,
      TotalCount,
      fetching,
    ];
}
