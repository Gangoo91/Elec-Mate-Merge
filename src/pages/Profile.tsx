
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { supabase } from "@/integrations/supabase/client";
import ProfileSummary from '@/components/profile/ProfileSummary';
import AccountTab from '@/components/profile/AccountTab';
import AchievementsTab from '@/components/profile/AchievementsTab';
import ActivityTab from '@/components/profile/ActivityTab';
import { useIsMobile } from '@/hooks/use-mobile';

const ProfilePage = () => {
  const { user, profile, fetchProfile } = useAuth();
  const { addNotification } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const isMobile = useIsMobile();
  const [formData, setFormData] = useState({
    fullName: profile?.full_name || '',
    username: profile?.username || '',
    bio: profile?.bio || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!user) return;
      
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          username: formData.username,
          bio: formData.bio,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
        
      if (error) throw error;
      
      // Refetch profile
      if (fetchProfile) {
        await fetchProfile(user.id);
      }
      
      addNotification({
        title: 'Profile Updated',
        message: 'Your profile has been successfully updated.',
        type: 'success'
      });
      
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      addNotification({
        title: 'Update Failed',
        message: error.message || 'Failed to update profile.',
        type: 'error'
      });
    }
  };
  
  // Get initials for avatar
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase();
    }
    return user?.email?.substring(0, 2).toUpperCase() || 'U';
  };

  return (
    <div className="container max-w-5xl mx-auto py-4 px-2 sm:px-4 sm:py-6 space-y-6 animate-fade-in">
      <div className="text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-4 sm:gap-6">
        {/* Profile Summary Card */}
        <ProfileSummary 
          profile={profile} 
          getInitials={getInitials} 
          onEdit={() => setIsEditing(true)} 
        />

        {/* Main Content Area */}
        <div className="space-y-6">
          <Tabs defaultValue="account" className="w-full">
            <TabsList className="w-full bg-elec-gray border-b border-elec-yellow/20">
              <TabsTrigger value="account" className="flex-1">Account</TabsTrigger>
              <TabsTrigger value="achievements" className="flex-1">Achievements</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">Activity</TabsTrigger>
            </TabsList>
            
            {/* Account Tab */}
            <TabsContent value="account" className="space-y-4 sm:space-y-6 pt-4">
              <AccountTab 
                profile={profile}
                user={user}
                isEditing={isEditing}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setIsEditing={setIsEditing}
              />
            </TabsContent>
            
            {/* Achievements Tab */}
            <TabsContent value="achievements" className="space-y-4 sm:space-y-6 pt-4">
              <AchievementsTab />
            </TabsContent>
            
            {/* Activity Tab */}
            <TabsContent value="activity" className="space-y-4 sm:space-y-6 pt-4">
              <ActivityTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
