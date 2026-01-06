import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
  backHref?: string;
  backLabel?: string;
}

/**
 * Mobile-optimized sticky header for course section pages.
 * Provides touch-friendly back button with 48px+ target.
 */
export function SectionHeader({
  backHref = "..",
  backLabel = "Back",
}: SectionHeaderProps) {
  return (
    <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
      <div className="px-4 sm:px-6 py-2">
        <Button
          variant="ghost"
          size="lg"
          className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98] transition-all"
          asChild
        >
          <Link to={backHref}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {backLabel}
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default SectionHeader;
