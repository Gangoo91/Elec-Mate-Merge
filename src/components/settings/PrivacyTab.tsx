
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { FormDescription, FormLabel } from '@/components/ui/form';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { Shield, EyeOff } from "lucide-react";

const PrivacyTab = () => {
  const { addNotification } = useNotifications();
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnline: true,
    showActivity: true,
    showProfile: true
  });
  
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

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
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
    </div>
  );
};

export default PrivacyTab;
