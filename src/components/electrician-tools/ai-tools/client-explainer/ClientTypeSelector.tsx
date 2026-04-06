import { Home, Building, Users, Briefcase } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ClientType = 'homeowner' | 'business' | 'landlord' | 'contractor';

interface ClientTypeSelectorProps {
  selected: ClientType;
  onSelect: (type: ClientType) => void;
}

const clientTypes = [
  {
    type: 'homeowner' as ClientType,
    label: 'Homeowner',
    icon: Home,
    desc: 'Residential',
    color: 'blue',
  },
  {
    type: 'business' as ClientType,
    label: 'Business',
    icon: Building,
    desc: 'Commercial',
    color: 'green',
  },
  {
    type: 'landlord' as ClientType,
    label: 'Landlord',
    icon: Users,
    desc: 'Rental',
    color: 'purple',
  },
  {
    type: 'contractor' as ClientType,
    label: 'Contractor',
    icon: Briefcase,
    desc: 'Trades',
    color: 'orange',
  },
];

const colorMap: Record<string, { selected: string; icon: string; iconSelected: string }> = {
  blue: {
    selected: 'bg-blue-500/15 ring-blue-500/40 shadow-blue-500/10',
    icon: 'bg-white/[0.06] text-white',
    iconSelected: 'bg-blue-500/20 text-blue-400',
  },
  green: {
    selected: 'bg-green-500/15 ring-green-500/40 shadow-green-500/10',
    icon: 'bg-white/[0.06] text-white',
    iconSelected: 'bg-green-500/20 text-green-400',
  },
  purple: {
    selected: 'bg-purple-500/15 ring-purple-500/40 shadow-purple-500/10',
    icon: 'bg-white/[0.06] text-white',
    iconSelected: 'bg-purple-500/20 text-purple-400',
  },
  orange: {
    selected: 'bg-orange-500/15 ring-orange-500/40 shadow-orange-500/10',
    icon: 'bg-white/[0.06] text-white',
    iconSelected: 'bg-orange-500/20 text-orange-400',
  },
};

const ClientTypeSelector = ({ selected, onSelect }: ClientTypeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 gap-2.5">
      {clientTypes.map(({ type, label, icon: Icon, desc, color }) => {
        const isSelected = selected === type;
        const c = colorMap[color];

        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl ring-1 transition-all touch-manipulation active:scale-[0.97]',
              isSelected
                ? `${c.selected} shadow-sm`
                : 'bg-white/[0.03] ring-white/[0.08] active:bg-white/[0.06]'
            )}
          >
            <div
              className={cn(
                'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors',
                isSelected ? c.iconSelected : c.icon
              )}
            >
              <Icon className="h-5 w-5" />
            </div>
            <div className="text-left min-w-0">
              <p className="text-[13px] font-semibold text-white">{label}</p>
              <p className="text-[11px] text-white">{desc}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default ClientTypeSelector;
