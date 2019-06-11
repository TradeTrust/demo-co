import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getTemplates } from "reducers/document";

const MultiDocRenderer = ({ templates, selectTemplateTab }) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <ul className="nav nav-tabs container" id="myTab" role="tablist">
      {templates && templates.length > 0
        ? templates.map((t, idx) => (
            <li key={idx} className="nav-item">
              <a
                className={`nav-link ${idx === activeTab ? "active" : ""}`}
                id={t.id}
                onClick={() => {
                  selectTemplateTab(idx);
                  setActiveTab(idx);
                }}
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                {t.label}
              </a>
            </li>
          ))
        : null}
    </ul>
  );
};

const mapStateToProps = store => ({
  templates: getTemplates(store)
});

export default connect(
  mapStateToProps,
  null
)(MultiDocRenderer);

MultiDocRenderer.propTypes = {
  document: PropTypes.object,
  templates: PropTypes.array,
  selectTemplateTab: PropTypes.func
};
