import React, { useState, useEffect } from "react";
import BankAccountsService from "../services/accounts.service";
import CustomersService from "../services/customers.service";
import AuthService from "../services/auth.service";
import BankAccountList from "./BankAccountList";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BankAccountComponent = () => {
  const [id, setId] = useState("");
  const [customerIdentityRef, setIdentityRef] = useState("");
  const [rib, setRib] = useState("");
  const [amount, setAmount] = useState("");
  const [accounts, setAccounts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);
  const [isReadonly, setIsReadonly] = useState(false);

  const resetForm = () => {
    setId("");
    setIdentityRef("");
    setRib("");
    setAmount("");
    setIsReadonly(false);
  };

  async function loadBankAccounts() {
    try {
      const result = await BankAccountsService.getAllAccounts();
      setAccounts(result.data);

      const result2 = await CustomersService.getCustomers();
      setCustomers(result2.data);
    } catch (e) {
      toast.error(e.response?.data?.details || "Failed to load bank accounts.");
    }
  }

  async function loadCustomerBankAccounts() {
    try {
      const user = localStorage.getItem("username"); 
      if (!user) {
        throw new Error("User is not logged in");
      }
  
      const result = await CustomersService.getcustomerbankaccounts(user);
      setAccounts(result.data);
    } catch (e) {
      toast.error(e.response?.data?.details || "Failed to load bank accounts.");
    }
  }

  async function save(event) {
    event.preventDefault();
    try {
      await BankAccountsService.createAccount(rib, amount, customerIdentityRef);
      toast.success("Bank account added successfully!", { autoClose: 3000 });
      resetForm();
      loadBankAccounts();
    } catch (e) {
      toast.error(e.response?.data?.message || "An error occurred.", {
        autoClose: 3000,
      });
    }
  }

  async function getAccount(account) {
    setIdentityRef(account.customer.identityRef);
    setRib(account.rib);
    setAmount(account.amount);
    setId(account.id);
    setIsReadonly(true);
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET"));
  
      if (user.roles.includes("ROLE_CLIENT")) {
        loadCustomerBankAccounts();
      } else {
        loadBankAccounts();
      }
    }
  }, []);

  return (
    <div className="container mt-5">
      <ToastContainer />

      {/* Form */}
      {showAgentGuichetBoard && (
        <div className="card shadow mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0" style={{ textAlign: "center" }}>
              {id ? "Bank account details" : "Add new bank account"}
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={save}>
              <div className="form-group mb-3">
                <label htmlFor="rib">RIB</label>
                <input
                  type="text"
                  className="form-control"
                  id="rib"
                  value={rib}
                  placeholder="RIB or IBAN"
                  onChange={(e) => setRib(e.target.value)}
                  readOnly={isReadonly} 
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="amount">Amount</label>
                <input
                  type="text"
                  className="form-control"
                  id="amount"
                  value={amount}
                  placeholder="Amount in M.A.D"
                  onChange={(e) => setAmount(e.target.value)}
                  readOnly={isReadonly}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="customerIdentityRef">Identity reference</label>
                <select
                  className="form-control"
                  id="customerIdentityRef"
                  value={customerIdentityRef}
                  onChange={(e) => setIdentityRef(e.target.value)}
                  disabled={isReadonly}
                  required
                >
                  <option value="" disabled>
                    Select an identity reference
                  </option>
                  {customers.map((customer) => (
                    <option key={customer.id} value={customer.identityRef}>
                      {customer.identityRef}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-center" style={{ marginTop: "50px" }}>
                {!isReadonly && (
                  <button type="submit" className="btn btn-success me-2">
                    {id ? "Update" : "Add"}
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <br />
        </div>
      )}

      <BankAccountList
        bankaccounts={accounts}
        getbankaccount={getAccount}
        deleteaccount={BankAccountsService.deleteAccount}
        loadaccounts={loadBankAccounts}
      />
    </div>
  );
};

export default BankAccountComponent;
