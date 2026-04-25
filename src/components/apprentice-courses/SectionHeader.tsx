import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SectionHeaderProps {
  backHref?: string;
  backLabel?: string;
}

export function SectionHeader({ backHref = '..', backLabel = 'Back' }: SectionHeaderProps) {
  return (
    <div className="border-b border-white/[0.06] sticky top-0 z-50 bg-[hsl(0_0%_8%)]/95 backdrop-blur-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-3">
        <Link
          to={backHref}
          className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
        >
          <ArrowLeft className="h-4 w-4" />
          {backLabel}
        </Link>
      </div>
    </div>
  );
}

export default SectionHeader;
