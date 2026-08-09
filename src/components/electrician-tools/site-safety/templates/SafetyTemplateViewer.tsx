import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Download,
  CheckCircle2,
  FileText,
  Loader2,
  ChevronDown,
  ChevronUp,
  BarChart3,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { FIELD_CN } from '../common/fieldClasses';
import { useAdoptTemplate, type SafetyTemplate } from '@/hooks/useSafetyTemplates';
import { getTemplateStats } from '@/utils/safety-template-renderer';
import type { DocumentSection } from '@/types/safety-template';
import { SectionRenderer } from './sections/SectionRenderer';
import { SafetyTemplateV2Renderer } from './SafetyTemplateV2Renderer';

interface SafetyTemplateViewerProps {
  template: SafetyTemplate;
  onBack: () => void;
  isAdopted: boolean;
}

/** Section icon based on type */
const SECTION_ICONS: Record<DocumentSection['type'], string> = {
  hazard_table: 'Hazards',
  steps: 'Procedure',
  checklist: 'Checklist',
  text_block: 'Details',
  bullet_list: 'Items',
  ppe_grid: 'PPE',
  signature_block: 'Sign-off',
  references: 'References',
  key_value: 'Information',
};

export function SafetyTemplateViewer({ template, onBack, isAdopted }: SafetyTemplateViewerProps) {
  const adoptMutation = useAdoptTemplate();
  const sc = template.structured_content;
  // Prefer v2 (AI-regenerated full-depth content) when present.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const v2: any = (template as any).structured_content_v2;
  const hasV2 = !!v2 && (template.version >= 2 || Array.isArray(v2.hazards));
  const stats = getTemplateStats(sc);

  // Field values for adopt form — initialise from template fields
  const [fieldValues, setFieldValues] = useState<Record<string, string>>(() => {
    const vals: Record<string, string> = {};
    if (sc) {
      for (const f of sc.fields) {
        if (f.default_value === 'today') {
          vals[f.key] = new Date().toLocaleDateString('en-GB');
        } else {
          vals[f.key] = f.default_value ?? '';
        }
      }
    }
    return vals;
  });

  // Track which sections are expanded (first 3 open by default)
  const [expandedSections, setExpandedSections] = useState<Set<number>>(() => {
    const initial = new Set<number>();
    if (sc) {
      sc.sections.forEach((_, i) => {
        if (i < 3) initial.add(i);
      });
    }
    return initial;
  });

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  /**
   * Required fields that are still blank.
   *
   * `field.required` used to render a red asterisk and nothing else — adopt
   * fired regardless. That is how documents reached the library with no
   * company name on them, and on the legacy path every unfilled placeholder
   * was substituted with a literal `___`, so the "inspector-ready document"
   * arrived with blanks printed into it. The asterisk now means something.
   */
  const missingRequired = (sc?.fields ?? [])
    .filter((f) => f.required && !(fieldValues[f.key] ?? '').trim())
    .map((f) => f.key);

  const [showErrors, setShowErrors] = useState(false);

  const handleAdopt = () => {
    if (missingRequired.length > 0) {
      setShowErrors(true);
      return;
    }
    if (sc || hasV2) {
      // Structured path (carries v2 through when present so the upgraded
      // content survives adoption — viewer + editor + PDF will all
      // prefer the v2 payload).
      adoptMutation.mutate(
        {
          templateId: template.id,
          name: template.name,
          content: template.content, // fallback HTML
          companyName: fieldValues.company_name || undefined,
          siteAddress: fieldValues.site_address || undefined,
          structuredContent: sc,
          structuredContentV2: hasV2 ? v2 : null,
          fieldValues,
        },
        { onSuccess: onBack }
      );
    } else {
      // Legacy HTML path
      let content = template.content;
      content = content.replace(/\{\{company_name\}\}/g, fieldValues.company_name || '___');
      content = content.replace(/\{\{site_address\}\}/g, fieldValues.site_address || '___');
      content = content.replace(/\{\{date\}\}/g, new Date().toLocaleDateString('en-GB'));
      content = content.replace(/\{\{[a-z_]+\}\}/g, '___');

      adoptMutation.mutate(
        {
          templateId: template.id,
          name: template.name,
          content,
          companyName: fieldValues.company_name || undefined,
          siteAddress: fieldValues.site_address || undefined,
        },
        { onSuccess: onBack }
      );
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/10">
        <div className="px-4 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white active:opacity-70 active:scale-[0.98] transition-all touch-manipulation h-11 -ml-2 px-2 rounded-lg"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Templates</span>
          </button>
          {isAdopted && (
            <span className="flex items-center gap-1 text-green-400 text-xs font-semibold">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Adopted
            </span>
          )}
        </div>
      </div>

      <div className="px-4 space-y-4 pb-8">
        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <span className="text-xs text-white font-medium">{template.category}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{template.name}</h2>
          {template.summary && <p className="text-sm text-white mt-1">{template.summary}</p>}
        </div>

        {/* Regulatory references */}
        {template.regulatory_references.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {template.regulatory_references.map((ref) => (
              <span
                key={ref}
                className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full"
              >
                {ref}
              </span>
            ))}
          </div>
        )}

        {/* Stats bar */}
        {stats.sections > 0 && (
          <div
            className={cn(
              'flex items-center gap-3 rounded-xl border border-elec-yellow/35 p-3',
              CARD_SURFACE
            )}
          >
            <BarChart3 className="h-4 w-4 text-elec-yellow flex-shrink-0" />
            <div className="flex items-center gap-3 text-[11px] text-white flex-wrap">
              <span>{stats.sections} sections</span>
              {stats.hazards > 0 && <span>{stats.hazards} hazards</span>}
              {stats.steps > 0 && <span>{stats.steps} steps</span>}
              {stats.checkItems > 0 && <span>{stats.checkItems} check items</span>}
              {stats.ppeItems > 0 && <span>{stats.ppeItems} PPE items</span>}
            </div>
          </div>
        )}

        {/* Content: v2 (full-depth AI) > v1 structured > legacy HTML */}
        {hasV2 ? (
          <SafetyTemplateV2Renderer v2={v2} />
        ) : sc ? (
          <div className="space-y-2">
            {sc.sections.map((section, i) => {
              const isOpen = expandedSections.has(i);
              return (
                <div
                  key={i}
                  className={cn(
                    'overflow-hidden rounded-xl border border-elec-yellow/35',
                    CARD_SURFACE
                  )}
                >
                  <button
                    onClick={() => toggleSection(i)}
                    className="w-full flex items-center justify-between p-3 touch-manipulation"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-white bg-white/[0.06] rounded px-1.5 py-0.5">
                        {SECTION_ICONS[section.type]}
                      </span>
                      <h3 className="text-[13px] font-semibold text-white">{section.title}</h3>
                    </div>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-white" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-white" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-3 pb-3">
                      <SectionRenderer section={section} mode="preview" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          /* Legacy HTML fallback */
          <div
            className={cn(
              'max-h-[400px] overflow-auto rounded-xl border border-elec-yellow/35 p-4',
              CARD_SURFACE
            )}
          >
            <div
              className="prose prose-invert prose-sm max-w-none [&_h1]:text-lg [&_h1]:font-bold [&_h2]:text-base [&_h2]:font-semibold [&_h3]:text-sm [&_h3]:font-semibold [&_ul]:list-disc [&_ol]:list-decimal [&_li]:text-white [&_p]:text-white"
              dangerouslySetInnerHTML={{ __html: template.content }}
            />
          </div>
        )}

        {/* Adopt form */}
        {!isAdopted && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('space-y-4 rounded-xl border border-elec-yellow/35 p-4', CARD_SURFACE)}
          >
            <div>
              <h3 className="text-[15px] font-semibold tracking-tight text-white">
                Adopt this template
              </h3>
              <p className="mt-1 text-[12.5px] text-white">
                Your details are written into the document — you can edit any of it afterwards.
              </p>
            </div>

            {sc ? (
              /* Dynamic fields from structured content */
              sc.fields.map((field) => {
                const invalid = showErrors && missingRequired.includes(field.key);
                return (
                  <div key={field.key}>
                    <label
                      htmlFor={`adopt-${field.key}`}
                      className="mb-1 block text-[12px] font-medium text-white"
                    >
                      {field.label}
                      {field.required && <span className="ml-0.5 text-elec-yellow">*</span>}
                    </label>
                    <input
                      id={`adopt-${field.key}`}
                      type={field.type === 'date' ? 'date' : 'text'}
                      placeholder={field.placeholder ?? field.label}
                      value={fieldValues[field.key] ?? ''}
                      aria-invalid={invalid}
                      aria-describedby={invalid ? `adopt-${field.key}-err` : undefined}
                      onChange={(e) =>
                        setFieldValues((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                      className={cn(FIELD_CN, invalid && 'border-red-400')}
                    />
                    {invalid && (
                      <p id={`adopt-${field.key}-err`} className="mt-1 text-[11.5px] text-red-400">
                        {field.label} is required
                      </p>
                    )}
                  </div>
                );
              })
            ) : (
              /* Legacy hardcoded fields */
              <>
                <div>
                  <label
                    htmlFor="adopt-company"
                    className="mb-1 block text-[12px] font-medium text-white"
                  >
                    Company name
                  </label>
                  <input
                    id="adopt-company"
                    placeholder="Company name"
                    value={fieldValues.company_name ?? ''}
                    onChange={(e) =>
                      setFieldValues((prev) => ({ ...prev, company_name: e.target.value }))
                    }
                    className={FIELD_CN}
                  />
                </div>
                <div>
                  <label
                    htmlFor="adopt-site"
                    className="mb-1 block text-[12px] font-medium text-white"
                  >
                    Site address
                  </label>
                  <input
                    id="adopt-site"
                    placeholder="Site address"
                    value={fieldValues.site_address ?? ''}
                    onChange={(e) =>
                      setFieldValues((prev) => ({ ...prev, site_address: e.target.value }))
                    }
                    className={FIELD_CN}
                  />
                </div>
              </>
            )}

            {/* Volt fill stays SOLID — a translucent yellow goes muddy on this
                ground. Brighten on press rather than dim: a dark UI that dims
                under the thumb reads as disabled. */}
            <button
              type="button"
              onClick={handleAdopt}
              disabled={adoptMutation.isPending}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow text-sm font-semibold text-black transition-all touch-manipulation [-webkit-tap-highlight-color:transparent] active:scale-[0.97] active:brightness-110 disabled:opacity-50"
            >
              {adoptMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Adopting…
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  Adopt template
                </>
              )}
            </button>
            {showErrors && missingRequired.length > 0 && (
              <p role="alert" className="text-center text-[12px] text-red-400">
                Fill the {missingRequired.length} required field
                {missingRequired.length > 1 ? 's' : ''} above to continue
              </p>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default SafetyTemplateViewer;
