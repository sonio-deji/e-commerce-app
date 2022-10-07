import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url(https://media.istockphoto.com/photos/beautiful-emotional-woman-with-perfect-makeup-wearing-shiny-dress-picture-id1345772841?k=20&m=1345772841&s=612x612&w=0&h=-FjV02gF48rxPfZx4ge3wuhYe_c05Tzvd6zZRRNV0h4=)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0 0;
  padding: 10px;
  outline: none;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 40%;
  background-color: white;
  @media (max-width: 661px) {
    width: 90%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;
const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;
const Error = styled.p`
  font-size: 15px;
  margin: 20px 0px;
  color: red;
  text-align: center;
`;

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const [name, setName] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        await axios.post("http://localhost:5000/api/auth/register", {
          "firstName": name,
          "lastName": lastName,
          "username": username,
          "password": password,
          "email": email,
        });
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    } else {
      setPasswordMatch(true);
      setTimeout(() => {
        setPasswordMatch(false);
      }, 2000);
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="First name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Agreement>
            By creating an account i consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
        </Form>
        {passwordMatch && <Error>passwords do not match</Error>}
      </Wrapper>
    </Container>
  );
}

export default Register;