import { Link, useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  Target,
  RotateCcw,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';

import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListRow,
  Eyebrow,
  PrimaryButton,
} from '@/components/college/primitives';
import useSEO from '@/hooks/useSEO';

const examFeatures = [
  { icon: BookOpen, label: '200-question bank', description: 'Randomly selected each attempt so no two exams are the same.' },
  { icon: Target, label: '20 questions per exam', description: 'Balanced across all five content modules for fair coverage.' },
  { icon: Clock, label: '30-minute timer', description: 'Timed under exam conditions with a 5-minute warning alert.' },
  { icon: ShieldCheck, label: '80% pass mark (16/20)', description: 'Matches the standard required by fire safety awareness assessments.' },
  { icon: RotateCcw, label: 'Unlimited retakes', description: 'Practise as many times as you need until you feel confident.' },
];

const categories = [
  { module: 'Module 1', name: 'Understanding fire', count: 40 },
  { module: 'Module 2', name: 'Fire safety legislation', count: 40 },
  { module: 'Module 3', name: 'Fire prevention & detection', count: 40 },
  { module: 'Module 4', name: 'Fire marshal duties & evacuation', count: 40 },
  { module: 'Module 5', name: 'Firefighting equipment & incident response', count: 40 },
];

const preparationTips = [
  { title: 'Know the Regulatory Reform Order', description: 'RRFSO 2005 structure, articles, responsible person duties, and relationship to other fire safety legislation.' },
  { title: 'Learn the fire classes', description: 'Know all 6 classes (A-F), examples of each, and which extinguisher types are suitable (including which ones must NEVER be used on certain classes).' },
  { title: 'Understand detection standards', description: 'BS 5839 Part 1 category system (L1-L5, P1-P2), detector types, and where each is appropriate.' },
  { title: 'Master evacuation strategies', description: 'Simultaneous, phased, progressive horizontal and defend-in-place strategies, PEEPs, refuges and the role of fire marshals.' },
  { title: 'Know your extinguishers', description: 'Colour codes (BS EN 3), operating procedures (PASS technique), placement rules and maintenance requirements.' },
  { title: 'Flag and return', description: 'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.' },
];

export default function FireSafetyModule6() {
  const navigate = useNavigate();
  useSEO({
    title: 'Fire Safety & Fire Marshal Mock Exam | Module 6 | Elec-Mate',
    description:
      'Test your fire safety and fire marshal knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../fire-safety-course')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Fire safety & fire marshal
          </button>

          <PageHero
            eyebrow="Module 6 · Final assessment"
            title="Mock exam"
            description="Put your fire safety and fire marshal knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules."
            tone="amber"
          />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Questions', value: 20, sub: 'Per attempt' },
              { label: 'Time', value: '30m', sub: 'Timer enforced' },
              { label: 'Pass mark', value: '80%', sub: '16 / 20 correct' },
              { label: 'Retakes', value: '∞', sub: 'No cap' },
            ]}
          />

          <Link
            to="../fire-safety-mock-exam"
            className="block touch-manipulation focus:outline-none"
          >
            <div className="rounded-2xl bg-gradient-to-br from-amber-500/15 via-orange-500/10 to-transparent border border-amber-500/30 p-5 sm:p-6 active:scale-[0.99] transition-transform">
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <Eyebrow>Ready when you are</Eyebrow>
                  <div className="mt-1.5 text-[18px] sm:text-[20px] font-semibold text-white">
                    Start mock exam
                  </div>
                  <div className="mt-1 text-[12px] text-white">
                    Different questions each attempt — retake as often as you like.
                  </div>
                </div>
                <PrimaryButton size="lg" onClick={() => navigate('../fire-safety-mock-exam')}>
                  <GraduationCap className="h-5 w-5 mr-2" /> Start
                </PrimaryButton>
              </div>
            </div>
          </Link>

          {/* Exam format */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500/70 via-orange-400/70 to-red-400/70 opacity-70" />
              <div className="text-[13px] font-semibold text-white">Exam format</div>
            </div>
            <div>
              {examFeatures.map((f) => (
                <ListRow
                  key={f.label}
                  lead={
                    <div className="h-8 w-8 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <f.icon className="h-4 w-4 text-amber-300" />
                    </div>
                  }
                  title={f.label}
                  subtitle={f.description}
                />
              ))}
            </div>
          </ListCard>

          {/* Category coverage */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500/70 via-orange-400/70 to-red-400/70 opacity-70" />
              <div className="text-[13px] font-semibold text-white">Category coverage</div>
              <div className="mt-1 text-[11px] text-white">
                4 questions drawn from each category per exam (20 total)
              </div>
            </div>
            <div>
              {categories.map((c) => (
                <ListRow
                  key={c.name}
                  lead={<span className="h-2 w-2 rounded-full bg-amber-400 block" />}
                  title={c.name}
                  subtitle={c.module}
                  trailing={
                    <span className="text-[11.5px] text-white">{c.count} questions</span>
                  }
                />
              ))}
            </div>
          </ListCard>

          {/* Preparation tips */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-orange-500/70 via-amber-400/70 to-yellow-400/70 opacity-70" />
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <div className="text-[13px] font-semibold text-white">Preparation tips</div>
              </div>
            </div>
            <div>
              {preparationTips.map((tip, i) => (
                <ListRow
                  key={tip.title}
                  lead={
                    <div className="h-7 w-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-amber-300">{i + 1}</span>
                    </div>
                  }
                  title={tip.title}
                  subtitle={tip.description}
                />
              ))}
            </div>
          </ListCard>

          {/* After-exam tip */}
          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-4 flex items-start gap-3">
            <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-[12.5px] text-emerald-200 leading-relaxed">
              After completing the exam you'll see a full breakdown by category, including which areas
              need more revision. Use this to focus your study before retaking.
            </p>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
