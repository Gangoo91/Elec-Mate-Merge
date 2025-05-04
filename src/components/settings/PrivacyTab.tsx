
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { 
  Shield, 
  EyeOff, 
  Database, 
  Clock, 
  CheckCircle,
  Trash2, 
  FileText,
  Lock,
  MoveDown
} from "lucide-react";

const PrivacyTab = () => {
  const { addNotification } = useNotifications();
  
  const [privacySettings, setPrivacySettings] = useState({
    showOnline: true,
    showActivity: true,
    showProfile: true,
    cookiesAccepted: true,
    analytics: true,
    dataSelling: false,
    targetedAds: false
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

  const handleDataDownload = () => {
    addNotification({
      title: 'Data Request Submitted',
      message: 'Your data export will be emailed to you shortly.',
      type: 'info'
    });
  };

  const handleDeleteRequest = () => {
    addNotification({
      title: 'Delete Request Received',
      message: 'Please check your email to confirm account deletion.',
      type: 'warning'
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Profile Privacy</CardTitle>
          </div>
          <CardDescription>
            Control what information is visible to others
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Show Online Status</label>
              <p className="text-xs text-muted-foreground">
                Let others see when you're online
              </p>
            </div>
            <Switch
              checked={privacySettings.showOnline}
              onCheckedChange={() => handlePrivacyChange('showOnline')}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Activity Visibility</label>
              <p className="text-xs text-muted-foreground">
                Share your learning progress with others
              </p>
            </div>
            <Switch
              checked={privacySettings.showActivity}
              onCheckedChange={() => handlePrivacyChange('showActivity')}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Public Profile</label>
              <p className="text-xs text-muted-foreground">
                Make your profile visible to other users
              </p>
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
            <Database className="h-5 w-5 text-elec-yellow" />
            <CardTitle>Cookie & Data Preferences</CardTitle>
          </div>
          <CardDescription>
            Manage how we use your data
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Essential Cookies</label>
              <p className="text-xs text-muted-foreground">
                Required for the app to function
              </p>
            </div>
            <CheckCircle className="h-5 w-5 text-elec-yellow opacity-75" />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Analytics</label>
              <p className="text-xs text-muted-foreground">
                Allow us to collect usage data to improve the app
              </p>
            </div>
            <Switch
              checked={privacySettings.analytics}
              onCheckedChange={() => handlePrivacyChange('analytics')}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Personalized Ads</label>
              <p className="text-xs text-muted-foreground">
                Allow us to show you personalized advertisements
              </p>
            </div>
            <Switch
              checked={privacySettings.targetedAds}
              onCheckedChange={() => handlePrivacyChange('targetedAds')}
            />
          </div>
          
          <Separator className="my-4" />
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Data Selling</label>
              <p className="text-xs text-muted-foreground">
                Allow us to share your data with third parties
              </p>
            </div>
            <Switch
              checked={privacySettings.dataSelling}
              onCheckedChange={() => handlePrivacyChange('dataSelling')}
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
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-elec-yellow" />
              <span className="text-sm font-medium">Data Retention</span>
            </div>
            <p className="text-xs text-muted-foreground ml-6">
              We store your personal data for 24 months after your last activity
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <div className="grid grid-cols-1 gap-3">
            <Button 
              variant="outline" 
              onClick={handleDataDownload}
              className="justify-start"
            >
              <MoveDown className="h-4 w-4 mr-2 text-elec-yellow" />
              Download Your Data
            </Button>
            
            <Button 
              variant="outline" 
              className="justify-start"
            >
              <FileText className="h-4 w-4 mr-2 text-elec-yellow" />
              Privacy Policy
            </Button>
            
            <Button 
              variant="outline" 
              onClick={handleDeleteRequest} 
              className="justify-start text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyTab;
