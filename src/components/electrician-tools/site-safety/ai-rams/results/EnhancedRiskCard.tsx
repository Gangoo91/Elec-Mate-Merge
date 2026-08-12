import React, { useState, useEffect } from 'react';
import { ChevronDown, Save, X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn, inputCn, labelCn, textareaCn } from '@/components/forms/fieldStyles';
import { getRiskColors } from '@/utils/risk-level-helpers';
import type { RAMSRisk } from '@/types/rams';
import { toast } from '@/hooks/use-toast';
import { useMobileEnhanced } from '@/hooks/use-mobile-enhanced';
import { RiskEditSheet } from './RiskEditSheet';

interface EnhancedRiskCardProps {
  risk: RAMSRisk;
  index: number;
  editable?: boolean;
  onUpdate?: (riskId: string, updates: Partial<RAMSRisk>) => void;
  onRemove?: (riskId: string) => void;
}

/**
 * A single control from the agent, in hierarchy-of-control order.
 * Shape confirmed against live data: { tier, control, detail, responsible_role }.
 */
interface StructuredControl {
  tier?: string;
  control?: string;
  detail?: string;
  responsible_role?: string;
}

/** Extended fields the H&S agent writes that aren't on the base RAMSRisk type. */
type RichRisk = RAMSRisk & {
  who_at_risk?: string[];
  ppe_required?: string[];
  bs7671_cites?: string[];
  safety_cites?: string[];
  monitoring_checks?: string[];
  stop_work_triggers?: string[];
  controlsStructured?: Array<StructuredControl | string>;
  residual_risk_rating?: number;
};

/**
 * Controls rendered as the hierarchy of control, which is what they are.
 *
 * These were previously flattened to `[tier, measure].join(': ')` — but the
 * field is `control`, not `measure`, so every row rendered as just "eliminate",
 * "engineer", "admin", "ppe" and the actual control, the detail and the
 * responsible role were all silently dropped.
 */
const ControlList: React.FC<{ items: StructuredControl[] }> = ({ items }) => (
  <ol className="space-y-2.5">
    {items.map((c, i) => (
      <li
        key={i}
        className="rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3"
      >
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
            {c.tier || `Control ${i + 1}`}
          </span>
          {c.responsible_role && (
            <span className="shrink-0 text-[11px] font-medium text-white">
              {c.responsible_role}
            </span>
          )}
        </div>
        {c.control && (
          <p className="mt-1 text-[14px] font-semibold leading-snug text-white">{c.control}</p>
        )}
        {c.detail && (
          <p className="mt-1 text-[13px] leading-relaxed text-white">{c.detail}</p>
        )}
      </li>
    ))}
  </ol>
);

const bandFor = (rating: number) =>
  rating <= 4 ? 'Low' : rating <= 9 ? 'Medium' : rating <= 16 ? 'High' : 'Critical';

/** Section inside the expanded card. Eyebrow + content, matching the form language. */
const Block: React.FC<{ label: string; children: React.ReactNode }> = ({ label, children }) => (
  <div className="space-y-2">
    <span className="block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-elec-yellow">
      {label}
    </span>
    {children}
  </div>
);

/** Read-only list rendered as chips — used for PPE, citations, who's at risk. */
const ChipList: React.FC<{ items: string[]; accent?: boolean }> = ({ items, accent }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((item, i) => (
      <span
        key={`${item}-${i}`}
        className={cn(
          'inline-flex items-center rounded-lg border px-2.5 py-1 text-[12px] font-medium',
          accent
            ? 'border-elec-yellow/30 bg-elec-yellow/[0.1] text-elec-yellow'
            : 'border-white/[0.14] bg-white/[0.06] text-white'
        )}
      >
        {item}
      </span>
    ))}
  </div>
);

const Bullets: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-[13.5px] leading-relaxed text-white">
        <span className="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-elec-yellow" />
        <span className="min-w-0 flex-1">{item}</span>
      </li>
    ))}
  </ul>
);

/**
 * 1–5 scorer. Replaces a shadcn Slider: a slider is imprecise on a phone, gives
 * no sense of the scale, and doesn't match anything else in the app. Five chips
 * are one tap, always show the range, and use the same selection language as the
 * rest of the forms.
 */
const Scorer: React.FC<{
  label: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => (
  <div>
    <span className={labelCn}>{label}</span>
    <div className="grid grid-cols-5 gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-pressed={value === n}
          className={cn(chipBase, value === n ? chipOn : chipOff, 'px-0 tabular-nums')}
        >
          {n}
        </button>
      ))}
    </div>
  </div>
);

export const EnhancedRiskCard: React.FC<EnhancedRiskCardProps> = ({
  risk,
  index,
  editable = false,
  onUpdate,
  onRemove,
}) => {
  const { isMobile } = useMobileEnhanced();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditSheet, setShowEditSheet] = useState(false);
  const [editedRisk, setEditedRisk] = useState<RAMSRisk>(risk);
  const [isSaving, setIsSaving] = useState(false);

  const r = risk as RichRisk;
  const liveRating = editedRisk.likelihood * editedRisk.severity;
  const rating = isEditing ? liveRating : risk.riskRating;
  const riskColors = getRiskColors(rating);

  useEffect(() => {
    setEditedRisk(risk);
    if (isSaving) {
      setIsEditing(false);
      setIsSaving(false);
    }
  }, [risk, isSaving]);

  useEffect(() => {
    if (isEditing) {
      setEditedRisk((prev) => ({ ...prev, riskRating: prev.likelihood * prev.severity }));
    }
  }, [editedRisk.likelihood, editedRisk.severity, isEditing]);

  const handleSave = () => {
    if (!onUpdate) return;
    setIsSaving(true);
    onUpdate(risk.id, editedRisk);
    toast({ title: 'Hazard updated', description: 'Your changes have been applied.' });
  };

  const handleCancel = () => {
    setEditedRisk(risk);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onRemove && confirm('Delete this hazard?')) {
      onRemove(risk.id);
      toast({ title: 'Hazard deleted' });
    }
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isMobile) {
      setShowEditSheet(true);
    } else {
      setIsEditing(true);
      setIsExpanded(true);
    }
  };

  const structuredControls: StructuredControl[] = Array.isArray(r.controlsStructured)
    ? r.controlsStructured.map((c) => (typeof c === 'string' ? { control: c } : c))
    : [];

  return (
    <>
      <RiskEditSheet
        risk={risk}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={(riskId, updates) => onUpdate?.(riskId, updates)}
        onDelete={onRemove}
      />

      {/* Card surface matches the form's section cards. The risk level is a chip,
          not a coloured left rail — the rail made every card look like an error
          state and carried no information the chip doesn't. */}
      <div
        className={cn(
          'flex h-full flex-col overflow-hidden rounded-2xl border shadow-[0_1px_0_0_rgba(255,255,255,0.06)_inset] transition-all',
          'bg-gradient-to-b from-white/[0.11] to-white/[0.055]',
          isEditing
            ? 'border-elec-yellow/45'
            : 'border-white/[0.14] hover:border-white/[0.22] hover:from-white/[0.14] hover:to-white/[0.07]'
        )}
      >
        <div
          role="button"
          tabIndex={0}
          onClick={() => !isEditing && setIsExpanded(!isExpanded)}
          onKeyDown={(e) => {
            if (isEditing) return;
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }
          }}
          aria-expanded={isExpanded}
          className="w-full cursor-pointer touch-manipulation p-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/40 sm:p-5"
        >
          <div className="flex items-baseline justify-between gap-3">
            <div className="flex min-w-0 items-baseline gap-2.5">
              <span className="shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums text-elec-yellow">
                H{String(index + 1).padStart(2, '0')}
              </span>
              <span
                className={cn(
                  'inline-flex h-6 shrink-0 items-center gap-1.5 rounded-lg px-2 text-[10.5px] font-semibold uppercase tracking-[0.12em] tabular-nums',
                  riskColors.bg,
                  riskColors.text
                )}
              >
                {bandFor(rating)} · {rating}
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              {editable && !isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="min-h-11 text-[12.5px] font-medium text-white transition-colors hover:text-elec-yellow touch-manipulation"
                >
                  Edit
                </button>
              )}
              {!isEditing && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </div>
          </div>

          <div className="mt-2.5">
            {isEditing ? (
              <input
                value={editedRisk.hazard}
                onChange={(e) => setEditedRisk({ ...editedRisk, hazard: e.target.value })}
                placeholder="Hazard title"
                onClick={(e) => e.stopPropagation()}
                className={cn(inputCn, 'text-[16px]')}
              />
            ) : (
              <>
                <h4 className="text-[16px] font-semibold leading-snug tracking-tight text-white sm:text-[17px]">
                  {risk.hazard || 'Untitled hazard'}
                </h4>
                {!isExpanded && (
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-white">
                    {risk.controls || 'No control measures specified'}
                  </p>
                )}
              </>
            )}
          </div>
        </div>

        {isExpanded && (
          <div className="space-y-6 border-t border-white/[0.1] px-4 pb-5 pt-5 sm:px-5">
            <Block label="Risk description">
              {isEditing ? (
                <textarea
                  value={editedRisk.risk}
                  onChange={(e) => setEditedRisk({ ...editedRisk, risk: e.target.value })}
                  className={cn(textareaCn, 'w-full min-h-[96px] resize-y')}
                  placeholder="Describe the risk"
                />
              ) : (
                <p className="text-[13.5px] leading-relaxed text-white">{risk.risk}</p>
              )}
            </Block>

            <Block label="Control measures">
              {isEditing ? (
                <textarea
                  value={editedRisk.controls}
                  onChange={(e) => setEditedRisk({ ...editedRisk, controls: e.target.value })}
                  className={cn(textareaCn, 'w-full min-h-[220px] resize-y')}
                  placeholder="List control measures"
                />
              ) : structuredControls.length > 0 ? (
                <ControlList items={structuredControls} />
              ) : (
                <div className="space-y-2.5 text-[13.5px] leading-relaxed text-white">
                  {(risk.controls || 'No control measures specified')
                    .split(/(?=[A-Z]{2,}:)/g)
                    .filter((s) => s.trim())
                    .map((s, i) => (
                      <p key={i}>{s.trim()}</p>
                    ))}
                </div>
              )}
            </Block>

            {isEditing ? (
              <div className="grid gap-4 sm:grid-cols-2">
                <Scorer
                  label="Likelihood"
                  value={editedRisk.likelihood}
                  onChange={(v) => setEditedRisk({ ...editedRisk, likelihood: v })}
                />
                <Scorer
                  label="Severity"
                  value={editedRisk.severity}
                  onChange={(v) => setEditedRisk({ ...editedRisk, severity: v })}
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-3 rounded-xl border border-white/[0.12] bg-white/[0.05] px-4 py-3">
                {[
                  { k: 'Likelihood', v: `${risk.likelihood}/5` },
                  { k: 'Severity', v: `${risk.severity}/5` },
                  {
                    k: 'Residual',
                    v: String(r.residual_risk_rating ?? risk.residualRisk ?? '—'),
                  },
                ].map(({ k, v }) => (
                  <div key={k}>
                    <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white">
                      {k}
                    </div>
                    <div className="mt-0.5 text-[15px] font-semibold tabular-nums text-white">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Supporting detail goes two-up on desktop. Stacked, these five
                short blocks made the card twice as tall as it needed to be. */}
            {!isEditing && (
              <div className="grid gap-5 sm:grid-cols-2">
                {!!r.who_at_risk?.length && (
                  <Block label="Who is at risk">
                    <ChipList items={r.who_at_risk} />
                  </Block>
                )}
                {!!r.ppe_required?.length && (
                  <Block label="PPE required">
                    <ChipList items={r.ppe_required} accent />
                  </Block>
                )}
                {!!r.monitoring_checks?.length && (
                  <Block label="Monitoring checks">
                    <Bullets items={r.monitoring_checks} />
                  </Block>
                )}
                {!!r.stop_work_triggers?.length && (
                  <Block label="Stop work if">
                    <Bullets items={r.stop_work_triggers} />
                  </Block>
                )}
                {(!!r.bs7671_cites?.length || !!r.safety_cites?.length) && (
                  <div className="sm:col-span-2">
                    <Block label="References">
                      <ChipList items={[...(r.bs7671_cites ?? []), ...(r.safety_cites ?? [])]} />
                    </Block>
                  </div>
                )}
              </div>
            )}

            {editable && isEditing && (
              <div className="flex items-center gap-2 border-t border-white/[0.1] pt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/[0.06] px-3.5 text-[13px] font-medium text-red-400 transition-colors hover:bg-red-500/[0.12] touch-manipulation"
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Delete</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-medium text-white transition-colors hover:bg-white/[0.1] touch-manipulation"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="ml-auto inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow px-5 text-[13.5px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation sm:flex-none sm:min-w-[160px]"
                >
                  <Save className="h-4 w-4" />
                  Save hazard
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
