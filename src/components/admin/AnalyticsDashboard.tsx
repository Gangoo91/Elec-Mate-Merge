
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  ChevronDown, 
  Users, 
  MessageSquare, 
  ThumbsUp, 
  Share2,
  TrendingUp,
  Clock,
  Award,
  Activity
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

interface AnalyticsDashboardProps {
  timeRange?: string;
}

const StatsCard = ({ title, value, icon, description, trend }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-elec-yellow/20 p-1.5 text-elec-yellow">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="flex items-baseline justify-between">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <div className={`flex items-center text-xs ${trend.isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}%
          </div>
        )}
      </div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const AnalyticsDashboard = ({ timeRange = "7d" }: AnalyticsDashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
  const [conversionData, setConversionData] = useState<any[]>([]);
  const [usageMetrics, setUsageMetrics] = useState<any[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        // This is mocked data for now
        // In production, these would be actual Supabase queries to aggregated analytics tables
        
        setUserCount(428);
        setPostCount(156);
        setCommentCount(873);
        setUpvoteCount(2347);
        setActiveUsers(73);
        
        setTopPosts([
          { id: 1, title: "Voltage drop calculation issues", author: "john_electrician", upvotes: 47, comments: 23 },
          { id: 2, title: "New regulations for commercial installations", author: "master_sparky", upvotes: 38, comments: 31 },
          { id: 3, title: "Tool recommendations for apprentices", author: "voltage_warrior", upvotes: 36, comments: 42 },
          { id: 4, title: "Safety tips for working at height", author: "safe_circuits", upvotes: 29, comments: 19 },
          { id: 5, title: "Troubleshooting RCD trips", author: "circuit_whisperer", upvotes: 24, comments: 27 }
        ]);
        
        let days = 7;
        if (timeRange === "24h") days = 1;
        if (timeRange === "30d") days = 30;
        if (timeRange === "90d") days = 90;
        
        // Generate activity data based on time range
        const newActivityData = [];
        const daysLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        
        for (let i = 0; i < Math.min(days, 7); i++) {
          newActivityData.push({
            name: daysLabels[i % 7],
            posts: Math.floor(Math.random() * 15) + 10,
            comments: Math.floor(Math.random() * 30) + 20,
            upvotes: Math.floor(Math.random() * 80) + 50,
          });
        }
        
        setActivityData(newActivityData);
        
        // Generate conversion data (visitors -> signups -> subscriptions)
        const newConversionData = [];
        for (let i = 0; i < Math.min(days, 10); i++) {
          const visitors = Math.floor(Math.random() * 100) + 100;
          const signups = Math.floor(visitors * (Math.random() * 0.1 + 0.1)); // 10-20% conversion
          const subscriptions = Math.floor(signups * (Math.random() * 0.15 + 0.05)); // 5-20% conversion
          
          newConversionData.push({
            date: `Day ${i + 1}`,
            visitors,
            signups,
            subscriptions,
          });
        }
        
        setConversionData(newConversionData);
        
        // Generate usage metrics
        const newUsageMetrics = [];
        const features = ['Chat', 'Tools', 'Projects', 'Learning', 'Calculator'];
        
        for (let i = 0; i < features.length; i++) {
          newUsageMetrics.push({
            feature: features[i],
            usage: Math.floor(Math.random() * 60) + 20,
            growth: Math.floor(Math.random() * 20) - 5, // -5% to +15%
          });
        }
        
        setUsageMetrics(newUsageMetrics);
        
        // In a real implementation, you would fetch actual data:
        /*
        const { count: userCountResult } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
          
        const { count: postCountResult } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true });
          
        // etc...
        
        if (userCountResult !== null) setUserCount(userCountResult);
        if (postCountResult !== null) setPostCount(postCountResult);
        */
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Users" 
          value={userCount} 
          icon={<Users />} 
          description="Registered accounts" 
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard 
          title="Total Posts" 
          value={postCount} 
          icon={<MessageSquare />} 
          description="Discussions created" 
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard 
          title="Comments" 
          value={commentCount} 
          icon={<ChevronDown />} 
          description="Replies to discussions" 
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard 
          title="Interactions" 
          value={upvoteCount} 
          icon={<ThumbsUp />} 
          description="Upvotes and shares" 
          trend={{ value: 4, isPositive: true }}
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="conversion">Conversion</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-elec-yellow" />
                Weekly Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="posts" name="Posts" fill="#FFD240" />
                    <Bar dataKey="comments" name="Comments" fill="#60A5FA" />
                    <Bar dataKey="upvotes" name="Upvotes" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Most Engaged Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead className="text-right">Upvotes</TableHead>
                    <TableHead className="text-right">Comments</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topPosts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell className="text-right">{post.upvotes}</TableCell>
                      <TableCell className="text-right">{post.comments}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-elec-yellow" />
                Conversion Funnel
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="visitors" 
                      stackId="1"
                      stroke="#60A5FA" 
                      fill="#60A5FA" 
                      name="Visitors"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="signups" 
                      stackId="2"
                      stroke="#FFD240" 
                      fill="#FFD240" 
                      name="Sign-ups"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="subscriptions" 
                      stackId="3"
                      stroke="#10B981" 
                      fill="#10B981" 
                      name="Subscriptions"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="rounded-md bg-blue-500/20 p-2">
                  <p className="text-sm font-medium text-blue-400">Visitors to Sign-ups</p>
                  <p className="text-xl font-bold">15.2%</p>
                  <p className="text-xs text-muted-foreground">+2.1% from last period</p>
                </div>
                <div className="rounded-md bg-yellow-500/20 p-2">
                  <p className="text-sm font-medium text-yellow-400">Sign-ups to Subscriptions</p>
                  <p className="text-xl font-bold">8.7%</p>
                  <p className="text-xs text-muted-foreground">+1.3% from last period</p>
                </div>
                <div className="rounded-md bg-green-500/20 p-2">
                  <p className="text-sm font-medium text-green-400">Overall Conversion</p>
                  <p className="text-xl font-bold">1.3%</p>
                  <p className="text-xs text-muted-foreground">+0.4% from last period</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-elec-yellow" />
                Feature Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={usageMetrics}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis type="number" stroke="#888" />
                    <YAxis dataKey="feature" type="category" stroke="#888" />
                    <Tooltip
                      formatter={(value) => [`${value}%`, 'Usage']}
                      contentStyle={{ backgroundColor: '#1e1e1e', borderColor: '#333' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar 
                      dataKey="usage" 
                      fill="#FFD240" 
                      radius={[0, 4, 4, 0]}
                      label={{ 
                        position: 'right', 
                        formatter: (value: number) => `${value}%`,
                        fill: '#fff',
                        fontSize: 12
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">Insights:</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Chat and Learning features have the highest engagement</li>
                  <li>• Calculator tools show growing popularity (+12% this week)</li>
                  <li>• Project management features need improvement to increase usage</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5 text-elec-yellow" />
                User Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="rounded-md bg-elec-gray p-4">
                  <p className="text-lg font-bold">32%</p>
                  <p className="text-xs text-muted-foreground">Course Completion Rate</p>
                </div>
                <div className="rounded-md bg-elec-gray p-4">
                  <p className="text-lg font-bold">4.2</p>
                  <p className="text-xs text-muted-foreground">Avg. Session Duration (min)</p>
                </div>
                <div className="rounded-md bg-elec-gray p-4">
                  <p className="text-lg font-bold">68%</p>
                  <p className="text-xs text-muted-foreground">Return Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
