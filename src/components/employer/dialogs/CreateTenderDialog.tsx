import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCreateTender, CreateTenderData } from "@/hooks/useTenders";
import { Loader2, ExternalLink, Plus, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
      // Reset when sheet closes
      setFormData(emptyFormData);
      setIsFromOpportunity(false);
    }
  }, [open, initialData]);

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.client.trim()) {
      toast.error('Title and client are required');
      return;
    }

    try {
      await createTender.mutateAsync(formData);
      toast.success('Tender tracked successfully');
      onOpenChange(false);
      // Reset form after successful creation
      setFormData(emptyFormData);
      setIsFromOpportunity(false);
    } catch (error: any) {
      // Don't close sheet on error - let user retry
      toast.error(error?.message || 'Failed to track tender. Please try again.');
    }
  };

  const updateField = (field: keyof CreateTenderData, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isValid = formData.title.trim() && formData.client.trim();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          {/* Drag indicator */}
          <div className="flex justify-center py-3">
            <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
          </div>

          {/* Header */}
          <SheetHeader className="px-4 pb-3 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-elec-yellow/20">
                <FileText className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="flex-1">
                <SheetTitle className="text-lg text-foreground flex items-center gap-2">
                  {isFromOpportunity ? 'Start Tender Application' : 'Track New Tender'}
                  {isFromOpportunity && (
                    <Badge variant="outline" className="bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30 text-xs">
                      From Discovery
                    </Badge>
                  )}
                </SheetTitle>
                <SheetDescription className="text-white/70 text-sm">
                  {isFromOpportunity
                    ? 'Review and confirm tender details before tracking.'
                    : 'Add a new tender opportunity to track.'}
                </SheetDescription>
              </div>
            </div>
            {formData.source_url && (
              <a
                href={formData.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-blue-400 hover:underline mt-2 touch-manipulation"
              >
                <ExternalLink className="h-3 w-3" />
                View original listing
              </a>
            )}
          </SheetHeader>

          {/* Form Content */}
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-foreground">Tender Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Office Building Rewire"
                  value={formData.title}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="client" className="text-foreground">Client / Organisation *</Label>
                <Input
                  id="client"
                  placeholder="e.g., ABC Corporation"
                  value={formData.client}
                  onChange={(e) => updateField("client", e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value" className="text-foreground">Estimated Value</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50">£</span>
                    <Input
                      id="value"
                      type="number"
                      min="0"
                      step="1000"
                      placeholder="0"
                      value={formData.value || ""}
                      onChange={(e) => updateField("value", parseFloat(e.target.value) || 0)}
                      className="h-11 pl-7 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="deadline" className="text-foreground">Submission Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => updateField("deadline", e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-foreground">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateField("category", value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-background border-white/30 focus:border-elec-yellow focus:ring-elec-yellow data-[state=open]:border-elec-yellow data-[state=open]:ring-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-card border-white/20">
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Brief description of the tender scope..."
                  value={formData.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contact_name" className="text-foreground">Contact Name</Label>
                  <Input
                    id="contact_name"
                    placeholder="John Smith"
                    value={formData.contact_name}
                    onChange={(e) => updateField("contact_name", e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact_email" className="text-foreground">Contact Email</Label>
                  <Input
                    id="contact_email"
                    type="email"
                    placeholder="john@company.com"
                    value={formData.contact_email}
                    onChange={(e) => updateField("contact_email", e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes" className="text-foreground">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes..."
                  value={formData.notes}
                  onChange={(e) => updateField("notes", e.target.value)}
                  className="text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow focus:ring-2 focus:ring-elec-yellow/20"
                  rows={2}
                />
              </div>

              {/* Spacer for footer */}
              <div className="h-24" />
            </div>
          </ScrollArea>

          {/* Fixed Footer */}
          <div className="absolute bottom-0 left-0 right-0 p-4 pb-safe bg-background/95 backdrop-blur border-t border-white/10">
            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createTender.isPending}
                className="flex-1 h-12 touch-manipulation active:scale-[0.98] transition-transform border-white/20"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createTender.isPending || !isValid}
                className="flex-1 h-12 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] transition-transform font-semibold"
              >
                {createTender.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                Track Tender
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
