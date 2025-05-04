
import React from 'react';

interface ProfileViewProps {
  profile: any;
  user: any;
}

const ProfileView = ({ profile, user }: ProfileViewProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Full Name</p>
          <p>{profile?.full_name || 'Not set'}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground">Username</p>
          <p>@{profile?.username || 'Not set'}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground">Email</p>
          <p>{user?.email}</p>
        </div>
        
        <div>
          <p className="text-sm font-medium text-muted-foreground">Bio</p>
          <p>{profile?.bio || 'No bio added yet.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
