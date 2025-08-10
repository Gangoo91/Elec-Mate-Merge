
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Clock, Trophy, BookOpen, TrendingUp, PoundSterling, MapPin, Users } from "lucide-react";
import { ukCareerLevels } from "./ukCareerProgressionData";

const UKCareerProgressionTimeline = () => {
  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
            UK Electrical Career Progression Timeline
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground">
            Comprehensive progression path for UK electricians following the JIB grading scheme with regional salary data
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {ukCareerLevels.map((level, index) => (
              <div key={level.id} className="relative">
                {/* Timeline line - hidden on mobile for cleaner look */}
                {index < ukCareerLevels.length - 1 && (
                  <div className="absolute left-6 sm:left-8 top-20 sm:top-24 w-0.5 h-16 sm:h-20 bg-elec-yellow/30 hidden sm:block" />
                )}
                
                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-elec-yellow/20 border-2 border-elec-yellow/50 flex items-center justify-center mx-auto sm:mx-0">
                    <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-elec-yellow" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-4">
                    <div className="text-center sm:text-left">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div>
                          <h3 className="text-lg sm:text-xl font-semibold text-white">{level.title}</h3>
                          <p className="text-sm text-elec-yellow">{level.jib_grade} • {level.typical_experience}</p>
                        </div>
                        <Badge variant="outline" className="bg-elec-yellow/10 text-elec-yellow border-elec-yellow/30 mx-auto sm:mx-0">
                          {level.progression_timeline}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Enhanced content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {/* Regional Salaries */}
                      <Card className="border-elec-yellow/10 bg-elec-dark/50">
                        <CardContent className="p-4">
                          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                            <PoundSterling className="h-3 w-3" />
                            Regional Salaries (Annual)
                          </h4>
                          <div className="space-y-2 text-xs">
                            <div className="flex justify-between items-center">
                              <span className="flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                London:
                              </span>
                              <span className="text-green-400 font-medium">{level.salary_ranges.london}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>South East:</span>
                              <span className="text-green-400 font-medium">{level.salary_ranges.south_east}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Midlands:</span>
                              <span className="text-green-400 font-medium">{level.salary_ranges.midlands}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>North:</span>
                              <span className="text-green-400 font-medium">{level.salary_ranges.north}</span>
                            </div>
                          </div>
                          <div className="mt-3 pt-2 border-t border-elec-yellow/10">
                            <p className="text-xs text-muted-foreground">
                              *Rates vary by experience and specialization
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Key qualifications */}
                      <Card className="border-elec-yellow/10 bg-elec-dark/50">
                        <CardContent className="p-4">
                          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                            <BookOpen className="h-3 w-3" />
                            Essential Qualifications
                          </h4>
                          <div className="space-y-2">
                            {level.key_qualifications.slice(0, 4).map((qual, idx) => (
                              <div key={idx} className="text-xs">
                                <span className="text-blue-300 font-medium">{qual.level}</span>
                                <div className="text-muted-foreground">{qual.name}</div>
                              </div>
                            ))}
                            {level.key_qualifications.length > 4 && (
                              <div className="text-xs text-muted-foreground">
                                +{level.key_qualifications.length - 4} more qualifications
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                      
                      {/* Work sectors & opportunities */}
                      <Card className="border-elec-yellow/10 bg-elec-dark/50 lg:col-span-2 xl:col-span-1">
                        <CardContent className="p-4">
                          <h4 className="text-sm font-medium mb-3 text-elec-yellow flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" />
                            Work Opportunities
                          </h4>
                          <div className="space-y-3">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Key Sectors:</p>
                              <div className="flex flex-wrap gap-1">
                                {level.work_sectors.slice(0, 3).map((sector, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs bg-elec-yellow/5 text-elec-yellow/80 border-elec-yellow/20">
                                    {sector}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">
                                <Users className="h-3 w-3 inline mr-1" />
                                Career Prospects:
                              </p>
                              <p className="text-xs">
                                 {level.title.includes("Apprentice") ? "Foundation level with structured learning pathway" :
                                 level.title.includes("Improver") ? "Developing skills towards full qualification" :
                                 level.title.includes("Electrician") ? "Fully qualified (Gold Card) with independent working" :
                                 level.title.includes("Approved") ? "Industry-recognised with testing and certification" :
                                 "Advanced level with leadership opportunities"}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    {/* Next steps - enhanced */}
                    <Card className="bg-elec-dark/30 border-elec-yellow/10">
                      <CardContent className="p-4">
                        <h4 className="text-sm font-medium mb-3 text-elec-yellow">Next Steps to Progress:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {level.next_steps.slice(0, 6).map((step, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-xs">
                              <div className="w-1 h-1 rounded-full bg-elec-yellow mt-1.5 flex-shrink-0" />
                              {step}
                            </div>
                          ))}
                        </div>
                        {level.next_steps.length > 6 && (
                          <p className="text-xs text-muted-foreground mt-2">
                            +{level.next_steps.length - 6} additional requirements
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Information */}
          <Card className="mt-8 border-elec-yellow/10 bg-elec-dark/30">
            <CardContent className="p-6">
              <h3 className="font-semibold text-elec-yellow mb-4">Important Career Notes</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h4 className="font-medium mb-2">Progression Timeline:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Apprentice to Improver: 3-4 years (apprenticeship)</li>
                    <li>• Improver to Electrician: 0.5-2 years (NVQ3 + AM2)</li>
                    <li>• Electrician to Approved: 1-3 years (with 2391 + experience)</li>
                    <li>• Approved to Supervisor/Technician: 2-4 years</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Salary Factors:</h4>
                  <ul className="space-y-1 text-xs text-muted-foreground">
                    <li>• Location significantly affects rates</li>
                    <li>• Specializations command premium rates</li>
                    <li>• Contractor rates typically 20-40% higher</li>
                    <li>• Industry sector impacts earning potential</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default UKCareerProgressionTimeline;
