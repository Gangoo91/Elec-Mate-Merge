import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar, Zap, Award, BookOpen, Briefcase } from "lucide-react";
import { CVData } from "./types";
import { format } from "date-fns";

interface EnhancedCVPreviewProps {
  cvData: CVData;
  theme?: 'modern' | 'professional' | 'electrical';
}

export const EnhancedCVPreview: React.FC<EnhancedCVPreviewProps> = ({ 
  cvData, 
  theme = 'electrical' 
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'modern':
        return {
          container: "bg-white text-gray-900 border-primary/20",
          accent: "bg-primary",
          headerBg: "bg-gradient-to-r from-primary/10 to-primary/5",
          skillBadge: "bg-primary/10 text-primary border-primary/20",
          certBadge: "bg-green-100 text-green-800 border-green-200",
          accentLine: "border-primary",
          iconColor: "text-primary"
        };
      case 'professional':
        return {
          container: "bg-white text-gray-900 border-slate-200",
          accent: "bg-slate-700",
          headerBg: "bg-slate-50",
          skillBadge: "bg-slate-100 text-slate-700 border-slate-200",
          certBadge: "bg-blue-100 text-blue-800 border-blue-200",
          accentLine: "border-slate-300",
          iconColor: "text-slate-600"
        };
      case 'electrical':
      default:
        return {
          container: "bg-white text-gray-900 border-elec-yellow/20",
          accent: "bg-elec-yellow",
          headerBg: "bg-gradient-to-r from-elec-yellow/10 to-elec-yellow/5",
          skillBadge: "bg-elec-yellow/10 text-elec-yellow border-elec-yellow/20",
          certBadge: "bg-elec-yellow/15 text-yellow-800 border-elec-yellow/30",
          accentLine: "border-elec-yellow",
          iconColor: "text-elec-yellow"
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <Card className={`${themeClasses.container} max-w-4xl mx-auto shadow-lg`}>
      <CardContent className="p-0">
        {/* Header Section with Accent */}
        <div className={`${themeClasses.headerBg} p-8 relative overflow-hidden`}>
          <div className={`absolute top-0 left-0 w-full h-1 ${themeClasses.accent}`}></div>
          <div className={`absolute top-2 left-0 w-20 h-0.5 ${themeClasses.accent}`}></div>
          
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {cvData.personalInfo.fullName || "Your Name"}
                </h1>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className={`h-5 w-5 ${themeClasses.iconColor}`} />
                  <span className="text-lg font-medium text-gray-700">Electrical Professional</span>
                </div>
              </div>
              {theme === 'electrical' && (
                <div className="flex items-center justify-center w-16 h-16 bg-elec-yellow/20 rounded-full">
                  <Zap className="h-8 w-8 text-elec-yellow" />
                </div>
              )}
            </div>

            {/* Contact Information Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <Mail className={`h-4 w-4 ${themeClasses.iconColor}`} />
                  <span className="text-sm text-gray-700">{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <Phone className={`h-4 w-4 ${themeClasses.iconColor}`} />
                  <span className="text-sm text-gray-700">{cvData.personalInfo.phone}</span>
                </div>
              )}
              {(cvData.personalInfo.address || cvData.personalInfo.postcode) && (
                <div className="flex items-center gap-3 p-3 bg-white/50 rounded-lg">
                  <MapPin className={`h-4 w-4 ${themeClasses.iconColor}`} />
                  <span className="text-sm text-gray-700">
                    {[cvData.personalInfo.address, cvData.personalInfo.postcode]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="p-8 space-y-8">
          {/* Professional Summary */}
          {cvData.personalInfo.professionalSummary && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-1 h-6 ${themeClasses.accent} rounded-full`}></div>
                <h2 className="text-2xl font-bold text-gray-900">Professional Summary</h2>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-elec-yellow">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {cvData.personalInfo.professionalSummary}
                </p>
              </div>
            </div>
          )}

          {/* Work Experience */}
          {cvData.experience.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-1 h-6 ${themeClasses.accent} rounded-full`}></div>
                <Briefcase className={`h-6 w-6 ${themeClasses.iconColor}`} />
                <h2 className="text-2xl font-bold text-gray-900">Work Experience</h2>
              </div>
              
              <div className="space-y-6">
                {cvData.experience.map((exp, index) => (
                  <div key={exp.id} className="relative">
                    {/* Timeline dot */}
                    <div className={`absolute left-0 top-2 w-3 h-3 ${themeClasses.accent} rounded-full`}></div>
                    {/* Timeline line */}
                    {index < cvData.experience.length - 1 && (
                      <div className={`absolute left-1.5 top-5 w-0.5 h-full ${themeClasses.accent} opacity-30`}></div>
                    )}
                    
                    <div className="ml-8 bg-gray-50 p-6 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 mb-1">{exp.jobTitle}</h3>
                          <p className="text-lg font-semibold text-gray-700 mb-1">{exp.company}</p>
                          {exp.location && (
                            <p className="text-sm text-gray-600 flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {exp.location}
                            </p>
                          )}
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 ${themeClasses.skillBadge} rounded-full`}>
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">
                            {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                          </span>
                        </div>
                      </div>
                      
                      {exp.description && (
                        <div className="border-l-4 border-elec-yellow/30 pl-4">
                          <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {cvData.education.length > 0 && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-1 h-6 ${themeClasses.accent} rounded-full`}></div>
                <BookOpen className={`h-6 w-6 ${themeClasses.iconColor}`} />
                <h2 className="text-2xl font-bold text-gray-900">Education</h2>
              </div>
              
              <div className="grid gap-4">
                {cvData.education.map((edu) => (
                  <div key={edu.id} className="bg-gray-50 p-6 rounded-lg border-l-4 border-elec-yellow/50">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{edu.qualification}</h3>
                        <p className="text-gray-700 font-medium mb-1">{edu.institution}</p>
                        {edu.location && (
                          <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                            <MapPin className="h-3 w-3" />
                            {edu.location}
                          </p>
                        )}
                        {edu.grade && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Grade: {edu.grade}
                          </Badge>
                        )}
                      </div>
                      <div className={`flex items-center gap-2 px-3 py-1 ${themeClasses.skillBadge} rounded-full`}>
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills and Certifications Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Skills */}
            {cvData.skills.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-6 ${themeClasses.accent} rounded-full`}></div>
                  <Zap className={`h-5 w-5 ${themeClasses.iconColor}`} />
                  <h2 className="text-xl font-bold text-gray-900">Technical Skills</h2>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {cvData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 p-3 ${themeClasses.skillBadge} rounded-lg hover:shadow-md transition-shadow`}
                    >
                      <Zap className="h-4 w-4" />
                      <span className="font-medium">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {cvData.certifications.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-1 h-6 ${themeClasses.accent} rounded-full`}></div>
                  <Award className={`h-5 w-5 ${themeClasses.iconColor}`} />
                  <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
                </div>
                <div className="space-y-3">
                  {cvData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 p-4 ${themeClasses.certBadge} rounded-lg hover:shadow-md transition-shadow`}
                    >
                      <Award className="h-5 w-5 flex-shrink-0" />
                      <span className="font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};