import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateTool, CreateToolData } from "@/hooks/useCompanyTools";
import { Loader2 } from "lucide-react";

interface CreateToolDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  "Testing",
  "Power Tools",
  "Hand Tools",
  "Access Equipment",
  "Safety Equipment",
  "Site Equipment",
  "Other",
];

const STATUSES = [
  "Available",
  "In Use",
  "On Hire",
  "Under Repair",
];

export function CreateToolDialog({ open, onOpenChange }: CreateToolDialogProps) {
  const createTool = useCreateTool();

  const [formData, setFormData] = useState<CreateToolData>({
    name: "",
    category: "",
    serial_number: "",
    purchase_date: "",
    purchase_price: 0,
    assigned_to: "",
    status: "Available",
    pat_date: "",
    pat_due: "",
    last_calibration: "",
    next_calibration: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category) {
      return;
    }

    // Clean up empty strings to null/undefined
    const cleanedData: CreateToolData = {
      name: formData.name,
      category: formData.category,
      status: formData.status || "Available",
    };

    if (formData.serial_number?.trim()) cleanedData.serial_number = formData.serial_number;
    if (formData.purchase_date) cleanedData.purchase_date = formData.purchase_date;
    if (formData.purchase_price && formData.purchase_price > 0) cleanedData.purchase_price = formData.purchase_price;
    if (formData.assigned_to?.trim()) cleanedData.assigned_to = formData.assigned_to;
    if (formData.pat_date) cleanedData.pat_date = formData.pat_date;
    if (formData.pat_due) cleanedData.pat_due = formData.pat_due;
    if (formData.last_calibration) cleanedData.last_calibration = formData.last_calibration;
    if (formData.next_calibration) cleanedData.next_calibration = formData.next_calibration;
    if (formData.notes?.trim()) cleanedData.notes = formData.notes;

    try {
      await createTool.mutateAsync(cleanedData);
      onOpenChange(false);
      setFormData({
        name: "",
        category: "",
        serial_number: "",
        purchase_date: "",
        purchase_price: 0,
        assigned_to: "",
        status: "Available",
        pat_date: "",
        pat_due: "",
        last_calibration: "",
        next_calibration: "",
        notes: "",
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const updateField = (field: keyof CreateToolData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Equipment</DialogTitle>
          <DialogDescription>
            Add a new tool or piece of equipment to the inventory.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Equipment Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Fluke 1664FC"
                value={formData.name}
                onChange={(e) => updateField("name", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => updateField("status", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="serial_number">Serial Number</Label>
                <Input
                  id="serial_number"
                  placeholder="e.g., FL-12345678"
                  value={formData.serial_number}
                  onChange={(e) => updateField("serial_number", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assigned_to">Assigned To</Label>
                <Input
                  id="assigned_to"
                  placeholder="e.g., James Wilson"
                  value={formData.assigned_to}
                  onChange={(e) => updateField("assigned_to", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="purchase_date">Purchase Date</Label>
                <Input
                  id="purchase_date"
                  type="date"
                  value={formData.purchase_date}
                  onChange={(e) => updateField("purchase_date", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchase_price">Purchase Price (£)</Label>
                <Input
                  id="purchase_price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  value={formData.purchase_price || ""}
                  onChange={(e) => updateField("purchase_price", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">PAT Testing</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="pat_date">Last PAT Date</Label>
                  <Input
                    id="pat_date"
                    type="date"
                    value={formData.pat_date}
                    onChange={(e) => updateField("pat_date", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pat_due">PAT Due Date</Label>
                  <Input
                    id="pat_due"
                    type="date"
                    value={formData.pat_due}
                    onChange={(e) => updateField("pat_due", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <p className="text-sm font-medium mb-3">Calibration (if applicable)</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="last_calibration">Last Calibration</Label>
                  <Input
                    id="last_calibration"
                    type="date"
                    value={formData.last_calibration}
                    onChange={(e) => updateField("last_calibration", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="next_calibration">Next Calibration Due</Label>
                  <Input
                    id="next_calibration"
                    type="date"
                    value={formData.next_calibration}
                    onChange={(e) => updateField("next_calibration", e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes..."
                value={formData.notes}
                onChange={(e) => updateField("notes", e.target.value)}
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createTool.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createTool.isPending}>
              {createTool.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add Equipment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
