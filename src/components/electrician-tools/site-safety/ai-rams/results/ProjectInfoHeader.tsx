import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, User, Clock } from 'lucide-react';
import type { MethodStatementData } from '@/types/method-statement';

interface ProjectInfoHeaderProps {
  methodData: Partial<MethodStatementData>;
  projectName?: string;
  location?: string;
}

export const ProjectInfoHeader: React.FC<ProjectInfoHeaderProps> = ({ 
  methodData, 
  projectName,
  location 
}) => {
  return (
    <Card className="bg-gradient-to-br from-elec-yellow/10 via-elec-gray to-elec-gray border-elec-yellow/40 mb-6 sticky top-0 z-10">
      <CardContent className="p-4 md:p-6">
        {/* Project Title */}
        <h2 className="text-xl md:text-2xl font-bold text-elec-light mb-4 flex items-center gap-2">
          <span className="w-1.5 h-8 bg-elec-yellow rounded-full"></span>
          {methodData.jobTitle || projectName || 'Untitled Project'}
        </h2>

        {/* Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Location */}
          {(methodData.location || location) && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-elec-yellow/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <div className="text-xs text-elec-light/60">Location</div>
                <div className="font-semibold text-elec-light">{methodData.location || location}</div>
              </div>
            </div>
          )}

          {/* Contractor */}
          {methodData.contractor && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <div className="text-xs text-elec-light/60">Contractor</div>
                <div className="font-semibold text-elec-light">{methodData.contractor}</div>
              </div>
            </div>
          )}

          {/* Supervisor */}
          {methodData.supervisor && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                <User className="h-4 w-4 text-green-400" />
              </div>
              <div>
                <div className="text-xs text-elec-light/60">Supervisor</div>
                <div className="font-semibold text-elec-light">{methodData.supervisor}</div>
              </div>
            </div>
          )}

          {/* Team Size */}
          {methodData.teamSize && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-elec-light/60">Team Size</div>
                <div className="font-semibold text-elec-light">{methodData.teamSize}</div>
              </div>
            </div>
          )}

          {/* Duration */}
          {(methodData.duration || methodData.totalEstimatedTime) && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center">
                <Clock className="h-4 w-4 text-amber-400" />
              </div>
              <div>
                <div className="text-xs text-elec-light/60">Duration</div>
                <div className="font-semibold text-elec-light">
                  {methodData.totalEstimatedTime || methodData.duration}
                </div>
              </div>
            </div>
          )}

          {/* Review Date */}
          {methodData.reviewDate && (
            <div className="flex items-center gap-2 text-sm">
              <div className="w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-4 w-4 text-red-400" />
              </div>
              <div>
                <div className="text-xs text-elec-light/60">Review Date</div>
                <div className="font-semibold text-elec-light">{methodData.reviewDate}</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
