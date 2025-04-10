import React from "react";
import logo from "./assects/logo.png";
import { NavLink } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Navbar() {
  const { user, logout } = useAuth(); // Get user and logout from context

  const token = user?.token;
  const role = user?.role;

  return (
    <div>
      <ul>
        <li>
          <NavLink
            className="navbar-brand mt-3"
            to="/"
            style={{ fontSize: "larger", color: "aliceblue" }}
          >
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="logo"
            />{" "}
            EventsOn
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-custom" : ""
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/eventspage"
            className={({ isActive }) =>
              isActive ? "active-custom" : ""
            }
          >
            Events
          </NavLink>
        </li>

        {token && (
          <li>
            <NavLink
              to="/schedulepage"
              className={({ isActive }) =>
                isActive ? "active-custom" : ""
              }
            >
              Schedule
            </NavLink>
          </li>
        )}

        {token && role === "admin" && (
          <>
            <li>
              <NavLink
                to="/requestspage"
                className={({ isActive }) =>
                  isActive ? "active-custom" : ""
                }
              >
                Requests
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/reportspage"
                className={({ isActive }) =>
                  isActive ? "active-custom" : ""
                }
              >
                Reports
              </NavLink>
            </li>
          </>
        )}

        {!token ? (
          <li>
            <NavLink
              to="/loginpage"
              className={({ isActive }) =>
                isActive ? "active-custom" : ""
              }
            >
              Login
            </NavLink>
          </li>
        ) : (
          <li>
            <button
              type="button"
              className="btn btn-dark"
              style={{
                padding: "8px 16px",
                fontSize: "16px",
                borderRadius: "50px",
                color: "white",
                backgroundColor: "black",
                border: "none",
                cursor: "pointer",
                margin: "11px 0px",
              }}
              onClick={() => {
                logout(); // logout via context
                window.location.reload(); // reload to update navbar visibility
              }}
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
