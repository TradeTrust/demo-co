import React, { useState } from "react";
import PropTypes from "prop-types";

import { getTemplates } from "components/renderer";
import { Store } from "store";

const MultiDocRenderer = ({ selectTemplateTab }) => {
  const [activeTab, setActiveTab] = useState(0);
  const { state } = React.useContext(Store);
  const templates = getTemplates(state);
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

export default MultiDocRenderer;

MultiDocRenderer.propTypes = {
  document: PropTypes.object,
  templates: PropTypes.array,
  selectTemplateTab: PropTypes.func
};
