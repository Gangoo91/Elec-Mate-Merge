import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCustomerActivity, ActivityType } from '@/hooks/inspection/useCustomerActivity';
import { StickyNote, Phone, Mail, MapPin, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customerId: string;
}

const activityTypes: { value: ActivityType; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'note', label: 'Note', icon: StickyNote, color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { value: 'call', label: 'Call', icon: Phone, color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { value: 'email', label: 'Email', icon: Mail, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
  { value: 'visit', label: 'Site Visit', icon: MapPin, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
];

export const QuickNoteDialog = ({ open, onOpenChange, customerId }: QuickNoteDialogProps) => {
  const [selectedType, setSelectedType] = useState<ActivityType>('note');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { logNote, logCall, logEmail, logVisit, isLogging } = useCustomerActivity(customerId);

  const handleSave = async () => {
    if (!title.trim()) return;

    const { sanitizeTextInput } = await import('@/utils/inputSanitization');
    const sanitizedTitle = sanitizeTextInput(title);
    const sanitizedDescription = description ? sanitizeTextInput(description) : undefined;

    let success = false;
    switch (selectedType) {
      case 'note':
        success = await logNote(sanitizedTitle, sanitizedDescription);
        break;
      case 'call':
        success = await logCall(sanitizedTitle, sanitizedDescription);
        break;
      case 'email':
        success = await logEmail(sanitizedTitle, sanitizedDescription);
        break;
      case 'visit':
        success = await logVisit(sanitizedTitle, sanitizedDescription);
        break;
    }

    if (success) {
      setTitle('');
      setDescription('');
      setSelectedType('note');
      onOpenChange(false);
    }
  };

  const getTitlePlaceholder = () => {
    switch (selectedType) {
      case 'note':
        return 'e.g., Discussed quote for rewire';
      case 'call':
        return 'e.g., Called to confirm appointment';
      case 'email':
        return 'e.g., Sent invoice for completed work';
      case 'visit':
        return 'e.g., Initial site survey completed';
      default:
        return 'Enter a brief title';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card border-border p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">
            Log Activity
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Record a note, call, email, or site visit for this customer.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          {/* Activity Type Selection */}
          <div className="space-y-2">
            <Label className="text-foreground">Activity Type</Label>
            <div className="grid grid-cols-4 gap-2">
              {activityTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    'flex flex-col items-center gap-1 p-3 rounded-lg border transition-all touch-manipulation',
                    selectedType === type.value
                      ? type.color
                      : 'bg-background border-border hover:border-border/80'
                  )}
                >
                  <type.icon className="h-5 w-5" />
                  <span className="text-xs font-medium">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-foreground">
              Title <span className="text-red-400">*</span>
            </Label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-11 px-3 rounded-md bg-background border border-border text-foreground touch-manipulation focus:outline-none focus:ring-2 focus:ring-elec-yellow/20 focus:border-elec-yellow"
              placeholder={getTitlePlaceholder()}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-foreground">
              Details (optional)
            </Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="bg-background border-border text-foreground resize-none touch-manipulation min-h-[100px]"
              placeholder="Add any additional details..."
              rows={4}
            />
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              disabled={isLogging}
              className="w-full sm:w-auto h-11 touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="accent"
              onClick={handleSave}
              disabled={isLogging || !title.trim()}
              className="w-full sm:w-auto h-11 touch-manipulation"
            >
              {isLogging ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Activity'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
