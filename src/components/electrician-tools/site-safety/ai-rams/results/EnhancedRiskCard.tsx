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
  onRemove
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
      setEditedRisk(prev => ({ ...prev, riskRating: prev.likelihood * prev.severity }));
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
        onSave={(riskId, updates) => { if (onUpdate) onUpdate(riskId, updates); }}
        onDelete={onRemove}
      />

      <div
        className={cn(
          'border-l-4 rounded-xl border border-white/5 transition-all duration-200 overflow-hidden',
          riskColors.border,
          isExpanded ? 'bg-white/[0.02]' : 'bg-transparent hover:bg-white/[0.02]'
        )}
      >
        {/* Collapsed Row - Native Mobile Design */}
        <button
          onClick={() => !isEditing && setIsExpanded(!isExpanded)}
          className="w-full p-4 sm:p-5 flex flex-col gap-3 text-left min-h-[80px] touch-manipulation active:bg-white/[0.04]"
        >
          {/* Top Row: Number + Risk Badge */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              {/* Risk Number Badge */}
              <div className={cn(
                'w-11 h-11 rounded-xl flex items-center justify-center font-bold text-base shrink-0 shadow-lg',
                riskColors.bg, riskColors.text
              )}>
                H{index + 1}
              </div>
              {/* Risk Level Badge */}
              <Badge className={cn(riskColors.bg, riskColors.text, 'border-0 text-xs font-semibold px-3 py-1')}>
                {riskRating <= 4 ? 'Low' : riskRating <= 9 ? 'Medium' : riskRating <= 16 ? 'High' : 'Very High'} ({isEditing ? riskRating : risk.riskRating})
              </Badge>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-1 shrink-0">
              {editable && !isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleEditClick}
                  className="h-11 w-11 p-0 touch-manipulation rounded-xl hover:bg-white/10 active:bg-white/20"
                >
                  <Edit3 className="h-5 w-5 text-white/60" />
                </Button>
              )}
              {!isEditing && (
                <div className="h-11 w-11 flex items-center justify-center">
                  <ChevronDown className={cn('h-5 w-5 text-white/40 transition-transform duration-200', isExpanded && 'rotate-180')} />
                </div>
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
                <h4 className="font-semibold text-white text-base leading-snug line-clamp-2">{risk.hazard || 'Untitled Hazard'}</h4>
                <p className="text-sm text-white line-clamp-2 mt-1.5 leading-relaxed">
                  {risk.controls || 'No control measures specified'}
                </p>
              </>
            )}
          </div>
        </button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="px-4 pb-4 space-y-4 border-t border-white/5 animate-slide-down">
            {/* Risk Description */}
            <div className="pt-4">
              <label className="text-xs font-medium text-white/60 uppercase tracking-wide text-left block">Risk Description</label>
              {isEditing ? (
                <Textarea
                  value={editedRisk.risk}
                  onChange={(e) => setEditedRisk({ ...editedRisk, risk: e.target.value })}
                  className="mt-2 min-h-[80px]"
                  placeholder="Describe the risk"
                />
              ) : (
                <p className="mt-2 text-sm text-white leading-relaxed text-left">{risk.risk}</p>
              )}
            </div>

            {/* Control Measures */}
            <div className="p-4 rounded-xl bg-amber-500/5 border-l-4 border-amber-500">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-bold text-amber-500">Control Measures</span>
              </div>
              {isEditing ? (
                <Textarea
                  value={editedRisk.controls}
                  onChange={(e) => setEditedRisk({ ...editedRisk, controls: e.target.value })}
                  className="min-h-[100px]"
                  placeholder="List control measures"
                />
              ) : (
                <div className="text-sm text-white leading-relaxed space-y-3 text-left">
                  {(risk.controls || 'No control measures specified')
                    .split(/(?=PRIMARY ACTION:|ELIMINATE:|SUBSTITUTE:|ENGINEER(?:ING)? CONTROLS?:|ADMINISTRATIVE CONTROLS?:|VERIFICATION:|COMPETENCY REQUIREMENT:|EQUIPMENT STANDARDS?:|REGULATION:|PPE:|TRAINING:|MONITORING:|EMERGENCY:)/gi)
                    .filter(section => section.trim())
                    .map((section, idx) => (
                      <p key={idx} className="leading-relaxed text-left">{section.trim()}</p>
                    ))
                  }
                </div>
              )}
            </div>

            {/* Likelihood & Severity */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <label className="text-xs font-medium text-white/60">Likelihood</label>
                {isEditing ? (
                  <div className="mt-3 space-y-2">
                    <Slider
                      value={[editedRisk.likelihood]}
                      onValueChange={(v) => setEditedRisk({ ...editedRisk, likelihood: v[0] })}
                      min={1} max={5} step={1}
                    />
                    <div className="text-center text-sm font-bold text-white">{editedRisk.likelihood}/5</div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={cn('w-2 h-2 rounded-full', i < risk.likelihood ? 'bg-elec-yellow' : 'bg-white/20')} />
                    ))}
                    <span className="ml-2 text-sm font-bold text-white">{risk.likelihood}/5</span>
                  </div>
                )}
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                <label className="text-xs font-medium text-white/60">Severity</label>
                {isEditing ? (
                  <div className="mt-3 space-y-2">
                    <Slider
                      value={[editedRisk.severity]}
                      onValueChange={(v) => setEditedRisk({ ...editedRisk, severity: v[0] })}
                      min={1} max={5} step={1}
                    />
                    <div className="text-center text-sm font-bold text-white">{editedRisk.severity}/5</div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className={cn('w-2 h-2 rounded-full', i < risk.severity ? 'bg-red-500' : 'bg-white/20')} />
                    ))}
                    <span className="ml-2 text-sm font-bold text-white">{risk.severity}/5</span>
                  </div>
                )}
              </div>
            </div>

            {/* Residual Risk */}
            <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/20 flex items-center justify-between">
              <span className="text-sm font-medium text-green-400">Residual Risk After Controls</span>
              {isEditing ? (
                <Input
                  type="number"
                  value={editedRisk.residualRisk}
                  onChange={(e) => setEditedRisk({ ...editedRisk, residualRisk: parseInt(e.target.value) || 0 })}
                  className="w-20 h-8 text-center"
                  min={0} max={25}
                />
              ) : (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">{risk.residualRisk}</Badge>
              )}
            </div>

            {/* Edit Actions */}
            {editable && isEditing && (
              <div className="flex gap-2 pt-4 border-t border-white/5">
                <Button variant="outline" className="flex-1 border-red-500/40 text-red-400 hover:bg-red-500/10" onClick={handleDelete}>
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" /> Cancel
                </Button>
                <Button className="flex-1 bg-elec-yellow text-black hover:bg-elec-yellow/90" onClick={handleSave}>
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