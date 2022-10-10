import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
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
  min-width: ${(props) => (props.password === "password" ? "100%" : "40%")};
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
  position: relative;
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
const Label = styled.label`
  position: relative;
`;
const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 10px solid black;
  border-top: 10px solid teal;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
  margin: auto;
  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SpinnerContainer = styled.div`
  position: absolute;
  bottom: 13px;
  z-index: 50;
  right: 50px;
`;

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [inputType, setInputType] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (password === confirmPassword) {
      try {
        await axios.post(
          "https://jsstore-api.herokuapp.com/api/auth/register",
          {
            "firstName": firstName,
            "lastName": lastName,
            "username": username.toLowerCase(),
            "password": password,
            "email": email.toLowerCase(),
          }
        );
        setIsLoading(false);
        navigate("/login");
      } catch (error) {
        console.log(error);
        if (error.response.data._message) {
          setErrorMsg(
            `${error.response.data._message}, please input all fields`
          );
        } else if (error.response.data.keyPattern.username) {
          setErrorMsg("Username already exists");
        } else {
          setErrorMsg("Email already exists");
        }
        setTimeout(() => {
          setErrorMsg("");
          setIsLoading(false);
        }, 4000);
      }
    } else {
      setPasswordMatch(true);
      setTimeout(() => {
        setPasswordMatch(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="email"
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
          <Label>
            <Input
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              type={inputType}
              password="password"
            />
            <VisibilityIcon
              onClick={handleInputType}
              style={{
                position: "absolute",
                top: "25px",
                right: "5px",
                color: "teal",
                cursor: "pointer",
              }}
            />
          </Label>
          <Label>
            <Input
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              type={inputType}
              password="password"
            />
            <VisibilityIcon
              onClick={handleInputType}
              style={{
                position: "absolute",
                top: "25px",
                right: "5px",
                color: "teal",
                cursor: "pointer",
              }}
            />
          </Label>

          <Agreement>
            By creating an account i consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleSubmit}>CREATE</Button>
          {isLoading && (
            <SpinnerContainer>
              <LoadingSpinner></LoadingSpinner>
            </SpinnerContainer>
          )}
        </Form>
        {passwordMatch && <Error>passwords do not match</Error>}
        <Error>{errorMsg}</Error>
      </Wrapper>
    </Container>
  );
}

export default Register;
