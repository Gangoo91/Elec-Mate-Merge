import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { motion } from "framer-motion";
import {
  Shield,
  EyeOff,
  Eye,
  Database,
  Clock,
  CheckCircle,
  Trash2,
  FileText,
  Lock,
  Download,
  Globe,
  Activity,
  Cookie,
  BarChart3,
  Target,
  Share2,
  AlertTriangle,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.02, delayChildren: 0 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.2, ease: 'easeOut' }
  }
};

interface PrivacySetting {
  key: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  enabled: boolean;
  locked?: boolean;
}

const PrivacyTab = () => {
  const { addNotification } = useNotifications();

  const [profileSettings, setProfileSettings] = useState<PrivacySetting[]>([
    {
      key: "showOnline",
      label: "Show Online Status",
      description: "Let others see when you're online",
      icon: Globe,
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      enabled: true,
    },
    {
      key: "showActivity",
      label: "Activity Visibility",
      description: "Share your learning progress with others",
      icon: Activity,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      enabled: true,
    },
    {
      key: "showProfile",
      label: "Public Profile",
      description: "Make your profile visible to other users",
      icon: Eye,
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      enabled: true,
    },
  ]);

  const [dataSettings, setDataSettings] = useState<PrivacySetting[]>([
    {
      key: "essentialCookies",
      label: "Essential Cookies",
      description: "Required for the app to function properly",
      icon: Cookie,
      iconBg: "bg-elec-yellow/10",
      iconColor: "text-elec-yellow",
      enabled: true,
      locked: true,
    },
    {
      key: "analytics",
      label: "Analytics",
      description: "Help us improve by collecting usage data",
      icon: BarChart3,
      iconBg: "bg-cyan-500/10",
      iconColor: "text-cyan-400",
      enabled: true,
    },
    {
      key: "targetedAds",
      label: "Personalized Ads",
      description: "Allow personalized advertisements",
      icon: Target,
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-400",
      enabled: false,
    },
    {
      key: "dataSelling",
      label: "Data Sharing",
      description: "Share data with third-party partners",
      icon: Share2,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-400",
      enabled: false,
    },
  ]);

  const handleToggle = (
    settings: PrivacySetting[],
    setSettings: React.Dispatch<React.SetStateAction<PrivacySetting[]>>,
    key: string
  ) => {
    setSettings(prev => {
      const newSettings = prev.map(s =>
        s.key === key && !s.locked ? { ...s, enabled: !s.enabled } : s
      );
      const setting = newSettings.find(s => s.key === key);
      if (setting && !setting.locked) {
        addNotification({
          title: 'Privacy Setting Updated',
          message: `${setting.label} ${setting.enabled ? 'enabled' : 'disabled'}`,
          type: 'success'
        });
      }
      return newSettings;
    });
  };

  const handleDataDownload = () => {
    addNotification({
      title: 'Data Request Submitted',
      message: 'Your data export will be emailed to you within 24 hours.',
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-rose-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Privacy Settings</h3>
              <p className="text-sm text-muted-foreground">
                Control your data and what others can see
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Profile Privacy */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4 text-elec-yellow" />
            Profile Privacy
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Control what information is visible to others
          </p>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          {profileSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.key}
                className={`flex items-center justify-between gap-4 p-4 rounded-lg border transition-all duration-200 touch-manipulation cursor-pointer active:bg-white/[0.08] ${
                  setting.enabled
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/[0.02] border-white/5 opacity-60'
                }`}
                onClick={() => handleToggle(profileSettings, setProfileSettings, setting.key)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    setting.enabled ? setting.iconBg : 'bg-white/5'
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
                  onCheckedChange={() => handleToggle(profileSettings, setProfileSettings, setting.key)}
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Cookie & Data Preferences */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Database className="h-4 w-4 text-elec-yellow" />
            Cookie & Data Preferences
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage how we use your data
          </p>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          {dataSettings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div
                key={setting.key}
                className={`flex items-center justify-between gap-4 p-4 rounded-lg border transition-all duration-200 ${setting.locked ? '' : 'touch-manipulation cursor-pointer active:bg-white/[0.08]'} ${
                  setting.enabled
                    ? 'bg-white/5 border-white/10'
                    : 'bg-white/[0.02] border-white/5 opacity-60'
                }`}
                onClick={() => !setting.locked && handleToggle(dataSettings, setDataSettings, setting.key)}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    setting.enabled ? setting.iconBg : 'bg-white/5'
                  }`}>
                    <Icon className={`h-5 w-5 ${setting.enabled ? setting.iconColor : 'text-muted-foreground'}`} />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground truncate">{setting.label}</p>
                      {setting.locked && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-elec-yellow/20 text-elec-yellow font-medium">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{setting.description}</p>
                  </div>
                </div>
                {setting.locked ? (
                  <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                ) : (
                  <Switch
                    checked={setting.enabled}
                    onCheckedChange={() => handleToggle(dataSettings, setDataSettings, setting.key)}
                  />
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Data & Privacy Actions */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <EyeOff className="h-4 w-4 text-elec-yellow" />
            Your Data
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and control your personal data
          </p>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          {/* Data Retention Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Data Retention</p>
              <p className="text-xs text-muted-foreground mt-1">
                We store your personal data for 24 months after your last activity. You can request deletion at any time.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button
              variant="outline"
              onClick={handleDataDownload}
              className="flex items-center justify-center gap-2 h-12 touch-manipulation active:scale-[0.98] border-white/10 hover:bg-white/5"
            >
              <Download className="h-4 w-4 text-elec-yellow" />
              <span>Download Data</span>
            </Button>

            <Button
              variant="outline"
              className="flex items-center justify-center gap-2 h-12 touch-manipulation active:scale-[0.98] border-white/10 hover:bg-white/5"
            >
              <FileText className="h-4 w-4 text-elec-yellow" />
              <span>Privacy Policy</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleDeleteRequest}
              className="flex items-center justify-center gap-2 h-12 touch-manipulation active:scale-[0.98] border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              <span>Delete Account</span>
            </Button>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <AlertTriangle className="h-5 w-5 text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">Account Deletion</p>
              <p className="text-xs text-muted-foreground mt-1">
                Deleting your account is permanent and cannot be undone. All your data, certificates, and progress will be permanently removed.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyTab;
