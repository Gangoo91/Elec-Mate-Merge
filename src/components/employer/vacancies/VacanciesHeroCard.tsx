import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Briefcase, Users, Clock, TrendingUp, Plus, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  PageHero,
  StatStrip,
  PrimaryButton,
  Pill,
  type Tone,
} from '@/components/employer/editorial';

interface StatItem {
  label: string;
  value: number;
  icon: typeof Briefcase;
  tone: Tone;
  suffix?: string;
}

interface VacanciesHeroCardProps {
  openVacancies: number;
  totalApplicants: number;
  newApplicants: number;
  fillRate: number;
  onPostVacancy: () => void;
}

function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const spring = useSpring(0, { stiffness: 100, damping: 30 });
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString());
  const [displayValue, setDisplayValue] = useState('0');

  useEffect(() => {
    spring.set(value);
    const unsubscribe = display.on('change', (v) => setDisplayValue(v));
    return () => unsubscribe();
  }, [value, spring, display]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}

export function VacanciesHeroCard({
  openVacancies,
  totalApplicants,
  newApplicants,
  fillRate,
  onPostVacancy,
}: VacanciesHeroCardProps) {
  const stats: StatItem[] = [
    { label: 'Open Roles', value: openVacancies, icon: Briefcase, tone: 'yellow' },
    { label: 'Applicants', value: totalApplicants, icon: Users, tone: 'emerald' },
    { label: 'New Today', value: newApplicants, icon: Clock, tone: 'blue' },
    { label: 'Fill Rate', value: fillRate, icon: TrendingUp, tone: 'purple', suffix: '%' },
  ];

  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Jobs"
        title="Job Vacancies"
        description="Manage job postings & candidate applications"
        tone="yellow"
        meta={
          <Pill tone="yellow">
            <Sparkles className="h-3 w-3 mr-1 inline" />
            AI-Powered Matching
          </Pill>
        }
        actions={
          <PrimaryButton onClick={onPostVacancy} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            Post New Vacancy
          </PrimaryButton>
        }
      />

      <StatStrip
        columns={4}
        stats={stats.map((stat) => ({
          label: stat.label,
          value: <AnimatedCounter value={stat.value} suffix={stat.suffix} />,
          tone: stat.tone,
          accent: stat.tone === 'yellow',
        }))}
      />
    </div>
  );
}
