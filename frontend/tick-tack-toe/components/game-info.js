const gameInfoTemplate = document.querySelector("#game-info-template");

export default class TicTackToeGameInfo extends HTMLElement {
  constructor() {
    super();
    //this.attachShadow({ mode: "open" });
    this.appendChild(gameInfoTemplate.content.cloneNode(true));
    this.squareClickedListener = (e) => {
      console.log("[GAME INFO]  - squared clicked", e.srcElement.player);
      const nextPlayer = e.srcElement.player == "O" ? "X" : "O";
      this.setAttribute("next-player", nextPlayer);
      document.querySelector(
        "#game-info-player"
      ).innerHTML = `Next player: ${nextPlayer}`;
    };
    this.gameOverListener = (e) => {
      console.log("[GAME INFO]  - game over", e);
      document.querySelector(
        "#game-info-player"
      ).innerHTML = `Winner: ${e.detail.winner}`;
    };
  }

  static get observedAttributes() {
    return ["next-player"];
  }

  connectedCallback() {
    document.addEventListener("gameOver", this.gameOverListener);
    this.addEventListener("click", this.squareClickedListener);
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
}
customElements.define("game-info", TicTackToeGameInfo);
