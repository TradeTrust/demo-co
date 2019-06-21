import ethers from "ethers";
import { getLogger } from "utils/logger";
const { error } = getLogger("services:getAccouns");

const getAccounts = async () => {
  let provider;
  provider = new ethers.providers.Web3Provider(window.web3.currentProvider);
  try {
    return await provider.listAccounts();
  } catch (e) {
    error("get accounts", e);
  }
};

export default getAccounts;
