import { LucideIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
}

export function ModuleCard({ number, title, description, icon: _Icon, href }: ModuleCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log(`ModuleCard clicked with href: ${href}`);
    if (href) {
      console.log(`Navigating to: ${href}`);
      navigate(href);
    } else {
      console.log('No href provided - card click ignored');
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="text-left rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 active:bg-white/[0.04] transition-colors touch-manipulation h-full space-y-2"
    >
      <div className="flex items-baseline gap-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 font-mono">
          {number}
        </span>
      </div>
      <h3 className="text-[16px] font-semibold text-white leading-tight">{title}</h3>
      <p className="text-[14px] text-white/70 leading-relaxed line-clamp-4">{description}</p>
    </button>
  );
}
