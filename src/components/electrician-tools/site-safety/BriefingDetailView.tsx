import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  FileText,
  MapPin,
  Calendar,
  Clock,
  Users,
  Camera,
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Share2,
  Download,
  Edit,
  X,
  User,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { BriefingShareSheet } from './briefings';
import { BriefingPDFActions } from './BriefingPDFActions';

const HAZARD_LABELS: Record<string, string> = {
  electrical: 'Electrical',
  fire: 'Fire',
  heights: 'Heights',
  'falling-objects': 'Falling Objects',
  'confined-space': 'Confined Space',
  'manual-handling': 'Manual Handling',
  'hazardous-substances': 'Hazardous Substances',
  noise: 'Noise',
  'wet-slippery': 'Wet/Slippery',
  vehicles: 'Vehicles',
  machinery: 'Machinery',
  asbestos: 'Asbestos',
};

const HAZARD_COLOURS: Record<string, string> = {
  electrical: 'bg-yellow-500/15 text-yellow-400',
  fire: 'bg-red-500/15 text-red-400',
  heights: 'bg-purple-500/15 text-purple-400',
  'falling-objects': 'bg-amber-500/15 text-amber-400',
  'confined-space': 'bg-blue-500/15 text-blue-400',
  'manual-handling': 'bg-emerald-500/15 text-emerald-400',
  'hazardous-substances': 'bg-pink-500/15 text-pink-400',
  noise: 'bg-orange-500/15 text-orange-400',
  'wet-slippery': 'bg-cyan-500/15 text-cyan-400',
  vehicles: 'bg-gray-500/15 text-white',
  machinery: 'bg-slate-500/15 text-white',
  asbestos: 'bg-rose-500/15 text-rose-400',
};

const RISK_STYLES: Record<string, { bg: string; text: string; border: string }> = {
  low: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30' },
  medium: { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30' },
  high: { bg: 'bg-red-500/15', text: 'text-red-400', border: 'border-red-500/30' },
};

const STATUS_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  scheduled: { bg: 'bg-blue-500/15', text: 'text-blue-400', label: 'Scheduled' },
  in_progress: { bg: 'bg-amber-500/15', text: 'text-amber-400', label: 'In Progress' },
  completed: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Completed' },
  cancelled: { bg: 'bg-red-500/15', text: 'text-red-400', label: 'Cancelled' },
  draft: { bg: 'bg-white/10', text: 'text-white', label: 'Draft' },
};

const BRIEFING_TYPE_LABELS: Record<string, string> = {
  'site-work': 'Site Work',
  lfe: 'LFE Report',
  'hse-update': 'HSE Update',
  'business-update': 'Business Update',
  'safety-alert': 'Safety Alert',
  regulatory: 'Regulatory',
  general: 'General',
  'site-induction': 'Site Induction',
  'toolbox-talk': 'Toolbox Talk',
  'electrical-safety': 'Electrical Safety',
  'hot-works': 'Hot Works',
  'near-miss-review': 'Near Miss Review',
};

interface BriefingDetailViewProps {
  briefing: any;
  companyProfile?: any;
  onClose: () => void;
  onEdit: () => void;
}

export function BriefingDetailView({
  briefing,
  companyProfile,
  onClose,
  onEdit,
}: BriefingDetailViewProps) {
  const [showShare, setShowShare] = useState(false);
  const [showPDF, setShowPDF] = useState(false);
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);

  const attendees = Array.isArray(briefing.attendees) ? briefing.attendees : [];
  const signedCount = attendees.filter((a: any) => a.signature).length;
  const totalAttendees = attendees.length;
  const progressPercent = totalAttendees > 0 ? (signedCount / totalAttendees) * 100 : 0;

  const riskStyle = RISK_STYLES[briefing.risk_level || 'medium'] || RISK_STYLES.medium;
  const statusStyle = STATUS_STYLES[briefing.status || 'scheduled'] || STATUS_STYLES.scheduled;
  const hazards: string[] = briefing.identified_hazards || [];
  const photos: any[] = briefing.photos || [];
  const description = briefing.briefing_description || briefing.work_scope || '';
  const typeLabel = BRIEFING_TYPE_LABELS[briefing.briefing_type] || briefing.briefing_type?.replace(/-/g, ' ') || 'General';

  return (
    <div className="min-h-screen bg-elec-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-elec-dark/95 backdrop-blur border-b border-white/10">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onClose}
            className="p-2.5 -ml-2 text-white hover:text-white touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="text-center flex-1 min-w-0 px-2">
            <p className="text-sm font-medium text-white truncate">
              {briefing.briefing_name || briefing.job_name}
            </p>
          </div>
          <Badge className={cn('shrink-0', statusStyle.bg, statusStyle.text, 'border-0 text-xs')}>
            {statusStyle.label}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pb-28 space-y-4">
        {/* Info Card */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
          <div className="px-4 pt-4 pb-3 border-b border-white/[0.06]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-elec-yellow/80 mb-1.5">
                  <FileText className="h-3 w-3" />
                  {typeLabel} Briefing
                </span>
                <h2 className="text-lg font-bold text-white leading-tight">
                  {briefing.briefing_name || briefing.job_name}
                </h2>
              </div>
              {briefing.risk_level && (
                <div
                  className={cn(
                    'flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold shrink-0 border',
                    riskStyle.bg,
                    riskStyle.text,
                    riskStyle.border
                  )}
                >
                  <AlertTriangle className="h-3 w-3" />
                  {briefing.risk_level.charAt(0).toUpperCase() + briefing.risk_level.slice(1)} Risk
                </div>
              )}
            </div>
          </div>

          <div className="px-4 py-3 space-y-2.5">
            <div className="flex items-center gap-3 text-sm">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                <MapPin className="h-3.5 w-3.5 text-white" />
              </div>
              <span className="text-white truncate">{briefing.location}</span>
            </div>
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                  <Calendar className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white whitespace-nowrap">
                  {new Date(briefing.briefing_date + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
              </div>
              <span className="text-white hidden sm:inline">|</span>
              <div className="flex items-center gap-3 shrink-0">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                  <Clock className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white whitespace-nowrap">{briefing.briefing_time}</span>
              </div>
            </div>
            {(briefing.created_by_name || briefing.conductor_name) && (
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-white/[0.06]">
                  <User className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="text-white truncate">
                  {briefing.created_by_name || briefing.conductor_name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Content/Description */}
        {description && (
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Briefing Content
              </span>
            </div>
            <p className="text-sm text-white whitespace-pre-wrap leading-relaxed">
              {description}
            </p>
          </div>
        )}

        {/* Hazards */}
        {hazards.length > 0 && (
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShieldAlert className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Identified Hazards
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hazards.map((h: string) => (
                <span
                  key={h}
                  className={cn(
                    'px-2.5 py-1 rounded-full text-xs font-medium',
                    HAZARD_COLOURS[h] || 'bg-gray-500/15 text-white'
                  )}
                >
                  {HAZARD_LABELS[h] || h.replace(/^custom-/, '').replace(/-/g, ' ')}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Photos */}
        {photos.length > 0 && (
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Camera className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Site Photos ({photos.length})
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {photos.map((photo: any, idx: number) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPreviewPhoto(photo.url)}
                  className="aspect-square rounded-xl overflow-hidden border border-white/10 touch-manipulation"
                >
                  <img
                    src={photo.url}
                    alt={`Photo ${idx + 1}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sign-Off Register */}
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-3.5 w-3.5 text-white" />
              <span className="text-xs font-semibold text-white uppercase tracking-wider">
                Sign-Off Register
              </span>
            </div>
            <span
              className={cn(
                'text-xs font-semibold px-2.5 py-1 rounded-full',
                totalAttendees > 0 && signedCount === totalAttendees
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : totalAttendees > 0
                    ? 'bg-amber-500/20 text-amber-400'
                    : 'bg-white/10 text-white'
              )}
            >
              {signedCount} of {totalAttendees} signed
            </span>
          </div>

          {/* Progress bar */}
          {totalAttendees > 0 && (
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className={cn(
                  'h-full rounded-full',
                  signedCount === totalAttendees ? 'bg-emerald-400' : 'bg-amber-400'
                )}
              />
            </div>
          )}

          {/* Attendee rows */}
          {attendees.length > 0 ? (
            <div className="space-y-1.5">
              {attendees.map((attendee: any, idx: number) => {
                const isSigned = !!attendee.signature;
                return (
                  <div
                    key={idx}
                    className={cn(
                      'flex items-center gap-3 p-2.5 rounded-xl border',
                      isSigned
                        ? 'bg-emerald-500/5 border-emerald-500/10'
                        : 'bg-white/[0.02] border-white/[0.06]'
                    )}
                  >
                    <div
                      className={cn(
                        'flex items-center justify-center w-6 h-6 rounded-md shrink-0 text-xs font-bold',
                        isSigned
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-white/[0.06] text-white'
                      )}
                    >
                      {isSigned ? <CheckCircle className="h-3.5 w-3.5" /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={cn(
                          'text-sm font-medium truncate',
                          isSigned ? 'text-emerald-300/80' : 'text-white'
                        )}
                      >
                        {attendee.name}
                      </p>
                      {attendee.role && (
                        <p className="text-xs text-white truncate">{attendee.role}</p>
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs shrink-0',
                        isSigned ? 'text-emerald-400/50' : 'text-white'
                      )}
                    >
                      {isSigned ? 'Signed' : 'Pending'}
                    </span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-4">
              <Users className="h-6 w-6 text-white mx-auto mb-2" />
              <p className="text-xs text-white">No attendees added</p>
            </div>
          )}

          {/* Share for signing button */}
          {signedCount < totalAttendees && totalAttendees > 0 && (
            <Button
              type="button"
              onClick={() => setShowShare(true)}
              className="w-full h-11 bg-elec-yellow/10 text-elec-yellow border border-elec-yellow/20 hover:bg-elec-yellow/20 touch-manipulation"
              variant="ghost"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share for Signing
            </Button>
          )}
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-elec-dark/95 backdrop-blur border-t border-white/10 safe-area-pb">
        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onEdit}
            className="flex-1 h-14 border-white/20 text-white touch-manipulation"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowShare(true)}
            className="flex-1 h-14 border-white/20 text-white touch-manipulation"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPDF(!showPDF)}
            className="flex-1 h-14 border-white/20 text-white touch-manipulation"
          >
            <Download className="h-4 w-4 mr-2" />
            PDF
          </Button>
        </div>
      </div>

      {/* PDF Actions (inline below bottom bar) */}
      <AnimatePresence>
        {showPDF && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 right-4 z-40 p-4 rounded-2xl bg-[#1e1e1e] border border-white/10 shadow-xl"
          >
            <BriefingPDFActions briefing={briefing} companyProfile={companyProfile} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Sheet */}
      <AnimatePresence>
        {showShare && (
          <BriefingShareSheet
            briefingId={briefing.id}
            briefingName={briefing.briefing_name || briefing.job_name}
            onClose={() => setShowShare(false)}
          />
        )}
      </AnimatePresence>

      {/* Full-screen photo preview */}
      <AnimatePresence>
        {previewPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setPreviewPhoto(null)}
          >
            <button
              type="button"
              onClick={() => setPreviewPhoto(null)}
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/10 text-white hover:bg-white/20 touch-manipulation"
            >
              <X className="h-5 w-5" />
            </button>
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              src={previewPhoto}
              alt="Preview"
              className="max-w-full max-h-[85vh] object-contain rounded-xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
