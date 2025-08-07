import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  MapPin, 
  Award,
  Clock,
  Users,
  Target,
  Zap,
  Building2
} from "lucide-react";

interface JobInsight {
  id: string;
  type: 'trend' | 'hotspot' | 'skill' | 'salary' | 'timing';
  title: string;
  description: string;
  value: string;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

interface JobInsightsProps {
  jobs: any[];
  location?: string;
}

const JobInsights: React.FC<JobInsightsProps> = ({ jobs, location }) => {
  const [insights, setInsights] = useState<JobInsight[]>([]);

  useEffect(() => {
    generateInsights();
  }, [jobs, location]);

  const generateInsights = () => {
    if (!jobs.length) return;

    const newInsights: JobInsight[] = [];

    // Salary Analysis
    const salaries = jobs
      .filter(job => job.salary)
      .map(job => {
        const salaryText = job.salary.replace(/[£$,]/g, '');
        const numbers = salaryText.match(/\d+/g);
        return numbers ? parseInt(numbers[0]) : 0;
      })
      .filter(salary => salary > 0);

    if (salaries.length > 0) {
      const avgSalary = Math.round(salaries.reduce((sum: number, s: number) => sum + s, 0) / salaries.length);
      newInsights.push({
        id: 'avg-salary',
        type: 'salary',
        title: 'Average Salary',
        description: `Based on ${salaries.length} job postings`,
        value: `£${avgSalary.toLocaleString()}`,
        icon: <TrendingUp className="h-4 w-4" />,
        color: 'text-green-400'
      });
    }

    // Top Companies
    const companyCounts = jobs.reduce((acc: Record<string, number>, job) => {
      acc[job.company] = (acc[job.company] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topCompany = Object.entries(companyCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0];

    if (topCompany) {
      newInsights.push({
        id: 'top-company',
        type: 'trend',
        title: 'Most Active Employer',
        description: `${topCompany[1]} open positions`,
        value: topCompany[0],
        icon: <Building2 className="h-4 w-4" />,
        color: 'text-elec-yellow'
      });
    }

    // Job Type Distribution
    const typeCounts = jobs.reduce((acc: Record<string, number>, job) => {
      acc[job.type] = (acc[job.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topType = Object.entries(typeCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0];

    if (topType) {
      const percentage = Math.round(((topType[1] as number) / jobs.length) * 100);
      newInsights.push({
        id: 'job-type',
        type: 'trend',
        title: 'Most Common Type',
        description: `${percentage}% of available jobs`,
        value: topType[0],
        icon: <Target className="h-4 w-4" />,
        color: 'text-blue-400'
      });
    }

    // Location Hotspots
    const locationCounts = jobs.reduce((acc: Record<string, number>, job) => {
      const location = job.location || 'Unknown';
      acc[location] = (acc[location] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topLocation = Object.entries(locationCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0];

    if (topLocation && topLocation[0] !== 'Unknown') {
      newInsights.push({
        id: 'hot-location',
        type: 'hotspot',
        title: 'Job Hotspot',
        description: `${topLocation[1]} opportunities`,
        value: topLocation[0],
        icon: <MapPin className="h-4 w-4" />,
        color: 'text-orange-400'
      });
    }

    // Recent Postings Analysis
    const now = new Date();
    const recentJobs = jobs.filter(job => {
      const postedDate = new Date(job.posted_date);
      const diffDays = (now.getTime() - postedDate.getTime()) / (1000 * 3600 * 24);
      return diffDays <= 7;
    });

    if (recentJobs.length > 0) {
      const percentage = Math.round((recentJobs.length / jobs.length) * 100);
      newInsights.push({
        id: 'recent-activity',
        type: 'timing',
        title: 'Market Activity',
        description: `${percentage}% posted this week`,
        value: `${recentJobs.length} new jobs`,
        icon: <Clock className="h-4 w-4" />,
        color: 'text-purple-400'
      });
    }

    // Skills Analysis (from job descriptions)
    const skillKeywords = [
      'testing', 'installation', 'maintenance', 'commissioning', 
      'solar', 'led', 'commercial', 'domestic', 'industrial',
      '18th edition', 'part p', 'pat testing', 'eicr'
    ];

    const skillCounts = skillKeywords.reduce((acc: Record<string, number>, skill) => {
      const count = jobs.filter(job => 
        job.description.toLowerCase().includes(skill) ||
        job.title.toLowerCase().includes(skill)
      ).length;
      if (count > 0) acc[skill] = count;
      return acc;
    }, {} as Record<string, number>);

    const topSkill = Object.entries(skillCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0];

    if (topSkill) {
      const percentage = Math.round((topSkill[1] / jobs.length) * 100);
      newInsights.push({
        id: 'in-demand-skill',
        type: 'skill',
        title: 'In-Demand Skill',
        description: `Required in ${percentage}% of jobs`,
        value: topSkill[0].charAt(0).toUpperCase() + topSkill[0].slice(1),
        icon: <Award className="h-4 w-4" />,
        color: 'text-pink-400'
      });
    }

    setInsights(newInsights);
  };

  const getCardBg = (type: string) => {
    switch (type) {
      case 'salary': return 'border-green-400/30 bg-green-400/5';
      case 'trend': return 'border-elec-yellow/30 bg-elec-yellow/5';
      case 'hotspot': return 'border-orange-400/30 bg-orange-400/5';
      case 'skill': return 'border-pink-400/30 bg-pink-400/5';
      case 'timing': return 'border-purple-400/30 bg-purple-400/5';
      default: return 'border-elec-yellow/30 bg-elec-yellow/5';
    }
  };

  if (!insights.length) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <BarChart3 className="h-5 w-5 text-elec-yellow" />
        <h3 className="text-lg font-semibold text-elec-light">Market Insights</h3>
        <Badge variant="outline" className="border-elec-yellow/30 text-elec-yellow">
          {jobs.length} jobs analyzed
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {insights.map((insight) => (
          <Card
            key={insight.id}
            className={`${getCardBg(insight.type)} transition-all hover:scale-105`}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg bg-current/10 ${insight.color}`}>
                  {insight.icon}
                </div>
                {insight.change && (
                  <div className={`flex items-center text-xs ${insight.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {insight.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                    {Math.abs(insight.change)}%
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <h4 className="font-medium text-sm text-muted-foreground">{insight.title}</h4>
                <p className="font-semibold text-elec-light">{insight.value}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Tips */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-elec-yellow" />
            <h4 className="font-medium text-elec-light">Quick Tips</h4>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Apply within 48 hours for better response rates</li>
            <li>• Tailor your CV to highlight relevant certifications</li>
            <li>• Consider expanding your search radius for more opportunities</li>
            <li>• Peak hiring seasons are typically March-May and September-November</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobInsights;