import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SmartBackButton } from '@/components/ui/smart-back-button';
import { cva, type VariantProps } from 'class-variance-authority';

const pageHeaderVariants = cva(
  "border-b border-border",
  {
    variants: {
      variant: {
        standard: "bg-card/50 backdrop-blur-sm",
        compact: "bg-transparent border-none",
        hero: "bg-gradient-to-b from-elec-yellow/5 to-transparent border-none",
      },
    },
    defaultVariants: {
      variant: "standard",
    },
  }
);

interface Breadcrumb {
  label: string;
  to?: string;
}

interface PageHeaderProps extends VariantProps<typeof pageHeaderVariants> {
  /** Page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Optional icon component */
  icon?: LucideIcon;
  /** Show the back button (uses SmartBackButton with auto-detection) */
  showBack?: boolean;
  /** Override the auto-detected back button label */
  backLabel?: string;
  /** Override the auto-detected back destination */
  backTo?: string;
  /** Custom back handler (overrides navigation) */
  onBack?: () => void;
  /** Optional breadcrumbs for complex navigation */
  breadcrumbs?: Breadcrumb[];
  /** Actions to display on the right side */
  actions?: React.ReactNode;
  /** Whether the header should be sticky */
  sticky?: boolean;
  /** Additional className */
  className?: string;
}

/**
 * Standardized page header component with smart back navigation.
 *
 * @example
 * // Basic usage with auto-detected back button
 * <PageHeader title="Settings" showBack />
 *
 * @example
 * // With icon and actions
 * <PageHeader
 *   title="Dashboard"
 *   icon={LayoutDashboard}
 *   showBack
 *   actions={<Button variant="accent">Create</Button>}
 * />
 *
 * @example
 * // Hero variant for landing pages
 * <PageHeader
 *   variant="hero"
 *   title="Welcome"
 *   subtitle="Get started with your journey"
 *   icon={Zap}
 * />
 */
export const PageHeader = ({
  title,
  subtitle,
  icon: Icon,
  showBack = false,
  backLabel,
  backTo,
  onBack,
  breadcrumbs,
  actions,
  sticky = true,
  variant,
  className,
}: PageHeaderProps) => {
  return (
    <div className={cn(
      pageHeaderVariants({ variant }),
      sticky && "sticky top-0 z-10",
      className
    )}>
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 sm:py-4">
        {/* Main header row */}
        <div className="flex items-center gap-3">
          {/* Back button */}
          {showBack && (
            <SmartBackButton
              label={backLabel}
              to={backTo}
              size="sm"
              className="flex-shrink-0"
            />
          )}

          {/* Icon + Title */}
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {Icon && (
              <div className="flex-shrink-0 p-2 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-lg sm:text-2xl font-bold text-foreground truncate">
                {title}
              </h1>
              {subtitle && variant !== 'compact' && (
                <p className="text-sm text-muted-foreground mt-0.5 hidden sm:block truncate">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          {actions && (
            <div className="flex items-center gap-2 flex-shrink-0">
              {actions}
            </div>
          )}
        </div>

        {/* Breadcrumbs (if provided) */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mt-2 ml-0 sm:ml-12">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                {index > 0 && <span className="text-muted-foreground/50">/</span>}
                {crumb.to ? (
                  <a
                    href={crumb.to}
                    className="hover:text-foreground transition-colors"
                  >
                    {crumb.label}
                  </a>
                ) : (
                  <span className="text-foreground">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        )}

        {/* Subtitle for compact variant (shown below) */}
        {subtitle && variant === 'compact' && (
          <p className="text-sm text-muted-foreground mt-1">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
