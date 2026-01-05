import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Mic, MapPin } from 'lucide-react';
import { PrivacyRiskQuickCheck } from './PrivacyRiskQuickCheck';

export const SmartHomeModule5Section6PrivacyRisks = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Eye className="h-5 w-5 text-elec-yellow" />
          Risks to User Privacy
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Mic className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Audio Privacy</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Smart speakers and voice assistants may capture sensitive conversations 
              and transmit them to cloud services
            </p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Eye className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Visual Privacy</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Poorly configured CCTV systems can be accessed externally, 
              allowing strangers to view live feeds
            </p>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Location Privacy</h4>
            </div>
            <p className="text-gray-300 text-sm">
              Location data and usage patterns can reveal when a home is empty, 
              creating security vulnerabilities
            </p>
          </div>
        </div>

        <div className="bg-orange-950/20 p-4 rounded-lg border border-orange-800/30">
          <h4 className="font-semibold text-orange-400 mb-2">Common Privacy Breaches</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-orange-400">•</span>
              Unauthorised access to baby monitors and security cameras
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">•</span>
              Voice recordings being stored and analysed without consent
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">•</span>
              Smart door locks being manipulated remotely
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-400">•</span>
              Personal schedules and habits being tracked and sold
            </li>
          </ul>
        </div>

        <PrivacyRiskQuickCheck />
      </CardContent>
    </Card>
  );
};