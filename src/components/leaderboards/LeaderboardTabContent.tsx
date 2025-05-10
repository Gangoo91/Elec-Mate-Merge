
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Medal, Trophy, ChevronRight, TrendingUp, TrendingDown } from "lucide-react";
import { UserActivity } from "@/hooks/leaderboards/types";
import { getBadgeColor, getLevelBadgeColor } from "@/hooks/leaderboards/filters";
import { getUserDisplayName, getUserInitials, formatPoints, getTrendIndicator } from "./leaderboardUtils";
import { LeaderboardRankCard } from "./LeaderboardRankCard";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LeaderboardTabContentProps {
  period: string;
  filteredUsers: UserActivity[];
  viewMode: 'card' | 'table';
  maxPoints: number;
  userRankings: UserActivity[];
  isMobile: boolean;
}

export const LeaderboardTabContent = ({
  period,
  filteredUsers,
  viewMode,
  maxPoints,
  userRankings,
  isMobile
}: LeaderboardTabContentProps) => {
  const [displayCount, setDisplayCount] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>('points');
  
  // Apply sorting if different from default
  let displayUsers = [...filteredUsers];
  if (sortBy === 'streak') {
    displayUsers.sort((a, b) => b.streak - a.streak);
  } else if (sortBy === 'recent') {
    displayUsers.sort((a, b) => {
      const dateA = a.last_active_date ? new Date(a.last_active_date) : new Date(0);
      const dateB = b.last_active_date ? new Date(b.last_active_date) : new Date(0);
      return dateB.getTime() - dateA.getTime();
    });
  }
  // Default sort by points is already applied
  
  // Pagination
  const visibleUsers = displayUsers.slice(0, displayCount);
  const hasMoreToShow = displayCount < displayUsers.length;

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className={isMobile ? "p-4 pb-2" : "pb-2"}>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className={isMobile ? "text-xl" : ""}>
              {period === "weekly" ? "Weekly Leaderboard" : 
               period === "monthly" ? "Monthly Leaderboard" : "All-Time Leaderboard"}
            </CardTitle>
            <CardDescription>
              {period === "weekly" ? "Top performers for this week" : 
               period === "monthly" ? "Top performers for this month" : "Best performers of all time"}
            </CardDescription>
          </div>
          
          {/* Sort options */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-muted-foreground hidden md:inline">Sort by:</span>
            <Select
              value={sortBy}
              onValueChange={setSortBy}
            >
              <SelectTrigger className="h-8 w-[110px] text-xs border-elec-yellow/20 bg-elec-dark/30">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/20">
                <SelectItem value="points">Points</SelectItem>
                <SelectItem value="streak">Streak</SelectItem>
                <SelectItem value="recent">Recently Active</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-2" : "pt-2"}>
        {filteredUsers.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No leaderboard data available for the selected filters. Try a different combination.
          </div>
        ) : viewMode === 'card' ? (
          <div className="space-y-3 md:space-y-4">
            {visibleUsers.map((user, index) => (
              <LeaderboardRankCard 
                key={user.id}
                user={user}
                position={index + 1}
                maxPoints={maxPoints}
              />
            ))}
            
            {/* Show more button */}
            {hasMoreToShow && (
              <div className="flex justify-center mt-4">
                <Button 
                  variant="outline" 
                  className="border-elec-yellow/20 text-sm"
                  onClick={() => setDisplayCount(prev => prev + 10)}
                >
                  Show More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            )}
          </div>
        ) : (
          <TableView 
            filteredUsers={visibleUsers} 
            isMobile={isMobile} 
            hasMoreToShow={hasMoreToShow}
            onShowMore={() => setDisplayCount(prev => prev + 10)}
          />
        )}
      </CardContent>
      <CardFooter className={`text-xs md:text-sm text-muted-foreground border-t pt-4 ${isMobile ? 'p-4 pt-4' : ''}`}>
        <div className="w-full flex justify-between items-center">
          <span>Showing {visibleUsers.length} users from total {userRankings.length} users</span>
          {hasMoreToShow && viewMode === 'table' && (
            <Button 
              variant="ghost" 
              size="sm"
              className="text-xs text-elec-yellow" 
              onClick={() => setDisplayCount(prev => prev + 10)}
            >
              Show More
              <ChevronRight className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

interface TableViewProps {
  filteredUsers: UserActivity[];
  isMobile: boolean;
  hasMoreToShow: boolean;
  onShowMore: () => void;
}

const TableView = ({ filteredUsers, isMobile, hasMoreToShow, onShowMore }: TableViewProps) => {
  return (
    <div className="rounded-md border overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12 text-center">Rank</TableHead>
              <TableHead>User</TableHead>
              {!isMobile && (
                <>
                  <TableHead>Level</TableHead>
                  <TableHead>Badge</TableHead>
                  <TableHead>Streak</TableHead>
                </>
              )}
              <TableHead className="text-right">Points</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user, index) => (
              <TableRow key={user.id} className={index < 3 ? "bg-elec-dark/30" : ""}>
                <TableCell className="font-medium w-12 text-center p-2 md:p-4">
                  <div className="flex items-center justify-center">
                    {index === 0 ? (
                      <Trophy className="h-5 w-5 text-yellow-500" />
                    ) : index === 1 ? (
                      <Medal className="h-5 w-5 text-gray-300" />
                    ) : index === 2 ? (
                      <Medal className="h-5 w-5 text-amber-700" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="p-2 md:p-4">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 md:h-8 md:w-8">
                      {user.profiles?.avatar_url ? (
                        <AvatarImage src={user.profiles.avatar_url} alt={getUserDisplayName(user)} />
                      ) : (
                        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow">
                          {getUserInitials(user)}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs md:text-sm">{getUserDisplayName(user)}</span>
                        {/* Trend indicator */}
                        {user.previous_position && (
                          <TrendIndicator user={user} />
                        )}
                      </div>
                      {isMobile && (
                        <div className="flex items-center gap-1 mt-1">
                          <Badge variant="outline" className={`text-[10px] px-1 py-0 ${getLevelBadgeColor(user.level)}`}>
                            {user.level}
                          </Badge>
                          <Clock className="h-3 w-3 ml-2 mr-1 text-muted-foreground" />
                          <span className="text-[10px] text-muted-foreground">{user.streak}d</span>
                        </div>
                      )}
                    </div>
                  </div>
                </TableCell>
                {!isMobile && (
                  <>
                    <TableCell>
                      <Badge variant="outline" className={`${getLevelBadgeColor(user.level)}`}>
                        {user.level}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={`${getBadgeColor(user.badge)}`}>
                        {user.badge}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                        {user.streak} days
                      </div>
                    </TableCell>
                  </>
                )}
                <TableCell className="text-right font-medium text-xs md:text-sm p-2 md:p-4">
                  {formatPoints(user.points)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {/* Show more button for table view */}
      {hasMoreToShow && (
        <div className="flex justify-center py-3 border-t">
          <Button 
            variant="ghost"
            size="sm"
            className="text-xs text-elec-yellow"
            onClick={onShowMore}
          >
            Show More Results
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
};

const TrendIndicator = ({ user }: { user: UserActivity }) => {
  const { trend, percentage } = getTrendIndicator(user);
  
  if (trend === 'stable') return null;
  
  return (
    <div className={`flex items-center ml-1 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`} title={`${trend === 'up' ? 'Improved' : 'Dropped'} ranking by ${percentage}%`}>
      {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
      <span className="text-xs ml-0.5">{percentage}%</span>
    </div>
  );
};

