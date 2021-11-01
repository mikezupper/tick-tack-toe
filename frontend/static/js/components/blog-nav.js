import AbstractView from "../views/AbstractView.js";
const template = document.querySelector("#blog-nav-template");

export default class BlogNav extends AbstractView {
  constructor() {
    super();
    //this.attachShadow({ mode: "open" });
    this.appendChild(template.content.cloneNode(true));
  }
}

customElements.define("blog-nav", BlogNav);
