import React from "react";
import UnVerifiedView from "./unverifiedView";
import renderer from "react-test-renderer";
import { MemoryRouter } from "react-router-dom";
import { shallow } from "enzyme";

const hashStatus = { verified: true },
  issuedStatus = { verified: true },
  notRevokedStatus = { verified: true };

const hashStatusFalse = { verified: false },
  issuedStatusFalse = { verified: false },
  notRevokedStatusFalse = { verified: false };

it("unverified view renders correctly when hash status, issued status and not revoked status is true", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <UnVerifiedView
          hashStatus={hashStatus}
          issuedStatus={issuedStatus}
          notRevokedStatus={notRevokedStatus}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("unverified view renders correctly when hash status, issued status and not revoked status is false", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <UnVerifiedView
          hashStatus={hashStatusFalse}
          issuedStatus={issuedStatusFalse}
          notRevokedStatus={notRevokedStatusFalse}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("unverified view renders correctly when hash status is false, issue status is true and not revoked status is true", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <UnVerifiedView
          hashStatus={hashStatusFalse}
          issuedStatus={issuedStatus}
          notRevokedStatus={notRevokedStatus}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it("unverified view renders correctly when hash status is true, issue status is false and not revoked status is true", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <UnVerifiedView
          hashStatus={hashStatus}
          issuedStatus={issuedStatusFalse}
          notRevokedStatus={notRevokedStatus}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
it("unverified view renders correctly when hash status is true, issue status is true and not revoked status is false", () => {
  const tree = renderer
    .create(
      <MemoryRouter>
        <UnVerifiedView
          hashStatus={hashStatus}
          issuedStatus={issuedStatus}
          notRevokedStatus={notRevokedStatusFalse}
        />
      </MemoryRouter>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});

describe("Unverified View component", () => {
  it("Test click event", () => {
    const resetData = jest.fn();
    const view = shallow(
      <UnVerifiedView
        hashStatus={hashStatus}
        issuedStatus={issuedStatus}
        notRevokedStatus={notRevokedStatusFalse}
        resetData={resetData}
      />
    );
    view.find("button").simulate("click", { preventDefault: () => {} });
    expect(resetData).toHaveBeenCalledTimes(1);
  });
});
