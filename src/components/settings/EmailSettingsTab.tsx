import { useState, useEffect } from 'react';
import { openExternalUrl } from '@/utils/open-external-url';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import {
  ListCard,
  ListRow,
  SectionHeader,
  Eyebrow,
  StatStrip,
  containerVariants,
  itemVariants,
} from '@/components/college/primitives';

interface EmailConfig {
  id: string;
  email_provider: string;
  email_address: string;
  is_active: boolean;
  daily_sent_count: number;
  total_sent_count: number;
  last_sent_at: string | null;
  rate_limit_reset_at: string | null;
}

export const EmailSettingsTab = () => {
  const [loading, setLoading] = useState(false);
  const [configs, setConfigs] = useState<EmailConfig[]>([]);
  const [fetchingConfigs, setFetchingConfigs] = useState(true);
  const { toast } = useToast();

  const fetchConfigs = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('get-email-config');
      if (error) throw error;
      setConfigs(data?.configs || []);
    } catch (error) {
      const err = error as Error;
      console.error('Error fetching email configs:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to fetch email configurations',
        variant: 'destructive',
      });
    } finally {
      setFetchingConfigs(false);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');

    if (success === 'true') {
      toast({
        title: 'Email Connected',
        description: 'Your email account has been connected successfully',
      });
      window.history.replaceState({}, '', '/settings?tab=email');
    }

    if (error) {
      toast({
        title: 'Connection Failed',
        description: decodeURIComponent(error),
        variant: 'destructive',
      });
      window.history.replaceState({}, '', '/settings?tab=email');
    }

    fetchConfigs();
  }, []);

  const handleConnect = async (provider: 'gmail' | 'outlook') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('oauth-email-init', {
        body: { provider },
      });
      if (error) throw error;

      if (data?.authUrl) {
        await openExternalUrl(data.authUrl);
      }
      setLoading(false);
    } catch (error) {
      const err = error as Error;
      console.error('Error initiating OAuth:', err);
      toast({
        title: 'Connection Failed',
        description: err.message || `Failed to connect ${provider}`,
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  const handleDisconnect = async (provider: string) => {
    try {
      const { error } = await supabase.functions.invoke('disconnect-email', {
        body: { provider },
      });
      if (error) throw error;

      toast({
        title: 'Disconnected',
        description: `${provider === 'gmail' ? 'Gmail' : 'Outlook'} account disconnected successfully`,
      });

      await fetchConfigs();
    } catch (error) {
      const err = error as Error;
      console.error('Error disconnecting:', err);
      toast({
        title: 'Error',
        description: err.message || 'Failed to disconnect account',
        variant: 'destructive',
      });
    }
  };

  const gmailConfig = configs.find((c) => c.email_provider === 'gmail');
  const outlookConfig = configs.find((c) => c.email_provider === 'outlook');

  const DAILY_LIMIT = 100;

  if (fetchingConfigs) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] h-24" />
        <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] h-48" />
        <div className="rounded-2xl bg-[hsl(0_0%_12%)] border border-white/[0.06] h-48" />
      </div>
    );
  }

  const renderProviderCard = (
    eyebrow: string,
    label: string,
    description: string,
    provider: 'gmail' | 'outlook',
    config?: EmailConfig
  ) => (
    <motion.section variants={itemVariants} className="space-y-3">
      <SectionHeader eyebrow={eyebrow} title={label} />
      <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Eyebrow>Status</Eyebrow>
            <div className="mt-1 flex items-center gap-2">
              <span className="text-[15px] font-medium text-white">{description}</span>
              {config?.is_active ? (
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                  Connected
                </span>
              ) : (
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-red-400">
                  Not Connected
                </span>
              )}
            </div>
          </div>
        </div>

        {config ? (
          <>
            <StatStrip
              columns={2}
              stats={[
                { value: config.daily_sent_count || 0, label: 'Sent Today', sub: `of ${DAILY_LIMIT}` },
                { value: config.total_sent_count || 0, label: 'Total Sent' },
              ]}
            />
            <ListCard>
              <ListRow title="Email Address" subtitle={config.email_address} />
              {config.last_sent_at && (
                <ListRow
                  title="Last Sent"
                  subtitle={new Date(config.last_sent_at).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                />
              )}
            </ListCard>
            <Button
              variant="outline"
              onClick={() => handleDisconnect(provider)}
              className="w-full h-11 rounded-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 bg-transparent touch-manipulation"
            >
              Disconnect {provider === 'gmail' ? 'Gmail' : 'Outlook'}
            </Button>
          </>
        ) : (
          <>
            <p className="text-[13px] text-white/70 leading-relaxed">
              Connect your {provider === 'gmail' ? 'Gmail' : 'Outlook'} account to send invoices
              and certificates directly from your email address.
            </p>
            <Button
              onClick={() => handleConnect(provider)}
              disabled={loading}
              className="w-full h-11 rounded-full bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation"
            >
              {loading ? 'Connecting…' : `Connect ${provider === 'gmail' ? 'Gmail' : 'Outlook'}`}
            </Button>
          </>
        )}
      </div>
    </motion.section>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Overview */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="00" title="Email Integration" />
        <p className="text-[13px] text-white/70 leading-relaxed max-w-2xl">
          Send invoices directly from your email account. Connecting Gmail or Outlook improves
          deliverability and keeps messages personal.
        </p>
        {configs.length > 0 && (
          <ListCard>
            <ListRow
              title="Daily Sending Limit"
              subtitle={`Up to ${DAILY_LIMIT} emails per day. Resets at midnight UTC.`}
              accent="amber"
              trailing={
                <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-amber-400 tabular-nums">
                  {DAILY_LIMIT}/day
                </span>
              }
            />
          </ListCard>
        )}
      </motion.section>

      {renderProviderCard('01', 'Gmail', 'Google Mail integration', 'gmail', gmailConfig)}
      {renderProviderCard(
        '02',
        'Outlook',
        'Microsoft email integration',
        'outlook',
        outlookConfig
      )}

      {/* How it works */}
      <motion.section variants={itemVariants} className="space-y-3">
        <SectionHeader eyebrow="03" title="How it works" />
        <div className="bg-[hsl(0_0%_12%)] border border-white/[0.06] rounded-2xl p-5 sm:p-6">
          <p className="text-[13px] text-white/70 leading-relaxed">
            When you connect your email account, invoices and certificates will be sent directly
            from your email address, making them more personal and improving deliverability. Your
            credentials are securely stored and never shared.
          </p>
        </div>
      </motion.section>
    </motion.div>
  );
};

export default EmailSettingsTab;
