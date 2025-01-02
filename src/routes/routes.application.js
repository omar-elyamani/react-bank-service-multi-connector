import React from "react";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import CustomerComponent from "../components/CustomerComponent";
import BankAccount from "../components/BankAccount";
import WirerTransfert from "../components/WirerTransfert";
import { Route, Routes } from "react-router-dom";

const RoutesApplication = () => {
  return (
    <div className="container mt-3">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manage_customers" element={<CustomerComponent />} />
        <Route path="/manage_bankaccounts" element={<BankAccount />} />
        <Route path="/add_wirer_transfer" element={<WirerTransfert />} />
        <Route path="/consult_account" element={<BankAccount />} />
      </Routes>
    </div>
  );
};

export default RoutesApplication;