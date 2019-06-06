import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import connectToChild from 'penpal/lib/connectToChild';

import { getCertificate, getTemplate } from "../../reducers/certificate";
import { certificateData } from "@tradetrust/tradetrust-certificate";

class IframeRenderer extends Component {
  constructor(props) {
    super(props);
    this.connection = null;
  }

  componentDidMount() {
    let iframe = document.querySelector("#frameless-iframe");
    let updateHeight = this.updateHeight.bind(this);
    let updateTemplates = this.updateTemplates.bind(this);
    this.connection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates
      }
    });
    this.renderCertificate(certificateData(this.props.document));
  }

  selectTemplateTab(i) {
    this.connection.promise.then(frame => frame.selectTemplateTab(i));
  }

  updateHeight(h) {
    // Adding 60 to account for extra height on firefox
    // this._iframe.height = h + 60;
  }

  updateTemplates(templates) {
    if (!templates) return;
    const templateSelector = document.getElementById("template-selectors");
    templateSelector.innerHTML = "";
    templates.forEach((t, i) => {
      const btn = document.createElement("button");
      btn.innerHTML = t.label;
      btn.id = `selector-${t.id}`;
      btn.onclick = () => this.selectTemplateTab(i);
      templateSelector.appendChild(btn);
    });
  }

  renderCertificate(doc) {
    this.connection.promise.then(frame => frame.renderCertificate(doc));
  }

  render() {
    const { template } = this.props;
    if(!template) return null
    return (
      <>
        <div id="template-selectors" />

        <iframe
          title="Rendered Certificate"
          id="frameless-iframe"
          src={template.url}
          style={{ width: "100%", border: 0, height: "100%" }}
        />
      </>
    );
  }
}

const mapStateToProps = store => ({
  document: getCertificate(store),
  template: getTemplate(store)
});

export default connect(mapStateToProps)(IframeRenderer);

IframeRenderer.propTypes = {
  document: PropTypes.object,
  template: PropTypes.object
};
