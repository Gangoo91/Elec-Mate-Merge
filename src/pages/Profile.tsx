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
import { useInspectorProfiles, InspectorProfile } from '@/hooks/useInspectorProfiles';
import { useProfileDataService } from '@/hooks/useProfileDataService';
import { useElecIdWorkHistory } from '@/hooks/useElecIdWorkHistory';
import {
  DataSourceIndicator,
  InspectorProfileList,
  InspectorProfileDetails,
  WorkHistoryCard,
} from '@/components/profile';
import { User, Briefcase, Award, Activity } from 'lucide-react';

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

  // Inspector profiles
  const {
    profiles: inspectorProfiles,
    isLoading: profilesLoading,
    addProfile,
    updateProfile,
    setDefaultProfile,
  } = useInspectorProfiles();

  // Profile data service (cascade)
  const { dataSource, isVerified, elecIdNumber } = useProfileDataService();

  // Work history
  const { workHistory, isLoading: historyLoading, hasElecId, totalCertificates } = useElecIdWorkHistory();

  // Selected profile state
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    inspectorProfiles.find(p => p.isDefault)?.id || inspectorProfiles[0]?.id || null
  );

  // Update selected profile when profiles load
  React.useEffect(() => {
    if (!selectedProfileId && inspectorProfiles.length > 0) {
      const defaultProfile = inspectorProfiles.find(p => p.isDefault);
      setSelectedProfileId(defaultProfile?.id || inspectorProfiles[0].id);
    }
  }, [inspectorProfiles, selectedProfileId]);

  const selectedProfile = inspectorProfiles.find(p => p.id === selectedProfileId) || null;

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

  const handleCreateProfile = async () => {
    const newProfile = await addProfile({
      name: profile?.full_name || 'New Profile',
      qualifications: [],
      companyName: '',
      companyAddress: '',
      companyPhone: '',
      companyEmail: '',
      registrationScheme: '',
      registrationNumber: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      insuranceCoverage: '',
      isDefault: inspectorProfiles.length === 0,
    });
    if (newProfile) {
      setSelectedProfileId(newProfile.id);
    }
  };

  const handleUpdateProfile = async (id: string, updates: Partial<InspectorProfile>) => {
    await updateProfile(id, updates);
  };

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
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight gradient-text">Profile</h1>
          <p className="text-muted-foreground text-sm sm:text-base mt-1">
            Manage your inspector profiles for certificate auto-fill
          </p>
        </div>

        {/* Data Source Indicator */}
        <DataSourceIndicator
          activeSource={dataSource}
          isVerified={isVerified}
          elecIdNumber={elecIdNumber}
        />

        {/* Main Tabs */}
        <Tabs defaultValue="inspector" className="w-full">
          <TabsList className="w-full bg-elec-gray border-b border-elec-yellow/20 rounded-t-lg">
            <TabsTrigger value="inspector" className="flex-1 gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow">
              <Briefcase className="h-4 w-4" />
              <span className="hidden sm:inline">Inspector Profiles</span>
              <span className="sm:hidden">Profiles</span>
            </TabsTrigger>
            <TabsTrigger value="account" className="flex-1 gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Account</span>
              <span className="sm:hidden">Account</span>
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex-1 gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow">
              <Award className="h-4 w-4" />
              <span className="hidden sm:inline">Achievements</span>
              <span className="sm:hidden">Awards</span>
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex-1 gap-2 data-[state=active]:bg-elec-yellow/20 data-[state=active]:text-elec-yellow">
              <Activity className="h-4 w-4" />
              <span className="hidden sm:inline">Activity</span>
              <span className="sm:hidden">Activity</span>
            </TabsTrigger>
          </TabsList>

          {/* Inspector Profiles Tab - NEW */}
          <TabsContent value="inspector" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Profile List */}
              <div className="lg:col-span-1">
                <InspectorProfileList
                  profiles={inspectorProfiles}
                  selectedId={selectedProfileId}
                  onSelect={setSelectedProfileId}
                  onSetDefault={setDefaultProfile}
                  onCreate={handleCreateProfile}
                  isLoading={profilesLoading}
                />
              </div>

              {/* Right Column - Profile Details & Work History */}
              <div className="lg:col-span-2 space-y-6">
                <InspectorProfileDetails
                  profile={selectedProfile}
                  dataSource={dataSource || undefined}
                  isVerified={isVerified}
                  onUpdate={handleUpdateProfile}
                />

                <WorkHistoryCard
                  workHistory={workHistory}
                  isLoading={historyLoading}
                  hasElecId={hasElecId}
                  totalCertificates={totalCertificates}
                />
              </div>
            </div>
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6">
              <ProfileSummary
                profile={profile}
                getInitials={getInitials}
                onEdit={() => setIsEditing(true)}
              />
              <AccountTab
                profile={profile}
                user={user}
                isEditing={isEditing}
                formData={formData}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                setIsEditing={setIsEditing}
              />
            </div>
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
  );
};

export default ProfilePage;
