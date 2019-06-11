import { Selector } from "testcafe";

fixture("Document Template").page`http://localhost:3001`;

const Document = "./sample/sample.json";
const IframeBlock = Selector("#iframe");
const TranscriptButton = Selector(".nav-item").withText("Demo Doc 2");
const SampleTemplate = Selector("#sample-template");

const validateTextContent = async (t, component, texts) =>
  texts.reduce(
    async (_prev, curr) => t.expect(component.textContent).contains(curr),
    Promise.resolve()
  );

test("Sample document is rendered correctly", async t => {
  await t.setFilesToUpload("input[type=file]", [Document]);

  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "DEMO STORE",
    "Singapore",
    "Reciepient Name"
  ]);

  await t.switchToMainWindow();
  await t.click(TranscriptButton);
  await t.switchToIframe(IframeBlock);

  await validateTextContent(t, SampleTemplate, [
    "Certificate of Non Manipulation",
    "DEMO STORE",
    "Reciepient Name"
  ]);
});
