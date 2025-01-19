import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { toast } from "react-toastify";

const BankAccountList = ({ bankaccounts, getbankaccount, deleteaccount, loadaccounts }) => {
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET"));
    }
  }, []);

  const handleViewDetails = (account) => {
    getbankaccount(account);
    toast.info(`Viewing details for RIB: ${account.rib}`, { autoClose: 3000, closeButton: true });
  };

  const handleDeleteAccount = async (rib) => {
    try {
      await deleteaccount(rib);
      toast.success(`Bank account with RIB: ${rib} has been deleted successfully`);
      loadaccounts();
    } catch (error) {
      toast.error(`Failed to delete bank account with RIB: ${rib}`);
    }
  };

  // Filter bank accounts based on the identity reference
  const filteredBankAccounts = bankaccounts.filter((account) =>
    account.customer.identityRef.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="table-responsive mt-4">
      {/* Inline CSS for Placeholder */}
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
            backgroundColor: "#343a40",
            color: "white",
          }}
          placeholder="Search by identity reference"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredBankAccounts.length > 0 ? (
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">RIB</th>
              <th scope="col">Amount</th>
              <th scope="col">Account owner (identity reference)</th>
              {showAgentGuichetBoard && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredBankAccounts.map((account, index) => (
              <tr key={account.id}>
                <td>{index + 1}</td>
                <td>{account.rib}</td>
                <td>{account.amount}</td>
                <td>{account.customer.identityRef}</td>
                {showAgentGuichetBoard && (
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => handleViewDetails(account)}
                    >
                      See details
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm me-2"
                      onClick={() => handleDeleteAccount(account.rib)}
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
          No bank accounts found.
        </div>
      )}
    </div>
  );
};

export default BankAccountList;