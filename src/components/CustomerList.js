import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const CustomerList = ({ customers, editCustomer, deleteCustomer }) => {
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET") || user.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  // Filter customers based on the identity reference
  const filteredCustomers = customers.filter((customer) =>
    customer.identityRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-responsive mt-4">
      <style>
        {`
          .search-input::placeholder {
            color: white;
            opacity: 1; /* Ensures placeholder text is fully visible */
            text-align: center; /* Centers the placeholder text */
          }

          .search-input {
            text-align: center; /* Centers all text inside the input field */
          }
        `}
      </style>

      {/* Search Field */}
      <div className="mb-3 d-flex justify-content-end">
        <input
          type="text"
          className="form-control search-input"
          style={{
            maxWidth: "300px",
            borderRadius: "25px",
            padding: "10px 15px",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#0d6efd",
            color: "white",
          }}
          placeholder="Search by identity reference"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredCustomers.length > 0 ? (
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
            {filteredCustomers.map((customer, index) => (
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
                      onClick={() => {
                        deleteCustomer(customer.identityRef);
                      }}
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
          No customers found matching the search term.
        </div>
      )}
    </div>
  );
};

export default CustomerList;