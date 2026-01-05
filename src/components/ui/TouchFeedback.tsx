import React, { forwardRef, useCallback, useState } from 'react';
import { cn } from '@/lib/utils';

type FeedbackType = 'default' | 'strong' | 'subtle' | 'opacity' | 'ripple' | 'none';

interface TouchFeedbackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Type of touch feedback animation */
  feedback?: FeedbackType;
  /** Whether the element is disabled */
  disabled?: boolean;
  /** Whether to trigger haptic feedback */
  haptic?: boolean;
  /** Custom active class */
  activeClassName?: string;
  /** Render as a different element */
  as?: 'div' | 'button' | 'a' | 'span';
  children: React.ReactNode;
}

/**
 * TouchFeedback - Wrapper component for touch-optimized interactions
 *
 * Provides visual feedback on touch/click with optional haptic feedback
 *
 * @example
 * <TouchFeedback feedback="strong" haptic>
 *   <Card>...</Card>
 * </TouchFeedback>
 */
export const TouchFeedback = forwardRef<HTMLDivElement, TouchFeedbackProps>(
  (
    {
      feedback = 'default',
      disabled = false,
      haptic = false,
      activeClassName,
      as: Component = 'div',
      className,
      children,
      onClick,
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    // Get feedback class based on type
    const feedbackClass = {
      default: 'touch-feedback',
      strong: 'touch-feedback-strong',
      subtle: 'touch-feedback-subtle',
      opacity: 'touch-feedback-opacity',
      ripple: 'touch-ripple',
      none: '',
    }[feedback];

    // Trigger haptic feedback if supported
    const triggerHaptic = useCallback(() => {
      if (haptic && 'vibrate' in navigator) {
        navigator.vibrate(10); // Short vibration
      }
    }, [haptic]);

    // Handle press start
    const handlePressStart = useCallback(() => {
      if (disabled) return;
      setIsPressed(true);
      triggerHaptic();
    }, [disabled, triggerHaptic]);

    // Handle press end
    const handlePressEnd = useCallback(() => {
      setIsPressed(false);
    }, []);

    // Handle click with haptic
    const handleClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (disabled) {
          e.preventDefault();
          return;
        }
        onClick?.(e);
      },
      [disabled, onClick]
    );

    return (
      <Component
        ref={ref as any}
        className={cn(
          feedbackClass,
          disabled && 'disabled-touch',
          isPressed && activeClassName,
          className
        )}
        onMouseDown={handlePressStart}
        onMouseUp={handlePressEnd}
        onMouseLeave={handlePressEnd}
        onTouchStart={handlePressStart}
        onTouchEnd={handlePressEnd}
        onClick={handleClick}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

TouchFeedback.displayName = 'TouchFeedback';

/**
 * TouchButton - Pre-styled touch-optimized button
 */
interface TouchButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Full width */
  fullWidth?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Icon only (square) */
  iconOnly?: boolean;
  children: React.ReactNode;
}

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      fullWidth = false,
      loading = false,
      iconOnly = false,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const sizeClass = {
      sm: iconOnly ? 'btn-touch-icon h-11 w-11' : 'btn-touch-sm',
      md: iconOnly ? 'btn-touch-icon' : 'btn-touch',
      lg: iconOnly ? 'btn-touch-icon h-14 w-14' : 'btn-touch-lg',
    }[size];

    const variantClass = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
      outline: 'border-2 border-border bg-background hover:bg-accent',
      ghost: 'hover:bg-accent',
    }[variant];

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          sizeClass,
          variantClass,
          fullWidth && 'w-full',
          loading && 'loading-touch relative',
          'touch-feedback inline-flex items-center justify-center gap-2',
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

TouchButton.displayName = 'TouchButton';

/**
 * TouchCard - Pre-styled touch-optimized card
 */
interface TouchCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether card lifts on hover */
  lift?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const TouchCard = forwardRef<HTMLDivElement, TouchCardProps>(
  ({ lift = false, padding = 'md', className, children, ...props }, ref) => {
    const paddingClass = {
      none: '',
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
    }[padding];

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-xl border border-border bg-card',
          lift ? 'card-touch-lift' : 'card-touch',
          paddingClass,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

TouchCard.displayName = 'TouchCard';

/**
 * TouchListItem - Pre-styled touch-optimized list item
 */
interface TouchListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left element (icon, avatar, etc.) */
  left?: React.ReactNode;
  /** Right element (chevron, badge, etc.) */
  right?: React.ReactNode;
  /** Primary text */
  primary: React.ReactNode;
  /** Secondary text */
  secondary?: React.ReactNode;
  /** Whether to show divider */
  divider?: boolean;
}

export const TouchListItem = forwardRef<HTMLDivElement, TouchListItemProps>(
  (
    { left, right, primary, secondary, divider = false, className, ...props },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          'list-item-touch cursor-pointer',
          divider && 'border-b border-border',
          className
        )}
        {...props}
      >
        {left && <div className="shrink-0">{left}</div>}
        <div className="flex-1 min-w-0">
          <div className="font-medium truncate">{primary}</div>
          {secondary && (
            <div className="text-sm text-muted-foreground truncate">
              {secondary}
            </div>
          )}
        </div>
        {right && <div className="shrink-0">{right}</div>}
      </div>
    );
  }
);

TouchListItem.displayName = 'TouchListItem';

export default TouchFeedback;
