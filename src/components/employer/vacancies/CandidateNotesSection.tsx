import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Save, X, StickyNote, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
  const [editedNotes, setEditedNotes] = useState(notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await onSave(editedNotes);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to save notes:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setEditedNotes(notes || "");
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <StickyNote className="h-4 w-4 text-amber-400" />
          <h3 className="font-semibold text-foreground">Internal Notes</h3>
        </div>
        {!isEditing && (
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-xs"
            onClick={() => setIsEditing(true)}
          >
            <Pencil className="h-3.5 w-3.5 mr-1.5" />
            {notes ? "Edit" : "Add Note"}
          </Button>
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
            className={cn(
              "min-h-[150px] text-base resize-none",
              "bg-muted/50 border-border",
              "focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500/50",
              "touch-manipulation"
            )}
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              className="h-10 px-4"
              onClick={handleCancel}
              disabled={isSaving}
            >
              <X className="h-4 w-4 mr-1.5" />
              Cancel
            </Button>
            <Button
              size="sm"
              className="h-10 px-4 bg-amber-500 hover:bg-amber-500/90 text-black"
              onClick={handleSave}
              disabled={isSaving}
            >
              <Save className="h-4 w-4 mr-1.5" />
              {isSaving ? "Saving..." : "Save Notes"}
            </Button>
          </div>
        </motion.div>
      ) : notes ? (
        <Card className="bg-amber-500/5 border-amber-500/20">
          <CardContent className="p-4">
            <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
              {notes}
            </p>
            {updatedAt && (
              <div className="flex items-center gap-1.5 mt-3 pt-3 border-t border-amber-500/10">
                <Clock className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  Last updated: {formatDate(updatedAt)}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-muted/30 border-dashed border-muted-foreground/20">
          <CardContent className="p-6 text-center">
            <StickyNote className="h-10 w-10 mx-auto text-muted-foreground/40 mb-3" />
            <p className="text-sm text-muted-foreground mb-3">
              No notes yet. Add private notes about this candidate.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="h-9"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Add Note
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Privacy notice */}
      <p className="text-xs text-muted-foreground text-center">
        Notes are private and only visible to your organisation
      </p>
    </div>
  );
}
