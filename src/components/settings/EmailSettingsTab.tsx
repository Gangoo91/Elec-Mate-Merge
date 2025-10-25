import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Mail, CheckCircle2, XCircle, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    fetchConfigs();
  }, []);

  const handleConnect = async (provider: 'gmail' | 'outlook') => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('oauth-email-init', {
        body: { provider },
      });

      if (error) throw error;

      // Redirect to OAuth provider
      if (data?.authUrl) {
        window.location.href = data.authUrl;
      }
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Email Integration</h2>
        <p className="text-muted-foreground mt-2">
          Connect your Gmail or Outlook account to send invoices directly from your email
        </p>
      </div>

      {/* Rate Limit Info */}
      {configs.length > 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Daily sending limit: {DAILY_LIMIT} emails per day. Your limit resets at midnight UTC.
          </AlertDescription>
        </Alert>
      )}

      {/* Gmail Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Gmail</CardTitle>
                <CardDescription>Send invoices using your Gmail account</CardDescription>
              </div>
            </div>
            {gmailConfig?.is_active ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <XCircle className="h-3 w-3" />
                Not Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {gmailConfig ? (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{gmailConfig.email_address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emails sent today:</span>
                  <span className="font-medium">{gmailConfig.daily_sent_count || 0}/{DAILY_LIMIT}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total emails sent:</span>
                  <span className="font-medium">{gmailConfig.total_sent_count || 0}</span>
                </div>
                {gmailConfig.last_sent_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last sent:</span>
                    <span className="font-medium">
                      {new Date(gmailConfig.last_sent_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDisconnect('gmail')}
                className="w-full"
              >
                Disconnect Gmail
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleConnect('gmail')}
              disabled={loading || fetchingConfigs}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Gmail'
              )}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Outlook Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle>Outlook</CardTitle>
                <CardDescription>Send invoices using your Outlook account</CardDescription>
              </div>
            </div>
            {outlookConfig?.is_active ? (
              <Badge variant="default" className="gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-1">
                <XCircle className="h-3 w-3" />
                Not Connected
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {outlookConfig ? (
            <>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Email:</span>
                  <span className="font-medium">{outlookConfig.email_address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Emails sent today:</span>
                  <span className="font-medium">{outlookConfig.daily_sent_count || 0}/{DAILY_LIMIT}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total emails sent:</span>
                  <span className="font-medium">{outlookConfig.total_sent_count || 0}</span>
                </div>
                {outlookConfig.last_sent_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last sent:</span>
                    <span className="font-medium">
                      {new Date(outlookConfig.last_sent_at).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
              <Button
                variant="destructive"
                onClick={() => handleDisconnect('outlook')}
                className="w-full"
              >
                Disconnect Outlook
              </Button>
            </>
          ) : (
            <Button
              onClick={() => handleConnect('outlook')}
              disabled={loading || fetchingConfigs}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                'Connect Outlook'
              )}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
