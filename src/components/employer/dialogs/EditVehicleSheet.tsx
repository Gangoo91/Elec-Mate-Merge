import { useState, useEffect } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Trash2, Save, Loader2, Car } from 'lucide-react';
import type { Vehicle, VehicleStatus, VehicleType, UpdateVehicleInput } from '@/hooks/useFleet';

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

  // Reset form when vehicle changes
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
        className={cn(
          "flex flex-col p-0",
          isMobile ? "h-[90vh] rounded-t-2xl" : "w-[450px]"
        )}
      >
        {/* Header */}
        <SheetHeader className="p-4 border-b border-border shrink-0">
          <SheetTitle className="flex items-center gap-2">
            <Car className="h-5 w-5 text-elec-yellow" />
            Edit Vehicle
          </SheetTitle>
        </SheetHeader>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="registration">Registration *</Label>
            <Input
              id="registration"
              value={registration}
              onChange={(e) => setRegistration(e.target.value.toUpperCase())}
              placeholder="AB12 CDE"
              className="h-11 touch-manipulation"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Make</Label>
              <Input
                value={make}
                onChange={(e) => setMake(e.target.value)}
                placeholder="Ford"
                className="h-11 touch-manipulation"
              />
            </div>
            <div className="space-y-2">
              <Label>Model</Label>
              <Input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="Transit"
                className="h-11 touch-manipulation"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="space-y-2">
              <Label>Colour</Label>
              <Input
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                placeholder="White"
                className="h-11 touch-manipulation"
              />
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2022"
                className="h-11 touch-manipulation"
              />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={vehicleType} onValueChange={(v) => setVehicleType(v as VehicleType)}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  {VEHICLE_TYPES.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Assigned To</Label>
              <Input
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                placeholder="Driver name"
                className="h-11 touch-manipulation"
              />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as VehicleStatus)}>
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="z-[100]">
                  {VEHICLE_STATUSES.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Current Mileage</Label>
            <Input
              type="number"
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
              placeholder="45000"
              className="h-11 touch-manipulation"
            />
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-3">Compliance Dates</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>MOT Expiry</Label>
                <Input
                  type="date"
                  value={motExpiry}
                  onChange={(e) => setMotExpiry(e.target.value)}
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label>Tax Expiry</Label>
                <Input
                  type="date"
                  value={taxExpiry}
                  onChange={(e) => setTaxExpiry(e.target.value)}
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label>Insurance Expiry</Label>
                <Input
                  type="date"
                  value={insuranceExpiry}
                  onChange={(e) => setInsuranceExpiry(e.target.value)}
                  className="h-11 touch-manipulation"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-sm font-medium text-muted-foreground mb-3">Service Dates</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Last Service</Label>
                <Input
                  type="date"
                  value={lastService}
                  onChange={(e) => setLastService(e.target.value)}
                  className="h-11 touch-manipulation"
                />
              </div>
              <div className="space-y-2">
                <Label>Next Service</Label>
                <Input
                  type="date"
                  value={nextService}
                  onChange={(e) => setNextService(e.target.value)}
                  className="h-11 touch-manipulation"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-border">
            <div>
              <Label htmlFor="tracker">Tracker Fitted</Label>
              <p className="text-xs text-muted-foreground">GPS tracking device installed</p>
            </div>
            <Switch
              id="tracker"
              checked={trackerFitted}
              onCheckedChange={setTrackerFitted}
            />
          </div>

          <div className="space-y-2">
            <Label>Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any additional notes..."
              className="min-h-[80px] touch-manipulation"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border shrink-0 pb-safe space-y-3">
          <Button
            className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 h-11"
            onClick={handleSave}
            disabled={isSaving || !registration.trim()}
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full h-11 text-destructive hover:text-destructive hover:bg-destructive/10"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Vehicle
                  </>
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Vehicle</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete {registration}? This will also delete all associated fuel logs. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </SheetContent>
    </Sheet>
  );
}
