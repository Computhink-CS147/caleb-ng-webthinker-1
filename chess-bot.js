const BOARD_SIZE = 8;
const SQUARE_SIZE = 80;
const BOARD_PIXELS = BOARD_SIZE * SQUARE_SIZE;
const PIECE_VALUES = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
const PIECE_GLYPHS = {
  w: { k: "♔", q: "♕", r: "♖", b: "♗", n: "♘", p: "♙" },
  b: { k: "♚", q: "♛", r: "♜", b: "♝", n: "♞", p: "♟" },
};
const PROMOTION_TYPES = ["q", "r", "b", "n"];
const PROMOTION_NAMES = ["Queen", "Rook", "Bishop", "Knight"];
const SEARCH_TIMEOUT = Symbol("search timeout");

let chessGame;
let gameStarted = false;
let gameFinished = false;
let botThinking = false;
let difficulty = "beginner";
let selectedSquare = null;
let selectedMoves = [];
let promotionMoves = null;
let lastMove = null;
let gameVersion = 0;
let statusElement;

function setup() {
  new Canvas(BOARD_PIXELS, BOARD_PIXELS);
  document.getElementById("game").appendChild(document.querySelector("canvas"));
  textFont("Georgia");
  statusElement = document.getElementById("game-status");

  document.getElementById("start-button").addEventListener("click", showDifficultyPicker);
  document.getElementById("new-game-button").addEventListener("click", handleNewGame);
  document.querySelectorAll("[data-difficulty]").forEach((button) => {
    button.addEventListener("click", () => startGame(button.dataset.difficulty));
  });
}

function update() {
  background("#171923");
  drawBoard();

  if (mouse.presses()) {
    handleBoardClick(mouse.x, mouse.y);
  }
}

function keyPressed() {
  if (
    (key === "r" || key === "R") &&
    gameStarted &&
    !gameFinished &&
    window.confirm("Resign this game?")
  ) {
    finishGame("You resigned. The bot wins.");
  }
}

function showDifficultyPicker() {
  document.getElementById("start-button").hidden = true;
  document.getElementById("difficulty-picker").hidden = false;
  setStatus("Choose a bot difficulty to begin.");
}

function startGame(chosenDifficulty) {
  gameVersion += 1;
  chessGame = new Chess();
  difficulty = chosenDifficulty;
  gameStarted = true;
  gameFinished = false;
  botThinking = false;
  selectedSquare = null;
  selectedMoves = [];
  promotionMoves = null;
  lastMove = null;

  document.getElementById("difficulty-picker").hidden = true;
  document.getElementById("start-button").hidden = true;
  const newGameButton = document.getElementById("new-game-button");
  newGameButton.hidden = false;
  newGameButton.textContent = "New Game";
  setStatus(`Your turn (White) · ${capitalize(difficulty)} bot`);
}

function handleNewGame() {
  if (
    gameStarted &&
    !gameFinished &&
    !window.confirm("Start a new game? The current game will be lost.")
  ) {
    return;
  }
  gameStarted = false;
  gameFinished = false;
  botThinking = false;
  gameVersion += 1;
  selectedSquare = null;
  selectedMoves = [];
  promotionMoves = null;
  document.getElementById("new-game-button").hidden = true;
  document.getElementById("start-button").hidden = false;
  document.getElementById("difficulty-picker").hidden = true;
  setStatus("Start a game and choose a difficulty.");
}

function drawBoard() {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const square = `${String.fromCharCode(97 + col)}${8 - row}`;
      const x = col * SQUARE_SIZE;
      const y = row * SQUARE_SIZE;
      const isLight = (row + col) % 2 === 0;
      noStroke();
      fill(isLight ? "#f0eee8" : "#596273");
      rect(x, y, SQUARE_SIZE, SQUARE_SIZE);

      if (lastMove && (square === lastMove.from || square === lastMove.to)) {
        fill(232, 197, 71, 105);
        rect(x, y, SQUARE_SIZE, SQUARE_SIZE);
      }

      if (selectedSquare === square) {
        fill(232, 197, 71, 150);
        rect(x, y, SQUARE_SIZE, SQUARE_SIZE);
      }

      if (selectedMoves.some((move) => move.to === square)) {
        fill(36, 166, 106, 175);
        circle(x + SQUARE_SIZE / 2, y + SQUARE_SIZE / 2, SQUARE_SIZE * 0.22);
      }

      const piece = chessGame ? chessGame.get(square) : null;
      if (piece) drawPiece(piece, x + SQUARE_SIZE / 2, y + SQUARE_SIZE / 2);

      fill(isLight ? "#667085" : "#e4e6eb");
      noStroke();
      textAlign(LEFT, TOP);
      textSize(11);
      if (col === 0) text(String(8 - row), x + 4, y + 3);
      if (row === 7) text(String.fromCharCode(97 + col), x + SQUARE_SIZE - 12, y + SQUARE_SIZE - 15);
    }
  }

  drawCheckedKing();
  if (promotionMoves) drawPromotionPicker();
}

function drawPiece(piece, centerX, centerY) {
  textAlign(CENTER, CENTER);
  textSize(62);
  fill(piece.color === "w" ? "#fffdf7" : "#171923");
  stroke(piece.color === "w" ? "#242936" : "#f0eee8");
  strokeWeight(1.5);
  text(PIECE_GLYPHS[piece.color][piece.type], centerX, centerY + 1);
  noStroke();
}

function drawCheckedKing() {
  if (!chessGame || !chessGame.in_check()) return;
  const board = chessGame.board();
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (piece && piece.type === "k" && piece.color === chessGame.turn()) {
        noFill();
        stroke("#ff4d4d");
        strokeWeight(4);
        rect(
          col * SQUARE_SIZE + 3,
          row * SQUARE_SIZE + 3,
          SQUARE_SIZE - 6,
          SQUARE_SIZE - 6,
          8
        );
        noStroke();
        return;
      }
    }
  }
}

function drawPromotionPicker() {
  fill(0, 0, 0, 205);
  noStroke();
  rect(0, 0, BOARD_PIXELS, BOARD_PIXELS);
  fill("#fffaf0");
  textAlign(CENTER, CENTER);
  textSize(22);
  text("Choose a promotion", BOARD_PIXELS / 2, 255);

  const cardWidth = 100;
  const gap = 12;
  const totalWidth = cardWidth * 4 + gap * 3;
  const startX = (BOARD_PIXELS - totalWidth) / 2;
  for (let index = 0; index < PROMOTION_TYPES.length; index += 1) {
    const x = startX + index * (cardWidth + gap);
    fill("#f0eee8");
    stroke("#7b8494");
    strokeWeight(2);
    rect(x, 290, cardWidth, 120, 8);
    noStroke();
    fill("#171923");
    textSize(48);
    text(PIECE_GLYPHS.w[PROMOTION_TYPES[index]], x + cardWidth / 2, 337);
    fill("#171923");
    textSize(13);
    text(PROMOTION_NAMES[index], x + cardWidth / 2, 387);
  }
}

function handleBoardClick(mouseXPosition, mouseYPosition) {
  if (!gameStarted || gameFinished || botThinking) return;

  if (promotionMoves) {
    choosePromotion(mouseXPosition, mouseYPosition);
    return;
  }

  const col = Math.floor(mouseXPosition / SQUARE_SIZE);
  const row = Math.floor(mouseYPosition / SQUARE_SIZE);
  if (row < 0 || row >= BOARD_SIZE || col < 0 || col >= BOARD_SIZE) return;
  const square = `${String.fromCharCode(97 + col)}${8 - row}`;

  if (chessGame.turn() !== "w") return;
  const chosenMove = selectedMoves.find((move) => move.to === square);
  if (selectedSquare && chosenMove) {
    const movesToSquare = selectedMoves.filter((move) => move.to === square);
    if (movesToSquare.some((move) => move.promotion)) {
      promotionMoves = movesToSquare;
      return;
    }
    playHumanMove(chosenMove);
    return;
  }

  const piece = chessGame.get(square);
  if (piece && piece.color === "w") {
    selectedSquare = square;
    selectedMoves = chessGame.moves({ square, verbose: true });
    return;
  }

  selectedSquare = null;
  selectedMoves = [];
}

function choosePromotion(mouseXPosition, mouseYPosition) {
  if (mouseYPosition < 290 || mouseYPosition > 410) return;
  const cardWidth = 100;
  const gap = 12;
  const startX = (BOARD_PIXELS - (cardWidth * 4 + gap * 3)) / 2;
  const index = Math.floor((mouseXPosition - startX) / (cardWidth + gap));
  if (index < 0 || index >= PROMOTION_TYPES.length) return;
  const cardX = startX + index * (cardWidth + gap);
  if (mouseXPosition > cardX + cardWidth) return;
  const move = promotionMoves.find(
    (candidate) => candidate.promotion === PROMOTION_TYPES[index]
  );
  if (!move) return;
  promotionMoves = null;
  playHumanMove(move);
}

function playHumanMove(move) {
  const playedMove = chessGame.move(moveParameters(move));
  if (!playedMove) {
    selectedSquare = null;
    selectedMoves = [];
    setStatus("That move is not legal. Select one of your pieces.");
    return;
  }

  lastMove = playedMove;
  selectedSquare = null;
  selectedMoves = [];
  if (updateGameResult()) return;

  botThinking = true;
  setStatus(`Bot is thinking… · ${capitalize(difficulty)}`);
  const versionAtStart = gameVersion;
  window.setTimeout(() => playBotTurn(versionAtStart), 40);
}

async function playBotTurn(versionAtStart) {
  let move;
  try {
    if (difficulty === "beginner") {
      move = chooseBeginnerMove(chessGame);
    } else if (difficulty === "moderate") {
      move = chooseModerateMove(chessGame);
    } else {
      move = await chooseAdvancedMove(chessGame);
    }
  } catch (error) {
    console.error("The chess bot could not choose a move:", error);
    if (versionAtStart === gameVersion && !gameFinished) {
      botThinking = false;
      setStatus("The bot could not choose a move. Please start a new game.");
    }
    return;
  }

  if (versionAtStart !== gameVersion || gameFinished || !gameStarted) return;
  if (!move) {
    botThinking = false;
    updateGameResult();
    return;
  }

  const playedMove = chessGame.move(moveParameters(move));
  botThinking = false;
  if (!playedMove) {
    console.error("The chess bot selected a move rejected by chess.js.", move);
    setStatus("The bot's move was rejected. Please start a new game.");
    return;
  }

  lastMove = playedMove;
  if (!updateGameResult()) {
    setStatus(chessGame.in_check()
      ? "Your turn (White) · Check!"
      : `Your turn (White) · ${capitalize(difficulty)} bot`);
  }
}

function chooseBeginnerMove(game) {
  const moves = game.moves({ verbose: true });
  return moves[Math.floor(Math.random() * moves.length)] || null;
}

function chooseModerateMove(game) {
  const moves = game.moves({ verbose: true });
  if (moves.length === 0) return null;
  let bestMove = moves[0];
  let bestScore = -Infinity;

  for (const move of moves) {
    const position = copyPositionAfterMove(game, move);
    let score = evaluatePosition(position) + moveOrderingScore(move) * 0.2;
    if (position.in_check()) score += 35;
    score += Math.random() * 4;
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

async function chooseAdvancedMove(game) {
  const moves = orderMoves(game.moves({ verbose: true }));
  if (moves.length < 2) return moves[0] || null;

  let bestMove = chooseModerateMove(game);
  const deadline = Date.now() + 1200;

  for (let depth = 1; depth <= 3; depth += 1) {
    let depthBestMove = null;
    let depthBestScore = -Infinity;
    let alpha = -Infinity;
    let completed = true;

    try {
      for (const move of moves) {
        ensureSearchTime(deadline);
        const position = copyPositionAfterMove(game, move);
        const score = await minimax(position, depth - 1, alpha, Infinity, deadline);
        if (score > depthBestScore) {
          depthBestScore = score;
          depthBestMove = move;
        }
        alpha = Math.max(alpha, score);
      }
    } catch (error) {
      if (error !== SEARCH_TIMEOUT) throw error;
      completed = false;
    }

    if (completed && depthBestMove) bestMove = depthBestMove;
    if (!completed) break;
  }
  return bestMove;
}

async function minimax(game, depth, alpha, beta, deadline) {
  ensureSearchTime(deadline);
  if (game.in_checkmate()) return game.turn() === "b" ? -100000 : 100000;
  if (game.game_over()) return 0;
  if (depth === 0) return evaluatePosition(game);

  const moves = orderMoves(game.moves({ verbose: true }));
  const maximizing = game.turn() === "b";
  let bestScore = maximizing ? -Infinity : Infinity;

  for (let index = 0; index < moves.length; index += 1) {
    if (index > 0 && index % 12 === 0) {
      await new Promise((resolve) => window.setTimeout(resolve, 0));
      ensureSearchTime(deadline);
    }
    const position = copyPositionAfterMove(game, moves[index]);
    const score = await minimax(position, depth - 1, alpha, beta, deadline);
    if (maximizing) {
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, bestScore);
    } else {
      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, bestScore);
    }
    if (beta <= alpha) break;
  }
  return bestScore;
}

function ensureSearchTime(deadline) {
  if (Date.now() >= deadline) throw SEARCH_TIMEOUT;
}

function copyPositionAfterMove(game, move) {
  const position = new Chess(game.fen());
  const playedMove = position.move(moveParameters(move));
  if (!playedMove) {
    throw new Error(`Could not apply generated move ${move.from}-${move.to}.`);
  }
  return position;
}

function moveParameters(move) {
  const parameters = { from: move.from, to: move.to };
  if (move.promotion) parameters.promotion = move.promotion;
  return parameters;
}

function orderMoves(moves) {
  return moves.slice().sort((first, second) =>
    moveOrderingScore(second) - moveOrderingScore(first)
  );
}

function moveOrderingScore(move) {
  let score = 0;
  if (move.captured) {
    score += 10 * PIECE_VALUES[move.captured] - PIECE_VALUES[move.piece];
  }
  if (move.promotion) score += PIECE_VALUES[move.promotion];
  if (move.flags && move.flags.includes("e")) score += PIECE_VALUES.p * 10;
  return score;
}

function evaluatePosition(game) {
  if (game.in_checkmate()) return game.turn() === "b" ? -100000 : 100000;
  if (game.game_over()) return 0;

  let score = 0;
  const board = game.board();
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (!piece) continue;
      const sign = piece.color === "b" ? 1 : -1;
      score += sign * PIECE_VALUES[piece.type];

      const centerDistance = Math.abs(3.5 - row) + Math.abs(3.5 - col);
      if (piece.type === "n" || piece.type === "b") {
        score += sign * (7 - centerDistance) * 4;
      } else if (piece.type === "p") {
        const advance = piece.color === "b" ? row - 1 : 6 - row;
        score += sign * advance * 5;
      }
    }
  }
  return score;
}

function updateGameResult() {
  if (!chessGame.game_over()) return false;
  if (chessGame.in_checkmate()) {
    finishGame(chessGame.turn() === "w"
      ? "Checkmate — the bot wins."
      : "Checkmate — you win!");
  } else if (chessGame.in_stalemate()) {
    finishGame("Draw by stalemate.");
  } else if (chessGame.in_threefold_repetition()) {
    finishGame("Draw by threefold repetition.");
  } else if (chessGame.insufficient_material()) {
    finishGame("Draw by insufficient material.");
  } else {
    finishGame("Draw by the 50-move rule.");
  }
  return true;
}

function finishGame(message) {
  gameFinished = true;
  botThinking = false;
  gameVersion += 1;
  selectedSquare = null;
  selectedMoves = [];
  promotionMoves = null;
  setStatus(message);
  document.getElementById("new-game-button").textContent = "Play Again";
}

function setStatus(message) {
  if (statusElement) statusElement.textContent = message;
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}
