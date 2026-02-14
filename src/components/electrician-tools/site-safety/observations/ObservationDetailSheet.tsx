import { motion } from 'framer-motion';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ThumbsUp,
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  X,
  Download,
  Loader2,
  CheckCircle2,
  Clock,
  CircleDot,
  Shield,
  ArrowUpRight,
} from 'lucide-react';
import type { SafetyObservation } from '@/hooks/useSafetyObservations';
import { useUpdateObservation } from '@/hooks/useSafetyObservations';
import { useSafetyPDFExport } from '@/hooks/useSafetyPDFExport';
import { AuditTimeline } from '../common/AuditTimeline';

const STATUS_CONFIG: Record<
  string,
  { label: string; colour: string; bg: string; icon: React.ElementType }
> = {
  open: {
    label: 'Open',
    colour: 'text-amber-400',
    bg: 'bg-amber-500/15 border-amber-500/30',
    icon: CircleDot,
  },
  in_progress: {
    label: 'In Progress',
    colour: 'text-blue-400',
    bg: 'bg-blue-500/15 border-blue-500/30',
    icon: Clock,
  },
  closed: {
    label: 'Closed',
    colour: 'text-green-400',
    bg: 'bg-green-500/15 border-green-500/30',
    icon: CheckCircle2,
  },
};

interface ObservationDetailSheetProps {
  observation: SafetyObservation | null;
  open: boolean;
  onClose: () => void;
}

export function ObservationDetailSheet({
  observation,
  open,
  onClose,
}: ObservationDetailSheetProps) {
  const { exportPDF, isExporting, exportingId } = useSafetyPDFExport();
  const updateObservation = useUpdateObservation();

  if (!observation) return null;

  const isPositive = observation.observation_type === 'positive';
  const currentStatus = observation.status || 'open';
  const statusConf = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.open;
  const StatusIcon = statusConf.icon;
  const showFollowUp = !isPositive;

  const formattedDate = new Date(observation.created_at).toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const formattedTime = new Date(observation.created_at).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const handleStatusChange = (newStatus: 'open' | 'in_progress' | 'closed') => {
    updateObservation.mutate({
      id: observation.id,
      status: newStatus,
      ...(newStatus === 'closed' ? { completed_date: new Date().toISOString().split('T')[0] } : {}),
    });
  };

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Handle bar */}
          <div className="pt-3 pb-2 flex justify-center">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Close button */}
          <div className="flex items-center justify-end px-4 pb-2">
            <button
              onClick={onClose}
              className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 active:bg-white/20 transition-colors touch-manipulation"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-white" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto px-5 pb-[env(safe-area-inset-bottom)]">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              {/* Type badge + Category badge + Status badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  className={`text-sm px-3 py-1 ${
                    isPositive
                      ? 'bg-green-500/20 text-green-400 border-green-500/30'
                      : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isPositive ? (
                      <ThumbsUp className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    {isPositive ? 'Positive' : 'Improvement Needed'}
                  </span>
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 text-sm px-3 py-1">
                  {observation.category}
                </Badge>
                {observation.severity && (
                  <Badge
                    className={`text-xs px-2 py-0.5 ${
                      observation.severity === 'high'
                        ? 'bg-red-500/20 text-red-400 border-red-500/30'
                        : observation.severity === 'medium'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : 'bg-green-500/20 text-green-400 border-green-500/30'
                    }`}
                  >
                    {observation.severity.charAt(0).toUpperCase() + observation.severity.slice(1)}{' '}
                    Severity
                  </Badge>
                )}
                {showFollowUp && (
                  <Badge
                    className={`${statusConf.bg} border ${statusConf.colour} text-xs flex items-center gap-1`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {statusConf.label}
                  </Badge>
                )}
              </div>

              {/* Full description */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">Description</h3>
                <p className="text-base text-white leading-relaxed">{observation.description}</p>
              </div>

              {/* Details card */}
              {(observation.person_observed || observation.location || observation.created_at) && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
                  {observation.person_observed && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-white font-medium">Person Observed</p>
                        <p className="text-sm text-white">{observation.person_observed}</p>
                      </div>
                    </div>
                  )}

                  {observation.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-white font-medium">Location</p>
                        <p className="text-sm text-white">{observation.location}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-elec-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white font-medium">Date & Time</p>
                      <p className="text-sm text-white">
                        {formattedDate} at {formattedTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Follow-up status section — improvement_needed only */}
              {showFollowUp && (
                <div className="rounded-xl bg-white/5 border border-elec-yellow/20 p-4 space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-elec-yellow" />
                    <h3 className="text-sm font-semibold text-white">Follow-Up</h3>
                  </div>

                  {observation.follow_up_required && (
                    <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                      <AlertTriangle className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                      <span className="text-xs text-white font-medium">Follow-up required</span>
                    </div>
                  )}

                  {observation.assigned_to && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-white" />
                      <span className="text-white">Assigned to: {observation.assigned_to}</span>
                    </div>
                  )}

                  {observation.due_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-white" />
                      <span className="text-white">
                        Due: {new Date(observation.due_date).toLocaleDateString('en-GB')}
                      </span>
                      {new Date(observation.due_date) < new Date() &&
                        currentStatus !== 'closed' && (
                          <Badge className="bg-red-500/15 text-red-400 border-red-500/30 text-[10px]">
                            Overdue
                          </Badge>
                        )}
                    </div>
                  )}

                  {observation.completed_date && (
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span className="text-white">
                        Completed:{' '}
                        {new Date(observation.completed_date).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  )}

                  {/* Status action buttons */}
                  {currentStatus !== 'closed' && (
                    <div className="flex gap-2 pt-1">
                      {currentStatus === 'open' && (
                        <Button
                          onClick={() => handleStatusChange('in_progress')}
                          disabled={updateObservation.isPending}
                          className="flex-1 h-11 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl touch-manipulation"
                        >
                          {updateObservation.isPending ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Clock className="h-4 w-4 mr-2" />
                          )}
                          Start Action
                        </Button>
                      )}
                      {currentStatus === 'in_progress' && (
                        <>
                          <Button
                            onClick={() => handleStatusChange('closed')}
                            disabled={updateObservation.isPending}
                            className="flex-1 h-11 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl touch-manipulation"
                          >
                            {updateObservation.isPending ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <CheckCircle2 className="h-4 w-4 mr-2" />
                            )}
                            Close
                          </Button>
                          <Button
                            onClick={() => handleStatusChange('open')}
                            disabled={updateObservation.isPending}
                            variant="outline"
                            className="h-11 border-white/20 text-white rounded-xl touch-manipulation"
                          >
                            Reopen
                          </Button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Photos */}
              {observation.photos && observation.photos.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">Photos</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {observation.photos.map((url, index) => (
                      <div
                        key={index}
                        className="rounded-xl overflow-hidden border border-white/10"
                      >
                        <img
                          src={url}
                          alt={`Observation photo ${index + 1}`}
                          className="w-full h-auto object-cover max-h-[300px]"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Escalate to Near Miss — improvement_needed only */}
              {showFollowUp && (
                <button
                  onClick={() => {
                    const escalationData = {
                      category: observation.category,
                      description: observation.description,
                      location: observation.location || '',
                      severity:
                        observation.severity === 'high'
                          ? 'critical'
                          : observation.severity === 'medium'
                            ? 'medium'
                            : 'low',
                      source_observation_id: observation.id,
                    };
                    localStorage.setItem('escalate-to-near-miss', JSON.stringify(escalationData));
                    onClose();
                    window.dispatchEvent(
                      new CustomEvent('navigate-safety-tool', { detail: 'near-miss' })
                    );
                  }}
                  className="w-full h-11 px-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all"
                >
                  <ArrowUpRight className="h-4 w-4" />
                  Escalate to Near Miss Report
                </button>
              )}

              {/* Audit Trail */}
              <AuditTimeline recordType="observation" recordId={observation.id} />

              {/* Export PDF */}
              <button
                onClick={() => exportPDF('observation', observation.id)}
                disabled={isExporting && exportingId === observation.id}
                className="w-full h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-white text-sm font-medium flex items-center justify-center gap-2 touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isExporting && exportingId === observation.id ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Export PDF
              </button>

              {/* Bottom spacer */}
              <div className="h-6" />
            </motion.div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default ObservationDetailSheet;
