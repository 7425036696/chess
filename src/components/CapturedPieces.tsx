import React from 'react';
import { ChessPiece } from './ChessPiece';
import type{ PieceType, PieceColor } from '../types';

interface CapturedPiecesProps {
  pieces: { type: PieceType; color: PieceColor }[];
  playerColor: PieceColor;
}

export const CapturedPieces: React.FC<CapturedPiecesProps> = ({ pieces, playerColor }) => {
  // We want to show pieces captured BY this player.
  // If playerColor is 'w', we show black pieces they captured.
  const capturedByThisPlayer = pieces.filter((p) => p.color !== playerColor);
  
  // Count material advantage? For now just list them.
  // Sort by value roughly: q, r, b, n, p
  const valueMap: Record<string, number> = { p: 1, n: 3, b: 3, r: 5, q: 9, k: 0 };
  const sorted = [...capturedByThisPlayer].sort((a, b) => valueMap[b.type] - valueMap[a.type]);

  return (
    <div className="h-8 flex items-center gap-1 overflow-hidden bg-slate-800/50 rounded px-2">
       {sorted.map((p, idx) => (
         <div key={idx} className="w-5 h-5 -ml-1 first:ml-0 relative">
            <ChessPiece type={p.type} color={p.color} className="" />
         </div>
       ))}
       {sorted.length === 0 && <span className="text-xs text-slate-500">No captures</span>}
    </div>
  );
};
