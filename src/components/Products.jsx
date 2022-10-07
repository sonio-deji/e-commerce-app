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
function Products({ cat, filter, sort }) {
  const [products, setproducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios.get(
          cat
            ? `https://jsstore-api.herokuapp.com/api/products?category=${cat}`
            : "https://jsstore-api.herokuapp.com/api/products"
        );
        setproducts(products.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);
  useEffect(() => {
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
      {cat
        ? filteredProducts.map((item, i) => <Product item={item} key={i + 1} />)
        : products
            .slice(0, 8)
            .map((item, i) => <Product item={item} key={i + 1} />)}
    </Container>
  );
}

export default Products;
