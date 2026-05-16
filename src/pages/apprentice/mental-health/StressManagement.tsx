/**
 * StressManagement — editorial workplace stress management page.
 *
 * Composes shared mental-health components plus an editorial
 * "stress management techniques" card and a "when to seek additional
 * help" block. Wrapper handles eyebrow/headline.
 */

import MentalHealthPageLayout from '@/components/mental-health/MentalHealthPageLayout';
import InteractiveStressAssessment from '@/components/mental-health/stress/InteractiveStressAssessment';
import BreathingExercise from '@/components/mental-health/stress/BreathingExercise';
import ApprenticeScenarios from '@/components/mental-health/stress/ApprenticeScenarios';
import StressSignsCards from '@/components/mental-health/stress/StressSignsCards';
import ApprenticeStressors from '@/components/mental-health/stress/ApprenticeStressors';
import QuickTips from '@/components/mental-health/stress/QuickTips';
import AdvancedTechniques from '@/components/mental-health/stress/AdvancedTechniques';
import ResourcesSection from '@/components/mental-health/stress/ResourcesSection';
import SupportCallout from '@/components/mental-health/stress/SupportCallout';
import { AlertTriangle, PhoneCall } from 'lucide-react';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

const warningSigns = [
  'Persistent feelings of overwhelm',
  'Physical symptoms affecting work performance',
  'Difficulty sleeping for several nights',
  'Withdrawing from colleagues and friends',
  'Increased irritability or mood swings',
];

const whoToContact = [
  'Your line manager or supervisor',
  'Training provider or college support team',
  'GP or occupational health service',
  'Employee assistance programme (if available)',
  'Mental health crisis services if urgent',
];

const StressManagement = () => {
  return (
    <MentalHealthPageLayout
      title="Managing workplace stress"
      description="Techniques for handling stress on job sites and during training. Self-assessment, breathing exercises, real apprentice scenarios, and where to turn when it's more than you can manage alone."
    >
      <div className="space-y-7 sm:space-y-8">
        <InteractiveStressAssessment />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <BreathingExercise />
          <ApprenticeScenarios />
        </div>

        <ApprenticeStressors />
        <StressSignsCards />

        {/* ── Techniques ─────────────────────────────────────────── */}
        <section className="space-y-3">
          <SectionHeader
            eyebrow="Techniques"
            title="Stress management toolbox"
            meta="Quick tips for the moment, advanced techniques for the long term"
          />
          <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-6">
            <QuickTips />
            <AdvancedTechniques />
          </div>
        </section>

        <ResourcesSection />

        {/* ── When to seek help ─────────────────────────────────── */}
        <section className="space-y-3">
          <SectionHeader
            eyebrow="When to seek additional help"
            title="Recognising the line"
            meta="No shame in asking — it's the strong move"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            <div className="rounded-xl border border-red-500/25 bg-red-500/[0.04] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-300 flex-shrink-0" />
                <Eyebrow className="text-red-300">Warning signs</Eyebrow>
              </div>
              <ul className="space-y-1.5">
                {warningSigns.map((sign) => (
                  <li
                    key={sign}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <span className="text-red-300 mt-0.5">·</span>
                    <span>{sign}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-elec-yellow/25 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2">
                <PhoneCall className="h-4 w-4 text-elec-yellow flex-shrink-0" />
                <Eyebrow className="text-elec-yellow/85">Who to contact</Eyebrow>
              </div>
              <ul className="space-y-1.5">
                {whoToContact.map((contact) => (
                  <li
                    key={contact}
                    className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                  >
                    <span className="text-elec-yellow/70 mt-0.5">·</span>
                    <span>{contact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <SupportCallout />
      </div>
    </MentalHealthPageLayout>
  );
};

export default StressManagement;
