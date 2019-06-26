import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";

import DefaultView from "./views/defaultView";
import VerifyingView from "./views/verifyingView";
import UnverifiedView from "./views/unverifiedView";

const renderDropzoneContent = props => {
  const {
    handleRenderOverwrite,
    resetData,
    isDragAccept,
    isDragReject,
    verifying,
    fileError,
    // issuerIdentityStatus,
    hashStatus,
    issuedStatus,
    notRevokedStatus,
    document,
    verificationStatus,
    getRootProps,
    getInputProps
  } = props;
  // isDragReject is checking for mimetype (but we skipped it)
  // fileError is when the file is not in JSON format and threw when deserilising
  // valid JSON files will be handled by handleCertificateChange()
  if (isDragReject || fileError) {
    return (
      <DefaultView
        hover={true}
        accept={false}
        rootProps={getRootProps()}
        inputProps={getInputProps()}
      />
    );
  }
  if (isDragAccept) {
    return (
      <DefaultView
        hover={true}
        accept={true}
        rootProps={getRootProps()}
        inputProps={getInputProps()}
      />
    );
  }
  if (verifying) {
    return <VerifyingView verificationStatus={verificationStatus} />;
  }
  if (
    document &&
    (!hashStatus.verified ||
      !issuedStatus.verified ||
      !notRevokedStatus.verified)
  ) {
    return (
      <UnverifiedView
        handleRenderOverwrite={handleRenderOverwrite}
        resetData={() => resetData()}
        hashStatus={hashStatus}
        issuedStatus={issuedStatus}
        notRevokedStatus={notRevokedStatus}
        // issuerIdentityStatus={issuerIdentityStatus}
      />
    );
  }

  return (
    <DefaultView
      hover={false}
      accept={true}
      rootProps={getRootProps()}
      inputProps={getInputProps()}
    />
  );
};

const onFileDrop = (
  acceptedFiles,
  handleCertificateChange,
  handleFileError
) => {
  // eslint-disable-next-line no-undef
  const reader = new FileReader();
  if (reader.error) {
    handleFileError(reader.error);
  }
  reader.onload = () => {
    try {
      const json = JSON.parse(reader.result);
      handleCertificateChange(json);
    } catch (e) {
      handleFileError(e);
    }
  };
  if (acceptedFiles && acceptedFiles.length && acceptedFiles.length > 0)
    acceptedFiles.map(f => reader.readAsText(f));
};

const CertificateDropzone = ({
  handleCertificateChange,
  resetData,
  handleFileError,
  handleRenderOverwrite,
  fileError,
  verifying,
  issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus,
  document,
  verificationStatus
}) => {
  const onDrop = useCallback(
    acceptedFiles => {
      onFileDrop(acceptedFiles, handleCertificateChange, handleFileError);
    },
    [handleCertificateChange, handleFileError]
  );

  const {
    getRootProps,
    getInputProps,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop });

  return (
    <div
      id="dropzone"
      className="col-md-6"
      style={{ margin: "auto", top: "20%" }}
    >
      {renderDropzoneContent({
        handleCertificateChange,
        resetData,
        handleRenderOverwrite,
        fileError,
        verifying,
        issuerIdentityStatus,
        hashStatus,
        issuedStatus,
        notRevokedStatus,
        document,
        verificationStatus,
        isDragAccept,
        isDragReject,
        getRootProps,
        getInputProps
      })}
    </div>
  );
};

CertificateDropzone.propTypes = {
  document: PropTypes.object,
  resetData: PropTypes.func,
  handleCertificateChange: PropTypes.func,
  handleFileError: PropTypes.func,
  handleRenderOverwrite: PropTypes.func,
  updateCertificate: PropTypes.func,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array
};

renderDropzoneContent.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,
  fileError: PropTypes.bool,
  verifying: PropTypes.bool,
  isDragAccept: PropTypes.bool,
  isDragReject: PropTypes.bool,
  issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object,
  verificationStatus: PropTypes.array,
  getRootProps: PropTypes.func,
  getInputProps: PropTypes.func
};

export default CertificateDropzone;
