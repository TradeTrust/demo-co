import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import connectToChild from "penpal/lib/connectToChild";
import { Store } from "store";

import {
  getDocument,
  getRenderType,
  registerTemplates as registerTemplatesAction
} from "components/renderer/actions";
import { getData } from "@govtechsg/tradetrust-schema";
import MultiDocRenderer from "../multiDocRenderer";

let connection = null;

const IframeRenderer = props => {
  const { state, dispatch } = React.useContext(Store);
  const renderType = getRenderType(state);
  const doc = getDocument(state);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!doc) {
      return props.history.push("/");
    }
    const iframe = iframeRef.current;
    connection = connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates
      }
    });

    renderDocument(getData(doc));
  }, [doc, props]);

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
    dispatch(registerTemplatesAction(templates));
  };

  const renderDocument = doc => {
    connection.promise.then(frame => {
      frame.renderDocument(doc);
    });
  };

  return (
    <>
      {doc && (
        <MultiDocRenderer selectTemplateTab={i => selectTemplateTab(i)} />
      )}
      <iframe
        title="Rendered Document"
        ref={iframeRef}
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
