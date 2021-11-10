import TicTackToeGameApp from "./game-app.js";
import TickTackToeGameSquare from "./game-square.js";
import TickTackToeGameLogic from "./game-logic.js";
import TickTackToeGameInfo from "./game-info.js";

// window.addEventListener("click", function (e) {
//   if (e.target.tagName === "A" && e.target.getAttribute("href") === "#") {
//     e.preventDefault();
//   }
// });

window.onerror = function (message, source, line, col, error) {
  var text = error
    ? error.stack || error
    : `${message} (at ${source}:${line}:${col})`;
  errors.textContent += text + "\n";
  errors.style.display = "";
};

console.error = (function (old) {
  return function error() {
    errors.textContent +=
      Array.prototype.slice.call(arguments).join(" ") + "\n";
    errors.style.display = "";
    old.apply(this, arguments);
  };
})(console.error);
