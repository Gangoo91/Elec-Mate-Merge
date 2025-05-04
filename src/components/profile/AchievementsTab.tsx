
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AchievementsTab = () => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Your Achievements</CardTitle>
        <CardDescription>
          Track your progress and accomplishments
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="text-center py-8 text-muted-foreground">
          <p>Complete courses and activities to earn achievements</p>
          <Button 
            variant="outline" 
            className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10"
            asChild
          >
            <a href="/apprentice/study">Start Learning</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AchievementsTab;
