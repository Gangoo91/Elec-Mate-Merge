
import { useState } from "react";
import { TimeEntry } from "@/types/time-tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Save, Trash2, Plus, Zap } from "lucide-react";
import { useTimeToPortfolio } from "@/hooks/portfolio/useTimeToPortfolio";
import { useUniversalPortfolio } from "@/hooks/portfolio/useUniversalPortfolio";
import TimeEntryToPortfolioDialog from "@/components/apprentice/portfolio/TimeEntryToPortfolioDialog";

interface LogbookEntryRowProps {
  entry: TimeEntry;
  onSave: (entryId: string, updatedData: { duration: number, activity: string, notes: string }) => void;
  onDelete: (entryId: string) => void;
}

const LogbookEntryRow = ({ entry, onSave, onDelete }: LogbookEntryRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [editedDuration, setEditedDuration] = useState<number>(entry.duration);
  const [editedActivity, setEditedActivity] = useState<string>(entry.activity);
  const [editedNotes, setEditedNotes] = useState<string>(entry.notes);
  
  const { convertTimeEntryToPortfolio, quickConvertTimeEntry, isConverting, categories } = useTimeToPortfolio();
  const { convertTimeEntryToUniversal } = useUniversalPortfolio();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    onSave(entry.id, {
      duration: editedDuration,
      activity: editedActivity,
      notes: editedNotes
    });
    setIsEditing(false);
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

  return (
    <>
      <tr key={entry.id} className={entry.isAutomatic ? "bg-elec-yellow/5" : ""}>
        {isEditing ? (
          <>
            <td className="p-3">
              <Input 
                value={editedActivity}
                onChange={(e) => setEditedActivity(e.target.value)}
                className="w-full bg-elec-gray"
                disabled={entry.isAutomatic}
              />
            </td>
            <td className="p-3 text-center">
              <Input 
                type="number"
                value={editedDuration}
                onChange={(e) => setEditedDuration(parseInt(e.target.value) || 0)}
                className="w-full bg-elec-gray text-center"
                disabled={entry.isAutomatic}
              />
            </td>
            <td className="p-3 hidden md:table-cell">
              <Input 
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                className="w-full bg-elec-gray"
                disabled={entry.isAutomatic}
              />
            </td>
            <td className="p-3 text-right">
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={handleSaveChanges}
                disabled={entry.isAutomatic}
              >
                <Save className="h-4 w-4" />
              </Button>
            </td>
          </>
        ) : (
          <>
            <td className="p-3">
              {entry.activity}
            </td>
            <td className="p-3 text-center">
              {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
            </td>
            <td className="p-3 hidden md:table-cell">
              <div className="line-clamp-1">{entry.notes}</div>
            </td>
            <td className="p-3 text-right">
              <div className="flex gap-1">
                {!entry.isAutomatic && (
                  <>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={handleEdit}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={() => onDelete(entry.id)}
                      className="text-red-400 hover:text-red-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
                
                {/* Quick Add to Portfolio */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleQuickAdd}
                  disabled={isConverting}
                  className="text-elec-yellow hover:text-elec-yellow hover:bg-elec-yellow/10"
                  title="Quick Add to Portfolio"
                >
                  <Zap className="h-4 w-4" />
                </Button>
                
                {/* Custom Add to Portfolio */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPortfolioDialog(true)}
                  className="text-muted-foreground hover:text-foreground"
                  title="Custom Add to Portfolio"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </td>
          </>
        )}
      </tr>

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

export default LogbookEntryRow;
