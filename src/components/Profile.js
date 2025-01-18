import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [jwtToken, setJwtToken] = useState("");
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setJwtToken(user.jwtToken);
      setUsername(user.username);
      setRoles(user.roles);
    }
  }, []);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-light" style={{ textAlign: "center" }}>
          <h4 className="mb-0">
            <i className="fas fa-user-circle me-2"></i>Your profile
          </h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group my-2">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                readOnly
              />
            </div>
            <div className="form-group my-2">
              <label>JWT Token</label>
              <textarea
                className="form-control"
                value={jwtToken}
                readOnly
                rows="4"
                style={{ wordWrap: "break-word" }}
              ></textarea>
            </div>
            <div className="form-group my-2">
              <label>Roles</label>
              {roles.length > 0 ? (
                <ul className="list-group">
                  {roles.map((role, index) => (
                    <li key={index} className="list-group-item">
                      {role}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">No roles assigned</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;