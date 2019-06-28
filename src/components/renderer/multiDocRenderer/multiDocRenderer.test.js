import React from "react";
import { mount } from "enzyme";
import MultiDocRenderer from "./index";

describe("MUltiDocRenderer component", () => {
  let realUseContext;
  let useContextMock;
  // Setup mock
  beforeEach(() => {
    realUseContext = React.useContext;
    useContextMock = React.useContext = jest.fn();
  });
  // Cleanup mock
  afterEach(() => {
    React.useContext = realUseContext;
  });
  const payload = [
    {
      id: "document",
      label: "Document"
    },
    {
      id: "transcript",
      label: "Transcript"
    }
  ];
    it("there should be two buttons for the mocked payload", () => {
      useContextMock.mockReturnValue({
        state: { renderer: { templates: payload } }
      });
      const docRenderer = mount(<MultiDocRenderer />);
      expect(docRenderer.find("button")).toHaveLength(2);
    });
});
