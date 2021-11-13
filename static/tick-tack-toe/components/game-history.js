const gameHistoryTemplate = document.querySelector("#game-history-template");

export default class TicTackToeGameHistory extends HTMLElement {
  constructor() {
    super();
    //this.attachShadow({ mode: "open" });
    this.appendChild(gameHistoryTemplate.content.cloneNode(true));
    this.gameLogic = document.querySelector("game-logic");
    this.gameInfo = document.querySelector("#game-info-start");

    this.startOverListener = (e) => {
      console.log("[GAME HISTORY]  - start button clicked", e);
      const evt = new CustomEvent("gameReset", {
        bubbles: true,
        composed: true,
        detail: {
          move: 0,
        },
      });
      this.dispatchEvent(evt);

      const lis = document.querySelectorAll("game-history ol li");
      lis.forEach((c) => {
        if (c.getAttribute("move")) {
          c.remove();
        }
      });
    };

    this.playerMovedListener = (e) => {
      console.log("[GAME HISTORY]  - player moved", e);
      const { move } = e.detail;
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.onclick = (e) => {
        const lis = document.querySelectorAll("game-history ol li");
        lis.forEach((c) => {
          if (parseInt(c.getAttribute("move")) > move) {
            c.remove();
          }
        });

        const x = new CustomEvent("gameReset", {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            move,
          },
        });
        console.log("dispatch rset event", x);

        document.querySelector("game-logic").dispatchEvent(x);
      };

      btn.innerText = `Go to move ${move}`;
      li.appendChild(btn);
      li.setAttribute("move", move);
      document.querySelector("game-history ol").appendChild(li);
    };
  }

  connectedCallback() {
    this.gameLogic.addEventListener("playerMoved", this.playerMovedListener);
    this.gameInfo.addEventListener("click", this.startOverListener);
  }

  disconnectedCallback() {
    this.gameLogic.removeEventListener("playerMoved", this.playerMovedListener);
    this.gameInfo.removeEventListener("click", this.startOverListener);
  }
}
customElements.define("game-history", TicTackToeGameHistory);
