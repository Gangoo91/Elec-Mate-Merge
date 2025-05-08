
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
import { ChevronDown, Users, MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
}

const StatsCard = ({ title, value, icon, description }: StatsCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className="h-8 w-8 rounded-lg bg-elec-yellow/20 p-1.5 text-elec-yellow">{icon}</div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const AnalyticsDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [topPosts, setTopPosts] = useState<any[]>([]);
  const [activityData, setActivityData] = useState<any[]>([]);
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
        
        setActivityData([
          { name: 'Mon', posts: 12, comments: 34, upvotes: 84 },
          { name: 'Tue', posts: 15, comments: 41, upvotes: 97 },
          { name: 'Wed', posts: 18, comments: 52, upvotes: 113 },
          { name: 'Thu', posts: 14, comments: 37, upvotes: 91 },
          { name: 'Fri', posts: 21, comments: 49, upvotes: 142 },
          { name: 'Sat', posts: 8, comments: 23, upvotes: 67 },
          { name: 'Sun', posts: 7, comments: 18, upvotes: 51 }
        ]);
        
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
  }, []);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Users" 
          value={userCount} 
          icon={<Users />} 
          description="Registered accounts" 
        />
        <StatsCard 
          title="Total Posts" 
          value={postCount} 
          icon={<MessageSquare />} 
          description="Discussions created" 
        />
        <StatsCard 
          title="Comments" 
          value={commentCount} 
          icon={<ChevronDown />} 
          description="Replies to discussions" 
        />
        <StatsCard 
          title="Interactions" 
          value={upvoteCount} 
          icon={<ThumbsUp />} 
          description="Upvotes and shares" 
        />
      </div>

      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
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
        
        <TabsContent value="posts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Post Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed post analytics to be implemented.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Detailed user analytics to be implemented.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
