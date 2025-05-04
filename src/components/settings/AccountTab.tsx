
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { 
  LogOut, 
  Globe, 
  User, 
  PenSquare,
  CheckCircle,
  GraduationCap,
  Award,
  BadgeCheck
} from "lucide-react";

const AccountTab = () => {
  const { user, signOut, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  const { addNotification } = useNotifications();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: user?.email?.split('@')[0] || 'Electrician Pro',
    jobTitle: 'Senior Electrician',
    yearsExperience: '5',
    certificates: ['Level 3 Electrical Installation', 'City & Guilds 2365']
  });

  const handleSignOut = async () => {
    await signOut();
    addNotification({
      title: 'Signed Out',
      message: 'You have been successfully signed out.',
      type: 'info'
    });
  };
  
  const handleDevModeToggle = () => {
    toggleDevelopmentMode();
    addNotification({
      title: 'Development Mode',
      message: `Development mode ${!isDevelopmentMode ? 'enabled' : 'disabled'}.`,
      type: 'info'
    });
  };

  const handleProfileUpdate = () => {
    setIsEditingProfile(false);
    addNotification({
      title: 'Profile Updated',
      message: 'Your profile information has been saved.',
      type: 'success'
    });
  };

  const handleProfileDataChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-4">
      {/* Profile Section */}
      <div className="p-4 bg-elec-yellow/5 rounded-lg border border-elec-yellow/20 flex flex-col items-center sm:flex-row sm:items-start gap-4">
        <div className="w-20 h-20 rounded-full bg-elec-gray flex items-center justify-center border border-elec-yellow/30">
          <User className="h-10 w-10 text-elec-yellow/70" />
        </div>
        
        <div className="flex-1 space-y-1 text-center sm:text-left">
          <h3 className="font-medium text-base">{profileData.displayName}</h3>
          <p className="text-xs text-muted-foreground">{profileData.jobTitle}</p>
          <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
            <Badge label="Verified" icon={BadgeCheck} />
            <Badge label="Pro Member" icon={Award} />
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="shrink-0" 
          onClick={() => setIsEditingProfile(!isEditingProfile)}
        >
          <PenSquare className="h-4 w-4 mr-1" />
          Edit Profile
        </Button>
      </div>

      {/* Profile Edit Form */}
      {isEditingProfile && (
        <div className="p-4 border border-elec-yellow/20 rounded-lg space-y-3 bg-elec-gray">
          <div className="space-y-2">
            <label className="text-sm font-medium">Display Name</label>
            <Input 
              value={profileData.displayName} 
              onChange={(e) => handleProfileDataChange('displayName', e.target.value)}
              className="bg-elec-gray/40 border-elec-yellow/20"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Job Title</label>
            <Input 
              value={profileData.jobTitle} 
              onChange={(e) => handleProfileDataChange('jobTitle', e.target.value)}
              className="bg-elec-gray/40 border-elec-yellow/20"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Years of Experience</label>
            <Input 
              value={profileData.yearsExperience} 
              onChange={(e) => handleProfileDataChange('yearsExperience', e.target.value)}
              type="number"
              className="bg-elec-gray/40 border-elec-yellow/20"
            />
          </div>
          
          <div className="pt-2 flex justify-end gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsEditingProfile(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm" 
              onClick={handleProfileUpdate}
            >
              Save Changes
            </Button>
          </div>
        </div>
      )}

      <Separator className="my-4" />
      
      {/* Badges & Achievements */}
      <div className="space-y-2">
        <label className="text-sm font-medium flex items-center gap-1">
          <Award className="h-4 w-4 text-elec-yellow" />
          Certifications & Badges
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {profileData.certificates.map((cert, index) => (
            <div key={index} className="flex items-center gap-2 p-2 border border-elec-yellow/20 rounded bg-elec-gray/40">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-xs">{cert}</span>
            </div>
          ))}
          <Button variant="outline" size="sm" className="flex gap-1 items-center">
            <GraduationCap className="h-4 w-4" />
            Add Certification
          </Button>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <Input value={user?.email || ''} disabled className="bg-elec-gray/40 border-elec-yellow/20" />
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Language</label>
          <p className="text-xs text-muted-foreground">
            Select your preferred language
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Globe className="h-4 w-4" />
          <span>English (UK)</span>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Development Mode</label>
          <p className="text-xs text-muted-foreground">
            Enable additional developer features
          </p>
        </div>
        <Switch
          checked={isDevelopmentMode}
          onCheckedChange={handleDevModeToggle}
        />
      </div>
      
      <Separator className="my-4" />
      
      <Button 
        variant="destructive" 
        className="w-full"
        onClick={handleSignOut}
      >
        <LogOut className="mr-2 h-4 w-4" />
        Sign Out
      </Button>
    </div>
  );
};

// Badge component for profile badges
const Badge = ({ label, icon: Icon }: { label: string, icon: any }) => {
  return (
    <div className="flex items-center gap-1 bg-elec-yellow/10 px-2 py-0.5 rounded text-xs">
      <Icon className="h-3 w-3 text-elec-yellow" />
      <span>{label}</span>
    </div>
  );
};

export default AccountTab;
