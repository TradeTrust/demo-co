import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import connectToChild from 'penpal/lib/connectToChild';

import { getDocument, getRenderType, registerTemplates as registerTemplatesAction } from "../../reducers/document";
import { certificateData } from "@tradetrust/tradetrust-certificate";
import MultiDocRenderer from "./multiDocRenderer";
class IframeRenderer extends Component {
  constructor(props) {
    super(props);
    this.connection = null;
  }

  componentDidMount() {
    console.log("component did mount")
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
    if(!this.props.document) {return this.props.history.push('/'); }
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
    //this.props.registerTemplates(templates)
  }

  renderCertificate(doc) {
    this.connection.promise.then(frame => frame.renderCertificate(doc));
  }

  render() {
    const { renderType, document } = this.props;
    return (
      <>
        <div id="template-selectors" />
        <MultiDocRenderer selectTemplateTab={this.selectTemplateTab.bind(this)} whitelist={[]}/>
        <iframe
          title="Rendered Certificate"
          id="frameless-iframe"
          ref={iframe => this._iframe = iframe}
          src={renderType ? renderType.url : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(IframeRenderer);

IframeRenderer.propTypes = {
  document: PropTypes.object,
  template: PropTypes.object
};
