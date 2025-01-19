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

const deleteAccount = (rib) => {
  return api.delete("/bank/delete/" + rib);
};

const BankAccountsService = {
  getAllAccounts,
  getAccount,
  createAccount,
  deleteAccount
};

export default BankAccountsService;