import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line,
  Tooltip,
  Legend
} from 'recharts';
import { 
  TrendingUp, 
  Award, 
  Target, 
  Clock, 
  Users, 
  BookOpen,
  Star,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { useEnhancedCPD } from '@/hooks/cpd/useEnhancedCPD';

const AnalyticsDashboard = () => {
  const { getAnalytics } = useEnhancedCPD();
  const [selectedPeriod, setSelectedPeriod] = useState('current-year');
  
  const analytics = getAnalytics();

  if (!analytics) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-20 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const {
    monthlyProgress,
    categoryBreakdown,
    providerBreakdown,
    learningEffectiveness,
    competencyGaps
  } = analytics;

  // Chart colors
  const COLORS = [
    'hsl(var(--primary))',
    'hsl(var(--secondary))',
    '#8884d8',
    '#82ca9d',
    '#ffc658',
    '#ff7300',
    '#00ff00',
    '#ff00ff'
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded">
                <Clock className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Hours</p>
                <p className="text-xl font-bold text-foreground">
                  {monthlyProgress.reduce((sum, month) => sum + month.hours, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded">
                <Target className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Activities</p>
                <p className="text-xl font-bold text-foreground">
                  {monthlyProgress.reduce((sum, month) => sum + month.activities, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded">
                <Award className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Effectiveness</p>
                <p className="text-xl font-bold text-foreground">
                  {learningEffectiveness.overallEffectiveness}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded">
                <TrendingUp className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Competency</p>
                <p className="text-xl font-bold text-foreground">
                  {competencyGaps.completionPercentage}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="progress" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="effectiveness">Effectiveness</TabsTrigger>
          <TabsTrigger value="gaps">Skills Gaps</TabsTrigger>
        </TabsList>

        {/* Progress Analytics */}
        <TabsContent value="progress" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Monthly Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Activity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={monthlyProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="activities" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Top Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {providerBreakdown.slice(0, 5).map((provider, index) => (
                    <div key={provider.provider} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground truncate">
                          {provider.provider}
                        </span>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {provider.hours}h
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {provider.activities} activities
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={(provider.hours / providerBreakdown[0]?.hours) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Category Analytics */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Category Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryBreakdown}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="hours"
                      label={({ category, hours }) => `${category}: ${hours}h`}
                    >
                      {categoryBreakdown.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryBreakdown.map((category, index) => (
                    <div key={category.category} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                          />
                          <span className="text-sm font-medium text-foreground">
                            {category.category}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {category.hours}h
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {category.activities} activities
                          </Badge>
                        </div>
                      </div>
                      <Progress 
                        value={(category.hours / Math.max(...categoryBreakdown.map(c => c.hours))) * 100} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Learning Effectiveness */}
        <TabsContent value="effectiveness" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground">Evidence Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {learningEffectiveness.evidenceRate}%
                    </span>
                    <div className="flex items-center">
                      {learningEffectiveness.evidenceRate >= 80 ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : learningEffectiveness.evidenceRate >= 60 ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                  <Progress value={learningEffectiveness.evidenceRate} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Activities with supporting evidence
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground">Reflection Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {learningEffectiveness.reflectionRate}%
                    </span>
                    <div className="flex items-center">
                      {learningEffectiveness.reflectionRate >= 80 ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : learningEffectiveness.reflectionRate >= 60 ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                  <Progress value={learningEffectiveness.reflectionRate} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Activities with reflection notes
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-foreground">Verification Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      {learningEffectiveness.verificationRate}%
                    </span>
                    <div className="flex items-center">
                      {learningEffectiveness.verificationRate >= 80 ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                      ) : learningEffectiveness.verificationRate >= 60 ? (
                        <AlertTriangle className="h-5 w-5 text-yellow-400" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-red-400" />
                      )}
                    </div>
                  </div>
                  <Progress value={learningEffectiveness.verificationRate} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Verified activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">Learning Quality Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {learningEffectiveness.evidenceRate < 70 && (
                  <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-400">Improve Evidence Collection</p>
                      <p className="text-sm text-muted-foreground">
                        Consider uploading certificates, photos, or documents for more of your CPD activities.
                      </p>
                    </div>
                  </div>
                )}
                
                {learningEffectiveness.reflectionRate < 60 && (
                  <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-400">Add More Reflection</p>
                      <p className="text-sm text-muted-foreground">
                        Write reflection notes to capture what you learned and how you'll apply it.
                      </p>
                    </div>
                  </div>
                )}

                {learningEffectiveness.overallEffectiveness >= 80 && (
                  <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Star className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-400">Excellent Learning Quality!</p>
                      <p className="text-sm text-muted-foreground">
                        Your CPD activities are well-documented and reflective. Keep up the great work!
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Gaps */}
        <TabsContent value="gaps" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Competency Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-2">
                    {competencyGaps.completionPercentage}%
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Overall Competency Progress
                  </p>
                  <Progress value={competencyGaps.completionPercentage} className="h-3 mt-3" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-xl font-bold text-green-400">
                      {competencyGaps.acquiredCompetencies}
                    </div>
                    <p className="text-xs text-muted-foreground">Acquired</p>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-yellow-400">
                      {competencyGaps.identifiedGaps.length}
                    </div>
                    <p className="text-xs text-muted-foreground">Gaps</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Identified Skill Gaps</CardTitle>
              </CardHeader>
              <CardContent>
                {competencyGaps.identifiedGaps.length > 0 ? (
                  <div className="space-y-2">
                    {competencyGaps.identifiedGaps.map((gap, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 bg-muted/20 rounded">
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm text-foreground">{gap}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">
                      No skill gaps identified! You're making excellent progress.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {competencyGaps.identifiedGaps.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recommended Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {competencyGaps.identifiedGaps.slice(0, 3).map((gap, index) => (
                    <div key={index} className="p-3 bg-muted/20 rounded-lg">
                      <h4 className="font-medium text-foreground mb-2">{gap}</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Consider looking for training opportunities in this area to strengthen your competency profile.
                      </p>
                      <Badge variant="outline" className="text-xs">
                        High Priority
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;