
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ExternalLink, Download } from 'lucide-react';

const RecentUpdatesSection = () => {
  const recentUpdates = [
    {
      title: 'Amendment 2:2022 Changes',
      description: 'Key updates affecting surge protection and EV charging installations',
      date: '2022',
      type: 'critical',
      impact: 'High'
    },
    {
      title: 'RCD Requirements Clarification',
      description: 'Updated guidance on 30mA RCD protection requirements and exceptions',
      date: '2022',
      type: 'important',
      impact: 'Medium'
    },
    {
      title: 'Smart Meter Installation Rules',
      description: 'New requirements for smart meter installations and associated wiring',
      date: '2022',
      type: 'update',
      impact: 'Low'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-border">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
          <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
          Recent Updates & Changes
        </CardTitle>
        <CardDescription className="text-gray-300 text-sm sm:text-base">
          Stay current with the latest regulation changes affecting your work
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUpdates.map((update, index) => (
            <div key={index} className="flex items-center justify-between p-5 bg-muted rounded-lg hover:bg-neutral-600 transition-colors border border-border">
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-2 text-lg">{update.title}</h4>
                <p className="text-sm text-gray-400 mb-3">{update.description}</p>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-500">{update.date}</span>
                  <Badge className={`text-xs font-medium ${
                    update.type === 'critical' ? 'bg-red-500/20 text-red-400' :
                    update.type === 'important' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {update.type.toUpperCase()}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {update.impact} Impact
                  </Badge>
                </div>
              </div>
              <ExternalLink className="h-5 w-5 text-elec-yellow" />
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold h-12 text-base">
            <Download className="h-5 w-5 mr-2" />
            Download Amendment Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentUpdatesSection;
