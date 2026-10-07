import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
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
import { useEmployees } from '@/hooks/useEmployees';
import { EditVehicleSheet } from '@/components/employer/dialogs/EditVehicleSheet';
import { VehicleToolsSheet } from '@/components/employer/fleet/VehicleToolsSheet';
import { VehicleDocumentsSheet } from '@/components/employer/fleet/VehicleDocumentsSheet';
import { DailyCheckSheet } from '@/components/employer/fleet/DailyCheckSheet';
import { ServiceHistorySheet } from '@/components/employer/fleet/ServiceHistorySheet';
import { RefreshCw, Loader2, AlertTriangle } from 'lucide-react';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { FLEET_HELP } from '@/components/employer/help/fleet';
import { useFleetToday } from '@/hooks/useFleetWalkround';
import { FleetTodayCard } from '@/components/employer/fleet/FleetTodayCard';
import { VehicleProblems } from '@/components/employer/fleet/VehicleProblems';
import { useEmployerRole } from '@/hooks/useEmployerRole';

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

/** Stored values are Title Case ('Off Road'); show sentence case. */
const statusLabel = (status: VehicleStatus): string =>
  status === 'Off Road' ? 'Off road' : status;

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
  const [vehicleToDelete, setVehicleToDelete] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false);
  const [showToolsSheet, setShowToolsSheet] = useState(false);
  const [showDocumentsSheet, setShowDocumentsSheet] = useState(false);
  const [showCheckSheet, setShowCheckSheet] = useState(false);
  const [showServiceSheet, setShowServiceSheet] = useState(false);

  const [registration, setRegistration] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [colour, setColour] = useState('');
  // Roster-linked driver: driver_id is the employer_employees.id FK; the
  // name is denormalised into assigned_to for list/detail display
  const [assignedDriverId, setAssignedDriverId] = useState('');
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
  const { data: employees = [] } = useEmployees();
  const { data: fuelLogs, isLoading: fuelLoading } = useFuelLogs();
  const { data: stats } = useFleetStats();
  const createVehicle = useCreateVehicle();
  const createFuelLog = useCreateFuelLog();
  const deleteVehicle = useDeleteVehicle();
  const updateVehicle = useUpdateVehicle();

  const isLoading = vehiclesLoading || fuelLoading;

  // Office managers see vehicles and checks, never fleet money.
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;

  // ELE-1984: today's walk-rounds and open problems across the fleet.
  const vehicleIds = useMemo(() => (vehicles ?? []).map((v) => v.id), [vehicles]);
  const { data: today } = useFleetToday(vehicleIds);
  const checkedToday = today?.checkedToday ?? new Map();
  const openDefects = useMemo(() => today?.openDefects ?? [], [today]);
  const problemCount = useMemo(
    () => new Set(openDefects.map((r) => r.vehicle_id)).size,
    [openDefects]
  );
  const expectedToday = (vehicles ?? []).filter((v) => v.status !== 'Off Road' && !!v.driver_id);
  const doneToday = expectedToday.filter((v) => checkedToday.has(v.id)).length;

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

  // MOT, tax, insurance or service due in the next 30 days (or overdue);
  // off-road vans are left out, as they are in the reminders.
  const datesDue = useMemo(() => {
    if (!vehicles) return 0;
    const cutoff = new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
    return vehicles.filter(
      (v) =>
        v.status !== 'Off Road' &&
        [v.mot_expiry, v.tax_expiry, v.insurance_expiry, v.next_service].some(
          (d) => d && d <= cutoff
        )
    ).length;
  }, [vehicles]);

  const handleCreateVehicle = async () => {
    if (!registration) return;
    await createVehicle.mutateAsync({
      registration: registration.toUpperCase(),
      make: make || undefined,
      model: model || undefined,
      colour: colour || undefined,
      assigned_to: assignedTo || undefined,
      driver_id: assignedDriverId || undefined,
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
    setAssignedDriverId('');
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

  // Honest confirm — deleting the vehicle takes its full history with it.
  // (async to satisfy EditVehicleSheet's onDelete: (id) => Promise<void>)
  const handleDelete = async (id: string) => {
    setVehicleToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (!vehicleToDelete) return;
    setVehicleToDelete(null);
    try {
      await deleteVehicle.mutateAsync(vehicleToDelete);
      setShowDetail(false);
    } catch {
      // The mutation's onError already shows the failure toast.
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setShowEditSheet(true);
  };

  const handleUpdateVehicle = async (id: string, updates: UpdateVehicleInput) => {
    // Back on the road from Edit vehicle: clear why it came off.
    const clearOffRoad =
      updates.status && updates.status !== 'Off Road' ? { off_road_reason: null, off_road_at: null } : {};
    await updateVehicle.mutateAsync({ id, ...updates, ...clearOffRoad });
  };

  const openDetail = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setShowDetail(true);
  };

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  // Deep link: ?vehicle=<id> (bell notifications, Overview) opens the van.
  const [searchParams, setSearchParams] = useSearchParams();
  const vehicleParam = searchParams.get('vehicle');
  useEffect(() => {
    if (!vehicleParam || vehiclesLoading || !vehicles) return;
    const v = vehicles.find((x) => x.id === vehicleParam);
    if (v) {
      setSelectedVehicle(v);
      setShowDetail(true);
    }
    const next = new URLSearchParams(searchParams);
    next.delete('vehicle');
    setSearchParams(next, { replace: true });
  }, [vehicleParam, vehiclesLoading, vehicles, searchParams, setSearchParams]);

  // The open van always renders its live row (status changes after Mark fixed).
  const liveSelected = useMemo(
    () => (selectedVehicle ? (vehicles ?? []).find((v) => v.id === selectedVehicle.id) ?? selectedVehicle : null),
    [selectedVehicle, vehicles]
  );
  const selectedProblems = useMemo(
    () => (liveSelected ? openDefects.filter((r) => r.vehicle_id === liveSelected.id) : []),
    [openDefects, liveSelected]
  );
  const selectedToday = liveSelected ? checkedToday.get(liveSelected.id) : undefined;
  const selectedDriver = liveSelected?.driver_id
    ? employees.find((e) => e.id === liveSelected.driver_id)
    : undefined;

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

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] = [];
  if (!vehiclesLoading && vehicles && vehicles.length === 0) {
    helpBlockers.push({
      text: 'No vehicles yet. Fuel, daily checks and services all hang off a vehicle.',
      fixLabel: 'Add a vehicle',
      onFix: () => setShowNewVehicle(true),
    });
  }

  const heroActions = (
    <>
      <PrimaryButton data-help="fleet.add" onClick={() => setShowNewVehicle(true)}>
        Add vehicle
      </PrimaryButton>
      <SecondaryButton data-help="fleet.fuel" onClick={() => setShowNewFuel(true)}>
        Log fuel
      </SecondaryButton>
      <IconButton onClick={handleRefresh} aria-label="Refresh fleet">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
      <PageHelpButton
        help={FLEET_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'fleet', tab: filter }}
      />
    </>
  );

  const content = (
    <PageFrame>
      <PageHero
        eyebrow="Operations"
        title="Fleet"
        description="Vans, who drives them, the daily walk-round and what is due."
        tone="blue"
        actions={heroActions}
      />

      <HowItWorks
        help={FLEET_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'fleet', tab: filter }}
      />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Checked today',
            value: isLoading ? '—' : expectedToday.length ? `${doneToday}/${expectedToday.length}` : '0',
            tone: expectedToday.length > 0 && doneToday === expectedToday.length ? 'emerald' : 'blue',
          },
          {
            label: 'Problems',
            value: isLoading ? '—' : problemCount,
            tone: problemCount > 0 ? 'red' : 'emerald',
          },
          { label: 'Due in 30 days', value: isLoading ? '—' : datesDue, tone: 'orange' },
          { label: 'Fleet', value: isLoading ? '—' : (stats?.total ?? vehicles?.length ?? 0) },
        ]}
      />

      {!isLoading && vehicles && vehicles.length > 0 && (
        <FleetTodayCard
          vehicles={vehicles}
          drivers={employees}
          checkedToday={checkedToday}
          openDefects={openDefects}
          onOpen={openDetail}
        />
      )}

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
          <div data-help="fleet.list">
          <ListBody>
            {filteredVehicles.map((v) => {
              const motLabel = v.mot_expiry ? `MOT ${formatShortDate(v.mot_expiry)}` : 'MOT —';
              const subtitle = [
                v.assigned_to || 'Unassigned',
                v.job?.title ? `On: ${v.job.title}` : null,
                `${v.mileage.toLocaleString()} mi`,
                motLabel,
              ]
                .filter(Boolean)
                .join(' · ');
              const makeModel = [v.make, v.model].filter(Boolean).join(' ') || 'Vehicle';
              return (
                <ListRow
                  key={v.id}
                  title={`${v.registration} — ${makeModel}`}
                  subtitle={subtitle}
                  trailing={
                    <>
                      {openDefects.some((r) => r.vehicle_id === v.id) && (
                        <Pill tone="red">Problem</Pill>
                      )}
                      {checkedToday.has(v.id) && <Pill tone="emerald">Checked today</Pill>}
                      {v.mot_expiry && (
                        <Pill tone={expiryTone(v.mot_expiry)}>
                          {expiryTone(v.mot_expiry) === 'red' ? 'MOT expired' : 'MOT'}
                        </Pill>
                      )}
                      <Pill tone={statusToTone(v.status)}>{statusLabel(v.status)}</Pill>
                    </>
                  }
                  onClick={() => openDetail(v)}
                />
              );
            })}
          </ListBody>
          </div>
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
                  canSeeMoney && log.cost ? (
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
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          <SheetHeader className="p-5 border-b border-white/[0.06]">
            <SheetTitle className="text-white text-[15px] font-semibold">Add vehicle</SheetTitle>
          </SheetHeader>
          <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
            <div className="space-y-2" data-help="fleet.add-reg">
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
              <div className="space-y-2" data-help="fleet.add-driver">
                <Label className="text-white text-[12px] uppercase tracking-[0.14em]">
                  Driver
                </Label>
                {/* Roster picker, not free text — links the vehicle to the
                    actual employee via driver_id */}
                <Select
                  value={assignedDriverId || 'none'}
                  onValueChange={(v) => {
                    if (v === 'none') {
                      setAssignedDriverId('');
                      setAssignedTo('');
                    } else {
                      setAssignedDriverId(v);
                      setAssignedTo(employees.find((e) => e.id === v)?.name || '');
                    }
                  }}
                >
                  <SelectTrigger className={selectTriggerClass}>
                    <SelectValue placeholder="Unassigned" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="none">Unassigned</SelectItem>
                    {employees
                      .filter((e) => (e.status ?? '').toLowerCase() !== 'archived')
                      .map((e) => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.name}
                          {e.user_id ? '' : ' (not on the app yet)'}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
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
              data-help="fleet.add-save"
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
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.06]"
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
              {canSeeMoney && (
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
              )}
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
              data-help="fleet.fuel-save"
              onClick={handleCreateFuelLog}
              disabled={!fuelVehicleId || !fuelDate || createFuelLog.isPending}
              fullWidth
            >
              {createFuelLog.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Log fuel'}
            </PrimaryButton>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showDetail} onOpenChange={setShowDetail}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl flex flex-col bg-[hsl(0_0%_8%)] border-white/[0.06]"
        >
          {liveSelected && (
            <>
              <SheetHeader className="p-5 border-b border-white/[0.06]">
                <SheetTitle className="text-white text-[15px] font-semibold flex items-center gap-3">
                  <span>{liveSelected.registration}</span>
                  <Pill tone={statusToTone(liveSelected.status)}>{statusLabel(liveSelected.status)}</Pill>
                </SheetTitle>
              </SheetHeader>
              <div className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-5">
                <div className="mx-auto w-full max-w-2xl lg:max-w-[88rem] space-y-5">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white font-medium">
                    {[liveSelected.make, liveSelected.model].filter(Boolean).join(' ') ||
                      'Vehicle'}
                  </div>
                  <div className="mt-2 text-[13px] text-white">
                    {liveSelected.assigned_to || 'Unassigned'}
                    {liveSelected.colour && ` · ${liveSelected.colour}`}
                  </div>
                </div>

                {/* ELE-1984: today's walk-round and anything the driver reported. */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-4">
                  {selectedToday ? (
                    <p className="text-[14px] text-white">
                      <span className="font-semibold">
                        Checked today at {selectedToday.check_time?.slice(0, 5)}
                      </span>{' '}
                      by {selectedToday.driver?.name ?? 'the office'}
                      {selectedToday.mileage
                        ? ` · ${selectedToday.mileage.toLocaleString('en-GB')} miles`
                        : ''}
                      {selectedToday.defects_found
                        ? selectedToday.resolved_at
                          ? ' · problem since fixed'
                          : ' · problems found'
                        : ' · all OK'}
                    </p>
                  ) : liveSelected.status === 'Off Road' ? (
                    <p className="text-[14px] text-white">
                      <span className="font-semibold">Off the road.</span> No check expected.
                    </p>
                  ) : liveSelected.driver_id ? (
                    <p className="text-[14px] text-white">
                      <span className="font-semibold">Not checked today.</span>{' '}
                      {selectedDriver?.user_id
                        ? `${selectedDriver.name} does it from My van in Worker Tools.`
                        : `${selectedDriver?.name ?? liveSelected.assigned_to ?? 'The driver'} is not on the app yet. Invite them from Team so they can check it on their phone.`}
                    </p>
                  ) : (
                    <p className="text-[14px] text-white">
                      <span className="font-semibold">No driver.</span> Assign one in Edit vehicle
                      and they can do the daily check on their phone.
                    </p>
                  )}
                </div>

                <VehicleProblems
                  rows={selectedProblems}
                  vehicleOffRoad={liveSelected.status === 'Off Road'}
                  offRoadReason={liveSelected.off_road_reason}
                />

                <StatStrip
                  columns={2}
                  stats={[
                    { label: 'Mileage', value: liveSelected.mileage.toLocaleString() },
                    {
                      label: 'Tracker',
                      value: liveSelected.tracker_fitted ? 'Fitted' : 'None',
                      tone: liveSelected.tracker_fitted ? 'emerald' : 'amber',
                    },
                  ]}
                />

                <ListCard>
                  <ListCardHeader tone="orange" title="Schedule" />
                  <ListBody>
                    <ListRow
                      title="MOT expiry"
                      subtitle={formatDate(liveSelected.mot_expiry)}
                      trailing={
                        liveSelected.mot_expiry ? (
                          <Pill tone={expiryTone(liveSelected.mot_expiry)}>
                            {expiryTone(liveSelected.mot_expiry) === 'red'
                              ? 'Expired'
                              : expiryTone(liveSelected.mot_expiry) === 'orange'
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
                      subtitle={formatDate(liveSelected.tax_expiry)}
                      trailing={
                        liveSelected.tax_expiry ? (
                          <Pill tone={expiryTone(liveSelected.tax_expiry)}>
                            {expiryTone(liveSelected.tax_expiry) === 'red'
                              ? 'Expired'
                              : expiryTone(liveSelected.tax_expiry) === 'orange'
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
                      subtitle={formatDate(liveSelected.insurance_expiry)}
                      trailing={
                        liveSelected.insurance_expiry ? (
                          <Pill tone={expiryTone(liveSelected.insurance_expiry)}>
                            {expiryTone(liveSelected.insurance_expiry) === 'red'
                              ? 'Expired'
                              : expiryTone(liveSelected.insurance_expiry) === 'orange'
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
                      subtitle={formatDate(liveSelected.last_service)}
                    />
                    <ListRow
                      title="Next service"
                      subtitle={formatDate(liveSelected.next_service)}
                      trailing={
                        liveSelected.next_service ? (
                          <Pill tone={expiryTone(liveSelected.next_service)}>
                            {expiryTone(liveSelected.next_service) === 'red'
                              ? 'Overdue'
                              : expiryTone(liveSelected.next_service) === 'orange'
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
                  <div data-help="fleet.records">
                  <ListBody>
                    <ListRow
                      title="Daily check"
                      subtitle="Do the walk-round, or see past checks"
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
                  </div>
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="amber" title="Quick actions" />
                  <div data-help="fleet.quick">
                  <ListBody>
                    <ListRow
                      title="Log fuel"
                      subtitle="Record litres, cost and mileage"
                      onClick={() => {
                        setFuelVehicleId(liveSelected.id);
                        setShowDetail(false);
                        setShowNewFuel(true);
                      }}
                    />
                    <ListRow
                      title="Edit vehicle"
                      subtitle="Update details, assignment, status"
                      onClick={() => {
                        setShowDetail(false);
                        handleEditVehicle(liveSelected);
                      }}
                    />
                  </ListBody>
                  </div>
                </ListCard>

                <Divider />

                <SecondaryButton
                  onClick={() => handleDelete(liveSelected.id)}
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

      {liveSelected && (
        <DailyCheckSheet
          open={showCheckSheet}
          onOpenChange={setShowCheckSheet}
          vehicle={liveSelected}
        />
      )}

      {selectedVehicle && (
        <ServiceHistorySheet
          open={showServiceSheet}
          onOpenChange={setShowServiceSheet}
          vehicle={selectedVehicle}
        />
      )}

      <AlertDialog
        open={!!vehicleToDelete}
        onOpenChange={(open) => {
          if (!open) setVehicleToDelete(null);
        }}
      >
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove this vehicle?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Its fuel logs, daily checks, service records and documents will be removed too.
              This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmDelete}
              className="h-11 touch-manipulation bg-red-500/90 hover:bg-red-500 text-white"
            >
              Remove vehicle
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
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
