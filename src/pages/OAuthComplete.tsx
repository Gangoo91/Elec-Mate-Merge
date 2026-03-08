import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function OAuthComplete() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');

  useEffect(() => {
    // Try to close the popup immediately
    window.close();

    // Fallback: if window.close() didn't work (some browsers block it),
    // wait a moment and try again
    const timer = setTimeout(() => {
      window.close();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="text-center space-y-3">
        <p className="text-lg font-semibold text-white">
          {status === 'success' ? 'Connected!' : 'Connection failed'}
        </p>
        <p className="text-sm text-white">You can close this window and return to the app.</p>
      </div>
    </div>
  );
}
