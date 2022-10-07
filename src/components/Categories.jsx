import styled from "styled-components";
import { categories } from "../data";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;

  @media (max-width: 681px) {
    flex-direction: column;
  }
`;
function Categories() {
  return (
    <Container>
      {categories.map((item, i) => (
        <CategoryItem item={item} key={i + 1} />
      ))}
    </Container>
  );
}

export default Categories;
