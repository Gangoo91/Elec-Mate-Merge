import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export const WhatAreSchedulesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-elec-yellow" />
          Understanding Lighting Schedules
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-lg">
          <p className="text-lg leading-relaxed mb-4">
            Lighting schedules are automated triggers that activate scenes based on time, conditions, or events. They eliminate manual control whilst ensuring lighting matches daily routines and environmental needs.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-elec-yellow">Schedule Types & Reliability</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3">Schedule Type</th>
                  <th className="text-left p-3">Trigger Method</th>
                  <th className="text-left p-3">Reliability</th>
                  <th className="text-left p-3">Best Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="p-3"><strong className="text-blue-200">Time-Based</strong></td>
                  <td className="p-3">System clock/calendar</td>
                  <td className="p-3 text-green-400">Very High (99%)</td>
                  <td className="p-3">Daily routines, security lighting</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3"><strong className="text-purple-200">Sunrise/Sunset</strong></td>
                  <td className="p-3">Solar calculation algorithms</td>
                  <td className="p-3 text-green-400">Very High (99%)</td>
                  <td className="p-3">Seasonal adjustment, outdoor areas</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3"><strong className="text-green-200">Occupancy-Based</strong></td>
                  <td className="p-3">Motion/presence sensors</td>
                  <td className="p-3 text-yellow-400">High (85-95%)</td>
                  <td className="p-3">Energy saving, convenience</td>
                </tr>
                <tr>
                  <td className="p-3"><strong className="text-orange-200">Condition-Based</strong></td>
                  <td className="p-3">Weather/temperature sensors</td>
                  <td className="p-3 text-orange-400">Variable (60-80%)</td>
                  <td className="p-3">Responsive lighting, special events</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};