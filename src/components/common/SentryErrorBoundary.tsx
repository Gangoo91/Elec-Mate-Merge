/**
 * Route-level error boundary with Sentry integration.
 * Wraps major route groups so one broken page doesn't crash the whole app.
 * Shows a recovery UI with "Try again" and "Go home" options.
 * Automatically reports to Sentry with full component stack.
 */

import React from 'react';
import * as Sentry from '@sentry/react';
import { RefreshCcw, Home, AlertTriangle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SentryErrorBoundaryProps {
  children: React.ReactNode;
  /** Label for which section this wraps (e.g. "Study Centre", "Quote Builder") */
  section?: string;
}

function ErrorFallback({
  error,
  resetError,
  eventId,
  section,
}: {
  error: Error;
  resetError: () => void;
  eventId: string | null;
  section?: string;
}) {
  const [feedbackSent, setFeedbackSent] = React.useState(false);
  const [feedbackText, setFeedbackText] = React.useState('');
  const [showFeedback, setShowFeedback] = React.useState(false);

  const handleSendFeedback = () => {
    if (!feedbackText.trim() || !eventId) return;
    Sentry.captureFeedback({
      message: feedbackText.trim(),
      associatedEventId: eventId,
      name: 'User',
    });
    setFeedbackSent(true);
    setShowFeedback(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
        <AlertTriangle className="h-8 w-8 text-red-400" />
      </div>

      <h2 className="text-lg font-semibold text-white mb-1">
        {section ? `${section} hit a problem` : 'Something went wrong'}
      </h2>
      <p className="text-sm text-white mb-6 max-w-sm">
        This has been reported automatically. Try refreshing, or go back to the dashboard.
      </p>

      <div className="flex gap-3 mb-4">
        <Button
          onClick={resetError}
          className="h-11 touch-manipulation bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
        >
          <RefreshCcw className="h-4 w-4 mr-1.5" />
          Try Again
        </Button>
        <Button
          variant="outline"
          onClick={() => { window.location.href = '/dashboard'; }}
          className="h-11 touch-manipulation border-white/15 text-white"
        >
          <Home className="h-4 w-4 mr-1.5" />
          Dashboard
        </Button>
      </div>

      {/* User feedback */}
      {eventId && !feedbackSent && (
        <>
          {showFeedback ? (
            <div className="w-full max-w-sm space-y-2 mt-2">
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="What were you doing when this happened?"
                className="w-full h-20 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-sm placeholder:text-white/40 resize-none touch-manipulation focus:outline-none focus:border-elec-yellow/40"
              />
              <div className="flex gap-2">
                <Button
                  onClick={handleSendFeedback}
                  disabled={!feedbackText.trim()}
                  size="sm"
                  className="flex-1 h-9 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold text-xs touch-manipulation disabled:opacity-40"
                >
                  Send Feedback
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFeedback(false)}
                  className="h-9 text-white text-xs touch-manipulation"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowFeedback(true)}
              className="flex items-center gap-1.5 text-xs text-white touch-manipulation mt-2"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              Tell us what happened
            </button>
          )}
        </>
      )}

      {feedbackSent && (
        <p className="text-xs text-emerald-400 mt-2">Thanks — your feedback has been sent.</p>
      )}

      {import.meta.env.DEV && error && (
        <details className="mt-6 text-left w-full max-w-sm">
          <summary className="text-xs text-white cursor-pointer">Dev: Error details</summary>
          <pre className="mt-2 p-3 bg-white/[0.03] rounded-lg text-[10px] text-red-400 overflow-auto max-h-40">
            {error.message}
            {'\n\n'}
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}

export function SentryErrorBoundary({ children, section }: SentryErrorBoundaryProps) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, resetError, eventId }) => (
        <ErrorFallback
          error={error}
          resetError={resetError}
          eventId={eventId}
          section={section}
        />
      )}
      beforeCapture={(scope) => {
        scope.setTag('error.boundary', section || 'unknown');
        scope.setLevel('error');
      }}
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}

export default SentryErrorBoundary;
