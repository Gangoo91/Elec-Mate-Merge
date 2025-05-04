
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';

const ActivityTab = () => {
  const isMobile = useIsMobile();
  
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-lg sm:text-2xl">Recent Activity</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Your learning progress and platform activity
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6">
        <div className="text-center py-6 sm:py-8 text-muted-foreground">
          <p className="text-sm">No recent activity to display</p>
          <Button 
            variant="outline" 
            className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs sm:text-sm"
            size={isMobile ? "sm" : "default"}
            asChild
          >
            <a href="/dashboard">Explore Dashboard</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityTab;
