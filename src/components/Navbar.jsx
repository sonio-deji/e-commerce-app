import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import { Badge } from "@mui/material";
import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { logout } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  justify-content: center;
  @media (max-width: 531px) {
    padding: 10px 0px;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 531px) {
    padding-right: 5px;
    justify-content: center;
  }
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  color: black;
  @media (max-width: 531px) {
    font-size: 12px;
    margin-left: 15px;
  }
`;

const Languages = styled.div`
  font-size: 14px;
  cursor: pointer;
  @media (max-width: 531px) {
    display: none;
  }
`;
const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  @media (max-width: 531px) {
    margin-left: 3px;
  }
`;
const Input = styled.input`
  border: none;
  outline: none;
  @media (max-width: 531px) {
    width: 50px;
  }
`;
const Logo = styled.h1`
  font-weight: bold;
  @media (max-width: 531px) {
    font-size: 20px;
  }
`;

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user.currentUser);
  const [signIn, setSignIn] = useState(false);
  const [signOut, setSignOut] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (user) {
      setSignIn(false);
      setSignOut(true);
    } else {
      setSignIn(true);
      setSignOut(false);
    }
  }, [user]);
  return (
    <Container>
      <Wrapper>
        <Left>
          <Languages>EN</Languages>
          <SearchContainer>
            <Input placeholder="Search" />
            <Search style={{ color: "gray", fontSize: "16px" }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>SONIO.</Logo>
        </Center>
        <Right>
          {signIn && (
            <MenuItem>
              {" "}
              <Link
                to="/register"
                style={{ color: "black", textDecoration: "none" }}
              >
                REGISTER
              </Link>
            </MenuItem>
          )}

          {signIn && (
            <MenuItem>
              <Link
                to={"/login"}
                style={{ color: "black", textDecoration: "none" }}
              >
                SIGN IN
              </Link>
            </MenuItem>
          )}
          {signOut && (
            <MenuItem onClick={handleLogout}>
              {" "}
              <Link
                to={"/login"}
                style={{ color: "black", textDecoration: "none" }}
              >
                SIGN OUT
              </Link>
            </MenuItem>
          )}
          <Link to={"/cart"}>
            <MenuItem>
              <Badge badgeContent={cart.quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
