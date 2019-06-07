import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {getTemplates} from "../../../reducers/document";

class MultiDocRenderer extends Component {

    selectTemplateTab = (idx) => this.props.selectTemplateTab(idx)
    render() {
        const { templates} = this.props;
        return (
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {templates && templates.length > 0 ? templates.map((t, idx) => <li key={idx} className="nav-item">
                    <a className="nav-link" id={t.id} onClick={() => this.selectTemplateTab(idx)} role="tab" aria-controls="home" aria-selected="true">{t.label}</a>
                </li>) : null}
            </ul>
        );
    }
}

const mapStateToProps = store => ({
    templates: getTemplates(store)
  });

  
  export default connect(mapStateToProps, null)(MultiDocRenderer);
  
  MultiDocRenderer.propTypes = {
    document: PropTypes.object,
    templates: PropTypes.array
  };