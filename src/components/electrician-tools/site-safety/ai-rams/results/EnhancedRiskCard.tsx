import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Shield, AlertTriangle, ChevronDown, Edit3, Save, X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColors } from '@/utils/risk-level-helpers';
import type { RAMSRISK } from '@/types/rams';
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

  const riskRating = editedRisk.likelihood * editedRisk.severity;
  const riskColors = getRiskColors(isEditing ? riskRating : risk.riskRating);

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
    if (onUpdate) {
      setIsSaving(true);
      onUpdate(risk.id, editedRisk);
      toast({ title: 'Hazard Updated', description: 'Risk assessment has been updated' });
    }
  };

  const handleCancel = () => {
    setEditedRisk(risk);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onRemove && confirm('Are you sure you want to delete this hazard?')) {
      onRemove(risk.id);
      toast({ title: 'Hazard Deleted', description: 'Risk assessment has been removed' });
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

  return (
    <>
      <RiskEditSheet
        risk={risk}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={(riskId, updates) => {
          if (onUpdate) onUpdate(riskId, updates);
        }}
        onDelete={onRemove}
      />

      <div
        className={cn(
          'border-l-2 sm:rounded-2xl border border-white/[0.08] transition-colors overflow-hidden',
          riskColors.border,
          'bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_13%)]'
        )}
      >
        {/* Collapsed Row - Native Mobile Design.
            role="button" instead of <button> so the inner Edit3 <Button>
            (and any future controls in the row) doesn't trigger a nested
            <button> DOM-validation warning. */}
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
          className="w-full p-4 sm:p-5 flex flex-col gap-3 text-left min-h-[80px] touch-manipulation active:bg-white/[0.04] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/40"
        >
          {/* Top Row: Number + Risk Pill — editorial */}
          <div className="flex items-baseline justify-between w-full gap-3">
            <div className="flex items-baseline gap-3 min-w-0">
              {/* Editorial number — muted, consistent across all hazards */}
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] tabular-nums shrink-0 text-white/45">
                H{String(index + 1).padStart(2, '0')}
              </span>
              {/* Risk level pill — compact */}
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 h-6 px-2 rounded-md text-[10.5px] font-semibold uppercase tracking-[0.12em] tabular-nums shrink-0',
                  riskColors.bg,
                  riskColors.text
                )}
              >
                <span>
                  {riskRating <= 4
                    ? 'Low'
                    : riskRating <= 9
                      ? 'Med'
                      : riskRating <= 16
                        ? 'High'
                        : 'Critical'}
                </span>
                <span className="text-white/70">·</span>
                <span>{isEditing ? riskRating : risk.riskRating}</span>
              </span>
            </div>

            {/* Right Controls — text-button for edit, chevron for expand */}
            <div className="flex items-center gap-3 shrink-0">
              {editable && !isEditing && (
                <button
                  type="button"
                  onClick={handleEditClick}
                  className="text-[12px] font-medium text-white/55 hover:text-elec-yellow transition-colors touch-manipulation"
                >
                  Edit
                </button>
              )}
              {!isEditing && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-white/55 transition-transform duration-200',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pl-1">
            {isEditing ? (
              <Input
                value={editedRisk.hazard}
                onChange={(e) => setEditedRisk({ ...editedRisk, hazard: e.target.value })}
                placeholder="Hazard title"
                onClick={(e) => e.stopPropagation()}
                className="h-11 text-base touch-manipulation"
              />
            ) : (
              <>
                <h4 className="text-[16px] sm:text-[17px] font-semibold tracking-tight text-white leading-snug line-clamp-2">
                  {risk.hazard || 'Untitled hazard'}
                </h4>
                <p className="mt-1.5 text-[13px] text-white/65 line-clamp-2 leading-relaxed">
                  {risk.controls || 'No control measures specified'}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 sm:px-5 pb-5 space-y-6 border-t border-white/[0.06] animate-slide-down">
            {/* Risk Description */}
            <div className="pt-5">
              <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 text-left block">
                Risk description
              </label>
              {isEditing ? (
                <Textarea
                  value={editedRisk.risk}
                  onChange={(e) => setEditedRisk({ ...editedRisk, risk: e.target.value })}
                  className="mt-2 min-h-[80px]"
                  placeholder="Describe the risk"
                />
              ) : (
                <p className="mt-2 text-[13.5px] text-white/85 leading-relaxed text-left">
                  {risk.risk}
                </p>
              )}
            </div>

            {/* Control Measures — editorial block, no icon */}
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                Control measures
              </div>
              {isEditing ? (
                <Textarea
                  value={editedRisk.controls}
                  onChange={(e) => setEditedRisk({ ...editedRisk, controls: e.target.value })}
                  className="min-h-[100px]"
                  placeholder="List control measures"
                />
              ) : (
                <div className="text-[13.5px] text-white/85 leading-relaxed space-y-3 text-left">
                  {(risk.controls || 'No control measures specified')
                    .split(
                      /(?=PRIMARY ACTION:|ELIMINATE:|SUBSTITUTE:|ENGINEER(?:ING)? CONTROLS?:|ADMINISTRATIVE CONTROLS?:|VERIFICATION:|COMPETENCY REQUIREMENT:|EQUIPMENT STANDARDS?:|REGULATION:|PPE:|TRAINING:|MONITORING:|EMERGENCY:)/gi
                    )
                    .filter((section) => section.trim())
                    .map((section, idx) => (
                      <p key={idx} className="leading-relaxed text-left">
                        {section.trim()}
                      </p>
                    ))}
                </div>
              )}
            </div>

            {/* v2 rich detail — only when AI emitted v2 fields, read-only */}
            {!isEditing && (() => {
              const r: any = risk;
              const hasV2 =
                r.rationale ||
                (Array.isArray(r.who_at_risk) && r.who_at_risk.length) ||
                (Array.isArray(r.controlsStructured) && r.controlsStructured.length) ||
                (Array.isArray(r.ppe_required) && r.ppe_required.length) ||
                (Array.isArray(r.bs7671_cites) && r.bs7671_cites.length) ||
                (Array.isArray(r.safety_cites) && r.safety_cites.length) ||
                (Array.isArray(r.monitoring_checks) && r.monitoring_checks.length) ||
                (Array.isArray(r.evidence_required) && r.evidence_required.length) ||
                (Array.isArray(r.stop_work_triggers) && r.stop_work_triggers.length);
              if (!hasV2) return null;

              const tierLabel: Record<string, string> = {
                eliminate: 'Eliminate',
                substitute: 'Substitute',
                engineer: 'Engineer',
                admin: 'Administrative',
                ppe: 'PPE',
              };

              const tieredControls: Array<{ tier: string; items: any[] }> = [];
              if (Array.isArray(r.controlsStructured)) {
                const byTier: Record<string, any[]> = {};
                for (const c of r.controlsStructured) {
                  const t = String(c.tier ?? 'admin').toLowerCase();
                  (byTier[t] = byTier[t] ?? []).push(c);
                }
                for (const t of ['eliminate', 'substitute', 'engineer', 'admin', 'ppe']) {
                  if (byTier[t]?.length) tieredControls.push({ tier: t, items: byTier[t] });
                }
              }

              return (
                <div className="space-y-5 pt-2">
                  {r.rationale && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                        Rationale
                      </div>
                      <p className="text-[13px] text-white/80 leading-relaxed">{r.rationale}</p>
                    </div>
                  )}

                  {Array.isArray(r.who_at_risk) && r.who_at_risk.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                        Who is at risk
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {r.who_at_risk.map((w: string, i: number) => (
                          <span
                            key={i}
                            className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium bg-white/[0.05] border border-white/[0.10] text-white/80"
                          >
                            {w}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {tieredControls.length > 0 && (
                    <div>
                      <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-3">
                        Controls by hierarchy
                      </div>
                      <div className="space-y-3">
                        {tieredControls.map(({ tier, items }) => (
                          <div key={tier}>
                            <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-elec-yellow/80 mb-1.5">
                              {tierLabel[tier] ?? tier}
                            </div>
                            <ul className="space-y-2">
                              {items.map((c: any, i: number) => (
                                <li
                                  key={i}
                                  className="text-[13px] leading-relaxed text-white/85 border-l-2 border-white/[0.08] pl-3"
                                >
                                  <div className="font-medium text-white">{c.control}</div>
                                  {c.detail && (
                                    <div className="mt-0.5 text-[12.5px] text-white/65">
                                      {c.detail}
                                    </div>
                                  )}
                                  {c.responsible_role && (
                                    <div className="mt-1 text-[11px] uppercase tracking-[0.12em] text-white/50">
                                      Owner · {c.responsible_role}
                                    </div>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {(Array.isArray(r.ppe_required) && r.ppe_required.length > 0) ||
                  (Array.isArray(r.competence_required) && r.competence_required.length > 0) ? (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {Array.isArray(r.ppe_required) && r.ppe_required.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            PPE required
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {r.ppe_required.map((p: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(r.competence_required) && r.competence_required.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Competence
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {r.competence_required.map((c: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {(Array.isArray(r.bs7671_cites) && r.bs7671_cites.length > 0) ||
                  (Array.isArray(r.safety_cites) && r.safety_cites.length > 0) ? (
                    <div className="grid sm:grid-cols-2 gap-5">
                      {Array.isArray(r.bs7671_cites) && r.bs7671_cites.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            BS 7671 cites
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {r.bs7671_cites.map((c: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium tabular-nums bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {Array.isArray(r.safety_cites) && r.safety_cites.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            HSE / CDM cites
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {r.safety_cites.map((c: string, i: number) => (
                              <span
                                key={i}
                                className="inline-flex items-center h-6 px-2 rounded-md text-[11px] font-medium tabular-nums bg-white/[0.05] border border-white/[0.10] text-white/80"
                              >
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {(Array.isArray(r.monitoring_checks) && r.monitoring_checks.length > 0) ||
                  (Array.isArray(r.evidence_required) && r.evidence_required.length > 0) ||
                  (Array.isArray(r.stop_work_triggers) && r.stop_work_triggers.length > 0) ? (
                    <div className="grid sm:grid-cols-3 gap-5">
                      {Array.isArray(r.monitoring_checks) && r.monitoring_checks.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Monitoring
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {r.monitoring_checks.map((m: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(r.evidence_required) && r.evidence_required.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Evidence
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-white/80">
                            {r.evidence_required.map((m: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {Array.isArray(r.stop_work_triggers) && r.stop_work_triggers.length > 0 && (
                        <div>
                          <div className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55 mb-2">
                            Stop work
                          </div>
                          <ul className="space-y-1.5 text-[12.5px] text-red-300">
                            {r.stop_work_triggers.map((m: string, i: number) => (
                              <li key={i} className="leading-relaxed">
                                · {m}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null}
                </div>
              );
            })()}

            {/* Likelihood & Severity — editorial pip rows */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Likelihood
                </label>
                {isEditing ? (
                  <div className="mt-3 space-y-2">
                    <Slider
                      value={[editedRisk.likelihood]}
                      onValueChange={(v) => setEditedRisk({ ...editedRisk, likelihood: v[0] })}
                      min={1}
                      max={5}
                      step={1}
                    />
                    <div className="text-center text-sm font-bold text-white">
                      {editedRisk.likelihood}/5
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1.5 flex-1 rounded-full',
                          i < risk.likelihood ? 'bg-elec-yellow' : 'bg-white/10'
                        )}
                      />
                    ))}
                    <span className="ml-2 text-[13px] font-semibold tabular-nums text-white">
                      {risk.likelihood}/5
                    </span>
                  </div>
                )}
              </div>
              <div>
                <label className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                  Severity
                </label>
                {isEditing ? (
                  <div className="mt-3 space-y-2">
                    <Slider
                      value={[editedRisk.severity]}
                      onValueChange={(v) => setEditedRisk({ ...editedRisk, severity: v[0] })}
                      min={1}
                      max={5}
                      step={1}
                    />
                    <div className="text-center text-sm font-bold text-white">
                      {editedRisk.severity}/5
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1.5 flex-1 rounded-full',
                          i < risk.severity ? 'bg-red-400' : 'bg-white/10'
                        )}
                      />
                    ))}
                    <span className="ml-2 text-[13px] font-semibold tabular-nums text-white">
                      {risk.severity}/5
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Residual Risk — editorial row */}
            <div className="flex items-baseline justify-between gap-3 pt-4 border-t border-white/[0.06]">
              <span className="text-[10.5px] font-semibold uppercase tracking-[0.18em] text-white/55">
                Residual after controls
              </span>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedRisk.residualRisk}
                  onChange={(e) =>
                    setEditedRisk({ ...editedRisk, residualRisk: parseInt(e.target.value) || 0 })
                  }
                  className="w-20 h-8 text-center"
                  min={0}
                  max={25}
                />
              ) : (
                <span className="text-[16px] font-semibold tabular-nums text-emerald-400">
                  {risk.residualRisk}
                </span>
              )}
            </div>

            {/* Edit Actions */}
            {editable && isEditing && (
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <Button
                  variant="outline"
                  className="flex-1 border-red-500/40 text-red-400 hover:bg-red-500/10"
                  onClick={handleDelete}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button
                  className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90"
                  onClick={handleSave}
                >
                  <Save className="h-4 w-4 mr-2" /> Save
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; max-height: 0; }
          to { opacity: 1; max-height: 1000px; }
        }
        .animate-slide-down { animation: slideDown 0.2s ease-out; }
      `}</style>
    </>
  );
};
