export default class TicTackToeGameApp extends HTMLElement {
  constructor() {
    super();

    this.appendChild(
      document.querySelector("#game-app-template").content.cloneNode(true)
    );

    // add event listeners
    this.gameOverListener = (e) => {
      document.querySelector(
        "#game-info-player"
      ).innerHTML = `Winner: ${e.detail?.player.name}`;
    };

    this.gameStartListener = (e) => {
      document.querySelector(
        "#game-info-player"
      ).innerHTML = `Make starting move...`;
    };

    this.playerMovedListener = (e) => {
      console.log("[GAME APP] player moved", e);
      document.querySelector(
        "#game-info-player"
      ).innerHTML = `Next Player: ${e.detail?.player.name}`;
    };

    const btn = this.querySelector("#game-info-start");
    btn.addEventListener("click", (e) => {
      this.dispatchEvent(
        new CustomEvent("newGameRequest", {
          bubbles: true,
          composed: true,
        })
      );
    });
  }

  connectedCallback() {
    document.addEventListener("newGameRequest", this.gameStartListener);
    document.addEventListener("gameOver", this.gameOverListener);
    document.addEventListener("playerMoved", this.playerMovedListener);
  }

  disconnectedCallback() {
    document
      .querySelector("#game-info-start")
      .removeEventListener("click", this.gameStartListener);
  }
}
customElements.define("game-app", TicTackToeGameApp);
