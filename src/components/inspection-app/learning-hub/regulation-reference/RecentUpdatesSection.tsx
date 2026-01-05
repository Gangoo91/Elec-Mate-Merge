
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, ExternalLink, Download, Calendar, Zap, Car, Sun, Battery } from 'lucide-react';

const RecentUpdatesSection = () => {
  const recentUpdates = [
    {
      title: 'Amendment 3:2024 - Now In Force',
      description: 'Major updates to EV charging, energy storage systems, prosumer installations and arc fault detection requirements. Effective from October 2024.',
      date: 'October 2024',
      type: 'critical',
      impact: 'High',
      icon: Zap
    },
    {
      title: 'EV Charging Requirements Enhanced',
      description: 'New Regulation 722 requirements for electric vehicle charging installations including Mode 3 and Mode 4 chargers, PME earthing considerations.',
      date: 'Amendment 3:2024',
      type: 'critical',
      impact: 'High',
      icon: Car
    },
    {
      title: 'Prosumer & Solar PV Updates',
      description: 'Enhanced requirements for prosumer electrical installations including solar PV systems with battery storage under Regulation 712.',
      date: 'Amendment 3:2024',
      type: 'important',
      impact: 'High',
      icon: Sun
    },
    {
      title: 'Energy Storage Systems (ESS)',
      description: 'New comprehensive requirements for battery energy storage systems including lithium-ion installations in domestic and commercial premises.',
      date: 'Amendment 3:2024',
      type: 'important',
      impact: 'Medium',
      icon: Battery
    },
    {
      title: 'Arc Fault Detection Devices (AFDDs)',
      description: 'Clarified requirements for AFDD installation in specific locations including HMOs, student accommodation and buildings with sleeping risk.',
      date: 'Amendment 3:2024',
      type: 'update',
      impact: 'Medium',
      icon: Zap
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-neutral-800 to-neutral-900 border-elec-yellow/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-elec-yellow flex items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
            <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6" />
            BS 7671:2018 Amendment 3:2024 Updates
          </CardTitle>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
            <Calendar className="h-3 w-3 mr-1" />
            January 2026
          </Badge>
        </div>
        <CardDescription className="text-white text-sm sm:text-base">
          Latest regulatory changes affecting electrical installations - fully in force since October 2024
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentUpdates.map((update, index) => {
            const IconComponent = update.icon;
            return (
              <div key={index} className="flex items-start gap-4 p-4 sm:p-5 bg-muted/50 rounded-xl hover:bg-muted transition-colors border border-border/50">
                <div className={`p-2.5 rounded-lg flex-shrink-0 ${
                  update.type === 'critical' ? 'bg-red-500/20' :
                  update.type === 'important' ? 'bg-orange-500/20' :
                  'bg-blue-500/20'
                }`}>
                  <IconComponent className={`h-5 w-5 ${
                    update.type === 'critical' ? 'text-red-400' :
                    update.type === 'important' ? 'text-orange-400' :
                    'text-blue-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white mb-1.5 text-base sm:text-lg">{update.title}</h4>
                  <p className="text-sm text-white/80 mb-3 leading-relaxed">{update.description}</p>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="text-xs text-white/60 bg-white/5 px-2 py-1 rounded">{update.date}</span>
                    <Badge className={`text-xs font-medium ${
                      update.type === 'critical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                      update.type === 'important' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30'
                    }`}>
                      {update.type.toUpperCase()}
                    </Badge>
                    <Badge variant="secondary" className="text-xs bg-white/10 text-white border-white/20">
                      {update.impact} Impact
                    </Badge>
                  </div>
                </div>
                <ExternalLink className="h-5 w-5 text-elec-yellow flex-shrink-0 hidden sm:block" />
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 rounded-lg bg-elec-yellow/10 border border-elec-yellow/20">
          <p className="text-sm text-white">
            <strong className="text-elec-yellow">Important:</strong> All installations commenced after 1st October 2024 must comply with
            BS 7671:2018 Amendment 3:2024. Ensure your testing and certification procedures reflect the latest requirements.
          </p>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <Button className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90 font-semibold h-12 text-base">
            <Download className="h-5 w-5 mr-2" />
            Download Amendment 3:2024 Summary
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentUpdatesSection;
