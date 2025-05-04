
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Edit, MapPin, Calendar } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileSummaryProps {
  profile: any;
  getInitials: () => string;
  onEdit: () => void;
}

const ProfileSummary = ({ profile, getInitials, onEdit }: ProfileSummaryProps) => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
      {/* Cover Image */}
      <div className="h-24 sm:h-32 bg-gradient-to-r from-elec-yellow/30 to-elec-yellow/10 relative">
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-black/20 hover:bg-black/40 text-white"
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>
      
      <CardContent className="pt-0 p-4 sm:p-6 flex flex-col items-center -mt-12">
        <Avatar className="h-24 w-24 sm:h-28 sm:w-28 border-4 border-elec-gray ring-2 ring-elec-yellow/50">
          <AvatarImage src={profile?.avatar_url || ''} />
          <AvatarFallback className="bg-elec-yellow text-elec-dark text-xl sm:text-2xl">
            {getInitials()}
          </AvatarFallback>
        </Avatar>
        
        <div className="text-center mt-4 mb-5">
          <h2 className="text-xl sm:text-2xl font-bold">{profile?.full_name || 'User'}</h2>
          <p className="text-sm text-muted-foreground">@{profile?.username || 'username'}</p>
          
          <div className="flex flex-col sm:flex-row justify-center mt-3 gap-2 text-xs text-muted-foreground">
            {profile?.location && (
              <div className="flex items-center justify-center gap-1">
                <MapPin className="h-3 w-3" />
                <span>{profile.location}</span>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
            </div>
          </div>
          
          {profile?.bio && (
            <p className="mt-4 text-sm leading-relaxed">
              {profile.bio}
            </p>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="w-full border-elec-yellow/30 hover:bg-elec-yellow/10"
          onClick={onEdit}
        >
          <Edit className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
          Edit Profile
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
