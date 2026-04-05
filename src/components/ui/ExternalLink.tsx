/**
 * ExternalLink — renders an <a> tag that routes through Capacitor Browser
 * on native platforms (SFSafariViewController / Chrome Custom Tabs) and
 * falls back to normal browser behaviour on web.
 *
 * On native, the global click interceptor in useNativeApp.ts will catch
 * these clicks automatically. This component is provided for explicit use
 * in new code and adds the correct attributes by default.
 */

import React from 'react';

type ExternalLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>;

export const ExternalLink = React.forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ children, rel, target, ...props }, ref) => {
    return (
      <a
        ref={ref}
        target={target ?? '_blank'}
        rel={rel ?? 'noopener noreferrer'}
        {...props}
      >
        {children}
      </a>
    );
  }
);

ExternalLink.displayName = 'ExternalLink';
