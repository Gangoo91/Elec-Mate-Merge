import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive';

interface TouchButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  pressScale?: number;
  pressOpacity?: number;
  children?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-[44px] px-4 text-sm gap-2',
  md: 'min-h-[48px] px-5 text-base gap-2.5',
  lg: 'min-h-[56px] px-6 text-lg gap-3',
  xl: 'min-h-[64px] px-8 text-xl gap-3',
};

const iconSizeClasses: Record<ButtonSize, string> = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
  xl: 'h-7 w-7',
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn(
    'bg-elec-yellow text-elec-dark',
    'hover:bg-elec-yellow/90',
    'shadow-lg shadow-elec-yellow/25'
  ),
  secondary: cn(
    'bg-white/10 text-foreground',
    'hover:bg-white/15',
    'border border-white/10'
  ),
  ghost: cn(
    'bg-transparent text-foreground',
    'hover:bg-white/5'
  ),
  outline: cn(
    'bg-transparent text-foreground',
    'border-2 border-white/20',
    'hover:border-white/40 hover:bg-white/5'
  ),
  destructive: cn(
    'bg-destructive text-destructive-foreground',
    'hover:bg-destructive/90',
    'shadow-lg shadow-destructive/25'
  ),
};

export const TouchButton = forwardRef<HTMLButtonElement, TouchButtonProps>(
  (
    {
      size = 'md',
      variant = 'primary',
      loading = false,
      fullWidth = false,
      icon,
      iconPosition = 'left',
      pressScale = 0.97,
      pressOpacity = 0.9,
      disabled,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: pressScale, opacity: pressOpacity } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className={cn(
          'relative inline-flex items-center justify-center',
          'rounded-xl font-semibold',
          'transition-colors duration-150',
          'touch-manipulation',
          '-webkit-tap-highlight-color-transparent',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && 'w-full',
          isDisabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {loading ? (
          <>
            <Loader2 className={cn('animate-spin', iconSizeClasses[size])} />
            <span className="ml-2">{children || 'Loading...'}</span>
          </>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className={iconSizeClasses[size]}>{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className={iconSizeClasses[size]}>{icon}</span>
            )}
          </>
        )}
      </motion.button>
    );
  }
);

TouchButton.displayName = 'TouchButton';

// Icon-only button variant
interface TouchIconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  loading?: boolean;
  icon: ReactNode;
  label: string; // For accessibility
}

export const TouchIconButton = forwardRef<HTMLButtonElement, TouchIconButtonProps>(
  (
    {
      size = 'md',
      variant = 'ghost',
      loading = false,
      icon,
      label,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    const sizeMap: Record<ButtonSize, string> = {
      sm: 'h-10 w-10',
      md: 'h-12 w-12',
      lg: 'h-14 w-14',
      xl: 'h-16 w-16',
    };

    return (
      <motion.button
        ref={ref}
        disabled={isDisabled}
        whileTap={!isDisabled ? { scale: 0.9 } : undefined}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label={label}
        className={cn(
          'inline-flex items-center justify-center',
          'rounded-xl',
          'transition-colors duration-150',
          'touch-manipulation',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow/50',
          sizeMap[size],
          variantClasses[variant],
          isDisabled && 'opacity-50 pointer-events-none',
          className
        )}
        {...(props as HTMLMotionProps<'button'>)}
      >
        {loading ? (
          <Loader2 className={cn('animate-spin', iconSizeClasses[size])} />
        ) : (
          <span className={iconSizeClasses[size]}>{icon}</span>
        )}
      </motion.button>
    );
  }
);

TouchIconButton.displayName = 'TouchIconButton';

// Floating action button
interface FloatingActionButtonProps extends TouchButtonProps {
  position?: 'bottom-right' | 'bottom-center' | 'bottom-left';
}

export const FloatingActionButton = forwardRef<HTMLButtonElement, FloatingActionButtonProps>(
  ({ position = 'bottom-right', className, ...props }, ref) => {
    const positionClasses = {
      'bottom-right': 'thumb-zone-floating',
      'bottom-center': 'thumb-zone-floating-center',
      'bottom-left': 'fixed bottom-6 left-4 z-50',
    };

    return (
      <TouchButton
        ref={ref}
        size="lg"
        className={cn(
          positionClasses[position],
          'rounded-full shadow-xl',
          'min-w-[56px]',
          className
        )}
        {...props}
      />
    );
  }
);

FloatingActionButton.displayName = 'FloatingActionButton';

export default TouchButton;
