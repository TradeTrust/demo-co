import { types } from "./constants";

import reducer from "./";

describe("reducers", () => {
  describe("DOCUMENT_TEMPLATE_REGISTER", () => {
    it("should update templates and activeTemplateTab for new state", () => {
      const action = {
        type: types.DOCUMENT_TEMPLATE_REGISTER,
        payload: [
          {
            id: "document",
            label: "Document"
          },
          {
            id: "transcript",
            label: "Transcript"
          }
        ]
      };
      const prevState = { foo: "bar" };
      const expectedState = {
        foo: "bar",
        templates: [
          {
            id: "document",
            label: "Document"
          },
          {
            id: "transcript",
            label: "Transcript"
          }
        ]
      };
      expect(reducer(prevState, action)).toEqual(expectedState);
    });

    it("should update templates and activeTemplateTab for existing template", () => {
      const action = {
        type: types.DOCUMENT_TEMPLATE_REGISTER,
        payload: [
          {
            id: "document",
            label: "Document"
          },
          {
            id: "transcript",
            label: "Transcript"
          }
        ]
      };
      const prevState = {
        foo: "bar",
        templates: [
          {
            id: "transcript",
            label: "Transcript"
          },
          { id: "document", label: "Document" }
        ]
      };
      const expectedState = {
        foo: "bar",
        templates: [
          {
            id: "document",
            label: "Document"
          },
          {
            id: "transcript",
            label: "Transcript"
          }
        ]
      };
      expect(reducer(prevState, action)).toEqual(expectedState);
    });
  });
});
