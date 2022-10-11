import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Username = styled.h3`
  color: #3d3a3a;
  padding: 20px;
`;

const Home = () => {
  const user = useSelector((state) => state.user.currentUser);
  return (
    <div>
      <Announcement />
      <Navbar />
      <Username>Welcome, {user.username}</Username>
      <Slider />
      <Categories />
      <Products />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Home;
