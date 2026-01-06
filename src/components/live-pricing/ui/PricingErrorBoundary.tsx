import { Component, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class PricingErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Pricing Error:", error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-6">
            <AlertTriangle className="h-10 w-10 text-rose-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-white/60 text-sm mb-6 max-w-sm">
            We couldn't load this section. This might be a temporary issue.
          </p>
          <Button
            onClick={this.handleRetry}
            className={cn(
              "h-12 px-6 rounded-xl",
              "bg-gradient-to-r from-yellow-400 to-amber-500",
              "hover:from-yellow-300 hover:to-amber-400",
              "text-black font-bold"
            )}
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Try Again
          </Button>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <div className="mt-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-left max-w-full overflow-auto">
              <p className="text-xs font-mono text-rose-400">
                {this.state.error.message}
              </p>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default PricingErrorBoundary;
