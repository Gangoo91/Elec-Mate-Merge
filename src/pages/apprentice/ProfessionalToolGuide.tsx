import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';
import type { ActiveCategory } from '@/data/professional-tools/types';
import FixingsHardwarePanel from '@/components/apprentice/professional-tools-v2/FixingsHardwarePanel';
import HandToolsPanel from '@/components/apprentice/professional-tools-v2/HandToolsPanel';
import PowerToolsPanel from '@/components/apprentice/professional-tools-v2/PowerToolsPanel';
import TestEquipmentPanel from '@/components/apprentice/professional-tools-v2/TestEquipmentPanel';
import PPESafetyPanel from '@/components/apprentice/professional-tools-v2/PPESafetyPanel';
import SuppliersAndBudgetPanel from '@/components/apprentice/professional-tools-v2/SuppliersAndBudgetPanel';

interface CategoryCard {
  id: NonNullable<ActiveCategory>;
  number: string;
  eyebrow: string;
  label: string;
  description: string;
}

const CATEGORIES: CategoryCard[] = [
  { id: 'fixings', number: '01', eyebrow: 'Fittings', label: 'Fixings & hardware', description: 'Rawl plugs, bolts, glands' },
  { id: 'hand-tools', number: '02', eyebrow: 'Bench', label: 'Hand tools', description: '24 essential tools' },
  { id: 'power-tools', number: '03', eyebrow: 'Cordless', label: 'Power tools', description: 'Drills, saws, cutters' },
  { id: 'test-equipment', number: '04', eyebrow: 'Test', label: 'Test equipment', description: 'MFT, RCD, loop testers' },
  { id: 'ppe', number: '05', eyebrow: 'Safety', label: 'PPE & safety', description: 'Boots, glasses, gloves' },
  { id: 'suppliers', number: '06', eyebrow: 'Where to buy', label: 'Suppliers & budget', description: '9 UK suppliers' },
];

const ProfessionalToolGuide = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);

  const toggleCategory = (category: NonNullable<ActiveCategory>) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Tools"
          title="Professional tool guide"
          description="131 tools across 6 categories — what each one is for, what to look for, and where UK electricians actually buy theirs. Built from years of supplier and trade feedback."
          tone="yellow"
        />
      </motion.div>

      {/* Stats strip — editorial */}
      <motion.div variants={itemVariants}>
        <div className="relative grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/50 to-elec-yellow/0 pointer-events-none z-10" />
          {[
            { num: '01', label: 'Tools', value: '131' },
            { num: '02', label: 'Categories', value: '6' },
            { num: '03', label: 'Suppliers', value: '9' },
          ].map((s) => (
            <div
              key={s.num}
              className="bg-[hsl(0_0%_10%)] px-5 py-5 sm:px-7 sm:py-6 flex flex-col text-left"
            >
              <div className="flex items-baseline gap-2 whitespace-nowrap">
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                  {s.num}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 truncate">
                  · {s.label}
                </span>
              </div>
              <span className="mt-3 font-semibold tabular-nums tracking-tight leading-none text-white text-3xl sm:text-4xl">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Categories" title="Six chapters" />
        <div className="relative grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.08] rounded-2xl overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/50 to-elec-yellow/0 pointer-events-none z-10" />
          {CATEGORIES.map((card) => {
            const isActive = activeCategory === card.id;
            return (
              <button
                key={card.id}
                onClick={() => toggleCategory(card.id)}
                className={cn(
                  'group relative bg-[hsl(0_0%_10%)] hover:bg-[hsl(0_0%_15%)] transition-colors p-5 sm:p-6 text-left touch-manipulation flex flex-col min-h-[140px]',
                  isActive && 'bg-elec-yellow/[0.06] hover:bg-elec-yellow/[0.10]'
                )}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/80 tabular-nums">
                    {card.number}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    · {card.eyebrow}
                  </span>
                </div>
                <h3
                  className={cn(
                    'mt-3 text-base sm:text-lg font-semibold tracking-tight leading-tight transition-colors',
                    isActive ? 'text-elec-yellow' : 'text-white group-hover:text-elec-yellow'
                  )}
                >
                  {card.label}
                </h3>
                <p className="mt-1.5 text-[12px] text-white/60 leading-relaxed">
                  {card.description}
                </p>
              </button>
            );
          })}
        </div>
      </motion.section>

      {/* Active panel */}
      {activeCategory === 'fixings' && <FixingsHardwarePanel />}
      {activeCategory === 'hand-tools' && <HandToolsPanel />}
      {activeCategory === 'power-tools' && <PowerToolsPanel />}
      {activeCategory === 'test-equipment' && <TestEquipmentPanel />}
      {activeCategory === 'ppe' && <PPESafetyPanel />}
      {activeCategory === 'suppliers' && <SuppliersAndBudgetPanel />}

      {/* Compliance note — editorial */}
      <motion.div
        variants={itemVariants}
        className="rounded-2xl border border-amber-500/20 bg-amber-500/[0.04] px-5 py-4 sm:px-6 sm:py-5"
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-amber-300/85">
            Compliance
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            · Standards
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white/80 max-w-3xl">
          Hand tools used on or near live equipment must be <span className="text-amber-200">VDE certified to BS EN 60900</span>. Test equipment must comply with <span className="text-amber-200">GS38</span> and be calibrated annually. Voltage indicators must meet <span className="text-amber-200">BS EN 61243-3</span>.
        </p>
      </motion.div>
    </PageFrame>
  );
};

export default ProfessionalToolGuide;
