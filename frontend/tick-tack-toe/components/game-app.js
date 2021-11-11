const styleTemplate = document.createElement("template");
styleTemplate.innerHTML = `
<style>
body {
  font: 14px "Century Gothic", Futura, sans-serif;
  margin: 20px;
}

ol,
ul {
  padding-left: 30px;
}

.board-row:after {
  clear: both;
  content: "";
  display: table;
}

.status {
  margin-bottom: 10px;
}

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

.kbd-navigation .square:focus {
  background: #ddd;
}

.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}

.errors {
  background: #c00;
  color: #fff;
  display: none;
  margin: -20px -20px 20px;
  padding: 20px;
  white-space: pre-wrap;
}
</style>`;

export default class TicTackToeGameApp extends HTMLElement {
  constructor() {
    super();
    //this.attachShadow({ mode: "open" });
    this.appendChild(styleTemplate.content.cloneNode(true));
    this.appendChild(document.querySelector("#game-app-template").content.cloneNode(true));
    this.gameLogic = document.createElement("game-logic");
    this.appendChild(this.gameLogic);
  }
}
customElements.define("game-app", TicTackToeGameApp);
