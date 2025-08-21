import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Calendar, Zap, Award, BookOpen, Briefcase, Globe } from "lucide-react";
import { CVData } from "./types";
import { format } from "date-fns";

interface TwoColumnCVPreviewProps {
  cvData: CVData;
  theme?: 'modern' | 'professional' | 'electrical';
}

export const TwoColumnCVPreview: React.FC<TwoColumnCVPreviewProps> = ({ 
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
          sidebar: "bg-slate-50 border-r border-slate-200",
          accent: "text-primary",
          sectionHeader: "text-primary border-b border-primary/20",
          skillBadge: "bg-primary/10 text-primary",
          certBadge: "bg-green-50 text-green-700 border border-green-200"
        };
      case 'professional':
        return {
          sidebar: "bg-gray-50 border-r border-gray-200",
          accent: "text-slate-700",
          sectionHeader: "text-slate-700 border-b border-slate-300",
          skillBadge: "bg-slate-100 text-slate-700",
          certBadge: "bg-blue-50 text-blue-700 border border-blue-200"
        };
      case 'electrical':
      default:
        return {
          sidebar: "bg-elec-yellow/5 border-r border-elec-yellow/20",
          accent: "text-elec-yellow",
          sectionHeader: "text-elec-dark border-b border-elec-yellow/30",
          skillBadge: "bg-elec-yellow/10 text-elec-dark",
          certBadge: "bg-elec-yellow/15 text-elec-dark border border-elec-yellow/30"
        };
    }
  };

  const themeClasses = getThemeClasses();

  return (
    <Card className="max-w-4xl mx-auto shadow-lg bg-white">
      <CardContent className="p-0">
        {/* Header with Name */}
        <div className="bg-white p-8 border-b border-gray-100">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-2">
              {cvData.personalInfo.fullName || "Your Name"}
            </h1>
            <div className="flex items-center justify-center gap-2 mb-4">
              <Zap className={`h-6 w-6 ${themeClasses.accent}`} />
              <p className="text-xl text-gray-600">Electrical Professional</p>
            </div>
            
            {/* Contact Bar */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
              {cvData.personalInfo.email && (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{cvData.personalInfo.email}</span>
                </div>
              )}
              {cvData.personalInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{cvData.personalInfo.phone}</span>
                </div>
              )}
              {(cvData.personalInfo.address || cvData.personalInfo.postcode) && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {[cvData.personalInfo.address, cvData.personalInfo.postcode]
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 min-h-[600px]">
          {/* Left Sidebar */}
          <div className={`${themeClasses.sidebar} p-8 space-y-8`}>
            
            {/* Skills Section */}
            {cvData.skills.length > 0 && (
              <div>
                <h3 className={`text-lg font-bold mb-4 pb-2 ${themeClasses.sectionHeader}`}>
                  Technical Skills
                </h3>
                <div className="space-y-2">
                  {cvData.skills.map((skill, index) => (
                    <div
                      key={index}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${themeClasses.skillBadge}`}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {cvData.certifications.length > 0 && (
              <div>
                <h3 className={`text-lg font-bold mb-4 pb-2 ${themeClasses.sectionHeader}`}>
                  Certifications
                </h3>
                <div className="space-y-3">
                  {cvData.certifications.map((cert, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-3 p-3 rounded-lg ${themeClasses.certBadge}`}
                    >
                      <Award className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span className="text-sm font-medium leading-tight">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {cvData.education.length > 0 && (
              <div>
                <h3 className={`text-lg font-bold mb-4 pb-2 ${themeClasses.sectionHeader}`}>
                  Education
                </h3>
                <div className="space-y-4">
                  {cvData.education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <h4 className="font-semibold text-gray-900 text-sm leading-tight">
                        {edu.qualification}
                      </h4>
                      <p className="text-sm text-gray-700">{edu.institution}</p>
                      {edu.location && (
                        <p className="text-xs text-gray-600">{edu.location}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </p>
                      {edu.grade && (
                        <Badge variant="secondary" className="text-xs">
                          {edu.grade}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Main Content */}
          <div className="lg:col-span-2 p-8 space-y-8">
            
            {/* Professional Summary */}
            {cvData.personalInfo.professionalSummary && (
              <div>
                <h2 className={`text-2xl font-bold mb-4 pb-2 ${themeClasses.sectionHeader}`}>
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {cvData.personalInfo.professionalSummary}
                </p>
              </div>
            )}

            {/* Work Experience */}
            {cvData.experience.length > 0 && (
              <div>
                <h2 className={`text-2xl font-bold mb-6 pb-2 ${themeClasses.sectionHeader}`}>
                  Professional Experience
                </h2>
                
                <div className="space-y-8">
                  {cvData.experience.map((exp, index) => (
                    <div key={exp.id} className="relative">
                      {/* Timeline dot and line */}
                      <div className="absolute left-0 top-2">
                        <div className={`w-3 h-3 rounded-full bg-current ${themeClasses.accent}`}></div>
                        {index < cvData.experience.length - 1 && (
                          <div className={`absolute left-1.5 top-3 w-0.5 h-16 bg-current opacity-20 ${themeClasses.accent}`}></div>
                        )}
                      </div>
                      
                      <div className="ml-8">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {exp.jobTitle}
                            </h3>
                            <p className="text-lg font-semibold text-gray-700 mb-1">
                              {exp.company}
                            </p>
                            {exp.location && (
                              <p className="text-sm text-gray-600 flex items-center gap-1">
                                <MapPin className="h-3 w-3" />
                                {exp.location}
                              </p>
                            )}
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${themeClasses.skillBadge}`}>
                            <Calendar className="h-4 w-4" />
                            <span>
                              {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                            </span>
                          </div>
                        </div>
                        
                        {exp.description && (
                          <div className="mt-3">
                            <p className="text-gray-700 leading-relaxed">
                              {exp.description}
                            </p>
                          </div>
                        )}
                      </div>
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