import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  updateDocument,
  getDocument,
  getVerifying,
  getHashStatus,
  getIssuedStatus,
  getNotRevokedStatus,
  getVerificationStatus,
  resetDocumentState
} from "components/home/actions/documentActions";
import { updateNetworkId } from "components/home/actions";
import DocumentDropZone from "./dropzone";
import { Store } from "store";
import { withMiddleware } from "middleware";
import { verifyDocument } from "components/home/utils/validate";

const DocumentDropZoneContainer = ({ history }) => {
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

  const handleCertificateChange = certificate => {
    setFileError(false);
    const wrappedDispatch = withMiddleware(certificate, dispatch)(
      verifyDocument
    );
    updateDocument(wrappedDispatch, certificate)
      .then(verified => {
        if (verified) history.push("/renderer");
      })
      .catch(e => console.log(e));
  };

  const handleFileError = () => setFileError(true);

  const resetData = () => resetDocumentState(dispatch);
  console.log("state", state.document);
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
};

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
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
