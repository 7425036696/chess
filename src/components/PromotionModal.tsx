import React from 'react';
import { ChessPiece } from './ChessPiece';
import type{ PieceColor, PieceType } from '../types';

interface PromotionModalProps {
  color: PieceColor;
  onSelect: (type: PieceType) => void;
  isOpen: boolean;
}

export const PromotionModal: React.FC<PromotionModalProps> = ({ color, onSelect, isOpen }) => {
  if (!isOpen) return null;

  const pieces: PieceType[] = ['q', 'r', 'b', 'n'];

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm rounded-lg">
      <div className="bg-slate-800 p-6 rounded-xl border border-slate-600 shadow-2xl transform scale-100 animate-in fade-in zoom-in duration-200">
        <h3 className="text-white text-lg font-semibold mb-4 text-center">Promote Pawn</h3>
        <div className="flex gap-4">
          {pieces.map((p) => (
            <button
              key={p}
              onClick={() => onSelect(p)}
              className="w-16 h-16 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center justify-center transition-all border border-slate-600 hover:border-blue-500 hover:scale-105"
            >
              <div className="w-12 h-12">
                <ChessPiece type={p} color={color} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
