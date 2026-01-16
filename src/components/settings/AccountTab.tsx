import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  Globe,
  User,
  PenSquare,
  CheckCircle,
  Award,
  BadgeCheck,
  Mail,
  Briefcase,
  Clock,
  Save,
  X,
  Code,
  Loader2,
} from "lucide-react";

const AccountTab = () => {
  const { user, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  const { addNotification } = useNotifications();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [language, setLanguage] = useState("en-GB");
  const [profileData, setProfileData] = useState({
    displayName: user?.email?.split('@')[0] || 'Electrician Pro',
    jobTitle: 'Senior Electrician',
    yearsExperience: '5',
  });

  const handleDevModeToggle = () => {
    toggleDevelopmentMode();
    addNotification({
      title: 'Development Mode',
      message: 'Development mode ' + (!isDevelopmentMode ? 'enabled' : 'disabled') + '.',
      type: 'info'
    });
  };

  const handleProfileUpdate = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSaving(false);
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

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    addNotification({
      title: 'Language Updated',
      message: 'Your language preference has been saved.',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Profile Section */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-elec-yellow/20 to-elec-gray flex items-center justify-center border border-white/10">
              <User className="h-10 w-10 text-elec-yellow" />
            </div>

            {/* Info */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg font-semibold text-foreground">{profileData.displayName}</h3>
              <p className="text-sm text-muted-foreground">{profileData.jobTitle}</p>
              <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium">
                  <BadgeCheck className="h-3.5 w-3.5" />
                  Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-elec-yellow/10 border border-elec-yellow/20 text-elec-yellow text-xs font-medium">
                  <Award className="h-3.5 w-3.5" />
                  Pro Member
                </span>
              </div>
            </div>

            {/* Edit Button */}
            <Button
              variant="outline"
              size="sm"
              className="h-11 border-white/20 hover:bg-white/5 touch-manipulation active:scale-[0.98]"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
            >
              {isEditingProfile ? (
                <>
                  <X className="h-4 w-4 mr-1.5" />
                  Cancel
                </>
              ) : (
                <>
                  <PenSquare className="h-4 w-4 mr-1.5" />
                  Edit Profile
                </>
              )}
            </Button>
          </div>

          {/* Edit Form */}
          {isEditingProfile && (
            <div className="mt-6 pt-6 border-t border-white/10 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-foreground">Display Name</Label>
                  <Input
                    value={profileData.displayName}
                    onChange={(e) => handleProfileDataChange('displayName', e.target.value)}
                    className="h-11 text-base touch-manipulation bg-white/5 border-white/10 focus:border-elec-yellow/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Job Title</Label>
                  <Input
                    value={profileData.jobTitle}
                    onChange={(e) => handleProfileDataChange('jobTitle', e.target.value)}
                    className="h-11 text-base touch-manipulation bg-white/5 border-white/10 focus:border-elec-yellow/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-foreground">Years of Experience</Label>
                  <Input
                    value={profileData.yearsExperience}
                    onChange={(e) => handleProfileDataChange('yearsExperience', e.target.value)}
                    type="number"
                    className="h-11 text-base touch-manipulation bg-white/5 border-white/10 focus:border-elec-yellow/50"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  onClick={handleProfileUpdate}
                  className="h-11 touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Details */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Account Details</h3>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          {/* Email */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Email Address</p>
                <p className="text-sm text-muted-foreground">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground bg-white/5 px-2 py-1 rounded">Primary</span>
          </div>

          {/* Language */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center">
                <Globe className="h-5 w-5 text-elec-yellow" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Language</p>
                <p className="text-sm text-muted-foreground">Select your preferred language</p>
              </div>
            </div>
            <Select value={language} onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-full sm:w-40 h-11 touch-manipulation bg-white/5 border-white/10">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10">
                <SelectItem value="en-GB">English (UK)</SelectItem>
                <SelectItem value="en-US">English (US)</SelectItem>
                <SelectItem value="cy">Welsh</SelectItem>
                <SelectItem value="gd">Scottish Gaelic</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-elec-gray/50 border border-white/10 text-center">
          <Briefcase className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">{profileData.yearsExperience}</p>
          <p className="text-xs text-muted-foreground">Years Experience</p>
        </div>
        <div className="p-4 rounded-xl bg-elec-gray/50 border border-white/10 text-center">
          <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">2</p>
          <p className="text-xs text-muted-foreground">Certifications</p>
        </div>
        <div className="p-4 rounded-xl bg-elec-gray/50 border border-white/10 text-center">
          <Award className="h-6 w-6 text-elec-yellow mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground">Badges Earned</p>
        </div>
        <div className="p-4 rounded-xl bg-elec-gray/50 border border-white/10 text-center">
          <Clock className="h-6 w-6 text-blue-400 mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Months Active</p>
        </div>
      </div>

      {/* Developer Options */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Developer Options</h3>
        </div>
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Code className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Development Mode</p>
                <p className="text-sm text-muted-foreground">Enable additional developer features and debugging tools</p>
              </div>
            </div>
            <Switch
              checked={isDevelopmentMode}
              onCheckedChange={handleDevModeToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTab;
