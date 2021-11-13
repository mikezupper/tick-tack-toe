const gameInfoTemplate = document.querySelector("#game-info-template");

export default class TicTackToeGameInfo extends HTMLElement {
  constructor() {
    super();
    //this.attachShadow({ mode: "open" });
    this.appendChild(gameInfoTemplate.content.cloneNode(true));
    this.squareClickedListener = (e) => {
      const {move,player,squareIndex} = e.detail;
      console.log("[GAME INFO]  - player moved ", move,player,squareIndex);
      const nextPlayer = player == "O" ? "X" : "O";
      this.setAttribute("next-player", nextPlayer);
      this.renderPlayerInfo(`Next player: ${nextPlayer}`);
    };

    this.gameOverListener = (e) => {
      console.log("[GAME INFO]  - game over", e);
      this.renderPlayerInfo(`Winner: ${e.detail.winner}`);
    };
  }

  static get observedAttributes() {
    return ["next-player"];
  }

  connectedCallback() {
    document
      .querySelector("game-app")
      .addEventListener("playerMoved", this.squareClickedListener);
    document
      .querySelector("game-app")
      .addEventListener("gameOver", this.gameOverListener);
  }

  disconnectedCallback() {
    document
      .querySelector("game-app")
      .removeEventListener("playerMoved", this.squareClickedListener);
    document
      .querySelector("game-app")
      .removeEventListener("gameOver", this.gameOverListener);
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.debug(
      "[GAME INFO] attributeChangedCallback",
      attributeName,
      oldValue,
      newValue
    );

    if (oldValue == newValue) {
      console.debug(
        "[GAME INFO] attributeChangedCallback - old and new are the same. no change needed for [%s]",
        attributeName
      );
      return;
    }

    if (attributeName === "winner") {
      this.winner = newValue;
    }
    if (attributeName === "nextPlayer") {
      this.nextPlayer = newValue;
    }
  }

  renderPlayerInfo(text) {
    document.querySelector("#game-info-player").innerHTML = text;
  }
}
customElements.define("game-info", TicTackToeGameInfo);
