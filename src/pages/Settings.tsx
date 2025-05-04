
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
  Settings, 
  Shield, 
  EyeOff, 
  Moon, 
  Globe, 
  Mail, 
  LogOut
} from "lucide-react";

const SettingsPage = () => {
  const { user, signOut, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  const { addNotification } = useNotifications();
  
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
  
  return (
    <div className="container max-w-5xl mx-auto py-6 space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application settings and preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Tabs defaultValue="notifications">
          <TabsList className="bg-elec-gray border-b border-elec-yellow/20">
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 pt-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Notification Preferences</CardTitle>
                </div>
                <CardDescription>
                  Choose what notifications you want to receive
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive important updates via email
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailUpdates}
                      onCheckedChange={() => handleNotificationChange('emailUpdates')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Mentor Messages</h3>
                      <p className="text-sm text-muted-foreground">
                        Get notified when mentors send you messages
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.mentorMessages}
                      onCheckedChange={() => handleNotificationChange('mentorMessages')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Course Completions</h3>
                      <p className="text-sm text-muted-foreground">
                        Notifications when you complete courses
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.courseCompletions}
                      onCheckedChange={() => handleNotificationChange('courseCompletions')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">App Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Information about new features and updates
                      </p>
                    </div>
                    <Switch
                      checked={notificationSettings.appUpdates}
                      onCheckedChange={() => handleNotificationChange('appUpdates')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Tab */}
          <TabsContent value="appearance" className="space-y-6 pt-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Moon className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Appearance Settings</CardTitle>
                </div>
                <CardDescription>
                  Customize how ElecMate looks for you
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Toggle dark mode on or off
                      </p>
                    </div>
                    <Switch
                      checked={appearanceSettings.darkMode}
                      onCheckedChange={() => handleAppearanceChange('darkMode', null)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">High Contrast</h3>
                      <p className="text-sm text-muted-foreground">
                        Increase contrast for better visibility
                      </p>
                    </div>
                    <Switch
                      checked={appearanceSettings.highContrast}
                      onCheckedChange={() => handleAppearanceChange('highContrast', null)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Font Size</h3>
                    <p className="text-sm text-muted-foreground">
                      Adjust the text size throughout the app
                    </p>
                    <div className="flex gap-2">
                      {['small', 'medium', 'large'].map(size => (
                        <Button
                          key={size}
                          variant={appearanceSettings.fontSize === size ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleAppearanceChange('fontSize', size)}
                        >
                          {size.charAt(0).toUpperCase() + size.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6 pt-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Privacy Settings</CardTitle>
                </div>
                <CardDescription>
                  Control what information is visible to others
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Show Online Status</h3>
                      <p className="text-sm text-muted-foreground">
                        Let others see when you're online
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showOnline}
                      onCheckedChange={() => handlePrivacyChange('showOnline')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Activity Visibility</h3>
                      <p className="text-sm text-muted-foreground">
                        Share your learning progress with others
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showActivity}
                      onCheckedChange={() => handlePrivacyChange('showActivity')}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Public Profile</h3>
                      <p className="text-sm text-muted-foreground">
                        Make your profile visible to other users
                      </p>
                    </div>
                    <Switch
                      checked={privacySettings.showProfile}
                      onCheckedChange={() => handlePrivacyChange('showProfile')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <EyeOff className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Data & Privacy</CardTitle>
                </div>
                <CardDescription>
                  Manage your personal data and privacy options
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  Download Your Data
                </Button>
                <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Account Tab */}
          <TabsContent value="account" className="space-y-6 pt-4">
            <Card className="border-elec-yellow/20 bg-elec-gray">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-elec-yellow" />
                  <CardTitle>Account Settings</CardTitle>
                </div>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Email Address</h3>
                    <Input value={user?.email || ''} disabled className="bg-elec-gray/40" />
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Language</h3>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      <span>English (UK)</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Development Mode</h3>
                      <p className="text-sm text-muted-foreground">
                        Enable additional developer features
                      </p>
                    </div>
                    <Switch
                      checked={isDevelopmentMode}
                      onCheckedChange={handleDevModeToggle}
                    />
                  </div>
                  
                  <Separator />
                  
                  <Button 
                    variant="destructive" 
                    className="w-full"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
