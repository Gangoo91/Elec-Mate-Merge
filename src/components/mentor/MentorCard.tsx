
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ChevronRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    specialty: string;
    experience: string;
    availability: string;
    avatar?: string;
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
              {mentor.avatar}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl">
              {mentor.name}
            </CardTitle>
            <CardDescription className="text-sm text-elec-light/80">{mentor.specialty}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm mb-4">
          <div>
            <p className="text-muted-foreground">Experience</p>
            <p className="font-medium">{mentor.experience}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Availability</p>
            <p className="font-medium">{mentor.availability}</p>
          </div>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <button className="text-xs text-elec-yellow flex items-center hover:underline">
              View more details <ChevronRight className="h-3 w-3 ml-1" />
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">About {mentor.name}</h4>
              <p className="text-xs text-muted-foreground">
                {mentor.name} is an experienced electrical professional specializing in {mentor.specialty.toLowerCase()}. 
                They've been in the industry for {mentor.experience.toLowerCase()} and are available {mentor.availability.toLowerCase()} 
                for mentoring sessions.
              </p>
              <h4 className="font-medium text-sm pt-2">What you'll learn</h4>
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
            className="w-full"
            onClick={handleConnect}
            disabled={isConnecting}
            variant={isConnecting ? "outline" : "default"}
          >
            {isConnecting ? 'Connecting...' : 'Request Mentoring'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
