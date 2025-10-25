import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CheckCircle2, AlertCircle, Mail } from 'lucide-react';

export const EmailStatusBanner = () => {
  const navigate = useNavigate();
  const [emailConfig, setEmailConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkEmailStatus();
  }, []);

  const checkEmailStatus = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.functions.invoke('get-email-config', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      });

      if (!error && data?.configs?.length > 0) {
        const activeConfig = data.configs.find((c: any) => c.is_active);
        setEmailConfig(activeConfig);
      }
    } catch (error) {
      console.error('Error checking email status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null;
  }

  if (emailConfig) {
    const dailyCount = emailConfig.daily_sent_count || 0;
    const dailyLimit = 100;
    const percentage = (dailyCount / dailyLimit) * 100;

    return (
      <Alert className="border-elec-yellow/30 bg-elec-yellow/5">
        <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
        <AlertDescription className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm">
              Sending from: <strong>{emailConfig.email_address}</strong>
            </span>
            <span className="text-xs text-muted-foreground">
              ({dailyCount}/{dailyLimit} emails sent today)
            </span>
          </div>
          {percentage >= 90 && (
            <span className="text-xs text-orange-500 font-medium">
              {dailyLimit - dailyCount} remaining
            </span>
          )}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className="border-orange-500/30 bg-orange-500/5">
      <AlertCircle className="h-4 w-4 text-orange-500" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4" />
          <span className="text-sm">
            Connect your email to send quotes automatically
          </span>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate('/electrician/settings?tab=email')}
          className="h-8"
        >
          Connect Email
        </Button>
      </AlertDescription>
    </Alert>
  );
};
