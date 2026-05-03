import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, ClipboardCheck, AlertTriangle, BookOpen, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import { useAssessmentProgress } from '@/components/apprentice/assessment/hooks/useAssessmentProgress';
import { getTotalItemCount } from '@/components/apprentice/assessment/data/siteAssessmentChecklist';
import SiteAssessmentWizard from '@/components/apprentice/assessment/SiteAssessmentWizard';
import RiskAssessmentFlow from '@/components/apprentice/assessment/RiskAssessmentFlow';
import QuickReferenceCards from '@/components/apprentice/assessment/QuickReferenceCards';

type ActiveTool = 'checklist' | 'risk' | 'reference' | null;

const OnJobAssessment = () => {
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const progress = useAssessmentProgress();
  const totalCount = getTotalItemCount();

  const toggleTool = (tool: ActiveTool) => {
    setActiveTool((prev) => (prev === tool ? null : tool));
  };

  const toolCards: {
    id: ActiveTool;
    label: string;
    icon: React.ElementType;
    color: string;
    borderColor: string;
    bgColor: string;
    description: string;
  }[] = [
    {
      id: 'checklist',
      label: 'Site Checklist',
      icon: ClipboardCheck,
      color: 'text-green-400',
      borderColor: 'border-green-500/30',
      bgColor: 'bg-green-500/10',
      description: `${progress.completedCount}/${totalCount} checks`,
    },
    {
      id: 'risk',
      label: 'Risk Assessment',
      icon: AlertTriangle,
      color: 'text-red-400',
      borderColor: 'border-red-500/30',
      bgColor: 'bg-red-500/10',
      description: `${progress.riskAssessments.length} saved`,
    },
    {
      id: 'reference',
      label: 'Quick Reference',
      icon: BookOpen,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      description: '9 reference cards',
    },
  ];

  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/on-job-tools')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Site Assessment"
          title="Pre-job site assessment"
          description="Site checklist, risk assessment flow, and a quick-reference card stack — pre-job prep that catches the things you'd otherwise notice halfway up the ladder."
          tone="yellow"
        />
      </motion.div>

        {/* Progress Strip */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            {progress.completedCount === totalCount && totalCount > 0 ? (
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
            ) : (
              <ClipboardCheck className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            )}
            <span className="text-sm text-white font-medium">
              {progress.completedCount}/{totalCount} checks
            </span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0" />
            <span className="text-sm text-white">
              {progress.riskAssessments.length} risk assessment
              {progress.riskAssessments.length !== 1 ? 's' : ''}
            </span>
          </div>
          <div className="flex-1" />
          <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full rounded-full bg-green-500 transition-all duration-500"
              style={{
                width: `${totalCount > 0 ? (progress.completedCount / totalCount) * 100 : 0}%`,
              }}
            />
          </div>
        </div>

        {/* Tool Cards */}
        <div className="grid grid-cols-3 gap-3">
          {toolCards.map((tool) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            return (
              <button
                key={tool.id}
                onClick={() => toggleTool(tool.id)}
                className={`
                  p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.98]
                  ${
                    isActive
                      ? `${tool.bgColor} ${tool.borderColor} ring-2 ring-white/10`
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }
                `}
              >
                <div className={`p-2 rounded-lg ${tool.bgColor} inline-block mb-2`}>
                  <Icon className={`h-5 w-5 ${tool.color}`} />
                </div>
                <div className={`text-sm font-semibold ${isActive ? tool.color : 'text-white'}`}>
                  {tool.label}
                </div>
                <div className="text-xs text-white mt-1">{tool.description}</div>
              </button>
            );
          })}
        </div>

        {/* Active Tool Content */}
        {activeTool === 'checklist' && <SiteAssessmentWizard progress={progress} />}

        {activeTool === 'risk' && <RiskAssessmentFlow progress={progress} />}

        {activeTool === 'reference' && <QuickReferenceCards />}

        {/* Safety Banner */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-500/10 via-green-500/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-green-500/20 flex-shrink-0">
                <Shield className="h-4 w-4 text-green-400" />
              </div>
              <p className="text-sm text-white">
                Always complete a thorough site assessment before beginning any electrical work.
                When in doubt,{' '}
                <span className="font-medium text-green-300">
                  stop work and consult your supervisor
                </span>
                .
              </p>
            </div>
          </CardContent>
        </Card>
    </PageFrame>
  );
};

export default OnJobAssessment;
