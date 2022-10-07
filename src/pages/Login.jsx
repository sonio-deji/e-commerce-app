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
  min-width: 40%;
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
  width: 25%;
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
`;
const Links = styled.a`
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
const Eye = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
`;

const Login = () => {
  const dispatch = useDispatch();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [inputType, setInputType] = useState("password");

  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
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
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setusername(e.target.value)}
          />
          <Label>
            <Input
              placeholder="password"
              onChange={(e) => setpassword(e.target.value)}
              type={inputType}
            />
            <Eye>
              <VisibilityIcon onCLick={handleInputType} />
            </Eye>
          </Label>

          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong</Error>}
        </Form>
        <Links>DO NOT REMEMBER THE PASSWORD?</Links>
        <br></br>
        <Link to="/register">
          <Links>CREATE AN ACCOUNT</Links>
        </Link>
      </Wrapper>
    </Container>
  );
};

export default Login;
