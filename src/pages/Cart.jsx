import styled from "styled-components";
import { Add, Remove } from "@mui/icons-material";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { usePaystackPayment } from "react-paystack";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  addProducts,
  getTotal,
  reduceQuantity,
  clearCart,
} from "../redux/cartRedux";

const Container = styled.div``;
const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;
const Wrapper = styled.div`
  padding: 20px;
  @media (max-width: 693px) {
    padding-left: 5px;
    padding-right: 5px;
  }
`;
const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 693px) {
    padding-left: 5px;
    padding-right: 5px;
  }
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
const Clear = styled.button`
  padding: 10px;
  cursor: pointer;
  font-weight: 600;
  background-color: transparent;
  padding: 10px;
  margin: 20px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 815px) {
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

  @media (max-width: 595px) {
    flex-direction: column;
  }
`;
const ProductDetail = styled.div`
  flex: 2;
  display: flex;
  @media (max-width: 461px) {
    flex-direction: column;
  }
`;
const Image = styled.img`
  width: 200px;
  @media (max-width: 461px) {
    width: auto;
    max-width: 150px;
    display: block;
    margin: 0 auto;
  }
`;
const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  @media (max-width: 461px) {
    padding: unset;
    width: 100%;
  }
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
const NoItemInCart = styled.h2`
  padding-left: 20px;
`;
const SummaryTitle = styled.h1`
  font-weight: 300;
  font-size: 15px;
`;
const ProductDesc = styled.p``;
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
const Error = styled.p`
  font-size: 15px;
  color: red;
`;

const Cart = () => {
  const [error, setError] = useState(false);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.currentUser);

  const dispatch = useDispatch();

  const handleDecreaseQuantity = (product) => {
    dispatch(reduceQuantity(product));
  };
  const handleIncreaseQuantity = (product) => {
    dispatch(addProducts(product));
  };
  const makeRequest = async (transaction, trxref, message, status) => {
    try {
      await publicRequest.post("/checkout/payment", {
        "transactionID": transaction,
        "trxref": trxref,
        "amount": cart.total,
        "message": message,
        "status": status,
      });
    } catch (error) {}
  };
  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  //paystack config
  const config = {
    reference: new Date().getTime().toString(),
    email: user === null ? "" : user.email,
    amount: cart.total * 100,
    publicKey: "pk_test_61ab2a20131f59a6f24389b99b2a51a9fc1b527b",
  };
  const onSuccess = (reference) => {
    console.log(reference);
    makeRequest(
      reference.transaction,
      reference.trxref,
      reference.message,
      reference.status
    );
  };
  // paystack on close function

  const onClose = () => {};
  const initializePayment = usePaystackPayment(config);
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  const handlePayment = () => {
    if (user === null) {
      setError(true);
    } else {
      initializePayment(onSuccess, onClose);
    }
  };
  setTimeout(() => {
    setError(false);
  }, 4000);
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
          {error && <Error>Please sign in to make purchase</Error>}

          <TopButton type="filled" onClick={handlePayment}>
            CHECK OUT NOW
          </TopButton>
        </Top>
        <Clear onClick={handleClearCart}>CLEAR CART</Clear>

        <Bottom>
          <Info>
            {cart.products.length === 0 ? (
              <NoItemInCart>No items in cart</NoItemInCart>
            ) : (
              cart.products?.map((product) => (
                <Product key={product._id}>
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
                      <ProductDesc>
                        <b>Description:</b>
                        {product.desc}
                      </ProductDesc>
                      <ProductColor color={product.color} />
                      <ProductSize>
                        <b>Size:</b>
                        {product.size}
                      </ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetails>
                    <ProductAmountContainer>
                      <Add
                        style={{ cursor: "pointer" }}
                        onClick={() => handleIncreaseQuantity(product)}
                      />

                      <ProductAmount>{product.quantity}</ProductAmount>

                      <Remove
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDecreaseQuantity(product)}
                      />
                    </ProductAmountContainer>
                    <ProductPrice>
                      ??? {product.price * product.quantity}
                    </ProductPrice>
                  </PriceDetails>
                </Product>
              ))
            )}
            <Hr />
          </Info>
          <Summary>
            {user === null ? (
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            ) : (
              <SummaryTitle>
                {" "}
                ORDER SUMMARY FOR {user.username.toUpperCase()}
              </SummaryTitle>
            )}

            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemText>??? {cart.total}</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemText>??? 5.90</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>shipping Discount</SummaryItemText>
              <SummaryItemText>??? -5.90</SummaryItemText>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText type="total">Total</SummaryItemText>
              <SummaryItemText type="total">??? {cart.total}</SummaryItemText>
            </SummaryItem>
            <Button onClick={handlePayment}>CHECKOUT NOW</Button>
            {error && <Error>Please sign in to make purchase</Error>}
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
