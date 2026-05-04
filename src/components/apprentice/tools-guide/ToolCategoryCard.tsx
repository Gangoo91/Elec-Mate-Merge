import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ToolCategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  link: string;
  itemCount: number;
}

const ToolCategoryCard = ({ title, description, link, itemCount }: ToolCategoryCardProps) => {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3 h-full flex flex-col">
      <h3 className="text-[16px] font-semibold text-white leading-tight">{title}</h3>
      <p className="text-[14px] text-white/85 leading-relaxed flex-1">{description}</p>
      <div className="flex items-center justify-between pt-2">
        <span className="text-[12px] text-white/55">{itemCount} essential items</span>
        <Button
          asChild
          size="sm"
          className="h-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
        >
          <Link to={link} className="flex items-center gap-2">
            View details
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default ToolCategoryCard;
