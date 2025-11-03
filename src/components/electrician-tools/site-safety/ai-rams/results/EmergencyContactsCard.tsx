import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MapPin, UserCheck, Shield } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface EmergencyContactsCardProps {
  methodData: MethodStatementData;
}

export function EmergencyContactsCard({ methodData }: EmergencyContactsCardProps) {
  const hasAnyContact = methodData.siteManagerName || methodData.firstAiderName || 
                         methodData.safetyOfficerName || methodData.assemblyPoint;

  return (
    <Card className="bg-red-500/5 border-red-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Shield className="h-5 w-5 text-red-400" />
          Emergency Contacts & Assembly Point
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Site Manager */}
          <div className="bg-elec-gray/30 border border-red-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-elec-light">Site Manager</span>
            </div>
            {methodData.siteManagerName ? (
              <>
                <p className="text-sm text-elec-light/90 mb-1">{methodData.siteManagerName}</p>
                {methodData.siteManagerPhone && (
                  <a 
                    href={`tel:${methodData.siteManagerPhone}`}
                    className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    {methodData.siteManagerPhone}
                  </a>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">To be completed</p>
            )}
          </div>

          {/* First Aider */}
          <div className="bg-elec-gray/30 border border-red-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <UserCheck className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-elec-light">First Aider</span>
            </div>
            {methodData.firstAiderName ? (
              <>
                <p className="text-sm text-elec-light/90 mb-1">{methodData.firstAiderName}</p>
                {methodData.firstAiderPhone && (
                  <a 
                    href={`tel:${methodData.firstAiderPhone}`}
                    className="flex items-center gap-1 text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    {methodData.firstAiderPhone}
                  </a>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">To be completed</p>
            )}
          </div>

          {/* Safety Officer */}
          <div className="bg-elec-gray/30 border border-red-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-elec-light">Safety Officer</span>
            </div>
            {methodData.safetyOfficerName ? (
              <>
                <p className="text-sm text-elec-light/90 mb-1">{methodData.safetyOfficerName}</p>
                {methodData.safetyOfficerPhone && (
                  <a 
                    href={`tel:${methodData.safetyOfficerPhone}`}
                    className="flex items-center gap-1 text-sm text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Phone className="h-3 w-3" />
                    {methodData.safetyOfficerPhone}
                  </a>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground italic">To be completed</p>
            )}
          </div>

          {/* Emergency Services */}
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-elec-light">Emergency Services</span>
            </div>
            <a 
              href="tel:999"
              className="flex items-center gap-1 text-lg font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              <Phone className="h-4 w-4" />
              999
            </a>
          </div>
        </div>

        {/* Assembly Point */}
        <div className="mt-4 bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-4 w-4 text-amber-400" />
            <span className="text-sm font-semibold text-elec-light">Emergency Assembly Point</span>
          </div>
          {methodData.assemblyPoint ? (
            <p className="text-sm text-elec-light/90">{methodData.assemblyPoint}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">To be completed on site</p>
          )}
        </div>

        {!hasAnyContact && (
          <p className="text-xs text-muted-foreground mt-3 text-center">
            Complete emergency contact details before starting work
          </p>
        )}
      </CardContent>
    </Card>
  );
}
