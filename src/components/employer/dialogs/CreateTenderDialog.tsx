import { useState, useEffect } from "react";
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
import { Loader2, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface CreateTenderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: Partial<CreateTenderData> & { fromOpportunity?: boolean };
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

const emptyFormData: CreateTenderData = {
  title: "",
  client: "",
  value: 0,
  deadline: "",
  category: "",
  description: "",
  contact_name: "",
  contact_email: "",
  notes: "",
};

export function CreateTenderDialog({ open, onOpenChange, initialData }: CreateTenderDialogProps) {
  const createTender = useCreateTender();

  const [formData, setFormData] = useState<CreateTenderData>(emptyFormData);
  const [isFromOpportunity, setIsFromOpportunity] = useState(false);

  // Update form when initialData changes
  useEffect(() => {
    if (open && initialData) {
      setFormData({
        ...emptyFormData,
        ...initialData,
      });
      setIsFromOpportunity(!!initialData.fromOpportunity);
    } else if (!open) {
      // Reset when dialog closes
      setFormData(emptyFormData);
      setIsFromOpportunity(false);
    }
  }, [open, initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.client.trim()) {
      return;
    }

    try {
      await createTender.mutateAsync(formData);
      onOpenChange(false);
      setFormData(emptyFormData);
      setIsFromOpportunity(false);
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
          <DialogTitle className="flex items-center gap-2">
            {isFromOpportunity ? 'Start Tender Application' : 'Track New Tender'}
            {isFromOpportunity && (
              <Badge variant="outline" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30">
                From Discovery
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {isFromOpportunity
              ? 'Review and confirm tender details before tracking.'
              : 'Add a new tender opportunity to track.'}
          </DialogDescription>
          {formData.source_url && (
            <a
              href={formData.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-400 hover:underline mt-1"
            >
              <ExternalLink className="h-3 w-3" />
              View original listing
            </a>
          )}
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
                className="h-11 text-base touch-manipulation"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="client">Client / Organisation *</Label>
              <Input
                id="client"
                placeholder="e.g., ABC Corporation"
                value={formData.client}
                onChange={(e) => updateField("client", e.target.value)}
                className="h-11 text-base touch-manipulation"
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
                  className="h-11 text-base touch-manipulation"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="deadline">Submission Deadline</Label>
                <Input
                  id="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => updateField("deadline", e.target.value)}
                  className="h-11 text-base touch-manipulation"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateField("category", value)}
              >
                <SelectTrigger className="h-11 touch-manipulation">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="z-[100]">
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
                className="text-base touch-manipulation min-h-[100px]"
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
                  className="h-11 text-base touch-manipulation"
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
                  className="h-11 text-base touch-manipulation"
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
                className="text-base touch-manipulation"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={createTender.isPending}
              className="h-11 touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createTender.isPending}
              className="h-11 touch-manipulation bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
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
