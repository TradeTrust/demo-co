// Wrap web3.eth.getAccounts in a Promise
const ethers = require('ethers');
const Web3 = require('web3');
const getAccounts = async () => {

let provider;
if(typeof web3 !== 'undefined') {
  console.log("web3 available");
  provider = new ethers.providers.Web3Provider(window.web3.currentProvider)
 } else {
    console.log("web3 undefined");
    const web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    provider = new ethers.providers.Web3Provider(web3Provider);
 }
try {
    return await provider.listAccounts();
  } catch(e) {
    console.log(e);
  }

}

export default getAccounts;
