
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ReportStatisticsProps {
  reportStats: {
    total: number;
    completed: number;
    inProgress: number;
    drafts: number;
  };
}

const ReportStatistics = ({ reportStats }: ReportStatisticsProps) => {
  if (reportStats.total === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:max-w-5xl mx-auto">
      <Card className="bg-card border-elec-yellow/30">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-elec-yellow">{reportStats.total}</div>
          <div className="text-sm text-muted-foreground">Total Reports</div>
        </CardContent>
      </Card>
      <Card className="bg-card border-elec-yellow/30">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400">{reportStats.completed}</div>
          <div className="text-sm text-muted-foreground">Completed</div>
        </CardContent>
      </Card>
      <Card className="bg-card border-elec-yellow/30">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-400">{reportStats.inProgress}</div>
          <div className="text-sm text-muted-foreground">In Progress</div>
        </CardContent>
      </Card>
      <Card className="bg-card border-elec-yellow/30">
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-yellow-400">{reportStats.drafts}</div>
          <div className="text-sm text-muted-foreground">Drafts</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportStatistics;
