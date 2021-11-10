const squareTemplate = document.createElement("template");
squareTemplate.innerHTML = `
<style>
.square {
  background: #fff;
  border: 1px solid #999;
  float: left;
  font-size: 24px;
  font-weight: bold;
  line-height: 34px;
  height: 34px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 34px;
}

.square:focus {
  outline: none;
}
</style>
<button class="square"></button>`;

const INIT_STATE = {
  move: undefined,
  index: undefined,
  player: undefined,
  color: undefined,
};

export default class TicTackToeSquare extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(squareTemplate.content.cloneNode(true));

    this.state = INIT_STATE;
    this.button = this.shadowRoot.querySelector("button");
  }

  static get observedAttributes() {
    return ["color", "player", "move", "index"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.debug(
      "[GAME SQUARE] attributeChangedCallback",
      attributeName,
      oldValue,
      newValue
    );

    if (oldValue == newValue) {
      console.debug(
        "[GAME SQUARE] attributeChangedCallback - old and new are the same. no change needed for [%s]",
        attributeName
      );
      return;
    }

    if (attributeName === "color") {
      this.color = newValue;
      this.button.style.background = this.color;
    }
    if (attributeName === "player") {
      this.player = newValue;
      this.button.innerText = this.player;
    }
    if (attributeName === "move") {
      this.move = newValue;
    }
    if (attributeName === "index") {
      this.index = newValue;
    }
  }
}
customElements.define("game-square", TicTackToeSquare);
