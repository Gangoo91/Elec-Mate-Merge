
import { Badge } from '@/components/ui/badge';
import { Clock, Shield } from 'lucide-react';
import { CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

interface TestStepHeaderProps {
  title: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed' | 'skipped';
  estimatedTime?: string;
  isSafeIsolationStep: boolean;
}

const TestStepHeader = ({ title, status, estimatedTime, isSafeIsolationStep }: TestStepHeaderProps) => {
  const isMobile = useIsMobile();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      case 'in-progress': return 'bg-yellow-500';
      case 'skipped': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <CardHeader className={isMobile ? "pb-4" : ""}>
      <div className="flex items-center justify-between">
        <CardTitle className={`flex items-center gap-2 ${isMobile ? 'text-lg' : ''}`}>
          {isSafeIsolationStep && <Shield className="h-5 w-5 text-red-400" />}
          {title}
          <Badge className={getStatusColor(status)}>
            {status}
          </Badge>
        </CardTitle>
        {estimatedTime && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {estimatedTime}
          </div>
        )}
      </div>
    </CardHeader>
  );
};

export default TestStepHeader;
