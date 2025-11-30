import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Chess, Move } from 'chess.js';
import { ChessPiece } from './ChessPiece';
import { PromotionModal } from './PromotionModal';
import type{ PieceType } from '../types';
import clsx from 'clsx';

interface BoardProps {
  game: Chess;
  onMove: (move: { from: string; to: string; promotion?: string }) => void;
  orientation: 'w' | 'b';
  isGameOver: boolean;
}

export const Board: React.FC<BoardProps> = ({ game, onMove, orientation, isGameOver }) => {
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [possibleMoves, setPossibleMoves] = useState<string[]>([]);
  const [promotionMove, setPromotionMove] = useState<{ from: string; to: string } | null>(null);
  const [_checkSquareState, setCheckSquareState] = useState<string | null>(null);

  // Generate board grid 8x8
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
  
  // Flip if orientation is black
  const displayFiles = orientation === 'w' ? files : [...files].reverse();
  const displayRanks = orientation === 'w' ? ranks : [...ranks].reverse();

  // Helper to get piece at square
  const getPieceAt = useCallback((square: string) => {
    return game.get(square as any);
  }, [game]);

  // Find King in Check
  const checkSquare = useMemo(() => {
     if (game.inCheck()) {
       const board = game.board();
       for (let r = 0; r < 8; r++) {
         for (let c = 0; c < 8; c++) {
           const p = board[r][c];
           if (p && p.type === 'k' && p.color === game.turn()) {
              return p.square;
           }
         }
       }
     }
     return null;
  }, [game]); 

  // Effect to trigger shake only on new checks
  useEffect(() => {
    setCheckSquareState(checkSquare);
  }, [checkSquare]);

  // Handle clicking a square
  const handleSquareClick = (square: string) => {
    if (isGameOver) return;

    if (promotionMove) return;

    if (selectedSquare && possibleMoves.includes(square)) {
      handleMoveAttempt(selectedSquare, square);
      return;
    }

    const piece = getPieceAt(square);
    if (piece && piece.color === game.turn()) {
      setSelectedSquare(square);
      const moves = game.moves({ square: square as any, verbose: true }) as Move[];
      setPossibleMoves(moves.map(m => m.to));
    } else {
      setSelectedSquare(null);
      setPossibleMoves([]);
    }
  };

  const handleMoveAttempt = (from: string, to: string) => {
    const piece = getPieceAt(from);
    const isPawn = piece?.type === 'p';
    const isPromotionRank = (piece?.color === 'w' && to[1] === '8') || (piece?.color === 'b' && to[1] === '1');

    if (isPawn && isPromotionRank) {
      setPromotionMove({ from, to });
    } else {
      executeMove(from, to);
    }
  };

  const executeMove = (from: string, to: string, promotion?: string) => {
    onMove({ from, to, promotion });
    setSelectedSquare(null);
    setPossibleMoves([]);
    setPromotionMove(null);
  };

  const handlePromotionSelect = (type: PieceType) => {
    if (promotionMove) {
      executeMove(promotionMove.from, promotionMove.to, type);
    }
  };

  const lastMove = useMemo(() => {
    const history = game.history({ verbose: true });
    return history.length > 0 ? history[history.length - 1] : null;
  }, [game]);

  return (
    <div className="relative select-none touch-manipulation w-full max-w-[600px] mx-auto">
      <PromotionModal 
        isOpen={!!promotionMove}
        color={game.turn()}
        onSelect={handlePromotionSelect}
      />

      <div className="aspect-square grid grid-rows-8 grid-cols-8 border-4 border-[#334155] rounded-lg overflow-hidden shadow-2xl relative">
        {displayRanks.map((rank) => (
          displayFiles.map((file) => {
            const square = `${file}${rank}`;
            const isLight = (files.indexOf(file) + ranks.indexOf(rank)) % 2 !== 0; 
            
            const piece = getPieceAt(square);
            const isSelected = selectedSquare === square;
            const isPossibleMove = possibleMoves.includes(square);
            const isLastMoveFrom = lastMove?.from === square;
            const isLastMoveTo = lastMove?.to === square;
            const isCheck = checkSquare === square;
            const isCapture = isPossibleMove && piece;

            const bgClass = isLight ? "bg-[#dee3e6]" : "bg-[#8ca2ad]"; 
            
            return (
              <div
                key={square}
                onClick={() => handleSquareClick(square)}
                className={clsx(
                  "relative flex items-center justify-center cursor-pointer w-full h-full transition-colors duration-150",
                  bgClass,
                  (isSelected || isLastMoveFrom || isLastMoveTo) && "after:absolute after:inset-0 after:bg-yellow-400/30 after:z-0",
                  // Animated Check background
                  isCheck && "bg-red-500/80 animate-pulse-red !important",
                )}
              >
                {file === (orientation === 'w' ? 'a' : 'h') && (
                  <span className={clsx("absolute top-0.5 left-0.5 sm:left-1 text-[8px] sm:text-[10px] font-bold z-10 select-none", isLight ? "text-[#8ca2ad]" : "text-[#dee3e6]")}>
                    {rank}
                  </span>
                )}
                {rank === (orientation === 'w' ? '1' : '8') && (
                   <span className={clsx("absolute bottom-0 right-0.5 sm:right-1 text-[8px] sm:text-[10px] font-bold z-10 select-none", isLight ? "text-[#8ca2ad]" : "text-[#dee3e6]")}>
                    {file}
                  </span>
                )}

                {isPossibleMove && !piece && (
                  <div className="absolute w-1/4 h-1/4 bg-black/20 rounded-full z-10 pointer-events-none" />
                )}
                
                {isCapture && (
                   <div className="absolute w-full h-full ring-[4px] sm:ring-[6px] ring-black/10 inset-0 z-10 rounded-full pointer-events-none" />
                )}

                {piece && (
                  <div className={clsx(
                    "w-full h-full p-0.5 sm:p-1 z-20 relative flex items-center justify-center will-change-transform",
                    isSelected ? "scale-110 -translate-y-1 transition-transform" : "hover:scale-105 transition-transform",
                    // Apply Shake animation if this is the checked king
                    isCheck && "animate-shake"
                  )}>
                    <ChessPiece type={piece.type as any} color={piece.color as any} className="w-full h-full drop-shadow-lg" />
                  </div>
                )}
              </div>
            );
          })
        ))}
      </div>
    </div>
  );
};