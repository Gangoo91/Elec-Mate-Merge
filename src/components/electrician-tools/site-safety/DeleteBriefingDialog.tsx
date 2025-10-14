import { useState } from "react";
import { Trash2 } from "lucide-react";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface DeleteBriefingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  briefing: any;
  onSuccess: () => void;
}

export const DeleteBriefingDialog = ({
  open,
  onOpenChange,
  briefing,
  onSuccess,
}: DeleteBriefingDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('team_briefings')
        .delete()
        .eq('id', briefing.id);

      if (error) throw error;

      toast({
        title: "Briefing Deleted",
        description: "The briefing has been permanently deleted.",
      });
      
      onSuccess();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error deleting briefing:', error);
      toast({
        title: "Error",
        description: "Failed to delete briefing",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfirmationDialog
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Briefing?"
      description={`Are you sure you want to permanently delete "${briefing?.briefing_name || briefing?.job_name}"? This action cannot be undone.`}
      confirmText="Delete Permanently"
      cancelText="Keep Briefing"
      onConfirm={handleDelete}
      variant="destructive"
      loading={loading}
    />
  );
};
