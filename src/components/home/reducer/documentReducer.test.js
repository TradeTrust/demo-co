import { docTypes, docInitialState } from "./constants";
import reducer from "./documentReducer";

describe("reducers", () => {
  describe("RESET_DOCUMENT", () => {
    it("should reset the document state", () => {
      const action = {
        type: docTypes.RESET_DOCUMENT
      };
      const prevState = { foo: "bar" };

      expect(reducer(prevState, action)).toEqual(docInitialState);
    });

    it("should reset the document state", () => {
      const doc = {
        schema: "tradetrust/v1.0",
        data: {
          id: "71f10d54-d483-489b-b06f-fa2bed75ce16:string:certificate-id",
          $template: { demo: "test" },
          issuers: []
        },
        signature: {
          targetHash: "12dsd3232"
        }
      };
      const action = {
        type: docTypes.UPDATE_DOCUMENT,
        payload: doc
      };
      const prevState = { doc: null, docModified: null, renderType: null };

      const expectedState = {
        ...docInitialState,
        doc: doc,
        docModified: doc,
        renderType: { demo: "test" }
      };

      expect(reducer(prevState, action)).toEqual(expectedState);
    });
  });
});
