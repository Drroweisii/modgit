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
    <div className={`bg-${color}-500/10 rounded-xl p-2 border border-${color}-500/20`}>
      <div className="flex items-center gap-2">
        <div className={`bg-${color}-500/20 rounded-lg p-2 flex-shrink-0`}>
          {icon}
        </div>
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <p className="text-sm text-gray-400">{name}</p>
            <p className="text-xs text-gray-400">+{rate}/s</p>
          </div>
          <p className="text-lg font-bold text-white truncate">{value}</p>
        </div>
      </div>
    </div>
  );
}