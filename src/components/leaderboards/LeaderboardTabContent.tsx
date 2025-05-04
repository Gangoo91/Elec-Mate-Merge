
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, Medal, Trophy } from "lucide-react";
import { UserActivity } from "@/hooks/leaderboards/useLeaderboardData";
import { format } from "date-fns";
import { getBadgeColor, getLevelBadgeColor } from "@/hooks/leaderboards/useLeaderboardsFilters";
import { getUserDisplayName, getUserInitials } from "./leaderboardUtils";
import { LeaderboardRankCard } from "./LeaderboardRankCard";

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
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className={isMobile ? "p-4 pb-2" : "pb-2"}>
        <CardTitle className={isMobile ? "text-xl" : ""}>
          {period === "weekly" ? "Weekly Leaderboard" : 
           period === "monthly" ? "Monthly Leaderboard" : "All-Time Leaderboard"}
        </CardTitle>
        <CardDescription>
          {period === "weekly" ? "Top performers for this week" : 
           period === "monthly" ? "Top performers for this month" : "Best performers of all time"}
        </CardDescription>
      </CardHeader>
      <CardContent className={isMobile ? "p-4 pt-2" : "pt-2"}>
        {filteredUsers.length === 0 ? (
          <div className="text-center p-8 text-muted-foreground">
            No leaderboard data available for the selected filters. Try a different combination.
          </div>
        ) : viewMode === 'card' ? (
          <div className="space-y-3 md:space-y-4">
            {filteredUsers.map((user, index) => (
              <LeaderboardRankCard 
                key={user.id}
                user={user}
                position={index + 1}
                maxPoints={maxPoints}
              />
            ))}
          </div>
        ) : (
          <TableView 
            filteredUsers={filteredUsers} 
            isMobile={isMobile} 
          />
        )}
      </CardContent>
      <CardFooter className={`text-xs md:text-sm text-muted-foreground border-t pt-4 ${isMobile ? 'p-4 pt-4' : ''}`}>
        Showing {filteredUsers.length} users from total {userRankings.length} users
      </CardFooter>
    </Card>
  );
};

interface TableViewProps {
  filteredUsers: UserActivity[];
  isMobile: boolean;
}

const TableView = ({ filteredUsers, isMobile }: TableViewProps) => {
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
                    <span className="text-xs md:text-sm">{getUserDisplayName(user)}</span>
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
                  {user.points.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
