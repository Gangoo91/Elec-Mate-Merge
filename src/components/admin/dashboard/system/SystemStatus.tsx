
import { Badge } from "@/components/ui/badge";

const SystemStatus = () => {
  return (
    <div className="bg-elec-gray-light/10 p-4 rounded-lg">
      <h4 className="text-sm font-medium mb-4">System Status</h4>
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm">
          <span>Database</span>
          <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>API Services</span>
          <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Storage</span>
          <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span>Authentication</span>
          <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
        </div>
      </div>
      <div className="mt-4 p-3 border border-green-500/20 rounded bg-green-900/10 text-xs text-green-400">
        All systems operational. Last incident: 14 days ago
      </div>
    </div>
  );
};

export default SystemStatus;
