import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CareerPageHeaderProps {
  activeSection: string | null;
  onBackToSections: () => void;
}

const CareerPageHeader = ({ activeSection, onBackToSections }: CareerPageHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Apprentice
        </span>
        <h1 className="text-[24px] sm:text-[28px] font-bold tracking-tight text-white leading-tight">
          Career progression
        </h1>
        <p className="text-[14px] text-white/70 leading-relaxed">
          Resources and guidance for advancing your electrical career.
        </p>
      </div>
      {activeSection ? (
        <Button
          variant="outline"
          className="h-11 border-white/15 text-white hover:bg-white/[0.05] flex items-center gap-2 w-full sm:w-auto touch-manipulation"
          onClick={onBackToSections}
        >
          <ArrowLeft className="h-4 w-4" /> Back to sections
        </Button>
      ) : (
        <Link to="/apprentice/hub" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-11 border-white/15 text-white hover:bg-white/[0.05] flex items-center gap-2 w-full touch-manipulation"
          >
            <ArrowLeft className="h-4 w-4" /> Back to apprentice hub
          </Button>
        </Link>
      )}
    </div>
  );
};

export default CareerPageHeader;
