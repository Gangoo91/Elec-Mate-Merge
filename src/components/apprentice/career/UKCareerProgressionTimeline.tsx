
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, BookOpen, TrendingUp } from "lucide-react";
import { ukCareerLevels } from "./ukCareerProgressionData";

const UKCareerProgressionTimeline = () => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-elec-yellow" />
            UK Electrical Career Progression Timeline
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Typical progression path for UK electricians following the JIB grading scheme
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {ukCareerLevels.map((level, index) => (
              <div key={level.id} className="relative">
                {/* Timeline line */}
                {index < ukCareerLevels.length - 1 && (
                  <div className="absolute left-8 top-16 w-0.5 h-20 bg-elec-yellow/30" />
                )}
                
                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-elec-yellow/20 border-2 border-elec-yellow/50 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-elec-yellow" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-semibold text-white">{level.title}</h3>
                        <p className="text-sm text-elec-yellow">{level.jib_grade} • {level.typical_experience}</p>
                      </div>
                      <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30">
                        {level.progression_timeline}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Salary ranges */}
                      <Card className="border-elec-yellow/10 bg-elec-dark/50">
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-2 text-elec-yellow">Regional Salaries</h4>
                          <div className="space-y-1 text-xs">
                            <div className="flex justify-between">
                              <span>London:</span>
                              <span className="text-green-400">{level.salary_ranges.london}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>South East:</span>
                              <span className="text-green-400">{level.salary_ranges.south_east}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Midlands:</span>
                              <span className="text-green-400">{level.salary_ranges.midlands}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>North:</span>
                              <span className="text-green-400">{level.salary_ranges.north}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Key qualifications */}
                      <Card className="border-elec-yellow/10 bg-elec-dark/50">
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            Key Qualifications
                          </h4>
                          <div className="space-y-1">
                            {level.key_qualifications.slice(0, 3).map((qual, idx) => (
                              <div key={idx} className="text-xs">
                                <span className="text-blue-300">{qual.level}</span> - {qual.name}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Work sectors */}
                      <Card className="border-elec-yellow/10 bg-elec-dark/50">
                        <CardContent className="p-3">
                          <h4 className="text-sm font-medium mb-2 text-elec-yellow flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Work Sectors
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {level.work_sectors.slice(0, 4).map((sector, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs bg-elec-yellow/5 text-elec-yellow/80 border-elec-yellow/20">
                                {sector}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Next steps */}
                    <div className="bg-elec-dark/30 rounded p-3">
                      <h4 className="text-sm font-medium mb-2 text-elec-yellow">Next Steps:</h4>
                      <ul className="text-xs space-y-1">
                        {level.next_steps.slice(0, 3).map((step, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-elec-yellow" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKCareerProgressionTimeline;
