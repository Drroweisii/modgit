import React from 'react';
import { GameState } from '../../../../types/game';
import { WorkerType } from '../../../../types/workers';
import { WORKER_TYPES } from '../../../../utils/workerTypes';
import { useWorkerSelection } from '../../../../hooks/useWorkerSelection';
import { Cpu } from 'lucide-react';
import { MinerButton } from './MinerButton';

interface ModernControlsProps {
  gameState: GameState;
  onHire: (type: WorkerType) => boolean;
  canHireWorker: (type: WorkerType) => boolean;
}

export function ModernControls({ gameState, onHire, canHireWorker }: ModernControlsProps) {
  const { selectedWorkerType, setSelectedWorkerType, handleHire } = useWorkerSelection(
    gameState,
    onHire
  );

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 border border-white/10 h-full">
      <div className="flex items-center gap-3 mb-3">
        <div className="bg-blue-500/10 rounded-xl p-2 border border-blue-500/20">
          <Cpu className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Hire Miners</h2>
          <p className="text-sm text-blue-300">Select and hire new units</p>
        </div>
      </div>

      <div className="space-y-2 overflow-auto max-h-[calc(100vh-20rem)] md:max-h-none pr-1">
        {Object.entries(WORKER_TYPES).map(([type, config]) => (
          <MinerButton
            key={type}
            type={type}
            name={config.name}
            cost={config.cost}
            color={config.color}
            isSelected={selectedWorkerType === type}
            canAfford={gameState.balances.emsx >= config.cost}
            canHire={canHireWorker(type as WorkerType)}
            onSelect={() => setSelectedWorkerType(type as WorkerType)}
            onHire={handleHire}
          />
        ))}
      </div>
    </div>
  );
}