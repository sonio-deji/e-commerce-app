import { Add, Remove } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { addProducts } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

import { publicRequest } from "../requestMethods";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  @media (max-width: 681px) {
    flex-direction: column;
  }
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 90vh;
  @media (max-width: 881px) {
    height: 50vh;
  }
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  @media (max-width: 681px) {
    flex: unset;
    padding: 0;
  }
`;
const Title = styled.h1`
  font-weight: 200;
`;
const Desc = styled.p`
  margin: 20px 0;
`;
const Image = styled.img`
  width: 100%;
`;
const Price = styled.p`
  font-weight: 100;
  font-size: 40px;
`;
const Filter = styled.div`
  display: flex;
  align-items: center;
`;
const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;
const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;
const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;
const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  cursor: pointer;
  margin: 0px 5px;
  border-width: 1px;
`;
const FilterSizeOption = styled.option``;
const AddContainer = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 681px) {
    width: 100%;
  }
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: white;
  cursor: pointer;
  &:hover {
    background-color: lightgray;
  }
`;
const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;
const Increment = styled.div`
  cursor: pointer;
`;

function Product() {
  // get and assign url location
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [borderColor, setBorderColor] = useState(false);

  //redux dispatch
  const dispatch = useDispatch();

  const handleQuantity = (quant) => {
    if (quant === "i") {
      setQuantity((prev) => prev + 1);
    } else {
      quantity > 1 && setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const productData = await publicRequest.get("/products/find/" + id);
        setProduct(productData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);
  const handleClick = () => {
    dispatch(
      addProducts({
        ...product,
        quantity,
        color,
        size,
      })
    );
  };
  const handleColorPick = (colorCode) => {
    setColor(colorCode);
    setBorderColor(!borderColor);
  };
  const handleSetSize = (sizeCode) => {
    setSize(sizeCode);
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.Title}</Title>
          <Desc>{product.desc}</Desc>
          <Price>₦ {product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              {product.color?.map((color) => (
                <FilterColor
                  key={color}
                  color={color}
                  onClick={() => handleColorPick(color)}
                  style={{ border: borderColor && "solid" }}
                />
              ))}
            </Filter>
            <Filter>
              <FilterTitle disabled defaultValue={"Size"}>
                Size
              </FilterTitle>
              <FilterSize>
                {product.size?.map((size) => (
                  <>
                    <FilterSizeOption>Size</FilterSizeOption>
                    <FilterSizeOption
                      key={size}
                      value={size}
                      onClick={() => handleSetSize(size)}
                    >
                      {size}
                    </FilterSizeOption>
                  </>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Increment>
                <Remove onClick={() => handleQuantity("d")} />
              </Increment>
              <Amount>{quantity}</Amount>
              <Increment>
                <Add onClick={() => handleQuantity("i")} />
              </Increment>
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
}

export default Product;
