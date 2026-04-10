import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Plus, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import LuminaireAutocomplete from './LuminaireAutocomplete';
import BulkLuminaireActions from './BulkLuminaireActions';
import { AutoFilledBadge } from './ValidationBadge';
import type { EmergencyLuminaire } from '@/data/emergencyLuminaireDatabase';
import type { EmergencyLightingFormData, Luminaire } from '@/types/emergency-lighting';

interface Props {
  formData: EmergencyLightingFormData;
  onUpdate: (
    field: string,
    value: EmergencyLightingFormData[keyof EmergencyLightingFormData]
  ) => void;
}

const inputCn =
  'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const pickerTrigger =
  'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

const SectionHeader = ({ title, badge }: { title: string; badge?: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider flex items-center gap-2">
      {title}
      {badge && (
        <span className="text-[10px] font-bold text-elec-yellow bg-elec-yellow/10 border border-elec-yellow/20 px-2 py-0.5 rounded">
          {badge}
        </span>
      )}
    </h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">
      {title}
    </p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}</Label>
    {children}
  </div>
);

const EmergencyLightingLuminaireSchedule: React.FC<Props> = ({ formData, onUpdate }) => {
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
    onUpdate('luminaires', [...(formData.luminaires || []), createEmptyLuminaire()]);
  };

  const addMultipleLuminaires = useCallback(
    (count: number) => {
      const newLuminaires = Array.from({ length: count }, (_, i) => ({
        ...createEmptyLuminaire(),
        id: `lum-${Date.now()}-${i}-${Math.random().toString(36).substring(2, 6)}`,
      }));
      onUpdate('luminaires', [...(formData.luminaires || []), ...newLuminaires]);
    },
    [formData.luminaires, onUpdate]
  );

  const cloneLuminaire = useCallback(
    (luminaire: Luminaire) => {
      const cloned = {
        ...luminaire,
        id: `lum-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        location: `${luminaire.location} (copy)`,
        functionalTestResult: '',
        durationTestResult: '',
      };
      onUpdate('luminaires', [...(formData.luminaires || []), cloned]);
    },
    [formData.luminaires, onUpdate]
  );

  const markAllPass = useCallback(() => {
    onUpdate(
      'luminaires',
      (formData.luminaires || []).map((lum: Luminaire) => ({
        ...lum,
        functionalTestResult: 'pass' as const,
      }))
    );
  }, [formData.luminaires, onUpdate]);

  const markAllDurationPass = useCallback(() => {
    onUpdate(
      'luminaires',
      (formData.luminaires || []).map((lum: Luminaire) => ({
        ...lum,
        durationTestResult: 'pass' as const,
      }))
    );
  }, [formData.luminaires, onUpdate]);

  const applyDatabaseLuminaire = useCallback(
    (id: string, dbLuminaire: EmergencyLuminaire) => {
      const defaults = applyLuminaireDefaults(dbLuminaire);
      onUpdate(
        'luminaires',
        (formData.luminaires || []).map((lum: Luminaire) =>
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
        )
      );
    },
    [formData.luminaires, onUpdate, applyLuminaireDefaults]
  );

  const updateLuminaire = (id: string, field: string, value: string | number | boolean) => {
    onUpdate(
      'luminaires',
      (formData.luminaires || []).map((lum: Luminaire) =>
        lum.id === id ? { ...lum, [field]: value } : lum
      )
    );
  };

  const removeLuminaire = (id: string) => {
    onUpdate(
      'luminaires',
      (formData.luminaires || []).filter((l: Luminaire) => l.id !== id)
    );
  };

  const luminaires = formData.luminaires || [];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SectionHeader title="Luminaire Schedule" badge={`${luminaires.length}`} />

        {luminaires.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm font-medium text-white">No luminaires added yet</p>
            <p className="text-[11px] text-white mt-1">
              0 / {formData.luminaireCount || '?'} expected
            </p>
            <p className="text-[10px] text-white mt-2">
              Search the database to auto-fill specs, or add manually
            </p>
            <button
              onClick={addLuminaire}
              className="mt-4 h-11 px-6 rounded-lg bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow text-xs font-semibold touch-manipulation active:scale-[0.98]"
            >
              Add First Luminaire
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {luminaires.map((luminaire: Luminaire, index: number) => (
              <div
                key={luminaire.id}
                className="rounded-xl bg-white/[0.02] border border-white/[0.06] overflow-hidden"
              >
                {/* Luminaire header */}
                <div className="flex items-center justify-between px-3 py-2 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-elec-yellow">#{index + 1}</span>
                    <span className="text-xs text-white truncate">
                      {luminaire.location || 'No location'}
                    </span>
                    {luminaire.autoFilled && <AutoFilledBadge />}
                  </div>
                  <button
                    onClick={() => removeLuminaire(luminaire.id)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 touch-manipulation"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>

                <div className="p-3 space-y-3">
                  {/* Database search */}
                  <LuminaireAutocomplete
                    value={
                      luminaire.manufacturer && luminaire.model
                        ? { make: luminaire.manufacturer, model: luminaire.model }
                        : null
                    }
                    onSelect={(dbLuminaire) => applyDatabaseLuminaire(luminaire.id, dbLuminaire)}
                    placeholder="Search Ansell, Thorn, Eaton..."
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Location *">
                      <Input
                        value={luminaire.location || ''}
                        onChange={(e) => updateLuminaire(luminaire.id, 'location', e.target.value)}
                        className={inputCn}
                        placeholder="Ground floor corridor"
                      />
                    </Field>
                    <Field label="Type">
                      <MobileSelectPicker
                        value={luminaire.luminaireType || ''}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'luminaireType', v);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        options={[
                          { value: 'bulkhead', label: 'Bulkhead' },
                          { value: 'twin-spot', label: 'Twin Spot' },
                          { value: 'recessed', label: 'Recessed' },
                          { value: 'surface', label: 'Surface Mount' },
                          { value: 'downlight', label: 'Downlight' },
                          { value: 'exit-sign', label: 'Exit Sign' },
                          { value: 'exit-box', label: 'Exit Box' },
                          { value: 'strip', label: 'Strip Light' },
                        ]}
                        placeholder="Select..."
                        triggerClassName={pickerTrigger}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Manufacturer">
                      <Input
                        value={luminaire.manufacturer || ''}
                        onChange={(e) => {
                          updateLuminaire(luminaire.id, 'manufacturer', e.target.value);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        className={inputCn}
                        placeholder="Ansell, Thorn"
                      />
                    </Field>
                    <Field label="Model">
                      <Input
                        value={luminaire.model || ''}
                        onChange={(e) => {
                          updateLuminaire(luminaire.id, 'model', e.target.value);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        className={inputCn}
                      />
                    </Field>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Category">
                      <MobileSelectPicker
                        value={luminaire.category || 'escape-route'}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'category', v);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        options={[
                          { value: 'escape-route', label: 'Escape Route' },
                          { value: 'open-area', label: 'Open Area' },
                          { value: 'high-risk', label: 'High Risk' },
                          { value: 'standby', label: 'Standby' },
                        ]}
                        placeholder="Select..."
                        triggerClassName={pickerTrigger}
                      />
                    </Field>
                    <Field label="Wattage (W)">
                      <Input
                        type="number"
                        min="0"
                        step="0.1"
                        value={luminaire.wattage || ''}
                        onChange={(e) => {
                          updateLuminaire(luminaire.id, 'wattage', parseFloat(e.target.value) || 0);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        className={inputCn}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Duration">
                      <MobileSelectPicker
                        value={luminaire.ratedDuration?.toString() || '180'}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'ratedDuration', parseInt(v));
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        options={[
                          { value: '60', label: '1 Hour (60 min)' },
                          { value: '180', label: '3 Hours (180 min)' },
                        ]}
                        placeholder="Select..."
                        triggerClassName={pickerTrigger}
                      />
                    </Field>
                    <Field label="Battery">
                      <MobileSelectPicker
                        value={luminaire.batteryType || ''}
                        onValueChange={(v) => {
                          updateLuminaire(luminaire.id, 'batteryType', v);
                          updateLuminaire(luminaire.id, 'autoFilled', false);
                        }}
                        options={[
                          { value: 'NiCd', label: 'NiCd' },
                          { value: 'NiMH', label: 'NiMH' },
                          { value: 'LiFePO4', label: 'LiFePO4' },
                          { value: 'Li-ion', label: 'Li-ion' },
                          { value: 'central', label: 'Central' },
                        ]}
                        placeholder="Select..."
                        triggerClassName={pickerTrigger}
                      />
                    </Field>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <Field label="Install Date">
                      <Input
                        type="date"
                        value={luminaire.installDate || ''}
                        onChange={(e) =>
                          updateLuminaire(luminaire.id, 'installDate', e.target.value)
                        }
                        className={inputCn}
                      />
                    </Field>
                    <Field label="Notes">
                      <Input
                        value={luminaire.notes || ''}
                        onChange={(e) => updateLuminaire(luminaire.id, 'notes', e.target.value)}
                        className={inputCn}
                        placeholder="Any notes"
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add buttons */}
        <button
          onClick={addLuminaire}
          className="w-full h-11 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center text-sm text-white touch-manipulation active:scale-[0.98]"
        >
          Add Luminaire
        </button>

        <BulkLuminaireActions
          luminaires={luminaires}
          onAddLuminaires={addMultipleLuminaires}
          onCloneLuminaire={cloneLuminaire}
          onMarkAllPass={markAllPass}
          onMarkAllDurationPass={markAllDurationPass}
        />
      </div>
    </div>
  );
};

export default EmergencyLightingLuminaireSchedule;
