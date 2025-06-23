
import { useState } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Plus, Zap } from "lucide-react";
import { useTimeToPortfolio } from "@/hooks/portfolio/useTimeToPortfolio";
import { useUniversalPortfolio } from "@/hooks/portfolio/useUniversalPortfolio";
import TimeEntryToPortfolioDialog from "@/components/apprentice/portfolio/TimeEntryToPortfolioDialog";
import UniversalPortfolioButton from "@/components/apprentice/portfolio/UniversalPortfolioButton";

interface TimeEntryCardProps {
  entry: TimeEntry;
}

const TimeEntryCard = ({ entry }: TimeEntryCardProps) => {
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const { convertTimeEntryToPortfolio, quickConvertTimeEntry, isConverting, categories } = useTimeToPortfolio();
  const { convertTimeEntryToUniversal } = useUniversalPortfolio();

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      weekday: 'short', 
      day: '2-digit', 
      month: 'short'
    });
  };
  
  // Function to determine badge type based on entry properties
  const getBadgeType = () => {
    if (entry.isQuiz) {
      return {
        label: "Quiz",
        color: "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 hover:text-blue-400"
      };
    } else if (entry.isAutomatic) {
      return {
        label: "Automatic",
        color: "bg-elec-yellow/20 text-elec-yellow hover:bg-elec-yellow/30 hover:text-elec-yellow"
      };
    } else if (entry.notes && entry.notes.includes("activity verification")) {
      return {
        label: "Verified",
        color: "bg-green-500/20 text-green-400 hover:bg-green-500/30 hover:text-green-400"
      };
    } else {
      return {
        label: "Manual",
        color: "bg-slate-500/20 text-slate-400 hover:bg-slate-500/30 hover:text-slate-400"
      };
    }
  };

  const handleAddToPortfolio = async (portfolioData: any) => {
    try {
      await convertTimeEntryToPortfolio(entry, portfolioData);
      setShowPortfolioDialog(false);
    } catch (error) {
      // Error handling is done in the hook
    }
  };

  const handleQuickAdd = async () => {
    try {
      await quickConvertTimeEntry(entry);
    } catch (error) {
      // Error handling is done in the hook
    }
  };
  
  const badgeType = getBadgeType();
  const hours = Math.floor(entry.duration / 60);
  const minutes = entry.duration % 60;

  // Convert to universal format for the button
  const universalActivity = convertTimeEntryToUniversal(entry);
  
  return (
    <>
      <Card className={entry.isAutomatic || entry.notes?.includes("verified") || entry.notes?.includes("activity verification") 
        ? "bg-elec-gray/50 overflow-hidden border-elec-yellow/20"
        : "bg-elec-gray/50 overflow-hidden"}>
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-medium">{entry.activity}</h4>
                <Badge className={badgeType.color}>{badgeType.label}</Badge>
              </div>
              
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{entry.notes}</p>
            </div>
            
            <div className="text-right">
              <div className="text-lg font-semibold">
                {hours > 0 ? `${hours}h ` : ""}{minutes}m
              </div>
              <div className="text-xs text-muted-foreground">{formatDate(entry.date)}</div>
            </div>
          </div>
          
          {entry.notes && entry.notes.includes("activity verification") && (
            <div className="mt-2 flex items-center text-xs text-green-400">
              <Activity className="h-3 w-3 mr-1" />
              Activity verified
            </div>
          )}
          
          {entry.isQuiz && entry.score !== undefined && entry.totalQuestions !== undefined && (
            <div className="mt-2 text-xs text-blue-400">
              Score: {entry.score}/{entry.totalQuestions} ({Math.round((entry.score / entry.totalQuestions) * 100)}%)
            </div>
          )}

          {/* Portfolio Integration Buttons */}
          <div className="mt-3 flex justify-between gap-2">
            {/* Quick Add with Smart Features */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleQuickAdd}
              disabled={isConverting}
              className="gap-1 text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10 flex-1"
            >
              <Zap className="h-3 w-3" />
              Quick Add
            </Button>

            {/* Custom Add */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPortfolioDialog(true)}
              className="gap-1 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3 w-3" />
              Custom
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Dialog */}
      <TimeEntryToPortfolioDialog
        timeEntry={entry}
        categories={categories}
        isOpen={showPortfolioDialog}
        onClose={() => setShowPortfolioDialog(false)}
        onSubmit={handleAddToPortfolio}
        isLoading={isConverting}
      />
    </>
  );
};

export default TimeEntryCard;
