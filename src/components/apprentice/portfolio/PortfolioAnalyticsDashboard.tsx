
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PortfolioAnalytics, PortfolioCategory } from "@/types/portfolio";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Star, 
  Target,
  CheckCircle
} from "lucide-react";

interface PortfolioAnalyticsDashboardProps {
  analytics: PortfolioAnalytics | null;
  categories: PortfolioCategory[];
}

const PortfolioAnalyticsDashboard = ({ analytics, categories }: PortfolioAnalyticsDashboardProps) => {
  if (!analytics) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-10">
          <div className="text-center">
            <BarChart3 className="h-12 w-12 text-elec-yellow/40 mx-auto mb-4" />
            <h3 className="text-xl font-medium mb-2">No Analytics Available</h3>
            <p className="text-muted-foreground">
              Add some portfolio entries to see your analytics and progress insights.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completionRate = analytics.totalEntries > 0 
    ? (analytics.completedEntries / analytics.totalEntries) * 100 
    : 0;

  const totalHours = Math.floor(analytics.totalTimeSpent / 60);
  const totalMinutes = analytics.totalTimeSpent % 60;

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/20 bg-blue-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold">{completionRate.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Completion Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold">{analytics.completedEntries}</p>
                <p className="text-xs text-muted-foreground">Completed Entries</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-2xl font-bold">{totalHours}h {totalMinutes}m</p>
                <p className="text-xs text-muted-foreground">Time Invested</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-yellow-500/5">
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <div>
                <p className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</p>
                <p className="text-xs text-muted-foreground">Average Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Category Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {categories.map(category => {
              const progress = analytics.categoriesProgress[category.id] || 0;
              
              return (
                <div key={category.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{category.name}</h4>
                      <Badge variant={progress >= 100 ? "success" : "outline"}>
                        {Math.round(progress)}%
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {Math.round((progress / 100) * category.requiredEntries)}/{category.requiredEntries} required
                    </div>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Skills Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Skills Demonstrated</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.skillsDemo.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No skills recorded yet. Add portfolio entries to track your skill development.
            </p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {analytics.skillsDemo.slice(0, 15).map(skill => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
                {analytics.skillsDemo.length > 15 && (
                  <Badge variant="outline">
                    +{analytics.skillsDemo.length - 15} more
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                You've demonstrated {analytics.skillsDemo.length} unique skills across your portfolio entries.
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {analytics.recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              No recent activity to display.
            </p>
          ) : (
            <div className="space-y-3">
              {analytics.recentActivity.map(activity => (
                <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{activity.entryTitle}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.type === 'created' ? 'Created' : 
                       activity.type === 'updated' ? 'Updated' : 
                       activity.type === 'completed' ? 'Completed' : 'Reviewed'}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-elec-yellow/20 bg-elec-yellow/5">
        <CardHeader>
          <CardTitle className="text-elec-yellow">Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {completionRate < 50 && (
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Increase Your Completion Rate</p>
                <p className="text-sm text-muted-foreground">
                  Consider marking some of your in-progress entries as completed once they're finished.
                </p>
              </div>
            )}
            
            {analytics.averageRating < 3.5 && (
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Improve Self-Assessment Ratings</p>
                <p className="text-sm text-muted-foreground">
                  Your average self-assessment rating is below 3.5. Consider reflecting more on your achievements.
                </p>
              </div>
            )}
            
            {Object.values(analytics.categoriesProgress).some(progress => progress < 30) && (
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Focus on Underdeveloped Categories</p>
                <p className="text-sm text-muted-foreground">
                  Some categories need more attention. Try to add entries to balance your portfolio.
                </p>
              </div>
            )}
            
            {analytics.skillsDemo.length < 10 && (
              <div className="p-3 border rounded-lg">
                <p className="font-medium">Expand Skill Documentation</p>
                <p className="text-sm text-muted-foreground">
                  Document more skills in your portfolio entries to show your diverse capabilities.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioAnalyticsDashboard;
