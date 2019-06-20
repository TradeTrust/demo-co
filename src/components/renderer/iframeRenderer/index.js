import React, { useEffect } from "react";
import PropTypes from "prop-types";
import connectToChild from "penpal/lib/connectToChild";
import { Store } from "store";

import {
  getDocument,
  getRenderType,
  registerTemplates as registerTemplatesAction
} from "components/renderer/actions";
import { certificateData } from "@govtechsg/tradetrust-schema";
import MultiDocRenderer from "../multiDocRenderer";

let connection = null;

const IframeRenderer = props => {
  const { state, dispatch } = React.useContext(Store);
  const renderType = getRenderType(state);
  const doc = getDocument(state);

  useEffect(() => {
    if (!doc) {
      return props.history.push("/");
    }

    let iframe = document.querySelector("iframe");
    connection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates
      }
    });

    renderDocument(certificateData(doc));
  }, []);

  const selectTemplateTab = (conn => i => {
    conn.promise.then(frame => {
      frame.selectTemplateTab(i);
    });
  })(connection);

  const updateHeight = () => {
    // Adding 60 to account for extra height on firefox
    // this._iframe.height = h + 60;
  };

  const updateTemplates = templates => {
    if (!templates) return;
    registerTemplatesAction(dispatch, templates);
  };

  const renderDocument = doc => {
    connection.promise.then(frame => {
      frame.renderCertificate(doc);
    });
  };

  return (
    <>
      { doc && <MultiDocRenderer selectTemplateTab={i => selectTemplateTab(i)} />}
      <iframe
        title="Rendered Document"
        id="iframe"
        src={renderType ? renderType.url : ""}
        style={{ width: "100%", border: 0, height: "100%" }}
      />
    </>
  );
};

export default IframeRenderer;

IframeRenderer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
