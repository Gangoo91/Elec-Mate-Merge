import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  Wrench,
  Package,
  Lightbulb,
  AlertTriangle,
  Pencil,
  ClipboardList,
  LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MethodStatementData } from '@/types/method-statement';
import { MethodSummaryEditSheet } from './MethodSummaryEditSheet';

type SectionType = 'tools' | 'materials' | 'tips' | 'mistakes';

interface SummarySectionProps {
  /** Kept for back-compat; icons are not rendered in the editorial style. */
  icon?: LucideIcon;
  title: string;
  count: number;
  items: string[];
  defaultOpen?: boolean;
  /** Kept for back-compat; tone is monochrome editorial now. */
  accentColor?: string;
  editable?: boolean;
  onEdit?: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  title,
  count,
  items,
  defaultOpen = false,
  editable = false,
  onEdit,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (count === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-baseline justify-between py-3 px-1 touch-manipulation min-h-[44px]">
          <div className="flex items-baseline gap-3">
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              {title}
            </span>
            <span className="text-[11px] text-white/45 tabular-nums">{count}</span>
          </div>
          <div className="flex items-center gap-3">
            {editable && onEdit && (
              <span
                role="button"
                tabIndex={0}
                className="text-[12px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation opacity-0 group-hover:opacity-100"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit();
                  }
                }}
              >
                Edit
              </span>
            )}
            <ChevronDown
              className={cn(
                'h-4 w-4 text-white/55 transition-transform duration-200',
                isOpen && 'rotate-180'
              )}
            />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="space-y-2 pb-4">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-baseline gap-3 text-[13.5px] text-white/85 leading-relaxed">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-white/40 w-8 shrink-0">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
        {editable && onEdit && (
          <div className="pb-4">
            <button
              type="button"
              onClick={onEdit}
              className="text-[12px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation"
            >
              Edit {title.toLowerCase()}
            </button>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
};

interface MethodStatementSummaryProps {
  methodData: MethodStatementData;
  editable?: boolean;
  onUpdateTools?: (tools: string[]) => void;
  onUpdateMaterials?: (materials: string[]) => void;
  onUpdateTips?: (tips: string[]) => void;
  onUpdateMistakes?: (mistakes: string[]) => void;
}

export function MethodStatementSummary({
  methodData,
  editable = false,
  onUpdateTools,
  onUpdateMaterials,
  onUpdateTips,
  onUpdateMistakes,
}: MethodStatementSummaryProps) {
  const [editingSection, setEditingSection] = useState<SectionType | null>(null);

  const tools = methodData.toolsRequired || [];
  const materials = methodData.materialsRequired || [];
  const tips = methodData.practicalTips || [];
  const mistakes = methodData.commonMistakes || [];

  const hasTools = tools.length > 0;
  const hasMaterials = materials.length > 0;
  const hasTips = tips.length > 0;
  const hasMistakes = mistakes.length > 0;

  if (!hasTools && !hasMaterials && !hasTips && !hasMistakes) {
    return null;
  }

  const totalItems = tools.length + materials.length + tips.length + mistakes.length;

  const handleSave = (section: SectionType, items: string[]) => {
    switch (section) {
      case 'tools':
        onUpdateTools?.(items);
        break;
      case 'materials':
        onUpdateMaterials?.(items);
        break;
      case 'tips':
        onUpdateTips?.(items);
        break;
      case 'mistakes':
        onUpdateMistakes?.(items);
        break;
    }
    setEditingSection(null);
  };

  const getEditingItems = (): string[] => {
    switch (editingSection) {
      case 'tools':
        return tools;
      case 'materials':
        return materials;
      case 'tips':
        return tips;
      case 'mistakes':
        return mistakes;
      default:
        return [];
    }
  };

  return (
    <>
      <section className="space-y-4">
        {/* Editorial header */}
        <div className="flex items-baseline justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
              Job summary
            </div>
            <h3 className="text-[20px] sm:text-[24px] font-semibold tracking-tight leading-tight text-white">
              Tools, materials, gotchas.
            </h3>
          </div>
          <span className="text-[11px] text-white/45 tabular-nums shrink-0">
            {totalItems} items
          </span>
        </div>

        {/* Sections — divide-y editorial */}
        <div className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
          {/* Tools */}
          {hasTools && (
            <SummarySection
              icon={Wrench}
              title="Tools Required"
              count={tools.length}
              items={tools}
              defaultOpen={true}
              editable={editable && !!onUpdateTools}
              onEdit={() => setEditingSection('tools')}
            />
          )}

          {/* Materials */}
          {hasMaterials && (
            <SummarySection
              icon={Package}
              title="Materials Required"
              count={materials.length}
              items={materials}
              defaultOpen={false}
              editable={editable && !!onUpdateMaterials}
              onEdit={() => setEditingSection('materials')}
            />
          )}

          {/* Tips */}
          {hasTips && (
            <SummarySection
              icon={Lightbulb}
              title="Practical Tips"
              count={tips.length}
              items={tips}
              defaultOpen={false}
              editable={editable && !!onUpdateTips}
              onEdit={() => setEditingSection('tips')}
            />
          )}

          {/* Common Mistakes */}
          {hasMistakes && (
            <SummarySection
              icon={AlertTriangle}
              title="Common Mistakes"
              count={mistakes.length}
              items={mistakes}
              defaultOpen={false}
              accentColor="amber-500"
              editable={editable && !!onUpdateMistakes}
              onEdit={() => setEditingSection('mistakes')}
            />
          )}
        </div>
      </section>

      {/* Edit Sheet */}
      {editingSection && (
        <MethodSummaryEditSheet
          sectionType={editingSection}
          items={getEditingItems()}
          open={!!editingSection}
          onOpenChange={(open) => !open && setEditingSection(null)}
          onSave={(items) => handleSave(editingSection, items)}
        />
      )}
    </>
  );
}
