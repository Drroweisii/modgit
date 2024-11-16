import React from 'react';
import { useGameState } from '../hooks/useGameState';
import { ModernGameBoard } from '../split/components/game/ModernGameBoard';
import { ModernGameStats } from '../split/components/game/ModernGameStats';
import { ModernControls } from '../split/components/game/ModernControls';

export function MinePage() {
  const { 
    gameState,
    hireWorker, 
    handleWorkerClick,
    removeWorker,
    unlockSlot,
    canHireWorker,
    selectedWorkerId,
    canMergeWorkers,
  } = useGameState();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto p-4">
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
      </div>
    </div>
  );
}