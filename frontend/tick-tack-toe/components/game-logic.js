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

    this.squareClickedListener = (e) => {
      console.log("[GAME LOGIC]  - squared clicked", e.srcElement);
      const targetSquare = e.srcElement;
      const index = e.srcElement.getAttribute("index");
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      squares[index] = this.state.xIsNext ? "X" : "O";

      targetSquare.removeEventListener("click", this.squareClickedListener);
      targetSquare.setAttribute("player", squares[index]);
      targetSquare.setAttribute("index", index);
      targetSquare.setAttribute(
        "color",
        this.state.xIsNext ? "yellow" : "coral"
      );
      this.state = {
        history: history.concat([
          {
            squares: squares,
          },
        ]),

        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      };

      const winner = calculateWinner(squares);
      if (winner && squares[index]) {
        const evt = new CustomEvent("gameOver", {
          bubbles: true,
          composed: true,
          detail: {
            winner,
          },
        });
        console.log("[GAME LOGIC]  -  winner calculated", evt, this);

        this.dispatchEvent(evt);

        //stop
        this.removeSquareListeners();

        return;
      }
    };
  }

  connectedCallback() {
    console.debug("[GAME LOGIC] connectedCallback ");
    this.addSquareListeners();
  }

  disconnectedCallback() {
    console.debug("[GAME LOGIC] disconnectedCallback");
    this.removeSquareListeners();
  }

  removeSquareListeners() {
    const gameSquares = document.querySelectorAll("game-square");
    gameSquares.forEach((s) => {
      s.removeEventListener("click", this.squareClickedListener);
    });
  }

  addSquareListeners() {
    const gameSquares = document.querySelectorAll("game-square");
    gameSquares.forEach((s) => {
      s.addEventListener("click", this.squareClickedListener);
    });
  }

  static get observedAttributes() {
    return ["player"];
  }

  attributeChangedCallback(attributeName, oldValue, newValue) {
    console.debug(
      "[GAME LOGIC] attributeChangedCallback",
      attributeName,
      oldValue,
      newValue
    );
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
