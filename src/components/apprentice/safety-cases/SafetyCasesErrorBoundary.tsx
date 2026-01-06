
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCcw, FileWarning } from 'lucide-react';

interface Props {
  children: ReactNode;
  pageName?: string;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class SafetyCasesErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null
  };

  public static getDerivedStateFromError(error: Error): Partial<State> {
    console.error('SafetyCasesErrorBoundary caught error:', error);
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('SafetyCasesErrorBoundary - Error details:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      pageName: this.props.pageName
    });

    this.setState({
      error,
      errorInfo
    });
  }

  private handleRetry = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-white/10 p-6 flex items-center justify-center">
          <Card className="bg-gradient-to-br from-white/5 to-elec-card border-red-500/30 max-w-2xl w-full overflow-hidden relative animate-fade-in">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <CardHeader className="relative">
              <CardTitle className="text-white flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500/20 to-red-500/5 border border-red-500/30">
                  <AlertTriangle className="h-5 w-5 text-red-400" />
                </div>
                Safety Cases Error
                {this.props.pageName && (
                  <span className="text-sm font-normal text-white/80">({this.props.pageName})</span>
                )}
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4 relative">
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-red-500/20 flex-shrink-0">
                    <FileWarning className="h-4 w-4 text-red-400" />
                  </div>
                  <p className="text-sm text-white/70">
                    An error occurred while loading the safety cases content. This helps us debug the issue.
                  </p>
                </div>
              </div>

              {this.state.error && (
                <div className="p-4 rounded-xl bg-white/10 border border-white/10">
                  <p className="text-sm font-mono text-red-400 mb-2">
                    Error: {this.state.error.message}
                  </p>
                  {process.env.NODE_ENV === 'development' && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80 transition-colors">
                        Show Stack Trace
                      </summary>
                      <pre className="mt-3 p-3 rounded-lg bg-white/10 whitespace-pre-wrap text-white/80 overflow-x-auto">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              <Button
                onClick={this.handleRetry}
                className="w-full h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-95 transition-all"
              >
                <RefreshCcw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default SafetyCasesErrorBoundary;
