import { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trash2, Save, Loader2 } from 'lucide-react';
import type { Vehicle, VehicleStatus, VehicleType, UpdateVehicleInput } from '@/hooks/useFleet';
import {
  SheetShell,
  FormCard,
  FormGrid,
  Field,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  fieldLabelClass,
} from '@/components/employer/editorial';

const VEHICLE_STATUSES: VehicleStatus[] = ['Active', 'Available', 'Maintenance', 'Off Road'];
const VEHICLE_TYPES: VehicleType[] = ['Van', 'Truck', 'Car', 'Pickup'];

interface EditVehicleSheetProps {
  vehicle: Vehicle | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (id: string, updates: UpdateVehicleInput) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  isSaving?: boolean;
  isDeleting?: boolean;
}

export function EditVehicleSheet({
  vehicle,
  open,
  onOpenChange,
  onSave,
  onDelete,
  isSaving,
  isDeleting,
}: EditVehicleSheetProps) {
  const isMobile = useIsMobile();

  const [registration, setRegistration] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [colour, setColour] = useState('');
  const [year, setYear] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType | ''>('');
  const [assignedTo, setAssignedTo] = useState('');
  const [status, setStatus] = useState<VehicleStatus>('Active');
  const [mileage, setMileage] = useState('');
  const [motExpiry, setMotExpiry] = useState('');
  const [taxExpiry, setTaxExpiry] = useState('');
  const [insuranceExpiry, setInsuranceExpiry] = useState('');
  const [lastService, setLastService] = useState('');
  const [nextService, setNextService] = useState('');
  const [trackerFitted, setTrackerFitted] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (vehicle) {
      setRegistration(vehicle.registration);
      setMake(vehicle.make || '');
      setModel(vehicle.model || '');
      setColour(vehicle.colour || '');
      setYear(vehicle.year?.toString() || '');
      setVehicleType(vehicle.vehicle_type || '');
      setAssignedTo(vehicle.assigned_to || '');
      setStatus(vehicle.status);
      setMileage(vehicle.mileage?.toString() || '0');
      setMotExpiry(vehicle.mot_expiry || '');
      setTaxExpiry(vehicle.tax_expiry || '');
      setInsuranceExpiry(vehicle.insurance_expiry || '');
      setLastService(vehicle.last_service || '');
      setNextService(vehicle.next_service || '');
      setTrackerFitted(vehicle.tracker_fitted);
      setNotes(vehicle.notes || '');
    }
  }, [vehicle]);

  if (!vehicle) return null;

  const handleSave = async () => {
    await onSave(vehicle.id, {
      registration: registration.toUpperCase(),
      make: make || undefined,
      model: model || undefined,
      colour: colour || undefined,
      year: year ? parseInt(year) : undefined,
      vehicle_type: vehicleType || undefined,
      assigned_to: assignedTo || undefined,
      status,
      mileage: parseInt(mileage) || 0,
      mot_expiry: motExpiry || undefined,
      tax_expiry: taxExpiry || undefined,
      insurance_expiry: insuranceExpiry || undefined,
      last_service: lastService || undefined,
      next_service: nextService || undefined,
      tracker_fitted: trackerFitted,
      notes: notes || undefined,
    });
    onOpenChange(false);
  };

  const handleDelete = async () => {
    await onDelete(vehicle.id);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={isMobile ? 'bottom' : 'right'}
        className={cn('p-0 overflow-hidden', isMobile ? 'h-[90vh]' : 'w-[480px]')}
      >
        <SheetShell
          eyebrow="Fleet"
          title="Edit vehicle"
          description="Update registration, compliance, and service details."
          footer={
            <>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <DestructiveButton disabled={isDeleting}>
                    {isDeleting ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </DestructiveButton>
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.08]">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-white">Delete vehicle</AlertDialogTitle>
                    <AlertDialogDescription className="text-white">
                      Are you sure you want to delete {registration}? This will also delete all
                      associated fuel logs. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="bg-white/[0.06] text-white border-white/[0.1] hover:bg-white/[0.1]">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              <SecondaryButton onClick={() => onOpenChange(false)} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton
                onClick={handleSave}
                disabled={isSaving || !registration.trim()}
                fullWidth
              >
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-1.5" />
                    Save
                  </>
                )}
              </PrimaryButton>
            </>
          }
        >
          <FormCard eyebrow="Vehicle">
            <Field label="Registration" required>
              <Input
                value={registration}
                onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                placeholder="AB12 CDE"
                className={inputClass}
              />
            </Field>
            <FormGrid cols={2}>
              <Field label="Make">
                <Input
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  placeholder="Ford"
                  className={inputClass}
                />
              </Field>
              <Field label="Model">
                <Input
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Transit"
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <FormGrid cols={3}>
              <Field label="Colour">
                <Input
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
                  placeholder="White"
                  className={inputClass}
                />
              </Field>
              <Field label="Year">
                <Input
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="2022"
                  className={inputClass}
                />
              </Field>
              <Field label="Type">
                <Select value={vehicleType} onValueChange={(v) => setVehicleType(v as VehicleType)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {VEHICLE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <FormGrid cols={2}>
              <Field label="Assigned to">
                <Input
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Driver name"
                  className={inputClass}
                />
              </Field>
              <Field label="Status">
                <Select value={status} onValueChange={(v) => setStatus(v as VehicleStatus)}>
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    {VEHICLE_STATUSES.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            </FormGrid>
            <Field label="Current mileage">
              <Input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="45000"
                className={inputClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Compliance dates">
            <FormGrid cols={2}>
              <Field label="MOT expiry">
                <Input
                  type="date"
                  value={motExpiry}
                  onChange={(e) => setMotExpiry(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Tax expiry">
                <Input
                  type="date"
                  value={taxExpiry}
                  onChange={(e) => setTaxExpiry(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
            <Field label="Insurance expiry">
              <Input
                type="date"
                value={insuranceExpiry}
                onChange={(e) => setInsuranceExpiry(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>

          <FormCard eyebrow="Service dates">
            <FormGrid cols={2}>
              <Field label="Last service">
                <Input
                  type="date"
                  value={lastService}
                  onChange={(e) => setLastService(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Next service">
                <Input
                  type="date"
                  value={nextService}
                  onChange={(e) => setNextService(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormGrid>
          </FormCard>

          <FormCard eyebrow="Tracker & notes">
            <div className="flex items-center justify-between py-1">
              <div>
                <label className={fieldLabelClass}>Tracker fitted</label>
                <p className="text-[11px] text-white">GPS tracking device installed</p>
              </div>
              <Switch checked={trackerFitted} onCheckedChange={setTrackerFitted} />
            </div>
            <Field label="Notes">
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any additional notes..."
                className={`${textareaClass} min-h-[80px]`}
              />
            </Field>
          </FormCard>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
