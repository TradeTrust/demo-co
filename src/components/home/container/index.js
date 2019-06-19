import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { verifySignature, validateSchema } from "@govtechsg/tradetrust-schema";
import { updateDocument } from "components/renderer";
import { getLogger } from "utils/logger";

import { updateNetworkId } from "components/home";
import { Store } from "store";
const { error } = getLogger("components:Home");

const Home = props => {
  const { dispatch } = React.useContext(Store);

  useEffect(
    () =>
      async function updateNetwork() {
        await updateNetworkId(dispatch);
      },
    []
  );

  const handleCertificateChange = json => {
    const validated = validateSchema(json);
    if (!validated) {
      throw new Error(
        "Certificate string does not conform to OpenCerts schema"
      );
    }
    const verified = verifySignature(json);
    if (verified) {
      updateDocument(dispatch, json);
      props.history.push("/renderer");
    }
  };

  const onFileDrop = e => {
    e.preventDefault();
    const input = e.target;
    const reader = new FileReader();

    if (reader.error) {
      error("File reader error", reader.error);
    }
    reader.onload = e => {
      try {
        const json = JSON.parse(e.target["result"]);
        handleCertificateChange(json);
      } catch (e) {
        error("File onload error", e);
      }
    };
    reader.readAsText(input.files[0]);
  };
  return <input type="file" id="cert" name="cert" onChange={onFileDrop} />;
};

export default Home;

Home.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  })
};
