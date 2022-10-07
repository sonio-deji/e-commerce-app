import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;

  @media (max-width: 681px) {
    flex: unset;
    height: 30vh;
  }
`;
const Info = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
const Title = styled.h1`
  color: ${(prev) => (prev.color === "shoe" ? "gray" : "white")};
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  @media (max-width: 681px) {
    width: 100%;
    height: 100%;
  }
`;
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

function CategoryItem({ item }) {
  return (
    <Link to={`/products/${item.cat}`}>
      <Container>
        <Image src={item.img} />
        <Info>
          <Title color={item.cat}>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Container>
    </Link>
  );
}

export default CategoryItem;
