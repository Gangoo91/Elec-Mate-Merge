
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { PortfolioCategory, PortfolioEntry } from "@/types/portfolio";
import { Wrench, Shield, Search, Users, GraduationCap } from "lucide-react";

interface PortfolioCategoriesOverviewProps {
  categories: PortfolioCategory[];
  entries: PortfolioEntry[];
}

const PortfolioCategoriesOverview = ({ categories, entries }: PortfolioCategoriesOverviewProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'wrench': return <Wrench className="h-5 w-5" />;
      case 'shield': return <Shield className="h-5 w-5" />;
      case 'search': return <Search className="h-5 w-5" />;
      case 'users': return <Users className="h-5 w-5" />;
      case 'graduation-cap': return <GraduationCap className="h-5 w-5" />;
      default: return <Wrench className="h-5 w-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' };
      case 'green': return { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' };
      case 'yellow': return { bg: 'bg-yellow-500/10', text: 'text-yellow-400', border: 'border-yellow-500/20' };
      case 'purple': return { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' };
      case 'orange': return { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/20' };
      default: return { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/20' };
    }
  };

  return (
    <div className="space-y-4">
      {/* Portfolio Categories Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {categories.map(category => {
          const categoryEntries = entries.filter(entry => entry.category.id === category.id);
          const completedEntries = categoryEntries.filter(entry => entry.status === 'completed').length;
          const progress = Math.min((completedEntries / category.requiredEntries) * 100, 100);
          const colorClasses = getColorClasses(category.color);

          return (
            <Card key={category.id} className={`bg-elec-gray border-elec-yellow/20 ${colorClasses.border}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={colorClasses.text}>
                      {getIcon(category.icon)}
                    </div>
                    <CardTitle className="text-base sm:text-lg truncate">{category.name}</CardTitle>
                  </div>
                  <Badge variant={progress >= 100 ? "success" : "outline"} className="flex-shrink-0 text-xs">
                    {completedEntries}/{category.requiredEntries}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3 pt-0">
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                  {category.description}
                </p>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span>Progress</span>
                    <span className="font-medium">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-1.5 sm:h-2" />
                </div>
                
                <div className="pt-2 border-t border-elec-yellow/10">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-sm sm:text-lg font-semibold">{categoryEntries.length}</p>
                      <p className="text-xs text-muted-foreground">Total</p>
                    </div>
                    <div>
                      <p className="text-sm sm:text-lg font-semibold">{completedEntries}</p>
                      <p className="text-xs text-muted-foreground">Complete</p>
                    </div>
                    <div>
                      <p className="text-sm sm:text-lg font-semibold">{categoryEntries.filter(e => e.status === 'in-progress').length}</p>
                      <p className="text-xs text-muted-foreground">Progress</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card className="bg-elec-gray border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {entries.length === 0 ? (
            <p className="text-muted-foreground text-center py-6 text-sm">
              No portfolio entries yet. Start by adding your first entry!
            </p>
          ) : (
            <div className="space-y-2">
              {entries
                .sort((a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
                .slice(0, 3)
                .map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg border border-elec-yellow/10">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={getColorClasses(entry.category.color).text}>
                        {getIcon(entry.category.icon)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">{entry.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {entry.category.name} • {new Date(entry.dateCreated).toLocaleDateString('en-GB')}
                        </p>
                      </div>
                    </div>
                    <Badge variant={entry.status === 'completed' ? 'success' : 'outline'} className="flex-shrink-0 text-xs">
                      {entry.status}
                    </Badge>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PortfolioCategoriesOverview;
