import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { copyToClipboard } from '@/utils/clipboard';
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
    copyToClipboard(errorText);
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
          <div className="w-full max-w-md space-y-6">
            {/* Header */}
            <div className="text-center space-y-2">
              <h1 className="text-lg font-bold text-white">Something went wrong</h1>
              <p className="text-xs text-white">Your data is safe — any unsaved changes are in local storage.</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={this.handleReset}
                className="flex-1 h-12 rounded-lg font-semibold text-sm bg-elec-yellow text-black touch-manipulation active:scale-[0.98]"
              >
                Refresh Page
              </button>
              <button
                onClick={this.handleGoHome}
                className="flex-1 h-12 rounded-lg font-semibold text-sm bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
              >
                Go Home
              </button>
            </div>

            {/* Error details — collapsed by default in prod */}
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <p className="text-[10px] text-white font-mono break-all">
                  {this.state.error?.message || 'Unknown error'}
                </p>
              </div>

              <button
                onClick={this.handleCopyError}
                className="w-full h-9 rounded-lg text-[10px] font-medium bg-white/[0.05] border border-white/[0.08] text-white touch-manipulation active:scale-[0.98]"
              >
                Copy Error Details
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
