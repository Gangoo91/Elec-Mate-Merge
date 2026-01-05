import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingDown, Shield, AlertTriangle, Users } from 'lucide-react';

const SafetyStatistics = () => {
  const statistics = [
    {
      title: 'Workplace Incidents',
      value: '67%',
      description: 'Reduction through proper safety protocols',
      icon: TrendingDown,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10 border-green-400/20'
    },
    {
      title: 'Safety Compliance',
      value: '98%',
      description: 'Industry standard achievement rate',
      icon: Shield,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10 border-blue-400/20'
    },
    {
      title: 'Critical Incidents',
      value: '0.2%',
      description: 'When proper isolation is followed',
      icon: AlertTriangle,
      color: 'text-orange-400',
      bgColor: 'bg-orange-400/10 border-orange-400/20'
    },
    {
      title: 'Trained Personnel',
      value: '95%',
      description: 'Meet BS 7671 safety requirements',
      icon: Users,
      color: 'text-purple-400',
      bgColor: 'bg-purple-400/10 border-purple-400/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statistics.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className={`bg-card border-2 ${stat.bgColor} text-center`}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-center mb-2">
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <CardTitle className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
                {stat.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-foreground text-sm font-medium mb-1">
                {stat.title}
              </CardTitle>
              <CardDescription className="text-gray-400 text-xs">
                {stat.description}
              </CardDescription>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default SafetyStatistics;