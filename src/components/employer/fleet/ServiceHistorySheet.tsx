import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Settings,
  X,
  Plus,
  Loader2,
  Trash2,
  TrendingUp,
  Calendar,
  PoundSterling,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  useVehicleServices,
  useServiceStats,
  useCostAnalysis,
  useCreateService,
  useDeleteService,
  SERVICE_TYPES,
  type VehicleService,
  type ServiceType,
} from "@/hooks/useVehicleServices";
import type { Vehicle } from "@/hooks/useFleet";

interface ServiceHistorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

type ViewMode = "history" | "add" | "costs";

export function ServiceHistorySheet({
  open,
  onOpenChange,
  vehicle,
}: ServiceHistorySheetProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("history");

  const { data: services = [], isLoading } = useVehicleServices(vehicle.id);
  const { data: stats } = useServiceStats(vehicle.id);
  const { data: costs } = useCostAnalysis(vehicle.id);
  const createService = useCreateService();
  const deleteService = useDeleteService();

  const handleSave = (formData: FormData) => {
    createService.mutate(
      {
        vehicle_id: vehicle.id,
        service_date: formData.get("service_date") as string,
        service_type: formData.get("service_type") as ServiceType,
        provider: (formData.get("provider") as string) || undefined,
        mileage: formData.get("mileage")
          ? parseInt(formData.get("mileage") as string)
          : undefined,
        cost: formData.get("cost")
          ? parseFloat(formData.get("cost") as string)
          : undefined,
        description: (formData.get("description") as string) || undefined,
        next_service_due: (formData.get("next_service_due") as string) || undefined,
        next_service_mileage: formData.get("next_service_mileage")
          ? parseInt(formData.get("next_service_mileage") as string)
          : undefined,
        notes: (formData.get("notes") as string) || undefined,
      },
      {
        onSuccess: () => setViewMode("history"),
      }
    );
  };

  const handleDelete = (service: VehicleService) => {
    if (confirm(`Delete this ${SERVICE_TYPES.find((t) => t.value === service.service_type)?.label} record?`)) {
      deleteService.mutate({ id: service.id, vehicleId: vehicle.id });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <SheetHeader className="p-4 pb-3 border-b border-border shrink-0">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10">
                  <Settings className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">Service History</SheetTitle>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {vehicle.registration} - {vehicle.make} {vehicle.model}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onOpenChange(false)}
                className="shrink-0 h-11 w-11 touch-manipulation"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </SheetHeader>

          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-3 gap-2 p-4 border-b border-border">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{stats.totalServices}</p>
                <p className="text-xs text-muted-foreground">Services</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">
                  £{stats.yearCosts.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">This Year</p>
              </div>
              <div className="text-center">
                {stats.nextServiceDue ? (
                  <>
                    <p className="text-lg font-bold text-foreground">
                      {new Date(stats.nextServiceDue).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                      })}
                    </p>
                    <p className="text-xs text-muted-foreground">Next Due</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-bold text-muted-foreground">—</p>
                    <p className="text-xs text-muted-foreground">Next Due</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab Toggle */}
          <div className="flex border-b border-border">
            <button
              onClick={() => setViewMode("history")}
              className={cn(
                "flex-1 py-4 text-base font-medium transition-colors touch-manipulation min-h-[52px]",
                viewMode === "history"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-muted-foreground"
              )}
            >
              History
            </button>
            <button
              onClick={() => setViewMode("costs")}
              className={cn(
                "flex-1 py-4 text-base font-medium transition-colors touch-manipulation min-h-[52px]",
                viewMode === "costs"
                  ? "text-purple-400 border-b-2 border-purple-400"
                  : "text-muted-foreground"
              )}
            >
              Cost Analysis
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {viewMode === "add" ? (
              <ServiceForm
                onSave={handleSave}
                onCancel={() => setViewMode("history")}
                isPending={createService.isPending}
                currentMileage={vehicle.mileage}
              />
            ) : viewMode === "costs" ? (
              <CostAnalysisView costs={costs} />
            ) : (
              <>
                {/* Add Button */}
                <Button
                  onClick={() => setViewMode("add")}
                  className="w-full h-12 mb-4 bg-purple-600 hover:bg-purple-700 touch-manipulation text-base"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Log Service
                </Button>

                {/* Service List */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-12">
                    <Settings className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">No services recorded</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Log services, MOTs, and repairs
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="p-4 rounded-xl border border-border bg-card/50 touch-manipulation"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {SERVICE_TYPES.find((t) => t.value === service.service_type)?.label}
                              </Badge>
                              {service.cost && (
                                <Badge className="bg-purple-500/20 text-purple-400 border-0 text-xs">
                                  £{service.cost.toLocaleString()}
                                </Badge>
                              )}
                            </div>
                            <p className="text-base text-foreground mt-1.5 font-medium">
                              {new Date(service.service_date).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-11 w-11 text-red-400 touch-manipulation"
                            onClick={() => handleDelete(service)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>

                        {service.provider && (
                          <p className="text-sm text-muted-foreground">
                            {service.provider}
                          </p>
                        )}

                        {service.mileage && (
                          <p className="text-sm text-muted-foreground">
                            Mileage: {service.mileage.toLocaleString()}
                          </p>
                        )}

                        {service.description && (
                          <p className="text-sm text-muted-foreground mt-2">
                            {service.description}
                          </p>
                        )}

                        {service.next_service_due && (
                          <div className="mt-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                            <p className="text-sm text-purple-400">
                              <Calendar className="h-4 w-4 inline mr-1.5" />
                              Next due: {new Date(service.next_service_due).toLocaleDateString("en-GB")}
                              {service.next_service_mileage && (
                                <> or {service.next_service_mileage.toLocaleString()} miles</>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

// Service Form Component
function ServiceForm({
  onSave,
  onCancel,
  isPending,
  currentMileage,
}: {
  onSave: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
  currentMileage?: number;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(new FormData(e.currentTarget));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">Service Type *</Label>
          <Select name="service_type" required>
            <SelectTrigger className="h-11 mt-1.5 touch-manipulation">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              {SERVICE_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium">Date *</Label>
          <Input
            name="service_date"
            type="date"
            defaultValue={new Date().toISOString().split("T")[0]}
            required
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">Provider</Label>
          <Input
            name="provider"
            placeholder="e.g. Kwik Fit"
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Cost (£)</Label>
          <Input
            name="cost"
            type="number"
            step="0.01"
            placeholder="0.00"
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Mileage at Service</Label>
        <Input
          name="mileage"
          type="number"
          defaultValue={currentMileage}
          placeholder="e.g. 45000"
          className="h-11 mt-1.5 touch-manipulation text-base"
        />
      </div>

      <div>
        <Label className="text-sm font-medium">Description</Label>
        <Textarea
          name="description"
          placeholder="What was done..."
          className="mt-1.5 touch-manipulation text-base"
        />
      </div>

      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
        <h4 className="text-sm font-medium text-foreground mb-3">Next Service</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-sm font-medium">Due Date</Label>
            <Input name="next_service_due" type="date" className="h-11 mt-1.5 touch-manipulation text-base" />
          </div>
          <div>
            <Label className="text-sm font-medium">Due Mileage</Label>
            <Input
              name="next_service_mileage"
              type="number"
              placeholder="e.g. 55000"
              className="h-11 mt-1.5 touch-manipulation text-base"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Notes</Label>
        <Textarea name="notes" placeholder="Any additional notes..." className="mt-1.5 touch-manipulation text-base" />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 h-12 touch-manipulation text-base">
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 h-12 bg-purple-600 hover:bg-purple-700 touch-manipulation text-base"
        >
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : "Save Service"}
        </Button>
      </div>
    </form>
  );
}

// Cost Analysis View
function CostAnalysisView({ costs }: { costs: ReturnType<typeof useCostAnalysis>["data"] }) {
  if (!costs) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <PoundSterling className="h-5 w-5 text-purple-400" />
            <span className="text-sm text-muted-foreground">Total Costs</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            £{costs.totalCost.toLocaleString()}
          </p>
          <div className="flex flex-col gap-1 mt-2 text-sm text-muted-foreground">
            <span>Services: £{costs.totalServiceCost.toLocaleString()}</span>
            <span>Fuel: £{costs.totalFuelCost.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-muted-foreground">Cost per Mile</span>
          </div>
          <p className="text-2xl font-bold text-foreground">
            {costs.costPerMile > 0 ? `${costs.costPerMile.toFixed(2)}p` : "—"}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {costs.milesDriven.toLocaleString()} miles tracked
          </p>
        </div>
      </div>

      {/* Current Mileage */}
      <div className="p-4 rounded-xl border border-border bg-card/50">
        <div className="flex items-center gap-2 mb-1">
          <Gauge className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Current Mileage</span>
        </div>
        <p className="text-xl font-bold text-foreground">
          {costs.currentMileage?.toLocaleString() || "—"} miles
        </p>
      </div>

      {/* Monthly Breakdown */}
      <div>
        <h3 className="text-base font-medium text-foreground mb-3">Monthly Costs (12 months)</h3>
        <div className="space-y-3">
          {costs.monthlyCosts.map((month, index) => {
            const maxTotal = Math.max(...costs.monthlyCosts.map((m) => m.total));
            const barWidth = maxTotal > 0 ? (month.total / maxTotal) * 100 : 0;

            return (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground w-16">{month.month}</span>
                <div className="flex-1 h-8 bg-muted/30 rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-purple-500/50 transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className="text-sm text-foreground w-16 text-right font-medium">
                  £{month.total.toFixed(0)}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
