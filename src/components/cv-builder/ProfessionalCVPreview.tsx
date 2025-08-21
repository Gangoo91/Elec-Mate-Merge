import React from "react";
import { CVData } from "./types";
import { format } from "date-fns";

interface ProfessionalCVPreviewProps {
  cvData: CVData;
}

export const ProfessionalCVPreview: React.FC<ProfessionalCVPreviewProps> = ({ cvData }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString + '-01');
      return format(date, 'MMM yyyy');
    } catch {
      return dateString;
    }
  };

  // Convert description to bullet points if it contains sentences
  const formatDescription = (description: string) => {
    if (!description) return [];
    // Split by periods or new lines and filter out empty strings
    const sentences = description.split(/[.\n]+/).filter(item => item.trim().length > 0);
    return sentences.map(sentence => sentence.trim());
  };

  return (
    <div className="bg-cv-cream min-h-screen p-8 print:p-6 print:bg-white">
      <div className="max-w-4xl mx-auto bg-cv-cream print:bg-white print:shadow-none">
        {/* Header */}
        <div className="border-b-2 border-cv-brown pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h1 className="text-4xl font-serif font-bold text-cv-brown mb-2 tracking-wide">
                {cvData.personalInfo.fullName || "Your Name"}
              </h1>
              <p className="text-lg text-cv-text-light font-medium">
                Qualified Electrician
              </p>
            </div>
            <div className="text-right text-sm text-cv-text space-y-1">
              {cvData.personalInfo.email && (
                <div>{cvData.personalInfo.email}</div>
              )}
              {cvData.personalInfo.phone && (
                <div>{cvData.personalInfo.phone}</div>
              )}
              {(cvData.personalInfo.address || cvData.personalInfo.postcode) && (
                <div>
                  {[cvData.personalInfo.address, cvData.personalInfo.postcode]
                    .filter(Boolean)
                    .join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Personal Profile */}
        {cvData.personalInfo.professionalSummary && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
              Personal Profile
            </h2>
            <div className="text-cv-text leading-relaxed space-y-2">
              {formatDescription(cvData.personalInfo.professionalSummary).map((point, index) => (
                <div key={index} className="flex items-start">
                  <span className="text-cv-gold mr-2 mt-1">•</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience */}
        {cvData.experience.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {cvData.experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-cv-text text-lg">{exp.jobTitle}</h3>
                      <p className="text-cv-text font-medium">{exp.company}</p>
                      {exp.location && <p className="text-cv-text-light text-sm">{exp.location}</p>}
                    </div>
                    <div className="text-cv-text-light text-sm text-right">
                      {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                    </div>
                  </div>
                  {exp.description && (
                    <div className="text-cv-text text-sm leading-relaxed space-y-1 ml-4">
                      {formatDescription(exp.description).map((point, index) => (
                        <div key={index} className="flex items-start">
                          <span className="text-cv-gold mr-2 mt-1">•</span>
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {cvData.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {cvData.education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-cv-text">{edu.qualification}</h3>
                      <p className="text-cv-text">{edu.institution}</p>
                      {edu.location && <p className="text-cv-text-light text-sm">{edu.location}</p>}
                      {edu.grade && (
                        <p className="text-cv-text-light text-sm">Grade: {edu.grade}</p>
                      )}
                    </div>
                    <div className="text-cv-text-light text-sm">
                      {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills and Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cvData.skills.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
                Skills
              </h2>
              <div className="space-y-1">
                {cvData.skills.map((skill, index) => (
                  <div key={index} className="flex items-start text-cv-text text-sm">
                    <span className="text-cv-gold mr-2 mt-1">•</span>
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {cvData.certifications.length > 0 && (
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
                Certifications
              </h2>
              <div className="space-y-1">
                {cvData.certifications.map((cert, index) => (
                  <div key={index} className="flex items-start text-cv-text text-sm">
                    <span className="text-cv-gold mr-2 mt-1">•</span>
                    <span>{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};