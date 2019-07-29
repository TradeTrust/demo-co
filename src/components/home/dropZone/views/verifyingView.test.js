import React from "react";
import VerifyingView from "./verifyingView";
import renderer from "react-test-renderer";
const verifyingStatusWarning = {
  message: "warning renderes correctly",
  warning: true,
  error: false
};

const verifyingStatusError = {
  message: "error renderes correctly",
  warning: false,
  error: true
};

const verifyingStatus = {
  message: "verification status renderes correctly",
  warning: false,
  error: false
};
it("verifying view renders correctly when warning true", () => {
  const tree = renderer
    .create(<VerifyingView verifyingStatus={verifyingStatusWarning} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("verifying view renders correctly when error is true", () => {
  const tree = renderer
    .create(<VerifyingView verifyingStatus={verifyingStatusError} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("verifying view renders correctly when there is no warning or error", () => {
  const tree = renderer
    .create(<VerifyingView verifyingStatus={verifyingStatus} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
