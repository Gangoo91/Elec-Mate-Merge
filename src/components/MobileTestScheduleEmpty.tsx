
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const MobileTestScheduleEmpty = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-8 text-muted-foreground">
          <p className="mb-2">No circuits available for testing</p>
          <p className="text-sm">Add circuits in the Installation Details section first</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MobileTestScheduleEmpty;
