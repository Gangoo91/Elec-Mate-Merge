import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { IdCard, Award, Loader2 } from "lucide-react";
import { useCreateElecIdProfile } from "@/hooks/useElecId";
import { toast } from "@/hooks/use-toast";

interface CreateElecIDForEmployeeDialogProps {
  employeeId: string;
  employeeName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const ECS_CARD_TYPES = [
  { value: "gold", label: "Gold Card (Electrician)" },
  { value: "blue", label: "Blue Card (Approved Electrician)" },
  { value: "black", label: "Black Card (Senior/Manager)" },
  { value: "white", label: "White Card (Trainee)" },
  { value: "green", label: "Green Card (Labourer)" },
];

export function CreateElecIDForEmployeeDialog({
  employeeId,
  employeeName,
  open,
  onOpenChange,
  onSuccess,
}: CreateElecIDForEmployeeDialogProps) {
  const createProfile = useCreateElecIdProfile();
  
  const [formData, setFormData] = useState({
    ecsCardType: "gold",
    ecsCardNumber: "",
    ecsExpiryDate: "",
    bio: "",
    specialisations: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createProfile.mutateAsync({
        employee_id: employeeId,
        ecs_card_type: formData.ecsCardType,
        ecs_card_number: formData.ecsCardNumber || null,
        ecs_expiry_date: formData.ecsExpiryDate || null,
        bio: formData.bio || null,
        specialisations: formData.specialisations
          ? formData.specialisations.split(",").map((s) => s.trim())
          : null,
      });

      toast({
        title: "Elec-ID Created",
        description: `Elec-ID profile created for ${employeeName}`,
      });

      onOpenChange(false);
      onSuccess?.();

      // Reset form
      setFormData({
        ecsCardType: "gold",
        ecsCardNumber: "",
        ecsExpiryDate: "",
        bio: "",
        specialisations: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create Elec-ID profile",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-elec-yellow/10 flex items-center justify-center">
              <IdCard className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <DialogTitle>Create Elec-ID</DialogTitle>
              <DialogDescription>
                Set up digital ID for {employeeName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* ECS Card Type */}
          <div className="space-y-2">
            <Label>ECS Card Type</Label>
            <Select
              value={formData.ecsCardType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, ecsCardType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ECS_CARD_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-warning" />
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ECS Card Number */}
          <div className="space-y-2">
            <Label>ECS Card Number</Label>
            <Input
              placeholder="e.g. ECS123456"
              value={formData.ecsCardNumber}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ecsCardNumber: e.target.value }))
              }
            />
          </div>

          {/* Expiry Date */}
          <div className="space-y-2">
            <Label>Card Expiry Date</Label>
            <Input
              type="date"
              value={formData.ecsExpiryDate}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, ecsExpiryDate: e.target.value }))
              }
            />
          </div>

          {/* Specialisations */}
          <div className="space-y-2">
            <Label>Specialisations</Label>
            <Input
              placeholder="e.g. Commercial, Industrial, Solar (comma separated)"
              value={formData.specialisations}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, specialisations: e.target.value }))
              }
            />
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label>Bio</Label>
            <Textarea
              placeholder="Brief professional summary..."
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows={3}
            />
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={createProfile.isPending}
            >
              {createProfile.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <IdCard className="h-4 w-4 mr-2" />
                  Create Elec-ID
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
