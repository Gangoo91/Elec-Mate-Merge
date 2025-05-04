
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ProfileViewProps {
  profile: any;
  user: any;
}

const ProfileView = ({ profile, user }: ProfileViewProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="space-y-3 sm:space-y-4">
        <div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Full Name</p>
          <p className="text-sm sm:text-base">{profile?.full_name || 'Not set'}</p>
        </div>
        
        <div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Username</p>
          <p className="text-sm sm:text-base">@{profile?.username || 'Not set'}</p>
        </div>
        
        <div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Email</p>
          <p className="text-sm sm:text-base">{user?.email}</p>
        </div>
        
        <div>
          <p className="text-xs sm:text-sm font-medium text-muted-foreground">Bio</p>
          <p className="text-sm sm:text-base">{profile?.bio || 'No bio added yet.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
