import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings } from 'lucide-react';

export const HandsOnLightingConfigurationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Hands-On Configuration Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Step-by-step setup procedures for common smart lighting installations:
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">Smart Bulb Setup Process</h4>
            <ol className="text-sm text-blue-100 space-y-1 list-decimal list-inside">
              <li>Install bulb in existing fitting (power OFF)</li>
              <li>Power on and confirm bulb enters pairing mode</li>
              <li>Open manufacturer app (Hue, LIFX, etc.)</li>
              <li>Follow app discovery process</li>
              <li>Test basic on/off and dimming</li>
              <li>Configure scenes and automations</li>
              <li>Add to voice assistants if required</li>
            </ol>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">Smart Switch Installation</h4>
            <ol className="text-sm text-green-100 space-y-1 list-decimal list-inside">
              <li><strong>Safety first:</strong> Isolate circuit at consumer unit</li>
              <li>Remove existing switch and check wiring</li>
              <li>Identify live, neutral (if present), and switch wires</li>
              <li>Connect smart switch according to manufacturer diagram</li>
              <li>Secure in backbox and restore power</li>
              <li>Test manual operation before app setup</li>
              <li>Pair with hub/app and configure scenes</li>
            </ol>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">Basic Scene Configuration</h4>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• <strong>Morning scene:</strong> Gradual brightness increase, warm white</li>
              <li>• <strong>Evening scene:</strong> Dimmed lighting, warmer temperature</li>
              <li>• <strong>Movie scene:</strong> Reduced brightness, bias lighting only</li>
              <li>• <strong>Away scene:</strong> Random activation patterns for security</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-2">Motion Integration Setup</h4>
            <ol className="text-sm text-orange-100 space-y-1 list-decimal list-inside">
              <li>Position sensors with clear detection zones</li>
              <li>Configure detection sensitivity and timing</li>
              <li>Set different behaviours for day/night</li>
              <li>Test activation patterns and adjust delays</li>
              <li>Program override capabilities for manual control</li>
            </ol>
          </div>
        </div>

        <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
          <h4 className="font-semibold text-yellow-200 mb-2">⚠️ Safety Reminders</h4>
          <ul className="text-sm text-yellow-100 space-y-1">
            <li>• Always isolate circuits before electrical work</li>
            <li>• Check compatibility with existing dimmer loads</li>
            <li>• Verify neutral wire presence before smart switch installation</li>
            <li>• Test all functions before leaving site</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};