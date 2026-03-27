// ELE-400, ELE-403, ELE-405, ELE-406, ELE-407, ELE-408, ELE-491
import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { useHaptic } from '@/hooks/useHaptic';
import { useAuth } from '@/contexts/AuthContext';
import { clearCredentials, setBiometricEnabled } from '@/utils/biometricAuth';
import { openExternalUrl } from '@/utils/open-external-url';
import { Capacitor } from '@capacitor/core';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
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
  Loader2,
  FileText,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Edit3,
  Ban,
  MessageSquareWarning,
  Flag,
  BadgeCheck,
  Info,
} from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.03, delayChildren: 0 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.22, ease: 'easeOut' } },
};

const COOKIE_PREFERENCES_KEY = 'elec-mate-cookie-preferences';
const isNative = Capacitor.isNativePlatform();

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
}

interface AuditEntry {
  action: string;
  created_at: string;
}

const actionLabels: Record<string, string> = {
  gdpr_data_export: 'Data export downloaded',
  gdpr_account_deletion_requested: 'Account deletion requested',
};

const PrivacyTab = () => {
  const { addNotification } = useNotifications();
  const haptic = useHaptic();
  const { user } = useAuth();
  const userId = user?.id ?? '';

  const [isExporting, setIsExporting] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [showRights, setShowRights] = useState(false);
  const [cookiePrefs, setCookiePrefs] = useState<CookiePreferences>({
    essential: true,
    analytics: true,
  });
  const [auditLog, setAuditLog] = useState<AuditEntry[]>([]);

  // Load cookie preferences — Supabase first, localStorage fallback
  useEffect(() => {
    const loadPrefs = async () => {
      if (userId) {
        const { data } = await supabase
          .from('user_settings')
          .select('value')
          .eq('user_id', userId)
          .eq('key', 'cookie_preferences')
          .single();
        if (data?.value && typeof data.value === 'object') {
          setCookiePrefs(data.value as CookiePreferences);
          return;
        }
      }
      const saved = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (saved) {
        try {
          setCookiePrefs(JSON.parse(saved));
        } catch {
          /* ignore */
        }
      }
    };
    loadPrefs();
  }, [userId]);

  // Load GDPR activity log
  useEffect(() => {
    if (!userId) return;
    supabase
      .from('security_audit_log')
      .select('action, created_at')
      .eq('user_id', userId)
      .in('action', ['gdpr_data_export', 'gdpr_account_deletion_requested'])
      .order('created_at', { ascending: false })
      .limit(5)
      .then(({ data }) => {
        if (data) setAuditLog(data as AuditEntry[]);
      });
  }, [userId]);

  const handleCookieToggle = useCallback(
    async (key: keyof CookiePreferences) => {
      if (key === 'essential') return;
      const newPrefs = { ...cookiePrefs, [key]: !cookiePrefs[key] };
      setCookiePrefs(newPrefs);
      localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(newPrefs));
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: newPrefs }));
      // Persist to Supabase for cross-device consistency (silently falls back to localStorage if unavailable)
      if (userId) {
        try {
          await supabase
            .from('user_settings')
            .upsert(
              { user_id: userId, key: 'cookie_preferences', value: newPrefs },
              { onConflict: 'user_id,key' }
            );
        } catch {
          // localStorage already saved above — Supabase sync is best-effort
        }
      }
      addNotification({
        title: 'Cookie Preferences Updated',
        message: `Analytics cookies ${newPrefs.analytics ? 'enabled' : 'disabled'}`,
        type: 'success',
      });
    },
    [cookiePrefs, userId, addNotification]
  );

  const handleDataDownload = async () => {
    setIsExporting(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const response = await supabase.functions.invoke('user-data-export', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });

      if (response.error) throw new Error(response.error.message || 'Failed to export data');

      const jsonStr = JSON.stringify(response.data, null, 2);
      const fileName = `elec-mate-export-${new Date().toISOString().split('T')[0]}.json`;

      if (isNative) {
        // Native: write to cache then share via OS share sheet
        const { Filesystem, Directory, Encoding } = await import('@capacitor/filesystem');
        const { Share } = await import('@capacitor/share');
        await Filesystem.writeFile({
          path: fileName,
          data: jsonStr,
          directory: Directory.Cache,
          encoding: Encoding.UTF8,
        });
        const { uri } = await Filesystem.getUri({ path: fileName, directory: Directory.Cache });
        await Share.share({
          title: 'Your Elec-Mate Data Export',
          url: uri,
          dialogTitle: 'Save or share your data export',
        });
      } else {
        // Web: blob download
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }

      addNotification({
        title: 'Data Exported',
        message: 'Your data has been exported. A confirmation email has been sent to your address.',
        type: 'success',
      });

      // Refresh audit log
      if (userId) {
        const { data } = await supabase
          .from('security_audit_log')
          .select('action, created_at')
          .eq('user_id', userId)
          .in('action', ['gdpr_data_export', 'gdpr_account_deletion_requested'])
          .order('created_at', { ascending: false })
          .limit(5);
        if (data) setAuditLog(data as AuditEntry[]);
      }
    } catch (error) {
      console.error('Data export error:', error);
      addNotification({
        title: 'Export Failed',
        message:
          error instanceof Error ? error.message : 'Failed to export your data. Please try again.',
        type: 'error',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (deleteConfirmText !== 'DELETE') return;
    haptic.heavy();
    setIsDeleting(true);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      const { error } = await supabase.functions.invoke('delete-own-account', {
        headers: { Authorization: `Bearer ${session.access_token}` },
      });
      if (error) throw error;

      await clearCredentials();
      await setBiometricEnabled(false);
      await supabase.auth.signOut();
      window.location.replace('/');
    } catch (err) {
      console.error('Account deletion error:', err);
      haptic.error();
      addNotification({
        title: 'Deletion Failed',
        message: 'Could not delete your account. Please contact privacy@elec-mate.com',
        type: 'error',
      });
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const openMailto = (subject: string, body?: string) => {
    const url = `mailto:privacy@elec-mate.com?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
    openExternalUrl(url);
  };

  const gdprRights = [
    {
      article: 'Art. 15',
      title: 'Right of Access',
      description: 'Request a copy of all personal data we hold about you.',
      action: () => handleDataDownload(),
      actionLabel: 'Download My Data',
      icon: Download,
      colour: 'text-elec-yellow',
      bg: 'bg-elec-yellow/10',
    },
    {
      article: 'Art. 16',
      title: 'Right to Rectification',
      description: 'Request correction of inaccurate or incomplete personal data.',
      action: () =>
        openMailto(
          'Data Correction Request',
          `User ID: ${userId}\n\nPlease describe the data that needs correcting:\n`
        ),
      actionLabel: 'Request Correction',
      icon: Edit3,
      colour: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      article: 'Art. 17',
      title: 'Right to Erasure',
      description: 'Request permanent deletion of your account and all associated data.',
      action: () => setShowDeleteDialog(true),
      actionLabel: 'Delete Account',
      icon: Trash2,
      colour: 'text-red-400',
      bg: 'bg-red-500/10',
    },
    {
      article: 'Art. 18',
      title: 'Right to Restrict Processing',
      description: 'Request that we limit how we use your data while a dispute is resolved.',
      action: () =>
        openMailto(
          'Request to Restrict Processing',
          `User ID: ${userId}\n\nPlease describe what processing you wish to restrict:\n`
        ),
      actionLabel: 'Request Restriction',
      icon: Ban,
      colour: 'text-amber-400',
      bg: 'bg-amber-500/10',
    },
    {
      article: 'Art. 20',
      title: 'Right to Data Portability',
      description: 'Receive your data in a structured, machine-readable format.',
      action: () => handleDataDownload(),
      actionLabel: 'Export My Data',
      icon: Database,
      colour: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      article: 'Art. 21',
      title: 'Right to Object',
      description: 'Object to processing of your data for direct marketing or profiling.',
      action: () =>
        openMailto(
          'Right to Object',
          `User ID: ${userId}\n\nI wish to object to the following processing:\n`
        ),
      actionLabel: 'Lodge Objection',
      icon: MessageSquareWarning,
      colour: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      article: 'Art. 77',
      title: 'Right to Complain',
      description: "Lodge a complaint with the Information Commissioner's Office (ICO).",
      action: () => openExternalUrl('https://ico.org.uk/make-a-complaint/'),
      actionLabel: 'Contact ICO',
      icon: Flag,
      colour: 'text-pink-400',
      bg: 'bg-pink-500/10',
    },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-background"
    >
      {/* ── YOUR DATA ── */}
      <motion.p
        variants={itemVariants}
        className="text-xs font-semibold text-white uppercase tracking-widest px-1 mb-2 mt-2"
      >
        Your Data
      </motion.p>

      {/* Data Retention */}
      <motion.div
        variants={itemVariants}
        className="flex items-center gap-4 w-full py-4 border-b border-white/[0.06]"
      >
        <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
          <Clock className="h-4 w-4 text-blue-400" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white">Data Retention</p>
          <p className="text-xs text-white mt-0.5">
            Kept while active. Deleted within 30 days of account removal.
          </p>
        </div>
      </motion.div>

      {/* Download My Data */}
      <motion.button
        variants={itemVariants}
        onClick={handleDataDownload}
        disabled={isExporting}
        className="flex items-center gap-4 w-full py-4 border-b border-white/[0.06] touch-manipulation disabled:opacity-50 active:bg-white/[0.03] transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
          {isExporting ? (
            <Loader2 className="h-4 w-4 text-elec-yellow animate-spin" />
          ) : (
            <Download className="h-4 w-4 text-elec-yellow" />
          )}
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-white">
            {isExporting ? 'Exporting...' : 'Download My Data'}
          </p>
          <p className="text-xs text-white mt-0.5">Full GDPR data export (Art. 15)</p>
        </div>
        <ChevronRight className="h-4 w-4 text-white/30 flex-shrink-0" />
      </motion.button>

      {/* Delete Account */}
      <motion.button
        variants={itemVariants}
        onClick={() => setShowDeleteDialog(true)}
        className="flex items-center gap-4 w-full py-4 border-b border-white/[0.06] touch-manipulation active:bg-red-500/[0.03] transition-colors"
      >
        <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
          <Trash2 className="h-4 w-4 text-red-400" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="text-sm font-medium text-red-400">Delete Account</p>
          <p className="text-xs text-white mt-0.5">Permanently remove all data (Art. 17)</p>
        </div>
        <ChevronRight className="h-4 w-4 text-red-400/40 flex-shrink-0" />
      </motion.button>

      {/* GDPR Rights — expandable */}
      <motion.div variants={itemVariants} className="border-b border-white/[0.06]">
        <button
          onClick={() => setShowRights(!showRights)}
          className="flex items-center gap-4 w-full py-4 touch-manipulation active:bg-white/[0.03] transition-colors"
        >
          <div className="w-9 h-9 rounded-xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
            <BadgeCheck className="h-4 w-4 text-elec-yellow" />
          </div>
          <div className="flex-1 min-w-0 text-left">
            <p className="text-sm font-medium text-white">Your GDPR Rights</p>
            <p className="text-xs text-white mt-0.5">
              Art. 15-21 — access, correct, erase, restrict, port, object
            </p>
          </div>
          {showRights ? (
            <ChevronUp className="h-4 w-4 text-white/30 flex-shrink-0" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/30 flex-shrink-0" />
          )}
        </button>

        <AnimatePresence>
          {showRights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pb-4 space-y-1">
                {gdprRights.map((right) => {
                  const Icon = right.icon;
                  return (
                    <button
                      key={right.article}
                      onClick={right.action}
                      className="flex items-center gap-3 w-full py-3 pl-[52px] pr-1 touch-manipulation active:bg-white/[0.03] transition-colors text-left"
                    >
                      <div
                        className={`w-8 h-8 rounded-lg ${right.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon className={`h-3.5 w-3.5 ${right.colour}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-white">{right.article}</span>
                          <p className="text-sm font-medium text-white">{right.title}</p>
                        </div>
                        <p className="text-xs text-white mt-0.5 leading-relaxed">
                          {right.description}
                        </p>
                      </div>
                      <ChevronRight
                        className={`h-3.5 w-3.5 ${right.colour} opacity-40 flex-shrink-0`}
                      />
                    </button>
                  );
                })}

                {/* ICO complaint info */}
                <div className="flex items-start gap-3 pl-[52px] pr-1 pt-2">
                  <Info className="h-4 w-4 text-white/30 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-white leading-relaxed">
                    To exercise any right, contact{' '}
                    <button
                      onClick={() => openExternalUrl('mailto:privacy@elec-mate.com')}
                      className="text-elec-yellow touch-manipulation"
                    >
                      privacy@elec-mate.com
                    </button>
                    . We respond within one month as required by law.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── COOKIES (web only) ── */}
      {!isNative && (
        <>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold text-white uppercase tracking-widest px-1 mb-2 mt-6"
          >
            Cookies
          </motion.p>

          {/* Essential Cookies */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 w-full py-4 border-b border-white/[0.06]"
          >
            <div className="w-9 h-9 rounded-xl bg-elec-yellow/10 flex items-center justify-center flex-shrink-0">
              <Lock className="h-4 w-4 text-elec-yellow" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-white">Essential Cookies</p>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-elec-yellow/20 text-elec-yellow font-medium">
                  Required
                </span>
              </div>
              <p className="text-xs text-white mt-0.5">Authentication and security</p>
            </div>
            <CheckCircle className="h-4 w-4 text-elec-yellow flex-shrink-0" />
          </motion.div>

          {/* Analytics Cookies */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 w-full py-4 border-b border-white/[0.06]"
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cookiePrefs.analytics ? 'bg-cyan-500/10' : 'bg-white/5'}`}
            >
              <BarChart3
                className={`h-4 w-4 ${cookiePrefs.analytics ? 'text-cyan-400' : 'text-white'}`}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">Analytics Cookies</p>
              <p className="text-xs text-white mt-0.5">Help us improve the platform</p>
            </div>
            <Switch
              checked={cookiePrefs.analytics}
              onCheckedChange={() => handleCookieToggle('analytics')}
              className="data-[state=checked]:bg-elec-yellow touch-manipulation"
            />
          </motion.div>
        </>
      )}

      {/* ── LEGAL ── */}
      <motion.p
        variants={itemVariants}
        className="text-xs font-semibold text-white uppercase tracking-widest px-1 mb-2 mt-6"
      >
        Legal
      </motion.p>

      {[
        {
          to: '/privacy',
          icon: Shield,
          colour: 'text-green-400',
          bg: 'bg-green-500/10',
          label: 'Privacy Policy',
        },
        {
          to: '/terms',
          icon: FileText,
          colour: 'text-blue-400',
          bg: 'bg-blue-500/10',
          label: 'Terms of Service',
        },
        {
          to: '/cookies',
          icon: Cookie,
          colour: 'text-amber-400',
          bg: 'bg-amber-500/10',
          label: 'Cookie Policy',
        },
        {
          to: '/dpa',
          icon: Database,
          colour: 'text-purple-400',
          bg: 'bg-purple-500/10',
          label: 'Data Processing Agreement',
        },
      ].map(({ to, icon: Icon, colour, bg, label }) => (
        <motion.div key={to} variants={itemVariants}>
          <Link
            to={to}
            className="flex items-center gap-4 w-full py-4 border-b border-white/[0.06] touch-manipulation active:bg-white/[0.03] transition-colors"
          >
            <div
              className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center flex-shrink-0`}
            >
              <Icon className={`h-4 w-4 ${colour}`} />
            </div>
            <span className="text-sm font-medium text-white flex-1">{label}</span>
            <ExternalLink className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
          </Link>
        </motion.div>
      ))}

      {/* ICO registration */}
      <motion.div variants={itemVariants} className="flex items-center gap-2 pt-4 px-1 pb-2">
        <BadgeCheck className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
        <p className="text-xs text-white">
          Registered with the Information Commissioner's Office &middot; ICO Reg: ZB935897
        </p>
      </motion.div>

      {/* Privacy Activity Log */}
      {auditLog.length > 0 && (
        <>
          <motion.p
            variants={itemVariants}
            className="text-xs font-semibold text-white uppercase tracking-widest px-1 mb-2 mt-6"
          >
            Activity
          </motion.p>
          {auditLog.map((entry, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="flex items-center justify-between gap-4 w-full py-4 border-b border-white/[0.06]"
            >
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-elec-yellow/60 flex-shrink-0" />
                <span className="text-sm text-white">
                  {actionLabels[entry.action] ?? entry.action}
                </span>
              </div>
              <span className="text-xs text-white whitespace-nowrap">
                {new Date(entry.created_at).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </span>
            </motion.div>
          ))}
        </>
      )}

      {/* Delete Account Dialog */}
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          if (!isDeleting) setShowDeleteDialog(open);
        }}
      >
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-card/95 backdrop-blur-xl border-white/10 rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-400">
              <Trash2 className="h-5 w-5" />
              Delete Your Account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white space-y-3">
              <span className="block">
                This will permanently delete your account and all associated data:
              </span>
              <ul className="text-sm space-y-1 list-none">
                {[
                  'Certificates & inspection reports',
                  'Quotes & invoices',
                  'Elec-ID profile',
                  'Site safety documents',
                  'Study progress & notes',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <span className="block p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm">
                Your data will be permanently removed within 30 days. You have a grace period to
                contact privacy@elec-mate.com to cancel.
              </span>
              <span className="block text-sm">
                Type <span className="font-mono font-bold text-red-400">DELETE</span> to confirm:
              </span>
              <Input
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="font-mono bg-white/5 border-white/10 focus:border-red-500/50 text-white placeholder:text-white/30 h-11 touch-manipulation"
                autoCapitalize="none"
                autoCorrect="off"
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              disabled={isDeleting}
              className="min-h-[44px] bg-white/[0.02] border-white/10 rounded-xl text-white touch-manipulation"
            >
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== 'DELETE' || isDeleting}
              className="min-h-[44px] rounded-xl bg-red-600 hover:bg-red-700 border-0 disabled:opacity-40 text-white touch-manipulation"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete My Account'
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

export default PrivacyTab;
