import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Wrench, Plus, Search, Trash2, Edit, Loader2, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  useVehicleTools,
  useToolStats,
  useCreateTool,
  useUpdateTool,
  useDeleteTool,
  TOOL_CATEGORIES,
  TOOL_CONDITIONS,
  type VehicleTool,
  type ToolCategory,
  type ToolCondition,
} from '@/hooks/useVehicleTools';
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

interface VehicleToolsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

export function VehicleToolsSheet({ open, onOpenChange, vehicle }: VehicleToolsSheetProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTool, setEditingTool] = useState<VehicleTool | null>(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [toolToDelete, setToolToDelete] = useState<VehicleTool | null>(null);

  const { data: tools = [], isLoading } = useVehicleTools(vehicle.id);
  const { data: stats } = useToolStats(vehicle.id);
  const createTool = useCreateTool();
  const updateTool = useUpdateTool();
  const deleteTool = useDeleteTool();

  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.make?.toLowerCase().includes(search.toLowerCase()) ||
      tool.model?.toLowerCase().includes(search.toLowerCase()) ||
      tool.serial_number?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = (formData: FormData) => {
    const data = {
      vehicle_id: vehicle.id,
      name: formData.get('name') as string,
      category: (formData.get('category') as ToolCategory) || undefined,
      make: (formData.get('make') as string) || undefined,
      model: (formData.get('model') as string) || undefined,
      serial_number: (formData.get('serial_number') as string) || undefined,
      value: formData.get('value') ? parseFloat(formData.get('value') as string) : undefined,
      calibration_due: (formData.get('calibration_due') as string) || undefined,
      pat_test_due: (formData.get('pat_test_due') as string) || undefined,
      condition: (formData.get('condition') as ToolCondition) || 'good',
      notes: (formData.get('notes') as string) || undefined,
    };

    if (editingTool) {
      updateTool.mutate(
        { id: editingTool.id, ...data },
        {
          onSuccess: () => {
            setEditingTool(null);
            setShowAddForm(false);
          },
        }
      );
    } else {
      createTool.mutate(data, {
        onSuccess: () => {
          setShowAddForm(false);
        },
      });
    }
  };

  const handleDelete = (tool: VehicleTool) => {
    setToolToDelete(tool);
  };

  const confirmDelete = () => {
    if (toolToDelete) {
      deleteTool.mutate({ id: toolToDelete.id, vehicleId: vehicle.id });
      setToolToDelete(null);
    }
  };

  const getConditionTone = (condition: ToolCondition): 'green' | 'amber' | 'orange' | 'red' => {
    switch (condition) {
      case 'good':
        return 'green';
      case 'fair':
        return 'amber';
      case 'needs_repair':
        return 'orange';
      case 'out_of_service':
        return 'red';
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 overflow-hidden">
        <SheetShell
          eyebrow="Tool inventory"
          title={
            <span className="inline-flex items-center gap-2">
              <Wrench className="h-5 w-5 text-orange-400" />
              Tool Inventory
            </span>
          }
          description={`${vehicle.registration} — ${vehicle.make} ${vehicle.model}`}
        >
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] rounded-2xl overflow-hidden">
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                <p className="text-lg font-bold text-white">{stats.totalCount}</p>
                <p className="text-xs text-white">Tools</p>
              </div>
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                <p className="text-lg font-bold text-white">
                  £{stats.totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-white">Value</p>
              </div>
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                <p
                  className={cn(
                    'text-lg font-bold',
                    stats.calibrationDue > 0 ? 'text-orange-400' : 'text-white'
                  )}
                >
                  {stats.calibrationDue}
                </p>
                <p className="text-xs text-white">Cal due</p>
              </div>
              <div className="bg-[hsl(0_0%_12%)] p-3 text-center">
                <p
                  className={cn(
                    'text-lg font-bold',
                    stats.needsRepair > 0 ? 'text-red-400' : 'text-white'
                  )}
                >
                  {stats.needsRepair}
                </p>
                <p className="text-xs text-white">Repairs</p>
              </div>
            </div>
          )}

          {showAddForm || editingTool ? (
            <ToolForm
              tool={editingTool}
              onSave={handleSave}
              onCancel={() => {
                setShowAddForm(false);
                setEditingTool(null);
              }}
              isPending={createTool.isPending || updateTool.isPending}
            />
          ) : (
            <>
              {/* Search & Filter */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  {!search && (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white pointer-events-none" />
                  )}
                  <Input
                    placeholder="Search tools..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={cn(inputClass, !search && 'pl-9')}
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className={cn(selectTriggerClass, 'w-[130px]')}>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="all">All</SelectItem>
                    {TOOL_CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <PrimaryButton fullWidth onClick={() => setShowAddForm(true)}>
                <Plus className="h-5 w-5 mr-2" />
                Add tool
              </PrimaryButton>

              {/* Tool List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-white" />
                </div>
              ) : filteredTools.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="h-16 w-16 text-white mx-auto mb-4 opacity-50" />
                  <p className="text-sm text-white">
                    {tools.length === 0 ? 'No tools added yet' : 'No matching tools'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTools.map((tool) => (
                    <div
                      key={tool.id}
                      className="p-4 rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] touch-manipulation"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-white text-base">{tool.name}</h4>
                          {(tool.make || tool.model) && (
                            <p className="text-sm text-white">
                              {[tool.make, tool.model].filter(Boolean).join(' ')}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          <button
                            type="button"
                            aria-label="Edit tool"
                            className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors touch-manipulation"
                            onClick={() => setEditingTool(tool)}
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            aria-label="Delete tool"
                            className="h-11 w-11 rounded-full bg-white/[0.04] border border-white/[0.08] text-red-400 flex items-center justify-center hover:bg-red-500/15 transition-colors touch-manipulation"
                            onClick={() => handleDelete(tool)}
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-2">
                        {tool.category && (
                          <Pill tone="yellow">
                            {TOOL_CATEGORIES.find((c) => c.value === tool.category)?.label}
                          </Pill>
                        )}
                        <Pill tone={getConditionTone(tool.condition)}>
                          {TOOL_CONDITIONS.find((c) => c.value === tool.condition)?.label}
                        </Pill>
                        {tool.value && <Pill tone="blue">£{tool.value.toLocaleString()}</Pill>}
                      </div>

                      {tool.serial_number && (
                        <p className="text-sm text-white mb-1">S/N: {tool.serial_number}</p>
                      )}

                      {(tool.calibration_due || tool.pat_test_due) && (
                        <div className="flex gap-3 text-sm mt-2">
                          {tool.calibration_due && (
                            <span
                              className={cn(
                                'px-2 py-1 rounded-lg',
                                tool.calibration_due <= new Date().toISOString().split('T')[0]
                                  ? 'bg-red-500/10 text-red-400'
                                  : tool.calibration_due <=
                                      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                        .toISOString()
                                        .split('T')[0]
                                    ? 'bg-orange-500/10 text-orange-400'
                                    : 'bg-white/[0.04] text-white'
                              )}
                            >
                              Cal: {new Date(tool.calibration_due).toLocaleDateString('en-GB')}
                            </span>
                          )}
                          {tool.pat_test_due && (
                            <span
                              className={cn(
                                'px-2 py-1 rounded-lg',
                                tool.pat_test_due <= new Date().toISOString().split('T')[0]
                                  ? 'bg-red-500/10 text-red-400'
                                  : tool.pat_test_due <=
                                      new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                                        .toISOString()
                                        .split('T')[0]
                                    ? 'bg-orange-500/10 text-orange-400'
                                    : 'bg-white/[0.04] text-white'
                              )}
                            >
                              PAT: {new Date(tool.pat_test_due).toLocaleDateString('en-GB')}
                            </span>
                          )}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!toolToDelete} onOpenChange={() => setToolToDelete(null)}>
        <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Remove tool?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              Are you sure you want to remove "{toolToDelete?.name}" from this vehicle? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel asChild>
              <SecondaryButton>Cancel</SecondaryButton>
            </AlertDialogCancel>
            <AlertDialogAction asChild>
              <DestructiveButton onClick={confirmDelete}>Remove</DestructiveButton>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Sheet>
  );
}

// Tool Form Component
function ToolForm({
  tool,
  onSave,
  onCancel,
  isPending,
}: {
  tool: VehicleTool | null;
  onSave: (formData: FormData) => void;
  onCancel: () => void;
  isPending: boolean;
}) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSave(new FormData(e.currentTarget));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormCard eyebrow={tool ? 'Edit tool' : 'New tool'}>
        <Field label="Tool name" required>
          <Input
            name="name"
            defaultValue={tool?.name}
            placeholder="e.g. Megger MFT1741"
            required
            className={inputClass}
          />
        </Field>

        <FormGrid cols={2}>
          <Field label="Category">
            <Select name="category" defaultValue={tool?.category}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select..." />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {TOOL_CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
          <Field label="Condition">
            <Select name="condition" defaultValue={tool?.condition || 'good'}>
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={selectContentClass}>
                {TOOL_CONDITIONS.map((cond) => (
                  <SelectItem key={cond.value} value={cond.value}>
                    {cond.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </FormGrid>

        <FormGrid cols={2}>
          <Field label="Make">
            <Input
              name="make"
              defaultValue={tool?.make}
              placeholder="e.g. Megger"
              className={inputClass}
            />
          </Field>
          <Field label="Model">
            <Input
              name="model"
              defaultValue={tool?.model}
              placeholder="e.g. MFT1741"
              className={inputClass}
            />
          </Field>
        </FormGrid>

        <FormGrid cols={2}>
          <Field label="Serial number">
            <Input
              name="serial_number"
              defaultValue={tool?.serial_number}
              placeholder="S/N"
              className={inputClass}
            />
          </Field>
          <Field label="Value (£)">
            <Input
              name="value"
              type="number"
              step="0.01"
              defaultValue={tool?.value}
              placeholder="0.00"
              className={inputClass}
            />
          </Field>
        </FormGrid>

        <FormGrid cols={2}>
          <Field label="Calibration due">
            <Input
              name="calibration_due"
              type="date"
              defaultValue={tool?.calibration_due}
              className={inputClass}
            />
          </Field>
          <Field label="PAT test due">
            <Input
              name="pat_test_due"
              type="date"
              defaultValue={tool?.pat_test_due}
              className={inputClass}
            />
          </Field>
        </FormGrid>

        <Field label="Notes">
          <Textarea
            name="notes"
            defaultValue={tool?.notes}
            placeholder="Any additional notes..."
            className={cn(textareaClass, 'min-h-[100px]')}
          />
        </Field>
      </FormCard>

      <div className="flex gap-3 pt-2">
        <SecondaryButton fullWidth onClick={onCancel}>
          Cancel
        </SecondaryButton>
        <PrimaryButton type="submit" fullWidth disabled={isPending}>
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : tool ? (
            'Save changes'
          ) : (
            'Add tool'
          )}
        </PrimaryButton>
      </div>
    </form>
  );
}
