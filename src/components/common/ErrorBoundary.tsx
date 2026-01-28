
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCcw, Home } from 'lucide-react';
import { logger } from '@/utils/logger';
import { captureError, addBreadcrumb } from '@/lib/sentry';

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
    errorInfo: null
  };

  public static getDerivedStateFromError(_: Error): Partial<State> {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({
      error,
      errorInfo
    });

    // Check for chunk loading errors - auto-refresh instead of showing error
    const errorString = error.message?.toLowerCase() || '';
    if (
      errorString.includes('dynamically imported module') ||
      errorString.includes('failed to fetch') ||
      errorString.includes('loading chunk') ||
      errorString.includes('loading css chunk') ||
      errorString.includes('failed to load module script') ||
      errorString.includes('importing a module script failed') ||
      errorString.includes('mime type')
    ) {
      console.log('[ErrorBoundary] Chunk load error, auto-refreshing...');
      if ('caches' in window) {
        caches.keys().then(keys => Promise.all(keys.map(k => caches.delete(k))))
          .finally(() => window.location.reload());
      } else {
        window.location.reload();
      }
      return; // Don't log to Sentry - deployment artifact, not a bug
    }

    // Add breadcrumb with component stack for debugging
    addBreadcrumb('ErrorBoundary caught error', 'error', {
      url: window.location.href,
      componentStack: errorInfo.componentStack?.slice(0, 500)
    });

    // Send ACTUAL error to Sentry (not just "ErrorBoundary caught an error")
    captureError(error, {
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      errorBoundary: true
    });

    // Enhanced error logging with context
    logger.error('ErrorBoundary caught an error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });

    // Specific guidance for stream errors
    if (error.message.includes('stream') || error.message.includes('controller') || error.message.includes('enqueue')) {
      console.error('🚨 Stream error detected - this may be related to parallel agent execution');
      console.error('💡 Try refreshing the page or starting a new conversation');
    }
  }

  private handleRefresh = (): void => {
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
            <Button variant="outline" onClick={() => window.location.href = "/dashboard"}>
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
