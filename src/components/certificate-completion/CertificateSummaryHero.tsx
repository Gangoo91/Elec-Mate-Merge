/**
 * CertificateSummaryHero
 *
 * Visual summary card with animated completion status for certificate tabs.
 * Shows progress ring, assessment badge, and key metrics.
 */

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Zap,
  FileText,
  MapPin,
  Calendar,
  AlertOctagon
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export interface CertificateSummaryHeroProps {
  certificateType: 'EICR' | 'EIC';
  certificateNumber?: string;
  installationAddress?: string;
  inspectionDate?: string;
  overallAssessment?: 'satisfactory' | 'unsatisfactory' | null;
  completionPercentage: number;
  circuitCount?: number;
  observationCount?: number;
  c1Count?: number;
  c2Count?: number;
  c3Count?: number;
  className?: string;
}

export const CertificateSummaryHero: React.FC<CertificateSummaryHeroProps> = ({
  certificateType,
  certificateNumber,
  installationAddress,
  inspectionDate,
  overallAssessment,
  completionPercentage,
  circuitCount = 0,
  observationCount = 0,
  c1Count = 0,
  c2Count = 0,
  c3Count = 0,
  className,
}) => {
  const getAssessmentConfig = () => {
    switch (overallAssessment) {
      case 'satisfactory':
        return {
          label: 'SATISFACTORY',
          icon: CheckCircle,
          color: 'text-green-400',
          bgColor: 'bg-green-500/20',
          borderColor: 'border-green-500/40',
          glowColor: 'shadow-green-500/30',
          ringColor: '#22c55e',
        };
      case 'unsatisfactory':
        return {
          label: 'UNSATISFACTORY',
          icon: XCircle,
          color: 'text-red-400',
          bgColor: 'bg-red-500/20',
          borderColor: 'border-red-500/40',
          glowColor: 'shadow-red-500/30',
          ringColor: '#ef4444',
        };
      default:
        return {
          label: 'PENDING',
          icon: AlertTriangle,
          color: 'text-amber-400',
          bgColor: 'bg-amber-500/20',
          borderColor: 'border-amber-500/40',
          glowColor: 'shadow-amber-500/30',
          ringColor: '#f59e0b',
        };
    }
  };

  const assessmentConfig = getAssessmentConfig();
  const AssessmentIcon = assessmentConfig.icon;

  // Calculate SVG parameters for progress ring
  const size = 100;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (completionPercentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={className}
    >
      <Card className="overflow-hidden border-2 border-border/50 bg-gradient-to-br from-card via-card to-card/80 backdrop-blur-sm">
        {/* Header gradient */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-elec-yellow via-amber-500 to-elec-yellow" />

        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8">
            {/* Progress Ring */}
            <motion.div
              className="flex justify-center sm:justify-start"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <div className="relative">
                <svg
                  width={size}
                  height={size}
                  className="transform -rotate-90"
                >
                  {/* Background circle */}
                  <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/30"
                  />
                  {/* Progress circle */}
                  <motion.circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={assessmentConfig.ringColor}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
                  />
                </svg>
                {/* Percentage text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.span
                    className="text-2xl font-bold text-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    {completionPercentage}%
                  </motion.span>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Complete</span>
                </div>
              </div>
            </motion.div>

            {/* Certificate Info */}
            <div className="flex-1 space-y-4">
              {/* Certificate Number & Type */}
              <motion.div
                className="space-y-1"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    variant="outline"
                    className="bg-elec-yellow/10 border-elec-yellow/30 text-elec-yellow font-semibold px-2.5 py-0.5"
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    {certificateType}
                  </Badge>
                  {certificateNumber && (
                    <span className="text-sm font-mono text-muted-foreground">
                      {certificateNumber}
                    </span>
                  )}
                </div>

                {/* Installation Address */}
                {installationAddress && (
                  <div className="flex items-start gap-2 text-foreground">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                    <span className="text-base font-medium line-clamp-2">{installationAddress}</span>
                  </div>
                )}

                {/* Date */}
                {inspectionDate && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {new Date(inspectionDate).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Metrics Row */}
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                {/* Circuits */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50">
                  <FileText className="h-3.5 w-3.5 text-elec-yellow" />
                  <span className="text-sm font-medium">{circuitCount}</span>
                  <span className="text-xs text-muted-foreground">Circuits</span>
                </div>

                {/* Observations */}
                {observationCount > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/50">
                    <AlertOctagon className="h-3.5 w-3.5 text-amber-400" />
                    <span className="text-sm font-medium">{observationCount}</span>
                    <span className="text-xs text-muted-foreground">Observations</span>
                  </div>
                )}

                {/* Defect codes */}
                {c1Count > 0 && (
                  <Badge variant="outline" className="bg-red-500/10 border-red-500/30 text-red-400 text-xs">
                    C1: {c1Count}
                  </Badge>
                )}
                {c2Count > 0 && (
                  <Badge variant="outline" className="bg-amber-500/10 border-amber-500/30 text-amber-400 text-xs">
                    C2: {c2Count}
                  </Badge>
                )}
                {c3Count > 0 && (
                  <Badge variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-400 text-xs">
                    C3: {c3Count}
                  </Badge>
                )}
              </motion.div>

              {/* Assessment Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
              >
                <div className={cn(
                  'inline-flex items-center gap-2 px-4 py-2 rounded-xl border-2 transition-all',
                  assessmentConfig.bgColor,
                  assessmentConfig.borderColor,
                  overallAssessment && `shadow-lg ${assessmentConfig.glowColor}`
                )}>
                  <AssessmentIcon className={cn('h-5 w-5', assessmentConfig.color)} />
                  <span className={cn('font-bold text-sm tracking-wide', assessmentConfig.color)}>
                    {assessmentConfig.label}
                  </span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CertificateSummaryHero;
