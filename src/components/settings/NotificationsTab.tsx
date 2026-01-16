import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import {
  Bell,
  Mail,
  MessageSquare,
  GraduationCap,
  Sparkles,
  AlertTriangle,
  Calendar,
  CreditCard,
  Shield,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react";

interface NotificationSetting {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
  enabled: boolean;
}

interface NotificationCategory {
  title: string;
  description: string;
  settings: NotificationSetting[];
}

const NotificationsTab = () => {
  const { addNotification } = useNotifications();
  const [isSaving, setIsSaving] = useState(false);
  const [allMuted, setAllMuted] = useState(false);

  const [categories, setCategories] = useState<NotificationCategory[]>([
    {
      title: "Communication",
      description: "Messages and updates from people",
      settings: [
        {
          key: "emailUpdates",
          label: "Email Updates",
          description: "Receive important updates via email",
          icon: Mail,
          iconColor: "text-blue-400",
          enabled: true,
        },
        {
          key: "mentorMessages",
          label: "Mentor Messages",
          description: "Get notified when mentors send you messages",
          icon: MessageSquare,
          iconColor: "text-green-400",
          enabled: true,
        },
      ],
    },
    {
      title: "Learning & Progress",
      description: "Updates about your courses and achievements",
      settings: [
        {
          key: "courseCompletions",
          label: "Course Completions",
          description: "Notifications when you complete courses",
          icon: GraduationCap,
          iconColor: "text-purple-400",
          enabled: true,
        },
        {
          key: "quizReminders",
          label: "Quiz Reminders",
          description: "Reminders about pending quizzes and assessments",
          icon: Calendar,
          iconColor: "text-orange-400",
          enabled: true,
        },
        {
          key: "achievementUnlocks",
          label: "Achievement Unlocks",
          description: "Celebrate when you earn new badges",
          icon: Sparkles,
          iconColor: "text-elec-yellow",
          enabled: true,
        },
      ],
    },
    {
      title: "Compliance & Safety",
      description: "Important alerts about certifications and safety",
      settings: [
        {
          key: "expiryAlerts",
          label: "Certification Expiry Alerts",
          description: "Warnings when certifications are about to expire",
          icon: AlertTriangle,
          iconColor: "text-amber-400",
          enabled: true,
        },
        {
          key: "safetyUpdates",
          label: "Safety Updates",
          description: "Important safety bulletins and regulation changes",
          icon: Shield,
          iconColor: "text-red-400",
          enabled: true,
        },
      ],
    },
    {
      title: "Billing & Account",
      description: "Payment and subscription notifications",
      settings: [
        {
          key: "billingAlerts",
          label: "Billing Alerts",
          description: "Payment confirmations and subscription updates",
          icon: CreditCard,
          iconColor: "text-emerald-400",
          enabled: true,
        },
        {
          key: "appUpdates",
          label: "App Updates",
          description: "Information about new features and updates",
          icon: Bell,
          iconColor: "text-cyan-400",
          enabled: false,
        },
      ],
    },
  ]);

  const handleToggle = (categoryIndex: number, settingIndex: number) => {
    setCategories(prev => {
      const newCategories = [...prev];
      const setting = newCategories[categoryIndex].settings[settingIndex];
      setting.enabled = !setting.enabled;

      addNotification({
        title: 'Notification Updated',
        message: `${setting.label} ${setting.enabled ? 'enabled' : 'disabled'}`,
        type: 'success'
      });

      return newCategories;
    });
  };

  const handleMuteAll = () => {
    setAllMuted(!allMuted);
    setCategories(prev =>
      prev.map(category => ({
        ...category,
        settings: category.settings.map(setting => ({
          ...setting,
          enabled: allMuted, // If currently muted, enable all. If not muted, disable all.
        })),
      }))
    );

    addNotification({
      title: allMuted ? 'Notifications Enabled' : 'Notifications Muted',
      message: allMuted ? 'All notifications have been enabled' : 'All notifications have been muted',
      type: 'info'
    });
  };

  const handleSavePreferences = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsSaving(false);
    addNotification({
      title: 'Preferences Saved',
      message: 'Your notification preferences have been saved',
      type: 'success'
    });
  };

  const enabledCount = categories.reduce(
    (acc, cat) => acc + cat.settings.filter(s => s.enabled).length,
    0
  );
  const totalCount = categories.reduce((acc, cat) => acc + cat.settings.length, 0);

  return (
    <div className="space-y-6">
      {/* Header with mute all */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
                <Bell className="h-6 w-6 text-elec-yellow" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                <p className="text-sm text-muted-foreground">
                  {enabledCount} of {totalCount} notifications enabled
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`h-11 touch-manipulation active:scale-[0.98] border-white/20 ${allMuted ? 'bg-red-500/10 border-red-500/30 text-red-400' : 'hover:bg-white/5'}`}
              onClick={handleMuteAll}
            >
              {allMuted ? (
                <>
                  <VolumeX className="h-4 w-4 mr-2" />
                  Unmute All
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4 mr-2" />
                  Mute All
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Notification Categories */}
      {categories.map((category, categoryIndex) => (
        <div
          key={category.title}
          className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden"
        >
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground">{category.title}</h3>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
          <div className="p-4 md:p-6 space-y-3">
            {category.settings.map((setting, settingIndex) => {
              const Icon = setting.icon;
              return (
                <div
                  key={setting.key}
                  className={`flex items-center justify-between gap-4 p-4 rounded-lg border transition-all duration-200 touch-manipulation cursor-pointer active:bg-white/[0.08] ${
                    setting.enabled
                      ? 'bg-white/5 border-white/10'
                      : 'bg-white/[0.02] border-white/5 opacity-60'
                  }`}
                  onClick={() => handleToggle(categoryIndex, settingIndex)}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      setting.enabled ? 'bg-white/10' : 'bg-white/5'
                    }`}>
                      <Icon className={`h-5 w-5 ${setting.enabled ? setting.iconColor : 'text-muted-foreground'}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{setting.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{setting.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggle(categoryIndex, settingIndex)}
                    disabled={allMuted && !setting.enabled}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSavePreferences}
          className="w-full sm:w-auto h-11 touch-manipulation active:scale-[0.98] bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            'Save Preferences'
          )}
        </Button>
      </div>
    </div>
  );
};

export default NotificationsTab;
