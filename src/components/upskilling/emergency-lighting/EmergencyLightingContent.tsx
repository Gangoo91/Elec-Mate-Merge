import { FileText, Scale, Building2, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingContent = () => {
  return (
    <div className="space-y-6">
      {/* Primary Legislation */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-elec-yellow" />
            Primary Legislation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div>
            <h4 className="text-elec-yellow font-semibold mb-2">
              Regulatory Reform (Fire Safety) Order 2005 (RRO)
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Places fire safety duties on the "responsible person"</li>
              <li>Requires adequate means of escape and emergency lighting</li>
              <li>Mandates fire risk assessments and safety measures</li>
              <li>Covers most non-domestic premises in England and Wales</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-elec-yellow font-semibold mb-2">
              Building Regulations (Approved Document B)
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Sets requirements for new buildings and major alterations</li>
              <li>References BS 5266-1 for emergency lighting design</li>
              <li>Specifies minimum performance standards</li>
              <li>Applies at construction and material change of use</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Standards and Guidance */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-elec-yellow" />
            Key Standards and Guidance
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div>
            <h4 className="text-elec-yellow font-semibold mb-2">
              BS 5266-1:2016 - Emergency Lighting Code of Practice
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>Primary standard for emergency lighting design and installation</li>
              <li>Defines system categories, illumination levels, and coverage</li>
              <li>Specifies testing and maintenance requirements</li>
              <li>Referenced by Building Regulations and industry guidance</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-elec-yellow font-semibold mb-2">
              BS EN 1838:2013 - Lighting Applications
            </h4>
            <ul className="list-disc pl-6 space-y-1 text-sm">
              <li>European standard for emergency lighting requirements</li>
              <li>Sets photometric requirements for escape routes</li>
              <li>Defines illumination levels and uniformity ratios</li>
              <li>Incorporated into BS 5266-1 recommendations</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Responsible Person Duties */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-elec-yellow" />
            Responsible Person Duties
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p>Under the RRO, the responsible person must:</p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-foreground font-medium mb-2">Assessment & Planning</h5>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Conduct fire risk assessments</li>
                <li>Identify escape route requirements</li>
                <li>Specify appropriate lighting systems</li>
                <li>Document design decisions</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-foreground font-medium mb-2">Implementation & Maintenance</h5>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Install compliant emergency lighting</li>
                <li>Ensure regular testing and maintenance</li>
                <li>Keep records of all activities</li>
                <li>Train staff on procedures</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Building Types */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Building2 className="h-5 w-5 text-elec-yellow" />
            Building Types Requiring Emergency Lighting
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-foreground font-medium mb-2">Always Required</h5>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Premises over 200m² floor area</li>
                <li>Buildings with sleeping accommodation</li>
                <li>Multi-storey buildings</li>
                <li>Public buildings and places of assembly</li>
                <li>Premises with vulnerable occupants</li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-foreground font-medium mb-2">Risk-Based Assessment</h5>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Small single-storey premises</li>
                <li>Well-lit areas with alternative exits</li>
                <li>Low occupancy buildings</li>
                <li>Areas with high ambient lighting</li>
                <li>Outdoor escape routes</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};