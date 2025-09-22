// Enhanced Safety Management Entry Point
// Main dashboard for the integrated RAMS and Method Statement system

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  ClipboardList, 
  Database, 
  Workflow, 
  BarChart3,
  Plus,
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';
import TaskManager from './TaskManager';
import HazardDatabase from './HazardDatabase';
import IntegratedWorkflow from './IntegratedWorkflow';
import { useEnhancedRAMS } from '@/hooks/useEnhancedRAMS';

const EnhancedSafetyDashboard: React.FC = () => {
  const { 
    tasks, 
    hazards, 
    customHazards, 
    ramsMethodLinks,
    loading 
  } = useEnhancedRAMS();

  // Calculate dashboard statistics
  const stats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'completed').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    totalHazards: hazards.length + customHazards.length,
    customHazards: customHazards.length,
    linkedDocuments: ramsMethodLinks.length,
    highRiskTasks: tasks.filter(t => t.risk_level === 'high').length
  };

  const StatCard: React.FC<{
    title: string;
    value: number;
    icon: React.ComponentType<any>;
    color: string;
    description?: string;
  }> = ({ title, value, icon: Icon, color, description }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-xs text-muted-foreground mt-1">{description}</p>
            )}
          </div>
          <Icon className={`w-8 h-8 ${color}`} />
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <Clock className="w-8 h-8 animate-spin mx-auto mb-2" />
          <p>Loading safety dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Enhanced Safety Management</h1>
        <p className="text-muted-foreground">
          Comprehensive risk assessment and method statement system with intelligent task management
        </p>
      </div>

      {/* Statistics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
          icon={ClipboardList}
          color="text-blue-600"
          description={`${stats.completedTasks} completed`}
        />
        
        <StatCard
          title="Active Tasks"
          value={stats.inProgressTasks}
          icon={Clock}
          color="text-orange-600"
          description={`${stats.pendingTasks} pending`}
        />
        
        <StatCard
          title="Hazards Database"
          value={stats.totalHazards}
          icon={Database}
          color="text-purple-600"
          description={`${stats.customHazards} custom`}
        />
        
        <StatCard
          title="High Risk Tasks"
          value={stats.highRiskTasks}
          icon={AlertTriangle}
          color="text-red-600"
          description="Require attention"
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Plus className="w-6 h-6" />
              <span>Create New Task</span>
            </Button>
            
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <FileText className="w-6 h-6" />
              <span>Start RAMS Assessment</span>
            </Button>
            
            <Button className="h-24 flex flex-col gap-2" variant="outline">
              <Workflow className="w-6 h-6" />
              <span>Integrated Workflow</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.slice(0, 5).map(task => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  {task.status === 'completed' ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : task.status === 'in-progress' ? (
                    <Clock className="w-5 h-5 text-blue-600" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-gray-600" />
                  )}
                  <div>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{task.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">
                    {new Date(task.created_at).toLocaleDateString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.risk_level === 'high' ? 'bg-red-100 text-red-800' :
                    task.risk_level === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {task.risk_level} risk
                  </span>
                </div>
              </div>
            ))}
            
            {tasks.length === 0 && (
              <div className="text-center py-8">
                <ClipboardList className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No tasks yet</h3>
                <p className="text-muted-foreground">
                  Create your first task to get started with the enhanced safety system
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="hazards">Hazard Database</TabsTrigger>
          <TabsTrigger value="workflow">Integrated Workflow</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks" className="mt-6">
          <TaskManager />
        </TabsContent>

        <TabsContent value="hazards" className="mt-6">
          <HazardDatabase />
        </TabsContent>

        <TabsContent value="workflow" className="mt-6">
          <IntegratedWorkflow />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Safety Analytics & Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and insights coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EnhancedSafetyDashboard;