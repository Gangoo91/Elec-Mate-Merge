// ELE-400, ELE-403, ELE-405, ELE-406, ELE-407, ELE-408, ELE-491
import React, { useState, useEffect, useCallback } from 'react';
import { storageGetJSONSync, storageSetJSONSync } from '@/utils/storage';
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
  ListCard,
  ListRow,
  SectionHeader,
  Arrow,
  Dot,
  Eyebrow,
  containerVariants,
  itemVariants,
  toneText,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';

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

  // Load cookie preferences
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
      const saved = storageGetJSONSync<CookiePreferences | null>(COOKIE_PREFERENCES_KEY, null);
      if (saved) setCookiePrefs(saved);
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
      storageSetJSONSync(COOKIE_PREFERENCES_KEY, newPrefs);
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: newPrefs }));
      if (userId) {
        try {
          await supabase
            .from('user_settings')
            .upsert(
              { user_id: userId, key: 'cookie_preferences', value: newPrefs },
              { onConflict: 'user_id,key' }
            );
        } catch {
          // localStorage saved above — Supabase best-effort
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
        message:
          'Your data has been exported. A confirmation email has been sent to your address.',
        type: 'success',
      });

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
        message: 'Could not delete your account. Please contact info@elec-mate.com',
        type: 'error',
      });
      setIsDeleting(false);
      setShowDeleteDialog(false);
    }
  };

  const openMailto = (subject: string, body?: string) => {
    const url = `mailto:info@elec-mate.com?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
    openExternalUrl(url);
  };

  interface GdprRight {
    article: string;
    title: string;
    description: string;
    action: () => void;
    actionLabel: string;
    tone: Tone;
  }

  const gdprRights: GdprRight[] = [
    {
      article: 'Art. 15',
      title: 'Right of Access',
      description: 'Request a copy of all personal data we hold about you.',
      action: handleDataDownload,
      actionLabel: 'Download My Data',
      tone: 'yellow',
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
      tone: 'blue',
    },
    {
      article: 'Art. 17',
      title: 'Right to Erasure',
      description: 'Request permanent deletion of your account and all associated data.',
      action: () => setShowDeleteDialog(true),
      actionLabel: 'Delete Account',
      tone: 'red',
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
      tone: 'amber',
    },
    {
      article: 'Art. 20',
      title: 'Right to Data Portability',
      description: 'Receive your data in a structured, machine-readable format.',
      action: handleDataDownload,
      actionLabel: 'Export My Data',
      tone: 'green',
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
      tone: 'purple',
    },
    {
      article: 'Art. 77',
      title: 'Right to Complain',
      description: "Lodge a complaint with the Information Commissioner's Office (ICO).",
      action: () => openExternalUrl('https://ico.org.uk/make-a-complaint/'),
      actionLabel: 'Contact ICO',
      tone: 'cyan',
    },
  ];

  const legalLinks = [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms of Service' },
    { to: '/cookies', label: 'Cookie Policy' },
    { to: '/dpa', label: 'Data Processing Agreement' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* ── YOUR DATA ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="01" title="Your Data" />
        <ListCard>
          <ListRow
            title="Data Retention"
            subtitle="Kept while active. Deleted within 30 days of account removal."
            accent="blue"
          />
          <ListRow
            title={isExporting ? 'Exporting…' : 'Download My Data'}
            subtitle="Full GDPR data export (Art. 15)"
            onClick={handleDataDownload}
            trailing={<Arrow />}
            accent="yellow"
          />
          <ListRow
            title={<span className="text-red-400">Delete Account</span>}
            subtitle="Permanently remove all data (Art. 17)"
            onClick={() => setShowDeleteDialog(true)}
            trailing={
              <span aria-hidden className="text-[13px] font-medium text-red-400">
                {'\u2192'}
              </span>
            }
            accent="red"
          />
          <button
            type="button"
            onClick={() => setShowRights(!showRights)}
            className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
          >
            <span aria-hidden className="w-[3px] h-10 rounded-full shrink-0 bg-elec-yellow" />
            <div className="flex-1 min-w-0">
              <div className="text-[15px] font-medium text-white">Your GDPR Rights</div>
              <div className="mt-0.5 text-[11.5px] text-white/65">
                Art. 15-21 — access, correct, erase, restrict, port, object
              </div>
            </div>
            <span aria-hidden className="text-[13px] text-elec-yellow/90 shrink-0">
              {showRights ? '▴' : '▾'}
            </span>
          </button>
        </ListCard>

        <AnimatePresence>
          {showRights && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <ListCard>
                {gdprRights.map((right) => (
                  <ListRow
                    key={right.article}
                    title={
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            'text-[10px] font-medium uppercase tracking-[0.15em]',
                            toneText[right.tone]
                          )}
                        >
                          {right.article}
                        </span>
                        <span className="truncate">{right.title}</span>
                      </span>
                    }
                    subtitle={right.description}
                    onClick={right.action}
                    trailing={<Arrow />}
                  />
                ))}
              </ListCard>
              <div className="mt-2 px-1 text-[11.5px] text-white/65 leading-relaxed">
                To exercise any right, contact{' '}
                <button
                  onClick={() => openExternalUrl('mailto:info@elec-mate.com')}
                  className="text-elec-yellow hover:underline touch-manipulation"
                >
                  info@elec-mate.com
                </button>
                . We respond within one month as required by law.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>

      {/* ── COOKIES (web only) ── */}
      {!isNative && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader eyebrow="02" title="Cookies" />
          <ListCard>
            <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[15px] font-medium text-white truncate">
                    Essential Cookies
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-elec-yellow">
                    Required
                  </span>
                </div>
                <div className="mt-0.5 text-[11.5px] text-white/65">
                  Authentication and security
                </div>
              </div>
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                Always On
              </span>
            </div>
            <div className="flex items-center gap-4 px-5 sm:px-6 py-4">
              <div className="flex-1 min-w-0">
                <div className="text-[15px] font-medium text-white truncate">
                  Analytics Cookies
                </div>
                <div className="mt-0.5 text-[11.5px] text-white/65">
                  Help us improve the platform
                </div>
              </div>
              <Switch
                checked={cookiePrefs.analytics}
                onCheckedChange={() => handleCookieToggle('analytics')}
              />
            </div>
          </ListCard>
        </motion.section>
      )}

      {/* ── LEGAL ── */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow={isNative ? '02' : '03'} title="Legal" />
        <ListCard>
          {legalLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="group w-full flex items-center gap-4 px-5 sm:px-6 py-4 sm:py-5 text-left touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
            >
              <div className="flex-1 min-w-0 text-[15px] font-medium text-white truncate">
                {link.label}
              </div>
              <Arrow />
            </Link>
          ))}
        </ListCard>
        <div className="flex items-center gap-2 px-1 pt-2">
          <Dot tone="green" />
          <p className="text-[11.5px] text-white/65">
            Registered with the Information Commissioner&apos;s Office · ICO Reg: ZB935897
          </p>
        </div>
      </motion.section>

      {/* ── ACTIVITY ── */}
      {auditLog.length > 0 && (
        <motion.section variants={itemVariants} className="space-y-3">
          <SectionHeader
            eyebrow={isNative ? '03' : '04'}
            title="Activity"
          />
          <ListCard>
            {auditLog.map((entry, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 px-5 sm:px-6 py-4"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Dot tone="yellow" />
                  <span className="text-[13px] text-white truncate">
                    {actionLabels[entry.action] ?? entry.action}
                  </span>
                </div>
                <span className="text-[11.5px] text-white/65 tabular-nums whitespace-nowrap">
                  {new Date(entry.created_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            ))}
          </ListCard>
        </motion.section>
      )}

      {/* ── DELETE CONFIRMATION DIALOG ── */}
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          if (!isDeleting) setShowDeleteDialog(open);
        }}
      >
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-400">Delete Your Account</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="text-white space-y-3">
                <p>This will permanently delete your account and all associated data:</p>
                <ul className="space-y-1">
                  {[
                    'Certificates and inspection reports',
                    'Quotes and invoices',
                    'Elec-ID profile',
                    'Site safety documents',
                    'Study progress and notes',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px]">
                      <span
                        aria-hidden
                        className="w-1.5 h-1.5 rounded-full bg-red-400/60 flex-shrink-0"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[13px]">
                  Your data will be permanently removed within 30 days. You have a grace period to
                  contact info@elec-mate.com to cancel.
                </div>
                <p className="text-[13px]">
                  Type{' '}
                  <span className="font-mono font-bold text-red-400">DELETE</span>{' '}
                  to confirm:
                </p>
                <Input
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  placeholder="Type DELETE to confirm"
                  className={cn(
                    'font-mono bg-[#0a0a0a] border-white/[0.08] focus:border-red-500/50',
                    'text-white placeholder:text-white h-11 touch-manipulation'
                  )}
                  autoCapitalize="none"
                  autoCorrect="off"
                />
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel
              disabled={isDeleting}
              className="min-h-[44px] bg-[#0a0a0a] border-white/[0.08] rounded-full text-white touch-manipulation"
            >
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleConfirmDelete}
              disabled={deleteConfirmText !== 'DELETE' || isDeleting}
              className="min-h-[44px] rounded-full bg-red-600 hover:bg-red-700 border-0 disabled:opacity-40 text-white touch-manipulation"
            >
              {isDeleting ? 'Deleting…' : 'Delete My Account'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Eyebrow used to keep import tree-happy on some toolchains */}
      <Eyebrow className="sr-only">end</Eyebrow>
    </motion.div>
  );
};

export default PrivacyTab;
