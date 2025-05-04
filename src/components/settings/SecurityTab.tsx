
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { 
  ShieldCheck, 
  Key, 
  Smartphone, 
  AlertTriangle,
  RotateCw
} from "lucide-react";

const SecurityTab = () => {
  const { addNotification } = useNotifications();
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginNotifications: true,
    securityUpdates: true,
    passwordLastChanged: '3 months ago',
  });
  
  const handleSecurityChange = (key: keyof typeof securitySettings, value: any) => {
    setSecuritySettings(prev => {
      const newValue = typeof value === 'boolean' ? value : !prev[key];
      
      addNotification({
        title: 'Security Setting Updated',
        message: `${key} setting ${typeof value === 'boolean' ? (value ? 'enabled' : 'disabled') : 'updated'}.`,
        type: 'success'
      });
      
      return { ...prev, [key]: newValue };
    });
  };

  const handlePasswordReset = () => {
    addNotification({
      title: 'Password Reset',
      message: 'Password reset email has been sent to your inbox.',
      type: 'info'
    });
  };

  return (
    <div className="space-y-4">
      <div className="p-4 bg-amber-600/10 border border-amber-600/20 rounded-md">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium mb-1">Security recommendation</h4>
            <p className="text-xs text-muted-foreground">
              We recommend enabling two-factor authentication for enhanced account security.
            </p>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Two-factor Authentication</label>
          <p className="text-xs text-muted-foreground">
            Secure your account with a verification code
          </p>
        </div>
        <Switch
          checked={securitySettings.twoFactorAuth}
          onCheckedChange={(checked) => handleSecurityChange('twoFactorAuth', checked)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div>
        <div className="space-y-2 mb-4">
          <label className="text-sm font-medium">Password</label>
          <p className="text-xs text-muted-foreground mb-1">
            Last changed: {securitySettings.passwordLastChanged}
          </p>
          <Button 
            variant="outline" 
            onClick={handlePasswordReset}
            className="w-full flex gap-2 items-center justify-center"
          >
            <Key className="h-4 w-4" />
            Reset Password
          </Button>
        </div>
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Login Notifications</label>
          <p className="text-xs text-muted-foreground">
            Get notified of new login attempts
          </p>
        </div>
        <Switch
          checked={securitySettings.loginNotifications}
          onCheckedChange={(checked) => handleSecurityChange('loginNotifications', checked)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Security Updates</label>
          <p className="text-xs text-muted-foreground">
            Receive emails about security enhancements
          </p>
        </div>
        <Switch
          checked={securitySettings.securityUpdates}
          onCheckedChange={(checked) => handleSecurityChange('securityUpdates', checked)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Device Management</label>
        <p className="text-xs text-muted-foreground mb-2">
          Manage devices that are currently signed in
        </p>
        <div className="p-3 border border-elec-yellow/20 rounded-md flex items-center justify-between bg-elec-gray/80">
          <div className="flex items-center gap-3">
            <Smartphone className="h-4 w-4 text-elec-yellow" />
            <span className="text-sm">Current Device</span>
          </div>
          <span className="text-xs text-green-500">Active Now</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
