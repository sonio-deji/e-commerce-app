import { useEffect, useState } from "react";
import styled from "styled-components";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;
const LoadingSpinner = styled.div`
  width: 120px;
  height: 120px;
  border: 10px solid black;
  border-top: 10px solid white;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  margin: auto;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  z-index: 50;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
function Products({ cat, filter, sort }) {
  const [products, setproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get(
          cat
            ? `https://js-store.onrender.com/api/products?category=${cat}`
            : "https://js-store.onrender.com/api/products"
        );
        setproducts(products.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
    if (products.length >= 1) {
      setIsLoading(false);
    }
    cat &&
      setFilteredProducts(
        products.filter((item) => {
          return Object.entries(filter).every(([key, value]) =>
            item[key].includes(value)
          );
        })
      );
  }, [products, cat, filter]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  return (
    <Container>
      {isLoading && (
        <SpinnerContainer>
          <LoadingSpinner></LoadingSpinner>
        </SpinnerContainer>
      )}
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item._id} />)
        : products
            .slice(0, 8)
            .map((item, i) => <Product item={item} key={i} />)}
    </Container>
  );
}

export default Products;
