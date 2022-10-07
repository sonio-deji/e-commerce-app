import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  @media (max-width: 765px) {
    flex-direction: column;
  }
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
const Desc = styled.p`
  margin: 20px 0px;
`;
const Logo = styled.h1``;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;
const Title = styled.h3`
  margin-bottom: 30px;
`;
const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;
const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;
const Payment = styled.div`
  width: 50%;
`;

function Footer() {
  return (
    <Container>
      <Left>
        <Logo>Sonio</Logo>
        <Desc>
          There are many variations of passages of lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomized words which don't look eben slightly believable
        </Desc>
        <SocialContainer>
          <SocialIcon color="385999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="e4405f">
            <Twitter />
          </SocialIcon>{" "}
          <SocialIcon color="55acee">
            <Instagram />
          </SocialIcon>{" "}
          <SocialIcon color="e60023">
            <Pinterest />
          </SocialIcon>{" "}
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Men Wears</ListItem>
          <ListItem>Women Wears</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wish List</ListItem>
          <ListItem>Terms</ListItem>
          <ListItem></ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: "10px" }} />
          17, selewu, igbogbo, Lagos state.
        </ContactItem>
        <ContactItem>
          {" "}
          <Phone style={{ marginRight: "10px" }} /> +2348117730982
        </ContactItem>
        <ContactItem>
          {" "}
          <MailOutline style={{ marginRight: "10px" }} />{" "}
          atandauthman2@gmail.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
}

export default Footer;
