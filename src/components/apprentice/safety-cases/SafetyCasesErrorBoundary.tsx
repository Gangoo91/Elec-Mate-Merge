
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

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
        <div className="min-h-screen bg-elec-dark p-6 flex items-center justify-center">
          <Card className="border-red-500/20 bg-red-900/10 max-w-2xl w-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                <CardTitle className="text-red-400">
                  Safety Cases Error ({this.props.pageName || 'Unknown Page'})
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-elec-light/80">
                An error occurred while loading the safety cases content. This helps us debug the issue.
              </p>
              
              {this.state.error && (
                <div className="bg-elec-dark/50 p-4 rounded border border-elec-yellow/20">
                  <p className="text-sm font-mono text-red-400 mb-2">
                    Error: {this.state.error.message}
                  </p>
                  {process.env.NODE_ENV === 'development' && (
                    <details className="text-xs">
                      <summary className="cursor-pointer text-elec-yellow">
                        Show Stack Trace
                      </summary>
                      <pre className="mt-2 whitespace-pre-wrap text-gray-400">
                        {this.state.error.stack}
                      </pre>
                    </details>
                  )}
                </div>
              )}
              
              <Button 
                onClick={this.handleRetry}
                className="flex items-center gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
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
