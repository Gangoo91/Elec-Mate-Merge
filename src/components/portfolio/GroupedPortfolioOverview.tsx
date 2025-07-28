import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, Users, Zap, Shield } from 'lucide-react';
import { PortfolioGroup, PortfolioEntry } from '@/types/portfolio';

interface GroupedPortfolioOverviewProps {
  groups: PortfolioGroup[];
  onGroupSelect?: (groupId: string) => void;
  getEntriesByGroup: (groupId: string) => PortfolioEntry[];
}

const GroupedPortfolioOverview: React.FC<GroupedPortfolioOverviewProps> = ({
  groups,
  onGroupSelect,
  getEntriesByGroup
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getIcon = (iconName: string) => {
    const icons = {
      zap: Zap,
      shield: Shield,
      users: Users,
    };
    const IconComponent = icons[iconName as keyof typeof icons] || Users;
    return <IconComponent className="h-5 w-5" />;
  };

  const getCompetencyBadgeVariant = (level: string) => {
    switch (level) {
      case 'foundation':
        return 'secondary';
      case 'intermediate':
        return 'default';
      case 'advanced':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  if (groups.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-muted-foreground text-center">No portfolio groups found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center">
        {groups.map((group) => (
          <Card key={group.id} className="w-full max-w-sm hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex flex-col items-center gap-3">
                <Badge variant={getCompetencyBadgeVariant(group.competencyLevel)}>
                  {group.competencyLevel}
                </Badge>
                <div className="flex flex-col items-center gap-2 text-center">
                  <div className="text-elec-yellow">
                    {getIcon(group.icon)}
                  </div>
                  <CardTitle className="text-lg">{group.name}</CardTitle>
                </div>
              </div>
              <CardDescription className="text-sm text-center">
                {group.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{group.progressPercentage}%</span>
                </div>
                <Progress value={group.progressPercentage} className="h-2" />
              </div>

              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Completed: {group.totalCompleted}</span>
                <span>Required: {group.totalRequired}</span>
              </div>

              <Collapsible 
                open={expandedGroups.has(group.id)}
                onOpenChange={() => toggleGroup(group.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="w-full justify-between">
                    View Categories ({group.categories.length})
                    {expandedGroups.has(group.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 mt-2">
                  {group.categories.map((category) => {
                    const categoryEntries = getEntriesByGroup(group.id).filter(
                      entry => entry.category.id === category.id
                    );
                    const completed = categoryEntries.filter(e => e.status === 'completed').length;
                    const progress = category.requiredEntries > 0 
                      ? Math.round((completed / category.requiredEntries) * 100) 
                      : 0;

                    return (
                      <div 
                        key={category.id}
                        className="flex items-center justify-between p-2 bg-muted rounded text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-elec-yellow border-elec-yellow/50">
                            {category.name}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {completed}/{category.requiredEntries}
                          </span>
                          <div className="w-16">
                            <Progress value={progress} className="h-1" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CollapsibleContent>
              </Collapsible>

              {onGroupSelect && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => onGroupSelect(group.id)}
                >
                  View Group Details
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GroupedPortfolioOverview;