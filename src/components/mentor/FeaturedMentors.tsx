
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare } from "lucide-react";

interface Mentor {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  availability: string;
  avatar?: string;
  isFeatured?: boolean;
  rating?: number;
  responseTime?: string;
}

interface FeaturedMentorsProps {
  mentors: Mentor[];
  requestingMentor: string | null;
  onConnectMentor: (mentor: Mentor) => void;
}

const FeaturedMentors = ({ mentors, requestingMentor, onConnectMentor }: FeaturedMentorsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {mentors.map((mentor) => (
        <Card 
          key={mentor.id} 
          className="border-elec-yellow/30 bg-elec-gray/90 relative overflow-hidden transition-all hover:shadow-lg"
        >
          {/* Featured badge */}
          <div className="absolute top-0 right-0 bg-elec-yellow text-black text-xs font-bold px-2 py-1 rounded-bl-md flex items-center gap-1">
            <Star className="h-3 w-3" /> Featured
          </div>
          
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20 mb-3">
                <AvatarImage src="" />
                <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow border border-elec-yellow/50 text-xl">
                  {mentor.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <h3 className="font-semibold text-lg">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{mentor.specialty}</p>
              
              <div className="flex items-center gap-1 mb-3">
                {Array(5).fill(0).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < (mentor.rating || 0) ? "text-elec-yellow" : "text-elec-yellow/20"}`} 
                    fill={i < (mentor.rating || 0) ? "currentColor" : "none"}
                  />
                ))}
              </div>
              
              <div className="space-y-2 w-full mb-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Experience:</span>
                  <span>{mentor.experience}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Availability:</span>
                  <span>{mentor.availability}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Resp. Time:</span>
                  <span>{mentor.responseTime || 'Within 24h'}</span>
                </div>
              </div>
              
              <Button
                className="w-full gap-2"
                onClick={() => onConnectMentor(mentor)}
                disabled={requestingMentor === mentor.id}
              >
                <MessageSquare className="h-4 w-4" />
                {requestingMentor === mentor.id ? 'Connecting...' : 'Request Mentorship'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeaturedMentors;
