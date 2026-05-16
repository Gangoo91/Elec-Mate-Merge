/**
 * MentalHealthResources — editorial directory of external support, self-help,
 * and emergency contacts. The wrapper handles eyebrow/headline; this file
 * provides the three sections: external services, self-help, emergency.
 */

import MentalHealthPageLayout from '@/components/mental-health/MentalHealthPageLayout';
import { ExternalLink, PhoneCall, MessageSquare, Siren } from 'lucide-react';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  Eyebrow,
  SectionHeader,
} from '@/components/apprentice-hub/portfolio/PortfolioPrimitives';

interface ExternalResource {
  title: string;
  description: string;
  url: string;
  type: string;
}

interface SelfHelpResource {
  title: string;
  description: string;
  type: string;
}

const externalResources: ExternalResource[] = [
  {
    title: 'Mind — mental health charity',
    description: 'Information and support for mental health problems',
    url: 'https://www.mind.org.uk/',
    type: 'Website',
  },
  {
    title: 'NHS mental health services',
    description: 'Find local NHS mental health support and services',
    url: 'https://www.nhs.uk/mental-health/',
    type: 'Healthcare',
  },
  {
    title: 'Samaritans',
    description: 'Free confidential emotional support, 24/7',
    url: 'https://www.samaritans.org/',
    type: 'Helpline',
  },
  {
    title: 'CALM — Campaign Against Living Miserably',
    description: 'Support specifically for men facing difficult times',
    url: 'https://www.thecalmzone.net/',
    type: 'Support',
  },
  {
    title: 'Mental Health First Aid England',
    description: 'Training and resources for mental health awareness',
    url: 'https://mhfaengland.org/',
    type: 'Training',
  },
  {
    title: 'Electrical Industries Charity',
    description: 'Practical, emotional, and financial support for electrical workers',
    url: 'https://www.electricalcharity.org/',
    type: 'Industry support',
  },
];

const selfHelpResources: SelfHelpResource[] = [
  {
    title: 'Stress management techniques',
    description: 'Practical techniques for managing workplace stress',
    type: 'Guide',
  },
  {
    title: 'Mindfulness for apprentices',
    description: 'Simple mindfulness exercises you can do during breaks',
    type: 'Audio · video',
  },
  {
    title: 'Work-life balance planner',
    description: 'A tool to help you plan and maintain healthy boundaries',
    type: 'Interactive tool',
  },
  {
    title: 'Mental health first aid',
    description: 'Recognise and respond to mental health issues — in yourself and others',
    type: 'Educational',
  },
];

const MentalHealthResources = () => {
  return (
    <MentalHealthPageLayout
      title="Mental health resources"
      description="External support, self-help, and emergency contacts — all in one place. Use what helps, when it helps."
    >
      <div className="space-y-7 sm:space-y-8">
        {/* ── External support ─────────────────────────────────────── */}
        <section className="space-y-3">
          <SectionHeader
            eyebrow="External support"
            title="People to talk to"
            meta="UK-wide services — confidential, mostly free"
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {externalResources.map((resource) => (
              <li
                key={resource.title}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[14px] font-semibold text-white leading-snug flex-1 min-w-0">
                      {resource.title}
                    </h4>
                    <span className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 flex-shrink-0">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-white/85 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => openExternalUrl(resource.url)}
                  className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-md border border-white/[0.08] bg-white/[0.02] text-[12px] font-medium text-white/85 hover:bg-white/[0.04] active:scale-[0.98] transition-all touch-manipulation"
                >
                  Visit resource
                  <ExternalLink className="h-3 w-3" />
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Self-help ────────────────────────────────────────────── */}
        <section className="space-y-3">
          <SectionHeader
            eyebrow="Self-help"
            title="Things you can do yourself"
            meta="Short exercises and guides, ready when you are"
          />
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {selfHelpResources.map((resource) => (
              <li
                key={resource.title}
                className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="text-[14px] font-semibold text-white leading-snug flex-1 min-w-0">
                      {resource.title}
                    </h4>
                    <span className="inline-flex items-center h-6 px-2 rounded-md border border-white/[0.08] bg-white/[0.02] text-[10px] font-medium uppercase tracking-[0.14em] text-white/85 flex-shrink-0">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-white/85 leading-relaxed">
                    {resource.description}
                  </p>
                </div>
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-1.5 h-10 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06] text-[12px] font-medium text-elec-yellow hover:bg-elec-yellow/[0.10] active:scale-[0.98] transition-all touch-manipulation"
                >
                  Access resource
                </button>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Emergency contacts ───────────────────────────────────── */}
        <section className="space-y-3">
          <SectionHeader
            eyebrow="If you're in crisis"
            title="Emergency contacts"
            meta="If you or someone you know is in immediate danger, call 999"
          />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
            <li className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-red-500/30 bg-red-500/[0.06]">
                <Siren className="h-3 w-3 text-red-300" />
                <Eyebrow className="text-red-300">Emergency</Eyebrow>
              </div>
              <a
                href="tel:999"
                className="block text-[28px] sm:text-[32px] font-mono font-semibold tabular-nums leading-none text-white hover:text-red-300 transition-colors touch-manipulation py-1"
              >
                999
              </a>
              <p className="text-[12px] text-white/85 leading-relaxed">
                Immediate danger or serious mental health crisis
              </p>
            </li>

            <li className="rounded-xl border border-elec-yellow/30 bg-elec-yellow/[0.04] p-4 sm:p-5 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-elec-yellow/30 bg-elec-yellow/[0.06]">
                <PhoneCall className="h-3 w-3 text-elec-yellow" />
                <Eyebrow className="text-elec-yellow/85">Crisis line</Eyebrow>
              </div>
              <a
                href="tel:116123"
                className="block text-[22px] sm:text-[26px] font-mono font-semibold tabular-nums leading-none text-white hover:text-elec-yellow transition-colors touch-manipulation py-1"
              >
                116 123
              </a>
              <p className="text-[12px] text-white/85 leading-relaxed">
                Samaritans — free 24/7 emotional support
              </p>
            </li>

            <li className="rounded-xl border border-white/[0.08] bg-[hsl(0_0%_10%)] p-4 sm:p-5 text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md border border-white/[0.10] bg-white/[0.03]">
                <MessageSquare className="h-3 w-3 text-white/85" />
                <Eyebrow>Text support</Eyebrow>
              </div>
              <a
                href="sms:85258?body=SHOUT"
                className="block text-[16px] sm:text-[18px] font-semibold leading-tight text-white hover:text-elec-yellow transition-colors touch-manipulation py-1"
              >
                Text SHOUT
                <br />
                <span className="font-mono tabular-nums">to 85258</span>
              </a>
              <p className="text-[12px] text-white/85 leading-relaxed">
                Free 24/7 crisis text line
              </p>
            </li>
          </ul>
        </section>
      </div>
    </MentalHealthPageLayout>
  );
};

export default MentalHealthResources;
