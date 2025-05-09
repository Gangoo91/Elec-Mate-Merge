
import { Calendar, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface Event {
  name: string;
  date: string;
  time: string;
  location: string;
  url?: string;
}

interface EventsListProps {
  events: Event[];
}

const EventsList = ({ events }: EventsListProps) => {
  const handleRegister = (event: Event) => {
    if (event.url) {
      // Open the external registration page
      window.open(event.url, "_blank", "noopener,noreferrer");
    } else {
      toast.success(`You've registered for: ${event.name}`);
    }
  };

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
              className="bg-purple-500 hover:bg-purple-600 text-white w-full sm:w-auto flex items-center gap-2"
              onClick={() => handleRegister(event)}
            >
              Register
              {event.url && <ExternalLink className="h-3 w-3" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsList;
