
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ActivityTab = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Your learning progress and platform activity
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <p>No recent activity to display</p>
          <Button 
            variant="outline" 
            className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
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
