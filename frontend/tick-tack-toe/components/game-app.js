const INIT_STATE = {
  history: [
    {
      squares: Array(9).fill(null),
    },
  ],
  stepNumber: 0,
  xIsNext: true,
  winner: undefined,
};

export default class TicTackToeGameApp extends HTMLElement {
  constructor() {
    super();

    this.appendChild(
      document.querySelector("#game-app-template").content.cloneNode(true)
    );
    //set state values
    this.state = INIT_STATE;
    this.activePlayerIndex = 0;
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
    this.playerInfoElement = document.querySelector("#game-info-player");

    // add event listeners
    this.gameOverListener = (e) => {
      this.playerInfoElement.innerHTML = `Winner: ${this.currentPlayer.name}`;
    };
    
    this.squareOccupiedListener = (e) => {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      console.log("squares", squares);

      const winner = calculateWinner(squares, this.state);
      console.log("winner", winner);

      this.handleClick(e.target, e.detail);
      if (this.state.winner)
        this.dispatchEvent(
          new CustomEvent("gameOver", {
            detail: { winner: this.state.winner },
            bubbles: true,
            composed: true,
          })
        );
    };

    // addd event handleers
    this.togglePlayer = () => {
      console.log("togglig player ", this.activePlayerIndex);

      this.activePlayerIndex = this.activePlayerIndex == 0 ? 1 : 0;
      this.currentPlayer = this.players[this.activePlayerIndex];
      this.playerInfoElement.innerHTML = `Next player: ${this.currentPlayer.name}`;
    };

    const btn = this.querySelector("#game-info-start");
    btn.addEventListener("click", (e) => {
      this.dispatchEvent(
        new CustomEvent("gameStart", {
          bubbles: true,
          composed: true,
        })
      );
      this.state = INIT_STATE;
    });
  }

  handleClick(squareElement, squareIndex) {
    console.log("handleClic", squareElement, squareIndex);
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log("squares", squares);

    const winner = calculateWinner(squares, this.state);
    console.log("winner", winner);

    if (calculateWinner(squares) || squares[squareIndex]) {
      console.log("winn!!!!", this.currentPlayer);
      this.state.winner = this.currentPlayer;
      return;
    }

    this.togglePlayer();
    squares[squareIndex] = this.state.xIsNext ? "X" : "O";

    squareElement.setAttribute("color", this.currentPlayer.color);
    squareElement.setAttribute("played", this.currentPlayer.icon);

    this.state = {
      history: [
        {
          squares,
        },
      ],
      winner: undefined,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    };
  }
  connectedCallback() {
    document.addEventListener("gameStart", this.gameStartListener);
    document.addEventListener("gameOver", this.gameOverListener);
    document.addEventListener("squareOccupied", this.squareOccupiedListener);
  }

  disconnectedCallback() {
    document.removeEventListener(this.gameStartListener);
    document.removeEventListener(this.gameOverListener);
    document.removeEventListener(this.squareOccupiedListener);
  }
}

function calculateWinner(squares, state) {
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

    console.log("calc", a, b, c, squares[a], squares[b], state);
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
customElements.define("game-app", TicTackToeGameApp);
