import AbstractView from "../views/AbstractView.js";

export default class PostView extends HTMLElement {
  constructor() {
    super();
    this.postid;
    this.appendChild(
      document.querySelector("#post-view-template").content.cloneNode(true)
    );
  }
}

customElements.define("blog-post-view", PostView);
