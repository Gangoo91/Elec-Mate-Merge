import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Clock,
  Target,
  RotateCcw,
  BookOpen,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
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
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import useSEO from '@/hooks/useSEO';

const examFeatures = [
  { icon: BookOpen, label: '200-question bank', description: 'Randomly selected each attempt so no two exams are the same.' },
  { icon: Target, label: '20 questions per exam', description: 'Balanced across all five content modules for fair coverage.' },
  { icon: Clock, label: '30-minute timer', description: 'Timed under exam conditions with a 5-minute warning alert.' },
  { icon: ShieldCheck, label: '80% pass mark (16/20)', description: 'Matches the standard required by MHFA training assessments.' },
  { icon: RotateCcw, label: 'Unlimited retakes', description: 'Practise as many times as you need until you feel confident.' },
];

const categories = [
  { module: 'Module 1', name: 'Mental health fundamentals', count: 40 },
  { module: 'Module 2', name: 'Depression, anxiety & stress', count: 40 },
  { module: 'Module 3', name: 'Substance misuse, self-harm & suicide', count: 40 },
  { module: 'Module 4', name: 'Psychosis, eating disorders & complex needs', count: 40 },
  { module: 'Module 5', name: 'Workplace implementation & wellbeing', count: 40 },
];

const preparationTips = [
  { title: 'Review all five modules', description: 'Questions are drawn from Mental Health Fundamentals, Depression & Anxiety, Substance Misuse & Suicide, Psychosis & Complex Needs, and Workplace Implementation. Cover every module before attempting the exam.' },
  { title: 'Know the ALGEE action plan', description: 'Approach, Listen, Give support, Encourage professional help, Encourage other supports. This framework underpins the entire MHFA approach and is heavily tested.' },
  { title: 'Understand the legal framework', description: 'The Health and Safety at Work Act 1974, Equality Act 2010 (mental health as disability), HSE Management Standards, and the Thriving at Work core standards. Know what employers must do.' },
  { title: 'Remember key statistics and warning signs', description: '1 in 4 adults experience mental health problems each year. Construction has the highest suicide rate of any UK industry (3.7x the national average). Know the risk factors and protective factors.' },
  { title: 'Master crisis intervention', description: 'The TASC model (Tell, Ask, Safety plan, Call), when to call 999, how to ask about suicide directly, safety planning, and key helpline numbers (Samaritans 116 123, SHOUT 85258).' },
  { title: 'Flag and return', description: 'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.' },
];

export default function MentalHealthModule6() {
  const navigate = useNavigate();
  useSEO({
    title: 'Mental Health First Aid mock exam | Module 6 | Elec-Mate',
    description:
      'Test your Mental Health First Aid knowledge with a timed mock examination. 200-question bank, 20 random questions, 30-minute timer.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../mental-health-course')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Mental Health First Aid
          </button>

          <PageHero
            eyebrow="Module 6 · Final assessment"
            title="Mock exam"
            description="Put your Mental Health First Aid knowledge to the test under timed exam conditions. Questions are drawn from a 200-question bank covering all five content modules."
            tone="yellow"
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
            to="../mental-health-mock-exam"
            className="block touch-manipulation focus:outline-none"
          >
            <div className="rounded-2xl bg-gradient-to-br from-elec-yellow/15 via-amber-500/10 to-transparent border border-elec-yellow/30 p-5 sm:p-6 active:scale-[0.99] transition-transform">
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
                <PrimaryButton size="lg" onClick={() => navigate('../mental-health-mock-exam')}>
                  <GraduationCap className="h-5 w-5 mr-2" /> Start
                </PrimaryButton>
              </div>
            </div>
          </Link>

          {/* Exam format */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/70 via-amber-400/70 to-orange-400/70 opacity-70" />
              <div className="text-[13px] font-semibold text-white">Exam format</div>
            </div>
            <div>
              {examFeatures.map((f) => (
                <ListRow
                  key={f.label}
                  lead={
                    <div className="h-8 w-8 rounded-lg bg-elec-yellow/15 border border-elec-yellow/30 flex items-center justify-center shrink-0">
                      <f.icon className="h-4 w-4 text-elec-yellow" />
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
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-purple-500/70 via-violet-400/70 to-fuchsia-400/70 opacity-70" />
              <div className="text-[13px] font-semibold text-white">Category coverage</div>
              <div className="mt-1 text-[11px] text-white">
                4 questions drawn from each category per exam (20 total)
              </div>
            </div>
            <div>
              {categories.map((c) => (
                <ListRow
                  key={c.name}
                  lead={<span className="h-2 w-2 rounded-full bg-purple-400 block" />}
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
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-amber-500/70 via-yellow-400/70 to-orange-400/70 opacity-70" />
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
                    <div className="h-7 w-7 rounded-full bg-elec-yellow/10 border border-elec-yellow/30 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-elec-yellow">{i + 1}</span>
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
