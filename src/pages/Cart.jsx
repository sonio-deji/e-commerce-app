import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { useEffect, useState } from "react";
import { userRequest } from "../requestMethods";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Container = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Wrapper = styled.div`
  padding: 20px;
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;
const TopButton = styled.button`
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 673px) {
    flex-direction: column;
  }
`;
const TopTexts = styled.div``;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0 10px;
`;
const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 479px) {
    flex-direction: column;
  }
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;
const Image = styled.img`
  width: 200px;
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const ProductName = styled.span`
  margin-bottom: 10px;
`;
const ProductId = styled.span`
  margin-bottom: 10px;
`;
const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin-bottom: 10px;
`;
const ProductSize = styled.span``;
const PriceDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;
const ProductAmount = styled.span`
  font-size: 24px;
  margin: 5px;
`;
const ProductPrice = styled.span`
  font-size: 30px;
  font-weight: 200;
`;
const Hr = styled.hr`
  height: 1px;
  background-color: #eee;
  border: none;
`;
const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 30px 0;
  display: flex;
  justify-content: space-between;
`;
const SummaryItemText = styled.span`
  font-weight: ${(props) => props.type === "total" && "600"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  border: none;
`;

const Cart = () => {
  const history = useNavigate();
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.user.currentUser.email);

  const [transactionId, setTransactionId] = useState({
    transaction: "",
    trxref: "",
    message: "",
    status: "",
  });

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          "transactionID": transactionId.transaction,
          "trxref": transactionId.trxref,
          "amount": cart.total,
          "message": transactionId.message,
          "status": transactionId.status,
        });
        history("/success", { data: res.data });
      } catch (error) {
        console.log(error);
      }
    };
    if (transactionId.message === "") {
      return;
    } else {
      makeRequest();
    }
  }, [transactionId, cart.total, history]);

  //paystack config
  const config = {
    reference: new Date().getTime().toString(),
    email: user,
    amount: cart.total * 100,
    publicKey: "pk_test_61ab2a20131f59a6f24389b99b2a51a9fc1b527b",
  };
  const onSuccess = (reference) => {
    setTransactionId({
      transaction: reference.transaction,
      trxref: reference.trxref,
      message: reference.message,
      status: reference.status,
    });
  };
  // paystack on close function

  const onClose = () => {};
  const initializePayment = usePaystackPayment(config);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Your Bag</Title>
        <Top>
          <Link to="/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag({cart.quantity})</TopText>
            <TopText>Your Wishlist</TopText>
          </TopTexts>
          <TopButton
            type="filled"
            onClick={() => {
              initializePayment(onSuccess, onClose);
            }}
          >
            CHECK OUT NOW
          </TopButton>
        </Top>
        <Bottom>
          <Info>
            {cart.products?.map((product, i) => (
              <Product key={i}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b>
                      {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b>
                      {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                    <ProductSize>
                      <b>Size:</b>
                      {product.size}
                    </ProductSize>
                  </Details>
                </ProductDetail>
                <PriceDetails>
                  <ProductAmountContainer>
                    <Add style={{ cursor: "pointer" }} />
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove style={{ cursor: "pointer" }} />
                  </ProductAmountContainer>
                  <ProductPrice>₦ {product.price}</ProductPrice>
                </PriceDetails>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemText>₦ {cart.total}</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemText>₦ 5.90</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>shipping Discount</SummaryItemText>
              <SummaryItemText>₦ -5.90</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemText type="total">₦ {cart.total}</SummaryItemText>
            </SummaryItem>
            <Button
              onClick={() => {
                initializePayment(onSuccess, onClose);
              }}
            >
              CHECKOUT NOW
            </Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
