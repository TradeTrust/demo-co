import React, { Component } from 'react';
import Main from "../main";
import {Redirect} from "react-router-dom";
import { connect } from "react-redux";
import {
    verifySignature,
    validateSchema
  } from "@tradetrust/tradetrust-certificate";
  import { updateCertificate } from "../reducers/certificate";

class Home extends Component {
    constructor(props) {
        super(props);
    }
    handleCertificateChange(json) {
        // const validated = validateSchema(json);
        // if (!validated) {
        // throw new Error(
        //     "Certificate string does not conform to OpenCerts schema"
        // );
        // }
        const verified = verifySignature(json);
        if (!verified) {
            console.log(verified, "isverified")
            this.props.updateCertificate(json)
            this.props.history.push('/renderer');
        }
    }

    onFileDrop = e => {
        // eslint-disable-next-line no-undef
        const input = e.target;
        const reader = new FileReader();

        if (reader.error) {
          console.log("error", reader.error)
        }
        reader.onload = (e) => {
          try {
            const json = JSON.parse(e.target.result);
            this.handleCertificateChange(json);
            console.log("jaons", json)
          } catch (e) {
            console.log("error")
          }
        };
        reader.readAsText(input.files[0]);
        // if (e && e.target.files.length && e.target.files.length > 0)
        //   e.target.files.map(f => reader.readAsText(f));
      };

  render() {
    return (
        <>
        <input type="file" id="cert" name="cert" onChange={(e) => this.onFileDrop(e)}/>
        </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
    updateCertificate: payload => dispatch(updateCertificate(payload)),
  });

export default connect(null, mapDispatchToProps)(Home);