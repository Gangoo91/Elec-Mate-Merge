import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useHaptics } from '@/hooks/useHaptics';
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
import { Save, Trash2, ChevronLeft, ChevronRight, Zap, TestTube, Shield, MessageSquare, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

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
      <div className={cn('space-y-1.5', className)}>
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
 * Tab definition for bottom sheet
 */
type TabId = 'circuit' | 'tests' | 'rcd' | 'remarks';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

/**
 * Full edit form for circuit with tabbed interface
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
  const [activeTab, setActiveTab] = useState<TabId>('circuit');
  const haptics = useHaptics();

  // Haptic feedback on save
  const handleSave = useCallback(() => {
    haptics.success();
    onSave();
  }, [haptics, onSave]);

  // Haptic feedback on delete
  const handleDelete = useCallback(() => {
    haptics.impact();
    onDelete();
  }, [haptics, onDelete]);

  // Haptic feedback on tab change
  const handleTabChange = useCallback((tab: TabId) => {
    haptics.tap();
    setActiveTab(tab);
  }, [haptics]);

  const getValue = (field: keyof TestResult) => {
    return editedValues[field] !== undefined
      ? editedValues[field]
      : circuit[field] || '';
  };

  // Check if circuit has RCD protection
  const hasRcd = useMemo(() => {
    const rcdType = getValue('rcdType') as string;
    const rcdRating = getValue('rcdRating') as string;
    const rcdBsStandard = getValue('rcdBsStandard') as string;
    return !!(rcdType || rcdRating || rcdBsStandard);
  }, [circuit, editedValues]);

  // Define available tabs (RCD tab only if circuit has RCD)
  const tabs: Tab[] = useMemo(() => {
    const baseTabs: Tab[] = [
      { id: 'circuit', label: 'Circuit', icon: <Zap className="h-4 w-4" /> },
      { id: 'tests', label: 'Tests', icon: <TestTube className="h-4 w-4" /> },
    ];

    // Always show RCD tab but indicate if not applicable
    baseTabs.push({ id: 'rcd', label: 'RCD', icon: <Shield className="h-4 w-4" /> });
    baseTabs.push({ id: 'remarks', label: 'Remarks', icon: <MessageSquare className="h-4 w-4" /> });

    return baseTabs;
  }, [hasRcd]);

  // Validate quick values
  const getQuickValueValidation = (field: string, value: string): 'pass' | 'fail' | 'warning' | 'empty' => {
    if (!value || value === '') return 'empty';

    const numValue = parseFloat(value.replace('>', '').replace('<', ''));

    switch (field) {
      case 'r1r2': {
        const maxR1R2 = parseFloat(getValue('maxZs') as string) || 999;
        if (numValue <= maxR1R2 * 0.5) return 'pass';
        if (numValue <= maxR1R2) return 'warning';
        return 'fail';
      }
      case 'zs': {
        const maxZs = parseFloat(getValue('maxZs') as string) || 999;
        if (numValue <= maxZs * 0.8) return 'pass';
        if (numValue <= maxZs) return 'warning';
        return 'fail';
      }
      case 'ir': {
        if (value.includes('>') || numValue >= 200) return 'pass';
        if (numValue >= 2) return 'warning';
        if (numValue >= 1) return 'warning';
        return 'fail';
      }
      case 'rcd': {
        if (numValue < 200) return 'pass';
        if (numValue < 300) return 'warning';
        return 'fail';
      }
      case 'polarity':
        return value === 'Correct' ? 'pass' : value === 'Incorrect' ? 'fail' : 'empty';
      default:
        return value ? 'pass' : 'empty';
    }
  };

  // Format display value for quick values
  const formatQuickValue = (field: string, value: string): string => {
    if (!value || value === '') return '—';
    if (field === 'polarity') return value === 'Correct' ? '✓' : value === 'Incorrect' ? '✗' : value;
    return value;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Navigation header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-border bg-muted/30">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={!canNavigatePrev}
          className="h-8 px-2 gap-1"
        >
          <ChevronLeft className="h-4 w-4" />
          Prev
        </Button>
        <Badge variant="secondary" className="px-2 text-xs">
          {circuit.circuitDesignation || `C${circuit.circuitNumber}`}
        </Badge>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={!canNavigateNext}
          className="h-8 px-2 gap-1"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Sticky Quick Values Row */}
      <div className="px-3 py-2 border-b border-border bg-card">
        <div className="flex items-center gap-1 mb-2">
          <Zap className="h-3 w-3 text-primary" />
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide">Quick Values</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          <QuickValueTile
            label="R1+R2"
            value={formatQuickValue('r1r2', getValue('r1r2') as string)}
            unit="Ω"
            validation={getQuickValueValidation('r1r2', getValue('r1r2') as string)}
            onClick={() => setActiveTab('tests')}
          />
          <QuickValueTile
            label="Zs"
            value={formatQuickValue('zs', getValue('zs') as string)}
            unit="Ω"
            validation={getQuickValueValidation('zs', getValue('zs') as string)}
            onClick={() => setActiveTab('tests')}
          />
          <QuickValueTile
            label="Ir"
            value={formatQuickValue('ir', getValue('insulationLiveEarth') as string)}
            unit="MΩ"
            validation={getQuickValueValidation('ir', getValue('insulationLiveEarth') as string)}
            onClick={() => setActiveTab('tests')}
          />
          <QuickValueTile
            label="Polarity"
            value={formatQuickValue('polarity', getValue('polarity') as string)}
            validation={getQuickValueValidation('polarity', getValue('polarity') as string)}
            isStatus
            onClick={() => setActiveTab('tests')}
          />
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border bg-background">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-3 text-sm font-medium transition-colors',
              'border-b-2 -mb-[2px]',
              activeTab === tab.id
                ? 'text-primary border-primary'
                : 'text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30'
            )}
          >
            {tab.icon}
            <span className="hidden xs:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {activeTab === 'circuit' && (
          <CircuitTabContent getValue={getValue} onChange={onChange} />
        )}

        {activeTab === 'tests' && (
          <TestsTabContent getValue={getValue} onChange={onChange} />
        )}

        {activeTab === 'rcd' && (
          <RcdTabContent getValue={getValue} onChange={onChange} hasRcd={hasRcd} />
        )}

        {activeTab === 'remarks' && (
          <RemarksTabContent getValue={getValue} onChange={onChange} />
        )}
      </div>

      {/* Footer actions */}
      <div className="flex items-center gap-2 p-3 border-t border-border bg-background">
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          className="h-10 px-3"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </Button>
        <div className="flex-1" />
        <Button
          variant="outline"
          size="sm"
          onClick={onClose}
          className="h-10 px-3"
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={handleSave}
          className="h-10 px-4 bg-gradient-to-r from-primary to-primary/80"
        >
          <Save className="h-4 w-4 mr-1" />
          Save
        </Button>
      </div>
    </div>
  );
};

/**
 * Quick Value Tile for sticky header
 */
interface QuickValueTileProps {
  label: string;
  value: string;
  unit?: string;
  validation: 'pass' | 'fail' | 'warning' | 'empty';
  isStatus?: boolean;
  onClick?: () => void;
}

const QuickValueTile: React.FC<QuickValueTileProps> = ({
  label,
  value,
  unit,
  validation,
  isStatus = false,
  onClick,
}) => {
  const haptics = useHaptics();

  const tileColors = {
    pass: 'bg-green-500/10 border-green-500/40 text-green-400',
    fail: 'bg-red-500/10 border-red-500/40 text-red-400',
    warning: 'bg-amber-500/10 border-amber-500/40 text-amber-400',
    empty: 'bg-muted/30 border-border/50 text-muted-foreground',
  };

  const handleClick = useCallback(() => {
    // Provide feedback based on validation status
    if (validation === 'fail') {
      haptics.error();
    } else if (validation === 'warning') {
      haptics.warning();
    } else {
      haptics.tap();
    }
    onClick?.();
  }, [haptics, validation, onClick]);

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex flex-col items-center justify-center p-2 rounded-lg border transition-all',
        'active:scale-95',
        tileColors[validation]
      )}
    >
      <span className="text-[10px] font-medium text-muted-foreground mb-0.5">{label}</span>
      <span className={cn(
        'text-base font-bold',
        isStatus && value === '✓' && 'text-green-400',
        isStatus && value === '✗' && 'text-red-400',
      )}>
        {value}
      </span>
      {unit && <span className="text-[10px] text-muted-foreground">{unit}</span>}
    </button>
  );
};

/**
 * Circuit Tab Content
 */
interface TabContentProps {
  getValue: (field: keyof TestResult) => string | number | boolean | undefined;
  onChange: (field: keyof TestResult, value: string) => void;
}

const CircuitTabContent: React.FC<TabContentProps> = ({ getValue, onChange }) => (
  <>
    {/* Circuit Info */}
    <FormSection title="Circuit Details">
      <FormRow>
        <FormField label="Circuit No.">
          <Input
            value={getValue('circuitNumber') as string}
            onChange={(e) => onChange('circuitNumber', e.target.value)}
            className="h-11 text-sm"
            inputMode="numeric"
          />
        </FormField>
        <FormField label="Description">
          <Input
            value={getValue('circuitDescription') as string}
            onChange={(e) => onChange('circuitDescription', e.target.value)}
            className="h-11 text-sm"
            placeholder="e.g., Downstairs Sockets"
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Type of Wiring">
          <Select
            value={getValue('typeOfWiring') as string}
            onValueChange={(v) => onChange('typeOfWiring', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A - T&E</SelectItem>
              <SelectItem value="B">B - Singles</SelectItem>
              <SelectItem value="C">C - Thermosetting</SelectItem>
              <SelectItem value="D">D - MICC</SelectItem>
              <SelectItem value="E">E - Flexible</SelectItem>
              <SelectItem value="F">F - SWA/AWA</SelectItem>
              <SelectItem value="O">O - Other</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Ref Method">
          <Select
            value={getValue('referenceMethod') as string}
            onValueChange={(v) => onChange('referenceMethod', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A - Conduit</SelectItem>
              <SelectItem value="B">B - Open/Enclosed</SelectItem>
              <SelectItem value="C">C - Clipped</SelectItem>
              <SelectItem value="D">D - Ground</SelectItem>
              <SelectItem value="E">E - Free air</SelectItem>
              <SelectItem value="F">F - Trunking</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Points Served">
          <Input
            value={getValue('pointsServed') as string}
            onChange={(e) => onChange('pointsServed', e.target.value)}
            className="h-11 text-sm"
            inputMode="numeric"
            placeholder="e.g., 10"
          />
        </FormField>
        <div />
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
            <SelectTrigger className="h-11 text-sm">
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
            <SelectTrigger className="h-11 text-sm">
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

    {/* Protective Device */}
    <FormSection title="Protective Device">
      <FormRow>
        <FormField label="BS Standard">
          <Select
            value={getValue('bsStandard') as string}
            onValueChange={(v) => onChange('bsStandard', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BS EN 60898-1">MCB</SelectItem>
              <SelectItem value="BS EN 61009-1">RCBO</SelectItem>
              <SelectItem value="BS 88-2">Fuse gG</SelectItem>
              <SelectItem value="BS 88-3">Fuse gM</SelectItem>
              <SelectItem value="BS 3036">Rewireable</SelectItem>
              <SelectItem value="BS EN 60269">HRC</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Type">
          <Select
            value={getValue('protectiveDeviceCurve') as string}
            onValueChange={(v) => onChange('protectiveDeviceCurve', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="B">B</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="D">D</SelectItem>
              <SelectItem value="gG">gG</SelectItem>
              <SelectItem value="gM">gM</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Rating (A)">
          <Select
            value={getValue('protectiveDeviceRating') as string}
            onValueChange={(v) => onChange('protectiveDeviceRating', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {['6', '10', '16', '20', '25', '32', '40', '50', '63', '80', '100'].map((v) => (
                <SelectItem key={v} value={v}>{v}A</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Max Zs (Ω)">
          <Input
            value={getValue('maxZs') as string}
            onChange={(e) => onChange('maxZs', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="Auto-calc"
          />
        </FormField>
      </FormRow>
    </FormSection>
  </>
);

/**
 * Tests Tab Content
 */
const TestsTabContent: React.FC<TabContentProps> = ({ getValue, onChange }) => (
  <>
    {/* Continuity */}
    <FormSection title="Continuity">
      <FormRow>
        <FormField label="R1+R2 (Ω)">
          <Input
            value={getValue('r1r2') as string}
            onChange={(e) => onChange('r1r2', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="0.00"
          />
        </FormField>
        <FormField label="R2 (Ω)">
          <Input
            value={getValue('r2') as string}
            onChange={(e) => onChange('r2', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="0.00"
          />
        </FormField>
      </FormRow>
      <div className="text-xs text-muted-foreground font-medium mt-2 mb-1">Ring Circuit (if applicable)</div>
      <FormRow>
        <FormField label="r₁ line (Ω)">
          <Input
            value={getValue('ringR1') as string}
            onChange={(e) => onChange('ringR1', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="0.00"
          />
        </FormField>
        <FormField label="rₙ neutral (Ω)">
          <Input
            value={getValue('ringRn') as string}
            onChange={(e) => onChange('ringRn', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="0.00"
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="r₂ cpc (Ω)">
          <Input
            value={getValue('ringR2') as string}
            onChange={(e) => onChange('ringR2', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="0.00"
          />
        </FormField>
        <div />
      </FormRow>
    </FormSection>

    {/* Insulation */}
    <FormSection title="Insulation">
      <FormRow>
        <FormField label="Test Voltage">
          <Select
            value={getValue('insulationTestVoltage') as string}
            onValueChange={(v) => onChange('insulationTestVoltage', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="250">250V</SelectItem>
              <SelectItem value="500">500V</SelectItem>
              <SelectItem value="1000">1000V</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <div />
      </FormRow>
      <FormRow>
        <FormField label="Live-Live (MΩ)">
          <Input
            value={getValue('insulationLiveNeutral') as string}
            onChange={(e) => onChange('insulationLiveNeutral', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder=">200"
          />
        </FormField>
        <FormField label="Live-Earth (MΩ)">
          <Input
            value={getValue('insulationLiveEarth') as string}
            onChange={(e) => onChange('insulationLiveEarth', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder=">200"
          />
        </FormField>
      </FormRow>
    </FormSection>

    {/* Earth Fault Loop & Polarity */}
    <FormSection title="Earth Fault Loop & Polarity">
      <FormRow>
        <FormField label="Zs (Ω)">
          <Input
            value={getValue('zs') as string}
            onChange={(e) => onChange('zs', e.target.value)}
            className="h-11 text-sm"
            inputMode="decimal"
            placeholder="0.00"
          />
        </FormField>
        <FormField label="Polarity">
          <Select
            value={getValue('polarity') as string}
            onValueChange={(v) => onChange('polarity', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Correct">✓ Correct</SelectItem>
              <SelectItem value="Incorrect">✗ Incorrect</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>
    </FormSection>

    {/* Other Tests */}
    <FormSection title="Other Tests">
      <FormRow>
        <FormField label="AFDD Test">
          <Select
            value={getValue('afddTest') as string}
            onValueChange={(v) => onChange('afddTest', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="✓">✓ Pass</SelectItem>
              <SelectItem value="✗">✗ Fail</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Functional">
          <Select
            value={getValue('functionalTesting') as string}
            onValueChange={(v) => onChange('functionalTesting', v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="✓">✓ Satisfactory</SelectItem>
              <SelectItem value="✗">✗ Unsatisfactory</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>
    </FormSection>
  </>
);

/**
 * RCD Tab Content
 */
interface RcdTabContentProps extends TabContentProps {
  hasRcd: boolean;
}

const RcdTabContent: React.FC<RcdTabContentProps> = ({ getValue, onChange, hasRcd }) => (
  <>
    {!hasRcd && (
      <div className="flex flex-col items-center justify-center py-8 text-center bg-muted/30 rounded-lg border border-dashed border-border">
        <Shield className="h-10 w-10 text-muted-foreground mb-3" />
        <p className="text-sm text-muted-foreground mb-2">No RCD protection configured</p>
        <p className="text-xs text-muted-foreground">Set RCD type below to enable RCD fields</p>
      </div>
    )}

    {/* RCD Details */}
    <FormSection title="RCD Details">
      <FormRow>
        <FormField label="RCD BS Standard">
          <Select
            value={getValue('rcdBsStandard') as string || "na"}
            onValueChange={(v) => onChange('rcdBsStandard', v === "na" ? "" : v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="na">N/A</SelectItem>
              <SelectItem value="BS EN 61008-1">RCCB</SelectItem>
              <SelectItem value="BS EN 61009-1">RCBO</SelectItem>
              <SelectItem value="BS EN 62423">F Type</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="RCD Type">
          <Select
            value={getValue('rcdType') as string || "na"}
            onValueChange={(v) => onChange('rcdType', v === "na" ? "" : v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="na">N/A</SelectItem>
              <SelectItem value="AC">AC</SelectItem>
              <SelectItem value="A">A</SelectItem>
              <SelectItem value="F">F</SelectItem>
              <SelectItem value="B">B</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="IΔn (mA)">
          <Select
            value={getValue('rcdRating') as string || "na"}
            onValueChange={(v) => onChange('rcdRating', v === "na" ? "" : v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="na">N/A</SelectItem>
              <SelectItem value="30">30mA</SelectItem>
              <SelectItem value="100">100mA</SelectItem>
              <SelectItem value="300">300mA</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField label="Rating (A)">
          <Select
            value={getValue('rcdRatingA') as string || "na"}
            onValueChange={(v) => onChange('rcdRatingA', v === "na" ? "" : v)}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="N/A" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="na">N/A</SelectItem>
              {['40', '63', '80', '100'].map((v) => (
                <SelectItem key={v} value={v}>{v}A</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormField>
      </FormRow>
    </FormSection>

    {/* RCD Test Results */}
    <FormSection title="RCD Test Results">
      <FormRow>
        <FormField label="1×IΔn (ms)">
          <Input
            value={getValue('rcdOneX') as string}
            onChange={(e) => onChange('rcdOneX', e.target.value)}
            className="h-11 text-sm"
            inputMode="numeric"
            placeholder="<300"
            disabled={!hasRcd}
          />
        </FormField>
        <FormField label="5×IΔn (ms)">
          <Input
            value={getValue('rcdFiveX') as string}
            onChange={(e) => onChange('rcdFiveX', e.target.value)}
            className="h-11 text-sm"
            inputMode="numeric"
            placeholder="<40"
            disabled={!hasRcd}
          />
        </FormField>
      </FormRow>
      <FormRow>
        <FormField label="Test Button">
          <Select
            value={getValue('rcdTestButton') as string}
            onValueChange={(v) => onChange('rcdTestButton', v)}
            disabled={!hasRcd}
          >
            <SelectTrigger className="h-11 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="✓">✓ Pass</SelectItem>
              <SelectItem value="✗">✗ Fail</SelectItem>
              <SelectItem value="N/A">N/A</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <div />
      </FormRow>
    </FormSection>
  </>
);

/**
 * Remarks Tab Content
 */
const RemarksTabContent: React.FC<TabContentProps> = ({ getValue, onChange }) => (
  <>
    <FormSection title="Notes & Observations">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground font-medium">Circuit Notes</Label>
        <textarea
          value={getValue('notes') as string}
          onChange={(e) => onChange('notes', e.target.value)}
          className="w-full h-32 px-3 py-2 text-sm rounded-md border border-border bg-background resize-none"
          placeholder="Enter any remarks, vulnerable equipment info, T3 SPD info, etc."
        />
      </div>
    </FormSection>

    <FormSection title="Limitations">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground font-medium">Testing Limitations</Label>
        <textarea
          value={getValue('limitations') as string}
          onChange={(e) => onChange('limitations', e.target.value)}
          className="w-full h-24 px-3 py-2 text-sm rounded-md border border-border bg-background resize-none"
          placeholder="Note any limitations that applied to testing this circuit..."
        />
      </div>
    </FormSection>

    <FormSection title="Observations">
      <div className="space-y-1.5">
        <Label className="text-xs text-muted-foreground font-medium">Defect Observations</Label>
        <textarea
          value={getValue('observations') as string}
          onChange={(e) => onChange('observations', e.target.value)}
          className="w-full h-24 px-3 py-2 text-sm rounded-md border border-border bg-background resize-none"
          placeholder="Record any defects or observations for this circuit..."
        />
      </div>
    </FormSection>
  </>
);

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
