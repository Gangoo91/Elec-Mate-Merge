import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Save, X, StickyNote, Clock } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import {
  textareaClass,
  FormCard,
  PrimaryButton,
  SecondaryButton,
  TextAction,
} from '@/components/employer/editorial';

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
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-elec-yellow" />
          <h3 className="font-semibold text-white">Internal Notes</h3>
        </div>
        {!isEditing && (
          <TextAction onClick={() => setIsEditing(true)}>
            {notes ? 'Edit' : 'Add Note'} →
          </TextAction>
        )}
      </div>

      {/* Notes content */}
      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <Textarea
            value={editedNotes}
            onChange={(e) => setEditedNotes(e.target.value)}
            placeholder="Add private notes about this candidate... (only visible to you and your team)"
            className={`${textareaClass} min-h-[150px]`}
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <SecondaryButton onClick={handleCancel} disabled={isSaving}>
              <X className="h-4 w-4 mr-1.5" />
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-1.5" />
              {isSaving ? 'Saving...' : 'Save Notes'}
            </PrimaryButton>
          </div>
        </motion.div>
      ) : notes ? (
        <FormCard>
          <p className="text-[13px] text-white whitespace-pre-wrap leading-relaxed">
            {notes}
          </p>
          {updatedAt && (
            <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-white/[0.06]">
              <Clock className="h-3 w-3 text-white" />
              <span className="text-[11px] text-white">
                Last updated: {formatDate(updatedAt)}
              </span>
            </div>
          )}
        </FormCard>
      ) : (
        <FormCard className="text-center">
          <StickyNote className="h-10 w-10 mx-auto text-white mb-3" />
          <p className="text-[13px] text-white mb-3">
            No notes yet. Add private notes about this candidate.
          </p>
          <SecondaryButton onClick={() => setIsEditing(true)} size="sm">
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            Add Note
          </SecondaryButton>
        </FormCard>
      )}

      {/* Privacy notice */}
      <p className="text-[11px] text-white text-center">
        Notes are private and only visible to your organisation
      </p>
    </div>
  );
}
