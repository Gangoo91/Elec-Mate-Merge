/**
 * MyJobsSheet
 *
 * Bottom sheet for workers to view their assigned jobs.
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Briefcase,
  MapPin,
  Calendar,
  ChevronRight,
  X,
  Loader2,
  Filter,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useMyJobs } from '@/hooks/useWorkerSelfService';

interface MyJobsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type JobFilter = 'active' | 'completed' | 'all';

export function MyJobsSheet({ open, onOpenChange }: MyJobsSheetProps) {
  const [filter, setFilter] = useState<JobFilter>('active');
  const { data: jobs, isLoading } = useMyJobs(filter);

  const handleClose = () => {
    onOpenChange(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge className="bg-green-500/20 text-green-400 border-0">In Progress</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500/20 text-blue-400 border-0">Scheduled</Badge>;
      case 'completed':
        return <Badge className="bg-gray-500/20 text-gray-400 border-0">Completed</Badge>;
      default:
        return <Badge className="bg-amber-500/20 text-amber-400 border-0">{status}</Badge>;
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
                My Jobs
              </SheetTitle>
              <SheetDescription className="sr-only">
                View your assigned jobs and current assignments
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

          {/* Filter tabs */}
          <div className="p-4 border-b border-white/[0.06] flex-shrink-0">
            <div className="flex gap-2">
              {(['active', 'completed', 'all'] as JobFilter[]).map((f) => (
                <Button
                  key={f}
                  variant="ghost"
                  size="sm"
                  onClick={() => setFilter(f)}
                  className={cn(
                    'flex-1 h-9 touch-manipulation capitalize',
                    filter === f
                      ? 'bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/30'
                      : 'bg-white/[0.03] text-white/60 border border-white/10'
                  )}
                >
                  <Filter className="h-3.5 w-3.5 mr-1.5" />
                  {f}
                </Button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-elec-yellow" />
              </div>
            ) : jobs?.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-elec-yellow/10 flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-elec-yellow" />
                </div>
                <p className="text-white/60">No {filter !== 'all' ? filter : ''} jobs found</p>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                {jobs?.map((job) => (
                  <motion.button
                    key={job.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="w-full text-left p-4 rounded-xl bg-white/[0.03] border border-white/10 hover:bg-white/[0.06] transition-colors touch-manipulation"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-semibold text-white truncate">{job.title}</p>
                          {getStatusBadge(job.status)}
                        </div>
                        {job.client_name && (
                          <p className="text-sm text-white/60 mb-2">{job.client_name}</p>
                        )}
                        <div className="flex flex-wrap gap-3 text-xs text-white/50">
                          {job.address && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {job.address}
                            </span>
                          )}
                          {job.scheduled_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(job.scheduled_date).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'short',
                              })}
                            </span>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/30 flex-shrink-0" />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
