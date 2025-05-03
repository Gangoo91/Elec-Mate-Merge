
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

const ApprenticeOJT = () => {
  const [weeklyHours] = useState(8);
  const [targetHours] = useState(40);
  const progress = (weeklyHours / targetHours) * 100;

  const activities = [
    { id: 1, date: "2025-05-01", description: "Circuit theory workshop", hours: 3 },
    { id: 2, date: "2025-05-02", description: "Online safety course", hours: 2 },
    { id: 3, date: "2025-04-29", description: "Practical wiring exercises", hours: 2 },
    { id: 4, date: "2025-04-27", description: "Industry webinar", hours: 1 },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Off the Job Time Keeping</h1>
          <p className="text-muted-foreground">
            Track your 20% off-the-job training hours and access EAL compliant resources
          </p>
        </div>
        <Link to="/apprentice">
          <Button variant="outline">Back to Apprentice Hub</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-elec-yellow" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>This week</span>
                  <span>{weeklyHours} / {targetHours} hours</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              <Button className="w-full">Log New Hours</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-elec-yellow/20 bg-elec-gray lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className="flex justify-between items-center pb-3 border-b border-elec-yellow/10">
                  <div>
                    <p className="font-medium">{activity.description}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{activity.hours} hours</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">View All Activity</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ApprenticeOJT;
