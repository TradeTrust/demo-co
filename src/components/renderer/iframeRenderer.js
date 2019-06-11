import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import connectToChild from "penpal/lib/connectToChild";

import {
  getDocument,
  getRenderType,
  registerTemplates as registerTemplatesAction
} from "../../reducers/document";
import { certificateData } from "@govtechsg/tradetrust-schema";
import MultiDocRenderer from "./multiDocRenderer";

class IframeRenderer extends Component {
  constructor(props) {
    super(props);
    this.connection = null;
  }

  componentDidMount() {
    let iframe = this._iframe;
    let updateHeight = this.updateHeight.bind(this);
    let updateTemplates = this.updateTemplates.bind(this);
    this.connection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates
      }
    });
    if (!this.props.document) {
      return this.props.history.push("/");
    }
    this.renderCertificate(certificateData(this.props.document));
  }

  selectTemplateTab(i) {
    this.connection.promise.then(frame => frame.selectTemplateTab(i));
  }

  updateHeight() {
    // Adding 60 to account for extra height on firefox
    // this._iframe.height = h + 60;
  }

  updateTemplates(templates) {
    if (!templates) return;
    this.props.registerTemplates(templates);
  }

  renderCertificate(doc) {
    this.connection.promise.then(frame => frame.renderCertificate(doc));
  }

  render() {
    const { renderType } = this.props;
    return (
      <>
        <MultiDocRenderer
          selectTemplateTab={this.selectTemplateTab.bind(this)}
          whitelist={[]}
        />
        <iframe
          title="Rendered Certificate"
          id="iframe"
          ref={iframe => (this._iframe = iframe)}
          src={renderType ? renderType.url : ""}
          style={{ width: "100%", border: 0, height: "100%" }}
        />
      </>
    );
  }
}

const mapStateToProps = store => ({
  document: getDocument(store),
  renderType: getRenderType(store)
});

const mapDispatchToProps = dispatch => ({
  registerTemplates: templates => dispatch(registerTemplatesAction(templates))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IframeRenderer);

IframeRenderer.propTypes = {
  document: PropTypes.object,
  renderType: PropTypes.object,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  registerTemplates: PropTypes.func
};
