
import { Filter } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface AnalyticsFilterProps {
  timeRange: string;
  setTimeRange: (value: string) => void;
}

const AnalyticsFilter = ({ timeRange, setTimeRange }: AnalyticsFilterProps) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Time Range:</span>
      </div>
      <Select value={timeRange} onValueChange={setTimeRange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="24h">Last 24 hours</SelectItem>
          <SelectItem value="7d">Last 7 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="90d">Last 90 days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnalyticsFilter;
