import * as tradeTrustScehma from "@govtechsg/tradetrust-schema";
import {
  verifyDocumentNotRevoked,
  verifyDocumentHash,
  getIntermediateHashes,
  verifyDocumentIssued
} from "./validate";

import {
  MakeCertUtil,
  mockStore,
  targetHash,
  proof0,
  proof1,
  rootHash
} from "./testUtils";

function whenThereIsOneEthereumAddressIssuer() {
  const ethereumAddresses = ["0xd2536C3cc7eb51447F6dA8d60Ba6344A79590b4F"];
  const document = new MakeCertUtil().addIssuer(ethereumAddresses[0]).finish();
  return { document, ethereumAddresses };
}

jest.mock("@govtechsg/tradetrust-schema");

describe("validate document", () => {
  describe("getIntermediateHashes", () => {
    it("should return targetHash only if there is no proof", () => {
      expect(getIntermediateHashes(targetHash)).toEqual([`0x${targetHash}`]);
    });
    it("should return all intermediate (and final) hash", () => {
      const intermediateHashes = getIntermediateHashes(targetHash, [
        proof0,
        proof1
      ]);
      expect(intermediateHashes.length).toBe(3);
      expect(intermediateHashes[0]).toEqual(`0x${targetHash}`);
      expect(intermediateHashes[2]).toEqual(`0x${rootHash}`);
    });
  });

  describe("verifyDocumentNotRevoked", () => {
    it("should return true and put success action if all the store returns false for all hashes", async () => {
      const mock = mockStore();
      mock.isRevoked.returns(false);
      const documentStores = [mock, mock, mock];

      const dispatch = jest.fn();
      const { document } = whenThereIsOneEthereumAddressIssuer();
      let result = await verifyDocumentNotRevoked(dispatch, {
        document,
        documentStores
      });

      expect(result).toBe(true);
    });

    it("should return false and put fail action if all the store returns true for all hashes", async () => {
      let mock = mockStore();
      mock.isRevoked.returns(true);
      const documentStores = [mock, mock, mock];
      const dispatch = jest.fn();
      const { document } = whenThereIsOneEthereumAddressIssuer();
      let result = await verifyDocumentNotRevoked(dispatch, {
        document,
        documentStores
      });
      expect(result).toBe(false);
    });
  });

  describe("verifyDocumentHash", () => {
    const dispatch = jest.fn();
    it("should return true when verification is successful", async () => {
      tradeTrustScehma.verifySignature.mockReturnValue(true);
      const { document } = whenThereIsOneEthereumAddressIssuer();
      const res = await verifyDocumentHash(dispatch, { document });

      expect(res).toBe(true);
    });

    it("should return false when document is not verified", async () => {
      tradeTrustScehma.verifySignature.mockReturnValue(true);
      const { document } = whenThereIsOneEthereumAddressIssuer();
      const res = await verifyDocumentHash(dispatch, { document });

      expect(res).toBe(true);
    });
  });

  describe("verifyDocumentIssued", () => {
    it("should return true and put success action if all the store returns true for all merkle root", async () => {
      const mock = mockStore();
      mock.isIssued.returns(true);
      const documentStores = [mock, mock, mock];
      const dispatch = jest.fn();
      const { document } = whenThereIsOneEthereumAddressIssuer();
      let result = await verifyDocumentIssued(dispatch, {
        document,
        documentStores
      });

      expect(result).toBe(true);
    });

    it("should return false and put fail action if all the store returns true for all hashes", async () => {
      try {
        let mock = mockStore();
        mock.isIssued.returns(false);
        const documentStores = [mock, mock, mock];
        const dispatch = jest.fn();
        const { document } = whenThereIsOneEthereumAddressIssuer();
        let result = await verifyDocumentIssued(dispatch, {
          document,
          documentStores
        });
        expect(result).toBe(false);
      } catch (e) {
        expect(e).toEqual({
          message:
            "Document has been revoked, revoked hash: 0xf7432b3219b2aa4122e289f44901830fa32f224ee9dfce28565677f1d279b2c7"
        });
      }
    });
  });
});
