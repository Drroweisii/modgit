import React from 'react';
import { GridCell, Worker } from '../../../types/game';
import { ModernGrid } from './ModernGrid';
import { Sparkles, Trash2 } from 'lucide-react';

interface ModernGameBoardProps {
  gridState: GridCell[];
  workers: Worker[];
  onCellClick: (position: number) => void;
  onRemoveWorker: (id: string) => void;
  onUnlockSlot: (position: number) => void;
  balance: number;
  selectedWorkerId: string | null;
  canMergeWorkers: (worker1: Worker, worker2: Worker) => boolean;
  unlockedSlots: number;
}

export function ModernGameBoard({
  gridState,
  workers,
  onCellClick,
  onRemoveWorker,
  onUnlockSlot,
  balance,
  selectedWorkerId,
  canMergeWorkers,
  unlockedSlots,
}: ModernGameBoardProps) {
  const selectedWorker = workers.find(w => w.id === selectedWorkerId);

  return (
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex flex-col">
      <div className="flex items-center justify-between mb-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-purple-500/10 rounded-2xl p-3 border border-purple-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Mining Grid</h2>
            <p className="text-purple-300">{workers.length} Active Miners • {unlockedSlots} Slots</p>
          </div>
        </div>
        
        {selectedWorker && (
          <button
            onClick={() => onRemoveWorker(selectedWorker.id)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-red-500/10 hover:bg-red-500/20 text-red-400
                     border border-red-500/20 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            <span>Remove Selected</span>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-hidden">
        <ModernGrid
          gridState={gridState}
          workers={workers}
          onCellClick={onCellClick}
          balance={balance}
          selectedWorkerId={selectedWorkerId}
          canMergeWorkers={canMergeWorkers}
          unlockedSlots={unlockedSlots}
          onUnlockSlot={onUnlockSlot}
        />
      </div>
    </div>
  );
}