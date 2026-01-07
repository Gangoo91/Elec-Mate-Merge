import { useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ShieldAlert, Loader2 } from "lucide-react";
import { peerBlockService } from "@/services/peerSupportService";
import { toast } from "@/hooks/use-toast";

interface BlockUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
  userName?: string;
  conversationId?: string;
  onBlocked?: () => void;
  onAlsoReport?: () => void;
}

export function BlockUserDialog({
  open,
  onOpenChange,
  userId,
  userName = "this user",
  onBlocked,
  onAlsoReport,
}: BlockUserDialogProps) {
  const [alsoReport, setAlsoReport] = useState(false);
  const [isBlocking, setIsBlocking] = useState(false);

  const handleBlock = async () => {
    setIsBlocking(true);
    try {
      await peerBlockService.blockUser(userId);
      toast({
        title: "User blocked",
        description: `${userName} has been blocked. You won't see messages from them anymore.`,
      });
      onOpenChange(false);
      onBlocked?.();

      // If user checked "also report", trigger the report dialog
      if (alsoReport && onAlsoReport) {
        setTimeout(() => onAlsoReport(), 200);
      }
    } catch (error) {
      console.error("Error blocking user:", error);
      toast({
        title: "Failed to block user",
        description: "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsBlocking(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[340px] rounded-2xl">
        <AlertDialogHeader>
          <div className="mx-auto mb-2 p-3 rounded-full bg-red-500/10">
            <ShieldAlert className="h-6 w-6 text-red-500" />
          </div>
          <AlertDialogTitle className="text-center">
            Block {userName}?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Blocking will:
            <ul className="mt-2 text-left space-y-1 text-sm">
              <li>• Hide all messages from {userName}</li>
              <li>• Prevent them from messaging you</li>
              <li>• Remove them from your conversations</li>
            </ul>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="flex items-center space-x-2 py-2">
          <Checkbox
            id="also-report"
            checked={alsoReport}
            onCheckedChange={(checked) => setAlsoReport(checked === true)}
          />
          <Label
            htmlFor="also-report"
            className="text-sm text-muted-foreground cursor-pointer"
          >
            Also report this user to admins
          </Label>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="w-full sm:w-auto">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleBlock}
            disabled={isBlocking}
            className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white"
          >
            {isBlocking ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Blocking...
              </>
            ) : (
              "Block User"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
