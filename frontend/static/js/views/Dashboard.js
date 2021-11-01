import AbstractView from "../views/AbstractView.js";

export default class Dashboard extends HTMLElement {
  constructor() {
    super();
    this.appendChild(
      document.querySelector("#dashboard-template").content.cloneNode(true)
    );
  }
}

customElements.define("blog-dashboard", Dashboard);
