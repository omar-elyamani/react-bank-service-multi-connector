import React, { useState, useEffect } from "react";
import CustomerList from "./CustomerList";
import CustomersService from "../services/customers.service";
import AuthService from "../services/auth.service";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CustomerComponent = () => {
  const [id, setId] = useState("");
  const [identityRef, setIdentityRef] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [customers, setCustomers] = useState([]);
  const [showAgentGuichetBoard, setShowAgentGuichetBoard] = useState(false);

  async function save(event) {
    event.preventDefault();
    try {
      if (id) {
        await CustomersService.updateCustomer(
          identityRef,
          firstname,
          lastname,
          username
        );
        toast.success("Customer updated successfully!");
      } else {
        await CustomersService.createCustomer(
          identityRef,
          firstname,
          lastname,
          username
        );
        toast.success("Customer added successfully!");
      }
      resetForm();
      loadCustomers();
    } catch (e) {
      toast.error(e.response?.data?.message || "An error occurred.");
    }
  }

  const resetForm = () => {
    setId("");
    setFirstname("");
    setLastname("");
    setIdentityRef("");
    setUsername("");
  };

  async function editCustomer(customer) {
    setFirstname(customer.firstname);
    setLastname(customer.lastname);
    setIdentityRef(customer.identityRef);
    setUsername(customer.username);
    setId(customer.id);
  }

  async function deleteCustomer(id) {
    try {
      const result = await CustomersService.deleteCustomer(id);
      
      if (result.message === "Technical error, please consult your administrator") {
        toast.error("An error occurred! Try deleting the customer's bank accounts first.", { autoClose: 5000 });
      } 

      else {
        toast.success("Customer deleted successfully!", { autoClose:3000 });
        loadCustomers();
      }

    } catch (e) {
      toast.error("An error occurred! Try deleting the customer's bank accounts first.", { autoClose: 5000 });
    }
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setShowAgentGuichetBoard(user.roles.includes("ROLE_AGENT_GUICHET"));
      loadCustomers();
    }
  }, []);

  async function loadCustomers() {
    try {
      const result = await CustomersService.getCustomers();
      setCustomers(result.data);
    } catch (e) {
      toast.error(e.response?.data?.details || "Failed to load customers.");
    }
  }

  return (
    <div className="container mt-5">
      {/* Toast Container */}
      <ToastContainer />

      {/* Form */}
      {showAgentGuichetBoard && (
        <div className="card shadow mb-4">
          <div className="card-header bg-primary text-white">
            <h4 className="mb-0" style={{ textAlign: "center" }}>
              {id ? "Edit customer" : "Add new customer"}
            </h4>
          </div>
          <div className="card-body">
            <form onSubmit={save}>
              <div className="form-group mb-3">
                <label htmlFor="firstname">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstname"
                  value={firstname}
                  placeholder="Enter first name"
                  onChange={(e) => setFirstname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="lastname">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  value={lastname}
                  placeholder="Enter last name"
                  onChange={(e) => setLastname(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="identityRef">Identity Reference</label>
                <input
                  type="text"
                  className="form-control"
                  id="identityRef"
                  value={identityRef}
                  placeholder="Enter identity reference"
                  onChange={(e) => setIdentityRef(e.target.value)}
                  required
                />
              </div>
              <div className="form-group mb-3">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={username}
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="text-center" style={{ marginTop: "50px" }}>
                <button type="submit" className="btn btn-success me-2">
                  {id ? "Update" : "Add"}
                </button>
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
        </div>
      )}

      <CustomerList
        customers={customers}
        editCustomer={editCustomer}
        deleteCustomer={deleteCustomer}
      />
    </div>
  );
};

export default CustomerComponent;
