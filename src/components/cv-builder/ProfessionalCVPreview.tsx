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
                  {point}
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

        {/* Professional Skills & Qualifications */}
        {(cvData.skills.length > 0 || cvData.certifications.length > 0) && (
          <div className="space-y-8">
            {/* Core Technical Skills */}
            {cvData.skills.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
                  Core Technical Skills
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Electrical Installation & Maintenance */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Installation & Maintenance
                    </h3>
                    <div className="space-y-1">
                      {cvData.skills
                        .filter(skill => 
                          skill.toLowerCase().includes('installation') ||
                          skill.toLowerCase().includes('wiring') ||
                          skill.toLowerCase().includes('maintenance') ||
                          skill.toLowerCase().includes('repair') ||
                          skill.toLowerCase().includes('three phase') ||
                          skill.toLowerCase().includes('circuit')
                        )
                        .map((skill, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Testing & Compliance */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Testing & Compliance
                    </h3>
                    <div className="space-y-1">
                      {cvData.skills
                        .filter(skill => 
                          skill.toLowerCase().includes('testing') ||
                          skill.toLowerCase().includes('inspection') ||
                          skill.toLowerCase().includes('pat') ||
                          skill.toLowerCase().includes('bs 7671') ||
                          skill.toLowerCase().includes('regulation') ||
                          skill.toLowerCase().includes('fault')
                        )
                        .map((skill, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Specialised Systems */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Specialised Systems
                    </h3>
                    <div className="space-y-1">
                      {cvData.skills
                        .filter(skill => 
                          skill.toLowerCase().includes('solar') ||
                          skill.toLowerCase().includes('cctv') ||
                          skill.toLowerCase().includes('fire alarm') ||
                          skill.toLowerCase().includes('emergency lighting') ||
                          skill.toLowerCase().includes('led') ||
                          skill.toLowerCase().includes('automation')
                        )
                        .map((skill, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Professional Skills */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Professional Skills
                    </h3>
                    <div className="space-y-1">
                      {cvData.skills
                        .filter(skill => 
                          skill.toLowerCase().includes('health') ||
                          skill.toLowerCase().includes('safety') ||
                          skill.toLowerCase().includes('niceic') ||
                          skill.toLowerCase().includes('customer') ||
                          skill.toLowerCase().includes('project') ||
                          skill.toLowerCase().includes('team') ||
                          !skill.toLowerCase().match(/(installation|wiring|maintenance|repair|three phase|circuit|testing|inspection|pat|bs 7671|regulation|fault|solar|cctv|fire alarm|emergency lighting|led|automation|health|safety|niceic)/)
                        )
                        .map((skill, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{skill}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Certifications & Qualifications */}
            {cvData.certifications.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wider text-cv-brown mb-4 border-b border-cv-beige pb-1">
                  Certifications & Qualifications
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Core Electrical Qualifications */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Electrical Qualifications
                    </h3>
                    <div className="space-y-1">
                      {cvData.certifications
                        .filter(cert => 
                          cert.toLowerCase().includes('18th edition') ||
                          cert.toLowerCase().includes('level 3') ||
                          cert.toLowerCase().includes('level 2') ||
                          cert.toLowerCase().includes('city & guilds') ||
                          cert.toLowerCase().includes('2365') ||
                          cert.toLowerCase().includes('am2') ||
                          cert.toLowerCase().includes('electrical installation')
                        )
                        .map((cert, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{cert}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Testing & Inspection Certifications */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Testing & Inspection
                    </h3>
                    <div className="space-y-1">
                      {cvData.certifications
                        .filter(cert => 
                          cert.toLowerCase().includes('2391') ||
                          cert.toLowerCase().includes('testing') ||
                          cert.toLowerCase().includes('inspection') ||
                          cert.toLowerCase().includes('pat testing')
                        )
                        .map((cert, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{cert}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Professional Memberships */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Professional Memberships
                    </h3>
                    <div className="space-y-1">
                      {cvData.certifications
                        .filter(cert => 
                          cert.toLowerCase().includes('niceic') ||
                          cert.toLowerCase().includes('ecs') ||
                          cert.toLowerCase().includes('cscs') ||
                          cert.toLowerCase().includes('approved')
                        )
                        .map((cert, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{cert}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Additional Certifications */}
                  <div>
                    <h3 className="text-xs font-semibold text-cv-brown mb-2 uppercase tracking-wide">
                      Additional Certifications
                    </h3>
                    <div className="space-y-1">
                      {cvData.certifications
                        .filter(cert => 
                          !cert.toLowerCase().match(/(18th edition|level 3|level 2|city & guilds|2365|am2|electrical installation|2391|testing|inspection|pat testing|niceic|ecs|cscs|approved)/)
                        )
                        .map((cert, index) => (
                          <div key={index} className="flex items-start text-cv-text text-sm">
                            <span className="text-cv-gold mr-2 mt-1">•</span>
                            <span>{cert}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};