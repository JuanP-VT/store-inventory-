import { useEffect, useState } from "react";
import { Category, Product } from "../../interfaces";
import FilterProduct from "./productFilter/FilterProduct";
import getAllProductsRequest from "./getAllProductsRequest";
import ViewProductDisplay from "./ViewProductDisplay";

// This component is in charge of requesting information to the API and sorting data
// This data is then passed as props to the Product Display component
function ViewProduct() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [updateComponent, setUpdateComponent] = useState(0);
  // Fetch product and category list from API , dependency is used
  // to reload component when needed
  useEffect(() => {
    getAllProductsRequest(setProductList, setCategoryList);
  }, [updateComponent]);

  return (
    <>
      <ViewProductDisplay
        productList={productList}
        categoryList={categoryList}
        setUpdateComponent={setUpdateComponent}
      />
    </>
  );
}

export default ViewProduct;
