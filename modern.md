# Modern Components Documentation

## ModernDashboard
```tsx
// src/split/components/ModernDashboard.tsx
import React from 'react';
import { GameState } from '../../types/game';
import { ModernGameLayout } from './game/ModernGameLayout';

interface ModernDashboardProps {
  gameState: GameState;
}

export function ModernDashboard({ gameState }: ModernDashboardProps) {
  return (
    <div className="h-[calc(100vh-4rem)] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="h-full max-w-7xl mx-auto px-4 py-4">
        <ModernGameLayout gameState={gameState} />
      </div>
    </div>
  );
}
```

## ModernGameLayout
```tsx
// src/split/components/game/ModernGameLayout.tsx
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
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 h-full overflow-hidden">
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
      <div className="h-full overflow-hidden flex flex-col gap-4">
        <div className="flex-shrink-0">
          <ModernGameStats gameState={gameState} />
        </div>
        <div className="flex-1 overflow-hidden">
          <ModernControls
            gameState={gameState}
            onHire={hireWorker}
            canHireWorker={canHireWorker}
          />
        </div>
      </div>
    </div>
  );
}
```

## ModernGameBoard
```tsx
// src/split/components/game/ModernGameBoard/index.tsx
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
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex flex-col">
      <BoardHeader
        workerCount={workers.length}
        unlockedSlots={unlockedSlots}
        selectedWorker={selectedWorker}
        onRemoveWorker={onRemoveWorker}
      />

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
```

## ModernGrid
```tsx
// src/split/components/game/ModernGrid.tsx
import React from 'react';
import { GRID_SIZE } from '../../../utils/constants';
import { GridCell as GridCellType, Worker as WorkerType } from '../../../types/game';
import { ModernGridCell } from './ModernGridCell';

interface ModernGridProps {
  gridState: GridCellType[];
  workers: WorkerType[];
  onCellClick: (position: number) => void;
  balance: number;
  selectedWorkerId: string | null;
  canMergeWorkers: (worker1: WorkerType, worker2: WorkerType) => boolean;
  unlockedSlots: number;
  onUnlockSlot: (position: number) => void;
}

export function ModernGrid({
  gridState,
  workers,
  onCellClick,
  balance,
  selectedWorkerId,
  canMergeWorkers,
  unlockedSlots,
  onUnlockSlot,
}: ModernGridProps) {
  const selectedWorker = workers.find(w => w.id === selectedWorkerId);

  return (
    <div className="grid gap-4"
      style={{
        gridTemplateColumns: `repeat(${GRID_SIZE.COLS}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${GRID_SIZE.ROWS}, minmax(0, 1fr))`,
      }}
    >
      {gridState.map((cell, index) => {
        const worker = workers.find(w => w.id === cell.workerId);
        const canMerge = worker && selectedWorker && worker.id !== selectedWorker.id && 
                        canMergeWorkers(worker, selectedWorker);
        const isValidMove = selectedWorker && !worker;
        const isLocked = index >= unlockedSlots;

        return (
          <ModernGridCell
            key={cell.position}
            cell={cell}
            worker={worker}
            onClick={() => onCellClick(cell.position)}
            balance={balance}
            isSelected={worker?.id === selectedWorkerId}
            canMerge={canMerge}
            isValidMove={isValidMove}
            isLocked={isLocked}
            onUnlock={() => onUnlockSlot(index)}
            unlockCost={getSlotCost(index)}
          />
        );
      })}
    </div>
  );
}

function getSlotCost(position: number): number {
  const costs = {
    6: 100,
    7: 250,
    8: 500,
    9: 1000,
    10: 2500,
    11: 5000,
    12: 10000,
  };
  return costs[position + 1 as keyof typeof costs] || 0;
}
```

## ModernGridCell
```tsx
// src/split/components/game/ModernGridCell.tsx
import React from 'react';
import { GridCell, Worker } from '../../../types/game';
import { ModernWorker } from './ModernWorker';
import { Lock } from 'lucide-react';

interface ModernGridCellProps {
  cell: GridCell;
  worker?: Worker;
  onClick: () => void;
  balance: number;
  isSelected?: boolean;
  canMerge?: boolean;
  isValidMove?: boolean;
  isLocked: boolean;
  onUnlock: () => void;
  unlockCost: number;
}

export function ModernGridCell({
  cell,
  worker,
  onClick,
  balance,
  isSelected,
  canMerge,
  isValidMove,
  isLocked,
  onUnlock,
  unlockCost,
}: ModernGridCellProps) {
  if (isLocked) {
    return (
      <div
        onClick={balance >= unlockCost ? onUnlock : undefined}
        className={`
          aspect-square rounded-2xl border border-white/10
          flex flex-col items-center justify-center gap-2
          ${balance >= unlockCost 
            ? 'bg-purple-500/10 hover:bg-purple-500/20 cursor-pointer' 
            : 'bg-white/5 cursor-not-allowed opacity-50'}
          transition-all duration-200
        `}
      >
        <Lock className="w-6 h-6 text-purple-400" />
        <span className="text-sm text-purple-300">{unlockCost} EMSX</span>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`
        aspect-square rounded-2xl border
        transition-all duration-200
        ${worker 
          ? 'bg-white/5 border-white/10' 
          : isValidMove
            ? 'bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20'
            : 'bg-white/5 border-white/10 hover:bg-white/10'}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
        ${canMerge ? 'ring-2 ring-green-500' : ''}
        cursor-pointer
        overflow-hidden
      `}
    >
      {worker ? (
        <ModernWorker
          worker={worker}
          onClick={onClick}
          balance={balance}
          isSelected={isSelected}
          canMerge={canMerge}
        />
      ) : (
        <div className="h-full flex items-center justify-center">
          {isValidMove ? (
            <div className="text-blue-400 animate-pulse">
              <div className="text-2xl">⟶</div>
            </div>
          ) : (
            <span className="text-white/20 text-2xl">+</span>
          )}
        </div>
      )}
    </div>
  );
}
```

## ModernWorker
```tsx
// src/split/components/game/ModernWorker.tsx
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
```

## ModernGameStats
```tsx
// src/split/components/game/ModernGameStats/index.tsx
import React from 'react';
import { GameState } from '../../../../types/game';
import { useGameStatement } from '../../../../hooks/useGameStatement';
import { Coins, DollarSign, Bitcoin } from 'lucide-react';
import { StatCard } from './StatCard';

interface ModernGameStatsProps {
  gameState: GameState;
}

export function ModernGameStats({ gameState }: ModernGameStatsProps) {
  const { formattedBalances, formattedRates } = useGameStatement(gameState);

  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10">
      <h2 className="text-2xl font-bold text-white mb-3">Resources</h2>
      <div className="grid grid-cols-1 gap-3">
        <StatCard
          icon={<Coins className="w-5 h-5" />}
          name="EMSX"
          value={formattedBalances.emsx}
          rate={formattedRates.emsx}
          color="purple"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          name="USDT"
          value={formattedBalances.usdt}
          rate={formattedRates.usdt}
          color="green"
        />
        <StatCard
          icon={<Bitcoin className="w-5 h-5" />}
          name="BTC"
          value={formattedBalances.btc}
          rate={formattedRates.btc}
          color="orange"
        />
      </div>
    </div>
  );
}
```

## ModernControls
```tsx
// src/split/components/game/ModernControls/index.tsx
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
    <div className="h-full bg-white/5 backdrop-blur-sm rounded-3xl p-4 border border-white/10 flex flex-col">
      <div className="flex items-center gap-4 mb-4 flex-shrink-0">
        <div className="bg-blue-500/10 rounded-2xl p-3 border border-blue-500/20">
          <Cpu className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Hire Miners</h2>
          <p className="text-blue-300">Select and hire new mining units</p>
        </div>
      </div>

      <div className="flex-1 overflow-auto space-y-3 pr-2">
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
```

## MinerButton
```tsx
// src/split/components/game/ModernControls/MinerButton.tsx
import React from 'react';
import { WorkerType } from '../../../../types/workers';
import { Cpu, ArrowRight } from 'lucide-react';

interface MinerButtonProps {
  type: string;
  name: string;
  cost: number;
  color: string;
  isSelected: boolean;
  canAfford: boolean;
  canHire: boolean;
  onSelect: () => void;
  onHire: () => void;
}

export function MinerButton({
  type,
  name,
  cost,
  color,
  isSelected,
  canAfford,
  canHire,
  onSelect,
  onHire,
}: MinerButtonProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => canAfford && onSelect()}
      onKeyDown={(e) => e.key === 'Enter' && canAfford && onSelect()}
      className={`
        relative w-full p-3 rounded-2xl border transition-all duration-200
        ${isSelected 
          ? 'bg-blue-500/20 border-blue-500/40' 
          : canAfford
            ? 'bg-white/5 border-white/10 hover:bg-white/10'
            : 'bg-white/5 border-white/10 opacity-50 cursor-not-allowed'
        }
        ${canAfford ? 'cursor-pointer' : 'cursor-not-allowed'}
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
      `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`bg-${color}-500/20 rounded-xl p-2`}>
            <Cpu className={`w-5 h-5 text-${color}-400`} />
          </div>
          <div className="text-left">
            <p className="font-bold text-white">{name} Miner</p>
            <p className="text-sm text-gray-400">{cost} EMSX</p>
          </div>
        </div>
        {isSelected && canHire && (
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onHire();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.stopPropagation();
                onHire();
              }
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl
                     bg-blue-500 hover:bg-blue-600 text-white
                     transition-all duration-200 cursor-pointer
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <span>Hire</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        )}
      </div>
    </div>
  );
}
```

## StatCard
```tsx
// src/split/components/game/ModernGameStats/StatCard.tsx
import React from 'react';

interface StatCardProps {
  icon: React.ReactNode;
  name: string;
  value: string;
  rate: string;
  color: string;
}

export function StatCard({ icon, name, value, rate, color }: StatCardProps) {
  return (
    <div className={`bg-${color}-500/10 rounded-2xl p-3 border border-${color}-500/20`}>
      <div className="flex items-center gap-3">
        <div className={`bg-${color}-500/20 rounded-xl p-2`}>
          {icon}
        </div>
        <div>
          <p className="text-sm text-gray-400">{name}</p>
          <p className="text-lg font-bold text-white">{value}</p>
          <p className="text-xs text-gray-400">+{rate}/s</p>
        </div>
      </div>
    </div>
  );
}
```

## BoardHeader
```tsx
// src/split/components/game/ModernGameBoard/BoardHeader.tsx
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
    <div className="flex items-center justify-between mb-4 flex-shrink-0">
      <div className="flex items-center gap-4">
        <div className="bg-purple-500/10 rounded-2xl p-3 border border-purple-500/20">
          <Sparkles className="w-6 h-6 text-purple-400" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Mining Grid</h2>
          <p className="text-purple-300">{workerCount} Active Miners • {unlockedSlots} Slots</p>
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
  );
}
```