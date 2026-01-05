import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export const AirQualitySensorsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Shield className="h-5 w-5 text-elec-yellow" />
          Air Quality Sensors (Particulates & VOCs)
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Air quality sensors detect various pollutants including particulate matter (PM2.5, PM10) and volatile organic compounds (VOCs), providing comprehensive monitoring of indoor air contamination.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Particulate Matter (PM)</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-foreground text-sm mb-1">PM2.5 (Fine Particles)</h5>
                <p className="text-xs text-gray-300 mb-2">Particles smaller than 2.5 micrometers - penetrate deep into lungs</p>
                <ul className="text-xs text-red-100 space-y-1">
                  <li>• Combustion particles</li>
                  <li>• Vehicle emissions</li>
                  <li>• Cooking smoke</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground text-sm mb-1">PM10 (Coarse Particles)</h5>
                <p className="text-xs text-gray-300 mb-2">Particles 2.5-10 micrometers - trapped in nose and throat</p>
                <ul className="text-xs text-orange-100 space-y-1">
                  <li>• Dust and pollen</li>
                  <li>• Construction debris</li>
                  <li>• Road dust</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Volatile Organic Compounds (VOCs)</h4>
            <p className="text-purple-100 text-sm mb-3">Chemical compounds that easily evaporate at room temperature</p>
            <div>
              <h5 className="font-medium text-foreground text-sm mb-2">Common Sources</h5>
              <ul className="text-sm text-purple-100 space-y-1">
                <li>• Cleaning products and disinfectants</li>
                <li>• Paints and adhesives</li>
                <li>• Furniture and carpets</li>
                <li>• Air fresheners and perfumes</li>
                <li>• Building materials</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Health Impact Levels</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
              <div className="text-lg font-bold text-green-400">Good</div>
              <div className="text-xs text-green-200 mt-1">PM2.5: 0-12 μg/m³</div>
              <div className="text-xs text-green-200">VOCs: &lt;0.3 mg/m³</div>
            </div>
            <div className="text-center p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
              <div className="text-lg font-bold text-yellow-400">Moderate</div>
              <div className="text-xs text-yellow-200 mt-1">PM2.5: 12-35 μg/m³</div>
              <div className="text-xs text-yellow-200">VOCs: 0.3-3 mg/m³</div>
            </div>
            <div className="text-center p-3 bg-red-600/10 border border-red-600/30 rounded">
              <div className="text-lg font-bold text-red-400">Unhealthy</div>
              <div className="text-xs text-red-200 mt-1">PM2.5: &gt;35 μg/m³</div>
              <div className="text-xs text-red-200">VOCs: &gt;3 mg/m³</div>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Smart System Responses</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Ventilation Response</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Boost extract ventilation</li>
                <li>• Increase fresh air supply</li>
                <li>• Activate mechanical ventilation</li>
                <li>• Open automated windows</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-200 mb-2">Filtration Response</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Activate HEPA filters</li>
                <li>• Boost air purifier systems</li>
                <li>• Increase HVAC filter efficiency</li>
                <li>• Run recirculation modes</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-2">User Notifications</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Air quality alerts</li>
                <li>• Recommended actions</li>
                <li>• Source identification</li>
                <li>• Historical trending</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-yellow-600 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-3">Critical Applications</h4>
          <p className="text-sm text-gray-300 mb-2">
            Air quality monitoring is particularly important in urban areas with high pollution levels and homes with gas appliances, fireplaces, or attached garages.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <strong className="text-foreground">Urban Environments:</strong>
              <span className="text-gray-300"> Traffic pollution, industrial emissions, construction dust</span>
            </div>
            <div>
              <strong className="text-foreground">Gas Appliances:</strong>
              <span className="text-gray-300"> Combustion byproducts, potential gas leaks, incomplete combustion</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};