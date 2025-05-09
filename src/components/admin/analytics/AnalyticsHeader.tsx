
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  BarChart, 
  Settings,
  RefreshCw,
  Download
} from "lucide-react";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface AnalyticsHeaderProps {
  gaInitialized: boolean;
  refreshing: boolean;
  handleRefresh: () => void;
  handleExport: () => void;
  showGaSetup: boolean;
  setShowGaSetup: (show: boolean) => void;
}

const AnalyticsHeader = ({
  gaInitialized,
  refreshing,
  handleRefresh,
  handleExport,
  showGaSetup,
  setShowGaSetup
}: AnalyticsHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <BarChart className="h-6 w-6 text-elec-yellow" />
        <h1 className="text-2xl font-bold tracking-tight">Admin Analytics</h1>
        {gaInitialized && (
          <span className="bg-green-500/20 text-green-500 text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <span className="h-1.5 w-1.5 bg-green-500 rounded-full animate-pulse"></span>
            GA Live
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Dialog open={showGaSetup} onOpenChange={setShowGaSetup}>
          <DialogTrigger asChild>
            <Button
              variant={gaInitialized ? "outline" : "default"}
              size="sm"
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              {gaInitialized ? "Configure GA" : "Set Up GA Tracking"}
            </Button>
          </DialogTrigger>
        </Dialog>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
          {refreshing ? "Refreshing..." : "Refresh"}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsHeader;
