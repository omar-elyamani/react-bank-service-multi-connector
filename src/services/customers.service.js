import api from "./axiosConfig";

const getCustomers = () => {
  return api.get("/customer/all");
};

const deleteCustomer = (identityRef) => {
  return api.delete("/customer/delete/" + identityRef);
};

const createCustomer = (identityRef, firstname, lastname, username) => {
  return api.post("/customer/create", {
    identityRef,
    firstname,
    lastname,
    username,
  });
};

const updateCustomer = (identityRef, firstname, lastname, username) => {
  return api.put("/customer/update/" + identityRef, {
    firstname,
    lastname,
    username,
  });
};

const getcustomerbankaccounts = (username) => {
  return api.get("/customer/bank-accounts/" + username);
}

const CustomersService = {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getcustomerbankaccounts
};

export default CustomersService;