import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface SectionNavigationProps {
  backHref?: string;
  backLabel?: string;
  nextHref?: string;
  nextLabel?: string;
}

/**
 * Mobile-optimized navigation for course section pages.
 * Provides touch-friendly 48px+ targets with proper spacing.
 */
export function SectionNavigation({
  backHref = "..",
  backLabel = "Back",
  nextHref,
  nextLabel = "Next Section",
}: SectionNavigationProps) {
  return (
    <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
      <Button
        variant="ghost"
        size="lg"
        className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98] transition-all"
        asChild
      >
        <Link to={backHref}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          {backLabel}
        </Link>
      </Button>

      {nextHref && (
        <Button
          size="lg"
          className="w-full sm:w-auto min-h-[48px] bg-elec-yellow text-[#1a1a1a] hover:bg-elec-yellow/90 font-semibold touch-manipulation active:scale-[0.98] transition-all"
          asChild
        >
          <Link to={nextHref}>
            {nextLabel}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      )}
    </nav>
  );
}

export default SectionNavigation;
