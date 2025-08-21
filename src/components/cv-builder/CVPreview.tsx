
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";
import { CVData } from "./types";
import { format } from "date-fns";
import { processMarkdown } from "@/utils/markdownUtils";

interface CVPreviewProps {
  cvData: CVData;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-white text-black max-w-4xl mx-auto">
      <CardContent className="p-8 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            {cvData.personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            {cvData.personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {cvData.personalInfo.email}
              </div>
            )}
            {cvData.personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                {cvData.personalInfo.phone}
              </div>
            )}
            {(cvData.personalInfo.address || cvData.personalInfo.postcode) && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {[cvData.personalInfo.address, cvData.personalInfo.postcode]
                  .filter(Boolean)
                  .join(', ')}
              </div>
            )}
          </div>
        </div>

        {/* Professional Summary */}
        {cvData.personalInfo.professionalSummary && (
          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Professional Summary</h2>
            <div className="text-gray-700 leading-relaxed">
              {processMarkdown(cvData.personalInfo.professionalSummary)}
            </div>
          </div>
        )}

        <Separator />

        {/* Work Experience */}
        {cvData.experience.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Work Experience</h2>
            <div className="space-y-4">
              {cvData.experience.map((exp) => (
                <div key={exp.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{exp.jobTitle}</h3>
                      <p className="text-gray-700 font-medium">{exp.company}</p>
                      {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                      </div>
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-gray-700 text-sm leading-relaxed pl-4 border-l-2 border-gray-200">
                      {processMarkdown(exp.description)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {cvData.experience.length > 0 && cvData.education.length > 0 && <Separator />}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Education</h2>
            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div key={edu.id} className="space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">{edu.qualification}</h3>
                      <p className="text-gray-700 font-medium">{edu.institution}</p>
                      {edu.location && <p className="text-gray-600 text-sm">{edu.location}</p>}
                      {edu.grade && (
                        <p className="text-gray-600 text-sm">Grade: {edu.grade}</p>
                      )}
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {(cvData.skills.length > 0 || cvData.certifications.length > 0) && <Separator />}

        {/* Skills and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cvData.skills.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Skills</h2>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-blue-100 text-blue-800 border-blue-200"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {cvData.certifications.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-3 text-gray-900">Certifications</h2>
              <div className="flex flex-wrap gap-2">
                {cvData.certifications.map((cert, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-green-100 text-green-800 border-green-200"
                  >
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
