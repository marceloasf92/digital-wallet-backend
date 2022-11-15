import { IAccountDelete } from "../../interfaces/accounts";
import accountDeleteService from "../../services/accounts/accountDelete.service";

const accountDeleteController = async ({ id }: IAccountDelete) => {
  const newAccount = await accountDeleteService({ id });

  return newAccount;
};

export default accountDeleteController;
