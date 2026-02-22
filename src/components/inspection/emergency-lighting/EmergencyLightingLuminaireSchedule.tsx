import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Lightbulb, Plus, Trash2, Copy, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import LuminaireAutocomplete from './LuminaireAutocomplete';
import BulkLuminaireActions from './BulkLuminaireActions';
import { AutoFilledBadge } from './ValidationBadge';
import type { EmergencyLuminaire } from '@/data/emergencyLuminaireDatabase';
import type { EmergencyLightingFormData, Luminaire } from '@/types/emergency-lighting';

interface EmergencyLightingLuminaireScheduleProps {
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
}

const EmergencyLightingLuminaireSchedule: React.FC<EmergencyLightingLuminaireScheduleProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { applyLuminaireDefaults } = useEmergencyLightingSmartForm();

  const createEmptyLuminaire = () => ({
    id: `lum-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    location: '',
    luminaireType: '',
    manufacturer: '',
    model: '',
    wattage: 0,
    batteryType: '',
    category: 'escape-route' as const,
    ratedDuration: 180,
    installDate: '',
    functionalTestResult: '' as const,
    durationTestResult: '' as const,
    notes: '',
    autoFilled: false,
  });

  const addLuminaire = () => {
    const luminaires = formData.luminaires || [];
    onUpdate('luminaires', [...luminaires, createEmptyLuminaire()]);
  };

  const addMultipleLuminaires = useCallback(
    (count: number) => {
      const luminaires = formData.luminaires || [];
      const newLuminaires = Array.from({ length: count }, (_, i) => ({
        ...createEmptyLuminaire(),
        id: `lum-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      }));
      onUpdate('luminaires', [...luminaires, ...newLuminaires]);
    },
    [formData.luminaires, onUpdate]
  );

  const cloneLuminaire = useCallback(
    (luminaire: Luminaire) => {
      const luminaires = formData.luminaires || [];
      const cloned = {
        ...luminaire,
        id: `lum-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        location: `${luminaire.location} (copy)`,
        functionalTestResult: '',
        durationTestResult: '',
      };
      onUpdate('luminaires', [...luminaires, cloned]);
    },
    [formData.luminaires, onUpdate]
  );

  const markAllPass = useCallback(() => {
    const luminaires = formData.luminaires || [];
    const updated = luminaires.map((lum: Luminaire) => ({
      ...lum,
      functionalTestResult: 'pass' as const,
    }));
    onUpdate('luminaires', updated);
  }, [formData.luminaires, onUpdate]);

  const markAllDurationPass = useCallback(() => {
    const luminaires = formData.luminaires || [];
    const updated = luminaires.map((lum: Luminaire) => ({
      ...lum,
      durationTestResult: 'pass' as const,
    }));
    onUpdate('luminaires', updated);
  }, [formData.luminaires, onUpdate]);

  const applyDatabaseLuminaire = useCallback(
    (id: string, dbLuminaire: EmergencyLuminaire) => {
      const defaults = applyLuminaireDefaults(dbLuminaire);
      const luminaires = formData.luminaires || [];
      const updated = luminaires.map((lum: Luminaire) =>
        lum.id === id
          ? {
              ...lum,
              manufacturer: defaults.make,
              model: defaults.model,
              luminaireType: defaults.luminaireType,
              category: defaults.category,
              wattage: defaults.wattage,
              batteryType: defaults.batteryType,
              ratedDuration: defaults.ratedDuration,
              autoFilled: true,
            }
          : lum
      );
      onUpdate('luminaires', updated);
    },
    [formData.luminaires, onUpdate, applyLuminaireDefaults]
  );

  const updateLuminaire = (id: string, field: string, value: string | number | boolean) => {
    const luminaires = formData.luminaires || [];
    const updatedLuminaires = luminaires.map((lum: Luminaire) =>
      lum.id === id ? { ...lum, [field]: value } : lum
    );
    onUpdate('luminaires', updatedLuminaires);
  };

  const removeLuminaire = (id: string) => {
    const luminaires = formData.luminaires || [];
    onUpdate(
      'luminaires',
      luminaires.filter((l: Luminaire) => l.id !== id)
    );
  };

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-6')}>
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        {/* Header */}
        {isMobile ? (
          <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
            <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
              <Lightbulb className="h-5 w-5 text-amber-400" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <h3 className="font-semibold text-foreground">Luminaire Schedule</h3>
              <span className="text-xs text-white">
                {(formData.luminaires || []).length} luminaires added
              </span>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between py-4 px-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                <Lightbulb className="h-4 w-4 text-amber-400" />
              </div>
              <span className="text-white font-semibold">Luminaire Schedule</span>
            </div>
            <span className="text-sm font-normal text-white">
              {(formData.luminaires || []).length} luminaires
            </span>
          </div>
        )}

        {/* Content */}
        <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
          {(formData.luminaires || []).length === 0 ? (
            <div className="text-center py-8 text-white">
              <Lightbulb className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p className="font-medium text-base">No luminaires added yet</p>
              <p className="text-sm mt-1">0 / {formData.luminaireCount || '?'} expected</p>
              <p className="text-sm mt-3">
                Search the database to auto-fill specs, or add manually.
              </p>
              <Button
                variant="outline"
                className="mt-4 h-11 touch-manipulation border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
                onClick={addLuminaire}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Add First Luminaire
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {(formData.luminaires || []).map((luminaire: Luminaire, index: number) => (
                <div key={luminaire.id} className="bg-muted/30 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium flex items-center gap-2">
                      <Lightbulb className="h-4 w-4 text-amber-500" />
                      Luminaire #{index + 1}
                      {luminaire.autoFilled && <AutoFilledBadge />}
                    </h4>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => cloneLuminaire(luminaire)}
                        className="h-11 w-11 p-0 text-white hover:text-white hover:bg-white/10 touch-manipulation"
                        title="Clone luminaire"
                        aria-label="Clone luminaire"
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeLuminaire(luminaire.id)}
                        className="h-11 w-11 p-0 text-red-500 hover:text-red-600 hover:bg-red-500/10 touch-manipulation"
                        aria-label="Delete luminaire"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Luminaire Database Search */}
                  <div className="mb-3">
                    <Label className="text-sm flex items-center gap-1 mb-2">
                      <Sparkles className="h-3 w-3 text-elec-yellow" />
                      Quick Select from Database
                    </Label>
                    <LuminaireAutocomplete
                      value={
                        luminaire.manufacturer && luminaire.model
                          ? { make: luminaire.manufacturer, model: luminaire.model }
                          : null
                      }
                      onSelect={(dbLuminaire) => applyDatabaseLuminaire(luminaire.id, dbLuminaire)}
                      placeholder="Search Ansell, Thorn, Eaton..."
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    <div className="col-span-full sm:col-span-1 space-y-2">
                      <Label htmlFor={`lum-location-${luminaire.id}`} className="text-sm">
                        Location *
                      </Label>
                      <Input
                        id={`lum-location-${luminaire.id}`}
                        placeholder="e.g., Ground floor corridor"
                        value={luminaire.location || ''}
                        onChange={(e) => updateLuminaire(luminaire.id, 'location', e.target.value)}
                        className="h-11 text-sm touch-manipulation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-type-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Type
                        {luminaire.autoFilled && luminaire.luminaireType && <AutoFilledBadge />}
                      </Label>
                      <Select
                        value={luminaire.luminaireType || ''}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'luminaireType', v);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                      >
                        <SelectTrigger
                          id={`lum-type-${luminaire.id}`}
                          className="h-11 touch-manipulation"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="bulkhead">Bulkhead</SelectItem>
                          <SelectItem value="twin-spot">Twin Spot</SelectItem>
                          <SelectItem value="recessed">Recessed</SelectItem>
                          <SelectItem value="surface">Surface Mount</SelectItem>
                          <SelectItem value="downlight">Downlight</SelectItem>
                          <SelectItem value="exit-sign">Exit Sign</SelectItem>
                          <SelectItem value="exit-box">Exit Box</SelectItem>
                          <SelectItem value="strip">Strip Light</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-category-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Category
                        {luminaire.autoFilled && luminaire.category && <AutoFilledBadge />}
                      </Label>
                      <Select
                        value={luminaire.category || 'escape-route'}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'category', v);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                      >
                        <SelectTrigger
                          id={`lum-category-${luminaire.id}`}
                          className="h-11 touch-manipulation"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="escape-route">Escape Route</SelectItem>
                          <SelectItem value="open-area">Open Area (Anti-panic)</SelectItem>
                          <SelectItem value="high-risk">High Risk Task Area</SelectItem>
                          <SelectItem value="standby">Standby</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-manufacturer-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Manufacturer
                        {luminaire.autoFilled && luminaire.manufacturer && <AutoFilledBadge />}
                      </Label>
                      <Input
                        id={`lum-manufacturer-${luminaire.id}`}
                        placeholder="e.g., Ansell, Thorn"
                        value={luminaire.manufacturer || ''}
                        onChange={(e) => {
                          updateLuminaire(luminaire.id, 'manufacturer', e.target.value);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        className="h-11 text-sm touch-manipulation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-model-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Model
                        {luminaire.autoFilled && luminaire.model && <AutoFilledBadge />}
                      </Label>
                      <Input
                        id={`lum-model-${luminaire.id}`}
                        placeholder="Model number"
                        value={luminaire.model || ''}
                        onChange={(e) => {
                          updateLuminaire(luminaire.id, 'model', e.target.value);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        className="h-11 text-sm touch-manipulation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-wattage-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Wattage (W)
                        {luminaire.autoFilled && luminaire.wattage > 0 && <AutoFilledBadge />}
                      </Label>
                      <Input
                        id={`lum-wattage-${luminaire.id}`}
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="e.g., 3"
                        value={luminaire.wattage || ''}
                        onChange={(e) => {
                          updateLuminaire(luminaire.id, 'wattage', parseFloat(e.target.value) || 0);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        className="h-11 text-sm touch-manipulation"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-battery-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Battery Type
                        {luminaire.autoFilled && luminaire.batteryType && <AutoFilledBadge />}
                      </Label>
                      <Select
                        value={luminaire.batteryType || ''}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'batteryType', v);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                      >
                        <SelectTrigger
                          id={`lum-battery-${luminaire.id}`}
                          className="h-11 touch-manipulation"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NiCd">NiCd (Nickel Cadmium)</SelectItem>
                          <SelectItem value="NiMH">NiMH (Nickel Metal Hydride)</SelectItem>
                          <SelectItem value="LiFePO4">LiFePO4 (Lithium)</SelectItem>
                          <SelectItem value="Li-ion">Li-ion</SelectItem>
                          <SelectItem value="central">Central Battery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor={`lum-duration-${luminaire.id}`}
                        className="text-sm flex items-center gap-1"
                      >
                        Rated Duration
                        {luminaire.autoFilled && <AutoFilledBadge />}
                      </Label>
                      <Select
                        value={luminaire.ratedDuration?.toString() || '180'}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'ratedDuration', parseInt(v));
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                      >
                        <SelectTrigger
                          id={`lum-duration-${luminaire.id}`}
                          className="h-11 touch-manipulation"
                        >
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 Hour</SelectItem>
                          <SelectItem value="180">3 Hours</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button
            variant="outline"
            className="w-full h-11 touch-manipulation border-dashed border-white/30"
            onClick={addLuminaire}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Single Luminaire
          </Button>

          {/* Bulk Actions */}
          <BulkLuminaireActions
            luminaires={formData.luminaires || []}
            onAddLuminaires={addMultipleLuminaires}
            onCloneLuminaire={cloneLuminaire}
            onMarkAllPass={markAllPass}
            onMarkAllDurationPass={markAllDurationPass}
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyLightingLuminaireSchedule;
