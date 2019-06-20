import { getAddr } from "./ens";
import { isEthereumAddress } from "../../utils";
import { getLogger } from "../../utils/logger";

const { info } = getLogger("services:ensResolveAddress");

export const ensResolveAddress = async domain => {
  info(`Received request to resolve: ${domain}`);
  if (isEthereumAddress(domain)) {
    info(`${domain} is an ethereum address, no resolution needed.`);
    return domain;
  }
  return getAddr(domain);
};

export default ensResolveAddress;
