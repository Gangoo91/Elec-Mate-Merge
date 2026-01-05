import { Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section4Notifications = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Bell className="h-6 w-6 text-blue-500" />
          2. Mobile Notifications and Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
          <h4 className="text-foreground font-semibold mb-3">Push Notification System</h4>
          <p className="text-sm mb-3">
            Smart devices can send push notifications for key events (motion detected, door opened, 
            alarm triggered). These instant alerts keep homeowners informed of important activities 
            even when they're away from home, providing peace of mind and enabling rapid response.
          </p>
          <p className="text-sm">
            Alerts can be customised — e.g., "Send me an alert if the front door is unlocked after 10 pm." 
            Some systems support email or SMS alerts as backup communication methods.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Alert Types and Triggers</h4>
            <div className="space-y-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Security Alerts</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Unauthorised door/window opening</li>
                  <li>• Motion detected when system armed</li>
                  <li>• Camera tampering or offline status</li>
                  <li>• Alarm system activation or fault</li>
                </ul>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Environmental Alerts</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Smoke or carbon monoxide detection</li>
                  <li>• Water leak sensor activation</li>
                  <li>• Temperature extremes detected</li>
                  <li>• Air quality threshold exceeded</li>
                </ul>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">System Status Alerts</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Low battery warnings</li>
                  <li>• Device offline notifications</li>
                  <li>• Network connectivity issues</li>
                  <li>• Routine maintenance reminders</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Notification Customisation</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-purple-400 font-semibold text-sm mb-1">Timing Controls</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Schedule-based notification windows</li>
                  <li>• Do-not-disturb periods</li>
                  <li>• Priority levels for different alerts</li>
                  <li>• Snooze and delay options</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-blue-400 font-semibold text-sm mb-1">Delivery Methods</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Push notifications to mobile app</li>
                  <li>• Email alerts with detailed logs</li>
                  <li>• SMS messages for critical events</li>
                  <li>• In-app notification history</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-green-400 font-semibold text-sm mb-1">Advanced Features</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Geofencing-based notifications</li>
                  <li>• Multi-user alert distribution</li>
                  <li>• Integration with third-party services</li>
                  <li>• Rich media notifications (photos/video)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Notification Best Practices</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Setup Guidelines:</p>
              <ul className="text-xs space-y-1">
                <li>• Start with essential alerts only</li>
                <li>• Test all notification methods</li>
                <li>• Set appropriate priority levels</li>
                <li>• Configure backup delivery options</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Avoiding Alert Fatigue:</p>
              <ul className="text-xs space-y-1">
                <li>• Filter out routine status updates</li>
                <li>• Group similar alerts together</li>
                <li>• Use smart notification grouping</li>
                <li>• Regular review and adjustment</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Emergency Protocols:</p>
              <ul className="text-xs space-y-1">
                <li>• Ensure critical alerts always deliver</li>
                <li>• Multiple contact methods for security</li>
                <li>• Test emergency notification paths</li>
                <li>• Keep contact information updated</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};