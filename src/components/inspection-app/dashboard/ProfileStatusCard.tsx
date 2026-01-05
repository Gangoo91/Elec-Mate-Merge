import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Check, Phone, Mail } from 'lucide-react';
import { useInspectorProfiles } from '@/hooks/useInspectorProfiles';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
const ProfileStatusCard = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { profiles, getDefaultProfile } = useInspectorProfiles();
  const defaultProfile = getDefaultProfile();
  const hasProfile = profiles.length > 0;
  const isComplete = defaultProfile && 
    defaultProfile.name && 
    defaultProfile.companyName && 
    defaultProfile.qualifications.length > 0 &&
    defaultProfile.registrationNumber;

  const handleCardClick = () => {
    navigate('/settings?tab=profiles');
  };

  return (
    <Card 
      className="bg-elec-gray border border-elec-yellow/30 hover:border-elec-yellow/50 transition-all duration-300 cursor-pointer group rounded-2xl active:scale-[0.98] touch-manipulation"
      onClick={handleCardClick}
    >
      <CardContent className={cn("p-3 sm:p-4 md:p-6")}>
        {defaultProfile ? (
          <div className={cn("flex flex-col sm:flex-row items-center", isMobile ? "gap-3" : "gap-4 sm:gap-6")}>
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                {defaultProfile.photoUrl ? (
                  <img
                    src={defaultProfile.photoUrl}
                    alt={defaultProfile.name}
                    className={cn("rounded-full object-cover border-2 border-elec-yellow/30", isMobile ? "w-16 h-16" : "w-20 h-20")}
                  />
                ) : (
                  <div className={cn("rounded-full bg-elec-yellow/20 flex items-center justify-center border-2 border-elec-yellow/30", isMobile ? "w-16 h-16" : "w-20 h-20")}>
                    <User className={cn("text-yellow-400", isMobile ? "w-8 h-8" : "w-10 h-10")} />
                  </div>
                )}
                {isComplete && (
                  <div className="absolute -top-1 -right-1 bg-elec-yellow text-black rounded-full p-1">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </div>

            {/* Profile Info */}
            <div className={cn("flex-grow text-center sm:text-left", isMobile ? "space-y-2" : "space-y-3")}>
              <div>
                <h3 className={cn("font-bold text-foreground group-hover:text-elec-yellow transition-colors", isMobile ? "text-lg" : "text-xl")}>{defaultProfile.name}</h3>
                <p className="text-sm text-muted-foreground">{defaultProfile.companyName}</p>
              </div>

              {/* Qualifications and Contact in horizontal layout */}
              <div className={cn("flex flex-col sm:flex-row sm:items-center", isMobile ? "gap-2" : "gap-3 sm:gap-6")}>
                {/* Qualifications */}
                {defaultProfile.qualifications.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                    {defaultProfile.qualifications.map((qual, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0.5 px-2 bg-elec-yellow/20 text-yellow-400 border-elec-yellow/30">
                        {qual}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Contact Details */}
                {(defaultProfile.companyEmail || defaultProfile.companyPhone) && (
                  <div className="flex flex-wrap gap-3 sm:gap-4 justify-center sm:justify-start text-xs text-muted-foreground">
                    {defaultProfile.companyEmail && (
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-elec-yellow flex-shrink-0" />
                        <span className="truncate max-w-[200px]">{defaultProfile.companyEmail}</span>
                      </div>
                    )}
                    {defaultProfile.companyPhone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-elec-yellow flex-shrink-0" />
                        <span>{defaultProfile.companyPhone}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Action Button */}
            <div className="flex-shrink-0">
              <Button 
                variant="outline" 
                size="sm"
                className="border-elec-yellow text-elec-yellow hover:bg-elec-yellow hover:text-black"
                onClick={handleCardClick}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        ) : (
          <div className={cn("flex flex-col sm:flex-row items-center", isMobile ? "gap-3" : "gap-4 sm:gap-6")}>
            <div className="flex-shrink-0">
              <div className={cn("rounded-full bg-elec-yellow/20 flex items-center justify-center border-2 border-elec-yellow/30", isMobile ? "w-16 h-16" : "w-20 h-20")}>
                <User className={cn("text-yellow-400", isMobile ? "w-8 h-8" : "w-10 h-10")} />
              </div>
            </div>
            <div className="flex-grow text-center sm:text-left">
              <p className={cn("text-muted-foreground", isMobile ? "text-sm mb-2" : "text-sm mb-3")}>
                Complete your inspector profile to auto-fill certificates and maintain professional records.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button 
                variant="default" 
                size="sm"
                className="bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
                onClick={handleCardClick}
              >
                Complete Profile
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileStatusCard;
