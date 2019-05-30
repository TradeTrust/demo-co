import { LitElement, html } from "lit-element";

const certificate = {
  schema: "tradetrust/v1.0",
  data: {
    id: "b2aaeca5-b041-49fd-a1c9-d3a670995476:string:ABCXXXXX00",
    $template: {
      name: "9b7703ed-de0f-4bab-bee4-c54e074ec524:string:CUSTOM_TEMPLATE",
      type: "945e78b6-48d0-46de-a0f4-36bef103baa2:string:IFRAME_RENDERING",
      url:
        "292fd2f6-9062-4555-858c-489857f12157:string:http://localhost:3000/rederer"
    },
    description: "9ffd40ae-4c27-4944-aa4d-cf037ef5557c:string:A Certificate",
    issuedOn:
      "b264599b-f91d-44f7-b15b-6def5ed8a5a8:string:2018-08-30T00:00:00+08:00",
    certificateType:
      "87286159-9b9e-452d-8779-7c1f86bb4132:string:Certificate of Origin",
    issuers: [
      {
        name: "4b51ba42-8ece-4db3-9ced-a62a1d039259:string:DEMO STORE",
        address:
          "db24a0c6-58ee-4709-813c-a571a29dc6f5:string:Changi Singapore -123456",
        country: "8db25bcf-28fc-4a62-85d2-841057df32d5:string:Singapore",
        certificateStore:
          "322795af-82ed-4a9f-8c48-c3db8a199fc5:string:0x9178F546D3FF57D7A6352bD61B80cCCD46199C2d"
      }
    ],
    recipient: {
      name: "75603d76-05fb-4ec7-b7d8-62bfa15d6048:string:Reciepient Name",
      address: "231b37c0-83bd-4787-bfa9-6e513a1e47b7:string:Sydney Australia",
      country: "908d7956-7cb5-412f-bfd2-568e645632ee:string:Australia"
    }
  },
  privacy: {},
  signature: {
    type: "SHA3MerkleProof",
    targetHash:
      "6bb53c8335699ae8456890a9c0817b4a271790a2d7ecf2f2d8c3b430a92e5de1",
    proof: [],
    merkleRoot:
      "6bb53c8335699ae8456890a9c0817b4a271790a2d7ecf2f2d8c3b430a92e5de1"
  }
};

class IframeRender extends LitElement {
  constructor() {
    super();
  }

  firstUpdated() {
    this._iframe = this.shadowRoot.querySelector("iframe");
    let iframe = this._iframe;
    let updateHeight = this.updateHeight.bind(this);
    let updateTemplates = this.updateHeight.bind(this);
    window.connection = window.Penpal.connectToChild({
      iframe,
      methods: {
        updateHeight,
        updateTemplates
      }
    });
  }

  selectTemplateTab(i) {
    window.connection.promise.then(frame => frame.selectTemplateTab(i));
  }

  updateHeight(h) {
    // Adding 60 to account for extra height on firefox
    this._iframe.height = h + 60;
  }

  updateTemplates(templates) {
    if (!templates) return;
    const templateSelector = document.getElementById("template-selectors");
    templateSelector.innerHTML = "";
    templates.forEach((t, i) => {
      const btn = document.createElement("button");
      btn.innerHTML = t.label;
      btn.id = `selector-${t.id}`;
      btn.onclick = () => this.selectTemplateTab(i);
      templateSelector.appendChild(btn);
    });
  }

  renderCertificate(cert) {
    window.connection.promise.then(frame => frame.renderCertificate(cert));
  }

  render() {
    return html`
      <button
        id="render-certificate"
        @click=${() => this.renderCertificate(certificate)}
      >
        Render Certificate
      </button>

      <div id="template-selectors"></div>

      <iframe
        title="Rendered Certificate"
        id="frameless-iframe"
        src="http://localhost:3000"
        style="width: 100%; border: 0px; height: 100%"
      ></iframe>
    `;
  }
}

customElements.define("iframe-render", IframeRender);
