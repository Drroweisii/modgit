import React from 'react';
import { GridCell, Worker } from '../../../../types/game';
import { ModernGrid } from '../ModernGrid';
import { BoardHeader } from './BoardHeader';

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
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10">
      <BoardHeader
        workerCount={workers.length}
        unlockedSlots={unlockedSlots}
        selectedWorker={selectedWorker}
        onRemoveWorker={onRemoveWorker}
      />

      <div className="mt-3">
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