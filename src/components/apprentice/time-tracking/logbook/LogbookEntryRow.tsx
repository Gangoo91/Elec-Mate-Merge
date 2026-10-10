import { useState } from 'react';
import { TimeEntry } from '@/types/time-tracking';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Pencil, Save, Trash2 } from 'lucide-react';
import { AddHoursToPortfolio } from '../AddHoursToPortfolio';

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
  const [editedDuration, setEditedDuration] = useState<number>(entry.duration);
  const [editedActivity, setEditedActivity] = useState<string>(entry.activity);
  const [editedNotes, setEditedNotes] = useState<string>(entry.notes);

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
            <td className="p-3 text-[14px] text-white">{entry.activity}</td>
            <td className="p-3 text-center text-[13px] text-white font-mono">
              {Math.floor(entry.duration / 60)}h {entry.duration % 60}m
            </td>
            <td className="p-3 hidden md:table-cell text-[13px] text-white">
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
                      className="text-white hover:text-white hover:bg-white/[0.05] touch-manipulation"
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

                <AddHoursToPortfolio entry={entry} variant="icon" />
              </div>
            </td>
          </>
        )}
      </tr>
    </>
  );
};

export default LogbookEntryRow;
