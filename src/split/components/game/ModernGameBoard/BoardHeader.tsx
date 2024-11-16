import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import { Worker } from '../../../../types/game';

interface BoardHeaderProps {
  workerCount: number;
  unlockedSlots: number;
  selectedWorker?: Worker;
  onRemoveWorker: (id: string) => void;
}

export function BoardHeader({
  workerCount,
  unlockedSlots,
  selectedWorker,
  onRemoveWorker,
}: BoardHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-purple-500/10 rounded-xl p-2 border border-purple-500/20">
          <Sparkles className="w-5 h-5 text-purple-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Mining Grid</h2>
          <p className="text-sm text-purple-300">{workerCount} Miners • {unlockedSlots} Slots</p>
        </div>
      </div>
      
      {selectedWorker && (
        <button
          onClick={() => onRemoveWorker(selectedWorker.id)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg
                   bg-red-500/10 hover:bg-red-500/20 text-red-400
                   border border-red-500/20 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
          <span className="hidden sm:inline">Remove</span>
        </button>
      )}
    </div>
  );
}