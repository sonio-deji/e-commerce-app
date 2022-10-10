import styled from "styled-components";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(168, 47, 47, 0.5)),
    url(https://media.istockphoto.com/photos/portrait-beautiful-young-woman-with-clean-fresh-skin-picture-id1329622588?k=20&m=1329622588&s=612x612&w=0&h=rTYNojRtwlGG1-8ZK-Sw6iFwXs1r3MVcaKIuUTIhga8=)
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Button = styled.button`
  position: relative;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;

  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;
const Input = styled.input`
  flex: 1;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  outline: none;
`;
const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;
const Wrapper = styled.div`
  padding: 20px;
  width: 30%;
  background-color: white;

  @media (max-width: 755px) {
    width: 50%;
  }
  @media (max-width: 483px) {
    width: 90%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Links = styled.p`
  margin: 5px 0;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
  font-size: 15px;
`;
const Label = styled.label`
  position: relative;
`;
const LoadingSpinner = styled.div`
  width: 30px;
  height: 30px;
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

const Login = () => {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [inputType, setInputType] = useState("password");
  const [loader, setLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const { isFetching, errorLog, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    setLoader(true);
    login(dispatch, { username, password });
    if (error) {
      setErrorMsg(true);
    }
  };
  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };
  setTimeout(() => {
    setErrorMsg(false);
    setLoader(false);
  }, 6000);
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setusername(e.target.value.toLowerCase())}
          />
          <Label>
            <Input
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
              type={inputType}
            />
            <VisibilityIcon
              onClick={handleInputType}
              style={{
                position: "absolute",
                top: "15px",
                right: "5px",
                color: "teal",
                cursor: "pointer",
              }}
            />
          </Label>
          <Button disabled={isFetching} onClick={handleClick}>
            LOGIN
          </Button>

          {loader && (
            <SpinnerContainer>
              <LoadingSpinner></LoadingSpinner>
            </SpinnerContainer>
          )}
        </Form>
        {errorMsg && <Error>{errorLog}</Error>}
        <br></br>

        <Links>DO NOT REMEMBER THE PASSWORD?</Links>
        <br></br>
        <Link to="/register" style={{ color: "black" }}>
          <Links>CREATE AN ACCOUNT</Links>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Login;
