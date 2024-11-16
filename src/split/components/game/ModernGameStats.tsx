import React from 'react';
import { GameState } from '../../../types/game';
import { useGameStatement } from '../../../hooks/useGameStatement';
import { Coins, DollarSign, Bitcoin } from 'lucide-react';

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

interface StatCardProps {
  icon: React.ReactNode;
  name: string;
  value: string;
  rate: string;
  color: string;
}

function StatCard({ icon, name, value, rate, color }: StatCardProps) {
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