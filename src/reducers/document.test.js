import reducer, {
    types,
    registerTemplates,
    selectTemplateTab,
    getActiveTemplateTab,
    getTemplates,
  } from "./document";
  
  describe("reducers", () => {
    describe("DOCUMENT_TEMPLATE_SELECT_TAB", () => {
      it("should update activeTemplateTab", () => {
        const action = {
          type: types.DOCUMENT_TEMPLATE_SELECT_TAB,
          payload: 2
        };
        const prevState = { foo: "bar" };
        const expectedState = {
          foo: "bar",
          activeTemplateTab: 2
        };
        expect(reducer(prevState, action)).toEqual(expectedState);
      });
    });
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
          ],
          activeTemplateTab: 0
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
          ],
          activeTemplateTab: 1
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
          ],
          activeTemplateTab: 0
        };
        expect(reducer(prevState, action)).toEqual(expectedState);
      });
    });
  });
  
  describe("actions", () => {
    it("registerTemplates should generate correct action", () => {
      const fn = registerTemplates;
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
      const expectedAction = {
        type: "DOCUMENT_TEMPLATE_REGISTER",
        payload: [
          { id: "document", label: "Document" },
          { id: "transcript", label: "Transcript" }
        ]
      };
      expect(fn(payload)).toEqual(expectedAction);
    });
  
    it("selectTemplateTab should generate correct action", () => {
      const fn = selectTemplateTab;
      const payload = 2;
      const expectedAction = {
        type: "DOCUMENT_TEMPLATE_SELECT_TAB",
        payload: 2
      };
      expect(fn(payload)).toEqual(expectedAction);
    });
  });
  
  describe("selectors", () => {
    it("getActiveTemplateTab should return activeTemplateTab", () => {
      const store = { document: { activeTemplateTab: 2 } };
      expect(getActiveTemplateTab(store)).toEqual(2);
    });
  
    it("getTemplates should return activeTemplateTab", () => {
      const store = {
        document: {
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
        }
      };
      expect(getTemplates(store)).toEqual([
        {
          id: "document",
          label: "Document"
        },
        {
          id: "transcript",
          label: "Transcript"
        }
      ]);
    });
  });
  