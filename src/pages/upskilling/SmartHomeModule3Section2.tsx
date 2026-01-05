import React, { useEffect, lazy, Suspense } from 'react';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
const SmartHomeModule3Section2Intro = lazy(() => import('@/components/upskilling/smart-home/SmartHomeModule3Section2Intro').then(m => ({ default: m.SmartHomeModule3Section2Intro })));
const SmartHomeModule3Section2LearningOutcomes = lazy(() => import('@/components/upskilling/smart-home/SmartHomeModule3Section2LearningOutcomes').then(m => ({ default: m.SmartHomeModule3Section2LearningOutcomes })));
const WhatAreLightingScenesSection = lazy(() => import('@/components/upskilling/smart-home/WhatAreLightingScenesSection').then(m => ({ default: m.WhatAreLightingScenesSection })));
const WhatAreSchedulesSection = lazy(() => import('@/components/upskilling/smart-home/WhatAreSchedulesSection').then(m => ({ default: m.WhatAreSchedulesSection })));
const LightingSceneQuickCheck = lazy(() => import('@/components/upskilling/smart-home/LightingSceneQuickCheck').then(m => ({ default: m.LightingSceneQuickCheck })));
const TimeBasedScheduleQuickCheck = lazy(() => import('@/components/upskilling/smart-home/TimeBasedScheduleQuickCheck').then(m => ({ default: m.TimeBasedScheduleQuickCheck })));
const BenefitsOfScenesSchedulesSection = lazy(() => import('@/components/upskilling/smart-home/BenefitsOfScenesSchedulesSection').then(m => ({ default: m.BenefitsOfScenesSchedulesSection })));
const ConditionBasedSchedulingQuickCheck = lazy(() => import('@/components/upskilling/smart-home/ConditionBasedSchedulingQuickCheck').then(m => ({ default: m.ConditionBasedSchedulingQuickCheck })));
const ToolsForSceneCreationSection = lazy(() => import('@/components/upskilling/smart-home/ToolsForSceneCreationSection').then(m => ({ default: m.ToolsForSceneCreationSection })));
const BestPracticesSceneProgrammingSection = lazy(() => import('@/components/upskilling/smart-home/BestPracticesSceneProgrammingSection').then(m => ({ default: m.BestPracticesSceneProgrammingSection })));
const LimitationsAndChallengesSection = lazy(() => import('@/components/upskilling/smart-home/LimitationsAndChallengesSection').then(m => ({ default: m.LimitationsAndChallengesSection })));
const OverAutomationRiskQuickCheck = lazy(() => import('@/components/upskilling/smart-home/OverAutomationRiskQuickCheck').then(m => ({ default: m.OverAutomationRiskQuickCheck })));
const SmartHomeModule3Section2RealWorld = lazy(() => import('@/components/upskilling/smart-home/SmartHomeModule3Section2RealWorld').then(m => ({ default: m.SmartHomeModule3Section2RealWorld })));
const PracticalSceneDesignSection = lazy(() => import('@/components/upskilling/smart-home/PracticalSceneDesignSection').then(m => ({ default: m.PracticalSceneDesignSection })));
const HandsOnScheduleConfigurationSection = lazy(() => import('@/components/upskilling/smart-home/HandsOnScheduleConfigurationSection').then(m => ({ default: m.HandsOnScheduleConfigurationSection })));
const SmartHomeModule3Section2FAQ = lazy(() => import('@/components/upskilling/smart-home/SmartHomeModule3Section2FAQ').then(m => ({ default: m.SmartHomeModule3Section2FAQ })));
const SmartHomeModule3Section2Quiz = lazy(() => import('@/components/upskilling/smart-home/SmartHomeModule3Section2Quiz').then(m => ({ default: m.SmartHomeModule3Section2Quiz })));


const SmartHomeModule3Section2 = () => {
  useEffect(() => {
    document.title = 'Scene-Based Control and Schedules | Smart Home Module 3 Section 2';
    const desc = 'Master lighting scenes, schedules and automation. Learn time-based, event-based and condition-based control for comfort, security and energy efficiency.';
    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    if (meta) meta.content = desc;

    // Canonical URL for SEO
    const canonicalHref = window.location.origin + '/smart-home-module-3-section-2';
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonicalHref;
  }, []);

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../smart-home-module-3">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6 max-w-5xl mx-auto">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Clock className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">Scene-Based Control and Schedules</h1>
                <p className="text-lg text-white">Programming lighting scenes and automated schedules</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge className="bg-card text-yellow-400 border border-gray-600">Module 3 - Section 2</Badge>
            </div>
          </div>

          <Suspense fallback={<div className="text-white">Loading content…</div>}>
            <SmartHomeModule3Section2Intro />
            <SmartHomeModule3Section2LearningOutcomes />
            <WhatAreLightingScenesSection />
            <LightingSceneQuickCheck />
            <WhatAreSchedulesSection />
            <TimeBasedScheduleQuickCheck />
            <BenefitsOfScenesSchedulesSection />
            <ConditionBasedSchedulingQuickCheck />
            <ToolsForSceneCreationSection />
            <BestPracticesSceneProgrammingSection />
            <LimitationsAndChallengesSection />
            <OverAutomationRiskQuickCheck />
            <SmartHomeModule3Section2RealWorld />
            <PracticalSceneDesignSection />
            <HandsOnScheduleConfigurationSection />
            <SmartHomeModule3Section2FAQ />
            <SmartHomeModule3Section2Quiz />
          </Suspense>

          <div className="flex justify-between mt-8">
            <Link to="../smart-home-module-3-section-1">
              <Button variant="outline" className="border-gray-600 text-white hover:bg-card/80 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../smart-home-module-3-section-3">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SmartHomeModule3Section2;