
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";
import { useUniversalPortfolio, UniversalActivityData } from "@/hooks/portfolio/useUniversalPortfolio";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UniversalPortfolioButtonProps {
  activityData: UniversalActivityData;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  showSmartLabel?: boolean;
  className?: string;
}

const UniversalPortfolioButton = ({
  activityData,
  variant = "outline",
  size = "sm",
  showSmartLabel = true,
  className = ""
}: UniversalPortfolioButtonProps) => {
  const { createUniversalPortfolioEntry, isProcessing } = useUniversalPortfolio();
  const [hasAdded, setHasAdded] = useState(false);

  const handleAddToPortfolio = async () => {
    try {
      await createUniversalPortfolioEntry(activityData);
      setHasAdded(true);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const buttonContent = (
    <Button
      size={size}
      variant={hasAdded ? "default" : variant}
      onClick={handleAddToPortfolio}
      disabled={isProcessing || hasAdded}
      className={`gap-1 ${hasAdded ? 'text-green-400 border-green-400' : 'text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10'} ${className}`}
    >
      {hasAdded ? (
        <>
          <Plus className="h-3 w-3" />
          Added to Portfolio
        </>
      ) : (
        <>
          <Plus className="h-3 w-3" />
          Add to Portfolio
          {showSmartLabel && <Sparkles className="h-3 w-3 text-elec-yellow" />}
        </>
      )}
    </Button>
  );

  if (showSmartLabel) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {buttonContent}
          </TooltipTrigger>
          <TooltipContent>
            <p>Automatically categorises and adds smart skills</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
};

export default UniversalPortfolioButton;
