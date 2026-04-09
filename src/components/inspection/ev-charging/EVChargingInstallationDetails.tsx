import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import ChargerAutocomplete from './ChargerAutocomplete';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import {
  EVCharger,
  calculateCurrentFromPower,
  calculatePowerFromCurrent,
} from '@/data/evChargerDatabase';
import { getVehicleMakes, getVehicleModels, findVehicle } from '@/data/evVehicleDatabase';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingInstallationDetailsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const ToggleButton = ({
  label,
  isActive,
  onClick,
}: {
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'h-10 rounded-lg font-semibold transition-all touch-manipulation text-xs active:scale-[0.98] flex-1',
      isActive
        ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow'
        : 'bg-white/[0.05] border border-white/[0.08] text-white'
    )}
  >
    {label}
  </button>
);

const inputClass = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const labelClass = 'text-white text-xs mb-1.5 block';
const textareaClass = 'text-base touch-manipulation min-h-[80px] bg-white/[0.06] border-white/[0.08]';

const EVChargingInstallationDetails: React.FC<EVChargingInstallationDetailsProps> = ({
  formData,
  onUpdate,
  customerId,
  onCustomerIdChange,
}) => {
  const { applyChargerDefaults, powerToCurrent, currentToPower } = useEVChargingSmartForm();

  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Track if power/current was auto-filled from charger selection
  const [chargerAutoFilled, setChargerAutoFilled] = useState(false);

  // Handle customer selection from ClientSelector
  const handleCustomerSelect = useCallback(
    (customer: Customer | null) => {
      if (customer) {
        setSelectedCustomer(customer);
        onCustomerIdChange?.(customer.id);
        onUpdate('clientName', customer.name);
        if (customer.phone) onUpdate('clientTelephone', customer.phone);
        if (customer.email) onUpdate('clientEmail', customer.email);
        if (customer.address) onUpdate('clientAddress', customer.address);
      } else {
        setSelectedCustomer(null);
        onCustomerIdChange?.(undefined);
      }
    },
    [onUpdate, onCustomerIdChange]
  );

  // Handle charger selection from autocomplete
  const handleChargerSelect = useCallback(
    (charger: EVCharger | null) => {
      if (charger) {
        const defaults = applyChargerDefaults(charger);
        // Apply all charger defaults
        Object.entries(defaults).forEach(([field, value]) => {
          onUpdate(field, value);
        });
        setChargerAutoFilled(true);
      } else {
        // Clear charger fields when deselected
        onUpdate('chargerMake', '');
        onUpdate('chargerModel', '');
        setChargerAutoFilled(false);
      }
    },
    [applyChargerDefaults, onUpdate]
  );

  // Handle "Same as client address" checkbox
  const handleSameAddressChange = (checked: boolean) => {
    onUpdate('sameAsClientAddress', checked);
    if (checked && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
  };

  // Sync installation address when client address changes and checkbox is checked
  useEffect(() => {
    if (formData.sameAsClientAddress && formData.clientAddress) {
      onUpdate('installationAddress', formData.clientAddress);
    }
  }, [formData.clientAddress, formData.sameAsClientAddress]);

  // Handle power change - auto-calculate current
  const handlePowerChange = (power: number) => {
    onUpdate('powerRating', power);
    const phases = formData.phases || 1;
    const calculatedCurrent = powerToCurrent(power, phases);
    onUpdate('ratedCurrent', calculatedCurrent);
  };

  // Handle current change - auto-calculate power
  const handleCurrentChange = (current: number) => {
    onUpdate('ratedCurrent', current);
    const phases = formData.phases || 1;
    const calculatedPower = currentToPower(current, phases);
    onUpdate('powerRating', calculatedPower);
  };

  // Handle phase change - recalculate current from power
  const handlePhasesChange = (phases: number) => {
    onUpdate('phases', phases);
    if (formData.powerRating) {
      const calculatedCurrent = powerToCurrent(formData.powerRating, phases);
      onUpdate('ratedCurrent', calculatedCurrent);
    }
  };

  return (
    <div className="space-y-6 px-4 py-4">
      {/* Client Details */}
      <div>
        <SectionHeader title="Client Details" />
        <div className="space-y-4">
          {/* Client Selection */}
          {selectedCustomer ? (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white">{selectedCustomer.name}</p>
                <p className="text-sm text-white truncate">
                  {[selectedCustomer.email, selectedCustomer.phone].filter(Boolean).join(' · ')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCustomerSelect(null)}
                className="h-9 w-9 touch-manipulation shrink-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <ClientSelector
              onSelectCustomer={handleCustomerSelect}
              selectedCustomerId={customerId}
            />
          )}

          <div>
            <Label htmlFor="clientName" className={labelClass}>Client Name *</Label>
            <Input
              id="clientName"
              placeholder="Enter client name"
              value={formData.clientName || ''}
              onChange={(e) => onUpdate('clientName', e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="clientTelephone" className={labelClass}>Telephone</Label>
              <Input
                id="clientTelephone"
                type="tel"
                placeholder="Contact number"
                value={formData.clientTelephone || ''}
                onChange={(e) => onUpdate('clientTelephone', e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <Label htmlFor="clientEmail" className={labelClass}>Email</Label>
              <Input
                id="clientEmail"
                type="email"
                placeholder="Email address"
                value={formData.clientEmail || ''}
                onChange={(e) => onUpdate('clientEmail', e.target.value)}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="clientAddress" className={labelClass}>Address</Label>
            <Input
              id="clientAddress"
              placeholder="Full address"
              value={formData.clientAddress || ''}
              onChange={(e) => onUpdate('clientAddress', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Vehicle Details (Optional) */}
      <div>
        <SectionHeader title="Vehicle Details (Optional)" />
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="vehicleMake" className={labelClass}>Vehicle Make</Label>
              <MobileSelectPicker
                value={(formData.vehicleMake as string) || ''}
                onValueChange={(value) => {
                  onUpdate('vehicleMake', value);
                  if (value !== formData.vehicleMake) {
                    onUpdate('vehicleModel', '');
                  }
                }}
                options={[
                  ...getVehicleMakes().map((make) => ({ value: make, label: make })),
                  { value: '__other', label: 'Other (type below)' },
                ]}
                placeholder="Select make"
                title="Vehicle Make"
              />
              {formData.vehicleMake === '__other' && (
                <Input
                  placeholder="Enter make"
                  value={formData.vehicleMakeCustom || ''}
                  onChange={(e) => {
                    onUpdate('vehicleMakeCustom', e.target.value);
                    onUpdate('vehicleMake', e.target.value || '__other');
                  }}
                  className={cn(inputClass, 'mt-2')}
                />
              )}
            </div>
            <div>
              <Label htmlFor="vehicleModel" className={labelClass}>Vehicle Model</Label>
              {formData.vehicleMake &&
              formData.vehicleMake !== '__other' &&
              getVehicleModels(formData.vehicleMake as string).length > 0 ? (
                <MobileSelectPicker
                  value={(formData.vehicleModel as string) || ''}
                  onValueChange={(value) => onUpdate('vehicleModel', value)}
                  options={getVehicleModels(formData.vehicleMake as string).map((model) => ({ value: model, label: model }))}
                  placeholder="Select model"
                  title="Vehicle Model"
                />
              ) : (
                <Input
                  id="vehicleModel"
                  placeholder="e.g., Model 3, iX3"
                  value={(formData.vehicleModel as string) || ''}
                  onChange={(e) => onUpdate('vehicleModel', e.target.value)}
                  className={inputClass}
                />
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="vehicleRegistration" className={labelClass}>Registration</Label>
            <Input
              id="vehicleRegistration"
              placeholder="e.g., AB12 CDE"
              value={formData.vehicleRegistration || ''}
              onChange={(e) => onUpdate('vehicleRegistration', e.target.value)}
              className={cn(inputClass, 'uppercase')}
            />
          </div>
        </div>
      </div>

      {/* Installation Details */}
      <div>
        <SectionHeader title="Installation Details" />
        <div className="space-y-4">
          {/* Same as client address */}
          <label className="flex items-center gap-3 cursor-pointer touch-manipulation">
            <Checkbox
              id="sameAsClientAddress"
              checked={formData.sameAsClientAddress || false}
              onCheckedChange={handleSameAddressChange}
              className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
            />
            <span className="text-white text-xs">Same as client address</span>
          </label>

          <div>
            <Label htmlFor="installationAddress" className={labelClass}>Installation Address *</Label>
            <Input
              id="installationAddress"
              placeholder="Full address where charger is installed"
              value={formData.installationAddress || ''}
              onChange={(e) => onUpdate('installationAddress', e.target.value)}
              disabled={formData.sameAsClientAddress}
              className={cn(inputClass, formData.sameAsClientAddress && 'opacity-50 cursor-not-allowed')}
            />
          </div>

          <div>
            <Label className={labelClass}>Installation Type</Label>
            <div className="flex gap-2">
              {[
                { value: 'domestic', label: 'Domestic' },
                { value: 'commercial', label: 'Commercial' },
                { value: 'public', label: 'Public' },
              ].map((opt) => (
                <ToggleButton
                  key={opt.value}
                  label={opt.label}
                  isActive={(formData.installationType || 'domestic') === opt.value}
                  onClick={() => onUpdate('installationType', opt.value)}
                />
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="installationDate" className={labelClass}>Installation Date *</Label>
            <Input
              id="installationDate"
              type="date"
              value={formData.installationDate || ''}
              onChange={(e) => onUpdate('installationDate', e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Charger Details */}
      <div>
        <SectionHeader title="Charger Details" />
        <div className="space-y-4">
          {/* Charger Search */}
          <div>
            <Label className={labelClass}>Search Charger Database</Label>
            <ChargerAutocomplete
              value={{ make: formData.chargerMake || '', model: formData.chargerModel || '' }}
              onChange={handleChargerSelect}
            />
          </div>

          {/* Manual entry fallback for make/model */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="chargerMake" className={labelClass}>Make</Label>
              <Input
                id="chargerMake"
                placeholder="e.g., Myenergi"
                value={formData.chargerMake || ''}
                onChange={(e) => {
                  onUpdate('chargerMake', e.target.value);
                  setChargerAutoFilled(false);
                }}
                className={inputClass}
              />
            </div>
            <div>
              <Label htmlFor="chargerModel" className={labelClass}>Model</Label>
              <Input
                id="chargerModel"
                placeholder="e.g., Zappi V2.1"
                value={formData.chargerModel || ''}
                onChange={(e) => {
                  onUpdate('chargerModel', e.target.value);
                  setChargerAutoFilled(false);
                }}
                className={inputClass}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="chargerSerial" className={labelClass}>Serial Number</Label>
            <Input
              id="chargerSerial"
              placeholder="Serial number"
              value={formData.chargerSerial || ''}
              onChange={(e) => onUpdate('chargerSerial', e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Charging Mode - toggle buttons */}
          <div>
            <Label className={labelClass}>Charging Mode</Label>
            <div className="flex gap-2">
              {[
                { value: 'Mode2', label: 'Mode 2' },
                { value: 'Mode3', label: 'Mode 3' },
                { value: 'Mode4', label: 'Mode 4' },
              ].map((opt) => (
                <ToggleButton
                  key={opt.value}
                  label={opt.label}
                  isActive={formData.chargerType === opt.value}
                  onClick={() => onUpdate('chargerType', opt.value)}
                />
              ))}
            </div>
          </div>

          {/* Connection - toggle buttons */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className={labelClass}>Connection</Label>
              <div className="flex gap-2">
                {[
                  { value: 'tethered', label: 'Tethered' },
                  { value: 'socketed', label: 'Socketed' },
                ].map((opt) => (
                  <ToggleButton
                    key={opt.value}
                    label={opt.label}
                    isActive={formData.chargerConnection === opt.value}
                    onClick={() => onUpdate('chargerConnection', opt.value)}
                  />
                ))}
              </div>
            </div>
            <div>
              <Label className={labelClass}>Phases</Label>
              <div className="flex gap-2">
                {[
                  { value: 1, label: 'Single' },
                  { value: 3, label: 'Three' },
                ].map((opt) => (
                  <ToggleButton
                    key={opt.value}
                    label={opt.label}
                    isActive={(formData.phases || 1) === opt.value}
                    onClick={() => handlePhasesChange(opt.value)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Socket Type */}
          <div>
            <Label className={labelClass}>Socket Type</Label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: 'n/a', label: 'N/A' },
                { value: 'Type 1', label: 'Type 1' },
                { value: 'Type 2', label: 'Type 2' },
                { value: 'CCS', label: 'CCS' },
                { value: 'CHAdeMO', label: 'CHAdeMO' },
              ].map((opt) => (
                <ToggleButton
                  key={opt.value}
                  label={opt.label}
                  isActive={(formData.socketType || 'Type 2') === opt.value}
                  onClick={() => onUpdate('socketType', opt.value)}
                />
              ))}
            </div>
          </div>

          {/* Connector compatibility check */}
          {formData.vehicleMake && formData.vehicleMake !== '__other' && formData.socketType && formData.socketType !== 'n/a' && (() => {
            const vehicle = findVehicle(formData.vehicleMake as string, formData.vehicleModel as string);
            if (!vehicle?.connectorType) return null;
            const chargerSocket = formData.socketType as string;
            const vc = vehicle.connectorType;
            const compatible = vc === chargerSocket || (vc === 'CCS' && chargerSocket === 'Type 2') || (chargerSocket === 'CCS' && vc === 'Type 2');
            if (compatible) return null;
            return (
              <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5">
                <p className="text-[11px] text-white">
                  <span className="font-bold">Note:</span> Vehicle uses {vc} connector but charger socket is {chargerSocket}. Verify compatibility.
                </p>
              </div>
            );
          })()}

          {/* Power and Current with bidirectional sync */}
          <div className="border-b border-white/[0.06] pb-1 mb-3 mt-4">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
            <h2 className="text-xs font-medium text-white uppercase tracking-wider">Power & Current</h2>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="powerRating" className={labelClass}>Power (kW)</Label>
              <Input
                id="powerRating"
                type="number"
                step="0.1"
                value={formData.powerRating ?? ''}
                onChange={(e) =>
                  handlePowerChange(
                    e.target.value === '' ? 0 : parseFloat(e.target.value) || 0
                  )
                }
                className={inputClass}
              />
              <p className="text-[10px] text-white mt-1">
                {formData.phases === 3 ? 'P = \u221A3 \u00D7 400V \u00D7 I' : 'P = 230V \u00D7 I'}
              </p>
            </div>
            <div>
              <Label htmlFor="ratedCurrent" className={labelClass}>Current (A)</Label>
              <Input
                id="ratedCurrent"
                type="number"
                value={formData.ratedCurrent ?? ''}
                onChange={(e) =>
                  handleCurrentChange(
                    e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                  )
                }
                className={inputClass}
              />
              <p className="text-[10px] text-white mt-1">
                {formData.phases === 3 ? 'I = P / (\u221A3 \u00D7 400V)' : 'I = P / 230V'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingInstallationDetails;
