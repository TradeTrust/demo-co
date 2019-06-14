import { getLogger } from "../utils/logger";

const { info } = getLogger("config");

export const NETWORK_TYPES = {
  INFURA_MAINNET: "INFURA_MAINNET",
  INFURA_ROPSTEN: "INFURA_ROPSTEN",
  INJECTED: "INJECTED",
  CUSTOM: "CUSTOM",
  MOCK: "MOCK"
};

export const URL = "https://opencerts.io";

const GA_PRODUCTION_ID = "UA-130492260-1";
const GA_DEVELOPMENT_ID = "UA-130492260-2";

// export const DEFAULT_NETWORK = IS_MAINNET
//   ? NETWORK_TYPES.INFURA_MAINNET
//   : NETWORK_TYPES.INFURA_ROPSTEN;
// export const GA_ID = IS_MAINNET ? GA_PRODUCTION_ID : GA_DEVELOPMENT_ID;
// export const CAPTCHA_CLIENT_KEY = "6LfiL3EUAAAAAHrfLvl2KhRAcXpanNXDqu6M0CCS";
// export const EMAIL_API_URL = IS_MAINNET
//   ? "https://api.opencerts.io/email"
//   : "https://api-ropsten.opencerts.io/email";
export const INFURA_PROJECT_ID = "1f1ff2b3fca04f8d99f67d465c59e4ef";
