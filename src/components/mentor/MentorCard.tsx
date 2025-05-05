
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  return (
    <Card key={mentor.id} className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-elec-yellow/50">
            <AvatarImage src="" />
            <AvatarFallback className="bg-elec-yellow/20 text-elec-yellow">
              {mentor.avatar}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl">{mentor.name}</CardTitle>
            <CardDescription className="text-sm">{mentor.specialty}</CardDescription>
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
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full"
          onClick={() => onConnect(mentor)}
          disabled={isRequesting === mentor.id}
        >
          {isRequesting === mentor.id ? 'Connecting...' : 'Request Mentoring'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MentorCard;
