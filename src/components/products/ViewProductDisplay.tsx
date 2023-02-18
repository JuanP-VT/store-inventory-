import { Category, Product } from "../../interfaces";
import ProductCard from "./productCard/ProductCard";
import Container from "react-bootstrap/Container";
import { Stack } from "react-bootstrap";
import PaginationButtons from "./PaginationButtons";
import { useEffect, useState } from "react";
import createPagination from "./createPagination";
import FilterProduct from "./productFilter/FilterProduct";

type Props = {
  productList: Product[];
  categoryList: Category[];
  setUpdateComponent: React.Dispatch<React.SetStateAction<number>>;
};

// This component displays filtered products
function ViewProductDisplay({
  productList,
  categoryList: categoryList,
  setUpdateComponent,
}: Props) {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [paginatedProductList, setPaginatedProductList] = useState<Product[][]>(
    []
  );

  // Create pagination from product list
  useEffect(() => {
    const paginatedArray = createPagination(productList, 18);
    setPaginatedProductList(paginatedArray);
  }, [productList]);
  return (
    <>
      <Stack>
        <FilterProduct categoryList={categoryList} productList={productList} />
        <Container
          fluid
          style={{
            height: "90vh",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            justifyItems: "center",
            padding: "10px",
          }}
        >
          {/* For each item in a page render a ProductCard */}
          {paginatedProductList[0] !== undefined &&
          paginatedProductList[0] !== null
            ? paginatedProductList[currentPageIndex].map((product, index) => (
                <ProductCard
                  key={`itm${index}`}
                  name={product.name}
                  category={product.category}
                  categoryIconUrl={product.categoryIconUrl!}
                  stock={product.stock}
                  price={product.price}
                  categoryList={categoryList}
                  _id={product._id}
                  setUpdateComponent={setUpdateComponent}
                />
              ))
            : ""}
        </Container>
        <Container fluid style={{ height: "5vh" }}>
          <PaginationButtons
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setCurrentPageIndex}
            paginatedProductList={paginatedProductList}
          />
        </Container>
      </Stack>
    </>
  );
}

export default ViewProductDisplay;
