import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';
import { captureError, addBreadcrumb } from '@/lib/sentry';
import { isStaleBuild, isUndefinedBindingError } from '@/utils/buildFreshness';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): Partial<State> {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo,
    });

    // In dev mode, always log full details and never auto-refresh
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] CAUGHT ERROR:', error);
      console.error('[ErrorBoundary] Component Stack:', errorInfo?.componentStack);
      console.error('[ErrorBoundary] Full Stack:', error?.stack);
      return;
    }

    // Check for chunk loading errors - auto-refresh instead of showing error
    // Use multiple error representations since some browsers (Edge Mobile, Android WebViews)
    // wrap lazy import errors in non-standard ways where error.message may be empty/object
    const errorString =
      `${error?.message || ''} ${error?.toString() || ''} ${error?.name || ''}`.toLowerCase();
    const stackString = `${errorInfo?.componentStack || ''} ${error?.stack || ''}`.toLowerCase();
    // Also detect non-Error objects (plain objects from failed dynamic imports)
    // React sometimes passes [object Object] when a lazy import promise rejects with a non-Error
    const isNonErrorObject = !(error instanceof Error) && typeof error === 'object';
    // Classification tightened (ELE-792): bare 'text/html' / 'mime type' catch-alls
    // were matching non-chunk errors (e.g. API responses surfaced as thrown Errors)
    // and triggering the auto-reload path. Only match those strings when the stack
    // actually points at a dynamic import / lazy component.
    const isChunkError =
      errorString.includes('dynamically imported module') ||
      errorString.includes('failed to fetch') ||
      errorString.includes('loading chunk') ||
      errorString.includes('loading css chunk') ||
      errorString.includes('failed to load module script') ||
      errorString.includes('importing a module script failed') ||
      // Stale-deploy export mismatch: a cached entry chunk imports an export
      // that a freshly deployed module renamed/removed. This is the #1 cause of
      // guide-page crashes for SEO visitors (JAVASCRIPT-REACT-B7). The global
      // main.tsx handler already catches these, but errors thrown inside a
      // React.lazy render are intercepted here first — so mirror those
      // signatures. Chrome/Edge: "does not provide an export named 'x'";
      // Safari: "Importing binding name 'x' is not found".
      errorString.includes('provide an export') ||
      errorString.includes('importing binding name') ||
      ((errorString.includes('mime type') || errorString.includes('text/html')) &&
        stackString.includes('lazy')) ||
      (errorString.includes('typeerror') && stackString.includes('lazy')) ||
      (isNonErrorObject && stackString.includes('lazy'));
    // A bare `ReferenceError: Gauge is not defined` is the third wording of the
    // same stale-build failure, but it is also exactly what a genuinely missing
    // import looks like, so it cannot be matched on text. Ask whether this
    // client is actually running an old build and let the answer decide.
    // Asynchronous by necessity — the check is a network round-trip — so both
    // outcomes are dispatched from the callback rather than falling through.
    if (!isChunkError && isUndefinedBindingError(error)) {
      void isStaleBuild()
        .then((stale) => {
          if (stale) {
            this.recoverFromStaleBuild(error, errorInfo);
          } else {
            this.reportGenuineError(error, errorInfo);
          }
        })
        .catch(() => this.reportGenuineError(error, errorInfo));
      return;
    }

    if (isChunkError) {
      this.recoverFromStaleBuild(error, errorInfo);
      return;
    }

    this.reportGenuineError(error, errorInfo);
  }

  /**
   * The client is running code the server no longer serves. Report it as a
   * downgraded warning, then clear everything holding the stale build and
   * reload once.
   */
  private recoverFromStaleBuild(error: Error, errorInfo: ErrorInfo): void {
    // ELE-792: guard against infinite reload loops. If we've already reloaded
    // once this session and still caught a chunk error, the reload clearly
    // isn't fixing it — fall through to the normal error UI instead.
    const reloadKey = 'errorBoundary_chunkReloaded';
    const hasReloaded = sessionStorage.getItem(reloadKey);
    if (hasReloaded) {
      sessionStorage.removeItem(reloadKey);
      console.log('[ErrorBoundary] Chunk error after reload — showing error UI');
      captureError(error, {
        componentStack: errorInfo.componentStack,
        url: window.location.href,
        errorBoundary: true,
        chunkReloadFailed: true,
      });
      return;
    }
    sessionStorage.setItem(reloadKey, Date.now().toString());
    console.log('[ErrorBoundary] Chunk load error, auto-refreshing...');
    // ELE-1413: report the FIRST occurrence too. This used to return without
    // telling Sentry ("deployment artifact, not a bug"), which meant a user
    // stuck in a refresh→crash loop produced zero telemetry — we could not
    // diagnose a paying customer who could not reach the cancel page. The
    // auto-refresh usually recovers, so beforeSend downgrades these to
    // `warning` (category: chunk) rather than alerting.
    captureError(error, {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      errorBoundary: true,
      chunkAutoRecovering: true,
    });
    // Cache-busting URL reload — plain reload() can hit the same stale HTML
    // from disk cache on Firefox/Windows and loop forever.
    const sep = window.location.href.includes('?') ? '&' : '?';
    const bustedUrl = window.location.href + sep + '_cb=' + Date.now();
    const navigate = () => {
      window.location.href = bustedUrl;
    };

    // ELE-1437: unregister the service worker as well as clearing caches.
    //
    // `sw.ts` registers a Workbox `NavigationRoute` that serves the
    // **precached index.html** for every navigation. Clearing Cache Storage
    // alone leaves that service worker registered and in control, so the
    // cache-busted reload can be answered with the very same stale HTML —
    // full of chunk URLs that no longer exist — and fail identically. The
    // second failure then trips the ELE-792 loop guard above and the user
    // lands on "Something went wrong", which is exactly the report in
    // ELE-1437 (and why it never reproduced in incognito, where there is no
    // registered worker).
    //
    // The two sibling handlers — the inline one in `index.html` and
    // `handleChunkError` in `main.tsx` — have both done this since ELE-1273.
    // This boundary was the only recovery path that did not, so any chunk
    // error that reached React before those handlers saw it recovered less
    // well than one that did not. Keep all three in step.
    const unregisterSWs =
      'serviceWorker' in navigator
        ? navigator.serviceWorker
            .getRegistrations()
            .then((regs) => Promise.all(regs.map((r) => r.unregister())))
        : Promise.resolve([]);
    const clearCaches =
      'caches' in window
        ? caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
        : Promise.resolve([]);
    Promise.allSettled([unregisterSWs, clearCaches]).finally(navigate);
  }

  /** A real bug: report it in full and let the fallback UI stand. */
  private reportGenuineError(error: Error, errorInfo: ErrorInfo): void {
    // Add breadcrumb with component stack for debugging
    addBreadcrumb('ErrorBoundary caught error', 'error', {
      url: window.location.href,
      componentStack: errorInfo.componentStack?.slice(0, 500),
    });

    // Send ACTUAL error to Sentry (not just "ErrorBoundary caught an error")
    captureError(error, {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      errorBoundary: true,
    });

    // Console only — deliberately NOT logger.error.
    //
    // logger.error(msg, plainObject) does not attach to the error above: given a
    // non-Error second argument it builds `new Error(msg)` and captures THAT
    // (logger.ts:62). So every catch sent Sentry a second event whose message
    // was the constant string "ErrorBoundary caught an error:" with an
    // identical logger→ErrorBoundary stack — which means Sentry grouped every
    // ErrorBoundary catch of every kind into a single issue
    // (JAVASCRIPT-REACT-B7, 97 occurrences), titled uselessly, with the real
    // error buried in extra.originalError.
    //
    // It also defeated filtering: `ignoreErrors` carries
    // /Failed to execute 'removeChild' on 'Node'/i, but the message Sentry saw
    // was never the removeChild text, so the entry never matched.
    //
    // captureError() above already sends the real error, correctly grouped and
    // with the component stack, so this line only ever added noise.
    console.error('[ErrorBoundary] caught an error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString(),
    });

    // Specific guidance for stream errors
    if (
      error.message.includes('stream') ||
      error.message.includes('controller') ||
      error.message.includes('enqueue')
    ) {
      console.error('🚨 Stream error detected - this may be related to parallel agent execution');
      console.error('💡 Try refreshing the page or starting a new conversation');
    }
  }

  private handleRefresh = (): void => {
    if (import.meta.env.DEV) {
      const confirmed = window.confirm(
        'Are you sure you want to refresh? Check the console logs first for error details.'
      );
      if (!confirmed) return;
    }
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center">
          <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
            <span className="text-4xl">🛠️</span>
          </div>
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            We apologize for the inconvenience. This page encountered an error.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button onClick={this.handleRefresh} className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4" />
              Refresh page
            </Button>
            <Button variant="outline" onClick={() => (window.location.href = '/dashboard')}>
              <Home className="h-4 w-4 mr-2" />
              Go to dashboard
            </Button>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <div className="mt-8 text-left p-4 bg-red-500/10 rounded-lg w-full overflow-auto max-h-96">
              <p className="font-mono text-sm mb-2">{this.state.error.toString()}</p>
              <pre className="font-mono text-xs whitespace-pre-wrap overflow-auto">
                {this.state.errorInfo?.componentStack || 'No component stack available'}
              </pre>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
