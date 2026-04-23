import { useState, useCallback, useMemo } from 'react';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  IconButton,
  Divider,
  PrimaryButton,
  SecondaryButton,
  FormCard,
  FormGrid,
  Field,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  useVehicles,
  useFuelLogs,
  useFleetStats,
  useCreateVehicle,
  useCreateFuelLog,
  useDeleteVehicle,
  useUpdateVehicle,
  type Vehicle,
  type VehicleStatus,
  type UpdateVehicleInput,
} from '@/hooks/useFleet';
import { EditVehicleSheet } from '@/components/employer/dialogs/EditVehicleSheet';
import { VehicleToolsSheet } from '@/components/employer/fleet/VehicleToolsSheet';
import { VehicleDocumentsSheet } from '@/components/employer/fleet/VehicleDocumentsSheet';
import { DailyCheckSheet } from '@/components/employer/fleet/DailyCheckSheet';
import { ServiceHistorySheet } from '@/components/employer/fleet/ServiceHistorySheet';
import { RefreshCw, Loader2, AlertTriangle } from 'lucide-react';

type FilterValue = 'all' | 'active' | 'maintenance' | 'off_road';

const filterTabs: { value: FilterValue; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'off_road', label: 'Off road' },
];

const statusToTone = (status: VehicleStatus): Tone => {
  switch (status) {
    case 'Active':
      return 'emerald';
    case 'Available':
      return 'blue';
    case 'Maintenance':
      return 'amber';
    case 'Off Road':
      return 'red';
    default:
      return 'yellow';
  }
};

const formatDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const formatShortDate = (dateStr?: string) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

const expiryTone = (dateStr?: string): Tone => {
  if (!dateStr) return 'yellow';
  const days = Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86400000);
  if (days < 0) return 'red';
  if (days <= 30) return 'orange';
  return 'emerald';
};

export function FleetSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterValue>('all');
  const [showNewVehicle, setShowNewVehicle] = useState(false);
  const [showNewFuel, setShowNewFuel] = useState(false);

  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [showEditSheet, setShowEditSheet] = useState(false);

  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showToolsSheet, setShowToolsSheet] = useState(false);
  const [showDocumentsSheet, setShowDocumentsSheet] = useState(false);
  const [showCheckSheet, setShowCheckSheet] = useState(false);
  const [showServiceSheet, setShowServiceSheet] = useState(false);

  const [registration, setRegistration] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [colour, setColour] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [motExpiry, setMotExpiry] = useState('');
  const [taxExpiry, setTaxExpiry] = useState('');

  const [fuelVehicleId, setFuelVehicleId] = useState('');
  const [fuelDate, setFuelDate] = useState(new Date().toISOString().split('T')[0]);
  const [litres, setLitres] = useState('');
  const [cost, setCost] = useState('');
  const [fuelMileage, setFuelMileage] = useState('');
  const [fuelLocation, setFuelLocation] = useState('');

  const { data: vehicles, isLoading: vehiclesLoading, error, refetch } = useVehicles();
  const { data: fuelLogs, isLoading: fuelLoading } = useFuelLogs();
  const { data: stats } = useFleetStats();
  const createVehicle = useCreateVehicle();
  const createFuelLog = useCreateFuelLog();
  const deleteVehicle = useDeleteVehicle();
  const updateVehicle = useUpdateVehicle();

  const isLoading = vehiclesLoading || fuelLoading;

  const filteredVehicles = useMemo(() => {
    const list = vehicles ?? [];
    return list
      .filter((v) => {
        if (filter === 'all') return true;
        if (filter === 'active') return v.status === 'Active' || v.status === 'Available';
        if (filter === 'maintenance') return v.status === 'Maintenance';
        if (filter === 'off_road') return v.status === 'Off Road';
        return true;
      })
      .filter((v) => {
        const q = searchQuery.toLowerCase().trim();
        if (!q) return true;
        return (
          v.registration.toLowerCase().includes(q) ||
          v.assigned_to?.toLowerCase().includes(q) ||
          v.make?.toLowerCase().includes(q) ||
          v.model?.toLowerCase().includes(q)
        );
      });
  }, [vehicles, filter, searchQuery]);

  const checksToday = 0;
  const servicesDue = useMemo(() => {
    if (!vehicles) return 0;
    const cutoff = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
    return vehicles.filter((v) => v.next_service && v.next_service <= cutoff).length;
  }, [vehicles]);

  const handleCreateVehicle = async () => {
    if (!registration) return;
    await createVehicle.mutateAsync({
      registration: registration.toUpperCase(),
      make: make || undefined,
      model: model || undefined,
      colour: colour || undefined,
      assigned_to: assignedTo || undefined,
      mot_expiry: motExpiry || undefined,
      tax_expiry: taxExpiry || undefined,
      mileage: 0,
      status: 'Active',
      tracker_fitted: false,
    });
    setRegistration('');
    setMake('');
    setModel('');
    setColour('');
    setAssignedTo('');
    setMotExpiry('');
    setTaxExpiry('');
    setShowNewVehicle(false);
  };

  const handleCreateFuelLog = async () => {
    if (!fuelVehicleId || !fuelDate) return;
    await createFuelLog.mutateAsync({
      vehicle_id: fuelVehicleId,
      date: fuelDate,
      litres: litres ? parseFloat(litres) : undefined,
      cost: cost ? parseFloat(cost) : undefined,
      mileage: fuelMileage ? parseInt(fuelMileage) : undefined,
      location: fuelLocation || undefined,
    });
    setFuelVehicleId('');
    setFuelDate(new Date().toISOString().split('T')[0]);
    setLitres('');
    setCost('');
    setFuelMileage('');
    setFuelLocation('');
    setShowNewFuel(false);
  };

  const handleDelete = async (id: string) => {
    await deleteVehicle.mutateAsync(id);
    setShowDetail(false);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setShowEditSheet(true);
  };

  const handleUpdateVehicle = async (id: string, updates: UpdateVehicleInput) => {
    await updateVehicle.mutateAsync({ id, ...updates });
  };

  const openDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetail(true);
  };

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  if (error) {
    return (
      <PageFrame>
        <EmptyState
          title="Couldn't load fleet"
          description="Something went wrong loading your vehicles. Tap retry to try again."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setShowNewVehicle(true)}>Add vehicle</PrimaryButton>
      <SecondaryButton onClick={() => setShowNewFuel(true)}>Log fuel</SecondaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh fleet">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Fleet"
        description="Vehicles, daily checks, services and tools."
        tone="blue"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Fleet', value: isLoading ? '—' : (stats?.total ?? vehicles?.length ?? 0) },
          {
            label: 'MOT due 30d',
            value: isLoading ? '—' : (stats?.motDue ?? 0),
            tone: 'orange',
          },
          { label: 'Services due', value: isLoading ? '—' : servicesDue, tone: 'amber' },
          { label: 'Checks today', value: isLoading ? '—' : checksToday, tone: 'emerald' },
        ]}
      />

      <FilterBar
        tabs={filterTabs}
        activeTab={filter}
        onTabChange={(v) => setFilter(v as FilterValue)}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search registration, driver, make…"
      />

      {isLoading ? (
        <LoadingBlocks />
      ) : filteredVehicles.length === 0 ? (
        <EmptyState
          title={vehicles && vehicles.length > 0 ? 'No vehicles match' : 'No vehicles yet'}
          description={
            vehicles && vehicles.length > 0
              ? 'Try a different filter or clear the search.'
              : 'Add your first vehicle to start tracking MOT, services and tools.'
          }
          action={vehicles && vehicles.length > 0 ? 'Clear filters' : 'Add vehicle'}
          onAction={() => {
            if (vehicles && vehicles.length > 0) {
              setFilter('all');
              setSearchQuery('');
            } else {
              setShowNewVehicle(true);
            }
          }}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Vehicles"
            meta={<Pill tone="blue">{filteredVehicles.length}</Pill>}
          />
          <ListBody>
            {filteredVehicles.map((v) => {
              const motLabel = v.mot_expiry ? `MOT ${formatShortDate(v.mot_expiry)}` : 'MOT —';
              const subtitle = [
                v.assigned_to || 'Unassigned',
                `${v.mileage.toLocaleString()} mi`,
                motLabel,
              ].join(' · ');
              const makeModel = [v.make, v.model].filter(Boolean).join(' ') || 'Vehicle';
              return (
                <ListRow
                  key={v.id}
                  title={`${v.registration} — ${makeModel}`}
                  subtitle={subtitle}
                  trailing={
                    <>
                      {v.mot_expiry && (
                        <Pill tone={expiryTone(v.mot_expiry)}>
                          {expiryTone(v.mot_expiry) === 'red' ? 'MOT expired' : 'MOT'}
                        </Pill>
                      )}
                      <Pill tone={statusToTone(v.status)}>{v.status}</Pill>
                    </>
                  }
                  onClick={() => openDetail(v)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      {!isLoading && fuelLogs && fuelLogs.length > 0 && (
        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Recent fuel logs"
            meta={<Pill tone="amber">{fuelLogs.length}</Pill>}
          />
          <ListBody>
            {fuelLogs.slice(0, 6).map((log) => (
              <ListRow
                key={log.id}
                title={log.vehicle?.registration || 'Unknown vehicle'}
                subtitle={[
                  log.location || 'No location',
                  log.litres ? `${log.litres} L` : null,
                  log.mileage ? `${log.mileage.toLocaleString()} mi` : null,
                  formatDate(log.date),
                ]
                  .filter(Boolean)
                  .join(' · ')}
                trailing={
                  log.cost ? (
                    <span className="text-[13px] font-semibold text-white tabular-nums">
                      £{log.cost.toFixed(2)}
                    </span>
                  ) : undefined
                }
              />
            ))}
          </ListBody>
        </ListCard>
      )}

      <Sheet open={showNewVehicle} onOpenChange={setShowNewVehicle}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <SheetHeader className="p-5 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-[15px] font-semibold">Add vehicle</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
            <div className="space-y-2">
              <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                Registration *
              </Label>
              <Input
                placeholder="AB12 CDE"
                value={registration}
                onChange={(e) => setRegistration(e.target.value.toUpperCase())}
className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Make</Label>
                <Input
                  placeholder="Ford"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Model</Label>
                <Input
                  placeholder="Transit"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Colour</Label>
                <Input
                  placeholder="White"
                  value={colour}
                  onChange={(e) => setColour(e.target.value)}
  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Assigned to
                </Label>
                <Input
                  placeholder="Driver name"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
  className={inputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  MOT expiry
                </Label>
                <Input
                  type="date"
                  value={motExpiry}
                  onChange={(e) => setMotExpiry(e.target.value)}
  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Tax expiry
                </Label>
                <Input
                  type="date"
                  value={taxExpiry}
                  onChange={(e) => setTaxExpiry(e.target.value)}
  className={inputClass}
                />
              </div>
            </div>
          </div>
          <div className="p-5 border-t border-white/[0.06] flex gap-3">
            <SecondaryButton onClick={() => setShowNewVehicle(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleCreateVehicle}
              disabled={!registration || createVehicle.isPending}
              fullWidth
            >
              {createVehicle.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Add vehicle'
              )}
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showNewFuel} onOpenChange={setShowNewFuel}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          <SheetHeader className="p-5 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-[15px] font-semibold">Log fuel</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
            <div className="space-y-2">
              <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                Vehicle *
              </Label>
              <Select value={fuelVehicleId} onValueChange={setFuelVehicleId}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select vehicle…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {vehicles?.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.registration} — {v.make} {v.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Date *</Label>
              <Input
                type="date"
                value={fuelDate}
                onChange={(e) => setFuelDate(e.target.value)}
className={inputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Litres</Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="45.5"
                  value={litres}
                  onChange={(e) => setLitres(e.target.value)}
  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Cost (£)
                </Label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="75.00"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
  className={inputClass}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                Current mileage
              </Label>
              <Input
                type="number"
                placeholder="45000"
                value={fuelMileage}
                onChange={(e) => setFuelMileage(e.target.value)}
className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-white text-[12px] uppercase tracking-[0.14em]">Location</Label>
              <Input
                placeholder="BP Garage, High Street"
                value={fuelLocation}
                onChange={(e) => setFuelLocation(e.target.value)}
className={inputClass}
              />
            </div>
          </div>
          <div className="p-5 border-t border-white/[0.06] flex gap-3">
            <SecondaryButton onClick={() => setShowNewFuel(false)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleCreateFuelLog}
              disabled={!fuelVehicleId || !fuelDate || createFuelLog.isPending}
              fullWidth
            >
              {createFuelLog.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Log fuel'
              )}
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showDetail} onOpenChange={setShowDetail}>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {selectedVehicle && (
            <>
              <SheetHeader className="p-5 border-b border-white/[0.06]">
                <SheetTitle className="text-white text-[15px] font-semibold flex items-center gap-3">
                  <span>{selectedVehicle.registration}</span>
                  <Pill tone={statusToTone(selectedVehicle.status)}>
                    {selectedVehicle.status}
                  </Pill>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    {[selectedVehicle.make, selectedVehicle.model].filter(Boolean).join(' ') ||
                      'Vehicle'}
                  </div>
                  <div className="mt-2 text-[13px] text-white">
                    {selectedVehicle.assigned_to || 'Unassigned'}
                    {selectedVehicle.colour && ` · ${selectedVehicle.colour}`}
                  </div>
                </div>

                <StatStrip
                  columns={2}
                  stats={[
                    { label: 'Mileage', value: selectedVehicle.mileage.toLocaleString() },
                    {
                      label: 'Tracker',
                      value: selectedVehicle.tracker_fitted ? 'Fitted' : 'None',
                      tone: selectedVehicle.tracker_fitted ? 'emerald' : 'amber',
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="orange" title="Schedule" />
                  <ListBody>
                    <ListRow
                      title="MOT expiry"
                      subtitle={formatDate(selectedVehicle.mot_expiry)}
                      trailing={
                        selectedVehicle.mot_expiry ? (
                          <Pill tone={expiryTone(selectedVehicle.mot_expiry)}>
                            {expiryTone(selectedVehicle.mot_expiry) === 'red'
                              ? 'Expired'
                              : expiryTone(selectedVehicle.mot_expiry) === 'orange'
                                ? 'Due soon'
                                : 'OK'}
                          </Pill>
                        ) : (
                          <Pill tone="yellow">Not set</Pill>
                        )
                      }
                    />
                    <ListRow
                      title="Tax expiry"
                      subtitle={formatDate(selectedVehicle.tax_expiry)}
                      trailing={
                        selectedVehicle.tax_expiry ? (
                          <Pill tone={expiryTone(selectedVehicle.tax_expiry)}>
                            {expiryTone(selectedVehicle.tax_expiry) === 'red'
                              ? 'Expired'
                              : expiryTone(selectedVehicle.tax_expiry) === 'orange'
                                ? 'Due soon'
                                : 'OK'}
                          </Pill>
                        ) : (
                          <Pill tone="yellow">Not set</Pill>
                        )
                      }
                    />
                    <ListRow
                      title="Insurance expiry"
                      subtitle={formatDate(selectedVehicle.insurance_expiry)}
                      trailing={
                        selectedVehicle.insurance_expiry ? (
                          <Pill tone={expiryTone(selectedVehicle.insurance_expiry)}>
                            {expiryTone(selectedVehicle.insurance_expiry) === 'red'
                              ? 'Expired'
                              : expiryTone(selectedVehicle.insurance_expiry) === 'orange'
                                ? 'Due soon'
                                : 'OK'}
                          </Pill>
                        ) : (
                          <Pill tone="yellow">Not set</Pill>
                        )
                      }
                    />
                    <ListRow
                      title="Last service"
                      subtitle={formatDate(selectedVehicle.last_service)}
                    />
                    <ListRow
                      title="Next service"
                      subtitle={formatDate(selectedVehicle.next_service)}
                      trailing={
                        selectedVehicle.next_service ? (
                          <Pill tone={expiryTone(selectedVehicle.next_service)}>
                            {expiryTone(selectedVehicle.next_service) === 'red'
                              ? 'Overdue'
                              : expiryTone(selectedVehicle.next_service) === 'orange'
                                ? 'Due soon'
                                : 'OK'}
                          </Pill>
                        ) : undefined
                      }
                    />
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="purple" title="Records" />
                  <ListBody>
                    <ListRow
                      title="Daily check"
                      subtitle="Run today's pre-journey inspection"
                      onClick={() => {
                        setShowDetail(false);
                        setShowCheckSheet(true);
                      }}
                    />
                    <ListRow
                      title="Service history"
                      subtitle="View and add service records"
                      onClick={() => {
                        setShowDetail(false);
                        setShowServiceSheet(true);
                      }}
                    />
                    <ListRow
                      title="Tools assigned"
                      subtitle="Inventory carried in this vehicle"
                      onClick={() => {
                        setShowDetail(false);
                        setShowToolsSheet(true);
                      }}
                    />
                    <ListRow
                      title="Documents"
                      subtitle="V5C, insurance certificate, MOT pass"
                      onClick={() => {
                        setShowDetail(false);
                        setShowDocumentsSheet(true);
                      }}
                    />
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="amber" title="Quick actions" />
                  <ListBody>
                    <ListRow
                      title="Log fuel"
                      subtitle="Record litres, cost and mileage"
                      onClick={() => {
                        setFuelVehicleId(selectedVehicle.id);
                        setShowDetail(false);
                        setShowNewFuel(true);
                      }}
                    />
                    <ListRow
                      title="Edit vehicle"
                      subtitle="Update details, assignment, status"
                      onClick={() => {
                        setShowDetail(false);
                        handleEditVehicle(selectedVehicle);
                      }}
                    />
                  </ListBody>
                </ListCard>

                <Divider />

                <SecondaryButton
                  onClick={() => handleDelete(selectedVehicle.id)}
                  disabled={deleteVehicle.isPending}
                  fullWidth
                >
                  {deleteVehicle.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Remove vehicle
                    </>
                  )}
                </SecondaryButton>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <EditVehicleSheet
        vehicle={editVehicle}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={handleUpdateVehicle}
        onDelete={handleDelete}
        isSaving={updateVehicle.isPending}
        isDeleting={deleteVehicle.isPending}
      />

      {selectedVehicle && (
        <VehicleToolsSheet
          open={showToolsSheet}
          onOpenChange={setShowToolsSheet}
          vehicle={selectedVehicle}
        />
      )}

      {selectedVehicle && (
        <VehicleDocumentsSheet
          open={showDocumentsSheet}
          onOpenChange={setShowDocumentsSheet}
          vehicle={selectedVehicle}
        />
      )}

      {selectedVehicle && (
        <DailyCheckSheet
          open={showCheckSheet}
          onOpenChange={setShowCheckSheet}
          vehicle={selectedVehicle}
        />
      )}

      {selectedVehicle && (
        <ServiceHistorySheet
          open={showServiceSheet}
          onOpenChange={setShowServiceSheet}
          vehicle={selectedVehicle}
        />
      )}
    </PageFrame>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : (
    content
  );
}
