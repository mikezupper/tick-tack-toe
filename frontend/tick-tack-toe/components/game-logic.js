const INIT_STATE = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
};

export default class TicTackToeGameLogic extends HTMLElement {
  constructor() {
    super();
    this.state = INIT_STATE;
    this.players = [
      {
        name: "Player 1",
        icon: "X",
        color: "yellow",
      },
      {
        name: "Player 2",
        icon: "O",
        color: "coral",
      },
    ];

    this.currentPlayer = 1;

    this.squareOccupiedListener = (e) => {
      const currentPlayer = this.players[this.currentPlayer];
      const i = e.detail;
      console.log("[LOGIC] square claimed", i);
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      console.log("[LOGIC] squares", squares);
      console.log("[LOGIC] current", current);

      squares[i] = this.state.xIsNext ? "X" : "O";
      console.log("is xNext", this.state.xIsNext, currentPlayer);
      this.state = {
        history: history.concat([
          {
            squares: squares,
          },
        ]),

        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      };

      const newEvent = new CustomEvent("playerMoved", {
        detail: {
          player: currentPlayer,
          squareId: e.detail,
        },
        bubbles: true,
        composed: true,
      });
      document.dispatchEvent(newEvent);
      console.log("[LOGIC] new state checking winner !!!!", this.state);
      const winner = calculateWinner(squares);

      console.log("is winner?", winner, squares[i]);

      if (winner) {
        console.log("winner");
        const newEvent = new CustomEvent("gameOver", {
          detail: {
            player: this.players[this.currentPlayer],
          },
          bubbles: true,
          composed: true,
        });
        document.dispatchEvent(newEvent);
        return;
      }

      this.currentPlayer = this.currentPlayer == 0 ? 1 : 0;
    };

    this.newGameListener = (e) => {
      console.log("[LOGIC] new game", e);
      this.state = INIT_STATE;
      const newEvent = new CustomEvent("gameStarted", {
        detail: {
          player: this.players[this.currentPlayer],
        },
        bubbles: true,
        composed: true,
      });

      document.dispatchEvent(newEvent);
    };
  }

  connectedCallback() {
    const app = document.querySelector("game-app");
    app.addEventListener("squareOccupied", this.squareOccupiedListener);
    app.addEventListener("newGameRequest", this.newGameListener);
  }

  disconnectedCallback() {
    document.removeEventListener("squareOccupied", this.squareOccupiedListener);
  }

  static get observedAttributes() {
    return ["player"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.log("logic player attr change", attributeName, oldValue, newValue);
    if (attributeName === "player") {
      this.player = newValue;
    }
  }
}
customElements.define("game-logic", TicTackToeGameLogic);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
