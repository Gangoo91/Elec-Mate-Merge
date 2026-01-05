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
import { useCreateTender, CreateTenderData } from "@/hooks/useTenders";
import { Loader2 } from "lucide-react";

interface CreateTenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CATEGORIES = [
  "Commercial",
  "Residential",
  "Industrial",
  "Healthcare",
  "Education",
  "Retail",
  "Public Sector",
  "Other",
];

export function CreateTenderDialog({ open, onOpenChange }: CreateTenderDialogProps) {
  const createTender = useCreateTender();

  const [formData, setFormData] = useState<CreateTenderData>({
    title: "",
    client: "",
    value: 0,
    deadline: "",
    category: "",
    description: "",
    contact_name: "",
    contact_email: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.client.trim()) {
      return;
    }

    try {
      await createTender.mutateAsync(formData);
      onOpenChange(false);
      setFormData({
        title: "",
        client: "",
        value: 0,
        deadline: "",
        category: "",
        description: "",
        contact_name: "",
        contact_email: "",
        notes: "",
      });
    } catch (error) {
      // Error handled by mutation
    }
  };

  const updateField = (field: keyof CreateTenderData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Track New Tender</DialogTitle>
          <DialogDescription>
            Add a new tender opportunity to track.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Tender Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Office Building Rewire"
                value={formData.title}
                onChange={(e) => updateField("title", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client / Organization *</Label>
              <Input
                id="client"
                placeholder="e.g., ABC Corporation"
                value={formData.client}
                onChange={(e) => updateField("client", e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="value">Estimated Value (£)</Label>
                <Input
                  id="value"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="0"
                  value={formData.value || ""}
                  onChange={(e) => updateField("value", parseFloat(e.target.value) || 0)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Submission Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateField("deadline", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
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
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the tender scope..."
                value={formData.description}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact_name">Contact Name</Label>
                <Input
                  id="contact_name"
                  placeholder="John Smith"
                  value={formData.contact_name}
                  onChange={(e) => updateField("contact_name", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.contact_email}
                  onChange={(e) => updateField("contact_email", e.target.value)}
                />
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
              disabled={createTender.isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createTender.isPending}>
              {createTender.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Track Tender
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
