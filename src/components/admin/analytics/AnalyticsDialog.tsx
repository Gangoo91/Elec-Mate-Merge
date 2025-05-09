
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import GoogleAnalyticsSetup from "@/components/admin/GoogleAnalyticsSetup";

const AnalyticsDialog = () => {
  return (
    <DialogContent className="w-full max-w-3xl h-[90vh] overflow-hidden flex flex-col">
      <DialogHeader className="mb-4">
        <DialogTitle>Google Analytics Configuration</DialogTitle>
        <DialogDescription>
          Set up and configure Google Analytics for enhanced tracking capabilities
        </DialogDescription>
      </DialogHeader>
      <div className="flex-1 overflow-auto">
        <GoogleAnalyticsSetup />
      </div>
    </DialogContent>
  );
};

export default AnalyticsDialog;
