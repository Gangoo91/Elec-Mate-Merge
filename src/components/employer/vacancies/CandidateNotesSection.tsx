import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { textareaClass } from '@/components/employer/editorial';
import { cn } from '@/lib/utils';
import {
  panel,
  PanelTitle,
  PlainEmpty,
  rowBtnPrimary,
  rowBtnSecondary,
} from '@/components/employer/pageParts/PageParts';

interface CandidateNotesSectionProps {
  notes: string | null;
  updatedAt?: string;
  onSave: (notes: string) => Promise<void>;
  isLoading?: boolean;
}

export function CandidateNotesSection({
  notes,
  updatedAt,
  onSave,
  isLoading = false,
}: CandidateNotesSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNotes, setEditedNotes] = useState(notes || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedNotes);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save notes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedNotes(notes || '');
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <section>
      <PanelTitle
        title="Private notes"
        meta="Only your firm sees these"
        action={!isEditing ? (notes ? 'Edit' : 'Add note') : undefined}
        onAction={!isEditing ? () => setIsEditing(true) : undefined}
      />
      {isEditing ? (
        <div className="space-y-3">
          <Textarea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            placeholder="Add private notes about this candidate (only you and your team see them)"
            className={`${textareaClass} min-h-[150px]`}
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isSaving}
              className={rowBtnSecondary}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isLoading}
              className={rowBtnPrimary}
            >
              {isSaving ? 'Saving…' : 'Save notes'}
            </button>
          </div>
        </div>
      ) : notes ? (
        <div className={cn(panel, 'px-4 py-3 sm:px-5')}>
          <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-white">{notes}</p>
          {updatedAt && (
            <p className="mt-2 text-[12.5px] text-white">Last updated {formatDate(updatedAt)}</p>
          )}
        </div>
      ) : (
        <PlainEmpty
          text="No notes yet. Who said what on the phone belongs here."
          action="Add note"
          onAction={() => setIsEditing(true)}
        />
      )}
    </section>
  );
}
