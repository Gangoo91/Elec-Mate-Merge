import { Component, ErrorInfo, ReactNode } from 'react';
import { captureError } from '@/lib/sentry';

interface Props {
  children: ReactNode;
  /** Label for the boundary — shown in Sentry tags so we can tell PostHog from Vercel etc. */
  section: string;
}

interface State {
  hasError: boolean;
}

/**
 * Catches errors from non-critical subtrees (analytics, marketing pixels,
 * telemetry) and renders nothing instead of letting them bubble up to a
 * parent ErrorBoundary and unmount the whole app.
 *
 * Use only for subtrees whose failure the user should never notice.
 * For user-facing routes, use SentryErrorBoundary which shows a recovery UI.
 */
class SilentErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    captureError(error, {
      section: this.props.section,
      silentBoundary: true,
      componentStack: errorInfo.componentStack,
    });
  }

  render(): ReactNode {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

export default SilentErrorBoundary;
