import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Wrench,
  X,
  Plus,
  Search,
  Trash2,
  Edit,
  Loader2,
  Package,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
} from "@/hooks/useVehicleTools";
import type { Vehicle } from "@/hooks/useFleet";

interface VehicleToolsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vehicle: Vehicle;
}

export function VehicleToolsSheet({
  open,
  onOpenChange,
  vehicle,
}: VehicleToolsSheetProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTool, setEditingTool] = useState<VehicleTool | null>(null);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState<string>("all");
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
    const matchesCategory = filterCategory === "all" || tool.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSave = (formData: FormData) => {
    const data = {
      vehicle_id: vehicle.id,
      name: formData.get("name") as string,
      category: (formData.get("category") as ToolCategory) || undefined,
      make: (formData.get("make") as string) || undefined,
      model: (formData.get("model") as string) || undefined,
      serial_number: (formData.get("serial_number") as string) || undefined,
      value: formData.get("value") ? parseFloat(formData.get("value") as string) : undefined,
      calibration_due: (formData.get("calibration_due") as string) || undefined,
      pat_test_due: (formData.get("pat_test_due") as string) || undefined,
      condition: (formData.get("condition") as ToolCondition) || "good",
      notes: (formData.get("notes") as string) || undefined,
    };

    if (editingTool) {
      updateTool.mutate({ id: editingTool.id, ...data }, {
        onSuccess: () => {
          setEditingTool(null);
          setShowAddForm(false);
        },
      });
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

  const getConditionColor = (condition: ToolCondition) => {
    switch (condition) {
      case "good":
        return "bg-green-500/20 text-green-400";
      case "fair":
        return "bg-yellow-500/20 text-yellow-400";
      case "needs_repair":
        return "bg-orange-500/20 text-orange-400";
      case "out_of_service":
        return "bg-red-500/20 text-red-400";
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
                <div className="p-2 rounded-xl bg-orange-500/10">
                  <Wrench className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <SheetTitle className="text-left">Tool Inventory</SheetTitle>
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

          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-4 gap-2 p-4 border-b border-border">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{stats.totalCount}</p>
                <p className="text-xs text-muted-foreground">Tools</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">
                  £{stats.totalValue.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">Value</p>
              </div>
              <div className="text-center">
                <p className={cn("text-lg font-bold", stats.calibrationDue > 0 ? "text-orange-400" : "text-foreground")}>
                  {stats.calibrationDue}
                </p>
                <p className="text-xs text-muted-foreground">Cal Due</p>
              </div>
              <div className="text-center">
                <p className={cn("text-lg font-bold", stats.needsRepair > 0 ? "text-red-400" : "text-foreground")}>
                  {stats.needsRepair}
                </p>
                <p className="text-xs text-muted-foreground">Repairs</p>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
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
                <div className="flex gap-2 mb-4">
                  <div className="relative flex-1">
                    {!search && (
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    )}
                    <Input
                      placeholder="Search tools..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={cn("h-11 touch-manipulation text-base", !search && "pl-9")}
                    />
                  </div>
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-[130px] h-11 touch-manipulation">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent className="z-[100]">
                      <SelectItem value="all">All</SelectItem>
                      {TOOL_CATEGORIES.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Add Button */}
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="w-full h-12 mb-4 bg-orange-600 hover:bg-orange-700 touch-manipulation text-base"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Tool
                </Button>

                {/* Tool List */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredTools.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-sm text-muted-foreground">
                      {tools.length === 0 ? "No tools added yet" : "No matching tools"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredTools.map((tool) => (
                      <div
                        key={tool.id}
                        className="p-4 rounded-xl border border-border bg-card/50 touch-manipulation"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground text-base">{tool.name}</h4>
                            {(tool.make || tool.model) && (
                              <p className="text-sm text-muted-foreground">
                                {[tool.make, tool.model].filter(Boolean).join(" ")}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-1 ml-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-11 w-11 touch-manipulation"
                              onClick={() => setEditingTool(tool)}
                            >
                              <Edit className="h-5 w-5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-11 w-11 touch-manipulation text-red-400"
                              onClick={() => handleDelete(tool)}
                            >
                              <Trash2 className="h-5 w-5" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-2">
                          {tool.category && (
                            <Badge variant="outline" className="text-xs">
                              {TOOL_CATEGORIES.find((c) => c.value === tool.category)?.label}
                            </Badge>
                          )}
                          <Badge className={cn("text-xs border-0", getConditionColor(tool.condition))}>
                            {TOOL_CONDITIONS.find((c) => c.value === tool.condition)?.label}
                          </Badge>
                          {tool.value && (
                            <Badge variant="outline" className="text-xs">
                              £{tool.value.toLocaleString()}
                            </Badge>
                          )}
                        </div>

                        {tool.serial_number && (
                          <p className="text-sm text-muted-foreground mb-1">
                            S/N: {tool.serial_number}
                          </p>
                        )}

                        {(tool.calibration_due || tool.pat_test_due) && (
                          <div className="flex gap-3 text-sm mt-2">
                            {tool.calibration_due && (
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-lg",
                                  tool.calibration_due <= new Date().toISOString().split("T")[0]
                                    ? "bg-red-500/10 text-red-400"
                                    : tool.calibration_due <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                                    ? "bg-orange-500/10 text-orange-400"
                                    : "bg-muted/50 text-muted-foreground"
                                )}
                              >
                                Cal: {new Date(tool.calibration_due).toLocaleDateString("en-GB")}
                              </span>
                            )}
                            {tool.pat_test_due && (
                              <span
                                className={cn(
                                  "px-2 py-1 rounded-lg",
                                  tool.pat_test_due <= new Date().toISOString().split("T")[0]
                                    ? "bg-red-500/10 text-red-400"
                                    : tool.pat_test_due <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
                                    ? "bg-orange-500/10 text-orange-400"
                                    : "bg-muted/50 text-muted-foreground"
                                )}
                              >
                                PAT: {new Date(tool.pat_test_due).toLocaleDateString("en-GB")}
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
          </div>
        </div>
      </SheetContent>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!toolToDelete} onOpenChange={() => setToolToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove Tool?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to remove "{toolToDelete?.name}" from this vehicle? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="h-11 touch-manipulation bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remove
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
      <div>
        <Label className="text-sm font-medium">Tool Name *</Label>
        <Input
          name="name"
          defaultValue={tool?.name}
          placeholder="e.g. Megger MFT1741"
          required
          className="h-11 mt-1.5 touch-manipulation text-base"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">Category</Label>
          <Select name="category" defaultValue={tool?.category}>
            <SelectTrigger className="h-11 mt-1.5 touch-manipulation">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              {TOOL_CATEGORIES.map((cat) => (
                <SelectItem key={cat.value} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-sm font-medium">Condition</Label>
          <Select name="condition" defaultValue={tool?.condition || "good"}>
            <SelectTrigger className="h-11 mt-1.5 touch-manipulation">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="z-[100]">
              {TOOL_CONDITIONS.map((cond) => (
                <SelectItem key={cond.value} value={cond.value}>
                  {cond.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">Make</Label>
          <Input
            name="make"
            defaultValue={tool?.make}
            placeholder="e.g. Megger"
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Model</Label>
          <Input
            name="model"
            defaultValue={tool?.model}
            placeholder="e.g. MFT1741"
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">Serial Number</Label>
          <Input
            name="serial_number"
            defaultValue={tool?.serial_number}
            placeholder="S/N"
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">Value (£)</Label>
          <Input
            name="value"
            type="number"
            step="0.01"
            defaultValue={tool?.value}
            placeholder="0.00"
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-sm font-medium">Calibration Due</Label>
          <Input
            name="calibration_due"
            type="date"
            defaultValue={tool?.calibration_due}
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
        <div>
          <Label className="text-sm font-medium">PAT Test Due</Label>
          <Input
            name="pat_test_due"
            type="date"
            defaultValue={tool?.pat_test_due}
            className="h-11 mt-1.5 touch-manipulation text-base"
          />
        </div>
      </div>

      <div>
        <Label className="text-sm font-medium">Notes</Label>
        <Textarea
          name="notes"
          defaultValue={tool?.notes}
          placeholder="Any additional notes..."
          className="mt-1.5 touch-manipulation text-base min-h-[100px]"
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-12 touch-manipulation text-base"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isPending}
          className="flex-1 h-12 bg-orange-600 hover:bg-orange-700 touch-manipulation text-base"
        >
          {isPending ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : tool ? (
            "Save Changes"
          ) : (
            "Add Tool"
          )}
        </Button>
      </div>
    </form>
  );
}
