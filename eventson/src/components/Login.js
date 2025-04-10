import React from 'react';
import logo from "./assects/logo.png";
import img6 from "./assects/img6.jpeg";
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from './utils';
import { useAuth } from './AuthContext'; // Import AuthContext

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login method from context

  const [loginInfo, setLoginInfo] = React.useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (!email || !password) {
      handleError("Please fill in all fields");
      return;
    }

    try {
      const url = "http://localhost:8080/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginInfo)
      });

      const result = await response.json();
      const { success, message, jwtToken, error } = result;

      if (success) {
        handleSuccess(message);

        // Store user in global context
        login({
          token: jwtToken,
          role: result.role,
          email: result.email,
        });

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        handleError(error || message);
      }

    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src={img6} className="img-fluid" alt="Login visual" />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <img
                src={logo}
                height="300px"
                width="300px"
                style={{ position: "relative", left: "100px" }}
                alt="Logo"
              />
              <form onSubmit={handleLogin} className="bg-white shadow-5 rounded-3 p-4 p-md-5">
                <div className="form-outline mb-4">
                  <input
                    onChange={handleChange}
                    type="email"
                    name="email"
                    id="form1Example13"
                    className="form-control form-control-lg"
                    required
                  />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>

                <div className="form-outline mb-4">
                  <input
                    onChange={handleChange}
                    type="password"
                    name="password"
                    id="form1Example23"
                    className="form-control form-control-lg"
                    required
                  />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>

                <button type="submit" className="btn btn-primary btn-lg btn-block">Log in</button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
