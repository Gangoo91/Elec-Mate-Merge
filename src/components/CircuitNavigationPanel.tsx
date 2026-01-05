import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  CheckCircle2, 
  AlertCircle, 
  Circle, 
  Plus, 
  Search,
  Filter
} from 'lucide-react';
import { TestResult } from '@/types/testResult';
import { Input } from '@/components/ui/input';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';

interface CircuitNavigationPanelProps {
  testResults: TestResult[];
  selectedCircuitId?: string;
  onSelectCircuit: (id: string) => void;
  onAddCircuit: () => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const CircuitNavigationPanel: React.FC<CircuitNavigationPanelProps> = ({
  testResults,
  selectedCircuitId,
  onSelectCircuit,
  onAddCircuit,
  searchTerm,
  onSearchChange
}) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  // Calculate completion status for each circuit
  const getCircuitCompletionStatus = (result: TestResult) => {
    const requiredFields = [
      'circuitDescription', 'liveSize', 'cpcSize', 'protectiveDeviceType',
      'protectiveDeviceRating', 'r1r2', 'insulationLiveNeutral', 'zs'
    ];
    
    const filledFields = requiredFields.filter(field => 
      result[field as keyof TestResult] && 
      String(result[field as keyof TestResult]).trim() !== ''
    );
    
    const completionPercentage = (filledFields.length / requiredFields.length) * 100;
    
    if (completionPercentage === 100) return { status: 'complete', icon: CheckCircle2, color: 'text-green-600' };
    if (completionPercentage >= 50) return { status: 'partial', icon: AlertCircle, color: 'text-yellow-600' };
    return { status: 'incomplete', icon: Circle, color: 'text-muted-foreground' };
  };

  // Filter circuits based on search term
  const filteredResults = testResults.filter(result => 
    result.circuitDesignation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.circuitDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    result.circuitNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get completion stats
  const completionStats = testResults.reduce((acc, result) => {
    const status = getCircuitCompletionStatus(result).status;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Sidebar className={collapsed ? "w-14" : "w-80"} collapsible="icon">
      <SidebarTrigger className="m-2 self-end" />
      
      <SidebarContent className="bg-background border-r border-border">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary font-semibold">
            {!collapsed && "Circuit Navigation"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            {!collapsed && (
              <div className="space-y-3 p-2">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search circuits..."
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-8 h-8 text-sm"
                  />
                </div>

                {/* Stats */}
                <div className="flex gap-1 text-xs">
                  <Badge variant="outline" className="gap-1">
                    <CheckCircle2 className="h-3 w-3 text-green-600" />
                    {completionStats.complete || 0}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <AlertCircle className="h-3 w-3 text-yellow-600" />
                    {completionStats.partial || 0}
                  </Badge>
                  <Badge variant="outline" className="gap-1">
                    <Circle className="h-3 w-3 text-muted-foreground" />
                    {completionStats.incomplete || 0}
                  </Badge>
                </div>

                {/* Add Circuit Button */}
                <Button 
                  onClick={onAddCircuit}
                  size="sm" 
                  className="w-full gap-2 h-8"
                >
                  <Plus className="h-4 w-4" />
                  Add Circuit
                </Button>
              </div>
            )}

            {/* Circuit List */}
            <ScrollArea className="flex-1">
              <SidebarMenu>
                {filteredResults.map((result) => {
                  const completion = getCircuitCompletionStatus(result);
                  const StatusIcon = completion.icon;
                  const isSelected = selectedCircuitId === result.id;
                  
                  return (
                    <SidebarMenuItem key={result.id}>
                      <SidebarMenuButton 
                        asChild 
                        className={`${isSelected ? 'bg-primary/10 text-primary border-l-2 border-primary' : ''}`}
                      >
                        <button
                          onClick={() => onSelectCircuit(result.id)}
                          className="w-full justify-start gap-2 p-3 text-left hover:bg-muted/50 transition-colors"
                        >
                          <StatusIcon className={`h-4 w-4 flex-shrink-0 ${completion.color}`} />
                          
                          {!collapsed && (
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm">
                                {result.circuitDesignation}
                              </div>
                              <div className="text-xs text-muted-foreground truncate">
                                {result.circuitDescription || 'No description'}
                              </div>
                              {result.autoFilled && (
                                <Badge variant="secondary" className="text-xs mt-1">
                                  Auto-filled
                                </Badge>
                              )}
                            </div>
                          )}
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </ScrollArea>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CircuitNavigationPanel;