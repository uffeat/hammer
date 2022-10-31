class Keywords extends HTMLElement {
  #data = [];
  #nav;
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = /*html*/ `
    <style>
      nav {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        padding: 16px var(--paddingH, 16px);
      }

      nav > a,
      nav > a:hover {
        text-decoration: none;
      }

      nav > a {
        --height: 32px;
        box-sizing: border-box;
        height: var(--height);
        min-width: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        color: var(--textColorOnPrimary);
        padding: 0 8px;
        border: 1px solid var(--gray400);
        border-radius: calc(var(--height) / 2);
      }

      nav > a:hover {
        background-color: var(--secondaryColor700);
        color: var(--textColorOnPrimary);
        border-color: var(--secondaryColor700);
      }
    </style>

    <nav></nav>
    `;
    this.#nav = this.shadowRoot.querySelector("nav");
  }

  static get observedAttributes() {
    return ["data"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    if (name === 'data') {
      if (this.data.join(';') !== newValue) {
        this.data = newValue === '' ? [] : newValue.split(';');
      }
    }
  }

  get data() {
    return this.#data;
  }

  set data(data) {
    this.#nav.innerHTML = '';
    data.forEach((topic) => {
      const a = document.createElement('a');
      a.href = `#blog?topic=${topic.toLowerCase()}`;
      a.text = topic;
      this.#nav.append(a);
    });
    this.#data = data;
    this.setAttribute("_data", this.data.join(';'));
  } 
}

customElements.define('x-keywords', Keywords);

console.log(`Web component with tag name 'x-keywords' defined.`);
