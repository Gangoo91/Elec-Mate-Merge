
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { LogOut, Globe, User } from "lucide-react";

const AccountTab = () => {
  const { user, signOut, isDevelopmentMode, toggleDevelopmentMode } = useAuth();
  const { addNotification } = useNotifications();

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
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Email Address</label>
        <Input value={user?.email || ''} disabled className="bg-elec-gray/40" />
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

export default AccountTab;
