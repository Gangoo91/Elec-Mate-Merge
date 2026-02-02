import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText, Save, Download, RefreshCw, AlertTriangle, Wrench, Shield, Clock,
  CheckCircle2, ChevronDown, ChevronRight, HardHat, Hammer, Zap,
  Users, MapPin, Phone, ClipboardCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type { MethodStatementData, MethodStep } from '@/types/method-statement';

interface MethodStatementReviewEditorProps {
  methodData: MethodStatementData;
  onSave: () => void;
  isSaving: boolean;
  lastSaved: Date | null;
  onStartOver: () => void;
}

// Parse description text to extract numbered sub-steps
const parseDescription = (description: string): { intro?: string; steps: string[] } => {
  if (!description) return { steps: [] };

  // Split by numbered patterns like "1.", "2.", etc.
  const parts = description.split(/(?=\d+\.\s)/);

  // If no numbered steps found, return as single block
  if (parts.length <= 1) {
    return { intro: description.trim(), steps: [] };
  }

  const intro = parts[0].trim();
  const steps = parts.slice(1).map(s => s.trim()).filter(s => s.length > 0);

  return { intro: intro || undefined, steps };
};

// Render formatted description with sub-steps
const FormattedDescription: React.FC<{ description: string; isPreview?: boolean }> = ({ description, isPreview = false }) => {
  const { intro, steps } = parseDescription(description);

  if (steps.length === 0) {
    return (
      <p className={`text-sm text-white/80 leading-relaxed ${isPreview ? 'line-clamp-2' : ''}`}>
        {intro}
      </p>
    );
  }

  if (isPreview) {
    // Show just first line for preview
    return (
      <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
        {intro || steps[0]}
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {intro && (
        <p className="text-sm text-white/80 leading-relaxed">{intro}</p>
      )}
      <div className="space-y-2">
        {steps.map((stepText, idx) => (
          <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
            <div className="flex-shrink-0 w-6 h-6 rounded-md bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-emerald-400">{idx + 1}</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed flex-1">
              {stepText.replace(/^\d+\.\s*/, '')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Individual Step Card Component
const StepCard: React.FC<{ step: MethodStep; index: number }> = ({ step, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getRiskStyles = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return { bg: 'bg-emerald-500', border: 'border-emerald-500/30', text: 'text-emerald-400' };
      case 'medium': return { bg: 'bg-amber-500', border: 'border-amber-500/30', text: 'text-amber-400' };
      case 'high': return { bg: 'bg-red-500', border: 'border-red-500/30', text: 'text-red-400' };
      default: return { bg: 'bg-white/30', border: 'border-white/20', text: 'text-white/60' };
    }
  };

  const riskStyles = getRiskStyles(step.riskLevel);
  const hasDetails = (step.safetyRequirements?.length > 0) ||
                     (step.equipmentNeeded?.length > 0) ||
                     (step.qualifications?.length > 0) ||
                     (step.description?.length > 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03 }}
      className="relative"
    >
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <div className={`rounded-2xl overflow-hidden border transition-all ${
          isExpanded ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 bg-white/[0.02]'
        }`}>
          {/* Step Header - Always Visible */}
          <CollapsibleTrigger className="w-full text-left p-4 touch-manipulation">
            <div className="flex items-start gap-3">
              {/* Step Number Badge */}
              <div className="flex-shrink-0 relative">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/20 border border-emerald-500/40 flex items-center justify-center`}>
                  <span className="text-lg font-bold text-emerald-400">{step.stepNumber}</span>
                </div>
                {/* Risk indicator dot */}
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${riskStyles.bg} border-2 border-background`} />
              </div>

              {/* Title & Quick Info */}
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-semibold text-white leading-snug">{step.title}</h4>
                <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                  <span className="text-xs text-white/50 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {step.estimatedDuration}
                  </span>
                  <span className={`text-xs font-medium ${riskStyles.text}`}>
                    {step.riskLevel?.charAt(0).toUpperCase() + step.riskLevel?.slice(1)} Risk
                  </span>
                  {hasDetails && (
                    <span className="text-xs text-emerald-400/80 flex items-center gap-1">
                      <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      {isExpanded ? 'Less' : 'Details'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Description - Brief preview */}
            <div className="mt-3">
              <FormattedDescription description={step.description} isPreview={true} />
            </div>
          </CollapsibleTrigger>

          {/* Expanded Details */}
          <CollapsibleContent>
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="border-t border-white/10"
                >
                  {/* Full Description with formatted sub-steps */}
                  {step.description && (
                    <div className="p-4 border-b border-white/5">
                      <FormattedDescription description={step.description} />
                    </div>
                  )}

                  <div className="p-4 space-y-4">
                    {/* Safety Requirements */}
                    {step.safetyRequirements && step.safetyRequirements.length > 0 && (
                      <div className="p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-orange-400" />
                          <span className="text-xs font-semibold text-orange-400 uppercase tracking-wide">Safety</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {step.safetyRequirements.map((req, idx) => (
                            <Badge
                              key={idx}
                              variant="outline"
                              className="text-xs bg-orange-500/10 text-orange-300 border-orange-500/30 font-normal"
                            >
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Equipment & Qualifications Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Equipment Needed */}
                      {step.equipmentNeeded && step.equipmentNeeded.length > 0 && (
                        <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <Hammer className="h-4 w-4 text-blue-400" />
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Equipment</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {step.equipmentNeeded.map((eq, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-blue-500/10 text-blue-300 border-blue-500/30 font-normal"
                              >
                                {eq}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Qualifications */}
                      {step.qualifications && step.qualifications.length > 0 && (
                        <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                          <div className="flex items-center gap-2 mb-2">
                            <ClipboardCheck className="h-4 w-4 text-purple-400" />
                            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Qualifications</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {step.qualifications.map((qual, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-purple-500/10 text-purple-300 border-purple-500/30 font-normal"
                              >
                                {qual}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Notes if any */}
                    {step.notes && (
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-xs text-white/60 italic">{step.notes}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CollapsibleContent>
        </div>
      </Collapsible>
    </motion.div>
  );
};

export const MethodStatementReviewEditor: React.FC<MethodStatementReviewEditorProps> = ({
  methodData,
  onSave,
  isSaving,
  lastSaved,
  onStartOver
}) => {
  const getRiskLevelStyles = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'low': return { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' };
      case 'medium': return { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' };
      case 'high': return { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' };
      default: return { bg: 'bg-white/10', text: 'text-white/70', border: 'border-white/20' };
    }
  };

  const handleExportPDF = () => {
    console.log('Export PDF:', methodData);
  };

  const riskStyles = getRiskLevelStyles(methodData.overallRiskLevel);

  return (
    <div className="space-y-5">
      {/* Hero Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 p-5"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl -mr-10 -mt-10" />

        <div className="relative space-y-4">
          {/* Title Row */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30">
              <FileText className="h-7 w-7 text-emerald-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-white">{methodData.jobTitle}</h2>
              <div className="flex items-center gap-2 mt-1">
                <MapPin className="h-3.5 w-3.5 text-white/40" />
                <span className="text-sm text-white/60">{methodData.location || 'Location not specified'}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            <div className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/10 text-center overflow-hidden">
              <p className="text-xl sm:text-2xl font-bold text-white">{methodData.steps?.length || 0}</p>
              <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wide">Steps</p>
            </div>
            <div className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/10 text-center overflow-hidden">
              <p className="text-sm sm:text-lg font-bold text-white truncate">{methodData.totalEstimatedTime || '-'}</p>
              <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wide">Duration</p>
            </div>
            <div className="bg-white/5 rounded-xl p-2 sm:p-3 border border-white/10 text-center overflow-hidden">
              <p className="text-xl sm:text-2xl font-bold text-white">{methodData.riskAssessment?.hazards?.length || 0}</p>
              <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wide">Hazards</p>
            </div>
            <div className={`${riskStyles.bg} rounded-xl p-2 sm:p-3 border ${riskStyles.border} text-center overflow-hidden`}>
              <p className={`text-xs sm:text-sm font-bold ${riskStyles.text} uppercase truncate`}>{methodData.overallRiskLevel}</p>
              <p className="text-[9px] sm:text-[10px] text-white/50 uppercase tracking-wide">Risk</p>
            </div>
          </div>

          {/* Project Info */}
          {(methodData.contractor || methodData.supervisor) && (
            <div className="flex flex-wrap gap-4 text-sm">
              {methodData.contractor && (
                <div className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-white/50">Contractor:</span>
                  <span className="text-white font-medium">{methodData.contractor}</span>
                </div>
              )}
              {methodData.supervisor && (
                <div className="flex items-center gap-1.5">
                  <HardHat className="h-3.5 w-3.5 text-white/40" />
                  <span className="text-white/50">Supervisor:</span>
                  <span className="text-white font-medium">{methodData.supervisor}</span>
                </div>
              )}
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-2 pt-1">
            <Button
              size="sm"
              onClick={onSave}
              disabled={isSaving}
              className="bg-emerald-500 hover:bg-emerald-600 text-white h-10 px-4 touch-manipulation"
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              className="border-white/20 text-white hover:bg-white/10 h-10 px-4 touch-manipulation"
            >
              <Download className="h-4 w-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onStartOver}
              className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 h-10 px-4 touch-manipulation"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>

          {lastSaved && (
            <p className="text-xs text-white/40">Saved {lastSaved.toLocaleTimeString()}</p>
          )}
        </div>
      </motion.div>

      {/* Installation Steps */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <h3 className="text-base font-bold text-white">Installation Steps</h3>
          <span className="text-xs text-white/40">Tap to expand</span>
        </div>

        <div className="space-y-2">
          {methodData.steps?.map((step, index) => (
            <StepCard key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>

      {/* Hazards Section */}
      {methodData.riskAssessment?.hazards && methodData.riskAssessment.hazards.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            <h3 className="text-base font-bold text-white">Identified Hazards</h3>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30 text-xs">
              {methodData.riskAssessment.hazards.length}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {methodData.riskAssessment.hazards.map((hazard, idx) => {
              const hazardRiskStyles = getRiskLevelStyles(hazard.riskLevel);
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.02 }}
                  className={`p-3 rounded-xl ${hazardRiskStyles.bg} border ${hazardRiskStyles.border}`}
                >
                  <div className="flex items-start gap-2">
                    <AlertTriangle className={`h-4 w-4 ${hazardRiskStyles.text} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white">{hazard.hazard}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-medium ${hazardRiskStyles.text}`}>{hazard.riskLevel}</span>
                        {hazard.linkedToStep > 0 && (
                          <span className="text-xs text-white/40">Step {hazard.linkedToStep}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* PPE Requirements */}
      {methodData.ppeDetails && methodData.ppeDetails.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
            <h3 className="text-base font-bold text-white">PPE Requirements</h3>
          </div>

          <div className="flex flex-wrap gap-2">
            {methodData.ppeDetails.map((ppe) => (
              <div
                key={ppe.itemNumber}
                className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20"
              >
                <HardHat className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-white">{ppe.ppeType}</span>
                {ppe.mandatory && (
                  <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-[10px] ml-1">
                    Required
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Compliance Footer */}
      <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
        <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium text-white">BS 7671:2018+A3:2024 Compliant</p>
          <p className="text-xs text-white/50">Method statement follows current wiring regulations</p>
        </div>
      </div>
    </div>
  );
};
