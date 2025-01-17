import React from "react";
import Home from "../components/Home";
import Login from "../components/Login";
import Register from "../components/Register";
import Profile from "../components/Profile";
import CustomerComponent from "../components/CustomerComponent";
import BankAccountComponent from "../components/BankAccountComponent";
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
        <Route path="/manage_bankaccounts" element={<BankAccountComponent />} />
        <Route path="/add_wirer_transfer" element={<WirerTransfert />} />
        <Route path="/consult_account" element={<BankAccountComponent />} />
      </Routes>
    </div>
  );
};

export default RoutesApplication;