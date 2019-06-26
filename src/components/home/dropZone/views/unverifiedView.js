import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./viewerStyles.css";
import invalid from "static/images/dropzone/invalid.svg";
import warning from "static/images/dropzone/warning.svg";

const View = ({
  resetData,
  // issuerIdentityStatus,
  hashStatus,
  issuedStatus,
  notRevokedStatus
}) => {
  const isWarning =
    hashStatus.verified && issuedStatus.verified && notRevokedStatus.verified;
  return (
    <div
      className={`viewer-container ${isWarning ? "warning" : "invalid"}`}
      style={{
        backgroundColor: isWarning ? "#fbf6e9" : "#fbeae9",
        borderRadius: 10
      }}
    >
      <span className={"message-container"}>
        {isWarning ? (
          <img alt="document warning" src={warning} />
        ) : (
          <img alt="document invalid" src={invalid} />
        )}
        <span
          className={`${isWarning ? "warning" : "invalid"} m-3`}
          style={{ fontSize: "1.5rem" }}
        >
          {isWarning
            ? "Document from unregistered institution"
            : "This document is not valid"}
        </span>
      </span>

      <div className={"verifications"}>
        {!hashStatus.verified ? (
          <p className={"messages"}>
            The document&#39;s contents are inaccurate
          </p>
        ) : null}

        {!issuedStatus.verified ? (
          <p className={"messages"}>The document records are not found</p>
        ) : null}

        {!notRevokedStatus.verified ? (
          <p className={"messages"}>The document has been revoked</p>
        ) : null}

        {/* {!issuerIdentityStatus.verified ? (
          <div>
            <p className={"messages"}>
              Certificate from unregistered institution
            </p>
            <p>
              We are unable to verify the certificate as this institution has
              not registered with OpenCerts
            </p>
          </div>
        ) : null} */}
      </div>

      <Link to="/faq">
        <div className={"unverified-btn"}>What should I do?</div>
      </Link>

      <div className={"secondary-links"}>
        <span>
          <Link to=" ">
            <button
              onClick={e => {
                e.preventDefault();
                resetData();
              }}
              className={"text-link"}
            >
              Try another
            </button>
          </Link>
        </span>
        {isWarning ? (
          <span
            onClick={e => {
              e.preventDefault();
              e.stopPropagation();
              e.nativeEvent.stopImmediatePropagation();
            }}
          >
            <Link to="/viewer">
              <button id="certificate-view-anyway" className={"text-link"}>
                View document anyway
              </button>
            </Link>
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

View.propTypes = {
  handleRenderOverwrite: PropTypes.func,
  resetData: PropTypes.func,
  document: PropTypes.object,

  // issuerIdentityStatus: PropTypes.object,
  hashStatus: PropTypes.object,
  issuedStatus: PropTypes.object,
  notRevokedStatus: PropTypes.object
};

export default View;
