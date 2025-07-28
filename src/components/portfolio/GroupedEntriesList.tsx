import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { PortfolioEntry, PortfolioGroup } from '@/types/portfolio';
import { ChevronDown, ChevronRight, Calendar, Clock, Star } from 'lucide-react';
import { format } from 'date-fns';

interface GroupedEntriesListProps {
  groups: PortfolioGroup[];
  getEntriesByGroup: (groupId: string) => PortfolioEntry[];
  onViewEntry: (entry: PortfolioEntry) => void;
  onEditEntry: (entry: PortfolioEntry) => void;
  onDeleteEntry: (entryId: string) => void;
}

const GroupedEntriesList: React.FC<GroupedEntriesListProps> = ({
  groups,
  getEntriesByGroup,
  onViewEntry,
  onEditEntry,
  onDeleteEntry
}) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [groupBy, setGroupBy] = useState<'theme' | 'status' | 'competency'>('theme');

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50 border-green-200';
      case 'in-progress': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'reviewed': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'dd MMM yyyy');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getGroupedEntries = () => {
    switch (groupBy) {
      case 'status':
        const statuses = ['completed', 'in-progress', 'reviewed', 'draft'];
        return statuses.map(status => ({
          id: status,
          name: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
          entries: groups.flatMap(group => getEntriesByGroup(group.id)).filter(entry => entry.status === status),
          color: status === 'completed' ? 'green' : status === 'in-progress' ? 'blue' : status === 'reviewed' ? 'purple' : 'gray'
        }));
      
      case 'competency':
        const levels = ['foundation', 'intermediate', 'advanced'];
        return levels.map(level => ({
          id: level,
          name: level.charAt(0).toUpperCase() + level.slice(1),
          entries: groups.flatMap(group => 
            getEntriesByGroup(group.id).filter(entry => entry.category.competencyLevel === level)
          ),
          color: level === 'foundation' ? 'green' : level === 'intermediate' ? 'blue' : 'purple'
        }));

      default:
        return groups.map(group => ({
          id: group.id,
          name: group.name,
          entries: getEntriesByGroup(group.id),
          color: group.color
        }));
    }
  };

  const groupedData = getGroupedEntries();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Portfolio Entries</h2>
        <Tabs value={groupBy} onValueChange={(value) => setGroupBy(value as any)}>
          <TabsList>
            <TabsTrigger value="theme">By Theme</TabsTrigger>
            <TabsTrigger value="status">By Status</TabsTrigger>
            <TabsTrigger value="competency">By Level</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        {groupedData.map((group) => (
          <Card key={group.id}>
            <Collapsible 
              open={expandedGroups.has(group.id)}
              onOpenChange={() => toggleGroup(group.id)}
            >
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <Badge variant="secondary">
                        {group.entries.length} entries
                      </Badge>
                    </div>
                    {expandedGroups.has(group.id) ? (
                      <ChevronDown className="h-5 w-5" />
                    ) : (
                      <ChevronRight className="h-5 w-5" />
                    )}
                  </div>
                </CardHeader>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <CardContent className="pt-0">
                  {group.entries.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">
                      No entries in this group yet.
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {group.entries.map((entry) => (
                        <Card key={entry.id} className="border-l-4 border-l-primary">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 space-y-2">
                                <div className="flex items-center gap-2">
                                  <h4 className="font-semibold text-foreground">{entry.title}</h4>
                                  <Badge 
                                    variant="outline" 
                                    className={getStatusColor(entry.status)}
                                  >
                                    {entry.status.replace('-', ' ')}
                                  </Badge>
                                </div>

                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {entry.description}
                                </p>

                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {formatDate(entry.dateCreated)}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {entry.timeSpent} mins
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {renderStars(entry.selfAssessment)}
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {entry.category.name}
                                  </Badge>
                                  {entry.skills.slice(0, 2).map((skill) => (
                                    <Badge key={skill} variant="secondary" className="text-xs">
                                      {skill}
                                    </Badge>
                                  ))}
                                  {entry.skills.length > 2 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{entry.skills.length - 2} more
                                    </Badge>
                                  )}
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onViewEntry(entry)}
                                >
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onEditEntry(entry)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => onDeleteEntry(entry.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>

      {groupedData.every(group => group.entries.length === 0) && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No portfolio entries found.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Create your first entry to start building your portfolio.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupedEntriesList;