import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Settings,
  Plus,
  Loader2,
  Trash2,
  TrendingUp,
  Calendar,
  PoundSterling,
  Gauge,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useVehicleServices,
  useServiceStats,
  useCostAnalysis,
  useCreateService,
  useDeleteService,
  SERVICE_TYPES,
  type VehicleService,
  type ServiceType,
} from '@/hooks/useVehicleServices';
import type { Vehicle } from '@/hooks/useFleet';
import {
  SheetShell,
  Field,
  FormCard,
  FormGrid,
  Pill,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  textareaClass,
} from '@/components/employer/editorial';

interface ServiceHistorySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

type ViewMode = 'history' | 'add' | 'costs';

export function ServiceHistorySheet({ open, onOpenChange, vehicle }: ServiceHistorySheetProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('history');

  const { data: services = [], isLoading } = useVehicleServices(vehicle.id);
  const { data: stats } = useServiceStats(vehicle.id);
  const { data: costs } = useCostAnalysis(vehicle.id);
  const createService = useCreateService();
  const deleteService = useDeleteService();

  const handleSave = (formData: FormData) => {
    createService.mutate(
      {
        vehicle_id: vehicle.id,
        service_date: formData.get('service_date') as string,
        service_type: formData.get('service_type') as ServiceType,
        provider: (formData.get('provider') as string) || undefined,
        mileage: formData.get('mileage') ? parseInt(formData.get('mileage') as string) : undefined,
        cost: formData.get('cost') ? parseFloat(formData.get('cost') as string) : undefined,
        description: (formData.get('description') as string) || undefined,
        next_service_due: (formData.get('next_service_due') as string) || undefined,
        next_service_mileage: formData.get('next_service_mileage')
          ? parseInt(formData.get('next_service_mileage') as string)
          : undefined,
        notes: (formData.get('notes') as string) || undefined,
      },
      {
        onSuccess: () => setViewMode('history'),
      }
    );
  };

  const handleDelete = (service: VehicleService) => {
    if (
      confirm(
        `Delete this ${SERVICE_TYPES.find((t) => t.value === service.service_type)?.label} record?`
      )
    ) {
      deleteService.mutate({ id: service.id, vehicleId: vehicle.id });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Service history"
          title={
            <span className="inline-flex items-center gap-2">
              <Settings className="h-5 w-5 text-purple-400" />
              Service History
            </span>
          }
          description={`${vehicle.registration} — ${vehicle.make} ${vehicle.model}`}
        >
          {/* Stats Overview */}
          {stats && (
            <div className="grid grid-cols-3 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                <p className="text-lg font-bold text-white">{stats.totalServices}</p>
                <p className="text-xs text-white">Services</p>
              </div>
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                <p className="text-lg font-bold text-white">
                  £{stats.yearCosts.toLocaleString()}
                </p>
                <p className="text-xs text-white">This year</p>
              </div>
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                {stats.nextServiceDue ? (
                  <>
                    <p className="text-lg font-bold text-white">
                      {new Date(stats.nextServiceDue).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                    <p className="text-xs text-white">Next due</p>
                  </>
                ) : (
                  <>
                    <p className="text-lg font-bold text-white">—</p>
                    <p className="text-xs text-white">Next due</p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Tab Toggle */}
          <div className="flex gap-1 p-1 bg-[hsl(0_0%_9%)] border border-white/[0.08] rounded-full">
            <button
              type="button"
              onClick={() => setViewMode('history')}
              className={cn(
                'flex-1 py-2 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                viewMode === 'history' || viewMode === 'add'
                  ? 'bg-elec-yellow text-black'
                  : 'text-white'
              )}
            >
              History
            </button>
            <button
              type="button"
              onClick={() => setViewMode('costs')}
              className={cn(
                'flex-1 py-2 rounded-full text-[12.5px] font-medium transition-colors touch-manipulation',
                viewMode === 'costs' ? 'bg-elec-yellow text-black' : 'text-white'
              )}
            >
              Cost analysis
            </button>
          </div>

          {viewMode === 'add' ? (
            <ServiceForm
              onSave={handleSave}
              onCancel={() => setViewMode('history')}
              isPending={createService.isPending}
              currentMileage={vehicle.mileage}
            />
          ) : viewMode === 'costs' ? (
            <CostAnalysisView costs={costs} />
          ) : (
            <>
              <PrimaryButton fullWidth onClick={() => setViewMode('add')}>
                <Plus className="h-5 w-5 mr-2" />
                Log service
              </PrimaryButton>

              {/* Service List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              ) : services.length === 0 ? (
                <div className="text-center py-12">
                  <Settings className="h-16 w-16 text-white mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-white">No services recorded</p>
                  <p className="text-xs text-white mt-1">
                    Log services, MOTs, and repairs
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="p-4 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] touch-manipulation"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Pill tone="purple">
                              {SERVICE_TYPES.find((t) => t.value === service.service_type)?.label}
                            </Pill>
                            {service.cost && (
                              <Pill tone="yellow">£{service.cost.toLocaleString()}</Pill>
                            )}
                          </div>
                          <p className="text-base text-white mt-1.5 font-medium">
                            {new Date(service.service_date).toLocaleDateString('en-GB', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </p>
                        </div>
                        <button
                          type="button"
                          aria-label="Delete service"
                          className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-red-400 flex items-center justify-center hover:bg-red-500/15 transition-colors touch-manipulation"
                          onClick={() => handleDelete(service)}
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>

                      {service.provider && (
                        <p className="text-sm text-white">{service.provider}</p>
                      )}

                      {service.mileage && (
                        <p className="text-sm text-white">
                          Mileage: {service.mileage.toLocaleString()}
                        </p>
                      )}

                      {service.description && (
                        <p className="text-sm text-white mt-2">{service.description}</p>
                      )}

                      {service.next_service_due && (
                        <div className="mt-3 p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                          <p className="text-sm text-purple-400">
                            <Calendar className="h-4 w-4 inline mr-1.5" />
                            Next due:{' '}
                            {new Date(service.next_service_due).toLocaleDateString('en-GB')}
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
        </SheetShell>
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
      <FormCard eyebrow="Service details">
        <FormGrid cols={2}>
          <Field label="Service type" required>
            <Select name="service_type" required>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {SERVICE_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Date" required>
            <Input
              name="service_date"
              type="date"
              defaultValue={new Date().toISOString().split('T')[0]}
              required
              className={inputClass}
            />
          </Field>
        </FormGrid>
        <FormGrid cols={2}>
          <Field label="Provider">
            <Input
              name="provider"
              placeholder="e.g. Kwik Fit"
              className={inputClass}
            />
          </Field>
          <Field label="Cost (£)">
            <Input
              name="cost"
              type="number"
              step="0.01"
              placeholder="0.00"
              className={inputClass}
            />
          </Field>
        </FormGrid>
        <Field label="Mileage at service">
          <Input
            name="mileage"
            type="number"
            defaultValue={currentMileage}
            placeholder="e.g. 45000"
            className={inputClass}
          />
        </Field>
        <Field label="Description">
          <Textarea
            name="description"
            placeholder="What was done..."
            className={textareaClass}
          />
        </Field>
      </FormCard>

      <FormCard eyebrow="Next service">
        <FormGrid cols={2}>
          <Field label="Due date">
            <Input
              name="next_service_due"
              type="date"
              className={inputClass}
            />
          </Field>
          <Field label="Due mileage">
            <Input
              name="next_service_mileage"
              type="number"
              placeholder="e.g. 55000"
              className={inputClass}
            />
          </Field>
        </FormGrid>
      </FormCard>

      <FormCard eyebrow="Notes">
        <Field label="Notes">
          <Textarea
            name="notes"
            placeholder="Any additional notes..."
            className={textareaClass}
          />
        </Field>
      </FormCard>

      <div className="flex gap-3 pt-2">
        <SecondaryButton fullWidth onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton fullWidth type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Save service'}
        </PrimaryButton>
      </div>
    </form>
  );
}

// Cost Analysis View
function CostAnalysisView({ costs }: { costs: ReturnType<typeof useCostAnalysis>['data'] }) {
  if (!costs) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20">
          <div className="flex items-center gap-2 mb-2">
            <PoundSterling className="h-5 w-5 text-purple-400" />
            <span className="text-sm text-white">Total costs</span>
          </div>
          <p className="text-2xl font-bold text-white">£{costs.totalCost.toLocaleString()}</p>
          <div className="flex flex-col gap-1 mt-2 text-sm text-white">
            <span>Services: £{costs.totalServiceCost.toLocaleString()}</span>
            <span>Fuel: £{costs.totalFuelCost.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <span className="text-sm text-white">Cost per mile</span>
          </div>
          <p className="text-2xl font-bold text-white">
            {costs.costPerMile > 0 ? `${costs.costPerMile.toFixed(2)}p` : '—'}
          </p>
          <p className="text-sm text-white mt-2">
            {costs.milesDriven.toLocaleString()} miles tracked
          </p>
        </div>
      </div>

      {/* Current Mileage */}
      <FormCard eyebrow="Current mileage">
        <div className="flex items-center gap-2 mb-1">
          <Gauge className="h-5 w-5 text-white" />
          <span className="text-sm text-white">Odometer</span>
        </div>
        <p className="text-xl font-bold text-white">
          {costs.currentMileage?.toLocaleString() || '—'} miles
        </p>
      </FormCard>

      {/* Monthly Breakdown */}
      <FormCard eyebrow="Monthly costs (12 months)">
        <div className="space-y-3">
          {costs.monthlyCosts.map((month, index) => {
            const maxTotal = Math.max(...costs.monthlyCosts.map((m) => m.total));
            const barWidth = maxTotal > 0 ? (month.total / maxTotal) * 100 : 0;

            return (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-white w-16">{month.month}</span>
                <div className="flex-1 h-8 bg-white/[0.04] border border-white/[0.06] rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-purple-500/50 transition-all"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className="text-sm text-white w-16 text-right font-medium">
                  £{month.total.toFixed(0)}
                </span>
              </div>
            );
          })}
        </div>
      </FormCard>
    </div>
  );
}
