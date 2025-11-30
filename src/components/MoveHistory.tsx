import React, { useEffect, useRef } from 'react';

interface MoveHistoryProps {
  history: string[];
}

export const MoveHistory: React.FC<MoveHistoryProps> = ({ history }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const pairs = [];
  for (let i = 0; i < history.length; i += 2) {
    pairs.push({
      num: Math.floor(i / 2) + 1,
      white: history[i],
      black: history[i + 1] || '',
    });
  }

  return (
    <div className="bg-slate-800 rounded-lg p-4 h-full flex flex-col border border-slate-700">
      <h3 className="text-slate-300 font-semibold mb-2 text-sm uppercase tracking-wider border-b border-slate-700 pb-2">Move History</h3>
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-1 custom-scrollbar text-sm"
        style={{ maxHeight: '200px' }}
      >
        {pairs.map((pair) => (
          <div key={pair.num} className="grid grid-cols-[30px_1fr_1fr] gap-2 py-1 px-2 hover:bg-slate-700 rounded transition-colors">
            <span className="text-slate-500 font-mono text-right mr-1">{pair.num}.</span>
            <span className="text-slate-200 font-medium">{pair.white}</span>
            <span className="text-slate-200 font-medium">{pair.black}</span>
          </div>
        ))}
        {pairs.length === 0 && (
          <div className="text-slate-600 text-center italic py-4">Game start</div>
        )}
      </div>
    </div>
  );
};
