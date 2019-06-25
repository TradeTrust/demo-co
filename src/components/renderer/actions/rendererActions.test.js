import { registerTemplates, getTemplates } from "./";

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
});

describe("selectors", () => {
  it("getTemplates should return activeTemplateTab", () => {
    const store = {
      renderer: {
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
