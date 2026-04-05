import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';

interface HubCardProps {
  title: string;
  subtitle: string;
  description: string;
  path: string;
  iconColor: string;
}

function HubCard({ title, subtitle, description, path, iconColor }: HubCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      className="
        group cursor-pointer
        hover:border-elec-yellow/40 hover:bg-[#242424]
        active:scale-[0.98] active:opacity-90
      "
      onClick={() => navigate(path)}
    >
      <div className="p-4 sm:p-5 flex flex-col h-full min-h-[140px] sm:min-h-[160px]">
        {/* Top row - badge */}
        <div className="flex items-start justify-end mb-3">
          <span className="text-[10px] sm:text-xs font-medium text-white uppercase tracking-wider px-2 py-1 rounded-md bg-white/[0.04]">
            {subtitle}
          </span>
        </div>

        {/* Text content */}
        <div className="flex-grow">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1 group-hover:text-elec-yellow transition-colors">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-white leading-relaxed line-clamp-2">
            {description}
          </p>
        </div>

        {/* Bottom action row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium text-elec-yellow/70 group-hover:text-elec-yellow transition-colors">
            Open
          </span>
          <div
            className="
            w-7 h-7 sm:w-8 sm:h-8 rounded-full
            bg-white/[0.05] border border-elec-yellow/20
            flex items-center justify-center
            group-hover:bg-elec-yellow group-hover:border-elec-yellow
            transition-all duration-200
          "
          >
            <ChevronRight className="w-4 h-4 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
          </div>
        </div>
      </div>
    </Card>
  );
}

export function HubGrid() {
  const hubs: HubCardProps[] = [
    {
      title: 'Apprentice Hub',
      subtitle: 'Training',
      description: 'Track your journey, log training hours, and build your portfolio.',
      path: '/apprentice',
      iconColor: 'text-blue-400',
    },
    {
      title: 'Electrical Hub',
      subtitle: 'Tools',
      description: 'Inspection tools, certificates, pricing, and AI assistants.',
      path: '/electrician',
      iconColor: 'text-elec-yellow',
    },
    {
      title: 'Employer Hub',
      subtitle: 'Manage',
      description: 'Employees, jobs, timesheets, and business management.',
      path: '/employer',
      iconColor: 'text-purple-400',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
      {hubs.map((hub) => (
        <HubCard key={hub.path} {...hub} />
      ))}
    </div>
  );
}
