class Author extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/`
    <style>
      .wrapper {
        display: flex;
        align-items: center;
        column-gap: 16px;
      }

      .wrapper img.author {
        --size: 40px;
        display: inline-block;
        width: var(--size);
        height: var(--size);
        border-radius: calc(var(--size) / 2);
      }

      .wrapper > .info {
        display: inline-flex;
        flex-direction: column;
        justify-content: center;
      }

      .wrapper > .info > a.author,
      .wrapper > .info > time {
        font-size: 14px;
      }

      .wrapper > .info > a.author {
        color: var(--secondaryColor400);
      }

      .wrapper > .info > a.author:hover {
        color: var(--secondaryColor500);
      }

      .wrapper > .info > time {
        color: var(--textColorOnPrimary);
      }

      .wrapper > .info > time::after {
        content: attr(datetime);
      }
    </style>
    <div class="wrapper">
      <img class="author" src="" alt="" />
      <div class="info">
        <a href="#" target="_blank" class="author"></a>
        <time></time>
      </div>
    </div>
    `;
    this._image_element = this.shadowRoot.querySelector("img");
    this._name_element = this.shadowRoot.querySelector("a");
    this._time_element = this.shadowRoot.querySelector("time");
  }

  static get observedAttributes() {
    return ['date', 'image', 'link', 'name'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[name] = newValue;
  }

  get date() {
    return this._date;
  }

  set date(value) {
    this._date = value;
    this._time_element.setAttribute('datetime', value);
    this.setAttribute("date", value);
  }

  get image() {
    return this._image;
  }

  set image(value) {
    this._image = value;
    this._image_element.src = value
    this.setAttribute("image", value);
  }

  get link() {
    return this._link;
  }

  set link(value) {
    this._link = value;
    this._name_element.href = value;
    this.setAttribute("link", value);
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
    this._name_element.textContent = value;
    this.setAttribute("name", value);
  }

}


customElements.define('x-author', Author);