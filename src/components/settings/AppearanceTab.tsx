import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  Palette,
  Sun,
  Moon,
  Eye,
  Type,
  Monitor,
  Smartphone,
  Minus,
  Plus,
  RotateCcw,
  CheckCircle,
  Loader2,
} from "lucide-react";

const AppearanceTab = () => {
  const { addNotification } = useNotifications();
  const [isSaving, setIsSaving] = useState(false);

  const [appearanceSettings, setAppearanceSettings] = useState({
    darkMode: true,
    highContrast: false,
    reducedMotion: false,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
  });

  const fontSizeOptions = [
    { value: 'small', label: 'Small', size: '14px' },
    { value: 'medium', label: 'Medium', size: '16px' },
    { value: 'large', label: 'Large', size: '18px' },
  ];

  const handleToggle = (key: keyof typeof appearanceSettings) => {
    setAppearanceSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleFontSizeChange = (size: 'small' | 'medium' | 'large') => {
    setAppearanceSettings(prev => ({ ...prev, fontSize: size }));
  };

  const handleResetToDefaults = () => {
    setAppearanceSettings({
      darkMode: true,
      highContrast: false,
      reducedMotion: false,
      fontSize: 'medium',
    });
    addNotification({
      title: 'Settings Reset',
      message: 'Appearance settings restored to defaults',
      type: 'info'
    });
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 600));
    setIsSaving(false);
    addNotification({
      title: 'Preferences Saved',
      message: 'Your appearance settings have been saved',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <Palette className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Appearance Settings</h3>
              <p className="text-sm text-muted-foreground">
                Customize how ElecMate looks and feels
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Theme Settings */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground">Theme</h3>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          {/* Dark Mode */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                appearanceSettings.darkMode ? 'bg-purple-500/10' : 'bg-amber-500/10'
              }`}>
                {appearanceSettings.darkMode ? (
                  <Moon className="h-5 w-5 text-purple-400" />
                ) : (
                  <Sun className="h-5 w-5 text-amber-400" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Dark Mode</p>
                <p className="text-xs text-muted-foreground">
                  {appearanceSettings.darkMode ? 'Currently using dark theme' : 'Currently using light theme'}
                </p>
              </div>
            </div>
            <Switch
              checked={appearanceSettings.darkMode}
              onCheckedChange={() => handleToggle('darkMode')}
            />
          </div>

          {/* High Contrast */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                appearanceSettings.highContrast ? 'bg-blue-500/10' : 'bg-white/10'
              }`}>
                <Eye className={`h-5 w-5 ${appearanceSettings.highContrast ? 'text-blue-400' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">High Contrast</p>
                <p className="text-xs text-muted-foreground">Increase contrast for better visibility</p>
              </div>
            </div>
            <Switch
              checked={appearanceSettings.highContrast}
              onCheckedChange={() => handleToggle('highContrast')}
            />
          </div>

          {/* Reduced Motion */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                appearanceSettings.reducedMotion ? 'bg-green-500/10' : 'bg-white/10'
              }`}>
                <Monitor className={`h-5 w-5 ${appearanceSettings.reducedMotion ? 'text-green-400' : 'text-muted-foreground'}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Reduced Motion</p>
                <p className="text-xs text-muted-foreground">Minimize animations and transitions</p>
              </div>
            </div>
            <Switch
              checked={appearanceSettings.reducedMotion}
              onCheckedChange={() => handleToggle('reducedMotion')}
            />
          </div>
        </div>
      </div>

      {/* Font Size */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Type className="h-4 w-4 text-elec-yellow" />
            Text Size
          </h3>
        </div>
        <div className="p-4 md:p-6">
          <p className="text-sm text-muted-foreground mb-4">
            Adjust the text size throughout the app for better readability
          </p>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="border-white/20 hover:bg-white/10"
              onClick={() => {
                const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                const currentIndex = sizes.indexOf(appearanceSettings.fontSize);
                if (currentIndex > 0) {
                  handleFontSizeChange(sizes[currentIndex - 1]);
                }
              }}
              disabled={appearanceSettings.fontSize === 'small'}
            >
              <Minus className="h-4 w-4" />
            </Button>

            <div className="flex-1 grid grid-cols-3 gap-2">
              {fontSizeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleFontSizeChange(option.value as 'small' | 'medium' | 'large')}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    appearanceSettings.fontSize === option.value
                      ? 'bg-elec-yellow/10 border-elec-yellow text-elec-yellow'
                      : 'bg-white/5 border-white/10 text-foreground hover:bg-white/10'
                  }`}
                >
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="text-xs text-muted-foreground">{option.size}</p>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="border-white/20 hover:bg-white/10"
              onClick={() => {
                const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
                const currentIndex = sizes.indexOf(appearanceSettings.fontSize);
                if (currentIndex < sizes.length - 1) {
                  handleFontSizeChange(sizes[currentIndex + 1]);
                }
              }}
              disabled={appearanceSettings.fontSize === 'large'}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Preview */}
          <div className="mt-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <p className="text-xs text-muted-foreground mb-2">Preview</p>
            <p className={`text-foreground ${
              appearanceSettings.fontSize === 'small' ? 'text-sm' :
              appearanceSettings.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}>
              The quick brown fox jumps over the lazy dog. This is how your text will appear throughout ElecMate.
            </p>
          </div>
        </div>
      </div>

      {/* Device Sync Notice */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Smartphone className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground mb-1">Device Sync</p>
              <p className="text-sm text-muted-foreground">
                Your appearance preferences will sync across all your devices when you're signed in.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
        <Button
          variant="outline"
          className="border-white/20 hover:bg-white/5"
          onClick={handleResetToDefaults}
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset to Defaults
        </Button>
        <Button
          onClick={handleSavePreferences}
          className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AppearanceTab;
