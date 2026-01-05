
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import MobileTestProgress from './MobileTestProgress';

interface MobileTestScheduleHeaderProps {
  progress: number;
  completedTestsCount: number;
  totalTests: number;
  circuits: any[];
}

const MobileTestScheduleHeader = ({ progress, completedTestsCount, totalTests, circuits }: MobileTestScheduleHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          📱 Mobile Test Schedule
        </CardTitle>
      </CardHeader>
      <CardContent>
        <MobileTestProgress 
          progress={progress}
          completedTests={completedTestsCount}
          totalTests={totalTests}
          circuits={circuits}
        />
      </CardContent>
    </Card>
  );
};

export default MobileTestScheduleHeader;
