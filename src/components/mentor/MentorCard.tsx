
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight, Star, MessageSquare, Clock } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    availability: string;
    avatar?: string;
    rating?: number;
    responseTime?: string;
  };
  onConnect: (mentor: any) => void;
  isRequesting: string | null;
}

const MentorCard = ({ mentor, onConnect, isRequesting }: MentorCardProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  
  const handleConnect = () => {
    onConnect(mentor);
    setShowSuccess(true);
    // Reset success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };
  
  const isConnecting = isRequesting === mentor.id;
  
  return (
    <Card key={mentor.id} className="border-elec-yellow/20 bg-elec-gray transition-all hover:shadow-md hover:border-elec-yellow/40">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src="" />
            <AvatarFallback className="bg-elec-gray text-elec-yellow border border-elec-yellow/50">
              {mentor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl flex items-center gap-2">
              {mentor.name}
              {(mentor.rating || 0) >= 4.5 && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Badge className="bg-elec-yellow text-black text-xs h-5">
                        <Star className="h-3 w-3 mr-1" fill="currentColor" /> Top Rated
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Highly rated by apprentices</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </CardTitle>
            <CardDescription className="text-sm text-elec-light/80">
              Apprentice • {mentor.specialty}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Learning Focus</p>
            <p className="font-medium">{mentor.experience}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Availability</p>
            <p className="font-medium">{mentor.availability}</p>
          </div>
        </div>
        
        {mentor.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= mentor.rating! ? "text-elec-yellow" : "text-elec-yellow/20"
                  }`}
                  fill={star <= mentor.rating! ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {mentor.rating.toFixed(1)} out of 5
            </span>
          </div>
        )}
        
        {mentor.responseTime && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
            <Clock className="h-3 w-3" />
            <span>Responds {mentor.responseTime}</span>
          </div>
        )}
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-xs text-elec-yellow flex items-center hover:underline">
              View more details <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-elec-gray border-elec-yellow/20">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">About {mentor.name}</h4>
              <p className="text-xs text-muted-foreground">
                {mentor.name} is an apprentice electrician looking for guidance in {mentor.specialty.toLowerCase()}. 
                They've been in their apprenticeship for {mentor.experience.toLowerCase()} and are available {mentor.availability.toLowerCase()} 
                for mentoring sessions.
              </p>
              <h4 className="font-medium text-sm pt-2">What they're looking to learn</h4>
              <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                <li>Practical skills in {mentor.specialty}</li>
                <li>Industry best practices</li>
                <li>Career growth guidance</li>
                <li>Troubleshooting techniques</li>
              </ul>
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
      <CardFooter>
        {showSuccess ? (
          <div className="w-full py-2 text-center bg-green-500/10 text-green-600 rounded-md flex items-center justify-center">
            <CheckCircle className="h-4 w-4 mr-2" /> Request sent! Check messages
          </div>
        ) : (
          <Button 
            className="w-full gap-2"
            onClick={handleConnect}
            disabled={isConnecting}
            variant={isConnecting ? "outline" : "default"}
          >
            <MessageSquare className="h-4 w-4" />
            {isConnecting ? 'Connecting...' : 'Request Mentorship'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
