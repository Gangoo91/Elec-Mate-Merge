import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MobileInput } from '@/components/ui/mobile-input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save, Loader2, Wrench, HardHat, Zap, Shield, Ruler, Eye, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

interface AddEquipmentFormProps {
  onSubmit: (data: EquipmentFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
  initialData?: Partial<EquipmentFormData>;
}

export interface EquipmentFormData {
  name: string;
  category: string;
  serial_number: string;
  purchase_date: string;
  purchase_price: number | null;
  warranty_expiry: string;
  location: string;
  assigned_to: string;
  requires_inspection: boolean;
  inspection_interval_days: number;
  last_inspection: string;
  requires_calibration: boolean;
  calibration_interval_days: number;
  last_calibration: string;
  status: 'good' | 'needs_attention' | 'out_of_service';
  condition_notes: string;
}

const CATEGORIES = [
  { value: 'ppe', label: 'PPE', icon: HardHat },
  { value: 'test_equipment', label: 'Test Equipment', icon: Zap },
  { value: 'hand_tools', label: 'Hand Tools', icon: Wrench },
  { value: 'power_tools', label: 'Power Tools', icon: Settings },
  { value: 'safety_equipment', label: 'Safety Equipment', icon: Shield },
  { value: 'measuring', label: 'Measuring', icon: Ruler },
  { value: 'inspection', label: 'Inspection', icon: Eye },
  { value: 'other', label: 'Other', icon: Wrench },
];

const INSPECTION_INTERVALS = [
  { value: 30, label: 'Monthly (30 days)' },
  { value: 60, label: 'Bi-monthly (60 days)' },
  { value: 90, label: 'Quarterly (90 days)' },
  { value: 180, label: 'Bi-annual (180 days)' },
  { value: 365, label: 'Annual (365 days)' },
];

const STATUS_OPTIONS = [
  { value: 'good', label: 'Good Condition', color: 'bg-green-500' },
  { value: 'needs_attention', label: 'Needs Attention', color: 'bg-amber-500' },
  { value: 'out_of_service', label: 'Out of Service', color: 'bg-destructive' },
];

export function AddEquipmentForm({ onSubmit, onCancel, isLoading, initialData }: AddEquipmentFormProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const [formData, setFormData] = useState<EquipmentFormData>({
    name: initialData?.name || '',
    category: initialData?.category || 'test_equipment',
    serial_number: initialData?.serial_number || '',
    purchase_date: initialData?.purchase_date || today,
    purchase_price: initialData?.purchase_price || null,
    warranty_expiry: initialData?.warranty_expiry || '',
    location: initialData?.location || '',
    assigned_to: initialData?.assigned_to || '',
    requires_inspection: initialData?.requires_inspection ?? true,
    inspection_interval_days: initialData?.inspection_interval_days || 90,
    last_inspection: initialData?.last_inspection || today,
    requires_calibration: initialData?.requires_calibration ?? false,
    calibration_interval_days: initialData?.calibration_interval_days || 365,
    last_calibration: initialData?.last_calibration || '',
    status: initialData?.status || 'good',
    condition_notes: initialData?.condition_notes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Equipment name is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  const updateField = <K extends keyof EquipmentFormData>(field: K, value: EquipmentFormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="h-10 w-10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {initialData ? 'Edit Equipment' : 'Add Equipment'}
          </h2>
          <p className="text-sm text-muted-foreground">
            Track your tools and safety equipment
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Section 1: Basic Info */}
        <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Wrench className="h-4 w-4 text-primary" />
            Basic Information
          </h3>
          
          <MobileInput
            label="Equipment Name"
            value={formData.name}
            onChange={(e) => updateField('name', e.target.value)}
            placeholder="e.g. Fluke 1664 FC"
            error={errors.name}
            clearError={() => setErrors(prev => ({ ...prev, name: '' }))}
          />

          <div className="space-y-2">
            <Label>Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => updateField('category', value)}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    <div className="flex items-center gap-2">
                      <cat.icon className="h-4 w-4" />
                      {cat.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <MobileInput
            label="Serial Number"
            value={formData.serial_number}
            onChange={(e) => updateField('serial_number', e.target.value)}
            placeholder="Optional"
          />
        </div>

        {/* Section 2: Purchase Details */}
        <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            Purchase Details
          </h3>

          <MobileInput
            label="Purchase Date"
            type="date"
            value={formData.purchase_date}
            onChange={(e) => updateField('purchase_date', e.target.value)}
          />

          <MobileInput
            label="Purchase Price"
            type="number"
            value={formData.purchase_price?.toString() || ''}
            onChange={(e) => updateField('purchase_price', e.target.value ? parseFloat(e.target.value) : null)}
            placeholder="0.00"
            unit="£"
          />

          <MobileInput
            label="Warranty Expiry"
            type="date"
            value={formData.warranty_expiry}
            onChange={(e) => updateField('warranty_expiry', e.target.value)}
          />
        </div>

        {/* Section 3: Location & Assignment */}
        <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Ruler className="h-4 w-4 text-primary" />
            Location & Assignment
          </h3>

          <MobileInput
            label="Current Location"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="e.g. Van, Workshop, Site"
            error={errors.location}
            clearError={() => setErrors(prev => ({ ...prev, location: '' }))}
          />

          <MobileInput
            label="Assigned To"
            value={formData.assigned_to}
            onChange={(e) => updateField('assigned_to', e.target.value)}
            placeholder="Optional - person responsible"
          />
        </div>

        {/* Section 4: Inspection & Calibration */}
        <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Eye className="h-4 w-4 text-primary" />
            Inspection & Calibration
          </h3>

          {/* Inspection Toggle */}
          <div className="flex items-center justify-between py-2">
            <div>
              <Label className="text-base">Requires Regular Inspection</Label>
              <p className="text-sm text-muted-foreground">Schedule periodic checks</p>
            </div>
            <Switch
              checked={formData.requires_inspection}
              onCheckedChange={(checked) => updateField('requires_inspection', checked)}
            />
          </div>

          {formData.requires_inspection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4 border-l-2 border-primary/30"
            >
              <div className="space-y-2">
                <Label>Inspection Interval</Label>
                <Select
                  value={formData.inspection_interval_days.toString()}
                  onValueChange={(value) => updateField('inspection_interval_days', parseInt(value))}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INSPECTION_INTERVALS.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value.toString()}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <MobileInput
                label="Last Inspection Date"
                type="date"
                value={formData.last_inspection}
                onChange={(e) => updateField('last_inspection', e.target.value)}
              />
            </motion.div>
          )}

          {/* Calibration Toggle */}
          <div className="flex items-center justify-between py-2 mt-4">
            <div>
              <Label className="text-base">Requires Calibration</Label>
              <p className="text-sm text-muted-foreground">For test equipment</p>
            </div>
            <Switch
              checked={formData.requires_calibration}
              onCheckedChange={(checked) => updateField('requires_calibration', checked)}
            />
          </div>

          {formData.requires_calibration && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 pl-4 border-l-2 border-primary/30"
            >
              <div className="space-y-2">
                <Label>Calibration Interval</Label>
                <Select
                  value={formData.calibration_interval_days.toString()}
                  onValueChange={(value) => updateField('calibration_interval_days', parseInt(value))}
                >
                  <SelectTrigger className="h-12 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INSPECTION_INTERVALS.map((interval) => (
                      <SelectItem key={interval.value} value={interval.value.toString()}>
                        {interval.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <MobileInput
                label="Last Calibration Date"
                type="date"
                value={formData.last_calibration}
                onChange={(e) => updateField('last_calibration', e.target.value)}
              />
            </motion.div>
          )}
        </div>

        {/* Section 5: Condition & Notes */}
        <div className="space-y-4 p-4 rounded-lg bg-card border border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            Condition & Notes
          </h3>

          <div className="space-y-2">
            <Label>Current Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => updateField('status', value as EquipmentFormData['status'])}
            >
              <SelectTrigger className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    <div className="flex items-center gap-2">
                      <div className={`h-3 w-3 rounded-full ${status.color}`} />
                      {status.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Condition Notes</Label>
            <Textarea
              value={formData.condition_notes}
              onChange={(e) => updateField('condition_notes', e.target.value)}
              placeholder="Any notes about the equipment condition..."
              className="min-h-[100px] text-base"
            />
          </div>
        </div>

        {/* Submit Button - Sticky */}
        <div className="sticky bottom-0 pt-4 pb-2 bg-background">
          <Button
            type="submit"
            className="w-full h-14 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-5 w-5" />
                {initialData ? 'Update Equipment' : 'Save Equipment'}
              </>
            )}
          </Button>
        </div>
      </form>
    </motion.div>
  );
}
