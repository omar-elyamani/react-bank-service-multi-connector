import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const BankAccountList = ({ bankaccounts, getbankaccount }) => {
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
      {bankaccounts.length > 0 ? (
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">RIB</th>
              <th scope="col">Amount</th>
              <th scope="col">Account owner</th>
              {showAgentGuichetBoard && <th scope="col">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {bankaccounts.map((account, index) => (
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
                      onClick={() => getbankaccount(account)}
                    >
                      See details
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody> <br/>
        </table>
      ) : (
        <div className="alert alert-info text-center">
          No bankaccounts available. Please add a bank account.
        </div>
      )}
    </div>
  );
};

export default BankAccountList;