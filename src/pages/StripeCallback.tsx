import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader2, AlertCircle } from 'lucide-react';

/**
 * Stripe Connect Callback Page
 *
 * Handles return from Stripe onboarding.
 * Auto-redirects back to where the user came from.
 */
const StripeCallback = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<'success' | 'refresh' | 'loading'>('loading');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const success = searchParams.get('success');
    const refresh = searchParams.get('refresh');

    // Get the stored return URL
    const returnUrl = localStorage.getItem('stripe-return-url') || '/electrician/invoices';
    localStorage.removeItem('stripe-return-url');

    if (success === 'true') {
      setStatus('success');
      // Mark as complete for any listening components
      localStorage.setItem('stripe-connect-complete', Date.now().toString());

      // Auto-redirect back after brief success message
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = returnUrl;
      }, 1500);
    } else if (refresh === 'true') {
      setStatus('refresh');
      // Setup incomplete - redirect back anyway
      setRedirecting(true);
      setTimeout(() => {
        window.location.href = returnUrl;
      }, 2000);
    } else {
      // Unknown state - just go back
      window.location.href = returnUrl;
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-elec-dark flex items-center justify-center p-4">
      <div className="text-center space-y-4 max-w-sm">
        {status === 'success' && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
              <CheckCircle className="h-10 w-10 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Stripe Connected!</h1>
            <p className="text-sm text-white/60">
              {redirecting ? 'Taking you back...' : 'You can now accept card payments.'}
            </p>
            {redirecting && (
              <Loader2 className="h-5 w-5 mx-auto text-green-400 animate-spin mt-2" />
            )}
          </>
        )}

        {status === 'refresh' && (
          <>
            <div className="w-20 h-20 mx-auto rounded-full bg-amber-500/20 flex items-center justify-center">
              <AlertCircle className="h-10 w-10 text-amber-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Setup Incomplete</h1>
            <p className="text-sm text-white/60">
              Please complete Stripe setup to accept payments.
            </p>
            {redirecting && (
              <Loader2 className="h-5 w-5 mx-auto text-amber-400 animate-spin mt-2" />
            )}
          </>
        )}

        {status === 'loading' && (
          <>
            <Loader2 className="h-10 w-10 mx-auto text-elec-yellow animate-spin" />
            <p className="text-sm text-white/60">Processing...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default StripeCallback;
