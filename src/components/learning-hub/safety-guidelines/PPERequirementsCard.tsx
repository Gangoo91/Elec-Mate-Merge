import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, HardHat, Zap, CheckCircle2 } from 'lucide-react';

const PPERequirementsCard = () => {
  const ppeItems = [
    {
      category: 'Head Protection',
      items: ['Safety helmet', 'Arc flash hood', 'Face shield'],
      icon: HardHat,
      color: 'text-blue-400',
      regulation: 'BS EN 397'
    },
    {
      category: 'Eye Protection',
      items: ['Safety glasses', 'Goggles', 'Welding mask'],
      icon: Eye,
      color: 'text-green-400',
      regulation: 'BS EN 166'
    },
    {
      category: 'Body Protection',
      items: ['Arc flash suit', 'High-vis clothing', 'Insulated clothing'],
      icon: Shield,
      color: 'text-orange-400',
      regulation: 'BS EN 61482'
    },
    {
      category: 'Electrical Protection',
      items: ['Insulated gloves', 'Voltage detector', 'Earth bond leads'],
      icon: Zap,
      color: 'text-yellow-400',
      regulation: 'BS 7671'
    }
  ];

  return (
    <Card className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border-2 border-orange-500/20">
      <CardHeader>
        <CardTitle className="text-orange-400 flex items-center gap-2">
          <Shield className="h-6 w-6" />
          Personal Protective Equipment (PPE) Requirements
        </CardTitle>
        <CardDescription className="text-gray-300">
          Essential protective equipment for electrical work compliance with BS 7671
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* PPE Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ppeItems.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="bg-card rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <IconComponent className={`h-5 w-5 ${category.color}`} />
                  <h4 className="font-medium text-foreground">{category.category}</h4>
                </div>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <CheckCircle2 className="h-3 w-3 text-green-400" />
                      {item}
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-border">
                  <span className="text-xs text-gray-400">Standard: {category.regulation}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Risk Assessment */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="font-medium text-orange-400 mb-3">PPE Selection Risk Assessment</h4>
          <div className="space-y-2 text-sm text-gray-300">
            <p><strong>Voltage Level:</strong> Determine appropriate insulation rating</p>
            <p><strong>Arc Flash Risk:</strong> Calculate incident energy and select appropriate arc rating</p>
            <p><strong>Environmental Factors:</strong> Consider moisture, chemicals, and temperature</p>
            <p><strong>Task Duration:</strong> Ensure comfort and mobility for extended work periods</p>
          </div>
        </div>

        {/* Inspection Requirements */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="font-medium text-blue-400 mb-3">PPE Inspection & Maintenance</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-300">
            <div>
              <p><strong>Before Each Use:</strong></p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Visual inspection for damage</li>
                <li>• Check certification dates</li>
                <li>• Verify correct rating</li>
              </ul>
            </div>
            <div>
              <p><strong>Regular Testing:</strong></p>
              <ul className="mt-1 space-y-1 text-xs">
                <li>• Electrical testing of insulated items</li>
                <li>• Certification renewals</li>
                <li>• Replace if damaged or expired</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PPERequirementsCard;