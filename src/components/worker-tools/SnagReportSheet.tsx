/**
 * SnagReportSheet
 *
 * Bottom sheet for workers to report quality issues/snags on jobs.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench,
  Camera,
  X,
  Loader2,
  Send,
  MapPin,
  AlertTriangle,
  ChevronDown,
  Clock,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useMyJobs, useSnagReports } from '@/hooks/useWorkerSelfService';

interface SnagReportSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SEVERITY_OPTIONS = [
  { value: 'minor', label: 'Minor', colour: 'text-blue-400', bgColour: 'bg-blue-500/20' },
  { value: 'moderate', label: 'Moderate', colour: 'text-amber-400', bgColour: 'bg-amber-500/20' },
  { value: 'critical', label: 'Critical', colour: 'text-red-400', bgColour: 'bg-red-500/20' },
];

export function SnagReportSheet({ open, onOpenChange }: SnagReportSheetProps) {
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [severity, setSeverity] = useState<string>('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [showRecent, setShowRecent] = useState(false);

  const { data: jobs, isLoading: jobsLoading } = useMyJobs('active');
  const { recentSnags, submitSnag, isSubmitting } = useSnagReports(selectedJobId);

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setSelectedJobId('');
    setSeverity('');
    setDescription('');
    setLocation('');
  };

  const handleSubmit = async () => {
    if (!selectedJobId) {
      toast.error('Please select a job');
      return;
    }
    if (!severity) {
      toast.error('Please select severity');
      return;
    }
    if (!description.trim()) {
      toast.error('Please describe the issue');
      return;
    }

    try {
      await submitSnag({
        jobId: selectedJobId,
        severity,
        description: description.trim(),
        location: location.trim() || undefined,
      });
      toast.success('Snag report submitted');
      resetForm();
    } catch {
      toast.error('Failed to submit snag report');
    }
  };

  const getSeverityBadge = (sev: string) => {
    const option = SEVERITY_OPTIONS.find((o) => o.value === sev);
    if (!option) return null;
    return (
      <Badge className={cn('border-0', option.bgColour, option.colour)}>
        {option.label}
      </Badge>
    );
  };

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden sm:max-w-xl sm:mx-auto">
        <div className="flex flex-col h-full bg-background">
          {/* Header */}
          <SheetHeader className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="w-10" />
              <SheetTitle className="text-lg font-semibold flex-1 text-center">
                Report Snag
              </SheetTitle>
              <SheetDescription className="sr-only">
                Report quality issues or snags on jobs
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

            {/* Severity */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Severity</label>
              <div className="grid grid-cols-3 gap-2">
                {SEVERITY_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSeverity(option.value)}
                    className={cn(
                      'h-12 rounded-xl border transition-all touch-manipulation flex items-center justify-center gap-2',
                      severity === option.value
                        ? cn(option.bgColour, 'border-white/30', option.colour)
                        : 'bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.06]'
                    )}
                  >
                    {option.value === 'critical' && <AlertTriangle className="h-4 w-4" />}
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Describe Issue</label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What is the snag or quality issue? Be specific..."
                className="min-h-[100px] bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow resize-none touch-manipulation"
              />
            </div>

            {/* Location within site */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Location on Site <span className="text-white/40">(optional)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40" />
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Kitchen DB, First floor landing..."
                  className="h-12 pl-10 bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-elec-yellow focus:ring-elec-yellow touch-manipulation"
                />
              </div>
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

            {/* Recent snags */}
            {selectedJobId && recentSnags && recentSnags.length > 0 && (
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => setShowRecent(!showRecent)}
                  className="flex items-center gap-2 text-sm font-medium text-white/80 touch-manipulation"
                >
                  <Clock className="h-4 w-4" />
                  Recent Snags
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
                      {recentSnags.map((snag) => (
                        <div
                          key={snag.id}
                          className="p-3 rounded-lg bg-white/[0.03] border border-white/10"
                        >
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <p className="text-sm text-white line-clamp-2">{snag.description}</p>
                            {getSeverityBadge(snag.severity)}
                          </div>
                          <p className="text-xs text-white/40">
                            {new Date(snag.created_at).toLocaleDateString('en-GB', {
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
              disabled={isSubmitting || !selectedJobId || !severity || !description.trim()}
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
                  Submit Snag Report
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
