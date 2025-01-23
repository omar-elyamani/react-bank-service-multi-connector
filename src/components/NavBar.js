import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showClientBoard, setShowClientBoard] = useState(false);
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);
  const [showAgentGuichetGetBoard, setShowAgentGuichetGetBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false); // New state for ROLE_ADMIN

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setShowClientBoard(user.roles.includes("ROLE_CLIENT"));
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET"));
      setShowAgentGuichetGetBoard(user.roles.includes("ROLE_AGENT_GUICHET_GET"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN")); // Check for admin role
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowClientBoard(false);
    setShowAgentGuichetBoard(false);
    setShowAgentGuichetGetBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container">
        <Link to="/home" className="navbar-brand">
          <i className="fas fa-university me-2"></i>Bank App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {/* Admin access to everything */}
            {showAdminBoard && (
              <>
                <li className="nav-item">
                  <Link to="/manage_bankaccounts" className="nav-link">
                    Bank accounts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/manage_customers" className="nav-link">
                    Customers
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/consult_account" className="nav-link">
                    My account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add_wirer_transfer" className="nav-link">
                    Wire transfer
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              </>
            )}

            {/* Agent Guichet access */}
            {(showAgentGuichetBoard || showAgentGuichetGetBoard) && !showAdminBoard && (
              <>
                <li className="nav-item">
                  <Link to="/manage_bankaccounts" className="nav-link">
                    Bank accounts
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/manage_customers" className="nav-link">
                    Customers
                  </Link>
                </li>
              </>
            )}

            {/* Client access */}
            {showClientBoard && !showAdminBoard && (
              <>
                <li className="nav-item">
                  <Link to="/consult_account" className="nav-link">
                    My account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/add_wirer_transfer" className="nav-link">
                    Wire transfer
                  </Link>
                </li>
              </>
            )}

            {/* Profile access for all logged-in users */}
            {currentUser && !showAdminBoard && (
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  Profile
                </Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light">
                    <i className="fas fa-user me-2"></i>
                    {currentUser.username}
                  </span>
                </li>
                <li className="nav-item">
                  <a
                    href="/login"
                    className="nav-link text-light"
                    onClick={logOut}
                  >
                    <i className="fas fa-sign-out-alt me-2"></i>Log out
                  </a>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    <i className="fas fa-sign-in-alt me-2"></i>Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    <i className="fas fa-user-plus me-2"></i>Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;