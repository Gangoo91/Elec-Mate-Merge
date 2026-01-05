import React, { useState, useCallback } from 'react';
import { TestResult } from '@/types/testResult';
import { CircuitCard } from './CircuitCard';
import { MobileBottomSheet } from '@/components/ui/MobileBottomSheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { X, Save, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface CircuitListProps {
  circuits: TestResult[];
  onUpdate: (id: string, field: keyof TestResult, value: string) => void;
  onRemove: (id: string) => void;
  onBulkUpdate?: (id: string, updates: Partial<TestResult>) => void;
  /** View mode */
  viewMode: 'card' | 'table';
  /** Additional class names */
  className?: string;
}

/**
 * Circuit list with mobile card view and edit sheet
 * Responsive switching between card and table views
 */
export const CircuitList: React.FC<CircuitListProps> = ({
  circuits,
  onUpdate,
  onRemove,
  onBulkUpdate,
  viewMode,
  className = '',
}) => {
  const [editingCircuit, setEditingCircuit] = useState<TestResult | null>(null);
  const [editedValues, setEditedValues] = useState<Partial<TestResult>>({});

  const handleEdit = useCallback((circuit: TestResult) => {
    setEditingCircuit(circuit);
    setEditedValues({});
  }, []);

  const handleFieldChange = useCallback((field: keyof TestResult, value: string) => {
    setEditedValues((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSave = useCallback(() => {
    if (!editingCircuit) return;

    if (onBulkUpdate) {
      onBulkUpdate(editingCircuit.id, editedValues);
    } else {
      // Apply individual updates
      Object.entries(editedValues).forEach(([field, value]) => {
        onUpdate(editingCircuit.id, field as keyof TestResult, value as string);
      });
    }

    setEditingCircuit(null);
    setEditedValues({});
  }, [editingCircuit, editedValues, onUpdate, onBulkUpdate]);

  const handleClose = useCallback(() => {
    setEditingCircuit(null);
    setEditedValues({});
  }, []);

  const handleDelete = useCallback(() => {
    if (!editingCircuit) return;
    onRemove(editingCircuit.id);
    setEditingCircuit(null);
    setEditedValues({});
  }, [editingCircuit, onRemove]);

  // Navigate to adjacent circuit
  const navigateCircuit = useCallback((direction: 'prev' | 'next') => {
    if (!editingCircuit) return;
    const currentIndex = circuits.findIndex((c) => c.id === editingCircuit.id);
    const newIndex = direction === 'prev' ? currentIndex - 1 : currentIndex + 1;

    if (newIndex >= 0 && newIndex < circuits.length) {
      // Save current first
      if (onBulkUpdate && Object.keys(editedValues).length > 0) {
        onBulkUpdate(editingCircuit.id, editedValues);
      }
      setEditingCircuit(circuits[newIndex]);
      setEditedValues({});
    }
  }, [editingCircuit, circuits, editedValues, onBulkUpdate]);

  if (circuits.length === 0) {
    return (
      <div className={cn('flex flex-col items-center justify-center py-12 text-center', className)}>
        <div className="p-4 rounded-full bg-muted/50 mb-4">
          <svg className="h-12 w-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-foreground mb-1">No Circuits Yet</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Add circuits manually or use AI to scan your distribution board
        </p>
      </div>
    );
  }

  return (
    <>
      <div className={cn('space-y-2 px-3', className)}>
        {circuits.map((circuit) => (
          <CircuitCard
            key={circuit.id}
            circuit={circuit}
            onEdit={() => handleEdit(circuit)}
            onDelete={() => onRemove(circuit.id)}
            enableSwipe={true}
          />
        ))}
      </div>

      {/* Edit Sheet */}
      <MobileBottomSheet
        isOpen={!!editingCircuit}
        onClose={handleClose}
        title={`Edit ${editingCircuit?.circuitDesignation || 'Circuit'}`}
        snapPoints={[0.9]}
      >
        {editingCircuit && (
          <CircuitEditForm
            circuit={editingCircuit}
            editedValues={editedValues}
            onChange={handleFieldChange}
            onSave={handleSave}
            onDelete={handleDelete}
            onClose={handleClose}
            onNavigate={navigateCircuit}
            canNavigatePrev={circuits.findIndex((c) => c.id === editingCircuit.id) > 0}
            canNavigateNext={circuits.findIndex((c) => c.id === editingCircuit.id) < circuits.length - 1}
          />
        )}
      </MobileBottomSheet>
    </>
  );
};

/**
 * Full edit form for circuit
 */
interface CircuitEditFormProps {
  circuit: TestResult;
  editedValues: Partial<TestResult>;
  onChange: (field: keyof TestResult, value: string) => void;
  onSave: () => void;
  onDelete: () => void;
  onClose: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  canNavigatePrev: boolean;
  canNavigateNext: boolean;
}

const CircuitEditForm: React.FC<CircuitEditFormProps> = ({
  circuit,
  editedValues,
  onChange,
  onSave,
  onDelete,
  onClose,
  onNavigate,
  canNavigatePrev,
  canNavigateNext,
}) => {
  const getValue = (field: keyof TestResult) => {
    return editedValues[field] !== undefined
      ? editedValues[field]
      : circuit[field] || '';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={!canNavigatePrev}
          className="h-9 px-3 gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <Badge variant="secondary" className="px-3">
          {circuit.circuitDesignation}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={!canNavigateNext}
          className="h-9 px-3 gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
        {/* Circuit Info */}
        <FormSection title="Circuit Details">
          <FormRow>
            <FormField label="Circuit No.">
              <Input
                value={getValue('circuitNumber') as string}
                onChange={(e) => onChange('circuitNumber', e.target.value)}
                className="h-12 text-base"
                inputMode="numeric"
              />
            </FormField>
            <FormField label="Description">
              <Input
                value={getValue('circuitDescription') as string}
                onChange={(e) => onChange('circuitDescription', e.target.value)}
                className="h-12 text-base"
                placeholder="e.g., Downstairs Sockets"
              />
            </FormField>
          </FormRow>
        </FormSection>

        {/* Protective Device */}
        <FormSection title="Protective Device">
          <FormRow>
            <FormField label="Type">
              <Select
                value={getValue('protectiveDeviceType') as string}
                onValueChange={(v) => onChange('protectiveDeviceType', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MCB">MCB</SelectItem>
                  <SelectItem value="RCBO">RCBO</SelectItem>
                  <SelectItem value="RCD">RCD</SelectItem>
                  <SelectItem value="Fuse">Fuse</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Rating (A)">
              <Select
                value={getValue('protectiveDeviceRating') as string}
                onValueChange={(v) => onChange('protectiveDeviceRating', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {['6', '10', '16', '20', '25', '32', '40', '50', '63'].map((v) => (
                    <SelectItem key={v} value={v}>{v}A</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </FormRow>
          <FormRow>
            <FormField label="Curve">
              <Select
                value={getValue('protectiveDeviceCurve') as string}
                onValueChange={(v) => onChange('protectiveDeviceCurve', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B">B</SelectItem>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Max Zs (Ω)">
              <Input
                value={getValue('maxZs') as string}
                onChange={(e) => onChange('maxZs', e.target.value)}
                className="h-12 text-base"
                inputMode="decimal"
                placeholder="Auto-calculated"
              />
            </FormField>
          </FormRow>
        </FormSection>

        {/* Conductors */}
        <FormSection title="Conductors">
          <FormRow>
            <FormField label="Live (mm²)">
              <Select
                value={getValue('liveSize') as string}
                onValueChange={(v) => onChange('liveSize', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {['1.0', '1.5', '2.5', '4.0', '6.0', '10.0', '16.0', '25.0'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="CPC (mm²)">
              <Select
                value={getValue('cpcSize') as string}
                onValueChange={(v) => onChange('cpcSize', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  {['1.0', '1.5', '2.5', '4.0', '6.0', '10.0', '16.0'].map((v) => (
                    <SelectItem key={v} value={v}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </FormRow>
        </FormSection>

        {/* Test Results */}
        <FormSection title="Test Results">
          <FormRow>
            <FormField label="R1+R2 (Ω)">
              <Input
                value={getValue('r1r2') as string}
                onChange={(e) => onChange('r1r2', e.target.value)}
                className="h-12 text-base"
                inputMode="decimal"
                placeholder="0.00"
              />
            </FormField>
            <FormField label="Zs (Ω)">
              <Input
                value={getValue('zs') as string}
                onChange={(e) => onChange('zs', e.target.value)}
                className="h-12 text-base"
                inputMode="decimal"
                placeholder="0.00"
              />
            </FormField>
          </FormRow>
          <FormRow>
            <FormField label="Ir L-N (MΩ)">
              <Input
                value={getValue('insulationLiveNeutral') as string}
                onChange={(e) => onChange('insulationLiveNeutral', e.target.value)}
                className="h-12 text-base"
                inputMode="decimal"
                placeholder=">200"
              />
            </FormField>
            <FormField label="Ir L-E (MΩ)">
              <Input
                value={getValue('insulationLiveEarth') as string}
                onChange={(e) => onChange('insulationLiveEarth', e.target.value)}
                className="h-12 text-base"
                inputMode="decimal"
                placeholder=">200"
              />
            </FormField>
          </FormRow>
          <FormRow>
            <FormField label="Polarity">
              <Select
                value={getValue('polarity') as string}
                onValueChange={(v) => onChange('polarity', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Satisfactory">Satisfactory</SelectItem>
                  <SelectItem value="Unsatisfactory">Unsatisfactory</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="PFC (kA)">
              <Input
                value={getValue('pfc') as string}
                onChange={(e) => onChange('pfc', e.target.value)}
                className="h-12 text-base"
                inputMode="decimal"
                placeholder="0.0"
              />
            </FormField>
          </FormRow>
        </FormSection>

        {/* RCD */}
        <FormSection title="RCD Protection">
          <FormRow>
            <FormField label="RCD Rating">
              <Select
                value={getValue('rcdRating') as string}
                onValueChange={(v) => onChange('rcdRating', v)}
              >
                <SelectTrigger className="h-12 text-base">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">N/A</SelectItem>
                  <SelectItem value="30mA">30mA</SelectItem>
                  <SelectItem value="100mA">100mA</SelectItem>
                  <SelectItem value="300mA">300mA</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Trip Time (ms)">
              <Input
                value={getValue('rcdOneX') as string}
                onChange={(e) => onChange('rcdOneX', e.target.value)}
                className="h-12 text-base"
                inputMode="numeric"
                placeholder="<300"
              />
            </FormField>
          </FormRow>
        </FormSection>
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-3 p-4 border-t border-border bg-background">
        <Button
          variant="destructive"
          size="sm"
          onClick={onDelete}
          className="h-11 px-4"
        >
          <Trash2 className="h-4 w-4 mr-2" />
          Delete
        </Button>
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="h-11 px-4"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={onSave}
          className="h-11 px-6"
        >
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
      </div>
    </div>
  );
};

// Helper components
const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children,
}) => (
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide">
      {title}
    </h4>
    <div className="space-y-3">{children}</div>
  </div>
);

const FormRow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const FormField: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground font-medium">{label}</Label>
    {children}
  </div>
);

export default CircuitList;
