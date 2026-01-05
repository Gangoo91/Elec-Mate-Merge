import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Smartphone } from 'lucide-react';

export const IntegrationAndControlFeaturesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-elec-yellow" />
          Integration and Control Features
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Modern smart heating systems offer extensive integration capabilities that enhance functionality and user experience through multiple control methods and intelligent features.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">App Control</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• System setup and configuration</li>
              <li>• Advanced scheduling options</li>
              <li>• Real-time monitoring</li>
              <li>• Energy usage reporting</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Voice Control</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Amazon Alexa integration</li>
              <li>• Google Assistant support</li>
              <li>• Apple Siri compatibility</li>
              <li>• Natural language commands</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-purple-600 rounded-lg p-4">
            <h4 className="font-semibold text-purple-200 mb-3">Smart Features</h4>
            <ul className="space-y-2 text-sm text-purple-100">
              <li>• Geofencing automation</li>
              <li>• AI learning algorithms</li>
              <li>• Weather compensation</li>
              <li>• Presence detection</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Energy Reporting</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Consumption tracking</li>
              <li>• Savings calculations</li>
              <li>• Usage trends analysis</li>
              <li>• Cost breakdowns</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};