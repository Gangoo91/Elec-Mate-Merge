import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { LocationAutoFill } from '../common/LocationAutoFill';
import { SmartTextarea } from '../common/SmartTextarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ArrowLeft, Eye, ThumbsUp, AlertTriangle, Loader2 } from 'lucide-react';
import {
  useSafetyObservations,
  useCreateObservation,
  OBSERVATION_CATEGORIES,
  type SafetyObservation,
  type ObservationSeverity,
} from '@/hooks/useSafetyObservations';
import { ObservationFeed } from './ObservationFeed';
import { SafetyEmptyState } from '../common/SafetyEmptyState';
import { SafetySkeletonLoader } from '../common/SafetySkeletonLoader';
import { SafetyPhotoCapture } from '../common/SafetyPhotoCapture';
import { SignaturePad } from '../common/SignaturePad';
import { useHaptic } from '@/hooks/useHaptic';
import { SaveAsTemplateSheet } from '../common/SaveAsTemplateSheet';
import { LoadTemplateSheet } from '../common/LoadTemplateSheet';
import { OBSERVATION_STANDARD_TEMPLATES } from '@/data/site-safety/observation-templates';

interface SafetyObservationCardProps {
  onBack: () => void;
}

type TabKey = 'log' | 'feed';

export function SafetyObservationCard({ onBack }: SafetyObservationCardProps) {
  const haptic = useHaptic();
  const [activeTab, setActiveTab] = useState<TabKey>('log');
  const [observationType, setObservationType] = useState<'positive' | 'improvement_needed'>(
    'positive'
  );
  const [category, setCategory] = useState('');
  const [personObserved, setPersonObserved] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<ObservationSeverity | ''>('');
  const [photoUrls, setPhotoUrls] = useState<string[]>([]);

  // Observer signature state
  const [observerSigName, setObserverSigName] = useState('');
  const [observerSigDate, setObserverSigDate] = useState('');
  const [observerSigDataUrl, setObserverSigDataUrl] = useState('');

  // Template state
  const [showSaveTemplate, setShowSaveTemplate] = useState(false);
  const [showLoadTemplate, setShowLoadTemplate] = useState(false);

  const getTemplateData = () => ({
    observationType,
    category,
    severity,
  });

  const handleLoadTemplate = (data: Record<string, unknown>) => {
    if (data.observationType) setObservationType(data.observationType as 'positive' | 'improvement_needed');
    if (data.category) setCategory(data.category as string);
    if (data.severity) setSeverity(data.severity as ObservationSeverity);
    if (data.description) setDescription(data.description as string);
  };

  const { data: observations = [], isLoading } = useSafetyObservations();
  const createObservation = useCreateObservation();

  const canSubmit = category.length > 0 && description.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    await createObservation.mutateAsync({
      observation_type: observationType,
      category,
      description: description.trim(),
      person_observed: personObserved.trim() || undefined,
      location: location.trim() || undefined,
      severity: severity || undefined,
      photos: photoUrls,
      observer_signature: observerSigDataUrl || undefined,
      observer_name: observerSigName || undefined,
    });

    haptic.success();

    // Reset form
    setCategory('');
    setPersonObserved('');
    setDescription('');
    setLocation('');
    setSeverity('');
    setObservationType('positive');
    setPhotoUrls([]);
    setObserverSigName('');
    setObserverSigDate('');
    setObserverSigDataUrl('');
  };

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'log', label: 'Log' },
    { key: 'feed', label: 'Feed' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-white/10">
        <button
          onClick={onBack}
          className="h-11 w-11 flex items-center justify-center rounded-xl touch-manipulation active:scale-95 transition-transform"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>
        <div className="flex-1">
          <h1 className="text-lg font-semibold text-white">Safety Observations</h1>
          <p className="text-sm text-white">Log and review site observations</p>
        </div>
        <Eye className="w-5 h-5 text-elec-yellow" />
      </div>

      {/* Tab Bar */}
      <div className="flex px-4 pt-3 gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`h-11 flex-1 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all ${
              activeTab === tab.key
                ? 'bg-elec-yellow text-black'
                : 'bg-white/5 text-white border border-white/10'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto pb-20">
        <AnimatePresence mode="wait">
          {activeTab === 'log' ? (
            <motion.div
              key="log"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="px-4 pt-4 space-y-4"
            >
              {/* Load Template */}
              <button
                type="button"
                onClick={() => setShowLoadTemplate(true)}
                className="w-full h-10 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/20 text-xs font-medium text-white touch-manipulation active:scale-[0.98] transition-all"
              >
                Load from Template
              </button>

              {/* Observation Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Observation Type
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setObservationType('positive')}
                    className={`h-11 flex-1 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all border ${
                      observationType === 'positive'
                        ? 'bg-green-500/20 border-green-500/50 text-green-400'
                        : 'bg-white/5 border-white/10 text-white'
                    }`}
                  >
                    <ThumbsUp className="w-4 h-4" />
                    Positive
                  </button>
                  <button
                    onClick={() => setObservationType('improvement_needed')}
                    className={`h-11 flex-1 flex items-center justify-center gap-2 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all border ${
                      observationType === 'improvement_needed'
                        ? 'bg-amber-500/20 border-amber-500/50 text-amber-400'
                        : 'bg-white/5 border-white/10 text-white'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Improvement
                  </button>
                </div>
              </div>

              {/* Severity — improvement_needed only */}
              {observationType === 'improvement_needed' && (
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Severity</label>
                  <div className="flex gap-2">
                    {(
                      [
                        { value: 'low', label: 'Low', bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
                        { value: 'medium', label: 'Medium', bg: 'bg-amber-500/20', border: 'border-amber-500/50', text: 'text-amber-400' },
                        { value: 'high', label: 'High', bg: 'bg-red-500/20', border: 'border-red-500/50', text: 'text-red-400' },
                      ] as const
                    ).map((s) => (
                      <button
                        key={s.value}
                        onClick={() => setSeverity(severity === s.value ? '' : s.value)}
                        className={`h-11 flex-1 rounded-xl text-sm font-semibold touch-manipulation active:scale-[0.97] transition-all border ${
                          severity === s.value
                            ? `${s.bg} ${s.border} ${s.text}`
                            : 'bg-white/5 border-white/10 text-white'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Category</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground">
                    {OBSERVATION_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Person Observed */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">
                  Person Observed (optional)
                </label>
                <Input
                  value={personObserved}
                  onChange={(e) => setPersonObserved(e.target.value)}
                  placeholder="Name or role"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-white mb-1">Description</label>
                <SmartTextarea
                  value={description}
                  onChange={setDescription}
                  placeholder="Describe what you observed..."
                  className="touch-manipulation text-base min-h-[120px] focus:ring-2 focus:ring-elec-yellow/20 border-white/30 focus:border-yellow-500"
                />
              </div>

              {/* Location */}
              <LocationAutoFill
                value={location}
                onChange={setLocation}
                placeholder="e.g. Ground floor, Distribution board area"
                label="Location (optional)"
              />

              {/* Photos */}
              <SafetyPhotoCapture photos={photoUrls} onPhotosChange={setPhotoUrls} />

              {/* Observer Signature */}
              <SignaturePad
                label="Observer Signature"
                name={observerSigName}
                date={observerSigDate}
                signatureDataUrl={observerSigDataUrl}
                onSignatureChange={setObserverSigDataUrl}
                onNameChange={setObserverSigName}
                onDateChange={setObserverSigDate}
              />

              {/* Submit + Save Template */}
              <div className="pb-8 pt-2 space-y-2">
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || createObservation.isPending}
                  className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-base touch-manipulation active:scale-[0.98] transition-all disabled:opacity-40 disabled:pointer-events-none flex items-center justify-center gap-2"
                >
                  {createObservation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Log Observation'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowSaveTemplate(true)}
                  className="w-full h-10 rounded-xl border border-white/20 text-xs font-medium text-white touch-manipulation active:scale-[0.98] transition-all"
                >
                  Save as Template
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="feed"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="px-4 pt-4"
            >
              {isLoading ? (
                <SafetySkeletonLoader variant="card" />
              ) : observations.length === 0 ? (
                <SafetyEmptyState
                  icon={Eye}
                  heading="No Observations Yet"
                  description="Log your first safety observation using the Log tab. Track both positive behaviours and areas for improvement."
                  ctaLabel="Log an Observation"
                  onCta={() => setActiveTab('log')}
                  tip="Regular observations build a strong safety culture"
                />
              ) : (
                <ObservationFeed observations={observations} />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <SaveAsTemplateSheet
        open={showSaveTemplate}
        onOpenChange={setShowSaveTemplate}
        moduleType="observation"
        getTemplateData={getTemplateData}
      />
      <LoadTemplateSheet
        open={showLoadTemplate}
        onOpenChange={setShowLoadTemplate}
        moduleType="observation"
        onLoad={handleLoadTemplate}
        standardTemplates={OBSERVATION_STANDARD_TEMPLATES}
      />
    </div>
  );
}

export default SafetyObservationCard;
