import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  updateDocument,
  getDocument,
  getVerifying,
  getIssuerIdentityStatus,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerificationStatus,
  resetDocumentState
} from "components/home/actions/documentActions";
import { updateNetworkId } from "components/home/actions";
import DocumentDropZone from "./dropzone";
import { Store } from "store";

const DocumentDropZoneContainer = () => {
    const { state, dispatch } = React.useContext(Store);
  const [fileError, setFileError] = useState(false);
  const document = getDocument(state);
  const verifying = getVerifying(state);
  const hashStatus = getHashStatus(state);
  const issuedStatus = getIssuedStatus(state);
  const notRevokedStatus = getNotRevokedStatus(state);
  const verificationStatus = getVerificationStatus(state);

  useEffect(
    () =>
      async function updateNetwork() {
        await updateNetworkId(dispatch);
      },
    []
  );

  const handleCertificateChange = (certificate) => {
    setFileError(false);
    updateDocument(dispatch, certificate);
  }

  const handleFileError = () => setFileError(true);

  const resetData = () => resetDocumentState(dispatch);

    return (
      <DocumentDropZone
        document={document}
        fileError={fileError}
        handleCertificateChange={handleCertificateChange}
        handleFileError={handleFileError}
        verifying={verifying}
        // issuerIdentityStatus={issuerIdentityStatus}
        hashStatus={hashStatus}
        issuedStatus={issuedStatus}
        notRevokedStatus={notRevokedStatus}
        verificationStatus={verificationStatus}
        resetData={resetData}
      />
    );
}

// const mapStateToProps = store => ({
//   document: getCertificate(store),

//   // Verification statuses used in verifier block
//   verifying: getVerifying(store),
//   issuerIdentityStatus: getIssuerIdentityStatus(store),
//   hashStatus: getHashStatus(store),
//   issuedStatus: getIssuedStatus(store),
//   notRevokedStatus: getNotRevokedStatus(store),
//   verificationStatus: getVerificationStatus(store)
// });

// const mapDispatchToProps = dispatch => ({
//   updateNetworkId: () => dispatch(updateNetworkId()),
//   updateCertificate: payload => dispatch(updateCertificate(payload)),
//   resetData: () => dispatch(resetCertificateState())
// });

export default DocumentDropZoneContainer;

DocumentDropZoneContainer.propTypes = {
  updateNetworkId: PropTypes.func,
  document: PropTypes.object,
  handleCertificateChange: PropTypes.func,
  updateCertificate: PropTypes.func,
  resetData: PropTypes.func,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array
};
