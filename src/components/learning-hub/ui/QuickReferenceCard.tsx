import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { responsiveBody } from '@/styles/typography-utilities';
import { cn } from '@/lib/utils';

interface QuickReferenceItem {
  label: string;
  value: string | React.ReactNode;
}

interface QuickReferenceCardProps {
  title: string;
  items: QuickReferenceItem[];
  icon?: React.ReactNode;
  className?: string;
}

export const QuickReferenceCard: React.FC<QuickReferenceCardProps> = ({
  title,
  items,
  icon,
  className,
}) => {
  return (
    <Card className={cn('border-elec-yellow/30 bg-elec-yellow/5', className)}>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-sm sm:text-base md:text-lg text-elec-yellow flex items-center gap-2">
          {icon || <Info className="h-4 w-4 sm:h-5 sm:w-5" />}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {items.map((item, index) => (
            <div 
              key={index}
              className="bg-background/50 rounded-lg p-3 border border-muted"
            >
              <div className={cn('text-muted-foreground mb-1', responsiveBody.small)}>
                {item.label}
              </div>
              <div className={cn('text-foreground font-medium', responsiveBody.normal)}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
