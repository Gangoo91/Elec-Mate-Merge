
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useNotifications } from '@/components/notifications/NotificationProvider';

const AppearanceTab = () => {
  const { addNotification } = useNotifications();
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: true,
    highContrast: false,
    fontSize: 'medium',
  });
  
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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">Dark Mode</label>
          <p className="text-xs text-muted-foreground">
            Toggle dark mode on or off
          </p>
        </div>
        <Switch
          checked={appearanceSettings.darkMode}
          onCheckedChange={() => handleAppearanceChange('darkMode', null)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <label className="text-sm font-medium">High Contrast</label>
          <p className="text-xs text-muted-foreground">
            Increase contrast for better visibility
          </p>
        </div>
        <Switch
          checked={appearanceSettings.highContrast}
          onCheckedChange={() => handleAppearanceChange('highContrast', null)}
        />
      </div>
      
      <Separator className="my-4" />
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Font Size</label>
        <p className="text-xs text-muted-foreground">
          Adjust the text size throughout the app
        </p>
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
    </div>
  );
};

export default AppearanceTab;
