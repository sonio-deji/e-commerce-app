import "./App.css";
import ProductList from "./pages/ProductList";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Success from "./pages/Success";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.user.user.currentUser);
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/products/:category" element={<ProductList />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/login"
          element={user ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate replace to="/" /> : <Register />}
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  );
}

// {
// 	"username": "sonio wizzy admin",
// 	"password": "12345678",
//   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2E5YzBiYmVhOWE0ZjE5ZTk2MWEyMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY2NDc5Mzk4NSwiZXhwIjoxNjY1MDUzMTg1fQ.rSTcWA4IrpjDtWWrJ_81LzrPIfAZo8WGEOK-F38od_w
// }

export default App;
