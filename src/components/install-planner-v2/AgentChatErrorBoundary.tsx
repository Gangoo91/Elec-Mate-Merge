import React, { Component, ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class AgentChatErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('❌ Agent chat rendering error:', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      errorType: error.name
    });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-destructive/50 bg-destructive/5 overflow-hidden">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-2 overflow-hidden">
                <h3 className="font-semibold text-destructive">Chat Error</h3>
                <p className="text-sm text-muted-foreground">
                  Something went wrong displaying this message. The conversation is still saved.
                </p>
                {this.state.error && (
                  <details className="text-xs text-muted-foreground overflow-hidden">
                    <summary className="cursor-pointer hover:text-foreground">
                      Error details
                    </summary>
                    <pre className="mt-2 p-2 bg-muted rounded text-xs whitespace-pre-wrap break-words break-all max-w-full">
                      {this.state.error.message}
                    </pre>
                  </details>
                )}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={this.handleReset}
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Continue Chat
            </Button>
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}
