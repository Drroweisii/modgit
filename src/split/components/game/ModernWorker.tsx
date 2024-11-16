import React from 'react';
import { Worker } from '../../../types/game';
import { Cpu } from 'lucide-react';
import { calculateUpgradeCost } from '../../../utils/calculations';

interface ModernWorkerProps {
  worker: Worker;
  onClick: () => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
}

export function ModernWorker({ worker, onClick, balance, isSelected, canMerge }: ModernWorkerProps) {
  const upgradeCost = calculateUpgradeCost(worker.level);
  const canUpgrade = balance >= upgradeCost;

  return (
    <div
      onClick={onClick}
      className="h-full flex items-center justify-center p-4"
    >
      <div className={`
        relative aspect-square w-full
        flex items-center justify-center
        transition-all duration-200
        ${isSelected ? 'scale-90' : ''}
      `}>
        <div className={`
          absolute inset-0 rounded-xl
          ${worker.level >= 30 ? 'animate-pulse' : ''}
          transition-opacity duration-300
        `} />
        
        <Cpu className={`
          w-10 h-10 
          ${isSelected ? 'text-blue-400' : canMerge ? 'text-green-400' : 'text-purple-400'}
          transition-colors duration-200
        `} />

        <div className={`
          absolute -bottom-1 left-1/2 transform -translate-x-1/2
          px-2 py-0.5 rounded-full text-xs font-bold
          bg-white/10 backdrop-blur-sm border border-white/20
          text-white
        `}>
          Lvl {worker.level}
        </div>

        {canUpgrade && !isSelected && !canMerge && (
          <div className="absolute -top-1 -right-1 
                        bg-green-500 text-white px-2 py-0.5 
                        rounded-full text-xs font-bold
                        border border-green-400">
            +{upgradeCost}
          </div>
        )}
      </div>
    </div>
  );
}