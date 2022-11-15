import accountCreateService from "../../services/accounts/accountCreate.service";

const accountCreateController = async () => {
  const newAccount = await accountCreateService();

  return newAccount;
};

export default accountCreateController;
