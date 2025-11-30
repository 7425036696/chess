import { Chess } from 'chess.js';
import type{ Difficulty } from '../types';

// Relative values of pieces
const PIECE_VALUES: Record<string, number> = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

// Piece-Square Tables (simplified for positional awareness)
// Higher numbers = better position for white (flip for black)
const PAWN_PST = [
  [0, 0, 0, 0, 0, 0, 0, 0],
  [50, 50, 50, 50, 50, 50, 50, 50],
  [10, 10, 20, 30, 30, 20, 10, 10],
  [5, 5, 10, 25, 25, 10, 5, 5],
  [0, 0, 0, 20, 20, 0, 0, 0],
  [5, -5, -10, 0, 0, -10, -5, 5],
  [5, 10, 10, -20, -20, 10, 10, 5],
  [0, 0, 0, 0, 0, 0, 0, 0],
];

const KNIGHT_PST = [
  [-50, -40, -30, -30, -30, -30, -40, -50],
  [-40, -20, 0, 0, 0, 0, -20, -40],
  [-30, 0, 10, 15, 15, 10, 0, -30],
  [-30, 5, 15, 20, 20, 15, 5, -30],
  [-30, 0, 15, 20, 20, 15, 0, -30],
  [-30, 5, 10, 15, 15, 10, 5, -30],
  [-40, -20, 0, 5, 5, 0, -20, -40],
  [-50, -40, -30, -30, -30, -30, -40, -50],
];
const evaluateBoard = (game: Chess): number => {
  let totalEvaluation = 0;
  const board = game.board();

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const value = PIECE_VALUES[piece.type];
        
        // Positional score
        let positionalScore = 0;        
        // Simple positional logic
        if (piece.type === 'p') {
          positionalScore = piece.color === 'w' 
            ? PAWN_PST[i][j] 
            : PAWN_PST[7-i][j]; // crude flip
        } else if (piece.type === 'n') {
          positionalScore = piece.color === 'w' 
            ? KNIGHT_PST[i][j] 
            : KNIGHT_PST[7-i][j];
        }

        if (piece.color === 'w') {
          totalEvaluation += (value + positionalScore);
        } else {
          totalEvaluation -= (value + positionalScore);
        }
      }
    }
  }
  return totalEvaluation;
};

const minimax = (
  game: Chess,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizingPlayer: boolean
): number => {
  if (depth === 0 || game.isGameOver()) {
    return -evaluateBoard(game); // Negate because eval function is White-centric but engine is usually Black
  }

  const moves = game.moves();

  if (isMaximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, evalValue);
      alpha = Math.max(alpha, evalValue);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      game.move(move);
      const evalValue = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, evalValue);
      beta = Math.min(beta, evalValue);
      if (beta <= alpha) break;
    }
    return minEval;
  }
};

export const getBestMove = (game: Chess, difficulty: Difficulty): string | null => {
  const possibleMoves = game.moves();
  if (possibleMoves.length === 0) return null;

  // Easy: Random move
  if (difficulty === 'easy') {
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    return possibleMoves[randomIndex];
  }

  // Configuration for Minimax
  let depth = 2;
  if (difficulty === 'medium') depth = 2;
  if (difficulty === 'hard') depth = 3;
  if (difficulty === 'impossible') depth = 3; // Keep 3 for performance in JS, but could go 4

  let bestMove = null;
  let bestValue = -Infinity;
  
  // Scramble moves slightly for variety at start
  const moves = difficulty === 'impossible' ? possibleMoves : possibleMoves.sort(() => Math.random() - 0.5);

  for (const move of moves) {
    game.move(move);
    // Bot is usually playing Black (minimizing in global eval, maximizing its own turn)
    // Here we treat the bot as the maximizing player for the sake of the algorithm
    const boardValue = minimax(game, depth - 1, -Infinity, Infinity, false);
    game.undo();

    if (boardValue > bestValue) {
      bestValue = boardValue;
      bestMove = move;
    }
  }

  return bestMove || possibleMoves[0];
};
