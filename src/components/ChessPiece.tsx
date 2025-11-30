import React from 'react';
import type{ PieceType, PieceColor } from '../types';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
}

export const ChessPiece: React.FC<ChessPieceProps> = ({ type, color, className = "" }) => {
  const isWhite = color === 'w';
  const fill = isWhite ? "#ffffff" : "#000000"; 
  const stroke = isWhite ? "#000000" : "#ffffff";
  
  // Professional "Cburnett" style chess pieces (Standard Wikipedia/Lichess style)
  const pieces: Record<PieceType, React.ReactNode> = {
    p: (
      <svg viewBox="0 0 45 45" className={className}>
        <path
          d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
          fill={fill}
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    n: (
      <svg viewBox="0 0 45 45" className={className}>
        <g fill="none" fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" fill={fill} />
          <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" fill={fill} />
          <path d="M 9.5 25.5 A 0.5 0.5 0 1 1 8.5,25.5 A 0.5 0.5 0 1 1 9.5 25.5 z" fill={stroke} stroke="none" />
          <path d="M 15 15.5 A 0.5 1.5 0 1 1 14,15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill={stroke} stroke="none" />
        </g>
      </svg>
    ),
    b: (
      <svg viewBox="0 0 45 45" className={className}>
        <g fill="none" fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g fill={fill} strokeLinecap="butt">
            <path d="M9 36c3.39-.97 9.11-1.45 13.5-1.45 4.39 0 10.11.48 13.5 1.45V30c0-2.35-2.55-4.27-5.77-5.18.23-1.04.38-2.15.42-3.32C30.65 13.33 26.96 9 22.5 9c-4.46 0-8.15 4.33-8.15 12.5 0 1.17.15 2.28.38 3.32-3.22.91-5.77 2.83-5.77 5.18v6z" />
            <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
            <path d="M25 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
          </g>
          <path d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5" stroke={stroke} strokeLinejoin="miter" />
        </g>
      </svg>
    ),
    r: (
      <svg viewBox="0 0 45 45" className={className}>
        <g fill="#ffffff" fillRule="evenodd" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
           <g fill={fill} stroke={stroke}>
            <path d="M9 39h27v-3H9v3zM12 36v-4h21v4H12zM11 14V9h4v2h5V9h5v2h5V9h4v5" strokeLinecap="butt" />
            <path d="M34 14l-3 3H14l-3-3" />
            <path d="M31 17v12.5c0 2.48-1.28 4.5-4.23 4.5h-8.55c-2.94 0-4.22-2.02-4.22-4.5V17" strokeLinecap="butt" strokeLinejoin="miter" />
            <path d="M31 29.5l1.5 2.5h-20l1.5-2.5" />
            <path d="M11 14h23" fill="none" strokeLinejoin="miter" />
           </g>
        </g>
      </svg>
    ),
    q: (
      <svg viewBox="0 0 45 45" className={className}>
        <g fill={fill} fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <g stroke="none" fill={stroke}>
            <circle cx="6" cy="12" r="2.75" />
            <circle cx="14" cy="9" r="2.75" />
            <circle cx="22.5" cy="8" r="2.75" />
            <circle cx="31" cy="9" r="2.75" />
            <circle cx="39" cy="12" r="2.75" />
          </g>
          <g stroke="none" fill={fill}>
             <circle cx="6" cy="12" r="2" />
             <circle cx="14" cy="9" r="2" />
             <circle cx="22.5" cy="8" r="2" />
             <circle cx="31" cy="9" r="2" />
             <circle cx="39" cy="12" r="2" />
          </g>
          <path d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11V11l-5.5 13.5-3-15-3 15-5.5-13.5V25L7 14l2 12z" strokeLinecap="butt" />
          <path d="M9 26c0 2 1.5 2 2.5 4 1 2.5 3 4.5 6 4.5h10c3 0 5-2 6-4.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z" strokeLinecap="butt" />
          <path d="M11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0" fill="none" />
        </g>
      </svg>
    ),
    k: (
      <svg viewBox="0 0 45 45" className={className}>
        <g fill="none" fillRule="evenodd" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.5 11.63V6M20 8h5" strokeLinejoin="miter" />
          <path d="M22.5 25s4.5-7.5 3-10.5c0 0-1-2.5-3-2.5s-3 2.5-3 2.5c-1.5 3 3 10.5 3 10.5" fill={fill} strokeLinecap="butt" />
          <path d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-5 5.5-5 5.5l-6-2.5-1.5 2.5-1.5-2.5-6 2.5s-1-6.5-5-5.5c-3 6 6 10.5 6 10.5v7z" fill={fill} strokeLinecap="butt" />
          <path d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0" fill="none" />
        </g>
      </svg>
    ),
  };

  return <>{pieces[type]}</>;
};