
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const UserSegments = () => {
  const [segmentType, setSegmentType] = useState("role");
  
  // Mock data for user segments by role
  const roleData = [
    { name: 'Apprentices', value: 215, color: '#FFD700' },
    { name: 'Electricians', value: 142, color: '#34d399' },
    { name: 'Employers', value: 71, color: '#60a5fa' },
    { name: 'Visitors', value: 56, color: '#f472b6' },
  ];
  
  // Mock data for user segments by activity
  const activityData = [
    { name: 'Highly Active', value: 98, color: '#34d399' },
    { name: 'Active', value: 167, color: '#FFD700' },
    { name: 'Occasional', value: 135, color: '#60a5fa' },
    { name: 'Inactive', value: 84, color: '#f472b6' },
  ];
  
  // Mock data for user segments by subscription
  const subscriptionData = [
    { name: 'Free', value: 286, color: '#60a5fa' },
    { name: 'Basic', value: 124, color: '#FFD700' },
    { name: 'Premium', value: 74, color: '#34d399' },
  ];
  
  // Mock data for engagement by feature
  const featureEngagementData = [
    { name: 'Chat', value: 78, color: '#60a5fa' },
    { name: 'Tools', value: 65, color: '#34d399' },
    { name: 'Learning', value: 87, color: '#FFD700' },
    { name: 'Projects', value: 43, color: '#f472b6' },
    { name: 'Community', value: 32, color: '#a78bfa' },
  ];
  
  // Get current data based on segment type
  const getCurrentData = () => {
    switch(segmentType) {
      case 'role':
        return roleData;
      case 'activity':
        return activityData;
      case 'subscription':
        return subscriptionData;
      default:
        return roleData;
    }
  };
  
  const currentData = getCurrentData();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-elec-yellow" />
            User Segments
          </CardTitle>
          <CardDescription>
            Breakdown of users by different segments
          </CardDescription>
          
          <Tabs value={segmentType} onValueChange={setSegmentType} className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="role" className="flex-1">By Role</TabsTrigger>
              <TabsTrigger value="activity" className="flex-1">By Activity</TabsTrigger>
              <TabsTrigger value="subscription" className="flex-1">By Subscription</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {currentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value} users`, undefined]}
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-sm text-muted-foreground">
            <p>
              Total Users: {currentData.reduce((sum, item) => sum + item.value, 0)}
            </p>
            <p className="mt-2">
              {segmentType === 'role' && 'Apprentices make up the largest user segment, showing strong adoption among those in training programs.'}
              {segmentType === 'activity' && 'The majority of users are active or highly active, indicating good platform engagement.'}
              {segmentType === 'subscription' && 'Most users are on the free tier, presenting opportunities for conversion to paid subscriptions.'}
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Feature Engagement</CardTitle>
          <CardDescription>
            Most used features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={featureEngagementData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis type="number" stroke="#888" />
                <YAxis dataKey="name" type="category" stroke="#888" />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Engagement']}
                  contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                  labelStyle={{ color: '#fff' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {featureEngagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 text-xs text-muted-foreground">
            <p>Learning resources and chat features show highest engagement, while community features have room for growth.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserSegments;
