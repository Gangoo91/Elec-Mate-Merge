/**
 * Solar PV Declarations Tab
 * Defects, handover checklist, installer and electrician declarations
 */

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  AlertTriangle,
  FileCheck,
  PenLine,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  RotateCcw,
  Camera,
  Upload,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  Defect,
  DefectSeverity,
  CertificatePhoto,
  PhotoCategory,
} from '@/types/solar-pv';
import { supabase } from '@/integrations/supabase/client';

interface SolarPVDeclarationsProps {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: any) => void;
}

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  color?: string;
  badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  isOpen,
  color = 'amber-500',
  badge,
}) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-5 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        `bg-${color}/15`
      )}>
        <Icon className={cn('h-5 w-5', `text-${color}`)} />
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          {title}
          {badge && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-400 border-amber-500/30">
              {badge}
            </Badge>
          )}
        </h3>
      </div>
    </div>
    {isOpen ? (
      <ChevronUp className="h-5 w-5 text-muted-foreground" />
    ) : (
      <ChevronDown className="h-5 w-5 text-muted-foreground" />
    )}
  </CollapsibleTrigger>
);

// Signature Canvas Component
interface SignatureCanvasProps {
  value: string;
  onChange: (signature: string) => void;
  label: string;
}

const SignatureCanvas: React.FC<SignatureCanvasProps> = ({ value, onChange, label }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);

    // Set drawing style
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Load existing signature if present
    if (value) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, rect.width, rect.height);
      };
      img.src = value;
    }
  }, []);

  const getCoordinates = (e: React.TouchEvent | React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const startDrawing = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDrawing) return;
    e.preventDefault();
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      if (canvas) {
        onChange(canvas.toDataURL('image/png'));
      }
    }
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onChange('');
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium text-foreground">{label}</Label>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={clearSignature}
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          <RotateCcw className="h-3 w-3 mr-1" />
          Clear
        </Button>
      </div>
      <div className="border border-white/20 rounded-lg bg-elec-gray/50 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-24 cursor-crosshair touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <p className="text-xs text-muted-foreground">Draw signature above</p>
    </div>
  );
};

const SolarPVDeclarations: React.FC<SolarPVDeclarationsProps> = ({
  formData,
  onUpdate,
}) => {
  const [openSections, setOpenSections] = useState({
    defects: true,
    handover: true,
    installer: true,
    electrician: true,
    photos: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Add defect
  const addDefect = useCallback(() => {
    const newDefect: Defect = {
      id: `defect-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      description: '',
      severity: 'non-critical',
      location: '',
      rectified: false,
    };
    onUpdate('defects', [...(formData.defects || []), newDefect]);
  }, [formData.defects, onUpdate]);

  // Update defect
  const updateDefect = useCallback((id: string, field: string, value: any) => {
    const updatedDefects = (formData.defects || []).map(defect => {
      if (defect.id === id) {
        return { ...defect, [field]: value };
      }
      return defect;
    });
    onUpdate('defects', updatedDefects);
  }, [formData.defects, onUpdate]);

  // Remove defect
  const removeDefect = useCallback((id: string) => {
    const updatedDefects = (formData.defects || []).filter(d => d.id !== id);
    onUpdate('defects', updatedDefects);
  }, [formData.defects, onUpdate]);

  // Update installer declaration
  const updateInstaller = useCallback((field: string, value: any) => {
    onUpdate('installerDeclaration', {
      ...formData.installerDeclaration,
      [field]: value,
    });
  }, [formData.installerDeclaration, onUpdate]);

  // Update electrician declaration
  const updateElectrician = useCallback((field: string, value: any) => {
    onUpdate('electricianDeclaration', {
      ...formData.electricianDeclaration,
      [field]: value,
    });
  }, [formData.electricianDeclaration, onUpdate]);

  // Update handover
  const updateHandover = useCallback((field: string, value: any) => {
    onUpdate('handover', {
      ...formData.handover,
      [field]: value,
    });
  }, [formData.handover, onUpdate]);

  // Get severity badge color
  const getSeverityColor = (severity: DefectSeverity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'non-critical': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'recommendation': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4 px-4 sm:px-0">
      {/* Defects & Observations */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.defects} onOpenChange={() => toggleSection('defects')}>
          <SectionHeader
            title="Defects & Observations"
            icon={AlertTriangle}
            isOpen={openSections.defects}
            color="orange-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {(formData.defects || []).length === 0 && (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <p className="text-green-400 text-sm">No defects recorded</p>
                </div>
              )}

              {(formData.defects || []).map((defect, index) => (
                <div
                  key={defect.id}
                  className="p-4 bg-muted/30 rounded-xl border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <Badge className={getSeverityColor(defect.severity)}>
                      {defect.severity}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDefect(defect.id)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1 sm:col-span-2">
                      <Label className="text-xs text-muted-foreground">Description</Label>
                      <Textarea
                        value={defect.description}
                        onChange={(e) => updateDefect(defect.id, 'description', e.target.value)}
                        placeholder="Describe the defect..."
                        className="min-h-[60px] touch-manipulation text-base border-white/30"
                      />
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Severity</Label>
                      <Select
                        value={defect.severity}
                        onValueChange={(value) => updateDefect(defect.id, 'severity', value as DefectSeverity)}
                      >
                        <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="critical">Critical (C1)</SelectItem>
                          <SelectItem value="non-critical">Non-Critical (C2)</SelectItem>
                          <SelectItem value="recommendation">Recommendation (C3)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Location</Label>
                      <Input
                        value={defect.location}
                        onChange={(e) => updateDefect(defect.id, 'location', e.target.value)}
                        placeholder="Where is the defect?"
                        className="h-10 text-base touch-manipulation border-white/30"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <Checkbox
                      checked={defect.rectified}
                      onCheckedChange={(checked) => {
                        updateDefect(defect.id, 'rectified', checked);
                        if (checked) {
                          updateDefect(defect.id, 'rectificationDate', new Date().toISOString().split('T')[0]);
                        }
                      }}
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">Rectified</Label>
                    {defect.rectified && (
                      <Input
                        type="date"
                        value={defect.rectificationDate || ''}
                        onChange={(e) => updateDefect(defect.id, 'rectificationDate', e.target.value)}
                        className="h-10 w-40 text-sm border-white/30"
                      />
                    )}
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={addDefect}
                className="w-full h-12 border-dashed border-white/30 hover:border-orange-500/50 hover:bg-orange-500/5"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Defect / Observation
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Handover Documentation */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.handover} onOpenChange={() => toggleSection('handover')}>
          <SectionHeader
            title="Handover Documentation"
            icon={FileCheck}
            isOpen={openSections.handover}
            color="green-500"
            badge="MCS Required"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-3 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { field: 'userManualProvided', label: 'User Manual Provided' },
                  { field: 'warrantyDocsProvided', label: 'Warranty Documents Provided' },
                  { field: 'mcsDocumentProvided', label: 'MCS Certificate Provided' },
                  { field: 'maintenanceScheduleProvided', label: 'Maintenance Schedule Provided' },
                  { field: 'systemDesignProvided', label: 'System Design Documents' },
                  { field: 'g98g99ConfirmationProvided', label: 'G98/G99 Confirmation' },
                  { field: 'performanceEstimateProvided', label: 'Performance Estimate' },
                  { field: 'dnoNotificationCopyProvided', label: 'DNO Notification Copy' },
                  { field: 'emergencyShutdownExplained', label: 'Emergency Shutdown Explained' },
                ].map(item => (
                  <div key={item.field} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                    <Checkbox
                      checked={(formData.handover as any)?.[item.field] || false}
                      onCheckedChange={(checked) => updateHandover(item.field, checked)}
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Installer Declaration */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.installer} onOpenChange={() => toggleSection('installer')}>
          <SectionHeader
            title="Installer Declaration"
            icon={PenLine}
            isOpen={openSections.installer}
            color="amber-500"
            badge="Required"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {/* Declaration text */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-sm text-amber-200">
                I certify that this Solar PV system has been designed, installed and commissioned in accordance with BS 7671, BS EN 62446, and MCS Installation Standard MIS-3002. The system is safe to use and appropriate documentation has been provided to the customer.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Installer Name *</Label>
                  <Input
                    value={formData.installerDeclaration?.installerName || ''}
                    onChange={(e) => updateInstaller('installerName', e.target.value)}
                    placeholder="Full name"
                    className="h-11 text-base touch-manipulation border-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Company</Label>
                  <Input
                    value={formData.installerDeclaration?.installerCompany || ''}
                    onChange={(e) => updateInstaller('installerCompany', e.target.value)}
                    placeholder="Company name"
                    className="h-11 text-base touch-manipulation border-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">MCS Number *</Label>
                  <Input
                    value={formData.installerDeclaration?.installerMcsNumber || ''}
                    onChange={(e) => updateInstaller('installerMcsNumber', e.target.value)}
                    placeholder="e.g., NAP-12345"
                    className="h-11 text-base touch-manipulation border-white/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Phone</Label>
                  <Input
                    value={formData.installerDeclaration?.installerPhone || ''}
                    onChange={(e) => updateInstaller('installerPhone', e.target.value)}
                    placeholder="Contact number"
                    className="h-11 text-base touch-manipulation border-white/30"
                  />
                </div>

                <div className="space-y-2 sm:col-span-2">
                  <Label className="text-sm font-medium text-foreground">Email</Label>
                  <Input
                    type="email"
                    value={formData.installerDeclaration?.installerEmail || ''}
                    onChange={(e) => updateInstaller('installerEmail', e.target.value)}
                    placeholder="email@company.com"
                    className="h-11 text-base touch-manipulation border-white/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SignatureCanvas
                  value={formData.installerDeclaration?.installerSignature || ''}
                  onChange={(sig) => updateInstaller('installerSignature', sig)}
                  label="Installer Signature *"
                />

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">Date *</Label>
                  <Input
                    type="date"
                    value={formData.installerDeclaration?.installerDate || ''}
                    onChange={(e) => updateInstaller('installerDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Electrician Declaration (if different) */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.electrician} onOpenChange={() => toggleSection('electrician')}>
          <SectionHeader
            title="Electrician Declaration"
            icon={PenLine}
            isOpen={openSections.electrician}
            color="blue-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                <Checkbox
                  checked={formData.electricianDeclaration?.required || false}
                  onCheckedChange={(checked) => updateElectrician('required', checked)}
                  className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label className="text-sm text-foreground cursor-pointer">
                  AC electrical work carried out by different person
                </Label>
              </div>

              {formData.electricianDeclaration?.required && (
                <>
                  <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-sm text-blue-200">
                    I certify that the AC electrical installation has been designed, installed and tested in accordance with BS 7671. The installation is safe to be connected to the electricity supply.
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Electrician Name</Label>
                      <Input
                        value={formData.electricianDeclaration?.electricianName || ''}
                        onChange={(e) => updateElectrician('electricianName', e.target.value)}
                        placeholder="Full name"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Company</Label>
                      <Input
                        value={formData.electricianDeclaration?.electricianCompany || ''}
                        onChange={(e) => updateElectrician('electricianCompany', e.target.value)}
                        placeholder="Company name"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Registration Number</Label>
                      <Input
                        value={formData.electricianDeclaration?.electricianRegistration || ''}
                        onChange={(e) => updateElectrician('electricianRegistration', e.target.value)}
                        placeholder="e.g., NICEIC/NAPIT number"
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Scheme</Label>
                      <Select
                        value={formData.electricianDeclaration?.electricianScheme || ''}
                        onValueChange={(value) => updateElectrician('electricianScheme', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray">
                          <SelectValue placeholder="Select scheme" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="NICEIC">NICEIC</SelectItem>
                          <SelectItem value="NAPIT">NAPIT</SelectItem>
                          <SelectItem value="ELECSA">ELECSA</SelectItem>
                          <SelectItem value="STROMA">STROMA</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <SignatureCanvas
                      value={formData.electricianDeclaration?.electricianSignature || ''}
                      onChange={(sig) => updateElectrician('electricianSignature', sig)}
                      label="Electrician Signature"
                    />

                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Date</Label>
                      <Input
                        type="date"
                        value={formData.electricianDeclaration?.electricianDate || ''}
                        onChange={(e) => updateElectrician('electricianDate', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Additional Notes */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-4 sm:p-5">
          <Label className="text-sm font-medium text-foreground mb-2 block">Additional Notes</Label>
          <Textarea
            value={formData.additionalNotes || ''}
            onChange={(e) => onUpdate('additionalNotes', e.target.value)}
            placeholder="Any additional notes, special conditions, or comments..."
            className="min-h-[100px] touch-manipulation text-base border-white/30 focus:border-yellow-500"
          />
        </div>
      </Card>
    </div>
  );
};

export default SolarPVDeclarations;
