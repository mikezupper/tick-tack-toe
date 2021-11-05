const ts = document.createElement("template");
ts.innerHTML = `<button class="square"></button>`;

export default class TicTackToeSquare extends HTMLElement {
  constructor() {
    super();
    this.appendChild(ts.content.cloneNode(true));

    this.button = this.querySelector("button");

    this.clickListener = (e) => {
      const newEvent = new CustomEvent("squareOccupied", {
        detail: this.id,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(newEvent);
    };

    this.button.addEventListener("click", this.clickListener);

    this.gameStartListener = (e) => {
      this.removeAttribute("played");
      this.setAttribute("color", "white");
      this.button.addEventListener("click", this.clickListener);
    };

    this.gameOverListener = (e) => {
      this.button.removeEventListener("click", this.clickListener);
    };
  }

  connectedCallback() {
    document.addEventListener("gameStart", this.gameStartListener);
    document.addEventListener("gameOver", this.gameOverListener);
  }

  disconnectedCallback() {
    document.removeEventListener(this.gameStartListener);
    document.removeEventListener(this.gameOverListener);
  }

  static get observedAttributes() {
    return ["color", "played"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === "color") {
      this.color = newValue;
      this.button.style.background = this.color;
    }
    if (attributeName === "played") {
      this.played = newValue;
      this.firstChild.innerHTML = this.played;
    }
  }
}
customElements.define("game-square", TicTackToeSquare);
