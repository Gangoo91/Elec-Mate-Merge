import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { responsiveBody, touchTarget } from '@/styles/typography-utilities';

interface RelatedTopic {
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
}

interface RelatedTopicsCardProps {
  topics: RelatedTopic[];
  title?: string;
  className?: string;
}

export const RelatedTopicsCard: React.FC<RelatedTopicsCardProps> = ({
  topics,
  title = 'Related Topics',
  className,
}) => {
  return (
    <Card className={cn('border-purple-500/20 bg-purple-500/5', className)}>
      <CardHeader className="pb-3 sm:pb-4">
        <CardTitle className="text-sm sm:text-base md:text-lg text-purple-300">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {topics.map((topic, index) => (
            <Button
              key={index}
              variant="outline"
              onClick={topic.onClick}
              className={cn(
                'h-auto py-3 px-4 flex items-center justify-between gap-3',
                'border-purple-500/20 hover:border-purple-500/40 hover:bg-purple-500/10',
                'transition-all duration-200',
                touchTarget.button
              )}
            >
              <div className="flex items-center gap-3 flex-1 text-left">
                <div className="text-purple-400 flex-shrink-0">
                  {topic.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className={cn('text-foreground font-medium truncate', responsiveBody.normal)}>
                    {topic.title}
                  </div>
                  {topic.description && (
                    <div className={cn('text-white/80 truncate', responsiveBody.small)}>
                      {topic.description}
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-400 flex-shrink-0" />
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
