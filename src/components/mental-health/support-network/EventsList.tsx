import { useState } from "react";
import { Calendar, Clock, MapPin, ExternalLink, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  defaultExpanded?: boolean;
}

const EventsList = ({ events, defaultExpanded = true }: EventsListProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleRegister = (event: Event) => {
    if (event.url) {
      window.open(event.url, "_blank", "noopener,noreferrer");
    } else {
      toast.success(`You've registered for: ${event.name}`);
    }
  };

  if (events.length === 0) {
    return null;
  }

  return (
    <Card className="border-amber-500/20 overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between bg-gradient-to-r from-amber-500/10 to-transparent
          min-h-[72px] touch-manipulation active:bg-amber-500/20 transition-colors duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-amber-400" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-foreground">Upcoming Events</h3>
            <p className="text-xs text-white/70">{events.length} event{events.length !== 1 ? 's' : ''} scheduled</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
            {events.length}
          </Badge>
          <div
            className="transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <ChevronDown className="h-5 w-5 text-white/70" />
          </div>
        </div>
      </button>

      {/* Collapsible Content */}
      {isExpanded && (
        <CardContent className="p-3 pt-0 space-y-3">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-4 rounded-lg border border-amber-500/20 bg-amber-500/5
                touch-manipulation active:scale-[0.99] transition-all duration-300"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground text-sm mb-2">{event.name}</h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Calendar className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <Clock className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/70">
                      <MapPin className="h-3.5 w-3.5 text-amber-400 flex-shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>
                </div>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 text-black h-11 px-4 flex-shrink-0
                    touch-manipulation active:scale-[0.98] transition-all duration-300"
                  onClick={() => handleRegister(event)}
                >
                  Register
                  {event.url && <ExternalLink className="h-3.5 w-3.5 ml-1.5" />}
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default EventsList;
