import React from "react";
import PropTypes from "prop-types";
import "./viewerStyles.css";

const View = ({ hover, accept, rootProps, inputProps }) => {
  console.log(rootProps, "input", inputProps)
return (
  <div
    className={`viewer-container ${
      // eslint-disable-next-line no-nested-ternary
      hover ? (accept ? "accept" : "invalid") : "default"
    }`}
    style={{ borderRadius: 10, height: 300 }}
    {...rootProps}
  >
    {accept ? null : (
      <div>
        File cannot be read. Please check that you have a valid .tt file
      </div>
    )}
    <div
      className="text-brand-dark"
      style={{ fontSize: "1.375rem", fontWeight: 500 }}
    >
      Drag and drop your opencert file
    </div>
    <div className="text-muted">to view its contents</div>
    <div className="text-muted row">
      <div className="col-2" />
      <div className="col-3">
        <hr />
      </div>
      <div className="col-2">or</div>
      <div className="col-3">
        <hr />
      </div>
    </div>
    <div className="text-muted row">
      <div className="mx-auto">
        <button type="button" className={`pointer ${"btn"}`}>
          Select File
        </button>
        <input {...inputProps} /> 
      </div>
    </div>
  </div>
);
    }
export default View;

View.propTypes = {
  hover: PropTypes.bool,
  accept: PropTypes.bool,
  rootProps: PropTypes.object,
  inputProps: PropTypes.object
};
