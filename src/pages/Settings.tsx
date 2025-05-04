
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { 
  Bell, 
  Settings as SettingsIcon, 
  Shield, 
  EyeOff, 
  Moon, 
  Globe, 
  Mail, 
  LogOut,
  User,
  Palette,
  Lock
} from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { useForm } from 'react-hook-form';

const SettingsPage = () => {
  const { user, signOut, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  const { addNotification } = useNotifications();
  const isMobile = useIsMobile();
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailUpdates: true,
    mentorMessages: true,
    courseCompletions: true,
    appUpdates: false
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: true,
    highContrast: false,
    fontSize: 'medium',
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnline: true,
    showActivity: true,
    showProfile: true
  });
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      addNotification({
        title: 'Settings Updated',
        message: `${key} notifications ${newSettings[key] ? 'enabled' : 'disabled'}.`,
        type: 'success'
      });
      
      return newSettings;
    });
  };
  
  const handleAppearanceChange = (key: keyof typeof appearanceSettings, value: any) => {
    setAppearanceSettings(prev => {
      const newSettings = { ...prev, [key]: typeof value === 'boolean' ? !prev[key] : value };
      
      addNotification({
        title: 'Appearance Updated',
        message: `${key} setting updated.`,
        type: 'success'
      });
      
      return newSettings;
    });
  };
  
  const handlePrivacyChange = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      
      addNotification({
        title: 'Privacy Setting Updated',
        message: `${key} setting ${newSettings[key] ? 'enabled' : 'disabled'}.`,
        type: 'success'
      });
      
      return newSettings;
    });
  };
  
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

  // Mobile-optimized tab style
  const tabListClass = isMobile 
    ? "w-full grid grid-cols-4 gap-1 bg-elec-gray border-b border-elec-yellow/20" 
    : "bg-elec-gray border-b border-elec-yellow/20";
    
  // Mobile-optimized tab content style
  const tabContentClass = isMobile ? "pt-4 pb-20" : "space-y-6 pt-4";
  
  return (
    <div className="container mx-auto py-4 space-y-4 animate-fade-in px-4 md:px-6 md:py-6 md:space-y-8 max-w-3xl">
      <div className="flex items-center gap-2 mb-2">
        <SettingsIcon className="h-6 w-6 text-elec-yellow" />
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="account" className="w-full">
        <TabsList className={tabListClass}>
          <TabsTrigger value="account" className="flex gap-1 items-center text-xs md:text-sm">
            {!isMobile && <User className="h-4 w-4" />}
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex gap-1 items-center text-xs md:text-sm">
            {!isMobile && <Bell className="h-4 w-4" />}
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex gap-1 items-center text-xs md:text-sm">
            {!isMobile && <Palette className="h-4 w-4" />}
            Appearance
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex gap-1 items-center text-xs md:text-sm">
            {!isMobile && <Lock className="h-4 w-4" />}
            Privacy
          </TabsTrigger>
        </TabsList>
          
        {/* Account Tab */}
        <TabsContent value="account" className={tabContentClass}>
          <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-elec-yellow" />
                <CardTitle>Account Settings</CardTitle>
              </div>
              <CardDescription>
                Manage your account preferences
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <FormLabel>Email Address</FormLabel>
                <Input value={user?.email || ''} disabled className="bg-elec-gray/40" />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Language</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Select your preferred language
                  </FormDescription>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Globe className="h-4 w-4" />
                  <span>English (UK)</span>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Development Mode</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Enable additional developer features
                  </FormDescription>
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
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className={tabContentClass}>
          <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-elec-yellow" />
                <CardTitle>Notification Preferences</CardTitle>
              </div>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Email Updates</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Receive important updates via email
                  </FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.emailUpdates}
                  onCheckedChange={() => handleNotificationChange('emailUpdates')}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Mentor Messages</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Get notified when mentors send you messages
                  </FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.mentorMessages}
                  onCheckedChange={() => handleNotificationChange('mentorMessages')}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Course Completions</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Notifications when you complete courses
                  </FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.courseCompletions}
                  onCheckedChange={() => handleNotificationChange('courseCompletions')}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>App Updates</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Information about new features and updates
                  </FormDescription>
                </div>
                <Switch
                  checked={notificationSettings.appUpdates}
                  onCheckedChange={() => handleNotificationChange('appUpdates')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance" className={tabContentClass}>
          <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Moon className="h-5 w-5 text-elec-yellow" />
                <CardTitle>Appearance Settings</CardTitle>
              </div>
              <CardDescription>
                Customize how ElecMate looks for you
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Dark Mode</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Toggle dark mode on or off
                  </FormDescription>
                </div>
                <Switch
                  checked={appearanceSettings.darkMode}
                  onCheckedChange={() => handleAppearanceChange('darkMode', null)}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>High Contrast</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Increase contrast for better visibility
                  </FormDescription>
                </div>
                <Switch
                  checked={appearanceSettings.highContrast}
                  onCheckedChange={() => handleAppearanceChange('highContrast', null)}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <FormLabel>Font Size</FormLabel>
                <FormDescription className="text-xs text-muted-foreground">
                  Adjust the text size throughout the app
                </FormDescription>
                <div className="flex gap-2 flex-wrap">
                  {['small', 'medium', 'large'].map(size => (
                    <Button
                      key={size}
                      variant={appearanceSettings.fontSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleAppearanceChange('fontSize', size)}
                      className="flex-1 min-w-[80px]"
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Privacy Tab */}
        <TabsContent value="privacy" className={tabContentClass}>
          <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg mb-4">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                <CardTitle>Privacy Settings</CardTitle>
              </div>
              <CardDescription>
                Control what information is visible to others
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Show Online Status</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Let others see when you're online
                  </FormDescription>
                </div>
                <Switch
                  checked={privacySettings.showOnline}
                  onCheckedChange={() => handlePrivacyChange('showOnline')}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Activity Visibility</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Share your learning progress with others
                  </FormDescription>
                </div>
                <Switch
                  checked={privacySettings.showActivity}
                  onCheckedChange={() => handlePrivacyChange('showActivity')}
                />
              </div>
              
              <Separator className="my-4" />
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <FormLabel>Public Profile</FormLabel>
                  <FormDescription className="text-xs text-muted-foreground">
                    Make your profile visible to other users
                  </FormDescription>
                </div>
                <Switch
                  checked={privacySettings.showProfile}
                  onCheckedChange={() => handlePrivacyChange('showProfile')}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <EyeOff className="h-5 w-5 text-elec-yellow" />
                <CardTitle>Data & Privacy</CardTitle>
              </div>
              <CardDescription>
                Manage your personal data and privacy options
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start" size="sm">
                Download Your Data
              </Button>
              <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive" size="sm">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
