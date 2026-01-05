import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveTableProps {
  children: React.ReactNode;
  className?: string;
}

interface ResponsiveTableRowProps {
  headers: string[];
  data: (string | number)[];
  className?: string;
}

export const ResponsiveTable: React.FC<ResponsiveTableProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn(
    "w-full overflow-hidden rounded-lg border border-border bg-card",
    className
  )}>
    {children}
  </div>
);

export const ResponsiveTableRow: React.FC<ResponsiveTableRowProps> = ({ 
  headers, 
  data, 
  className 
}) => (
  <div className={cn("border-b border-border last:border-b-0", className)}>
    {/* Desktop view */}
    <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 text-sm">
      {data.map((item, index) => (
        <div key={index} className="text-foreground">
          {item}
        </div>
      ))}
    </div>
    
    {/* Mobile view */}
    <div className="sm:hidden p-4 space-y-2">
      {headers.map((header, index) => (
        <div key={index} className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">{header}:</span>
          <span className="text-foreground">{data[index]}</span>
        </div>
      ))}
    </div>
  </div>
);

interface ResponsiveTableHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export const ResponsiveTableHeader: React.FC<ResponsiveTableHeaderProps> = ({ 
  children, 
  className 
}) => (
  <div className={cn(
    "hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4 border-b border-border bg-muted/50 text-sm font-medium text-muted-foreground",
    className
  )}>
    {children}
  </div>
);

interface ModernTableCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  variant?: 'default' | 'warning' | 'success' | 'info' | 'danger';
  className?: string;
}

export const ModernTableCard: React.FC<ModernTableCardProps> = ({
  title,
  description,
  icon,
  children,
  variant = 'default',
  className
}) => {
  const variantStyles = {
    default: 'bg-card border-border',
    warning: 'bg-yellow-500/10 border-yellow-500/20',
    success: 'bg-green-500/10 border-green-500/20',
    info: 'bg-blue-500/10 border-blue-500/20',
    danger: 'bg-red-500/10 border-red-500/20'
  };

  const iconColors = {
    default: 'text-foreground',
    warning: 'text-yellow-400',
    success: 'text-green-400',
    info: 'text-blue-400',
    danger: 'text-red-400'
  };

  const titleColors = {
    default: 'text-foreground',
    warning: 'text-yellow-400',
    success: 'text-green-400',
    info: 'text-blue-400',
    danger: 'text-red-400'
  };

  return (
    <div className={cn(
      "rounded-lg border p-4 space-y-4",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-center gap-2">
        {icon && (
          <div className={cn("h-4 w-4", iconColors[variant])}>
            {icon}
          </div>
        )}
        <h4 className={cn("font-medium", titleColors[variant])}>
          {title}
        </h4>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {children}
    </div>
  );
};

interface DataGridProps {
  headers: string[];
  rows: (string | number)[][];
  className?: string;
}

export const DataGrid: React.FC<DataGridProps> = ({ 
  headers, 
  rows, 
  className 
}) => (
  <ResponsiveTable className={className}>
    <ResponsiveTableHeader>
      {headers.map((header, index) => (
        <div key={index}>{header}</div>
      ))}
    </ResponsiveTableHeader>
    {rows.map((row, index) => (
      <ResponsiveTableRow
        key={index}
        headers={headers}
        data={row}
      />
    ))}
  </ResponsiveTable>
);