import { Avatar, Pill, type Tone } from './editorial';
import { cn } from '@/lib/utils';

interface EmployeeCardProps {
  name: string;
  role: string;
  avatar?: string;
  status: string;
  certifications?: number;
  activeJobs?: number;
  onClick?: () => void;
  className?: string;
}

const statusToneMap: Record<string, Tone> = {
  active: 'emerald',
  completed: 'emerald',
  approved: 'emerald',
  pending: 'amber',
  warning: 'amber',
  expired: 'red',
  rejected: 'red',
  inactive: 'amber',
};

export function EmployeeCard({
  name,
  role,
  avatar: _avatar,
  status,
  certifications = 0,
  activeJobs = 0,
  onClick,
  className,
}: EmployeeCardProps) {
  void _avatar;

  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  const tone = statusToneMap[status.toLowerCase()] ?? 'amber';

  const Inner = (
    <>
      <div className="flex items-center gap-3.5 px-4 sm:px-5 py-3.5 sm:py-4">
        <Avatar initials={initials} />
        <div className="flex-1 min-w-0">
          <div className="text-[14px] font-medium text-white truncate">{name}</div>
          <div className="mt-0.5 text-[11.5px] text-white truncate">{role}</div>
        </div>
        <Pill tone={tone}>{status}</Pill>
      </div>
      <div className="border-t border-white/[0.06] grid grid-cols-2 divide-x divide-white/[0.06]">
        <div className="px-4 sm:px-5 py-3 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">Certs</span>
          <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
            {certifications}
          </span>
        </div>
        <div className="px-4 sm:px-5 py-3 flex items-center justify-between">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">Jobs</span>
          <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
            {activeJobs}
          </span>
        </div>
      </div>
    </>
  );

  const base =
    'group block w-full text-left bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl overflow-hidden touch-manipulation';

  if (!onClick) {
    return <div className={cn(base, className)}>{Inner}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        base,
        'cursor-pointer hover:bg-[hsl(0_0%_15%)] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/60',
        className
      )}
    >
      {Inner}
    </button>
  );
}
