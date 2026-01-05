import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Settings, AlertCircle, FileText } from 'lucide-react';
import { ElectricianSecurityRoleQuickCheck } from './ElectricianSecurityRoleQuickCheck';

export const SmartHomeModule5Section6ElectricianRole = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <User className="h-5 w-5 text-elec-yellow" />
          Electrician's Role in Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Installation Security</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Ensure devices are connected only to trusted networks
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Verify router security settings during installation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Change all default passwords before handover
              </li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <User className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Client Education</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Advise clients on best practices for router security
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Demonstrate how to change device credentials
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Show clients how to update firmware and apps
              </li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Risk Assessment</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Identify potential vulnerabilities during installation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Assess network security before connecting devices
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Recommend security improvements to clients
              </li>
            </ul>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4 text-elec-yellow" />
              <h4 className="font-semibold text-foreground">Documentation</h4>
            </div>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Report and document any potential vulnerabilities
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Provide security guidance documentation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                Record security measures implemented
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-blue-950/20 p-4 rounded-lg border border-blue-800/30">
          <h4 className="font-semibold text-blue-400 mb-2">Professional Responsibility</h4>
          <p className="text-gray-300 text-sm mb-2">
            As a professional electrician, you have a duty of care to ensure that smart home systems 
            are installed securely. This includes:
          </p>
          <ul className="space-y-1 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              Never leaving systems with default security settings
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              Educating clients about ongoing security maintenance
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">•</span>
              Staying informed about current security threats and best practices
            </li>
          </ul>
        </div>

        <ElectricianSecurityRoleQuickCheck />
      </CardContent>
    </Card>
  );
};