import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { responsiveBody } from '@/styles/typography-utilities';

interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
  onClick?: () => void;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className }) => {
  return (
    <nav 
      className={cn('flex items-center', className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap gap-1 sm:gap-2">
        <li>
          <button
            onClick={items[0]?.onClick}
            className={cn(
              'flex items-center gap-1 hover:text-elec-yellow transition-colors min-h-[44px] px-2 touch-manipulation',
              responsiveBody.small,
              items[0]?.current ? 'text-elec-yellow' : 'text-muted-foreground'
            )}
            aria-current={items[0]?.current ? 'page' : undefined}
          >
            <Home className="h-3 w-3 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">{items[0]?.label}</span>
          </button>
        </li>
        
        {items.slice(1).map((item, index) => (
          <li key={index} className="flex items-center gap-1 sm:gap-2">
            <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground flex-shrink-0" />
            {item.current ? (
              <span
                className={cn(
                  'text-elec-yellow font-medium',
                  responsiveBody.small,
                  'px-2 py-1'
                )}
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className={cn(
                  'text-muted-foreground hover:text-elec-yellow transition-colors min-h-[44px] px-2 touch-manipulation',
                  responsiveBody.small
                )}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};
