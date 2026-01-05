import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingSummarySection4 = () => {
  return (
    <Card className="bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-green-300 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-400 drop-shadow-md" />
          Section Summary: BS 5266 and Related Standards
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="text-green-200">
          This section provided a comprehensive overview of the standards and regulations governing emergency lighting systems.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Primary Standards</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>BS 5266-1:2016:</strong> Comprehensive code of practice for emergency lighting design and installation</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>BS EN 1838:2013:</strong> Photometric requirements and measurement methods</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>BS 5266-8:2004:</strong> Testing and maintenance procedures</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Legal Framework</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Fire Safety Order 2005:</strong> Creates legal duties for responsible persons</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Building Regulations:</strong> Statutory requirements for new builds and alterations</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Workplace Regulations:</strong> Emergency lighting requirements in places of work</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Compliance Process</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span>Risk assessment forms the foundation of emergency lighting design</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span>BS 5266-1 methodology ensures systematic design approach</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span>Comprehensive documentation demonstrates due diligence</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="text-green-300 font-semibold">Testing Requirements</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Daily:</strong> Visual inspection of indicators and signage</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Monthly:</strong> Brief functional testing of all luminaires</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                <span><strong>Annually:</strong> Full duration test and comprehensive inspection</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-500/10 border border-green-500/40 rounded-lg">
          <h4 className="text-green-300 font-semibold mb-2">Module Completion</h4>
          <p className="text-sm">
            You have now completed Module 1 of the Emergency Lighting course. This foundation knowledge of regulations, 
            required locations, system types, and standards provides the essential background for more advanced topics 
            in subsequent modules covering design calculations, installation practices, and maintenance procedures.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};