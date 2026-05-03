import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Zap, FileText, BookOpen, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';
import { useBS7671Progress } from '@/components/apprentice/bs7671/hooks/useBS7671Progress';
import { allBS7671Tests } from '@/data/bs7671-testing/allBS7671Tests';
import TestingProceduresPanel from '@/components/apprentice/bs7671/TestingProceduresPanel';
import CertificateGuidePanel from '@/components/apprentice/bs7671/CertificateGuidePanel';
import BS7671QuickReferencePanel from '@/components/apprentice/bs7671/BS7671QuickReferencePanel';

type ActiveTool = 'testing' | 'certificates' | 'reference' | null;

const TOTAL_TESTS = allBS7671Tests.length;

const OnJobBS7671RunThrough = () => {
  const navigate = useNavigate();
  const [activeTool, setActiveTool] = useState<ActiveTool>(null);
  const progress = useBS7671Progress();

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
      id: 'testing',
      label: 'Testing Procedures',
      icon: Zap,
      color: 'text-cyan-400',
      borderColor: 'border-cyan-500/30',
      bgColor: 'bg-cyan-500/10',
      description: `${progress.completedTestCount}/${TOTAL_TESTS} tests`,
    },
    {
      id: 'certificates',
      label: 'Certificate Guide',
      icon: FileText,
      color: 'text-blue-400',
      borderColor: 'border-blue-500/30',
      bgColor: 'bg-blue-500/10',
      description: '5 certificate types',
    },
    {
      id: 'reference',
      label: 'Quick Reference',
      icon: BookOpen,
      color: 'text-green-400',
      borderColor: 'border-green-500/30',
      bgColor: 'bg-green-500/10',
      description: '9 reference cards',
    },
  ];

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
          eyebrow="Apprentice · BS 7671"
          title="Inspection & testing"
          description="Reflects BS 7671:2018+A4:2026. Walk through the testing procedures, certificate types, and quick-reference for AM2E and on-site work."
          tone="yellow"
        />
      </motion.div>

        {/* Progress Strip */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2">
            {progress.completedTestCount === TOTAL_TESTS && TOTAL_TESTS > 0 ? (
              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
            ) : (
              <Zap className="h-4 w-4 text-cyan-400 flex-shrink-0" />
            )}
            <span className="text-sm text-white font-medium">
              {progress.completedTestCount}/{TOTAL_TESTS} tests completed
            </span>
          </div>
          <div className="h-4 w-px bg-white/20" />
          <div className="flex items-center gap-2">
            <span className="text-sm text-white">{progress.totalStepsCompleted} steps done</span>
          </div>
          <div className="flex-1" />
          <div className="h-1.5 w-16 bg-white/10 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full rounded-full bg-cyan-500 transition-all duration-500"
              style={{
                width: `${TOTAL_TESTS > 0 ? (progress.completedTestCount / TOTAL_TESTS) * 100 : 0}%`,
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
        {activeTool === 'testing' && <TestingProceduresPanel progress={progress} />}

        {activeTool === 'certificates' && <CertificateGuidePanel />}

        {activeTool === 'reference' && <BS7671QuickReferencePanel />}

        {/* Compliance Banner */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/20 flex-shrink-0">
                <Shield className="h-4 w-4 text-cyan-400" />
              </div>
              <p className="text-sm text-white">
                All electrical installation work must comply with BS 7671:2018+A3:2024 (18th Edition
                including Amendment 3). Follow the correct testing sequence, document all results
                accurately, and ensure{' '}
                <span className="font-medium text-cyan-300">safe isolation procedures</span> are
                followed at all times.
              </p>
            </div>
          </CardContent>
        </Card>
    </PageFrame>
  );
};

export default OnJobBS7671RunThrough;
