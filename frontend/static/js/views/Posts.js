import AbstractView from "../views/AbstractView.js";

export default class Posts extends HTMLElement {
  constructor() {
    super();
    this.appendChild(
      document.querySelector("#posts-template").content.cloneNode(true)
    );
  }
}

customElements.define("blog-posts", Posts);
