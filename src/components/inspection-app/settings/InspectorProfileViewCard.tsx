import { InspectorProfile } from "@/hooks/useInspectorProfiles";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { User, Building2, Award, FileCheck, Shield, PenTool, Edit } from "lucide-react";

interface InspectorProfileViewCardProps {
  profile: InspectorProfile;
  onEdit: () => void;
}

export function InspectorProfileViewCard({ profile, onEdit }: InspectorProfileViewCardProps) {
  const hasCompanyDetails = profile.companyName || profile.companyAddress || profile.companyPhone || profile.companyEmail;
  const hasRegistration = profile.registrationScheme && profile.registrationScheme !== 'none';
  const hasInsurance = profile.insuranceProvider && profile.insuranceProvider !== 'none';

  return (
    <Card className="bg-gradient-to-br from-elec-gray via-elec-gray to-elec-gray-dark border-elec-yellow/40 border-2 shadow-lg shadow-elec-yellow/10">
      <CardContent className="p-3 md:p-8 relative">
        <div className="md:max-w-6xl mx-auto">
          {/* Edit Button - Top Right */}
          <Button
            onClick={onEdit}
            size="sm"
            className="absolute top-2 right-2 bg-elec-yellow text-black hover:bg-elec-yellow/90 md:static md:hidden h-7 px-2 text-[11px]"
          >
            <Edit className="w-3 h-3" />
          </Button>

          {/* Header with Photo and Name - Mobile Centered, Desktop Side-by-Side */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-6 pb-3 md:pb-6 border-b border-elec-gray-light md:max-w-4xl mx-auto">
          {/* Profile Photo */}
          <div className="relative w-16 h-16 md:w-28 md:h-28 bg-elec-gray-dark border-2 md:border-4 border-elec-yellow rounded-2xl overflow-hidden flex-shrink-0 shadow-lg shadow-elec-yellow/20">
            {profile.photoUrl ? (
              <img 
                src={profile.photoUrl} 
                alt={profile.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-elec-gray to-elec-gray-dark">
                <User className="w-6 h-6 md:w-12 md:h-12 text-elec-yellow" />
              </div>
            )}
          </div>

          {/* Name and Company - Centered on Mobile */}
          <div className="flex-1 min-w-0 text-center md:text-left">
            <h2 className="text-base md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">{profile.name}</h2>
            {profile.companyName && (
              <p className="text-xs md:text-base text-white/70 mb-2 md:mb-0">{profile.companyName}</p>
            )}
          </div>

          {/* Edit Button - Desktop Only */}
          <Button
            onClick={onEdit}
            className="hidden md:flex bg-elec-yellow text-black hover:bg-elec-yellow/90 flex-shrink-0"
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>

          {/* Stats Grid - 2x2 on Mobile, 4 Columns on Desktop */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1.5 md:gap-3 mt-3 md:mt-6 pb-3 md:pb-6 border-b border-elec-gray-light md:max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark rounded-lg border border-elec-gray-light min-h-[60px] md:min-h-[100px]">
            <Award className="w-4 h-4 md:w-6 md:h-6 text-elec-yellow mb-0.5 md:mb-2" />
            <span className="text-lg md:text-2xl font-bold text-foreground">{profile.qualifications.length}</span>
            <span className="text-[9px] md:text-xs text-white/70 mt-0.5 md:mt-1 leading-tight">Quals</span>
          </div>
          
          {hasRegistration ? (
            <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark rounded-lg border border-elec-gray-light min-h-[60px] md:min-h-[100px]">
              <FileCheck className="w-4 h-4 md:w-6 md:h-6 text-green-400 mb-0.5 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold text-foreground">✓</span>
              <span className="text-[9px] md:text-xs text-white/70 mt-0.5 md:mt-1 leading-tight">Registered</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark/50 rounded-lg border border-elec-gray-light/50 min-h-[60px] md:min-h-[100px] opacity-50">
              <FileCheck className="w-4 h-4 md:w-6 md:h-6 text-white/60 mb-0.5 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold text-white/60">-</span>
              <span className="text-[9px] md:text-xs text-white/60 mt-0.5 md:mt-1 leading-tight">Not Registered</span>
            </div>
          )}
          
          {hasInsurance ? (
            <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark rounded-lg border border-elec-gray-light min-h-[60px] md:min-h-[100px]">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-blue-400 mb-0.5 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold text-foreground">✓</span>
              <span className="text-[9px] md:text-xs text-white/70 mt-0.5 md:mt-1 leading-tight">Insured</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark/50 rounded-lg border border-elec-gray-light/50 min-h-[60px] md:min-h-[100px] opacity-50">
              <Shield className="w-4 h-4 md:w-6 md:h-6 text-white/60 mb-0.5 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold text-white/60">-</span>
              <span className="text-[9px] md:text-xs text-white/60 mt-0.5 md:mt-1 leading-tight">Not Insured</span>
            </div>
          )}

          {profile.signatureData ? (
            <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark rounded-lg border border-elec-gray-light min-h-[60px] md:min-h-[100px]">
              <PenTool className="w-4 h-4 md:w-6 md:h-6 text-purple-400 mb-0.5 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold text-foreground">✓</span>
              <span className="text-[9px] md:text-xs text-white/70 mt-0.5 md:mt-1 leading-tight">Signature</span>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-2 md:p-4 bg-elec-gray-dark/50 rounded-lg border border-elec-gray-light/50 min-h-[60px] md:min-h-[100px] opacity-50">
              <PenTool className="w-4 h-4 md:w-6 md:h-6 text-white/60 mb-0.5 md:mb-2" />
              <span className="text-lg md:text-2xl font-bold text-white/60">-</span>
              <span className="text-[9px] md:text-xs text-white/60 mt-0.5 md:mt-1 leading-tight">No Signature</span>
            </div>
          )}
        </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 md:gap-6 mt-3 md:mt-6 md:max-w-5xl mx-auto">
          {/* Company Details */}
          {hasCompanyDetails && (
            <div>
              <h3 className="text-[11px] md:text-sm font-semibold text-white/70 mb-1.5 md:mb-2 flex items-center gap-1">
                <Building2 className="w-3 h-3 md:w-4 md:h-4" />
                Company
              </h3>
              <div className="flex items-start gap-2 md:gap-3">
                {profile.companyLogo && (
                  <div className="w-10 h-10 md:w-16 md:h-16 bg-elec-gray-dark border-2 md:border-4 border-elec-yellow rounded-lg md:rounded-2xl overflow-hidden flex-shrink-0 shadow-lg shadow-elec-yellow/20">
                    <img 
                      src={profile.companyLogo} 
                      alt={`${profile.companyName} logo`}
                      className="w-full h-full object-contain p-1 md:p-2"
                    />
                  </div>
                )}
                <div className="space-y-0.5 md:space-y-1 flex-1">
                  {profile.companyName && (
                    <p className="text-[11px] md:text-sm text-foreground">{profile.companyName}</p>
                  )}
                  {profile.companyPhone && (
                    <p className="text-[11px] md:text-sm text-white/70">{profile.companyPhone}</p>
                  )}
                  {profile.companyEmail && (
                    <p className="text-[11px] md:text-sm text-white/70">{profile.companyEmail}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Registration */}
          {hasRegistration && (
            <div>
              <h3 className="text-[11px] md:text-sm font-semibold text-white/70 mb-1.5 md:mb-2 flex items-center gap-1">
                <FileCheck className="w-3 h-3 md:w-4 md:h-4" />
                Registration
              </h3>
              <p className="text-sm md:text-base font-semibold text-foreground uppercase">{profile.registrationScheme}</p>
              {profile.registrationNumber && (
                <p className="text-[9px] md:text-xs text-white/70 mt-0.5 md:mt-1">#{profile.registrationNumber}</p>
              )}
            </div>
          )}

          {/* Insurance */}
          {hasInsurance && (
            <div>
              <h3 className="text-[11px] md:text-sm font-semibold text-white/70 mb-1.5 md:mb-2 flex items-center gap-1">
                <Shield className="w-3 h-3 md:w-4 md:h-4" />
                Insurance
              </h3>
              <p className="text-sm md:text-base font-semibold text-foreground uppercase">{profile.insuranceProvider}</p>
              {profile.insuranceCoverage && (
                <p className="text-[9px] md:text-xs text-white/70 mt-0.5 md:mt-1">{profile.insuranceCoverage}</p>
              )}
            </div>
          )}
        </div>

          {/* Signature Preview */}
          {profile.signatureData && (
            <div className="mt-3 md:mt-6 pt-3 md:pt-6 border-t border-elec-gray-light md:max-w-4xl mx-auto">
              <h3 className="text-[11px] md:text-sm font-semibold text-white/70 mb-2 md:mb-3 flex items-center gap-1">
                <PenTool className="w-3 h-3 md:w-4 md:h-4" />
                Digital Signature
              </h3>
              <div className="bg-white rounded-lg p-2 md:p-4 inline-block max-w-xs">
                <img 
                  src={profile.signatureData} 
                  alt="Signature"
                  className="max-h-10 md:max-h-16 w-auto"
                />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
