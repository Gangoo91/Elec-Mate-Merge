import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, ParkingCircle, Package, Trash2, Coffee, AlertCircle } from 'lucide-react';
import { MethodStatementData } from '@/types/method-statement';

interface SiteLogisticsCardProps {
  methodData: MethodStatementData;
}

export function SiteLogisticsCard({ methodData }: SiteLogisticsCardProps) {
  const logistics = methodData.siteLogistics;
  
  if (!logistics) {
    return null;
  }

  const hasAnyLogistics = logistics.vehicleAccess || logistics.parking || 
                          logistics.materialStorage || logistics.wasteManagement ||
                          logistics.welfareFacilities || logistics.siteRestrictions;

  if (!hasAnyLogistics) {
    return null;
  }

  return (
    <Card className="bg-green-500/5 border-green-500/20 mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <Truck className="h-5 w-5 text-green-400" />
          Site Logistics
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {/* Vehicle Access */}
        {logistics.vehicleAccess && (
          <div className="bg-elec-gray/30 border border-green-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Truck className="h-4 w-4 text-green-400" />
              <span className="text-sm font-semibold text-elec-light">Vehicle Access</span>
            </div>
            <p className="text-sm text-elec-light/90">{logistics.vehicleAccess}</p>
          </div>
        )}

        {/* Parking */}
        {logistics.parking && (
          <div className="bg-elec-gray/30 border border-green-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <ParkingCircle className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-semibold text-elec-light">Parking Arrangements</span>
            </div>
            <p className="text-sm text-elec-light/90">{logistics.parking}</p>
          </div>
        )}

        {/* Material Storage */}
        {logistics.materialStorage && (
          <div className="bg-elec-gray/30 border border-green-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Package className="h-4 w-4 text-amber-400" />
              <span className="text-sm font-semibold text-elec-light">Material Storage</span>
            </div>
            <p className="text-sm text-elec-light/90">{logistics.materialStorage}</p>
          </div>
        )}

        {/* Waste Management */}
        {logistics.wasteManagement && (
          <div className="bg-elec-gray/30 border border-green-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Trash2 className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-elec-light">Waste Management</span>
            </div>
            <p className="text-sm text-elec-light/90">{logistics.wasteManagement}</p>
          </div>
        )}

        {/* Welfare Facilities */}
        {logistics.welfareFacilities && (
          <div className="bg-elec-gray/30 border border-green-500/10 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Coffee className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-semibold text-elec-light">Welfare Facilities</span>
            </div>
            <p className="text-sm text-elec-light/90">{logistics.welfareFacilities}</p>
          </div>
        )}

        {/* Site Restrictions */}
        {logistics.siteRestrictions && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <span className="text-sm font-semibold text-red-400">Site Restrictions</span>
            </div>
            <p className="text-sm text-elec-light/90">{logistics.siteRestrictions}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
