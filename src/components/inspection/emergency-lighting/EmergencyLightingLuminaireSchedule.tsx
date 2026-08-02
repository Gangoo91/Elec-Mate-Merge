import React, { useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { useHaptic } from '@/hooks/useHaptic';
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

// Section card — the only box on the page
const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

// Paper-form underline input
const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

const EmergencyLightingLuminaireSchedule: React.FC<Props> = ({ formData, onUpdate }) => {
  const { applyLuminaireDefaults } = useEmergencyLightingSmartForm();
  const haptic = useHaptic();

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

  // ELE-1410 — apply several fields in ONE update. Calling updateLuminaire twice
  // in a single onChange (e.g. the field + autoFilled:false) made the second
  // call overwrite the first, because both were built from the same stale
  // formData.luminaires closure — so typing into Manufacturer/Model/etc. never
  // stuck. Set both in a single map instead.
  const updateLuminaireFields = (
    id: string,
    patch: Record<string, string | number | boolean>
  ) => {
    onUpdate(
      'luminaires',
      (formData.luminaires || []).map((lum: Luminaire) =>
        lum.id === id ? { ...lum, ...patch } : lum
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
    <div
      className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4"
      // Delegated press haptic — every chip/button tap in this tab buzzes
      // without wiring each onClick individually.
      onPointerDown={(e) => {
        if ((e.target as HTMLElement).closest('button')) haptic.light();
      }}
    >
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">
            Luminaire schedule
          </h2>
          <span className="text-[13px] font-semibold text-elec-yellow">{luminaires.length}</span>
        </div>

        {luminaires.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm font-medium text-white">No luminaires added yet</p>
            <p className="text-xs text-white/80 mt-1">
              0 / {formData.luminaireCount || '?'} expected
            </p>
            <p className="text-xs text-white/80 mt-2">
              Search the database to auto-fill specs, or add manually
            </p>
            <button
              type="button"
              onClick={addLuminaire}
              className="mt-4 h-11 px-6 rounded-xl bg-elec-yellow text-black text-sm font-semibold touch-manipulation active:scale-[0.98]"
            >
              Add first luminaire
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {luminaires.map((luminaire: Luminaire, index: number) => (
              <div key={luminaire.id} className="border-t border-white/[0.08] pt-4 space-y-4">
                {/* Luminaire heading row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-[13px] font-semibold text-elec-yellow">
                      #{index + 1}
                    </span>
                    <span className="text-[13px] font-medium text-white truncate">
                      {luminaire.location || 'No location'}
                    </span>
                    {luminaire.autoFilled && <AutoFilledBadge />}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLuminaire(luminaire.id)}
                    className="h-11 shrink-0 px-2 text-sm font-medium text-red-400 touch-manipulation"
                  >
                    Remove
                  </button>
                </div>

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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
                      onValueChange={(v) =>
                        updateLuminaireFields(luminaire.id, {
                          luminaireType: v,
                          autoFilled: false,
                        })
                      }
                      options={[
                        { value: 'bulkhead', label: 'Bulkhead' },
                        { value: 'twin-spot', label: 'Twin spot' },
                        { value: 'recessed', label: 'Recessed' },
                        { value: 'surface', label: 'Surface mount' },
                        { value: 'downlight', label: 'Downlight' },
                        { value: 'exit-sign', label: 'Exit sign' },
                        { value: 'exit-box', label: 'Exit box' },
                        { value: 'strip', label: 'Strip light' },
                      ]}
                      placeholder="Select..."
                      triggerClassName={pickerTrigger}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Manufacturer">
                    <Input
                      value={luminaire.manufacturer || ''}
                      onChange={(e) =>
                        updateLuminaireFields(luminaire.id, {
                          manufacturer: e.target.value,
                          autoFilled: false,
                        })
                      }
                      className={inputCn}
                      placeholder="Ansell, Thorn"
                    />
                  </Field>
                  <Field label="Model">
                    <Input
                      value={luminaire.model || ''}
                      onChange={(e) =>
                        updateLuminaireFields(luminaire.id, {
                          model: e.target.value,
                          autoFilled: false,
                        })
                      }
                      className={inputCn}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Category">
                    <MobileSelectPicker
                      value={luminaire.category || 'escape-route'}
                      onValueChange={(v) =>
                        updateLuminaireFields(luminaire.id, {
                          category: v,
                          autoFilled: false,
                        })
                      }
                      options={[
                        { value: 'escape-route', label: 'Escape route' },
                        { value: 'open-area', label: 'Open area' },
                        { value: 'high-risk', label: 'High risk' },
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
                      onChange={(e) =>
                        updateLuminaireFields(luminaire.id, {
                          wattage: parseFloat(e.target.value) || 0,
                          autoFilled: false,
                        })
                      }
                      className={inputCn}
                    />
                  </Field>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Duration">
                    <MobileSelectPicker
                      value={luminaire.ratedDuration?.toString() || '180'}
                      onValueChange={(v) =>
                        updateLuminaireFields(luminaire.id, {
                          ratedDuration: parseInt(v),
                          autoFilled: false,
                        })
                      }
                      options={[
                        { value: '60', label: '1 hour (60 min)' },
                        { value: '180', label: '3 hours (180 min)' },
                      ]}
                      placeholder="Select..."
                      triggerClassName={pickerTrigger}
                    />
                  </Field>
                  <Field label="Battery">
                    <MobileSelectPicker
                      value={luminaire.batteryType || ''}
                      onValueChange={(v) =>
                        updateLuminaireFields(luminaire.id, {
                          batteryType: v,
                          autoFilled: false,
                        })
                      }
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Install date">
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
            ))}
          </div>
        )}

        {/* Add buttons */}
        <button
          type="button"
          onClick={addLuminaire}
          className="w-full h-11 rounded-xl border border-dashed border-white/[0.25] flex items-center justify-center text-sm font-medium text-white touch-manipulation active:scale-[0.98]"
        >
          Add luminaire
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
