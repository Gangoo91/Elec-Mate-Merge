import { useState } from "react";
import { Package, Zap, BookOpen, Wrench, Info, CheckCircle2, AlertTriangle, AlertCircle, Lightbulb, Camera, Clock, Target, Shield, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollableChips, ExpandableSection } from "./results";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ComponentIdentificationResultsProps {
  analysisResult: {
    component?: {
      name: string;
      type: string;
      plain_english?: string;
      manufacturer?: string;
      model?: string;
      specifications?: {
        voltage_rating?: string;
        current_rating?: string;
        ip_rating?: string;
        breaking_capacity?: string;
        poles?: string;
        protection_type?: string;
        [key: string]: string | undefined;
      };
      visual_identifiers?: string[];
      age_estimate?: string;
      current_compliance?: string;
      bs7671_requirements?: string[];
      typical_applications?: string[];
      installation_notes?: string;
      replacement_notes?: string;
      common_issues?: string;
      where_found?: string;
      confidence?: number;
    };
    similar_components?: Array<{
      name: string;
      manufacturer?: string;
      notes?: string;
    }>;
    summary?: string;
  };
  onRetry?: () => void;
}

export default function ComponentIdentificationResults({ analysisResult, onRetry }: ComponentIdentificationResultsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const component = analysisResult.component;

  if (!component) {
    return (
      <Card className="border-amber-500/30 bg-amber-500/5">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertCircle className="h-6 w-6 text-amber-500 mt-1" />
            <div>
              <CardTitle className="text-lg">Unable to Identify Component</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                The image could not be processed. This usually happens when the component or its labels are not clearly visible.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-sm flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Try these steps:
            </h4>
            <ul className="space-y-1.5 text-sm text-muted-foreground pl-6">
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <span>Ensure good lighting - avoid shadows and glare</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <span>Get closer to the component</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <span>Make sure labels and model numbers are visible</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-500">•</span>
                <span>Try Quick mode for faster results</span>
              </li>
            </ul>
          </div>

          {onRetry && (
            <Button
              onClick={onRetry}
              className="w-full gap-2"
              variant="outline"
            >
              <Camera className="h-4 w-4" />
              Try Again
            </Button>
          )}
        </CardContent>
      </Card>
    );
  }

  // Fix confidence display
  const rawConfidence = component.confidence || 0;
  const confidence = rawConfidence < 1 ? Math.round(rawConfidence * 100) : Math.round(rawConfidence);

  const confidenceVariant: 'success' | 'warning' | 'danger' =
    confidence >= 90 ? 'success' : confidence >= 70 ? 'warning' : 'danger';

  const confidenceLabel =
    confidence >= 90 ? 'High Confidence' : confidence >= 70 ? 'Moderate' : 'Low Confidence';

  // Color mapping for confidence ring
  const getConfidenceColor = () => {
    if (confidence >= 90) return '#22C55E'; // green-500
    if (confidence >= 70) return '#F59E0B'; // amber-500
    return '#EF4444'; // red-500
  };

  // Calculate SVG parameters for progress ring
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  // Build specs array for ScrollableChips
  const specsArray = component.specifications
    ? Object.entries(component.specifications)
        .filter(([_, value]) => value)
        .map(([key, value]) => ({
          label: key.replace(/_/g, ' '),
          value: value as string,
        }))
    : [];

  const toggleCheck = (index: number) => {
    setCheckedItems(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const checkedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalChecks = component.visual_identifiers?.length || 0;

  // Respect prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined'
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
    : false;

  // Helper: Get icon for spec type
  const getSpecIcon = (label: string) => {
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.includes('voltage') || lowerLabel.includes('current')) return Zap;
    if (lowerLabel.includes('ip') || lowerLabel.includes('protection')) return Shield;
    if (lowerLabel.includes('pole') || lowerLabel.includes('way')) return Hash;
    if (lowerLabel.includes('breaking') || lowerLabel.includes('capacity')) return AlertTriangle;
    return Info;
  };

  // Helper: Get age-based color coding
  const getAgeColor = (ageEstimate: string) => {
    const age = ageEstimate.toLowerCase();
    // Extract year if present
    const yearMatch = age.match(/(\d{4})/);
    if (yearMatch) {
      const year = parseInt(yearMatch[1]);
      if (year >= 2020) return { text: 'text-green-400', icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      if (year >= 1980) return { text: 'text-amber-400', icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
      return { text: 'text-red-400', icon: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    }
    // Keyword-based detection
    if (age.includes('modern') || age.includes('recent') || age.includes('new')) {
      return { text: 'text-green-400', icon: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20' };
    }
    if (age.includes('old') || age.includes('dated')) {
      return { text: 'text-amber-400', icon: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20' };
    }
    if (age.includes('vintage') || age.includes('obsolete') || age.includes('very old')) {
      return { text: 'text-red-400', icon: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20' };
    }
    // Unknown/default
    return { text: 'text-blue-400', icon: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' };
  };

  // Animation variants for specs grid
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: 1
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <div className="space-y-5">
      {/* Hero Section - Animated */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={cn(
          "relative overflow-hidden rounded-2xl",
          "border border-elec-yellow/20",
          "bg-gradient-to-br from-card via-card/95 to-card/90",
          "backdrop-blur-xl",
          "shadow-xl shadow-black/5"
        )}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-elec-yellow/[0.03] via-transparent to-elec-blue/[0.02] pointer-events-none" />

        <div className="relative p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-6">
            {/* Left: Icon + Title */}
            <div className="flex-1 space-y-4">
              {/* Icon with animated glow */}
              <motion.div
                className="relative inline-block"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4, type: 'spring', stiffness: 200 }}
              >
                {/* Animated glow background */}
                <motion.div
                  className="absolute inset-0 bg-elec-yellow/20 rounded-xl blur-xl"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="relative p-3 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
                  <Package className="h-8 w-8 text-elec-yellow" />
                </div>
              </motion.div>

              {/* Title and Type */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="space-y-2"
              >
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {component.name}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {component.type}
                  </Badge>
                  {component.manufacturer && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.45, type: 'spring', stiffness: 200, damping: 15 }}
                    >
                      <Badge variant="outline" className="text-xs bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {component.manufacturer}
                      </Badge>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Right: Animated Confidence Ring */}
            <motion.div
              className="flex justify-center sm:justify-end items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, type: 'spring', stiffness: 200 }}
            >
              <div className="relative p-4">
                {/* Outer glow effect */}
                <motion.div
                  className="absolute inset-0 rounded-full blur-3xl opacity-60"
                  style={{ background: getConfidenceColor() }}
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />

                {/* Glass background circle */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2"
                  style={{ borderColor: getConfidenceColor() + '40' }}
                  animate={{
                    boxShadow: [
                      `0 0 20px ${getConfidenceColor()}20`,
                      `0 0 40px ${getConfidenceColor()}40`,
                      `0 0 20px ${getConfidenceColor()}20`
                    ]
                  }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />

                {/* SVG Ring */}
                <svg width={size} height={size} className="transform -rotate-90 relative z-10">
                  {/* Background circle */}
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/20"
                  />
                  {/* Animated progress arc */}
                  <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getConfidenceColor()}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.6 }}
                    style={{
                      filter: `drop-shadow(0 0 8px ${getConfidenceColor()}60)`
                    }}
                  />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                  <motion.span
                    className="text-3xl sm:text-4xl font-bold"
                    style={{ color: getConfidenceColor() }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
                  >
                    {confidence}%
                  </motion.span>
                  <motion.span
                    className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mt-1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    {confidenceLabel}
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Key Metrics Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.35 }}
          >
            {/* Confidence Card */}
            <motion.div
              className="p-3 rounded-xl bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5 border border-elec-yellow/20"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.75, duration: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-3.5 w-3.5 text-elec-yellow" />
                <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                  Confidence
                </span>
              </div>
              <div className="text-lg font-bold text-elec-yellow">{confidence}%</div>
            </motion.div>

            {/* Age Card */}
            {component.age_estimate && (
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.80, duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                    Age
                  </span>
                </div>
                <div className="text-sm font-bold text-blue-400 truncate">{component.age_estimate}</div>
              </motion.div>
            )}

            {/* Compliance Card */}
            {component.current_compliance && (
              <motion.div
                className={cn(
                  "p-3 rounded-xl border",
                  component.current_compliance.toLowerCase().includes('meets') ||
                  component.current_compliance.toLowerCase().includes('compliant')
                    ? "bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/30"
                    : "bg-gradient-to-br from-amber-500/10 to-amber-600/5 border-amber-500/30"
                )}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.85, duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 className={cn(
                    "h-3.5 w-3.5",
                    component.current_compliance.toLowerCase().includes('meets') ||
                    component.current_compliance.toLowerCase().includes('compliant')
                      ? "text-green-400"
                      : "text-amber-400"
                  )} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                    Compliance
                  </span>
                </div>
                <div className={cn(
                  "text-sm font-bold truncate",
                  component.current_compliance.toLowerCase().includes('meets') ||
                  component.current_compliance.toLowerCase().includes('compliant')
                    ? "text-green-400"
                    : "text-amber-400"
                )}>
                  {component.current_compliance.length > 15
                    ? component.current_compliance.substring(0, 15) + '...'
                    : component.current_compliance
                  }
                </div>
              </motion.div>
            )}

            {/* Applications Card */}
            {component.typical_applications && component.typical_applications.length > 0 && (
              <motion.div
                className="p-3 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.90, duration: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="h-3.5 w-3.5 text-purple-400" />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
                    Applications
                  </span>
                </div>
                <div className="text-lg font-bold text-purple-400">
                  {component.typical_applications.length}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Plain English */}
          {component.plain_english && (
            <motion.div
              className="mt-6 space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95, duration: 0.35 }}
            >
              <div className="flex items-center gap-2 text-elec-yellow">
                <Info className="h-4 w-4" />
                <span className="text-sm font-semibold">What is this?</span>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                {component.plain_english}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Specifications Grid - Animated */}
      {specsArray.length > 0 ? (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {specsArray.map((spec, idx) => {
            const SpecIcon = getSpecIcon(spec.label);
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                custom={idx}
                className={cn(
                  "p-4 rounded-xl",
                  "bg-gradient-to-br from-elec-yellow/10 to-elec-yellow/5",
                  "border border-elec-yellow/20",
                  "backdrop-blur-sm",
                  "hover:border-elec-yellow/40 hover:shadow-lg hover:shadow-elec-yellow/10",
                  "active:scale-[0.98]",
                  "transition-all duration-200",
                  "touch-manipulation"
                )}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 rounded-lg bg-elec-yellow/10">
                    <SpecIcon className="h-3.5 w-3.5 text-elec-yellow" />
                  </div>
                  <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                    {spec.label}
                  </span>
                </div>
                <div className="text-lg font-bold text-elec-yellow truncate">
                  {spec.value}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      ) : (
        <motion.div
          className="p-6 rounded-xl bg-muted/20 border border-border/20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <Info className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm font-medium text-foreground">No specifications identified</p>
          <p className="text-xs text-muted-foreground mt-1">
            Try capturing the component's label or rating plate
          </p>
        </motion.div>
      )}

      {/* Visual Checklist - MOVED UP and Enhanced */}
      {component.visual_identifiers && component.visual_identifiers.length > 0 && (
        <motion.div
          className="rounded-xl border border-elec-yellow/20 bg-card/50 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.4 }}
        >
          {/* Header with Progress */}
          <div className="px-4 py-3 bg-elec-yellow/5 border-b border-elec-yellow/20">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
                <h3 className="font-semibold text-foreground">Confirm This Is Correct</h3>
              </div>
              <AnimatePresence>
                {checkedCount > 0 && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Badge variant="outline" className="text-xs">
                      {checkedCount}/{totalChecks}
                    </Badge>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Progress Bar */}
            <div className="h-1.5 bg-muted/50 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${(checkedCount / totalChecks) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="p-4 space-y-2">
            {component.visual_identifiers.map((identifier, idx) => (
              <motion.button
                key={idx}
                onClick={() => toggleCheck(idx)}
                className={cn(
                  "w-full flex items-start gap-3 p-3 rounded-lg text-left",
                  "min-h-[48px] touch-manipulation",
                  "transition-all duration-200",
                  checkedItems[idx]
                    ? "bg-green-500/10 border border-green-500/30"
                    : "bg-background/50 border border-border/30 hover:bg-accent/30"
                )}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    "border-2",
                    checkedItems[idx]
                      ? "bg-green-500 border-green-500 text-white"
                      : "border-muted-foreground/30"
                  )}
                  animate={{ scale: checkedItems[idx] ? [1, 1.2, 1] : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <AnimatePresence>
                    {checkedItems[idx] && (
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                <span className={cn(
                  "text-sm leading-relaxed",
                  checkedItems[idx] ? "text-foreground" : "text-foreground/80"
                )}>
                  {identifier}
                </span>
              </motion.button>
            ))}
          </div>

          {/* Completion Celebration */}
          <AnimatePresence>
            {checkedCount === totalChecks && totalChecks > 0 && (
              <motion.div
                className="px-4 py-3 bg-green-500/10 border-t border-green-500/30"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 text-green-400">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 360] }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </motion.div>
                  <span className="font-semibold text-sm">All verified! ✨</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Age & Compliance - Always Visible */}
      {(component.age_estimate || component.current_compliance) && (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.4 }}
        >
          {component.age_estimate && (() => {
            const ageColors = getAgeColor(component.age_estimate);
            return (
              <div className={cn(
                "p-4 rounded-xl border",
                ageColors.bg,
                ageColors.border
              )}>
                <div className="flex items-center gap-2 mb-1">
                  <Clock className={cn("h-4 w-4", ageColors.icon)} />
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    Estimated Age
                  </p>
                </div>
                <p className={cn("text-base font-semibold", ageColors.text)}>
                  {component.age_estimate}
                </p>
              </div>
            );
          })()}
          {component.current_compliance && (
            <div className="p-4 rounded-xl bg-card/50 border border-border/30">
              <div className="flex items-center gap-2 mb-1">
                {component.current_compliance.toLowerCase().includes('meets') ||
                component.current_compliance.toLowerCase().includes('compliant') ? (
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-amber-400" />
                )}
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Compliance Status
                </p>
              </div>
              <p className={cn(
                "text-base font-semibold",
                component.current_compliance.toLowerCase().includes('meets') ||
                component.current_compliance.toLowerCase().includes('compliant')
                  ? 'text-green-400'
                  : 'text-amber-400'
              )}>
                {component.current_compliance}
              </p>
            </div>
          )}
        </motion.div>
      )}

      {/* Where Found - Always Visible */}
      {component.where_found && (
        <motion.div
          className="p-4 rounded-xl bg-card/50 border border-border/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-4 w-4 text-purple-400" />
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Where You'll Find This
            </p>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            {component.where_found}
          </p>
        </motion.div>
      )}

      {/* Typical Applications - Expandable */}
      {component.typical_applications && component.typical_applications.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <ExpandableSection
            title="Typical Applications"
            icon={Zap}
            defaultOpen={true}
          >
            <div className="space-y-2">
              {component.typical_applications.map((app, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-2 p-3 rounded-lg bg-background/50 border border-border/20"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <Zap className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground/90">{app}</span>
                </motion.div>
              ))}
            </div>
          </ExpandableSection>
        </motion.div>
      )}

      {/* BS 7671 Requirements - Expandable */}
      {component.bs7671_requirements && component.bs7671_requirements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.45, duration: 0.4 }}
        >
          <ExpandableSection
            title="BS 7671 Requirements"
            icon={BookOpen}
            defaultOpen={false}
          >
            <div className="space-y-3">
              {component.bs7671_requirements.map((req, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-elec-yellow/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <BookOpen className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground leading-relaxed">{req}</p>
                </motion.div>
              ))}
            </div>
          </ExpandableSection>
        </motion.div>
      )}

      {/* Installation & Replacement - Expandable */}
      {(component.installation_notes || component.replacement_notes || component.common_issues) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.4 }}
        >
          <ExpandableSection
            title="Installation & Replacement"
            icon={Wrench}
            defaultOpen={false}
          >
            <div className="space-y-3">
              {/* Installation Notes */}
              {component.installation_notes && (
                <motion.div
                  className="p-4 rounded-xl bg-card/50 border border-border/30"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-elec-yellow" />
                    <p className="text-sm font-semibold text-foreground">Installation Notes</p>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {component.installation_notes}
                  </p>
                </motion.div>
              )}

              {/* Replacement Notes */}
              {component.replacement_notes && (
                <motion.div
                  className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="h-4 w-4 text-amber-400" />
                    <p className="text-sm font-semibold text-amber-400">Replacement Information</p>
                  </div>
                  <p className="text-sm text-foreground/90 leading-relaxed">
                    {component.replacement_notes}
                  </p>
                </motion.div>
              )}

              {/* Common Issues - with pulsing animation */}
              {component.common_issues && (
                <motion.div
                  className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 relative overflow-hidden"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                >
                  {/* Pulsing glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-red-500/5 pointer-events-none"
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.02, 1]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      </motion.div>
                      <p className="text-sm font-semibold text-red-400">Known Issues</p>
                    </div>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {component.common_issues}
                    </p>
                  </div>
                </motion.div>
              )}
            </div>
          </ExpandableSection>
        </motion.div>
      )}

      {/* Similar Components - Expandable */}
      {analysisResult.similar_components && analysisResult.similar_components.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.4 }}
        >
          <ExpandableSection
            title="Similar Components"
            icon={Package}
            defaultOpen={false}
          >
            <div className="space-y-2">
              {analysisResult.similar_components.map((similar, idx) => (
                <motion.div
                  key={idx}
                  className="p-3 rounded-lg bg-background/50 border border-border/30"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                >
                  <p className="font-medium text-sm text-foreground">{similar.name}</p>
                  {similar.manufacturer && (
                    <p className="text-xs text-muted-foreground">{similar.manufacturer}</p>
                  )}
                  {similar.notes && (
                    <p className="text-xs text-muted-foreground mt-1">{similar.notes}</p>
                  )}
                </motion.div>
              ))}
            </div>
          </ExpandableSection>
        </motion.div>
      )}


      {/* Summary - Enhanced with disclaimer styling */}
      {analysisResult.summary && (
        <motion.div
          className="rounded-xl bg-gradient-to-br from-muted/40 to-muted/20 border border-border/30 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-500/10">
                <Info className="h-4 w-4 text-blue-400" />
              </div>
              <span className="text-sm font-semibold text-foreground">Summary</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {analysisResult.summary}
            </p>
          </div>

          {/* Disclaimer footer */}
          <div className="px-4 py-3 bg-amber-500/5 border-t border-amber-500/10">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-3.5 w-3.5 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-semibold text-amber-400">Important:</span> AI-generated results should be verified by a qualified electrician before making any decisions. Always consult BS 7671 and manufacturer documentation.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
