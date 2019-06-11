import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { verifySignature, validateSchema } from "@govtechsg/tradetrust-schema";
import { updateDocument } from "../reducers/document";
import { getLogger } from "../utils/logger";

const { error } = getLogger("components:Home");

class Home extends Component {
  handleCertificateChange(json) {
    const validated = validateSchema(json);
    if (!validated) {
      throw new Error(
        "Certificate string does not conform to OpenCerts schema"
      );
    }
    const verified = verifySignature(json);
    if (verified) {
      this.props.updateDocument(json);
      this.props.history.push("/renderer");
    }
  }

  onFileDrop(e) {
    const input = e.target;
    const reader = new FileReader();

    if (reader.error) {
      error("File reader error", reader.error);
    }
    reader.onload = e => {
      try {
        const json = JSON.parse(e.target.result);
        this.handleCertificateChange(json);
      } catch (e) {
        error("File onload error", e);
      }
    };
    reader.readAsText(input.files[0]);
  }

  render() {
    return (
      <input
        type="file"
        id="cert"
        name="cert"
        onChange={e => this.onFileDrop(e)}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateDocument: payload => dispatch(updateDocument(payload))
});

export default connect(
  null,
  mapDispatchToProps
)(Home);

Home.propTypes = {
  updateDocument: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
