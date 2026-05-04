import { useState } from 'react';
import { TimeEntry } from '@/types/time-tracking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, Trash2, Plus, Zap } from 'lucide-react';
import { useTimeToPortfolio } from '@/hooks/portfolio/useTimeToPortfolio';
import { useUniversalPortfolio } from '@/hooks/portfolio/useUniversalPortfolio';
import TimeEntryToPortfolioDialog from '@/components/apprentice/portfolio/TimeEntryToPortfolioDialog';

interface LogbookEntryRowProps {
  entry: TimeEntry;
  onSave: (
    entryId: string,
    updatedData: { duration: number; activity: string; notes: string }
  ) => void;
  onDelete: (entryId: string) => void;
}

const LogbookEntryRow = ({ entry, onSave, onDelete }: LogbookEntryRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPortfolioDialog, setShowPortfolioDialog] = useState(false);
  const [editedDuration, setEditedDuration] = useState<number>(entry.duration);
  const [editedActivity, setEditedActivity] = useState<string>(entry.activity);
  const [editedNotes, setEditedNotes] = useState<string>(entry.notes);

  const { convertTimeEntryToPortfolio, quickConvertTimeEntry, isConverting, categories } =
    useTimeToPortfolio();
  const { convertTimeEntryToUniversal } = useUniversalPortfolio();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSaveChanges = () => {
    onSave(entry.id, {
      duration: editedDuration,
      activity: editedActivity,
      notes: editedNotes,
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
      <tr key={entry.id}>
        {isEditing ? (
          <>
            <td className="p-3">
              <Input
                value={editedActivity}
                onChange={(e) => setEditedActivity(e.target.value)}
                className="w-full h-10 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                disabled={entry.isAutomatic}
              />
            </td>
            <td className="p-3 text-center">
              <Input
                type="number"
                value={editedDuration}
                onChange={(e) => setEditedDuration(parseInt(e.target.value) || 0)}
                className="w-full h-10 text-base text-center touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                disabled={entry.isAutomatic}
              />
            </td>
            <td className="p-3 hidden md:table-cell">
              <Input
                value={editedNotes}
                onChange={(e) => setEditedNotes(e.target.value)}
                className="w-full h-10 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                disabled={entry.isAutomatic}
              />
            </td>
            <td className="p-3 text-right">
              <Button
                size="sm"
                variant="ghost"
                onClick={handleSaveChanges}
                disabled={entry.isAutomatic}
                className="text-white hover:bg-white/[0.05] touch-manipulation"
              >
                <Save className="h-4 w-4" />
              </Button>
            </td>
          </>
        ) : (
          <>
            <td className="p-3 text-[14px] text-white/85">{entry.activity}</td>
            <td className="p-3 text-center text-[13px] text-white font-mono">
              {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
            </td>
            <td className="p-3 hidden md:table-cell text-[13px] text-white/70">
              <div className="line-clamp-1">{entry.notes}</div>
            </td>
            <td className="p-3 text-right">
              <div className="flex gap-1 justify-end">
                {!entry.isAutomatic && (
                  <>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleEdit}
                      className="text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(entry.id)}
                      className="text-red-300 hover:text-red-200 hover:bg-red-500/[0.08] touch-manipulation"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleQuickAdd}
                  disabled={isConverting}
                  className="text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                  title="Quick add to portfolio"
                >
                  <Zap className="h-4 w-4" />
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowPortfolioDialog(true)}
                  className="text-white/55 hover:text-white hover:bg-white/[0.05] touch-manipulation"
                  title="Custom add to portfolio"
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
