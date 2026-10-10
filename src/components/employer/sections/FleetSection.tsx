import { useState, useCallback, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PullToRefresh } from '@/components/ui/pull-to-refresh';
import { useIsMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormSheet } from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
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
  LoadingBlocks,
  IconButton,
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
import { RefreshCw, Loader2, AlertTriangle, Search } from 'lucide-react';
import {
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  Segments,
  StatusPill,
  asideFirstClass,
  colClass,
  frameClass,
  heroPrimaryClass,
  panel,
  searchInputClass,
  twoColClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
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

/** Stored values are Title Case ('Off Road'); show sentence case. */
const statusLabel = (status: VehicleStatus): string =>
  status === 'Off Road' ? 'Off road' : status;

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'No date recorded';
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
      updates.status && updates.status !== 'Off Road'
        ? { off_road_reason: null, off_road_at: null }
        : {};
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
    () =>
      selectedVehicle
        ? ((vehicles ?? []).find((v) => v.id === selectedVehicle.id) ?? selectedVehicle)
        : null,
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
      <PageFrame className={frameClass}>
        <PageHero title="Fleet" description="Couldn't load your vehicles." />
        <PlainEmpty
          stacked
          text="Something went wrong loading your vehicles. Tap retry to try again."
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
      <PrimaryButton
        data-help="fleet.add"
        onClick={() => setShowNewVehicle(true)}
        className={heroPrimaryClass}
      >
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

  const fleetCount = stats?.total ?? vehicles?.length ?? 0;
  const notCheckedCount = expectedToday.length - doneToday;
  const headlineParts = [
    problemCount > 0 ? `${problemCount} van${problemCount === 1 ? '' : 's'} with a problem` : null,
    expectedToday.length > 0
      ? notCheckedCount > 0
        ? `${notCheckedCount} not checked today`
        : 'every van checked today'
      : null,
    datesDue > 0 ? `${datesDue} with a date due in 30 days` : null,
  ].filter(Boolean) as string[];
  const headline = isLoading
    ? 'Loading your vans.'
    : fleetCount === 0
      ? 'No vehicles yet. Add your first van and who drives it.'
      : headlineParts.length === 0
        ? 'All on the road and in date.'
        : headlineParts.join(', ').replace(/^./, (c) => c.toUpperCase()) + '.';

  /** One status per row, the most urgent one. */
  const rowStatus = (v: Vehicle): { label: string; tone: PillTone } => {
    if (openDefects.some((r) => r.vehicle_id === v.id)) return { label: 'Problem', tone: 'red' };
    if (v.mot_expiry && expiryTone(v.mot_expiry) === 'red')
      return { label: 'MOT expired', tone: 'red' };
    if (v.status === 'Off Road') return { label: 'Off road', tone: 'red' };
    if (v.mot_expiry && expiryTone(v.mot_expiry) === 'orange')
      return { label: 'MOT due', tone: 'volt' };
    if (checkedToday.has(v.id)) return { label: 'Checked', tone: 'green' };
    return { label: statusLabel(v.status), tone: 'neutral' };
  };

  const dueTone = (d?: string): PillTone =>
    expiryTone(d) === 'red' ? 'red' : expiryTone(d) === 'orange' ? 'volt' : 'green';
  const dueLabel = (d: string | undefined, overdue = 'Expired') =>
    expiryTone(d) === 'red' ? overdue : expiryTone(d) === 'orange' ? 'Due soon' : 'OK';

  const hasVehicles = !isLoading && !!vehicles && vehicles.length > 0;

  const content = (
    <PageFrame className={frameClass}>
      <PageHero title="Fleet" description={headline} actions={heroActions} />

      <HowItWorks
        help={FLEET_HELP}
        blockers={helpBlockers}
        askContext={{ page: 'fleet', tab: filter }}
      />

      {hasVehicles && (
        <StatStrip
          columns={4}
          stats={[
            {
              label: 'Checked today',
              value: expectedToday.length ? `${doneToday}/${expectedToday.length}` : '0',
              sub:
                expectedToday.length === 0
                  ? 'No drivers assigned'
                  : notCheckedCount > 0
                    ? `${notCheckedCount} to go`
                    : 'All done',
              tone:
                expectedToday.length > 0 && doneToday === expectedToday.length
                  ? 'emerald'
                  : undefined,
            },
            {
              label: 'Problems',
              value: problemCount,
              sub: problemCount > 0 ? 'Reported by drivers' : 'None open',
              tone: problemCount > 0 ? 'red' : undefined,
            },
            {
              label: 'Due in 30 days',
              value: datesDue,
              sub: 'MOT, tax, insurance, service',
              tone: datesDue > 0 ? 'yellow' : undefined,
            },
            { label: 'Fleet', value: fleetCount, sub: 'Vehicles' },
          ]}
        />
      )}

      <div className={hasVehicles ? twoColClass : undefined}>
        <section className={colClass}>
          <div>
            <PanelTitle
              title="Vehicles"
              meta={hasVehicles ? `${filteredVehicles.length}` : undefined}
            />
            {hasVehicles && (
              <div className="mb-3 flex flex-col gap-3 xl:flex-row xl:items-center">
                <Segments wrap items={filterTabs} value={filter} onChange={(v) => setFilter(v)} />
                <div className="relative xl:ml-auto xl:w-72">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  <input
                    className={searchInputClass}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search registration, driver, make"
                  />
                </div>
              </div>
            )}
            {isLoading ? (
              <LoadingBlocks />
            ) : filteredVehicles.length === 0 ? (
              <PlainEmpty
                stacked
                text={
                  vehicles && vehicles.length > 0
                    ? 'No vehicle matches that filter or search.'
                    : "Your vans show here with their driver, MOT and today's check."
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
              <div data-help="fleet.list">
                <RowList>
                  {filteredVehicles.map((v) => {
                    const motLabel = v.mot_expiry
                      ? `MOT ${formatShortDate(v.mot_expiry)}`
                      : 'MOT not set';
                    const detail = [
                      v.assigned_to || 'Unassigned',
                      v.job?.title ? `On: ${v.job.title}` : null,
                      `${v.mileage.toLocaleString()} mi`,
                      motLabel,
                    ]
                      .filter(Boolean)
                      .join(' · ');
                    const makeModel = [v.make, v.model].filter(Boolean).join(' ') || 'Vehicle';
                    const st = rowStatus(v);
                    return (
                      <Row
                        wrapDetail
                        key={v.id}
                        title={`${v.registration} · ${makeModel}`}
                        detail={detail}
                        trailing={<StatusPill tone={st.tone}>{st.label}</StatusPill>}
                        onClick={() => openDetail(v)}
                      />
                    );
                  })}
                </RowList>
              </div>
            )}
          </div>
        </section>

        {hasVehicles && (
          <aside className={cn(colClass, asideFirstClass)}>
            <FleetTodayCard
              vehicles={vehicles!}
              drivers={employees}
              checkedToday={checkedToday}
              openDefects={openDefects}
              onOpen={openDetail}
            />

            {fuelLogs && fuelLogs.length > 0 && (
              <div>
                <PanelTitle title="Recent fuel" meta={`${fuelLogs.length}`} />
                <RowList>
                  {fuelLogs.slice(0, 6).map((log) => (
                    <Row
                      wrapDetail
                      key={log.id}
                      title={log.vehicle?.registration || 'Unknown vehicle'}
                      detail={[
                        formatDate(log.date),
                        log.litres ? `${log.litres} L` : null,
                        log.mileage ? `${log.mileage.toLocaleString()} mi` : null,
                        log.location,
                      ]
                        .filter(Boolean)
                        .join(' · ')}
                      trailing={
                        canSeeMoney && log.cost ? (
                          <span className="text-[14px] font-semibold tabular-nums text-white">
                            £{log.cost.toFixed(2)}
                          </span>
                        ) : undefined
                      }
                    />
                  ))}
                </RowList>
              </div>
            )}
          </aside>
        )}
      </div>

      <FormSheet
        open={showNewVehicle}
        onOpenChange={setShowNewVehicle}
        title="Add vehicle"
        description="The registration is all you need. The driver sees it in Worker Tools under My van."
        width="wide"
        bodyClassName="space-y-5 pt-1"
        footer={
          <div className="flex gap-2">
            <SecondaryButton
              onClick={() => setShowNewVehicle(false)}
              className="flex-1 lg:flex-none"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              data-help="fleet.add-save"
              onClick={handleCreateVehicle}
              disabled={!registration || createVehicle.isPending}
              className="flex-1"
            >
              {createVehicle.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Add vehicle'
              )}
            </PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <FormCard eyebrow="The van">
            <div data-help="fleet.add-reg">
              <Field label="Registration" required>
                <Input
                  placeholder="AB12 CDE"
                  value={registration}
                  onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                  className={inputClass}
                />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Make">
                <Input
                  placeholder="Ford"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  className={inputClass}
                />
              </Field>
              <Field label="Model">
                <Input
                  placeholder="Transit"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Colour">
              <Input
                placeholder="White"
                value={colour}
                onChange={(e) => setColour(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>
          <FormCard eyebrow="Driver and dates">
            <div data-help="fleet.add-driver">
              <Field label="Driver">
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
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
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
            </div>
          </FormCard>
        </div>
      </FormSheet>

      <FormSheet
        open={showNewFuel}
        onOpenChange={setShowNewFuel}
        title="Log fuel"
        width="wide"
        bodyClassName="space-y-5 pt-1"
        footer={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => setShowNewFuel(false)} className="flex-1 lg:flex-none">
              Cancel
            </SecondaryButton>
            <PrimaryButton
              data-help="fleet.fuel-save"
              onClick={handleCreateFuelLog}
              disabled={!fuelVehicleId || !fuelDate || createFuelLog.isPending}
              className="flex-1"
            >
              {createFuelLog.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Log fuel'}
            </PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <FormCard eyebrow="Which van, when">
            <Field label="Vehicle" required>
              <Select value={fuelVehicleId} onValueChange={setFuelVehicleId}>
                <SelectTrigger className={selectTriggerClass}>
                  <SelectValue placeholder="Select vehicle…" />
                </SelectTrigger>
                <SelectContent className={selectContentClass}>
                  {vehicles?.map((v) => (
                    <SelectItem key={v.id} value={v.id}>
                      {v.registration} · {v.make} {v.model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field label="Date" required>
              <Input
                type="date"
                value={fuelDate}
                onChange={(e) => setFuelDate(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Location">
              <Input
                placeholder="BP Garage, High Street"
                value={fuelLocation}
                onChange={(e) => setFuelLocation(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>
          <FormCard eyebrow="The fill">
            <div className="grid grid-cols-2 gap-4">
              <Field label="Litres">
                <Input
                  type="number"
                  step="0.01"
                  placeholder="45.5"
                  value={litres}
                  onChange={(e) => setLitres(e.target.value)}
                  className={inputClass}
                />
              </Field>
              {canSeeMoney && (
                <Field label="Cost (£)">
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="75.00"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    className={inputClass}
                  />
                </Field>
              )}
            </div>
            <Field label="Current mileage">
              <Input
                type="number"
                placeholder="45000"
                value={fuelMileage}
                onChange={(e) => setFuelMileage(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>
        </div>
      </FormSheet>

      <FormSheet
        open={showDetail}
        onOpenChange={setShowDetail}
        title={liveSelected?.registration ?? 'Vehicle'}
        description={
          liveSelected
            ? [
                [liveSelected.make, liveSelected.model].filter(Boolean).join(' ') || 'Vehicle',
                liveSelected.assigned_to || 'Unassigned',
                liveSelected.colour,
                statusLabel(liveSelected.status),
              ]
                .filter(Boolean)
                .join(' · ')
            : undefined
        }
        width="wide"
        bodyClassName="pt-1"
        footer={
          liveSelected ? (
            <div className="flex gap-2" data-help="fleet.quick">
              <SecondaryButton
                onClick={() => {
                  setFuelVehicleId(liveSelected.id);
                  setShowDetail(false);
                  setShowNewFuel(true);
                }}
                className="flex-1 lg:flex-none"
              >
                Log fuel
              </SecondaryButton>
              <PrimaryButton
                onClick={() => {
                  setShowDetail(false);
                  handleEditVehicle(liveSelected);
                }}
                className="flex-1"
              >
                Edit vehicle
              </PrimaryButton>
            </div>
          ) : undefined
        }
      >
        {liveSelected && (
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
            <div className="space-y-5">
              {/* ELE-1984: today's walk-round and anything the driver reported. */}
              <div className={cn(panel, 'px-4 py-3.5 sm:px-5')}>
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
                    <span className="font-semibold">No driver.</span> Assign one in Edit vehicle and
                    they can do the daily check on their phone.
                  </p>
                )}
              </div>

              <VehicleProblems
                rows={selectedProblems}
                vehicleOffRoad={liveSelected.status === 'Off Road'}
                offRoadReason={liveSelected.off_road_reason}
              />

              <div>
                <PanelTitle title="Schedule" />
                <RowList>
                  <Row
                    wrapDetail
                    title="Mileage"
                    detail={`${liveSelected.mileage.toLocaleString()} mi · tracker ${liveSelected.tracker_fitted ? 'fitted' : 'not fitted'}`}
                  />
                  <Row
                    wrapDetail
                    title="MOT expiry"
                    detail={formatDate(liveSelected.mot_expiry)}
                    trailing={
                      <StatusPill
                        tone={
                          liveSelected.mot_expiry ? dueTone(liveSelected.mot_expiry) : 'neutral'
                        }
                      >
                        {liveSelected.mot_expiry ? dueLabel(liveSelected.mot_expiry) : 'Not set'}
                      </StatusPill>
                    }
                  />
                  <Row
                    wrapDetail
                    title="Tax expiry"
                    detail={formatDate(liveSelected.tax_expiry)}
                    trailing={
                      <StatusPill
                        tone={
                          liveSelected.tax_expiry ? dueTone(liveSelected.tax_expiry) : 'neutral'
                        }
                      >
                        {liveSelected.tax_expiry ? dueLabel(liveSelected.tax_expiry) : 'Not set'}
                      </StatusPill>
                    }
                  />
                  <Row
                    wrapDetail
                    title="Insurance expiry"
                    detail={formatDate(liveSelected.insurance_expiry)}
                    trailing={
                      <StatusPill
                        tone={
                          liveSelected.insurance_expiry
                            ? dueTone(liveSelected.insurance_expiry)
                            : 'neutral'
                        }
                      >
                        {liveSelected.insurance_expiry
                          ? dueLabel(liveSelected.insurance_expiry)
                          : 'Not set'}
                      </StatusPill>
                    }
                  />
                  <Row
                    wrapDetail
                    title="Last service"
                    detail={formatDate(liveSelected.last_service)}
                  />
                  <Row
                    wrapDetail
                    title="Next service"
                    detail={formatDate(liveSelected.next_service)}
                    trailing={
                      liveSelected.next_service ? (
                        <StatusPill tone={dueTone(liveSelected.next_service)}>
                          {dueLabel(liveSelected.next_service, 'Overdue')}
                        </StatusPill>
                      ) : undefined
                    }
                  />
                </RowList>
              </div>
            </div>

            <div className="space-y-5">
              <div data-help="fleet.records">
                <PanelTitle title="Records" />
                <RowList>
                  <Row
                    wrapDetail
                    title="Daily check"
                    detail="Do the walk-round, or see past checks"
                    onClick={() => {
                      setShowDetail(false);
                      setShowCheckSheet(true);
                    }}
                  />
                  <Row
                    wrapDetail
                    title="Service history"
                    detail="View and add service records"
                    onClick={() => {
                      setShowDetail(false);
                      setShowServiceSheet(true);
                    }}
                  />
                  <Row
                    wrapDetail
                    title="Tools assigned"
                    detail="Inventory carried in this vehicle"
                    onClick={() => {
                      setShowDetail(false);
                      setShowToolsSheet(true);
                    }}
                  />
                  <Row
                    wrapDetail
                    title="Documents"
                    detail="V5C, insurance certificate, MOT pass"
                    onClick={() => {
                      setShowDetail(false);
                      setShowDocumentsSheet(true);
                    }}
                  />
                </RowList>
              </div>

              <div className="flex justify-end">
                <SecondaryButton
                  onClick={() => handleDelete(liveSelected.id)}
                  disabled={deleteVehicle.isPending}
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
          </div>
        )}
      </FormSheet>

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
              Its fuel logs, daily checks, service records and documents will be removed too. This
              cannot be undone.
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

  return isMobile ? <PullToRefresh onRefresh={handleRefresh}>{content}</PullToRefresh> : content;
}
