import React from 'react';
import { Users, Clock, ChevronRight, ArrowRight } from 'lucide-react';
import { MobileButton } from '@/components/ui/mobile-button';

interface Template {
  id: string;
  category: string;
  title: string;
  duration: string;
  teamSize: string;
  icon?: React.ReactNode;
}

interface TemplateQuickAccessProps {
  onTemplateSelect: (templateId: string) => void;
  onViewAll: () => void;
}

const QUICK_TEMPLATES: Template[] = [
  {
    id: 'consumer-unit',
    category: 'Installation',
    title: 'Consumer Unit Installation',
    duration: '45 mins',
    teamSize: '2-3',
  },
  {
    id: 'working-height',
    category: 'Safety',
    title: 'Working at Height',
    duration: '30 mins',
    teamSize: '2-4',
  },
];

export function TemplateQuickAccess({ onTemplateSelect, onViewAll }: TemplateQuickAccessProps) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-elec-light">Quick Start Templates</h3>
          <p className="text-sm text-elec-light/60">Use a pre-built briefing template</p>
        </div>
        <button
          onClick={onViewAll}
          className="text-sm text-elec-yellow hover:text-elec-yellow/80 font-medium flex items-center gap-1 touch-manipulation min-h-[44px] px-2"
        >
          View All
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {QUICK_TEMPLATES.map((template) => (
            <div
              key={template.id}
              className="flex-none w-[calc(100vw-3rem)] sm:w-[280px] md:w-[320px] snap-start"
            >
              <div className="bg-card border border-elec-yellow/20 rounded-xl p-4 h-full hover:border-elec-yellow/40 transition-all touch-manipulation">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-1 bg-elec-yellow/10 text-elec-yellow px-2 py-1 rounded-md mb-3">
                  <span className="text-xs font-semibold">{template.category}</span>
                </div>

                {/* Title */}
                <h4 className="text-base font-semibold text-elec-light mb-3 line-clamp-2">
                  {template.title}
                </h4>

                {/* Meta Info */}
                <div className="flex items-center gap-4 mb-4 text-sm text-elec-light/70">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{template.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{template.teamSize}</span>
                  </div>
                </div>

                {/* Action Button */}
                <MobileButton
                  onClick={() => onTemplateSelect(template.id)}
                  variant="outline"
                  size="sm"
                  className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
                  icon={<ArrowRight className="h-4 w-4" />}
                >
                  Use Template
                </MobileButton>
              </div>
            </div>
          ))}
        </div>

        {/* Swipe hint (mobile only) */}
        <div className="md:hidden text-center mt-2">
          <p className="text-xs text-elec-light/50 flex items-center justify-center gap-2">
            <span className="inline-block w-1 h-1 bg-elec-yellow/50 rounded-full animate-pulse" />
            Swipe for more templates
            <span className="inline-block w-1 h-1 bg-elec-yellow/50 rounded-full animate-pulse" />
          </p>
        </div>
      </div>
    </div>
  );
}
