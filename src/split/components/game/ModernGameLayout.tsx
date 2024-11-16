import React from 'react';
import { GameState } from '../../../types/game';
import { ModernGameBoard } from './ModernGameBoard';
import { ModernGameStats } from './ModernGameStats';
import { ModernControls } from './ModernControls';
import { useGameState } from '../../../hooks/useGameState';

interface ModernGameLayoutProps {
  gameState: GameState;
}

export function ModernGameLayout({ gameState }: ModernGameLayoutProps) {
  const { 
    hireWorker, 
    handleWorkerClick,
    removeWorker,
    unlockSlot,
    canHireWorker,
    selectedWorkerId,
    canMergeWorkers,
  } = useGameState();

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
      {/* Stats Bar - Full width on mobile, top bar on desktop */}
      <div className="md:col-span-12 md:h-24">
        <ModernGameStats gameState={gameState} />
      </div>

      {/* Main Game Area */}
      <div className="md:col-span-8">
        <ModernGameBoard
          gridState={gameState.gridState}
          workers={gameState.workers}
          onCellClick={(pos) => {
            const worker = gameState.workers.find(w => w.position === pos);
            handleWorkerClick(worker?.id || '', pos);
          }}
          onRemoveWorker={removeWorker}
          onUnlockSlot={unlockSlot}
          balance={gameState.balances.emsx}
          selectedWorkerId={selectedWorkerId}
          canMergeWorkers={canMergeWorkers}
          unlockedSlots={gameState.unlockedSlots}
        />
      </div>

      {/* Controls */}
      <div className="md:col-span-4">
        <ModernControls
          gameState={gameState}
          onHire={hireWorker}
          canHireWorker={canHireWorker}
        />
      </div>
    </div>
  );
}