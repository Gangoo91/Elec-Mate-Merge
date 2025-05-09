
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Event {
  name: string;
  date: string;
  time: string;
  location: string;
}

interface EventsListProps {
  events: Event[];
}

const EventsList = ({ events }: EventsListProps) => {
  return (
    <div>
      <h3 className="text-lg font-medium mb-3">Upcoming Support Events</h3>
      <div className="space-y-3">
        {events.map((event, index) => (
          <div 
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-purple-500/5 border border-purple-500/10 rounded-lg gap-3"
          >
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-purple-400 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-sm">{event.name}</h4>
                <p className="text-xs text-muted-foreground">
                  {event.date} • {event.time}
                </p>
                <p className="text-xs text-muted-foreground">{event.location}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto"
              onClick={() => toast.success(`You've registered for: ${event.name}`)}
            >
              Register
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
