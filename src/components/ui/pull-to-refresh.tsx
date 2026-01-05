import { ReactNode } from "react";

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: ReactNode;
}

export function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  // Simple implementation - can be enhanced with actual pull gesture later
  return <div>{children}</div>;
}
