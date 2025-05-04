
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, LineChart, Clock, Calendar, BookOpen, CheckCircle } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

const ActivityTab = () => {
  const isMobile = useIsMobile();
  
  // Sample activity data
  const recentActivities = [
    { type: 'course', title: 'Started Basic Electrical Theory', date: '2 days ago', icon: BookOpen },
    { type: 'quiz', title: 'Completed Safety Quiz', date: '3 days ago', icon: CheckCircle },
    { type: 'login', title: 'First Login', date: '5 days ago', icon: Calendar }
  ];
  
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
        <CardHeader className="p-4 sm:p-6 bg-gradient-to-r from-elec-yellow/5 to-transparent">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-elec-yellow/10">
              <Activity className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <CardTitle className="text-lg sm:text-2xl">Learning Activity</CardTitle>
              <CardDescription className="text-xs sm:text-sm mt-1">
                Your learning progress and platform activity
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4 sm:p-6">
          {/* Activity Chart */}
          <div className="p-4 bg-elec-gray border border-elec-yellow/10 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-sm">Learning Hours</h3>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
            
            <div className="h-28 flex items-end justify-between gap-1">
              {[10, 25, 45, 30, 60, 20, 15].map((height, i) => (
                <div key={i} className="relative flex-1 flex flex-col items-center">
                  <div 
                    className={`w-full bg-elec-yellow/70 rounded-t-sm ${i === 4 ? 'bg-elec-yellow' : ''}`}
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="absolute bottom-0 translate-y-6 text-xs text-muted-foreground">
                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity List */}
          <h3 className="font-medium text-sm mb-3">Recent Activity</h3>
          
          {recentActivities.length > 0 ? (
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const ActivityIcon = activity.icon;
                
                return (
                  <div key={index} className="flex items-center gap-3 p-3 rounded-lg border border-elec-yellow/10 bg-elec-yellow/5">
                    <div className="p-2 rounded-full bg-elec-yellow/10">
                      <ActivityIcon className="h-3 w-3 text-elec-yellow" />
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <span className="text-xs text-muted-foreground">{activity.date}</span>
                    </div>
                  </div>
                );
              })}
              
              <Button 
                variant="outline" 
                className="w-full mt-2 border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs sm:text-sm"
                size={isMobile ? "sm" : "default"}
              >
                View All Activity
              </Button>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Clock className="h-10 w-10 mx-auto mb-3 text-muted-foreground/60" />
              <p className="text-sm">No recent activity to display</p>
              <Button 
                variant="outline" 
                className="mt-4 border-elec-yellow/30 hover:bg-elec-yellow/10 text-xs sm:text-sm"
                size={isMobile ? "sm" : "default"}
                asChild
              >
                <a href="/dashboard">Start Exploring</a>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Learning Stats Card */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-4 sm:p-6">
          <h3 className="font-medium mb-4">Learning Statistics</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              title="Total Study Time"
              value="12h 30m"
              icon={Clock}
            />
            
            <StatCard
              title="Courses Started"
              value="3"
              icon={BookOpen}
            />
            
            <StatCard
              title="Login Streak"
              value="5 days"
              icon={Calendar}
            />
            
            <StatCard
              title="Completion Rate"
              value="68%"
              icon={LineChart}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: any;
}

const StatCard = ({ title, value, icon: Icon }: StatCardProps) => {
  return (
    <div className="p-3 rounded-lg border border-elec-yellow/10 bg-elec-yellow/5">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="h-3 w-3 text-elec-yellow" />
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <p className="text-lg font-semibold">{value}</p>
    </div>
  );
};

export default ActivityTab;
