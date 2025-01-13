import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const CustomerList = ({ customers, editCustomer, deleteCustomer }) => {
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET"));
    }
  }, []);

  return (
    <div className="table-responsive mt-4">
      <h3 className="text-center mb-4"> </h3>
      {customers.length > 0 ? (
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Identity Reference</th>
              <th scope="col">Username</th>
              {showAgentGuichetBoard && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {customers.map((customer, index) => (
              <tr key={customer.id}>
                <td>{index + 1}</td>
                <td>{customer.firstname}</td>
                <td>{customer.lastname}</td>
                <td>{customer.identityRef}</td>
                <td>{customer.username}</td>
                {showAgentGuichetBoard && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => editCustomer(customer)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteCustomer(customer.identityRef)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info text-center">
          No customers available. Please add a customer.
        </div>
      )}
    </div>
  );
};

export default CustomerList;