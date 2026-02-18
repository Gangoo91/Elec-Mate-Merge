import React from 'react';
import { Home, Package, Camera, HelpCircle } from 'lucide-react';

interface ScopeSummaryStatsProps {
  totalRooms: number;
  totalItems: number;
  totalPhotos: number;
  totalPromptsAnswered: number;
}

export const ScopeSummaryStats = ({
  totalRooms,
  totalItems,
  totalPhotos,
  totalPromptsAnswered,
}: ScopeSummaryStatsProps) => {
  const stats = [
    { icon: Home, label: 'Rooms', value: totalRooms, colour: 'text-blue-400' },
    { icon: Package, label: 'Items', value: totalItems, colour: 'text-emerald-400' },
    { icon: Camera, label: 'Photos', value: totalPhotos, colour: 'text-purple-400' },
    { icon: HelpCircle, label: 'Prompts', value: totalPromptsAnswered, colour: 'text-orange-400' },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
        >
          <stat.icon className={`h-4 w-4 ${stat.colour} mb-1`} />
          <p className="text-lg font-bold text-white">{stat.value}</p>
          <p className="text-[10px] text-white">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};
