import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {getTemplates} from "../../../reducers/document";

class MultiDocRenderer extends Component {
    render() {
        const { templates} = this.props;
        return (
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                {templates && templates.length > 0 ? templates.map(t => <li class="nav-item">
                    <a className="nav-link" id={t.id} data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">t.label</a>
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
    template: PropTypes.object
  };