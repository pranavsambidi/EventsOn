import { ToastContainer } from "react-toastify";
import React from "react";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Events from "./components/Events";
import Schedule from "./components/Schedule";
import Request from "./components/Requests";
import Reports from "./components/Reports";
import Login from "./components/Login";
//import RefreshHandler from "./RefreshHandler";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Footer from "./components/Footer";
import "./components/style.css";
import PrivateRoute from "./components/PrivateRoute";
import { AuthProvider } from "./components/AuthContext";
function App() {
  // const [isAuth, setIsAuth] = useState(null);
  // const [role, setRole] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const userRole = localStorage.getItem("role");
  //   if (token) {
  //     setIsAuth(true);
  //     setRole(userRole);
  //   } else {
  //     setIsAuth(false);
  //   }
  // }, []);

  // const PrivateRoute = ({ element, allowedRoles }) => {
  //   if (!isAuth) return <Navigate to="/loginpage" />;
  //   if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;
  //   return element;
  // };
  return (
    <div className="App">
      <div className="page-container">
      <div className="content-wrap">
      <AuthProvider>
        <Router>
          <ToastContainer />
          <Navbar />
          {/* <RefreshHandler setIsAuth={setIsAuth}/> */}
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/eventspage" element={<Events />} />
            <Route path="/loginpage" element={<Login />} />
            <Route
              path="/schedulepage"
              element={
                <PrivateRoute>
                  {" "}
                  <Schedule />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/requestspage"
              element={
                <PrivateRoute>
                  {" "}
                  <Request />{" "}
                </PrivateRoute>
              }
            />
            <Route
              path="/reportspage"
              element={
                <PrivateRoute>
                  {" "}
                  <Reports />{" "}
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
      </div>
      <Footer/>
      </div>
    </div>
  );
}

export default App;
