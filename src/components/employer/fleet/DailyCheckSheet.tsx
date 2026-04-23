import { useState, useRef, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  ClipboardCheck,
  Check,
  AlertTriangle,
  Loader2,
  History,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SignatureCanvas from 'react-signature-canvas';
import {
  useVehicleChecks,
  useLatestCheck,
  useHasCheckedToday,
  useCreateCheck,
  useUploadDefectPhotos,
  CHECK_ITEMS,
  type CheckStatus,
} from '@/hooks/useVehicleChecks';
import type { Vehicle } from '@/hooks/useFleet';
import { supabase } from '@/integrations/supabase/client';
import {
  SheetShell,
  Field,
  FormCard,
  Pill,
  PrimaryButton,
  SecondaryButton,
  Eyebrow,
  Dot,
  checkboxClass,
  fieldLabelClass,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';

interface DailyCheckSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

type ViewMode = 'check' | 'history';

export function DailyCheckSheet({ open, onOpenChange, vehicle }: DailyCheckSheetProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('check');
  const [checkState, setCheckState] = useState<Record<string, boolean>>({});
  const [mileage, setMileage] = useState(vehicle.mileage?.toString() || '');
  const [defectsFound, setDefectsFound] = useState(false);
  const [defectDetails, setDefectDetails] = useState('');
  const [notes, setNotes] = useState('');
  const sigRef = useRef<SignatureCanvas>(null);

  const { data: checks = [] } = useVehicleChecks(vehicle.id);
  const { data: latestCheck } = useLatestCheck(vehicle.id);
  const { data: hasCheckedToday } = useHasCheckedToday(vehicle.id);
  const createCheck = useCreateCheck();
  const uploadPhotos = useUploadDefectPhotos();

  // Initialize check state with all items checked by default
  const initializeCheckState = () => {
    const state: Record<string, boolean> = {};
    Object.values(CHECK_ITEMS)
      .flat()
      .forEach((item) => {
        state[item.key] = true;
      });
    state['dashboard_warnings'] = false; // This one is inverted (false = no warnings = good)
    return state;
  };

  useEffect(() => {
    setCheckState(initializeCheckState());
  }, []);

  const handleCheckChange = (key: string, checked: boolean) => {
    setCheckState((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSubmit = async () => {
    let signatureUrl: string | undefined;

    // Upload signature if drawn
    if (sigRef.current && !sigRef.current.isEmpty()) {
      const dataUrl = sigRef.current.toDataURL('image/png');
      const blob = await fetch(dataUrl).then((r) => r.blob());
      const file = new File([blob], 'signature.png', { type: 'image/png' });

      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const fileName = `vehicle-check-signatures/${user.id}/${vehicle.id}/${Date.now()}.png`;
        const { data, error } = await supabase.storage
          .from('visual-uploads')
          .upload(fileName, file);

        if (!error && data) {
          const { data: urlData } = supabase.storage.from('visual-uploads').getPublicUrl(data.path);
          signatureUrl = urlData.publicUrl;
        }
      }
    }

    createCheck.mutate(
      {
        vehicle_id: vehicle.id,
        check_date: new Date().toISOString().split('T')[0],
        check_time: new Date().toTimeString().split(' ')[0].slice(0, 5),
        mileage: mileage ? parseInt(mileage) : undefined,
        tyres_ok: checkState.tyres_ok ?? true,
        lights_ok: checkState.lights_ok ?? true,
        mirrors_ok: checkState.mirrors_ok ?? true,
        bodywork_ok: checkState.bodywork_ok ?? true,
        windscreen_ok: checkState.windscreen_ok ?? true,
        wipers_ok: checkState.wipers_ok ?? true,
        registration_visible: checkState.registration_visible ?? true,
        oil_level_ok: checkState.oil_level_ok ?? true,
        coolant_ok: checkState.coolant_ok ?? true,
        washer_fluid_ok: checkState.washer_fluid_ok ?? true,
        horn_ok: checkState.horn_ok ?? true,
        seatbelt_ok: checkState.seatbelt_ok ?? true,
        dashboard_warnings: checkState.dashboard_warnings ?? false,
        first_aid_kit: checkState.first_aid_kit ?? true,
        fire_extinguisher: checkState.fire_extinguisher ?? true,
        defects_found: defectsFound,
        defect_details: defectDetails || undefined,
        signature_url: signatureUrl,
        notes: notes || undefined,
        status: 'pass', // Will be calculated by the hook
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          // Reset form
          setCheckState(initializeCheckState());
          setDefectsFound(false);
          setDefectDetails('');
          setNotes('');
          sigRef.current?.clear();
        },
      }
    );
  };

  const getStatusPill = (status: CheckStatus) => {
    switch (status) {
      case 'pass':
        return <Pill tone="green">Pass</Pill>;
      case 'minor_defects':
        return <Pill tone="amber">Minor defects</Pill>;
      case 'major_defects':
        return <Pill tone="orange">Major defects</Pill>;
      case 'fail':
        return <Pill tone="red">Fail</Pill>;
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Daily check"
          title={
            <span className="inline-flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-green-400" />
              Daily Vehicle Check
            </span>
          }
          description={`${vehicle.registration} — ${vehicle.make} ${vehicle.model}`}
          footer={
            viewMode === 'check' ? (
              <>
                <SecondaryButton fullWidth onClick={() => onOpenChange(false)} disabled={createCheck.isPending}>
                  Cancel
                </SecondaryButton>
                <PrimaryButton fullWidth onClick={handleSubmit} disabled={createCheck.isPending}>
                  {createCheck.isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Check className="h-5 w-5 mr-2" />
                      Complete check
                    </>
                  )}
                </PrimaryButton>
              </>
            ) : undefined
          }
        >
          {/* Tab Toggle */}
          <div className="flex gap-1 p-1 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full">
            <button
              type="button"
              onClick={() => setViewMode('check')}
              className={cn(
                'flex-1 py-2 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                viewMode === 'check' ? 'bg-elec-yellow text-black' : 'text-white'
              )}
            >
              New check
            </button>
            <button
              type="button"
              onClick={() => setViewMode('history')}
              className={cn(
                'flex-1 py-2 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                viewMode === 'history' ? 'bg-elec-yellow text-black' : 'text-white'
              )}
            >
              History ({checks.length})
            </button>
          </div>

          {viewMode === 'check' ? (
            <>
              {/* Already Checked Today Alert */}
              {hasCheckedToday && (
                <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-400" />
                    <span className="text-sm text-white">
                      Vehicle checked today at {latestCheck?.check_time?.slice(0, 5)}
                    </span>
                  </div>
                </div>
              )}

              <FormCard eyebrow="Mileage">
                <Field label="Current mileage">
                  <Input
                    type="number"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="e.g. 45000"
                    className={inputClass}
                  />
                </Field>
              </FormCard>

              {/* Exterior Checks */}
              <FormCard eyebrow="Exterior checks">
                <div className="flex items-center gap-2 mb-1">
                  <Dot tone="blue" />
                  <span className="text-[11.5px] text-white">Walk-around</span>
                </div>
                <div className="space-y-2">
                  {CHECK_ITEMS.exterior.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] touch-manipulation min-h-[52px]"
                    >
                      <Checkbox
                        checked={checkState[item.key] ?? true}
                        onCheckedChange={(checked) =>
                          handleCheckChange(item.key, checked as boolean)
                        }
                        className={checkboxClass}
                      />
                      <span className="text-[13px] text-white">{item.label}</span>
                    </label>
                  ))}
                </div>
              </FormCard>

              {/* Fluid Checks */}
              <FormCard eyebrow="Fluid levels">
                <div className="flex items-center gap-2 mb-1">
                  <Dot tone="purple" />
                  <span className="text-[11.5px] text-white">Under the bonnet</span>
                </div>
                <div className="space-y-2">
                  {CHECK_ITEMS.fluids.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] touch-manipulation min-h-[52px]"
                    >
                      <Checkbox
                        checked={checkState[item.key] ?? true}
                        onCheckedChange={(checked) =>
                          handleCheckChange(item.key, checked as boolean)
                        }
                        className={checkboxClass}
                      />
                      <span className="text-[13px] text-white">{item.label}</span>
                    </label>
                  ))}
                </div>
              </FormCard>

              {/* Interior Checks */}
              <FormCard eyebrow="Interior & safety">
                <div className="flex items-center gap-2 mb-1">
                  <Dot tone="orange" />
                  <span className="text-[11.5px] text-white">Cab</span>
                </div>
                <div className="space-y-2">
                  {CHECK_ITEMS.interior.map((item) => (
                    <label
                      key={item.key}
                      className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] touch-manipulation min-h-[52px]"
                    >
                      <Checkbox
                        checked={
                          checkState[item.key] ??
                          (item.key === 'dashboard_warnings' ? false : true)
                        }
                        onCheckedChange={(checked) =>
                          handleCheckChange(item.key, checked as boolean)
                        }
                        className={checkboxClass}
                      />
                      <span className="text-[13px] text-white">{item.label}</span>
                    </label>
                  ))}
                </div>
              </FormCard>

              {/* Defects Section */}
              <FormCard eyebrow="Defects">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-[hsl(0_0%_9%)] touch-manipulation min-h-[52px]">
                  <Checkbox
                    checked={defectsFound}
                    onCheckedChange={(checked) => setDefectsFound(checked as boolean)}
                    className={checkboxClass}
                  />
                  <span className="text-[13px] text-white">Defects found</span>
                </label>

                {defectsFound && (
                  <Field label="Details">
                    <Textarea
                      value={defectDetails}
                      onChange={(e) => setDefectDetails(e.target.value)}
                      placeholder="Describe defects found..."
                      className={textareaClass}
                    />
                  </Field>
                )}
              </FormCard>

              <FormCard eyebrow="Notes">
                <Field label="Additional notes">
                  <Textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any other observations..."
                    className={textareaClass}
                  />
                </Field>
              </FormCard>

              {/* Signature */}
              <FormCard eyebrow="Signature">
                <label className={fieldLabelClass}>Sign to confirm</label>
                <div className="border border-white/[0.08] rounded-xl bg-white overflow-hidden touch-manipulation">
                  <SignatureCanvas
                    ref={sigRef}
                    canvasProps={{
                      className: 'w-full h-32',
                      style: { width: '100%', height: '128px' },
                    }}
                    backgroundColor="white"
                  />
                </div>
                <SecondaryButton size="sm" onClick={() => sigRef.current?.clear()}>
                  Clear signature
                </SecondaryButton>
              </FormCard>
            </>
          ) : (
            <>
              {checks.length === 0 ? (
                <div className="text-center py-12">
                  <History className="h-16 w-16 text-white mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-white">No checks recorded yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {checks.map((check) => (
                    <div
                      key={check.id}
                      className={cn(
                        'p-4 rounded-2xl border bg-[hsl(0_0%_12%)] touch-manipulation',
                        check.status === 'fail' || check.status === 'major_defects'
                          ? 'border-red-500/30'
                          : check.status === 'minor_defects'
                            ? 'border-yellow-500/30'
                            : 'border-white/[0.06]'
                      )}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-semibold text-white text-base">
                            {new Date(check.check_date).toLocaleDateString('en-GB', {
                              weekday: 'short',
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                          <p className="text-sm text-white">
                            {check.check_time?.slice(0, 5)}
                            {check.driver?.name && ` • ${check.driver.name}`}
                          </p>
                        </div>
                        {getStatusPill(check.status)}
                      </div>

                      {check.mileage && (
                        <p className="text-sm text-white mb-1">
                          Mileage: {check.mileage.toLocaleString()}
                        </p>
                      )}

                      {check.defects_found && check.defect_details && (
                        <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                          <p className="text-sm text-red-400">
                            <AlertTriangle className="h-4 w-4 inline mr-1.5" />
                            {check.defect_details}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
