
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const QuizProgressOverview = () => {
  const progressStats = [
    { title: '3/6', description: 'Assessments Completed' },
    { title: '85%', description: 'Average Score' },
    { title: '2', description: 'Certificates Earned' },
    { title: '58', description: 'Study Hours' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-8 sm:mb-12">
      {progressStats.map((stat, index) => (
        <Card key={index} className="bg-card border-border text-center">
          <CardHeader className="p-3 sm:p-6">
            <CardTitle className="text-lg sm:text-xl lg:text-2xl text-elec-yellow">{stat.title}</CardTitle>
            <CardDescription className="text-xs sm:text-sm">{stat.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default QuizProgressOverview;
