import { motion } from "framer-motion";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  AlertTriangle,
  User,
  MapPin,
  Calendar,
  X,
  Download,
  Loader2,
} from "lucide-react";
import type { SafetyObservation } from "@/hooks/useSafetyObservations";
import { useSafetyPDFExport } from "@/hooks/useSafetyPDFExport";

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

  if (!observation) return null;

  const isPositive = observation.observation_type === "positive";

  const formattedDate = new Date(observation.created_at).toLocaleDateString(
    "en-GB",
    {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const formattedTime = new Date(observation.created_at).toLocaleTimeString(
    "en-GB",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <Sheet open={open} onOpenChange={(v) => !v && onClose()}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
      >
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
              {/* Type badge + Category badge */}
              <div className="flex items-center gap-2 flex-wrap">
                <Badge
                  className={`text-sm px-3 py-1 ${
                    isPositive
                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                      : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    {isPositive ? (
                      <ThumbsUp className="w-4 h-4" />
                    ) : (
                      <AlertTriangle className="w-4 h-4" />
                    )}
                    {isPositive ? "Positive" : "Improvement Needed"}
                  </span>
                </Badge>
                <Badge className="bg-white/10 text-white border-white/20 text-sm px-3 py-1">
                  {observation.category}
                </Badge>
              </div>

              {/* Full description */}
              <div>
                <h3 className="text-sm font-semibold text-white mb-2">
                  Description
                </h3>
                <p className="text-base text-white leading-relaxed">
                  {observation.description}
                </p>
              </div>

              {/* Details card */}
              {(observation.person_observed ||
                observation.location ||
                observation.created_at) && (
                <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-3">
                  {observation.person_observed && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-white font-medium">
                          Person Observed
                        </p>
                        <p className="text-sm text-white">
                          {observation.person_observed}
                        </p>
                      </div>
                    </div>
                  )}

                  {observation.location && (
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-white font-medium">
                          Location
                        </p>
                        <p className="text-sm text-white">
                          {observation.location}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-elec-yellow/20 border border-elec-yellow/30 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-4 h-4 text-elec-yellow" />
                    </div>
                    <div>
                      <p className="text-xs text-white font-medium">
                        Date & Time
                      </p>
                      <p className="text-sm text-white">
                        {formattedDate} at {formattedTime}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Photo */}
              {observation.photo_url && (
                <div>
                  <h3 className="text-sm font-semibold text-white mb-2">
                    Photo
                  </h3>
                  <div className="rounded-xl overflow-hidden border border-white/10">
                    <img
                      src={observation.photo_url}
                      alt="Observation photo"
                      className="w-full h-auto object-cover max-h-[300px]"
                    />
                  </div>
                </div>
              )}

              {/* Export PDF */}
              <button
                onClick={() => exportPDF("observation", observation.id)}
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
