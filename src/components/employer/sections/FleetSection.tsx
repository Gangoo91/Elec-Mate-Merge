import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { PullToRefresh } from "@/components/ui/pull-to-refresh";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionHeader } from "@/components/employer/SectionHeader";
import { QuickStats } from "@/components/employer/QuickStats";
import {
  useVehicles,
  useFuelLogs,
  useFleetStats,
  useCreateVehicle,
  useCreateFuelLog,
  useDeleteVehicle,
  useUpdateVehicle,
  type Vehicle,
  type FuelLog,
  type VehicleStatus,
  type UpdateVehicleInput
} from "@/hooks/useFleet";
import { EditVehicleSheet } from "@/components/employer/dialogs/EditVehicleSheet";
import { VehicleToolsSheet } from "@/components/employer/fleet/VehicleToolsSheet";
import { VehicleDocumentsSheet } from "@/components/employer/fleet/VehicleDocumentsSheet";
import { DailyCheckSheet } from "@/components/employer/fleet/DailyCheckSheet";
import { ServiceHistorySheet } from "@/components/employer/fleet/ServiceHistorySheet";
import {
  Car,
  Search,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Fuel,
  MapPin,
  ChevronDown,
  ChevronUp,
  Clock,
  Wrench,
  Plus,
  Loader2,
  RefreshCw,
  Trash2,
  Pencil,
  Package,
  FileText,
  ClipboardCheck,
  Settings
} from "lucide-react";

const vehicleStatuses: VehicleStatus[] = ["Active", "Available", "Maintenance", "Off Road"];

export function FleetSection() {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"vehicles" | "fuel">("vehicles");
  const [showNewVehicle, setShowNewVehicle] = useState(false);
  const [showNewFuel, setShowNewFuel] = useState(false);

  // Edit vehicle state
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);
  const [showEditSheet, setShowEditSheet] = useState(false);

  // New feature sheets
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [showToolsSheet, setShowToolsSheet] = useState(false);
  const [showDocumentsSheet, setShowDocumentsSheet] = useState(false);
  const [showCheckSheet, setShowCheckSheet] = useState(false);
  const [showServiceSheet, setShowServiceSheet] = useState(false);

  // Vehicle form state
  const [registration, setRegistration] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [colour, setColour] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [motExpiry, setMotExpiry] = useState("");
  const [taxExpiry, setTaxExpiry] = useState("");

  // Fuel form state
  const [fuelVehicleId, setFuelVehicleId] = useState("");
  const [fuelDate, setFuelDate] = useState(new Date().toISOString().split("T")[0]);
  const [litres, setLitres] = useState("");
  const [cost, setCost] = useState("");
  const [fuelMileage, setFuelMileage] = useState("");
  const [fuelLocation, setFuelLocation] = useState("");

  // Hooks
  const { data: vehicles, isLoading: vehiclesLoading, error, refetch } = useVehicles();
  const { data: fuelLogs, isLoading: fuelLoading } = useFuelLogs();
  const { data: stats } = useFleetStats();
  const createVehicle = useCreateVehicle();
  const createFuelLog = useCreateFuelLog();
  const deleteVehicle = useDeleteVehicle();
  const updateVehicle = useUpdateVehicle();

  const isLoading = vehiclesLoading || fuelLoading;

  const filteredVehicles = vehicles?.filter(v =>
    v.registration.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.assigned_to?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.make?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    v.model?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const filteredFuelLogs = fuelLogs?.filter(f =>
    f.vehicle?.registration?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.location?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const getExpiryStatus = (dateStr: string | undefined) => {
    if (!dateStr) return { status: "unknown", color: "text-muted-foreground", bg: "bg-muted" };
    const date = new Date(dateStr);
    const now = new Date();
    const daysUntil = Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return { status: "expired", color: "text-destructive", bg: "bg-destructive/10" };
    if (daysUntil < 30) return { status: "due", color: "text-warning", bg: "bg-warning/10" };
    return { status: "ok", color: "text-success", bg: "bg-success/10" };
  };

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
      status: "Active",
      tracker_fitted: false,
    });

    // Reset form
    setRegistration("");
    setMake("");
    setModel("");
    setColour("");
    setAssignedTo("");
    setMotExpiry("");
    setTaxExpiry("");
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

    // Reset form
    setFuelVehicleId("");
    setFuelDate(new Date().toISOString().split("T")[0]);
    setLitres("");
    setCost("");
    setFuelMileage("");
    setFuelLocation("");
    setShowNewFuel(false);
  };

  const handleDelete = async (id: string) => {
    await deleteVehicle.mutateAsync(id);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setEditVehicle(vehicle);
    setShowEditSheet(true);
  };

  const handleUpdateVehicle = async (id: string, updates: UpdateVehicleInput) => {
    await updateVehicle.mutateAsync({ id, ...updates });
    setExpandedCard(null);
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <AlertTriangle className="h-12 w-12 text-destructive" />
        <p className="text-muted-foreground">Failed to load fleet data</p>
        <Button onClick={() => refetch()} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Retry
        </Button>
      </div>
    );
  }

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const content = (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <SectionHeader
        title="Fleet Management"
        description="Vehicles, MOT tracking, and fuel logs"
        action={
          <div className="flex gap-2">
            <Sheet open={showNewVehicle} onOpenChange={setShowNewVehicle}>
              <SheetTrigger asChild>
                <Button size="sm" variant="outline" className="gap-2 h-10 touch-manipulation">
                  <Plus className="h-4 w-4" />
                  <span className="hidden sm:inline">Vehicle</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-4 border-b border-border">
                    <SheetTitle>Add Vehicle</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Registration *</Label>
                      <Input
                        placeholder="AB12 CDE"
                        value={registration}
                        onChange={(e) => setRegistration(e.target.value.toUpperCase())}
                        className="h-11 touch-manipulation"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Make</Label>
                        <Input
                          placeholder="Ford"
                          value={make}
                          onChange={(e) => setMake(e.target.value)}
                          className="h-11 touch-manipulation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Model</Label>
                        <Input
                          placeholder="Transit"
                          value={model}
                          onChange={(e) => setModel(e.target.value)}
                          className="h-11 touch-manipulation"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Colour</Label>
                        <Input
                          placeholder="White"
                          value={colour}
                          onChange={(e) => setColour(e.target.value)}
                          className="h-11 touch-manipulation"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Assigned To</Label>
                        <Input
                          placeholder="Driver name"
                          value={assignedTo}
                          onChange={(e) => setAssignedTo(e.target.value)}
                          className="h-11 touch-manipulation"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
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
                    </div>
                  </div>
                  <div className="p-4 border-t border-border bg-background">
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowNewVehicle(false)} className="flex-1 h-11 touch-manipulation">
                        Cancel
                      </Button>
                      <Button onClick={handleCreateVehicle} disabled={!registration || createVehicle.isPending} className="flex-1 h-11 touch-manipulation">
                        {createVehicle.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Add Vehicle"}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet open={showNewFuel} onOpenChange={setShowNewFuel}>
              <SheetTrigger asChild>
                <Button size="sm" className="gap-2 h-10 touch-manipulation">
                  <Fuel className="h-4 w-4" />
                  <span className="hidden sm:inline">Log Fuel</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
                <div className="flex flex-col h-full bg-background">
                  <SheetHeader className="p-4 border-b border-border">
                    <SheetTitle>Log Fuel</SheetTitle>
                  </SheetHeader>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <div className="space-y-2">
                      <Label>Vehicle *</Label>
                      <Select value={fuelVehicleId} onValueChange={setFuelVehicleId}>
                        <SelectTrigger className="h-11 touch-manipulation">
                          <SelectValue placeholder="Select vehicle..." />
                        </SelectTrigger>
                        <SelectContent className="z-[100]">
                          {vehicles?.map(v => (
                            <SelectItem key={v.id} value={v.id}>{v.registration} - {v.make} {v.model}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Date *</Label>
                      <Input type="date" value={fuelDate} onChange={(e) => setFuelDate(e.target.value)} className="h-11 touch-manipulation" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Litres</Label>
                        <Input type="number" step="0.01" placeholder="45.5" value={litres} onChange={(e) => setLitres(e.target.value)} className="h-11 touch-manipulation" />
                      </div>
                      <div className="space-y-2">
                        <Label>Cost (£)</Label>
                        <Input type="number" step="0.01" placeholder="75.00" value={cost} onChange={(e) => setCost(e.target.value)} className="h-11 touch-manipulation" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Current Mileage</Label>
                      <Input type="number" placeholder="45000" value={fuelMileage} onChange={(e) => setFuelMileage(e.target.value)} className="h-11 touch-manipulation" />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input placeholder="BP Garage, High Street" value={fuelLocation} onChange={(e) => setFuelLocation(e.target.value)} className="h-11 touch-manipulation" />
                    </div>
                  </div>
                  <div className="p-4 border-t border-border bg-background">
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={() => setShowNewFuel(false)} className="flex-1 h-11 touch-manipulation">Cancel</Button>
                      <Button onClick={handleCreateFuelLog} disabled={!fuelVehicleId || !fuelDate || createFuelLog.isPending} className="flex-1 h-11 touch-manipulation">
                        {createFuelLog.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Log Fuel"}
                      </Button>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        }
      />

      {/* Stats */}
      <QuickStats
        stats={[
          { icon: Car, value: isLoading ? "-" : (stats?.active || 0), label: "Active", color: "yellow" },
          ...(stats?.motDue && stats.motDue > 0 ? [{ icon: AlertTriangle, value: stats.motDue, label: "MOT Due", color: "orange" as const, pulse: true }] : []),
          { icon: MapPin, value: isLoading ? "-" : `${((stats?.totalMileage || 0) / 1000).toFixed(0)}k`, label: "Total Miles", color: "blue" },
          { icon: Fuel, value: isLoading ? "-" : `£${(stats?.monthlyFuelCost || 0).toFixed(0)}`, label: "Fuel (Month)", color: "green" },
        ]}
      />

      {/* Tabs */}
      <div className="flex gap-2 -mx-4 px-4 md:mx-0 md:px-0">
        <Badge variant={activeTab === "vehicles" ? "default" : "outline"} className="cursor-pointer touch-manipulation" onClick={() => setActiveTab("vehicles")}>
          Vehicles ({vehicles?.length || 0})
        </Badge>
        <Badge variant={activeTab === "fuel" ? "default" : "outline"} className="cursor-pointer touch-manipulation" onClick={() => setActiveTab("fuel")}>
          Fuel Logs ({fuelLogs?.length || 0})
        </Badge>
      </div>

      {/* Search */}
      <div className="relative">
        {!searchQuery && (
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        )}
        <Input placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className={cn("h-11 touch-manipulation", !searchQuery && "pl-10")} />
      </div>

      {activeTab === "vehicles" ? (
        isLoading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="bg-elec-gray border-border"><CardContent className="p-4"><Skeleton className="h-20 w-full" /></CardContent></Card>)}</div>
        ) : filteredVehicles.length === 0 ? (
          <Card className="bg-elec-gray border-border"><CardContent className="p-8 text-center"><Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h3 className="font-semibold text-foreground mb-2">No vehicles</h3><p className="text-sm text-muted-foreground mb-4">Add your first vehicle to the fleet.</p><Button onClick={() => setShowNewVehicle(true)} className="gap-2"><Plus className="h-4 w-4" />Add Vehicle</Button></CardContent></Card>
        ) : (
          <div className="space-y-3">
            {filteredVehicles.map((vehicle) => {
              const isExpanded = expandedCard === vehicle.id;
              const motStatus = getExpiryStatus(vehicle.mot_expiry);
              const taxStatus = getExpiryStatus(vehicle.tax_expiry);

              return (
                <Card key={vehicle.id} className="bg-elec-gray border-border overflow-hidden">
                  <CardContent className="p-0">
                    <div className="p-4 cursor-pointer touch-manipulation" onClick={() => setExpandedCard(isExpanded ? null : vehicle.id)}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Car className="h-4 w-4 text-elec-yellow" />
                            <h3 className="font-bold text-foreground">{vehicle.registration}</h3>
                            {(motStatus.status !== "ok" || taxStatus.status !== "ok") && <AlertTriangle className="h-4 w-4 text-warning shrink-0" />}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{vehicle.make} {vehicle.model} {vehicle.colour && `• ${vehicle.colour}`}</p>
                          <div className="flex items-center gap-2 text-sm">
                            {vehicle.assigned_to && <Badge variant="outline" className="text-xs">{vehicle.assigned_to}</Badge>}
                            <span className="text-muted-foreground">{vehicle.mileage.toLocaleString()} miles</span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge className={`${vehicle.status === "Active" ? "bg-success/20 text-success" : vehicle.status === "Available" ? "bg-info/20 text-info" : "bg-muted text-muted-foreground"} border-0`}>
                            {vehicle.status}
                          </Badge>
                        </div>
                      </div>

                      {vehicle.mot_expiry && vehicle.tax_expiry && (
                        <div className="flex gap-2 mt-3">
                          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${motStatus.bg}`}>
                            <Calendar className={`h-3 w-3 ${motStatus.color}`} />
                            <span className={motStatus.color}>MOT: {new Date(vehicle.mot_expiry).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                          </div>
                          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs ${taxStatus.bg}`}>
                            <Clock className={`h-3 w-3 ${taxStatus.color}`} />
                            <span className={taxStatus.color}>Tax: {new Date(vehicle.tax_expiry).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-center mt-2">{isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}</div>
                    </div>

                    {isExpanded && (
                      <div className="border-t border-border p-4 bg-muted/30 space-y-4">
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {vehicle.mot_expiry && <div><span className="text-muted-foreground">MOT Expiry:</span><p className={`font-medium ${motStatus.color}`}>{new Date(vehicle.mot_expiry).toLocaleDateString("en-GB")}</p></div>}
                          {vehicle.tax_expiry && <div><span className="text-muted-foreground">Tax Expiry:</span><p className={`font-medium ${taxStatus.color}`}>{new Date(vehicle.tax_expiry).toLocaleDateString("en-GB")}</p></div>}
                          {vehicle.insurance_expiry && <div><span className="text-muted-foreground">Insurance Expiry:</span><p className="font-medium">{new Date(vehicle.insurance_expiry).toLocaleDateString("en-GB")}</p></div>}
                          {vehicle.last_service && <div><span className="text-muted-foreground">Last Service:</span><p className="font-medium">{new Date(vehicle.last_service).toLocaleDateString("en-GB")}</p></div>}
                          {vehicle.next_service && <div><span className="text-muted-foreground">Next Service:</span><p className="font-medium">{new Date(vehicle.next_service).toLocaleDateString("en-GB")}</p></div>}
                          <div><span className="text-muted-foreground">Tracker:</span><p className="font-medium flex items-center gap-1">{vehicle.tracker_fitted ? <><CheckCircle className="h-3 w-3 text-success" /> Fitted</> : <><AlertTriangle className="h-3 w-3 text-warning" /> Not fitted</>}</p></div>
                        </div>
                        {/* Quick Actions */}
                        <div className="grid grid-cols-4 gap-2 mb-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-col h-16 gap-1"
                            onClick={() => { setSelectedVehicle(vehicle); setShowToolsSheet(true); }}
                          >
                            <Package className="h-4 w-4 text-orange-400" />
                            <span className="text-xs">Tools</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-col h-16 gap-1"
                            onClick={() => { setSelectedVehicle(vehicle); setShowDocumentsSheet(true); }}
                          >
                            <FileText className="h-4 w-4 text-blue-400" />
                            <span className="text-xs">Docs</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-col h-16 gap-1"
                            onClick={() => { setSelectedVehicle(vehicle); setShowCheckSheet(true); }}
                          >
                            <ClipboardCheck className="h-4 w-4 text-green-400" />
                            <span className="text-xs">Check</span>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-col h-16 gap-1"
                            onClick={() => { setSelectedVehicle(vehicle); setShowServiceSheet(true); }}
                          >
                            <Settings className="h-4 w-4 text-purple-400" />
                            <span className="text-xs">Service</span>
                          </Button>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => { setFuelVehicleId(vehicle.id); setShowNewFuel(true); }}><Fuel className="h-4 w-4 mr-2" />Log Fuel</Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEditVehicle(vehicle)}><Pencil className="h-4 w-4 mr-2" />Edit</Button>
                          <Button variant="outline" size="sm" onClick={() => handleDelete(vehicle.id)} disabled={deleteVehicle.isPending} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )
      ) : (
        isLoading ? (
          <div className="space-y-3">{[1, 2, 3].map((i) => <Card key={i} className="bg-elec-gray border-border"><CardContent className="p-4"><Skeleton className="h-16 w-full" /></CardContent></Card>)}</div>
        ) : filteredFuelLogs.length === 0 ? (
          <Card className="bg-elec-gray border-border"><CardContent className="p-8 text-center"><Fuel className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><p className="text-sm text-muted-foreground">No fuel logs yet.</p></CardContent></Card>
        ) : (
          <div className="space-y-3">
            {filteredFuelLogs.map((log) => (
              <Card key={log.id} className="bg-elec-gray border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Fuel className="h-4 w-4 text-elec-yellow" />
                        <h3 className="font-semibold text-foreground">{log.vehicle?.registration || "Unknown"}</h3>
                      </div>
                      {log.location && <p className="text-sm text-muted-foreground mb-2">{log.location}</p>}
                      <div className="flex items-center gap-3 text-sm">
                        {log.litres && <span className="text-muted-foreground">{log.litres}L</span>}
                        {log.mileage && <span className="text-muted-foreground">{log.mileage.toLocaleString()} miles</span>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {log.cost && <p className="font-bold text-foreground">£{log.cost.toFixed(2)}</p>}
                      <p className="text-xs text-muted-foreground">{new Date(log.date).toLocaleDateString("en-GB")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )
      )}

      {/* Edit Vehicle Sheet */}
      <EditVehicleSheet
        vehicle={editVehicle}
        open={showEditSheet}
        onOpenChange={setShowEditSheet}
        onSave={handleUpdateVehicle}
        onDelete={handleDelete}
        isSaving={updateVehicle.isPending}
        isDeleting={deleteVehicle.isPending}
      />

      {/* Tool Inventory Sheet */}
      {selectedVehicle && (
        <VehicleToolsSheet
          open={showToolsSheet}
          onOpenChange={setShowToolsSheet}
          vehicle={selectedVehicle}
        />
      )}

      {/* Documents Sheet */}
      {selectedVehicle && (
        <VehicleDocumentsSheet
          open={showDocumentsSheet}
          onOpenChange={setShowDocumentsSheet}
          vehicle={selectedVehicle}
        />
      )}

      {/* Daily Check Sheet */}
      {selectedVehicle && (
        <DailyCheckSheet
          open={showCheckSheet}
          onOpenChange={setShowCheckSheet}
          vehicle={selectedVehicle}
        />
      )}

      {/* Service History Sheet */}
      {selectedVehicle && (
        <ServiceHistorySheet
          open={showServiceSheet}
          onOpenChange={setShowServiceSheet}
          vehicle={selectedVehicle}
        />
      )}
    </div>
  );

  return isMobile ? (
    <PullToRefresh onRefresh={handleRefresh} className="h-full">
      {content}
    </PullToRefresh>
  ) : content;
}
