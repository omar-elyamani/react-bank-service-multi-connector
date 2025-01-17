import api from "./axiosConfig";

const getAllAccounts = () => {
  return api.get("/bank/all");
};

const getAccount = (customerIdentityRef) => {
  return api.get("/bank/account" + customerIdentityRef);
};

const createAccount = (rib, amount, customerIdentityRef) => {
  return api.post("/bank/create", {
    rib,
    amount,
    customerIdentityRef,
  });
};

const editAccount = (rib, status) => {
  return api.put("/bank/update/" + rib, {
    rib,
    status
  });
};

const BankAccountsService = {
  getAllAccounts,
  getAccount,
  createAccount,
  editAccount
};

export default BankAccountsService;