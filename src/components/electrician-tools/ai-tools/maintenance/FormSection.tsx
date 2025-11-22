import React from 'react';
import { cn } from '@/lib/utils';

interface FormSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const FormSection: React.FC<FormSectionProps> = ({ 
  children, 
  className 
}) => {
  return (
    <div className={cn(
      "py-3 sm:py-4 border-b border-border/40 last:border-0",
      className
    )}>
      {children}
    </div>
  );
};
