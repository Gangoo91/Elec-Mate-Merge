
import { Clock } from "lucide-react";
import StatusIndicator from "./StatusIndicator";

interface TimerHeaderProps {
  isInactive: boolean;
  isVideoContent: boolean;
}

const TimerHeader = ({ isInactive, isVideoContent }: TimerHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <Clock className="h-5 w-5 text-elec-yellow" />
      <h3 className="font-semibold">Off-the-Job Training Timer</h3>
      
      {isInactive && !isVideoContent && (
        <StatusIndicator 
          isActive={true}
          text="Inactive"
          className="ml-2"
        />
      )}
    </div>
  );
};

export default TimerHeader;
