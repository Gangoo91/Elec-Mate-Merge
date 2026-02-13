import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronDown, Wrench, Package, Lightbulb, AlertTriangle, Pencil, ClipboardList, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MethodStatementData } from '@/types/method-statement';
import { MethodSummaryEditSheet } from './MethodSummaryEditSheet';

type SectionType = 'tools' | 'materials' | 'tips' | 'mistakes';

interface SummarySectionProps {
  icon: LucideIcon;
  title: string;
  count: number;
  items: string[];
  defaultOpen?: boolean;
  accentColor?: string;
  editable?: boolean;
  onEdit?: () => void;
}

const SummarySection: React.FC<SummarySectionProps> = ({
  icon: Icon,
  title,
  count,
  items,
  defaultOpen = false,
  accentColor = 'elec-yellow',
  editable = false,
  onEdit
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (count === 0) return null;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full group">
        <div className="flex items-center justify-between py-3 px-1 touch-manipulation min-h-[44px]">
          <div className="flex items-center gap-3">
            <Icon className={cn(
              "h-5 w-5 shrink-0",
              accentColor === 'amber-500' ? 'text-amber-500' : 'text-elec-yellow'
            )} />
            <span className="text-sm font-semibold text-white">{title}</span>
            <Badge className="bg-white/10 text-white border-0 text-xs px-2 py-0.5">
              {count}
            </Badge>
          </div>
          <div className="flex items-center gap-1">
            {editable && onEdit && (
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-white hover:text-elec-yellow hover:bg-elec-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
              >
                <Pencil className="h-4 w-4" />
              </Button>
            )}
            <ChevronDown className={cn(
              "h-4 w-4 text-white transition-transform duration-200",
              isOpen && "rotate-180"
            )} />
          </div>
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="space-y-2 pb-4 pl-8">
          {items.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-white">
              <span className="text-elec-yellow/60 mt-0.5 shrink-0">•</span>
              <span className="flex-1">{item}</span>
            </li>
          ))}
        </ul>
        {editable && onEdit && (
          <div className="pl-8 pb-4">
            <Button
              variant="outline"
              size="sm"
              onClick={onEdit}
              className="h-9 text-xs border-white/[0.08] text-white hover:text-elec-yellow hover:border-elec-yellow/30"
            >
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Edit {title}
            </Button>
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
  onUpdateMistakes
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
      case 'tools': return tools;
      case 'materials': return materials;
      case 'tips': return tips;
      case 'mistakes': return mistakes;
      default: return [];
    }
  };

  return (
    <>
      <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden">
        {/* Card Header */}
        <div className="px-4 py-3 border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ClipboardList className="h-4 w-4 text-elec-yellow" />
            <h3 className="text-sm font-semibold text-white">Job Summary</h3>
          </div>
          <Badge className="bg-white/10 text-white border-0 text-[10px]">
            {totalItems} items
          </Badge>
        </div>

        {/* Collapsible Sections */}
        <div className="px-3 divide-y divide-white/[0.05]">
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
      </div>

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
