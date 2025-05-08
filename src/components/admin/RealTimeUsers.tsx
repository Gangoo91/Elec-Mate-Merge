
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ChevronsUp, ChevronsDown, Clock, User } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { supabase } from "@/integrations/supabase/client";

interface UserSession {
  id: string;
  userId: string;
  username: string;
  currentPage: string;
  startTime: Date;
  lastActivity: Date;
  duration: number;
}

const RealTimeUsers = () => {
  const [activeSessions, setActiveSessions] = useState<UserSession[]>([]);
  const [previousCount, setPreviousCount] = useState(0);
  const [changePercentage, setChangePercentage] = useState(0);
  const [isIncreasing, setIsIncreasing] = useState(true);
  
  // In a real implementation, this would use actual WebSocket connections
  useEffect(() => {
    const generateMockSessions = () => {
      // In a real implementation, these would come from actual user sessions
      const mockPages = [
        "/dashboard", "/electrician-tools", "/apprentice-chat", 
        "/settings", "/subscriptions", "/electrical-chat"
      ];
      
      const mockUsernames = [
        "john_electrician", "master_sparky", "circuit_whisperer",
        "voltage_warrior", "safe_circuits", "wiring_wizard",
        "current_master", "power_pro"
      ];
      
      const now = new Date();
      const sessionCount = Math.floor(Math.random() * 8) + 5; // 5-12 active users
      
      const newSessions: UserSession[] = [];
      for (let i = 0; i < sessionCount; i++) {
        const randomStartTime = new Date(now.getTime() - (Math.random() * 3600000)); // Up to 1 hour ago
        const randomLastActivity = new Date(now.getTime() - (Math.random() * 300000)); // Up to 5 minutes ago
        
        newSessions.push({
          id: `session-${i}`,
          userId: `user-${i}`,
          username: mockUsernames[Math.floor(Math.random() * mockUsernames.length)],
          currentPage: mockPages[Math.floor(Math.random() * mockPages.length)],
          startTime: randomStartTime,
          lastActivity: randomLastActivity,
          duration: Math.floor((now.getTime() - randomStartTime.getTime()) / 1000) // in seconds
        });
      }
      
      // Calculate change percentage
      if (previousCount > 0) {
        const change = ((sessionCount - previousCount) / previousCount) * 100;
        setChangePercentage(Math.abs(Math.round(change)));
        setIsIncreasing(sessionCount >= previousCount);
      }
      
      setPreviousCount(sessionCount);
      setActiveSessions(newSessions);
    };
    
    // Initial generation
    generateMockSessions();
    
    // Update periodically
    const interval = setInterval(generateMockSessions, 30000); // Every 30 seconds
    
    return () => clearInterval(interval);
  }, [previousCount]);
  
  // Format time in mm:ss
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Format time ago
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-elec-yellow" />
              Real-Time Users
            </CardTitle>
            <CardDescription>Live user activity on the platform</CardDescription>
          </div>
          <div className="flex items-center gap-1 text-sm">
            {isIncreasing ? (
              <ChevronsUp className="h-4 w-4 text-emerald-500" />
            ) : (
              <ChevronsDown className="h-4 w-4 text-rose-500" />
            )}
            <span className={isIncreasing ? "text-emerald-500" : "text-rose-500"}>
              {changePercentage}%
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Active users: {activeSessions.length}</span>
            <span className="text-muted-foreground">Updated just now</span>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-elec-yellow/20">
                  <th className="py-2 text-left">User</th>
                  <th className="py-2 text-left">Current Page</th>
                  <th className="py-2 text-left">Session Duration</th>
                  <th className="py-2 text-left">Last Activity</th>
                </tr>
              </thead>
              <tbody>
                {activeSessions.map(session => (
                  <tr key={session.id} className="border-b border-elec-gray-light/10">
                    <td className="py-2 flex items-center gap-2">
                      <User className="h-4 w-4 text-elec-yellow/70" />
                      {session.username}
                    </td>
                    <td className="py-2">{session.currentPage}</td>
                    <td className="py-2">
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3 text-elec-yellow/70" />
                        {formatDuration(session.duration)}
                      </div>
                    </td>
                    <td className="py-2">{formatTimeAgo(session.lastActivity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="pt-4">
            <div className="flex items-center justify-between text-xs mb-1">
              <span>Platform Load</span>
              <span>{Math.floor((activeSessions.length / 20) * 100)}%</span>
            </div>
            <Progress value={(activeSessions.length / 20) * 100} className="h-1" />
            <p className="text-xs text-muted-foreground mt-1">
              Based on typical concurrent user capacity
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RealTimeUsers;
