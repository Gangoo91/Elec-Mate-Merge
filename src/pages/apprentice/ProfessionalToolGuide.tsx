import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL, CARD_SURFACE } from '@/components/ui/card-recipe';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { itemVariants } from '@/components/college/primitives';
import { HubSubPage } from '@/components/hub/HubSubPage';
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
  {
    id: 'fixings',
    number: '01',
    eyebrow: 'Fittings',
    label: 'Fixings & hardware',
    description: 'Rawl plugs, bolts, glands',
  },
  {
    id: 'hand-tools',
    number: '02',
    eyebrow: 'Bench',
    label: 'Hand tools',
    description: '24 essential tools',
  },
  {
    id: 'power-tools',
    number: '03',
    eyebrow: 'Cordless',
    label: 'Power tools',
    description: 'Drills, saws, cutters',
  },
  {
    id: 'test-equipment',
    number: '04',
    eyebrow: 'Test',
    label: 'Test equipment',
    description: 'MFT, RCD, loop testers',
  },
  {
    id: 'ppe',
    number: '05',
    eyebrow: 'Safety',
    label: 'PPE & safety',
    description: 'Boots, glasses, gloves',
  },
  {
    id: 'suppliers',
    number: '06',
    eyebrow: 'Where to buy',
    label: 'Suppliers & budget',
    description: '9 UK suppliers',
  },
];

const ProfessionalToolGuide = () => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);

  const toggleCategory = (category: NonNullable<ActiveCategory>) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <HubSubPage
      title="Professional tool guide"
      backTo="/apprentice/toolbox"
      description="131 tools across 6 categories — what each one is for, what to look for, and where UK electricians actually buy theirs. Built from years of supplier and trade feedback."
    >
      <motion.div variants={itemVariants}>
        <HubKpiRow>
          <HubKpi label="Tools" value="131" accent />
          <HubKpi label="Categories" value="6" />
          <HubKpi label="Suppliers" value="9" />
        </HubKpiRow>
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <HubSectionHeading>Six chapters</HubSectionHeading>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((card) => {
            const isActive = activeCategory === card.id;
            return (
              <button
                key={card.id}
                onClick={() => toggleCategory(card.id)}
                aria-pressed={isActive}
                className={cn(
                  CARD_BASE,
                  CARD_NEUTRAL,
                  'relative min-h-[128px] overflow-hidden px-4 py-3.5 text-left sm:p-5 lg:hover:-translate-y-0.5',
                  isActive && 'border-elec-yellow'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 to-elec-yellow/0',
                    isActive ? 'via-elec-yellow/90' : 'via-elec-yellow/55'
                  )}
                />
                <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-white">
                  {card.eyebrow}
                </span>
                <h3
                  className={cn(
                    'mt-1.5 text-[15px] font-semibold leading-tight tracking-tight',
                    isActive ? 'text-elec-yellow' : 'text-white'
                  )}
                >
                  {card.label}
                </h3>
                <p className="mt-1.5 text-[12.5px] leading-snug text-white">{card.description}</p>
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
        className={cn(
          'rounded-2xl border border-elec-yellow/35 px-5 py-4 sm:px-6 sm:py-5',
          CARD_SURFACE
        )}
      >
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
            Compliance
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
            · Standards
          </span>
        </div>
        <p className="text-[13px] leading-relaxed text-white max-w-3xl">
          Hand tools used on or near live equipment must be{' '}
          <span className="text-amber-200">VDE certified to BS EN 60900</span>. Test equipment must
          comply with <span className="text-amber-200">GS38</span> and be calibrated annually.
          Voltage indicators must meet <span className="text-amber-200">BS EN 61243-3</span>.
        </p>
      </motion.div>
    </HubSubPage>
  );
};

export default ProfessionalToolGuide;
