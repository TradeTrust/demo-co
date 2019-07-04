import React from "react";
import DefaultView from "./defaultView";
import renderer from "react-test-renderer";

it("default view renders correctly when hover true and accept is false", () => {
  const tree = renderer
    .create(<DefaultView hover={true} accept={false} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("default view renders correctly when hover and accept is true", () => {
  const tree = renderer
    .create(<DefaultView hover={true} accept={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("default view renders correctly when hover is false and accept is true", () => {
  const tree = renderer
    .create(<DefaultView hover={false} accept={true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
