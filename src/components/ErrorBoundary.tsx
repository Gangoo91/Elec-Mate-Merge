import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Props {
  children: ReactNode;
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

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    });

    // In dev mode, NEVER auto-refresh — always show the error
    if (import.meta.env.DEV) {
      console.error('[ErrorBoundary] CAUGHT ERROR:', error);
      console.error('[ErrorBoundary] Component Stack:', errorInfo?.componentStack);
      console.error('[ErrorBoundary] Full Stack:', error?.stack);
      return;
    }

    // Production only: auto-refresh on chunk loading failures
    const errorString =
      `${error?.message || ''} ${error?.toString() || ''} ${error?.name || ''}`.toLowerCase();
    const stackString = `${errorInfo?.componentStack || ''} ${error?.stack || ''}`.toLowerCase();
    const isNonErrorObject = !(error instanceof Error) && typeof error === 'object';
    const isChunkError =
      errorString.includes('dynamically imported module') ||
      errorString.includes('failed to fetch') ||
      errorString.includes('loading chunk') ||
      errorString.includes('text/html') ||
      errorString.includes('loading css chunk') ||
      errorString.includes('failed to load module script') ||
      errorString.includes('importing a module script failed') ||
      errorString.includes('mime type') ||
      (errorString.includes('typeerror') && stackString.includes('lazy')) ||
      (isNonErrorObject && stackString.includes('lazy'));
    if (isChunkError) {
      console.log('[ErrorBoundary] Chunk load failure detected, auto-refreshing...');
      this.hardReload();
      return;
    }

    console.error('[ERROR] ErrorBoundary caught an error:', error, errorInfo);
  }

  private hardReload = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.unregister()));
      }
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } catch (e) {
      console.error('Failed to clear service workers/caches', e);
    } finally {
      const url = new URL(window.location.href);
      url.searchParams.set('v', String(Date.now()));
      window.location.replace(url.toString());
    }
  };

  private handleReset = () => {
    if (import.meta.env.DEV) {
      const confirmed = window.confirm(
        'Are you sure you want to refresh? Check the console logs first for the error details.'
      );
      if (!confirmed) return;
    }
    this.setState({ hasError: false, error: null, errorInfo: null });
    this.hardReload();
  };

  private handleGoHome = () => {
    if (import.meta.env.DEV) {
      const confirmed = window.confirm(
        'Are you sure? Check the console logs first for the error details.'
      );
      if (!confirmed) return;
    }
    window.location.href = '/';
  };

  private handleCopyError = () => {
    const errorText = [
      `Error: ${this.state.error?.message || 'Unknown'}`,
      '',
      `Stack: ${this.state.error?.stack || 'N/A'}`,
      '',
      `Component Stack: ${this.state.errorInfo?.componentStack || 'N/A'}`,
    ].join('\n');
    navigator.clipboard.writeText(errorText);
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="max-w-2xl w-full border-destructive">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-8 w-8 text-destructive" />
                <div>
                  <CardTitle className="text-destructive">Something went wrong</CardTitle>
                  <CardDescription>The application encountered an unexpected error</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Error message — always visible */}
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2 text-white">Error Details:</p>
                <p className="text-sm text-white font-mono break-all">
                  {this.state.error?.message || 'Unknown error'}
                </p>
              </div>

              {/* Stack trace — always visible in dev, collapsed in prod */}
              {this.state.error?.stack && (
                <div className="bg-muted p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-white">Stack Trace:</p>
                    <Button variant="ghost" size="sm" onClick={this.handleCopyError} className="h-7 px-2 text-xs">
                      <Copy className="h-3 w-3 mr-1" />
                      Copy
                    </Button>
                  </div>
                  <pre className="text-xs text-white font-mono break-all whitespace-pre-wrap overflow-auto max-h-48">
                    {this.state.error.stack}
                  </pre>
                </div>
              )}

              {/* Component stack — always visible in dev */}
              {this.state.errorInfo?.componentStack && (
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-sm font-medium mb-2 text-white">Component Stack:</p>
                  <pre className="text-xs text-white font-mono break-all whitespace-pre-wrap overflow-auto max-h-48">
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}

              <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-4 rounded-lg">
                <p className="text-sm text-amber-900 dark:text-amber-200">
                  <strong>Your data is safe.</strong> Any unsaved changes may be in local storage.
                  {import.meta.env.DEV && ' Check the console for full error details before refreshing.'}
                </p>
              </div>

              <div className="flex gap-3">
                <Button onClick={this.handleReset} className="flex-1">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh Page
                </Button>
                <Button onClick={this.handleGoHome} variant="outline" className="flex-1">
                  <Home className="h-4 w-4 mr-2" />
                  Go Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
