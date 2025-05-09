
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Users, FileText, Activity, Code, Settings, Calendar, CheckCircle, BarChart } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// Mock data for the admin dashboard
const mockUsers = [
  { id: 1, name: "John Smith", email: "john@example.com", role: "electrician", lastActive: "2025-05-08" },
  { id: 2, name: "Sarah Wilson", email: "sarah@example.com", role: "apprentice", lastActive: "2025-05-09" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "employer", lastActive: "2025-05-07" },
  { id: 4, name: "Emma Brown", email: "emma@example.com", role: "apprentice", lastActive: "2025-05-09" },
];

const mockContent = [
  { id: 1, title: "Electrical Installation Fundamentals", type: "Course", author: "Admin", lastUpdated: "2025-05-05", status: "Published" },
  { id: 2, title: "Circuit Design & Analysis", type: "Course", author: "Admin", lastUpdated: "2025-05-02", status: "Published" },
  { id: 3, title: "Safety First Blog Post", type: "Article", author: "John Smith", lastUpdated: "2025-05-09", status: "Draft" },
  { id: 4, title: "Weekly Quiz: Electrical Regulations", type: "Quiz", author: "Admin", lastUpdated: "2025-05-07", status: "Published" },
];

const mockSystemEvents = [
  { id: 1, event: "New user registration", date: "2025-05-09 14:32", severity: "info" },
  { id: 2, event: "Failed login attempt", date: "2025-05-09 10:15", severity: "warning" },
  { id: 3, event: "Course content updated", date: "2025-05-08 16:45", severity: "info" },
  { id: 4, event: "Database backup completed", date: "2025-05-08 03:00", severity: "success" },
  { id: 5, event: "API rate limit exceeded", date: "2025-05-07 11:23", severity: "error" },
];

const AdminDashboard = () => {
  const { user, profile, isDevelopmentMode } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  
  // Check if the user has admin privileges
  useEffect(() => {
    // Allow access if user is admin or development mode is enabled
    const hasAccess = profile?.role === "admin" || isDevelopmentMode;
    
    if (hasAccess) {
      setIsAdmin(true);
    } else {
      // Redirect non-admin users
      navigate("/dashboard");
    }
  }, [user, profile, isDevelopmentMode, navigate]);
  
  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Admin Dashboard</h2>
        {isDevelopmentMode && !profile?.role && (
          <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-500/30 flex items-center gap-1">
            <Code className="h-3.5 w-3.5" />
            Dev Mode Access
          </Badge>
        )}
      </div>
      <p className="text-gray-400">Manage your application settings, users, and content.</p>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="overflow-x-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-medium">Total Users</h3>
              </div>
              <p className="text-2xl font-bold">2,431</p>
              <p className="text-xs text-gray-400 mt-1">+12% from last month</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-medium">Active Sessions</h3>
              </div>
              <p className="text-2xl font-bold">143</p>
              <p className="text-xs text-gray-400 mt-1">Current active users</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                <h3 className="text-sm font-medium">Content Items</h3>
              </div>
              <p className="text-2xl font-bold">872</p>
              <p className="text-xs text-gray-400 mt-1">Across all categories</p>
            </Card>
            
            <Card className="p-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <h3 className="text-sm font-medium">Issues</h3>
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-xs text-gray-400 mt-1">Require attention</p>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-elec-yellow" />
                Recent Activity
              </h3>
              <div className="space-y-3">
                {mockSystemEvents.slice(0, 4).map(event => (
                  <div key={event.id} className="flex items-center gap-2 text-sm border-b border-elec-yellow/10 pb-2">
                    <span className={`h-2 w-2 rounded-full ${
                      event.severity === 'error' ? 'bg-red-500' : 
                      event.severity === 'warning' ? 'bg-amber-500' : 
                      event.severity === 'success' ? 'bg-green-500' : 
                      'bg-blue-500'
                    }`}></span>
                    <span>{event.event}</span>
                    <span className="ml-auto text-xs text-gray-400">{event.date}</span>
                  </div>
                ))}
              </div>
              <button className="text-xs text-elec-yellow hover:text-elec-yellow/80 mt-3">View all activity</button>
            </Card>
            
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-elec-yellow" />
                Quick Tasks
              </h3>
              <div className="space-y-3">
                <div className="bg-elec-gray-light/20 p-3 rounded-md">
                  <h4 className="text-sm font-medium">Pending User Approvals</h4>
                  <p className="text-xs text-gray-400 mt-1">3 new users waiting for approval</p>
                  <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded mt-2 hover:bg-elec-yellow/90">Review</button>
                </div>
                <div className="bg-elec-gray-light/20 p-3 rounded-md">
                  <h4 className="text-sm font-medium">Content Submissions</h4>
                  <p className="text-xs text-gray-400 mt-1">2 articles pending review</p>
                  <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded mt-2 hover:bg-elec-yellow/90">Review</button>
                </div>
                <div className="bg-elec-gray-light/20 p-3 rounded-md">
                  <h4 className="text-sm font-medium">System Updates</h4>
                  <p className="text-xs text-gray-400 mt-1">New version available: v2.4.5</p>
                  <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded mt-2 hover:bg-elec-yellow/90">Update</button>
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Alert className="bg-yellow-900/20 text-yellow-500 border-yellow-500/30">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Admin Portal Notice</AlertTitle>
              <AlertDescription>
                This is a preview of the admin dashboard. In a real implementation, 
                you would connect this to your database to display actual statistics.
              </AlertDescription>
            </Alert>
          </div>
        </TabsContent>
        
        <TabsContent value="users" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">User Management</h3>
              <div className="flex gap-2">
                <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded hover:bg-elec-yellow/90 flex items-center gap-1">
                  <Users className="h-3 w-3" /> Add User
                </button>
                <button className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded hover:bg-elec-gray-light/70">
                  Export
                </button>
              </div>
            </div>
            
            <div className="rounded-md border border-elec-yellow/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell className="text-right">
                        <button className="text-xs bg-elec-gray-light/30 hover:bg-elec-gray-light/50 px-2 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="text-xs bg-red-900/20 text-red-400 hover:bg-red-900/40 px-2 py-1 rounded">
                          Delete
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>Showing 1-4 of 2,431 users</span>
              <div className="flex gap-1">
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
                <button className="px-2 py-1 rounded bg-elec-yellow/20 text-elec-yellow">1</button>
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">2</button>
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">3</button>
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">Next</button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="content" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium">Content Management</h3>
              <div className="flex gap-2">
                <button className="text-xs bg-elec-yellow text-black px-3 py-1 rounded hover:bg-elec-yellow/90 flex items-center gap-1">
                  <FileText className="h-3 w-3" /> New Content
                </button>
                <button className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded hover:bg-elec-gray-light/70">
                  Categories
                </button>
              </div>
            </div>
            
            <div className="rounded-md border border-elec-yellow/20 overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockContent.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell>{item.type}</TableCell>
                      <TableCell>{item.author}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.status === 'Published' ? 'gold' : 'outline'} 
                          className={item.status === 'Draft' ? 'bg-blue-900/20 text-blue-300' : ''}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <button className="text-xs bg-elec-gray-light/30 hover:bg-elec-gray-light/50 px-2 py-1 rounded mr-2">
                          Edit
                        </button>
                        <button className="text-xs bg-elec-gray-light/30 hover:bg-elec-gray-light/50 px-2 py-1 rounded">
                          View
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            
            <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
              <span>Showing 1-4 of 872 content items</span>
              <div className="flex gap-1">
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30 disabled:opacity-50 disabled:cursor-not-allowed" disabled>Previous</button>
                <button className="px-2 py-1 rounded bg-elec-yellow/20 text-elec-yellow">1</button>
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">2</button>
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">3</button>
                <button className="px-2 py-1 rounded hover:bg-elec-gray-light/30">Next</button>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <BarChart className="h-5 w-5 text-elec-yellow" />
                Analytics Dashboard
              </h3>
              <div className="flex gap-2">
                <select className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
                <button className="text-xs bg-elec-gray-light/50 px-3 py-1 rounded hover:bg-elec-gray-light/70">
                  Export
                </button>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">User Engagement</h4>
                <div className="h-48 flex items-center justify-center border border-dashed border-elec-yellow/20 rounded">
                  <p className="text-sm text-gray-400">Engagement chart would render here</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-400">Avg. Session</p>
                    <p className="font-semibold">12m 47s</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Completion Rate</p>
                    <p className="font-semibold">68%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Return Users</p>
                    <p className="font-semibold">79%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">Popular Content</h4>
                <div className="h-48 flex items-center justify-center border border-dashed border-elec-yellow/20 rounded">
                  <p className="text-sm text-gray-400">Content popularity chart would render here</p>
                </div>
                <div className="mt-4">
                  <div className="text-xs mb-1">
                    <span className="inline-block w-32 truncate">Electrical Installation Fundamentals</span>
                    <span className="float-right">426 views</span>
                    <div className="h-1.5 bg-elec-gray-light/30 rounded-full mt-1">
                      <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                  <div className="text-xs mb-1">
                    <span className="inline-block w-32 truncate">Circuit Design & Analysis</span>
                    <span className="float-right">298 views</span>
                    <div className="h-1.5 bg-elec-gray-light/30 rounded-full mt-1">
                      <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">User Growth</h4>
                <div className="h-48 flex items-center justify-center border border-dashed border-elec-yellow/20 rounded">
                  <p className="text-sm text-gray-400">User growth chart would render here</p>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-400">New This Week</p>
                    <p className="font-semibold">+124</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Growth Rate</p>
                    <p className="font-semibold">+8.2%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Conversion</p>
                    <p className="font-semibold">3.8%</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">User Distribution</h4>
                <div className="h-48 flex items-center justify-center border border-dashed border-elec-yellow/20 rounded">
                  <p className="text-sm text-gray-400">User distribution chart would render here</p>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-y-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-elec-yellow"></span>
                    <span>Apprentice: 45%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500"></span>
                    <span>Electrician: 32%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
                    <span>Employer: 18%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
                    <span>Other: 5%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="system" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <Settings className="h-5 w-5 text-elec-yellow" />
                System Settings
              </h3>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">System Status</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span>Database</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>API Services</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Storage</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span>Authentication</span>
                    <Badge className="bg-green-900/30 text-green-300 border-green-500/30">Operational</Badge>
                  </div>
                </div>
                <div className="mt-4 p-3 border border-green-500/20 rounded bg-green-900/10 text-xs text-green-400">
                  All systems operational. Last incident: 14 days ago
                </div>
              </div>
              
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">Resource Usage</h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Database Storage</span>
                      <span>6.8 GB / 10 GB</span>
                    </div>
                    <div className="h-1.5 bg-elec-gray-light/30 rounded-full">
                      <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>File Storage</span>
                      <span>24.2 GB / 50 GB</span>
                    </div>
                    <div className="h-1.5 bg-elec-gray-light/30 rounded-full">
                      <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>API Requests (Daily)</span>
                      <span>452K / 500K</span>
                    </div>
                    <div className="h-1.5 bg-elec-gray-light/30 rounded-full">
                      <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
                <button className="mt-4 w-full text-xs bg-elec-yellow text-black px-3 py-1.5 rounded hover:bg-elec-yellow/90">
                  Upgrade Resources
                </button>
              </div>
              
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">System Events</h4>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {mockSystemEvents.map(event => (
                    <div key={event.id} className="flex items-start gap-2 text-xs border-b border-elec-yellow/10 pb-2">
                      <span className={`h-2 w-2 mt-1 rounded-full flex-shrink-0 ${
                        event.severity === 'error' ? 'bg-red-500' : 
                        event.severity === 'warning' ? 'bg-amber-500' : 
                        event.severity === 'success' ? 'bg-green-500' : 
                        'bg-blue-500'
                      }`}></span>
                      <div>
                        <div>{event.event}</div>
                        <div className="text-gray-400 text-xs">{event.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className="mt-4 text-xs text-elec-yellow hover:text-elec-yellow/80">
                  View full system log
                </button>
              </div>
              
              <div className="bg-elec-gray-light/10 p-4 rounded-lg">
                <h4 className="text-sm font-medium mb-4">Maintenance</h4>
                <div className="space-y-3">
                  <div className="text-xs p-3 bg-elec-gray-light/20 rounded-md">
                    <div className="font-medium">Database Optimization</div>
                    <div className="text-gray-400 mt-1">Last run: 3 days ago</div>
                    <button className="mt-2 bg-elec-yellow text-black px-3 py-1 rounded text-xs hover:bg-elec-yellow/90">
                      Run Now
                    </button>
                  </div>
                  <div className="text-xs p-3 bg-elec-gray-light/20 rounded-md">
                    <div className="font-medium">Clear Cache</div>
                    <div className="text-gray-400 mt-1">Last cleared: 1 day ago</div>
                    <button className="mt-2 bg-elec-yellow text-black px-3 py-1 rounded text-xs hover:bg-elec-yellow/90">
                      Clear Now
                    </button>
                  </div>
                  <div className="text-xs p-3 bg-elec-gray-light/20 rounded-md">
                    <div className="font-medium">System Backup</div>
                    <div className="text-gray-400 mt-1">Next scheduled: 2025-05-10 03:00</div>
                    <button className="mt-2 bg-elec-yellow text-black px-3 py-1 rounded text-xs hover:bg-elec-yellow/90">
                      Backup Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
