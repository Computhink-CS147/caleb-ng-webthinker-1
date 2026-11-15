const BOARD_SIZE = 8;
const CANVAS_SIZE = 720;
const BOARD_LEFT = 40;
const BOARD_TOP = 56;
const SQUARE_SIZE = 80;
const BOARD_PIXELS = BOARD_SIZE * SQUARE_SIZE;

const PIECE_SYMBOLS = {
  red: {
    king: "♔",
    queen: "♕",
    rook: "♖",
    bishop: "♗",
    knight: "♘",
    pawn: "♙",
  },
  blue: {
    king: "♚",
    queen: "♛",
    rook: "♜",
    bishop: "♝",
    knight: "♞",
    pawn: "♟",
  },
};

const PROMOTION_TYPES = ["queen", "rook", "bishop", "knight"];

let chessBoard;
let currentTurn;
let selectedSquare;
let availableMoves;
let enPassantSquare;
let gameResult;
let promotionChoice;
let statusMessage;

function setup() {
  new Canvas(CANVAS_SIZE, CANVAS_SIZE + 40);
  textFont("Georgia");
  startNewGame();
}

function update() {
  background("#171923");
  drawGame();

  if (!gameResult && !promotionChoice && kb.presses("r")) {
    resignGame();
  }

  if (mouse.presses()) {
    handleClick(mouse.x, mouse.y);
  }
}

function startNewGame() {
  chessBoard = createStartingBoard();
  currentTurn = "red";
  selectedSquare = null;
  availableMoves = [];
  enPassantSquare = null;
  gameResult = null;
  promotionChoice = null;
  statusMessage = "Red to move";
}

function createStartingBoard() {
  const board = Array.from({ length: BOARD_SIZE }, () =>
    Array(BOARD_SIZE).fill(null)
  );
  const backRank = [
    "rook",
    "knight",
    "bishop",
    "queen",
    "king",
    "bishop",
    "knight",
    "rook",
  ];

  for (let col = 0; col < BOARD_SIZE; col += 1) {
    board[0][col] = { type: backRank[col], side: "blue", hasMoved: false };
    board[1][col] = { type: "pawn", side: "blue", hasMoved: false };
    board[6][col] = { type: "pawn", side: "red", hasMoved: false };
    board[7][col] = { type: backRank[col], side: "red", hasMoved: false };
  }

  return board;
}

function drawGame() {
  drawHeader();
  drawBoard();
  drawPromotionChoice();
  drawFooter();
}

function drawHeader() {
  noStroke();
  fill("#f7f4ed");
  textAlign(CENTER, CENTER);
  textSize(22);
  text("RED vs BLUE CHESS", CANVAS_SIZE / 2, 22);

  textSize(17);
  if (gameResult) {
    fill("#ffd166");
    text(gameResult, CANVAS_SIZE / 2, 46);
  } else {
    const sideText = currentTurn === "red" ? "RED'S TURN" : "BLUE'S TURN";
    fill(currentTurn === "red" ? "#ff6868" : "#62a8ff");
    text(sideText, CANVAS_SIZE / 2, 46);
  }
}

function drawBoard() {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const x = BOARD_LEFT + col * SQUARE_SIZE;
      const y = BOARD_TOP + row * SQUARE_SIZE;
      fill((row + col) % 2 === 0 ? "#f0eee8" : "#394150");
      noStroke();
      rect(x, y, SQUARE_SIZE, SQUARE_SIZE);

      if (isSelected(row, col)) {
        fill("#e8c547");
        rect(x, y, SQUARE_SIZE, SQUARE_SIZE);
      }

      if (isLegalDestination(row, col)) {
        fill("#62c98b");
        circle(x + SQUARE_SIZE / 2, y + SQUARE_SIZE / 2, SQUARE_SIZE * 0.22);
      }

      const piece = chessBoard[row][col];
      if (piece) {
        drawPiece(piece, x + SQUARE_SIZE / 2, y + SQUARE_SIZE / 2);
      }

      drawCoordinates(row, col, x, y);
    }
  }

  drawCheckedKing();
}

function drawPiece(piece, centerX, centerY) {
  textAlign(CENTER, CENTER);
  textSize(58);
  fill(piece.side === "red" ? "#d83a46" : "#1767c2");
  stroke("#111827");
  strokeWeight(1.5);
  text(PIECE_SYMBOLS[piece.side][piece.type], centerX, centerY + 1);
  noStroke();
}

function drawCoordinates(row, col, x, y) {
  noStroke();
  fill((row + col) % 2 === 0 ? "#667085" : "#d9dce2");
  textAlign(LEFT, TOP);
  textSize(11);
  if (col === 0) text(String(8 - row), x + 4, y + 3);
  if (row === 7) text(String.fromCharCode(97 + col), x + SQUARE_SIZE - 12, y + SQUARE_SIZE - 15);
}

function drawCheckedKing() {
  const kingSquare = findKing(chessBoard, currentTurn);
  if (kingSquare && isKingInCheck(chessBoard, currentTurn)) {
    noFill();
    stroke("#ff3b30");
    strokeWeight(4);
    rect(
      BOARD_LEFT + kingSquare.col * SQUARE_SIZE + 3,
      BOARD_TOP + kingSquare.row * SQUARE_SIZE + 3,
      SQUARE_SIZE - 6,
      SQUARE_SIZE - 6,
      8
    );
    noStroke();
  }
}

function drawPromotionChoice() {
  if (!promotionChoice) return;

  fill(0, 0, 0, 190);
  rect(BOARD_LEFT, BOARD_TOP, BOARD_PIXELS, BOARD_PIXELS);
  fill("#fffaf0");
  textAlign(CENTER, CENTER);
  textSize(23);
  text("Choose a piece to promote to", CANVAS_SIZE / 2, 300);

  for (let index = 0; index < PROMOTION_TYPES.length; index += 1) {
    const x = 132 + index * 116;
    const pieceType = PROMOTION_TYPES[index];
    fill("#f0eee8");
    stroke("#7b8494");
    strokeWeight(2);
    rect(x, 336, 96, 96, 10);
    noStroke();
    fill(promotionChoice.side === "red" ? "#d83a46" : "#1767c2");
    textSize(58);
    text(PIECE_SYMBOLS[promotionChoice.side][pieceType], x + 48, 384);
    fill("#f7f4ed");
    textSize(13);
    text(`${index + 1}: ${pieceType}`, x + 48, 449);
  }
}

function drawFooter() {
  noStroke();
  fill("#c7cbd4");
  textAlign(CENTER, CENTER);
  textSize(14);

  const footer = gameResult
    ? "Press the New Game button to play again."
    : promotionChoice
      ? "Click a piece or press 1-4 to choose."
      : statusMessage || "Click a piece, then click a highlighted square. Press R to resign.";
  text(footer, CANVAS_SIZE / 2, BOARD_TOP + BOARD_PIXELS + 22);
}

function handleClick(mouseXPosition, mouseYPosition) {
  if (gameResult) return;

  if (promotionChoice) {
    handlePromotionClick(mouseXPosition, mouseYPosition);
    return;
  }

  const col = Math.floor((mouseXPosition - BOARD_LEFT) / SQUARE_SIZE);
  const row = Math.floor((mouseYPosition - BOARD_TOP) / SQUARE_SIZE);
  if (!isInsideBoard(row, col)) return;

  const chosenMove = availableMoves.find(
    (move) => move.to.row === row && move.to.col === col
  );
  if (selectedSquare && chosenMove) {
    playMove(chosenMove);
    return;
  }

  const piece = chessBoard[row][col];
  if (piece && piece.side === currentTurn) {
    selectedSquare = { row, col };
    availableMoves = getLegalMoves(chessBoard, row, col);
    statusMessage = availableMoves.length
      ? "Choose a highlighted square."
      : "That piece has no legal moves.";
  } else {
    selectedSquare = null;
    availableMoves = [];
    statusMessage = "Select one of your pieces.";
  }
}

function handlePromotionClick(mouseXPosition, mouseYPosition) {
  if (mouseYPosition < 336 || mouseYPosition > 432) return;
  const index = Math.floor((mouseXPosition - 132) / 116);
  if (index >= 0 && index < PROMOTION_TYPES.length) {
    finishPromotion(PROMOTION_TYPES[index]);
  }
}

function playMove(move) {
  const piece = chessBoard[move.from.row][move.from.col];
  if (!piece) return;

  if (piece.type === "pawn" && (move.to.row === 0 || move.to.row === 7)) {
    promotionChoice = { move, side: piece.side };
    statusMessage = "Choose a piece to promote to.";
    return;
  }

  applyMove(chessBoard, move);
  finishTurn(move);
}

function finishPromotion(pieceType) {
  if (!promotionChoice) return;
  const move = promotionChoice.move;
  applyMove(chessBoard, move);
  chessBoard[move.to.row][move.to.col].type = pieceType;
  promotionChoice = null;
  finishTurn(move);
}

function finishTurn(move) {
  currentTurn = oppositeSide(currentTurn);
  selectedSquare = null;
  availableMoves = [];
  statusMessage = currentTurn === "red" ? "Red to move" : "Blue to move";

  const legalMoves = getAllLegalMoves(chessBoard, currentTurn);
  if (legalMoves.length === 0) {
    if (isKingInCheck(chessBoard, currentTurn)) {
      const winner = currentTurn === "red" ? "Blue" : "Red";
      gameResult = `CHECKMATE — ${winner} wins!`;
    } else {
      gameResult = "STALEMATE — the game is a draw.";
    }
    return;
  }

  if (isKingInCheck(chessBoard, currentTurn)) {
    statusMessage = `${currentTurn === "red" ? "Red" : "Blue"} is in check!`;
  } else if (move) {
    statusMessage = `${currentTurn === "red" ? "Red" : "Blue"} to move`;
  }
}

function resignGame() {
  const winner = currentTurn === "red" ? "Blue" : "Red";
  gameResult = `${currentTurn === "red" ? "Red" : "Blue"} resigned — ${winner} wins!`;
  selectedSquare = null;
  availableMoves = [];
  statusMessage = "Game over.";
}

function getLegalMoves(board, row, col) {
  const piece = board[row][col];
  if (!piece) return [];

  return getPseudoMoves(board, row, col)
    .filter((move) => {
      const simulatedBoard = copyBoard(board);
      applyMove(simulatedBoard, move);
      return !isKingInCheck(simulatedBoard, piece.side);
    });
}

function getAllLegalMoves(board, side) {
  const moves = [];
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (piece && piece.side === side) {
        moves.push(...getLegalMoves(board, row, col));
      }
    }
  }
  return moves;
}

function getPseudoMoves(board, row, col) {
  const piece = board[row][col];
  if (!piece) return [];

  const moves = [];
  const addMove = (toRow, toCol, extra = {}) => {
    if (!isInsideBoard(toRow, toCol)) return false;
    const target = board[toRow][toCol];
    if (target && (target.side === piece.side || target.type === "king")) return false;
    moves.push({ from: { row, col }, to: { row: toRow, col: toCol }, ...extra });
    return !target;
  };

  if (piece.type === "pawn") {
    const direction = piece.side === "red" ? -1 : 1;
    const startingRow = piece.side === "red" ? 6 : 1;
    const oneStep = row + direction;
    if (isInsideBoard(oneStep, col) && !board[oneStep][col]) {
      addMove(oneStep, col);
      const twoSteps = row + direction * 2;
      if (row === startingRow && !board[twoSteps][col]) {
        addMove(twoSteps, col);
      }
    }

    for (const deltaCol of [-1, 1]) {
      const targetRow = row + direction;
      const targetCol = col + deltaCol;
      if (!isInsideBoard(targetRow, targetCol)) continue;
      const target = board[targetRow][targetCol];
      if (target && target.side !== piece.side && target.type !== "king") {
        addMove(targetRow, targetCol);
      } else if (
        enPassantSquare &&
        enPassantSquare.row === targetRow &&
        enPassantSquare.col === targetCol
      ) {
        moves.push({
          from: { row, col },
          to: { row: targetRow, col: targetCol },
          enPassant: true,
        });
      }
    }
    return moves;
  }

  if (piece.type === "knight") {
    for (const [rowOffset, colOffset] of [
      [-2, -1], [-2, 1], [-1, -2], [-1, 2],
      [1, -2], [1, 2], [2, -1], [2, 1],
    ]) {
      addMove(row + rowOffset, col + colOffset);
    }
    return moves;
  }

  const directions = [];
  if (piece.type === "bishop" || piece.type === "queen") {
    directions.push([-1, -1], [-1, 1], [1, -1], [1, 1]);
  }
  if (piece.type === "rook" || piece.type === "queen") {
    directions.push([-1, 0], [1, 0], [0, -1], [0, 1]);
  }

  if (piece.type === "king") {
    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
      for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
        if (rowOffset !== 0 || colOffset !== 0) {
          addMove(row + rowOffset, col + colOffset);
        }
      }
    }
    addCastlingMoves(board, row, col, piece, moves);
    return moves;
  }

  for (const [rowOffset, colOffset] of directions) {
    let targetRow = row + rowOffset;
    let targetCol = col + colOffset;
    while (addMove(targetRow, targetCol)) {
      targetRow += rowOffset;
      targetCol += colOffset;
    }
  }
  return moves;
}

function addCastlingMoves(board, row, col, king, moves) {
  const homeRow = king.side === "red" ? 7 : 0;
  if (row !== homeRow || col !== 4 || king.hasMoved || isKingInCheck(board, king.side)) {
    return;
  }

  for (const side of ["king", "queen"]) {
    const rookCol = side === "king" ? 7 : 0;
    const rook = board[homeRow][rookCol];
    if (!rook || rook.type !== "rook" || rook.side !== king.side || rook.hasMoved) continue;

    const emptyCols = side === "king" ? [5, 6] : [1, 2, 3];
    if (emptyCols.some((emptyCol) => board[homeRow][emptyCol])) continue;

    const transitCols = side === "king" ? [5, 6] : [3, 2];
    if (transitCols.some((transitCol) => isSquareAttacked(
      board,
      homeRow,
      transitCol,
      oppositeSide(king.side)
    ))) {
      continue;
    }

    moves.push({
      from: { row, col },
      to: { row: homeRow, col: side === "king" ? 6 : 2 },
      castle: side,
    });
  }
}

function applyMove(board, move) {
  const piece = board[move.from.row][move.from.col];
  if (!piece) return;

  if (move.enPassant) {
    const direction = piece.side === "red" ? -1 : 1;
    board[move.to.row - direction][move.to.col] = null;
  }

  if (move.castle) {
    const rookFromCol = move.castle === "king" ? 7 : 0;
    const rookToCol = move.castle === "king" ? 5 : 3;
    const rook = board[move.from.row][rookFromCol];
    board[move.from.row][rookToCol] = rook;
    board[move.from.row][rookFromCol] = null;
    if (rook) rook.hasMoved = true;
  }

  board[move.to.row][move.to.col] = piece;
  board[move.from.row][move.from.col] = null;
  piece.hasMoved = true;
  enPassantSquare = null;

  if (piece.type === "pawn" && Math.abs(move.to.row - move.from.row) === 2) {
    enPassantSquare = {
      row: (move.from.row + move.to.row) / 2,
      col: move.from.col,
    };
  }
}

function isKingInCheck(board, side) {
  const kingSquare = findKing(board, side);
  return kingSquare
    ? isSquareAttacked(board, kingSquare.row, kingSquare.col, oppositeSide(side))
    : true;
}

function findKing(board, side) {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (piece && piece.side === side && piece.type === "king") {
        return { row, col };
      }
    }
  }
  return null;
}

function isSquareAttacked(board, targetRow, targetCol, attackingSide) {
  for (let row = 0; row < BOARD_SIZE; row += 1) {
    for (let col = 0; col < BOARD_SIZE; col += 1) {
      const piece = board[row][col];
      if (!piece || piece.side !== attackingSide) continue;

      const rowDistance = targetRow - row;
      const colDistance = targetCol - col;
      if (piece.type === "pawn") {
        const direction = piece.side === "red" ? -1 : 1;
        if (rowDistance === direction && Math.abs(colDistance) === 1) return true;
      } else if (piece.type === "knight") {
        if (
          Math.abs(rowDistance) * Math.abs(colDistance) === 2 &&
          Math.abs(rowDistance) + Math.abs(colDistance) === 3
        ) return true;
      } else if (piece.type === "king") {
        if (Math.max(Math.abs(rowDistance), Math.abs(colDistance)) === 1) return true;
      } else {
        const diagonal = Math.abs(rowDistance) === Math.abs(colDistance);
        const straight = rowDistance === 0 || colDistance === 0;
        const canMoveInDirection =
          (piece.type === "bishop" && diagonal) ||
          (piece.type === "rook" && straight) ||
          (piece.type === "queen" && (diagonal || straight));
        if (canMoveInDirection && isPathClear(board, row, col, targetRow, targetCol)) {
          return true;
        }
      }
    }
  }
  return false;
}

function isPathClear(board, fromRow, fromCol, toRow, toCol) {
  const rowStep = Math.sign(toRow - fromRow);
  const colStep = Math.sign(toCol - fromCol);
  let row = fromRow + rowStep;
  let col = fromCol + colStep;
  while (row !== toRow || col !== toCol) {
    if (board[row][col]) return false;
    row += rowStep;
    col += colStep;
  }
  return true;
}

function copyBoard(board) {
  return board.map((row) =>
    row.map((piece) => (piece ? { ...piece } : null))
  );
}

function isInsideBoard(row, col) {
  return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
}

function isSelected(row, col) {
  return selectedSquare?.row === row && selectedSquare?.col === col;
}

function isLegalDestination(row, col) {
  return availableMoves.some((move) => move.to.row === row && move.to.col === col);
}

function oppositeSide(side) {
  return side === "red" ? "blue" : "red";
}

function keyPressed() {
  if (promotionChoice && key >= "1" && key <= "4") {
    finishPromotion(PROMOTION_TYPES[Number(key) - 1]);
  } else if (key === "r" || key === "R") {
    resignGame();
  }
}
