
import { SystemEvent } from "../types";

interface SystemEventsProps {
  events: SystemEvent[];
}

const SystemEvents = ({ events }: SystemEventsProps) => {
  return (
    <div className="bg-elec-gray-light/10 p-4 rounded-lg">
      <h4 className="text-sm font-medium mb-4">System Events</h4>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {events.map(event => (
          <div key={event.id} className="flex items-start gap-2 text-xs border-b border-elec-yellow/10 pb-2">
            <span className={`h-2 w-2 mt-1 rounded-full flex-shrink-0 ${
              event.severity === 'error' ? 'bg-red-500' : 
              event.severity === 'warning' ? 'bg-amber-500' : 
              event.severity === 'success' ? 'bg-green-500' : 
              'bg-blue-500'
            }`}></span>
            <div>
              <div>{event.event}</div>
              <div className="text-gray-400 text-xs">{event.date}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="mt-4 text-xs text-elec-yellow hover:text-elec-yellow/80">
        View full system log
      </button>
    </div>
  );
};

export default SystemEvents;
