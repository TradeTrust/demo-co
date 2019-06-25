import { get } from "lodash";
import { ethers } from "ethers";

import {
  verifyingDocumentHashSuccess,
  verifyingDocumentHashFailure,
  verifyingDocumentIssuedSuccess,
  verifyingDocumentIssuedFailure,
  verifyingDocumentRevocationSuccess,
  verifyingDocumentRevocationFailure
} from "components/home/actions/documentActions";

import { certificateData, verifySignature } from "@govtechsg/tradetrust-schema";
// import { isValidAddress as isEthereumAddress } from "ethereumjs-util";
import { getLogger } from "utils/logger";
import DocumentStoreDefinition from "services/contracts/DocumentStore.json";
// import fetchIssuers from "services/issuers";
import { combinedHash } from "utils";
import { ensResolveAddress } from "services/ens";
import { docTypes } from "components/home/reducer/constants";
import { getWeb3 } from "services/web3";
const { info, error } = getLogger("util:validate");

export async function loadCertificateContracts(payload, next) {
  try {
    const data = certificateData(payload);
    info(`Loading certificate: ${data}`);

    const unresolvedContractStoreAddresses = get(data, "issuers", []).map(
      issuer => issuer.certificateStore
    );
    const provider = await getWeb3();
    const contractStoreAddresses = await Promise.all(
      unresolvedContractStoreAddresses.map(unresolvedAddress =>
        ensResolveAddress(unresolvedAddress)
      )
    );
    info(`Resolved document's store addresses, ${contractStoreAddresses}`);

    const { abi } = DocumentStoreDefinition;

    const contracts = await contractStoreAddresses.map(
      address => new ethers.Contract(address, abi, provider)
    );

    await next({
      type: docTypes.LOADING_STORE_SUCCESS
    });
    return contracts;
  } catch (e) {
    await next({
      type: docTypes.LOADING_STORE_FAILURE,
      payload: e
    });
    return null;
  }
}

export async function verifyDocumentHash(next, { document }) {
  const verified = verifySignature(document);
  if (verified) {
    await verifyingDocumentHashSuccess(next);
    return true;
  }

  await verifyingDocumentHashFailure(next, {
    error: "Certificate data does not match target hash",
    document: certificateData(document)
  });
  return false;
}

export async function verifyDocumentIssued(next, { document, documentStores }) {
  try {
    const merkleRoot = `0x${get(document, "signature.merkleRoot", "")}`;

    // Checks if document has been issued on ALL store
    const issuedStatuses = await Promise.all(
      documentStores.map(store => store.isIssued(merkleRoot))
    );
    const isIssued = issuedStatuses.reduce((prev, curr) => prev && curr, true);
    if (!isIssued) throw new Error("Certificate has not been issued");
    await verifyingDocumentIssuedSuccess(next);
    return true;
  } catch (e) {
    await verifyingDocumentIssuedFailure(next, {
      document: certificateData(document),
      error: e.message
    });
    return false;
  }
}

export const getIntermediateHashes = (targetHash, proof = []) => {
  // Returns hash of all intermediate hashes from targetHash to merkleRoot
  const intermediateHashes = [`0x${targetHash}`];

  proof.reduce((accumulator, currentValue) => {
    const combined = combinedHash(accumulator, currentValue).toString("hex");
    intermediateHashes.push(`0x${combined}`);
    return combined;
  }, targetHash);

  return intermediateHashes;
};

export async function verifyDocumentNotRevoked(
  next,
  { document, documentStores }
) {
  try {
    const targetHash = get(document, "signature.targetHash", null);
    const proof = get(document, "signature.proof", null);

    // Checks if document and path towards merkle root has been revoked
    const intermediateHashes = getIntermediateHashes(targetHash, proof);

    for (let i = 0; i < intermediateHashes.length; i += 1) {
      const hash = intermediateHashes[i];

      // Check if document is revoked on ALL store
      const revokedStatus = await Promise.all(
        documentStores.map(store => store.isRevoked(hash))
      );
      const isRevoked = revokedStatus.reduce(
        (prev, curr) => prev || curr,
        false
      );
      if (isRevoked)
        throw new Error(`Document has been revoked, revoked hash: ${hash}`);
    }

    await verifyingDocumentRevocationSuccess(next);
    return true;
  } catch (e) {
    await verifyingDocumentRevocationFailure(next, {
      document: certificateData(document),
      error: e.message
    });

    return false;
  }
}

//   function isApprovedENSDomain(issuerAddress) {
//     trace(`Checking if ${issuerAddress} is opencerts TLD`);
//     const approvedENSDomains = [/(opencerts.eth)$/];
//     return some(
//       approvedENSDomains.map(domainMask =>
//         domainMask.test(issuerAddress.toLowerCase())
//       )
//     );
//   }

//   export function* lookupEthereumAddresses(ethereumAddressIssuers) {
//     const networkId = yield select(getNetworkId);
//     const networkName = matchNetwork(networkId);
//     const registeredIssuers = yield fetchIssuers();
//     const issuersNormalised = mapKeys(registeredIssuers[networkName], (_, k) =>
//       k.toUpperCase()
//     );

//     return ethereumAddressIssuers.map(store => {
//       const identity = issuersNormalised[store.toUpperCase()];

//       if (!identity) {
//         throw new Error(`Issuer identity cannot be verified: ${store}`);
//       }

//       return identity;
//     });
//   }

//   export function* resolveEnsNamesToText(ensNames) {
//     trace("resolving ", ensNames);
//     if (some(ensNames.map(ensName => !isApprovedENSDomain(ensName)))) {
//       const invalidEns = filter(ensNames, !isApprovedENSDomain);

//       const invalidEnsError = new Error(
//         `Issuer identity cannot be verified: ${invalidEns}`
//       );
//       error(invalidEnsError);
//       throw invalidEnsError;
//     }

//     const getTextResults = yield all(
//       ensNames.map(ensName => call(getText, ensName, "issuerName"))
//     );
//     trace(`Got texts records for ${ensNames}`, getTextResults);
//     trace(getTextResults);
//     return getTextResults;
//   }

//   export function* verifyCertificateIssuer({ certificate }) {
//     try {
//       const data = certificateData(certificate);
//       const contractStoreAddresses = get(data, "issuers", []).map(
//         issuer => issuer.certificateStore
//       );
//       trace(
//         `Attempting to verify certificate issuers: ${contractStoreAddresses}`
//       );

//       const [ethereumAddressIssuers, unresolvedEnsNames] = partition(
//         contractStoreAddresses,
//         isEthereumAddress
//       );

//       let resolvedEnsTexts = [];
//       let issuerIdentitiesFromRegistry = [];

//       trace("ethereumAddressIssuers", ethereumAddressIssuers);
//       trace("unresolvedEnsNames", unresolvedEnsNames);
//       if (!isEmpty(compact(unresolvedEnsNames))) {
//         resolvedEnsTexts = yield call(resolveEnsNamesToText, unresolvedEnsNames);
//         trace(`Resolved ens name ${unresolvedEnsNames} to ${resolvedEnsTexts}`);
//       }
//       if (!isEmpty(compact(ethereumAddressIssuers))) {
//         issuerIdentitiesFromRegistry = yield call(
//           lookupEthereumAddresses,
//           ethereumAddressIssuers
//         );
//         trace(
//           `Resolved ethereum address ${ethereumAddressIssuers} to ${issuerIdentitiesFromRegistry}`
//         );
//       }

//       const combinedIssuerIdentities = compact(
//         issuerIdentitiesFromRegistry.concat(resolvedEnsTexts)
//       );

//       if (combinedIssuerIdentities.length === 0) {
//         throw new Error(`Issuer identity missing in certificate`);
//       }

//       trace("combinedIssuerIdentities", combinedIssuerIdentities);
//       yield put(verifyingCertificateIssuerSuccess(combinedIssuerIdentities));
//       return combinedIssuerIdentities;
//     } catch (e) {
//       error(e);
//       yield put(
//         verifyingCertificateIssuerFailure({
//           error: e.message,
//           certificate: certificateData(certificate)
//         })
//       );
//       return false;
//     }
//   }

export const verifyDocument = state => next => async action => {
  try {
    next(action);
    next({ type: docTypes.VERIFYING_DOCUMENT });
    const documentStores = await loadCertificateContracts(state, next);

    const args = { documentStores, document: state };

    const verificationStatuses = await Promise.all([
      verifyDocumentIssued(next, args),
      verifyDocumentHash(next, args),
      verifyDocumentNotRevoked(next, args)
      //   certificateIssuerRecognised: call(verifyCertificateIssuer, args)
    ]);

    if (
      verificationStatuses[0] &&
      verificationStatuses[1] &&
      verificationStatuses[2]
    ) {
      return true;
    }
    return false;
  } catch (e) {
    error("verify document error", e);
  }
};
