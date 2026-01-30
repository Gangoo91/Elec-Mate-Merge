import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import {
  Shield,
  Database,
  Clock,
  CheckCircle,
  Trash2,
  Lock,
  Download,
  Cookie,
  BarChart3,
  AlertTriangle,
  Loader2,
  FileText,
  ExternalLink,
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

const COOKIE_PREFERENCES_KEY = 'elec-mate-cookie-preferences';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

const PrivacyTab = () => {
  const { addNotification } = useNotifications();
  const [isExporting, setIsExporting] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
  });

  // Load saved cookie preferences
  useEffect(() => {
    const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCookiePrefs(parsed);
      } catch {
        // Invalid JSON, use defaults
      }
    }
  }, []);

  const handleCookieToggle = (key: keyof CookiePreferences) => {
    if (key === 'essential') return; // Can't disable essential cookies

    const newPrefs = { ...cookiePrefs, [key]: !cookiePrefs[key] };
    setCookiePrefs(newPrefs);
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPrefs));

    // Dispatch event for analytics providers
    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: newPrefs }));

    addNotification({
      title: 'Cookie Preferences Updated',
      message: `Analytics cookies ${newPrefs.analytics ? 'enabled' : 'disabled'}`,
      type: 'success'
    });
  };

  const handleDataDownload = async () => {
    setIsExporting(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Not authenticated');
      }

      const response = await supabase.functions.invoke('user-data-export', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (response.error) {
        throw new Error(response.error.message || 'Failed to export data');
      }

      // Create and download the file
      const blob = new Blob([JSON.stringify(response.data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `elec-mate-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      addNotification({
        title: 'Data Exported',
        message: 'Your data has been downloaded successfully.',
        type: 'success'
      });
    } catch (error) {
      console.error('Data export error:', error);
      addNotification({
        title: 'Export Failed',
        message: error instanceof Error ? error.message : 'Failed to export your data. Please try again.',
        type: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteRequest = () => {
    addNotification({
      title: 'Delete Request',
      message: 'Please contact support@elec-mate.com to request account deletion.',
      type: 'info'
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
            <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <Shield className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Privacy & Data</h3>
              <p className="text-sm text-muted-foreground">
                Manage your data and cookie preferences
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cookie Preferences */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Cookie className="h-4 w-4 text-elec-yellow" />
            Cookie Preferences
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Control how we use cookies on your device
          </p>
        </div>
        <div className="p-4 md:p-6 space-y-3">
          {/* Essential Cookies */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
                <Lock className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-foreground">Essential Cookies</p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-elec-yellow/20 text-elec-yellow font-medium">
                    Required
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Authentication and security</p>
              </div>
            </div>
            <CheckCircle className="h-5 w-5 text-elec-yellow flex-shrink-0" />
          </div>

          {/* Analytics Cookies */}
          <div
            className="flex items-center justify-between gap-4 p-4 rounded-lg bg-white/5 border border-white/10 cursor-pointer touch-manipulation active:bg-white/[0.08]"
            onClick={() => handleCookieToggle('analytics')}
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                cookiePrefs.analytics ? 'bg-cyan-500/10' : 'bg-white/5'
              }`}>
                <BarChart3 className={`h-5 w-5 ${cookiePrefs.analytics ? 'text-cyan-400' : 'text-muted-foreground'}`} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">Analytics Cookies</p>
                <p className="text-xs text-muted-foreground">Help us improve the platform</p>
              </div>
            </div>
            <Switch
              checked={cookiePrefs.analytics}
              onCheckedChange={() => handleCookieToggle('analytics')}
              className="data-[state=checked]:bg-elec-yellow"
            />
          </div>

          <Link
            to="/cookies"
            className="flex items-center gap-2 text-sm text-elec-yellow hover:underline mt-2 touch-manipulation"
          >
            <FileText className="h-4 w-4" />
            View Cookie Policy
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </motion.div>

      {/* Your Data Rights */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Database className="h-4 w-4 text-elec-yellow" />
            Your Data Rights
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Under UK GDPR, you have the right to access and control your data
          </p>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          {/* Data Retention Notice */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Data Retention</p>
              <p className="text-xs text-muted-foreground mt-1">
                We keep your data for as long as your account is active. If you delete your account, we'll remove your data within 30 days.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleDataDownload}
              disabled={isExporting}
              className="flex items-center justify-center gap-2 h-12 touch-manipulation active:scale-[0.98] border-white/10 hover:bg-white/5 disabled:opacity-50"
            >
              {isExporting ? (
                <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
              ) : (
                <Download className="h-4 w-4 text-elec-yellow" />
              )}
              <span>{isExporting ? 'Exporting...' : 'Download My Data'}</span>
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
                Deleting your account is permanent. All your data, certificates, Elec-ID, and study progress will be permanently removed.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Legal Documents */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-4 w-4 text-elec-yellow" />
            Legal Documents
          </h3>
        </div>
        <div className="p-4 md:p-6 space-y-2">
          <Link
            to="/privacy"
            className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-manipulation active:bg-white/[0.08]"
          >
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium text-foreground">Privacy Policy</span>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>

          <Link
            to="/terms"
            className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-manipulation active:bg-white/[0.08]"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium text-foreground">Terms of Service</span>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>

          <Link
            to="/cookies"
            className="flex items-center justify-between gap-4 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors touch-manipulation active:bg-white/[0.08]"
          >
            <div className="flex items-center gap-3">
              <Cookie className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-medium text-foreground">Cookie Policy</span>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrivacyTab;
