import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import { Shield, AlertTriangle, Info, Edit3, Save, X, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getRiskColors } from '@/utils/risk-level-helpers';
import type { RAMSRisk } from '@/types/rams';
import { toast } from '@/hooks/use-toast';
import { 
  MobileAccordion,
  MobileAccordionItem,
  MobileAccordionTrigger,
  MobileAccordionContent
} from '@/components/ui/mobile-accordion';

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
  const [isEditing, setIsEditing] = useState(false);
  const [editedRisk, setEditedRisk] = useState<RAMSRisk>(risk);
  const [isSaving, setIsSaving] = useState(false);
  
  const riskRating = editedRisk.likelihood * editedRisk.severity;
  const riskColors = getRiskColors(isEditing ? riskRating : risk.riskRating);

  // Sync editedRisk with prop changes
  useEffect(() => {
    setEditedRisk(risk);
    if (isSaving) {
      setIsEditing(false);
      setIsSaving(false);
    }
  }, [risk, isSaving]);

  // Auto-calculate risk rating when likelihood/severity changes
  useEffect(() => {
    if (isEditing) {
      setEditedRisk(prev => ({
        ...prev,
        riskRating: prev.likelihood * prev.severity
      }));
    }
  }, [editedRisk.likelihood, editedRisk.severity, isEditing]);

  const handleSave = () => {
    if (onUpdate) {
      setIsSaving(true);
      onUpdate(risk.id, editedRisk);
      toast({
        title: 'Hazard Updated',
        description: 'Risk assessment has been updated',
      });
    }
  };

  const handleCancel = () => {
    setEditedRisk(risk);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onRemove && confirm('Are you sure you want to delete this hazard?')) {
      onRemove(risk.id);
      toast({
        title: 'Hazard Deleted',
        description: 'Risk assessment has been removed',
      });
    }
  };

  return (
    <Card 
      className={cn(
        "mb-3 overflow-hidden transition-all hover:shadow-lg active:scale-[0.99]",
        `border-l-4 ${riskColors.border}`,
        "bg-card"
      )}
    >
      <MobileAccordion type="single" collapsible>
        <MobileAccordionItem value="risk-details" className="border-0">
          <div className="p-4 pb-0">
            {/* Header - Always Visible */}
            <div className="flex items-start gap-3 mb-3">
              <div className={cn(
                "flex items-center justify-center w-12 h-12 rounded-lg font-bold text-sm shrink-0",
                riskColors.bg,
                riskColors.text
              )}>
                #{index + 1}
              </div>
              <div className="flex-1 min-w-0">
                {isEditing ? (
                  <Input
                    value={editedRisk.hazard}
                    onChange={(e) => setEditedRisk({ ...editedRisk, hazard: e.target.value })}
                    className="font-bold text-base"
                    placeholder="Hazard title"
                  />
                ) : (
                  <h4 className="font-bold text-elec-light text-base leading-tight line-clamp-2">
                    {risk.hazard || 'Untitled Hazard'}
                  </h4>
                )}
              </div>
              {editable && !isEditing && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditing(true);
                  }}
                  className="shrink-0"
                >
                  <Edit3 className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Risk Score Badge */}
            <div className="flex items-center gap-2 mb-3">
              <div className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold",
                riskColors.bg,
                riskColors.text
              )}>
                <AlertTriangle className="h-4 w-4" />
                Risk Score: {isEditing ? riskRating : risk.riskRating}
              </div>
            </div>
          </div>

          {/* Collapsible Content */}
          <MobileAccordionTrigger className="px-4 py-3 bg-transparent border-0 hover:bg-transparent">
            <span className="text-xs text-elec-light/70">Tap to view details</span>
          </MobileAccordionTrigger>

          <MobileAccordionContent className="px-4 pb-4">
            <div className="space-y-4 mt-2">
              {/* Risk Description */}
              <div className="bg-background/50 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-elec-yellow" />
                  <span className="text-sm font-semibold text-elec-light">Risk Description</span>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedRisk.risk}
                    onChange={(e) => setEditedRisk({ ...editedRisk, risk: e.target.value })}
                    className="min-h-[80px]"
                    placeholder="Describe the risk"
                  />
                ) : (
                  <p className="text-sm text-elec-light/90 leading-relaxed">
                    {risk.risk}
                  </p>
                )}
              </div>

              {/* Control Measures - Prominent */}
              <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-5 w-5 text-amber-500" />
                  <span className="text-sm font-bold text-elec-light">Control Measures</span>
                </div>
                {isEditing ? (
                  <Textarea
                    value={editedRisk.controls}
                    onChange={(e) => setEditedRisk({ ...editedRisk, controls: e.target.value })}
                    className="min-h-[100px]"
                    placeholder="List control measures to mitigate the risk"
                  />
                ) : (
                  <p className="text-sm text-elec-light/90 leading-relaxed whitespace-pre-wrap">
                    {risk.controls || 'No control measures specified'}
                  </p>
                )}
              </div>

              {/* Likelihood & Severity Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="text-xs text-elec-light/60 mb-3">Likelihood</div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <Slider
                        value={[editedRisk.likelihood]}
                        onValueChange={(value) => setEditedRisk({ ...editedRisk, likelihood: value[0] })}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center text-sm font-semibold text-elec-light">{editedRisk.likelihood}/5</div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            i < risk.likelihood ? "bg-elec-yellow" : "bg-elec-light/20"
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-elec-light">{risk.likelihood}/5</span>
                    </div>
                  )}
                </div>
                <div className="bg-card/50 rounded-lg p-4 border border-primary/20">
                  <div className="text-xs text-elec-light/60 mb-3">Severity</div>
                  {isEditing ? (
                    <div className="space-y-3">
                      <Slider
                        value={[editedRisk.severity]}
                        onValueChange={(value) => setEditedRisk({ ...editedRisk, severity: value[0] })}
                        min={1}
                        max={5}
                        step={1}
                        className="w-full"
                      />
                      <div className="text-center text-sm font-semibold text-elec-light">{editedRisk.severity}/5</div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-2 h-2 rounded-full",
                            i < risk.severity ? "bg-red-500" : "bg-elec-light/20"
                          )}
                        />
                      ))}
                      <span className="ml-2 text-sm font-semibold text-elec-light">{risk.severity}/5</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Residual Risk */}
              <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-400">Residual Risk After Controls</span>
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedRisk.residualRisk}
                      onChange={(e) => setEditedRisk({ ...editedRisk, residualRisk: parseInt(e.target.value) || 0 })}
                      className="w-20 h-8 text-center"
                      min={0}
                      max={25}
                    />
                  ) : (
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/40">
                      {risk.residualRisk}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Further Action */}
              <div className="bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                <div className="text-xs font-semibold text-blue-400 mb-2">Further Action Required</div>
                {isEditing ? (
                  <Textarea
                    value={editedRisk.furtherAction || ''}
                    onChange={(e) => setEditedRisk({ ...editedRisk, furtherAction: e.target.value })}
                    className="min-h-[60px] mb-2"
                    placeholder="Optional: Specify any further actions needed"
                  />
                ) : (
                  risk.furtherAction && <p className="text-sm text-elec-light/90 mb-2">{risk.furtherAction}</p>
                )}
                
                <div className="text-xs text-elec-light/70">
                  Responsible: {' '}
                  {isEditing ? (
                    <Input
                      value={editedRisk.responsible || ''}
                      onChange={(e) => setEditedRisk({ ...editedRisk, responsible: e.target.value })}
                      className="inline-flex w-auto min-w-[150px] h-7 text-xs mt-1"
                      placeholder="Person responsible"
                    />
                  ) : (
                    <span className="font-semibold">{risk.responsible || 'Not assigned'}</span>
                  )}
                </div>
              </div>

              {/* Edit Actions */}
              {editable && isEditing && (
                <div className="flex gap-2 pt-4 border-t border-primary/10">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-red-500/40 hover:border-red-500 hover:bg-red-500/10 text-red-400"
                    onClick={handleDelete}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={handleCancel}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button 
                    className="flex-1 bg-elec-yellow hover:bg-elec-yellow/90 text-elec-card"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              )}
            </div>
          </MobileAccordionContent>
        </MobileAccordionItem>
      </MobileAccordion>
    </Card>
  );
};
