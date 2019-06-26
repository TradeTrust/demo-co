import { Selector } from "testcafe";

fixture("Dropzone").page`http://localhost:3001`;

const dropzone = Selector("#dropzone");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly", async t => {
  await validateTextContent(t, dropzone, [
    "Drag and drop your tradetrust file"
  ]);
});
