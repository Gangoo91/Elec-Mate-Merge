/**
 * ProgressNotesSheet
 *
 * Bottom sheet for workers to submit daily progress notes for jobs.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Camera,
  X,
  Loader2,
  Send,
  Clock,
  ChevronDown,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMyJobs, useProgressNotes } from '@/hooks/useWorkerSelfService';

interface ProgressNotesSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProgressNotesSheet({ open, onOpenChange }: ProgressNotesSheetProps) {
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [note, setNote] = useState('');
  const [showRecent, setShowRecent] = useState(false);

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const { recentNotes, submitNote, isSubmitting } = useProgressNotes(selectedJobId);

  const handleClose = () => {
    onOpenChange(false);
    setNote('');
    setSelectedJobId('');
  };

  const handleSubmit = async () => {
    if (!selectedJobId) {
      toast.error('Please select a job');
      return;
    }
    if (!note.trim()) {
      toast.error('Please enter a progress note');
      return;
    }

    try {
      await submitNote({
        jobId: selectedJobId,
        content: note.trim(),
      });
      toast.success('Progress note submitted');
      setNote('');
    } catch {
      toast.error('Failed to submit note');
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-lg sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                Progress Notes
              </SheetTitle>
              <SheetDescription className="sr-only">
                Submit daily progress notes for your assigned jobs
              </SheetDescription>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="h-10 w-10 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Job selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Select Job</label>
              <Select
                value={selectedJobId}
                onValueChange={setSelectedJobId}
                disabled={jobsLoading}
              >
                <SelectTrigger className="h-12 bg-white/[0.03] border-white/10 text-white focus:border-elec-yellow focus:ring-elec-yellow">
                  <SelectValue placeholder="Choose a job..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-white/10">
                  {jobs?.map((job) => (
                    <SelectItem
                      key={job.id}
                      value={job.id}
                      className="text-white focus:bg-white/10 focus:text-white"
                    >
                      {job.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Note input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Progress Note</label>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Describe work completed today, any issues encountered, materials used..."
                className="min-h-[120px] bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow resize-none touch-manipulation"
              />
              <p className="text-xs text-white/40 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                Will be timestamped automatically
              </p>
            </div>

            {/* Photo upload placeholder */}
            <Button
              variant="outline"
              className="w-full h-12 bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06] hover:text-white touch-manipulation"
              disabled
            >
              <Camera className="h-5 w-5 mr-2" />
              Add Photo (Coming Soon)
            </Button>

            {/* Recent notes */}
            {selectedJobId && recentNotes && recentNotes.length > 0 && (
              <div className="space-y-2">
                <button
                  onClick={() => setShowRecent(!showRecent)}
                  className="flex items-center gap-2 text-sm font-medium text-white/80 touch-manipulation"
                >
                  <FileText className="h-4 w-4" />
                  Recent Notes
                  <ChevronDown className={cn(
                    'h-4 w-4 transition-transform',
                    showRecent && 'rotate-180'
                  )} />
                </button>

                <AnimatePresence>
                  {showRecent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 overflow-hidden"
                    >
                      {recentNotes.map((n) => (
                        <div
                          key={n.id}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/10"
                        >
                          <p className="text-sm text-white/80">{n.content}</p>
                          <p className="text-xs text-white/40 mt-2">
                            {new Date(n.created_at).toLocaleString('en-GB', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.06] p-4 flex-shrink-0">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedJobId || !note.trim()}
              className="w-full h-12 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold touch-manipulation"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Note
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
