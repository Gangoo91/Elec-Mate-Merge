import React, { useState, useCallback, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { cn } from '@/lib/utils';
import ChargerAutocomplete from './ChargerAutocomplete';
import { EVSectionHeader } from './EVSectionHeader';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import {
  EVCharger,
  calculateCurrentFromPower,
  calculatePowerFromCurrent,
} from '@/data/evChargerDatabase';
import { getVehicleMakes, getVehicleModels, findVehicle } from '@/data/evVehicleDatabase';
import { useEVChargingSmartForm } from '@/hooks/inspection/useEVChargingSmartForm';
import { inputCn, cardCn, labelCn } from '@/components/forms/fieldStyles';

interface EVChargingInstallationDetailsProps {
  formData: Record<string, unknown>;
  onUpdate: (field: string, value: unknown) => void;
  customerId?: string;
  onCustomerIdChange?: (id: string | undefined) => void;
}




const pickerTriggerCn =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

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
      'h-11 rounded-xl px-3 text-sm transition-all touch-manipulation active:scale-[0.98] flex-1',
      isActive
        ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
        : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
    )}
  >
    {label}
  </button>
);

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
    <div className="py-4 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Client Details */}
      <div className={cardCn}>
        <EVSectionHeader title="Client Details" />

        {/* Client Selection */}
        {selectedCustomer ? (
          <div className="flex items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.06] p-3">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white">{selectedCustomer.name}</p>
              <p className="text-sm text-white/85 truncate">
                {[selectedCustomer.email, selectedCustomer.phone].filter(Boolean).join(' · ')}
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => handleCustomerSelect(null)}
              className="h-11 px-3 text-sm font-medium text-white touch-manipulation shrink-0"
            >
              Change
            </Button>
          </div>
        ) : (
          <ClientSelector
            onSelectCustomer={handleCustomerSelect}
            selectedCustomerId={customerId}
          />
        )}

        <div>
          <Label htmlFor="clientName" className={labelCn}>Client Name *</Label>
          <Input
            id="clientName"
            placeholder="Enter client name"
            value={formData.clientName || ''}
            onChange={(e) => onUpdate('clientName', e.target.value)}
            className={inputCn}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="clientTelephone" className={labelCn}>Telephone</Label>
            <Input
              id="clientTelephone"
              type="tel"
              placeholder="Contact number"
              value={formData.clientTelephone || ''}
              onChange={(e) => onUpdate('clientTelephone', e.target.value)}
              className={inputCn}
            />
          </div>
          <div>
            <Label htmlFor="clientEmail" className={labelCn}>Email</Label>
            <Input
              id="clientEmail"
              type="email"
              placeholder="Email address"
              value={formData.clientEmail || ''}
              onChange={(e) => onUpdate('clientEmail', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="clientAddress" className={labelCn}>Address</Label>
          <Input
            id="clientAddress"
            placeholder="Full address"
            value={formData.clientAddress || ''}
            onChange={(e) => onUpdate('clientAddress', e.target.value)}
            className={inputCn}
          />
        </div>
      </div>

      {/* Vehicle Details (Optional) */}
      <div className={cardCn}>
        <EVSectionHeader title="Vehicle Details (Optional)" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="vehicleMake" className={labelCn}>Vehicle Make</Label>
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
              triggerClassName={pickerTriggerCn}
            />
            {formData.vehicleMake === '__other' && (
              <Input
                placeholder="Enter make"
                value={formData.vehicleMakeCustom || ''}
                onChange={(e) => {
                  onUpdate('vehicleMakeCustom', e.target.value);
                  onUpdate('vehicleMake', e.target.value || '__other');
                }}
                className={cn(inputCn, 'mt-2')}
              />
            )}
          </div>
          <div>
            <Label htmlFor="vehicleModel" className={labelCn}>Vehicle Model</Label>
            {formData.vehicleMake &&
            formData.vehicleMake !== '__other' &&
            getVehicleModels(formData.vehicleMake as string).length > 0 ? (
              <MobileSelectPicker
                value={(formData.vehicleModel as string) || ''}
                onValueChange={(value) => onUpdate('vehicleModel', value)}
                options={getVehicleModels(formData.vehicleMake as string).map((model) => ({ value: model, label: model }))}
                placeholder="Select model"
                title="Vehicle Model"
                triggerClassName={pickerTriggerCn}
              />
            ) : (
              <Input
                id="vehicleModel"
                placeholder="e.g. Model 3, iX3"
                value={(formData.vehicleModel as string) || ''}
                onChange={(e) => onUpdate('vehicleModel', e.target.value)}
                className={inputCn}
              />
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="vehicleRegistration" className={labelCn}>Registration</Label>
          <Input
            id="vehicleRegistration"
            placeholder="e.g. AB12 CDE"
            value={formData.vehicleRegistration || ''}
            onChange={(e) => onUpdate('vehicleRegistration', e.target.value)}
            className={cn(inputCn, 'uppercase')}
          />
        </div>
      </div>

      {/* Installation Details */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <EVSectionHeader title="Installation Details" />

        {/* Same as client address */}
        <label className="flex min-h-11 items-center gap-3 cursor-pointer touch-manipulation">
          <Checkbox
            id="sameAsClientAddress"
            checked={formData.sameAsClientAddress || false}
            onCheckedChange={handleSameAddressChange}
            className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
          />
          <span className="text-sm text-white">Same as client address</span>
        </label>

        <div>
          <Label htmlFor="installationAddress" className={labelCn}>Installation Address *</Label>
          <Input
            id="installationAddress"
            placeholder="Full address where charger is installed"
            value={formData.installationAddress || ''}
            onChange={(e) => onUpdate('installationAddress', e.target.value)}
            disabled={formData.sameAsClientAddress}
            className={cn(inputCn, formData.sameAsClientAddress && 'opacity-50 cursor-not-allowed')}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Installation Type</Label>
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
            <Label htmlFor="installationDate" className={labelCn}>Installation Date *</Label>
            <Input
              id="installationDate"
              type="date"
              value={formData.installationDate || ''}
              onChange={(e) => onUpdate('installationDate', e.target.value)}
              className={inputCn}
            />
          </div>
        </div>
      </div>

      {/* Charger Details */}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <EVSectionHeader title="Charger Details" />

        {/* Charger Search */}
        <div>
          <Label className={labelCn}>Search Charger Database</Label>
          <ChargerAutocomplete
            value={{ make: formData.chargerMake || '', model: formData.chargerModel || '' }}
            onChange={handleChargerSelect}
          />
        </div>

        {/* Manual entry fallback for make/model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="chargerMake" className={labelCn}>Make</Label>
            <Input
              id="chargerMake"
              placeholder="e.g. Myenergi"
              value={formData.chargerMake || ''}
              onChange={(e) => {
                onUpdate('chargerMake', e.target.value);
                setChargerAutoFilled(false);
              }}
              className={inputCn}
            />
          </div>
          <div>
            <Label htmlFor="chargerModel" className={labelCn}>Model</Label>
            <Input
              id="chargerModel"
              placeholder="e.g. Zappi V2.1"
              value={formData.chargerModel || ''}
              onChange={(e) => {
                onUpdate('chargerModel', e.target.value);
                setChargerAutoFilled(false);
              }}
              className={inputCn}
            />
          </div>
        </div>
        <div>
          <Label htmlFor="chargerSerial" className={labelCn}>Serial Number</Label>
          <Input
            id="chargerSerial"
            placeholder="Serial number"
            value={formData.chargerSerial || ''}
            onChange={(e) => onUpdate('chargerSerial', e.target.value)}
            className={inputCn}
          />
        </div>

        {/* Charging Mode - toggle buttons */}
        <div>
          <Label className={labelCn}>Charging Mode</Label>
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

        {/* Connection and Phases - toggle buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label className={labelCn}>Connection</Label>
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
            <Label className={labelCn}>Phases</Label>
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
          <Label className={labelCn}>Socket Type</Label>
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
            <div className="rounded-xl border border-white/[0.12] bg-white/[0.06] px-3.5 py-3">
              <p className="text-sm text-white">
                <span className="font-semibold">Note:</span> Vehicle uses {vc} connector but charger socket is {chargerSocket}. Verify compatibility.
              </p>
            </div>
          );
        })()}

        {/* Power and Current with bidirectional sync */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <Label htmlFor="powerRating" className={labelCn}>Power (kW)</Label>
            <Input
              id="powerRating"
              type="number"
              step="0.1"
              placeholder="e.g. 7.4"
              value={formData.powerRating ?? ''}
              onChange={(e) =>
                handlePowerChange(
                  e.target.value === '' ? 0 : parseFloat(e.target.value) || 0
                )
              }
              className={inputCn}
            />
            <p className="text-[11px] text-white/85 mt-1">
              {formData.phases === 3 ? 'P = √3 × 400V × I' : 'P = 230V × I'}
            </p>
          </div>
          <div>
            <Label htmlFor="ratedCurrent" className={labelCn}>Current (A)</Label>
            <Input
              id="ratedCurrent"
              type="number"
              placeholder="e.g. 32"
              value={formData.ratedCurrent ?? ''}
              onChange={(e) =>
                handleCurrentChange(
                  e.target.value === '' ? 0 : parseInt(e.target.value) || 0
                )
              }
              className={inputCn}
            />
            <p className="text-[11px] text-white/85 mt-1">
              {formData.phases === 3 ? 'I = P / (√3 × 400V)' : 'I = P / 230V'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVChargingInstallationDetails;
