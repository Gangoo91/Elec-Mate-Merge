import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, CheckCircle2, XCircle, Loader2, AlertCircle, Info, ExternalLink, Send } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 28 }
  }
};

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
    } catch (error: any) {
      console.error('Error fetching email configs:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to fetch email configurations",
        variant: "destructive",
      });
    } finally {
      setFetchingConfigs(false);
    }
  };

  useEffect(() => {
    // Check for OAuth callback parameters
    const urlParams = new URLSearchParams(window.location.search);
    const success = urlParams.get('success');
    const error = urlParams.get('error');
    
    if (success === 'true') {
      toast({
        title: "Email Connected",
        description: "Your email account has been connected successfully",
      });
      // Clean up URL
      window.history.replaceState({}, '', '/settings?tab=email');
    }
    
    if (error) {
      toast({
        title: "Connection Failed",
        description: decodeURIComponent(error),
        variant: "destructive",
      });
      // Clean up URL
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

      // Open OAuth in new tab
      if (data?.authUrl) {
        const popup = window.open(data.authUrl, '_blank', 'noopener,noreferrer');
        if (!popup) {
          // Popup blocked, try top-level redirect
          if (window.top) {
            window.top.location.href = data.authUrl;
          } else {
            window.location.href = data.authUrl;
          }
        }
      }
      setLoading(false);
    } catch (error: any) {
      console.error('Error initiating OAuth:', error);
      toast({
        title: "Connection Failed",
        description: error.message || `Failed to connect ${provider}`,
        variant: "destructive",
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
        title: "Disconnected",
        description: `${provider === 'gmail' ? 'Gmail' : 'Outlook'} account disconnected successfully`,
      });

      await fetchConfigs();
    } catch (error: any) {
      console.error('Error disconnecting:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to disconnect account",
        variant: "destructive",
      });
    }
  };

  const gmailConfig = configs.find(c => c.email_provider === 'gmail');
  const outlookConfig = configs.find(c => c.email_provider === 'outlook');

  const DAILY_LIMIT = 100;

  if (fetchingConfigs) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 h-24" />
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 h-48" />
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 h-48" />
      </div>
    );
  }

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
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
              <Mail className="h-6 w-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Email Integration</h3>
              <p className="text-sm text-muted-foreground">
                Send invoices directly from your email account
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Rate Limit Info */}
      {configs.length > 0 && (
        <motion.div variants={itemVariants} className="rounded-xl bg-amber-500/10 border border-amber-500/20 overflow-hidden">
          <div className="p-4 md:p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-amber-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Daily Sending Limit</p>
                <p className="text-sm text-muted-foreground mt-1">
                  You can send up to {DAILY_LIMIT} emails per day. Your limit resets at midnight UTC.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Gmail Card */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-red-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Gmail</h3>
                <p className="text-xs text-muted-foreground">Google Mail integration</p>
              </div>
            </div>
            {gmailConfig?.is_active ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-muted-foreground">
                <XCircle className="h-3 w-3" />
                Not Connected
              </span>
            )}
          </div>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          {gmailConfig ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">{gmailConfig.email_address}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-muted-foreground">Sent Today</p>
                  <p className="text-sm font-medium text-foreground">{gmailConfig.daily_sent_count || 0}/{DAILY_LIMIT}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-muted-foreground">Total Sent</p>
                  <p className="text-sm font-medium text-foreground">{gmailConfig.total_sent_count || 0}</p>
                </div>
                {gmailConfig.last_sent_at && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">Last Sent</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(gmailConfig.last_sent_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => handleDisconnect('gmail')}
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Disconnect Gmail
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your Gmail account to send invoices and certificates directly from your email address.
              </p>
              <Button
                onClick={() => handleConnect('gmail')}
                disabled={loading}
                className="w-full bg-red-500 hover:bg-red-500/90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Connect Gmail
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Outlook Card */}
      <motion.div variants={itemVariants} className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="px-4 md:px-6 py-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Mail className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-foreground">Outlook</h3>
                <p className="text-xs text-muted-foreground">Microsoft email integration</p>
              </div>
            </div>
            {outlookConfig?.is_active ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-white/10 text-muted-foreground">
                <XCircle className="h-3 w-3" />
                Not Connected
              </span>
            )}
          </div>
        </div>
        <div className="p-4 md:p-6 space-y-4">
          {outlookConfig ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground truncate">{outlookConfig.email_address}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-muted-foreground">Sent Today</p>
                  <p className="text-sm font-medium text-foreground">{outlookConfig.daily_sent_count || 0}/{DAILY_LIMIT}</p>
                </div>
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-muted-foreground">Total Sent</p>
                  <p className="text-sm font-medium text-foreground">{outlookConfig.total_sent_count || 0}</p>
                </div>
                {outlookConfig.last_sent_at && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-xs text-muted-foreground">Last Sent</p>
                    <p className="text-sm font-medium text-foreground">
                      {new Date(outlookConfig.last_sent_at).toLocaleDateString()}
                    </p>
                  </div>
                )}
              </div>
              <Button
                variant="outline"
                onClick={() => handleDisconnect('outlook')}
                className="w-full border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Disconnect Outlook
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Connect your Outlook account to send invoices and certificates directly from your email address.
              </p>
              <Button
                onClick={() => handleConnect('outlook')}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-500/90 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-4 w-4" />
                    Connect Outlook
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Info Notice */}
      <motion.div variants={itemVariants} className="rounded-xl bg-white/5 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">How it works</p>
              <p className="text-sm text-muted-foreground">
                When you connect your email account, invoices and certificates will be sent directly from your email address,
                making them more personal and improving deliverability. Your credentials are securely stored and never shared.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
