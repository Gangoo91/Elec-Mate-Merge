import { useState } from 'react';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { Hammer, Wrench, Zap, Gauge, Shield, Store } from 'lucide-react';
import type { ActiveCategory } from '@/data/professional-tools/types';
import FixingsHardwarePanel from '@/components/apprentice/professional-tools-v2/FixingsHardwarePanel';
import HandToolsPanel from '@/components/apprentice/professional-tools-v2/HandToolsPanel';
import PowerToolsPanel from '@/components/apprentice/professional-tools-v2/PowerToolsPanel';
import TestEquipmentPanel from '@/components/apprentice/professional-tools-v2/TestEquipmentPanel';
import PPESafetyPanel from '@/components/apprentice/professional-tools-v2/PPESafetyPanel';
import SuppliersAndBudgetPanel from '@/components/apprentice/professional-tools-v2/SuppliersAndBudgetPanel';

const categoryCards: {
  id: ActiveCategory;
  label: string;
  icon: React.ElementType;
  colour: string;
  borderColour: string;
  bgColour: string;
  description: string;
}[] = [
  {
    id: 'fixings',
    label: 'Fixings & Hardware',
    icon: Hammer,
    colour: 'text-amber-400',
    borderColour: 'border-amber-500/30',
    bgColour: 'bg-amber-500/10',
    description: 'Rawl plugs, bolts, glands',
  },
  {
    id: 'hand-tools',
    label: 'Hand Tools',
    icon: Wrench,
    colour: 'text-cyan-400',
    borderColour: 'border-cyan-500/30',
    bgColour: 'bg-cyan-500/10',
    description: '24 essential tools',
  },
  {
    id: 'power-tools',
    label: 'Power Tools',
    icon: Zap,
    colour: 'text-blue-400',
    borderColour: 'border-blue-500/30',
    bgColour: 'bg-blue-500/10',
    description: 'Drills, saws, cutters',
  },
  {
    id: 'test-equipment',
    label: 'Test Equipment',
    icon: Gauge,
    colour: 'text-green-400',
    borderColour: 'border-green-500/30',
    bgColour: 'bg-green-500/10',
    description: 'MFT, RCD, loop testers',
  },
  {
    id: 'ppe',
    label: 'PPE & Safety',
    icon: Shield,
    colour: 'text-red-400',
    borderColour: 'border-red-500/30',
    bgColour: 'bg-red-500/10',
    description: 'Boots, glasses, gloves',
  },
  {
    id: 'suppliers',
    label: 'Suppliers & Budget',
    icon: Store,
    colour: 'text-purple-400',
    borderColour: 'border-purple-500/30',
    bgColour: 'bg-purple-500/10',
    description: '9 UK suppliers',
  },
];

const ProfessionalToolGuide = () => {
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>(null);

  const toggleCategory = (category: ActiveCategory) => {
    setActiveCategory((prev) => (prev === category ? null : category));
  };

  return (
    <div className="bg-gradient-to-br from-background via-background/98 to-background/95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6 animate-fade-in text-left">
        {/* Header — SmartBackButton LEFT, Title + Icon RIGHT */}
        <div className="flex items-center justify-between gap-4">
          <SmartBackButton className="flex-shrink-0" />
          <div className="flex items-center gap-3 min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white truncate">
              Professional Tool Guide
            </h1>
            <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex-shrink-0">
              <Wrench className="h-6 w-6 text-amber-400" />
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
          <span className="text-sm text-white font-medium">131 tools</span>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-sm text-white">6 categories</span>
          <div className="h-4 w-px bg-white/20" />
          <span className="text-sm text-white">9 suppliers</span>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-3 gap-3">
          {categoryCards.map((card) => {
            const Icon = card.icon;
            const isActive = activeCategory === card.id;
            return (
              <button
                key={card.id}
                onClick={() => toggleCategory(card.id)}
                className={`p-4 rounded-xl border transition-all touch-manipulation active:scale-[0.98] ${
                  isActive
                    ? `${card.bgColour} ${card.borderColour} ring-2 ring-white/10`
                    : 'bg-white/5 border-white/10 hover:border-white/20'
                }`}
              >
                <div className={`p-2 rounded-lg ${card.bgColour} inline-block mb-2`}>
                  <Icon className={`h-5 w-5 ${card.colour}`} />
                </div>
                <div className={`text-sm font-semibold ${isActive ? card.colour : 'text-white'}`}>
                  {card.label}
                </div>
                <div className="text-xs text-white mt-1">{card.description}</div>
              </button>
            );
          })}
        </div>

        {/* Active Panel */}
        {activeCategory === 'fixings' && <FixingsHardwarePanel />}
        {activeCategory === 'hand-tools' && <HandToolsPanel />}
        {activeCategory === 'power-tools' && <PowerToolsPanel />}
        {activeCategory === 'test-equipment' && <TestEquipmentPanel />}
        {activeCategory === 'ppe' && <PPESafetyPanel />}
        {activeCategory === 'suppliers' && <SuppliersAndBudgetPanel />}

        {/* Compliance Banner */}
        <Card className="border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 flex-shrink-0">
                <Shield className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-sm text-white">
                All hand tools used on or near live electrical equipment must be{' '}
                <span className="font-medium text-amber-300">VDE certified to BS EN 60900</span>.
                Test equipment must comply with{' '}
                <span className="font-medium text-amber-300">GS38 guidance</span> and be calibrated
                annually. Voltage indicators must meet{' '}
                <span className="font-medium text-amber-300">BS EN 61243-3</span>.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalToolGuide;
