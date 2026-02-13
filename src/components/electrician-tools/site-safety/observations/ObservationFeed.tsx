import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  ThumbsUp,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  MapPin,
  User,
  Clock,
  Eye,
  Search,
  X,
} from 'lucide-react';
import type { SafetyObservation } from '@/hooks/useSafetyObservations';
import { ObservationDetailSheet } from './ObservationDetailSheet';

interface ObservationFeedProps {
  observations: SafetyObservation[];
}

function groupByDate(observations: SafetyObservation[]): Record<string, SafetyObservation[]> {
  const groups: Record<string, SafetyObservation[]> = {};

  for (const obs of observations) {
    const dateKey = new Date(obs.created_at).toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
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
  const isPositive = observation.observation_type === 'positive';

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
              ? 'bg-green-500/20 border border-green-500/30'
              : 'bg-amber-500/20 border border-amber-500/30'
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
                  ? 'bg-green-500/20 text-green-400 border-green-500/30'
                  : 'bg-amber-500/20 text-amber-400 border-amber-500/30'
              }`}
            >
              {isPositive ? 'Positive' : 'Improvement'}
            </Badge>
            <Badge className="bg-white/10 text-white border-white/20 text-xs">
              {observation.category}
            </Badge>
          </div>
          <p className="text-sm text-white line-clamp-2">{observation.description}</p>
          <div className="flex items-center gap-2 mt-1.5 text-sm text-white">
            <Clock className="w-3.5 h-3.5" />
            {new Date(observation.created_at).toLocaleTimeString('en-GB', {
              hour: '2-digit',
              minute: '2-digit',
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
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-3 mt-3 border-t border-white/10 space-y-2">
              <p className="text-sm text-white">{observation.description}</p>
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
  const [selectedObservation, setSelectedObservation] = useState<SafetyObservation | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'positive' | 'improvement'>('all');

  const filteredObservations = useMemo(() => {
    return observations.filter((obs) => {
      const matchesSearch =
        !searchQuery ||
        obs.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.person_observed?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        obs.location?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = typeFilter === 'all' || obs.observation_type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [observations, searchQuery, typeFilter]);

  const typeFilterTabs = useMemo(() => {
    return [
      { key: 'all' as const, label: 'All', count: observations.length },
      {
        key: 'positive' as const,
        label: 'Positive',
        count: observations.filter((o) => o.observation_type === 'positive').length,
      },
      {
        key: 'improvement' as const,
        label: 'Improvement',
        count: observations.filter((o) => o.observation_type === 'improvement').length,
      },
    ];
  }, [observations]);

  const filteredGrouped = groupByDate(filteredObservations);

  return (
    <>
      <div className="space-y-3 mb-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white" />
          <Input
            placeholder="Search observations..."
            className="pl-8 pr-8 h-9 bg-white/5 border-0 focus:ring-1 focus:ring-elec-yellow/50 text-sm touch-manipulation rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 hover:bg-white/10 rounded-full touch-manipulation"
              onClick={() => setSearchQuery('')}
            >
              <X className="h-3.5 w-3.5 text-white" />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
          {typeFilterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setTypeFilter(tab.key)}
              className={`h-9 px-3 rounded-full text-xs font-medium whitespace-nowrap touch-manipulation transition-all ${
                typeFilter === tab.key
                  ? 'bg-elec-yellow text-black'
                  : 'bg-white/5 text-white border border-white/10'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      {Object.keys(filteredGrouped).length === 0 && observations.length > 0 && (
        <div className="py-12 text-center">
          <Search className="h-8 w-8 text-white mx-auto mb-3" />
          <p className="text-sm font-medium text-white">No matching observations</p>
          <p className="text-xs text-white mt-1">Try adjusting your search or filters</p>
        </div>
      )}

      <div className="space-y-6">
        {Object.entries(filteredGrouped).map(([date, items]) => (
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
                  <ObservationItem observation={obs} onViewDetails={setSelectedObservation} />
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
