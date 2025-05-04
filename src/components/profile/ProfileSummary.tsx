
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Edit } from "lucide-react";

interface ProfileSummaryProps {
  profile: any;
  getInitials: () => string;
  onEdit: () => void;
}

const ProfileSummary = ({ profile, getInitials, onEdit }: ProfileSummaryProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardContent className="p-6 flex flex-col items-center">
        <Avatar className="h-24 w-24 mb-6">
          <AvatarImage src={profile?.avatar_url || ''} />
          <AvatarFallback className="bg-elec-yellow text-elec-dark text-xl">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center mb-4">
          <h2 className="text-xl font-bold">{profile?.full_name || 'User'}</h2>
          <p className="text-sm text-muted-foreground">@{profile?.username || 'username'}</p>
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={onEdit}
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
