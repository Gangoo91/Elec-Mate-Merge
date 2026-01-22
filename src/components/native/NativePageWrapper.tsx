/**
 * NativePageWrapper
 *
 * Simple page wrapper with header. Keeps scrolling simple - no custom touch handling.
 */

import React, { ReactNode, useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NativePageWrapperProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  headerColor?: 'yellow' | 'blue' | 'green' | 'purple' | 'orange';
  showBackButton?: boolean;
  onBack?: () => void;
  onRefresh?: () => Promise<void>;
  collapsingHeader?: boolean;
  headerActions?: ReactNode;
  className?: string;
  contentClassName?: string;
  headerMaxHeight?: number;
  headerMinHeight?: number;
  compactTitle?: boolean;
}

const colorClasses = {
  yellow: {
    icon: 'bg-elec-yellow/10 text-elec-yellow',
    accent: 'text-elec-yellow',
  },
  blue: {
    icon: 'bg-info/10 text-info',
    accent: 'text-info',
  },
  green: {
    icon: 'bg-success/10 text-success',
    accent: 'text-success',
  },
  purple: {
    icon: 'bg-purple-500/10 text-purple-500',
    accent: 'text-purple-500',
  },
  orange: {
    icon: 'bg-orange-500/10 text-orange-500',
    accent: 'text-orange-500',
  },
};

export const NativePageWrapper: React.FC<NativePageWrapperProps> = ({
  children,
  title,
  subtitle,
  icon,
  headerColor = 'yellow',
  showBackButton = true,
  onBack,
  headerActions,
  className,
  contentClassName,
}) => {
  const navigate = useNavigate();
  const colors = colorClasses[headerColor];

  const handleBack = useCallback(() => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  }, [onBack, navigate]);

  return (
    <div className={cn('min-h-screen bg-background', className)}>
      {/* Simple Header */}
      <header className="sticky top-0 z-20 bg-background border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              {showBackButton && (
                <button
                  onClick={handleBack}
                  className="touch-target flex items-center justify-center -ml-2 rounded-xl hover:bg-white/5 active:scale-95 transition-all"
                >
                  <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                </button>
              )}

              <div className="flex items-center gap-2">
                {icon && (
                  <div className={cn('p-1.5 rounded-lg', colors.icon)}>
                    {React.cloneElement(icon as React.ReactElement, {
                      className: 'h-4 w-4',
                    })}
                  </div>
                )}
                <div>
                  <span className="text-base font-semibold text-foreground">
                    {title}
                  </span>
                  {subtitle && (
                    <p className="text-xs text-muted-foreground">{subtitle}</p>
                  )}
                </div>
              </div>
            </div>

            {headerActions && (
              <div className="flex items-center gap-2">{headerActions}</div>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      <div className={cn('max-w-7xl mx-auto px-4 py-6 space-y-6', contentClassName)}>
        {children}
      </div>
    </div>
  );
};

export default NativePageWrapper;
