// Wrap web3.eth.getAccounts in a Promise
const ethers = require("ethers");
const getAccounts = async () => {
  let provider;
  provider = new ethers.providers.Web3Provider(window.web3.currentProvider);

  try {
    return await provider.listAccounts();
  } catch (e) {
    console.log(e);
  }
};

export default getAccounts;
