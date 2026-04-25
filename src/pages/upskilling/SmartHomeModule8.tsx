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
  { icon: BookOpen, label: '210-question bank', description: 'Randomly selected each attempt so no two exams are the same.' },
  { icon: Target, label: '30 questions per exam', description: 'Balanced across all seven content modules for fair coverage.' },
  { icon: Clock, label: '60-minute timer', description: 'Timed under exam conditions with a 5-minute warning alert.' },
  { icon: ShieldCheck, label: '70% pass mark (21/30)', description: 'Matches the standard required by smart home installer assessments.' },
  { icon: RotateCcw, label: 'Unlimited retakes', description: 'Practise as many times as you need until you feel confident.' },
];

const categories = [
  { module: 'Module 1', name: 'Smart home fundamentals', count: 30 },
  { module: 'Module 2', name: 'Communication protocols', count: 30 },
  { module: 'Module 3', name: 'Lighting and scene programming', count: 30 },
  { module: 'Module 4', name: 'HVAC and environmental control', count: 30 },
  { module: 'Module 5', name: 'Security and access control', count: 30 },
  { module: 'Module 6', name: 'Hubs and voice assistants', count: 30 },
  { module: 'Module 7', name: 'Installation and safety', count: 30 },
];

const preparationTips = [
  { title: 'Review every module', description: 'Questions are drawn equally from all seven content modules. Cover each before attempting the exam.' },
  { title: 'Know your protocols', description: 'Zigbee vs Z-Wave, Wi-Fi, Thread and Matter are heavily tested. Understand mesh behaviour, range and power use for each.' },
  { title: 'Understand BS 7671 alignment', description: 'Smart home installs still need to comply with BS 7671. Know isolation, segregation and notification requirements.' },
  { title: 'Get the architectures straight', description: 'Local vs cloud vs hybrid, hub vs hubless — each has trade-offs. Know which fits which use case.' },
  { title: 'Master commissioning', description: 'Device pairing, RF verification and customer handover come up frequently. Walk through the workflow before you sit down.' },
  { title: 'Flag and return', description: 'Flag questions you are unsure about and return to them later. Do not spend too long on any single question.' },
];

export default function SmartHomeModule8() {
  const navigate = useNavigate();
  useSEO({
    title: 'Smart Home Mock Exam | Module 8 | Elec-Mate',
    description: 'Test your smart home knowledge with a timed mock examination — 210-question bank, 30 random questions and a 60-minute timer.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('../smart-home-course')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Smart home technology
          </button>

          <PageHero
            eyebrow="Module 8 · Final assessment"
            title="Mock exam"
            description="Put your smart home knowledge to the test under timed exam conditions. Questions are drawn from a 210-question bank covering all seven content modules."
            tone="cyan"
          />

          <StatStrip
            columns={4}
            stats={[
              { label: 'Questions', value: 30, sub: 'Per attempt' },
              { label: 'Time', value: '60m', sub: 'Timer enforced' },
              { label: 'Pass mark', value: '70%', sub: '21 / 30 correct' },
              { label: 'Retakes', value: '∞', sub: 'No cap' },
            ]}
          />

          <Link to="../smart-home-mock-exam" className="block touch-manipulation focus:outline-none">
            <div className="rounded-2xl bg-gradient-to-br from-cyan-500/15 via-sky-500/10 to-transparent border border-cyan-500/30 p-5 sm:p-6 active:scale-[0.99] transition-transform">
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
                <PrimaryButton size="lg" onClick={() => navigate('../smart-home-mock-exam')}>
                  <GraduationCap className="h-5 w-5 mr-2" /> Start
                </PrimaryButton>
              </div>
            </div>
          </Link>

          {/* Exam format */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-cyan-400/70 via-sky-400/70 to-blue-400/70 opacity-70" />
              <div className="text-[13px] font-semibold text-white">Exam format</div>
            </div>
            <div>
              {examFeatures.map((f) => (
                <ListRow
                  key={f.label}
                  lead={
                    <div className="h-8 w-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <f.icon className="h-4 w-4 text-cyan-400" />
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
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-blue-500/70 via-sky-400/70 to-cyan-400/70 opacity-70" />
              <div className="text-[13px] font-semibold text-white">Category coverage</div>
              <div className="mt-1 text-[11px] text-white">
                Questions drawn from each category per exam (30 total)
              </div>
            </div>
            <div>
              {categories.map((c) => (
                <ListRow
                  key={c.name}
                  lead={<span className="h-2 w-2 rounded-full bg-cyan-400 block" />}
                  title={c.name}
                  subtitle={c.module}
                  trailing={<span className="text-[11.5px] text-white">{c.count} questions</span>}
                />
              ))}
            </div>
          </ListCard>

          {/* Preparation tips */}
          <ListCard>
            <div className="relative px-5 sm:px-6 py-3.5 sm:py-4 border-b border-white/[0.06]">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-sky-500/70 via-cyan-400/70 to-blue-400/70 opacity-70" />
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-cyan-400 shrink-0" />
                <div className="text-[13px] font-semibold text-white">Preparation tips</div>
              </div>
            </div>
            <div>
              {preparationTips.map((tip, i) => (
                <ListRow
                  key={tip.title}
                  lead={
                    <div className="h-7 w-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <span className="text-[11px] font-bold text-cyan-400">{i + 1}</span>
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
