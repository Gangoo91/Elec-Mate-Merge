import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ThumbsUp,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  Clock,
  Eye,
} from "lucide-react";
import type { SafetyObservation } from "@/hooks/useSafetyObservations";
import { ObservationDetailSheet } from "./ObservationDetailSheet";

interface ObservationFeedProps {
  observations: SafetyObservation[];
}

function groupByDate(
  observations: SafetyObservation[]
): Record<string, SafetyObservation[]> {
  const groups: Record<string, SafetyObservation[]> = {};

  for (const obs of observations) {
    const dateKey = new Date(obs.created_at).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!groups[dateKey]) groups[dateKey] = [];
    groups[dateKey].push(obs);
  }

  return groups;
}

function ObservationItem({
  observation,
  onViewDetails,
}: {
  observation: SafetyObservation;
  onViewDetails: (obs: SafetyObservation) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const isPositive = observation.observation_type === "positive";

  return (
    <motion.button
      onClick={() => setExpanded((prev) => !prev)}
      className="w-full text-left p-4 rounded-xl bg-white/5 border border-white/10 touch-manipulation active:scale-[0.99] transition-all"
      layout
    >
      <div className="flex items-start gap-3">
        {/* Type Icon */}
        <div
          className={`w-10 h-10 flex-shrink-0 rounded-lg flex items-center justify-center ${
            isPositive
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-amber-500/20 border border-amber-500/30"
          }`}
        >
          {isPositive ? (
            <ThumbsUp className="w-5 h-5 text-green-400" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge
              className={`text-xs ${
                isPositive
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
                  : "bg-amber-500/20 text-amber-400 border-amber-500/30"
              }`}
            >
              {isPositive ? "Positive" : "Improvement"}
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs">
              {observation.category}
            </Badge>
          </div>
          <p className="text-sm text-white line-clamp-2">
            {observation.description}
          </p>
          <div className="flex items-center gap-2 mt-1.5 text-sm text-white">
            <Clock className="w-3.5 h-3.5" />
            {new Date(observation.created_at).toLocaleTimeString("en-GB", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>

        <div className="flex-shrink-0 pt-1">
          {expanded ? (
            <ChevronUp className="w-4 h-4 text-white" />
          ) : (
            <ChevronDown className="w-4 h-4 text-white" />
          )}
        </div>
      </div>

      {/* Expanded Details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
              <p className="text-sm text-white">
                {observation.description}
              </p>
              {observation.person_observed && (
                <div className="flex items-center gap-2 text-sm text-white">
                  <User className="w-4 h-4" />
                  {observation.person_observed}
                </div>
              )}
              {observation.location && (
                <div className="flex items-center gap-2 text-sm text-white">
                  <MapPin className="w-4 h-4" />
                  {observation.location}
                </div>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(observation);
                }}
                className="w-full h-11 mt-2 flex items-center justify-center gap-2 rounded-xl bg-white/10 text-sm font-medium text-white active:bg-white/20 transition-colors touch-manipulation"
              >
                <Eye className="w-4 h-4" />
                View Full Details
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

export function ObservationFeed({ observations }: ObservationFeedProps) {
  const [selectedObservation, setSelectedObservation] =
    useState<SafetyObservation | null>(null);
  const grouped = groupByDate(observations);

  return (
    <>
      <div className="space-y-6">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date}>
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow" />
              {date}
            </h3>
            <div className="space-y-3">
              {items.map((obs, index) => (
                <motion.div
                  key={obs.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ObservationItem
                    observation={obs}
                    onViewDetails={setSelectedObservation}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <ObservationDetailSheet
        observation={selectedObservation}
        open={selectedObservation !== null}
        onClose={() => setSelectedObservation(null)}
      />
    </>
  );
}

export default ObservationFeed;
