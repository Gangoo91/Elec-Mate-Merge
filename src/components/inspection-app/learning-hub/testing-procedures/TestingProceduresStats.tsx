
import React from 'react';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { testingProceduresData } from './TestingProcedureData';

const TestingProceduresStats = () => {
  const totalSteps = testingProceduresData.reduce((acc, p) => acc + p.steps.length, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="bg-card border-border text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-elec-yellow">{testingProceduresData.length}</CardTitle>
          <CardDescription>Interactive Procedures</CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-card border-border text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-elec-yellow">{totalSteps}+</CardTitle>
          <CardDescription>Detailed Steps</CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-card border-border text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-elec-yellow">BS 7671</CardTitle>
          <CardDescription>Regulation Aligned</CardDescription>
        </CardHeader>
      </Card>
      <Card className="bg-card border-border text-center">
        <CardHeader>
          <CardTitle className="text-2xl text-elec-yellow">Real-time</CardTitle>
          <CardDescription>Progress Tracking</CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
};

export default TestingProceduresStats;
