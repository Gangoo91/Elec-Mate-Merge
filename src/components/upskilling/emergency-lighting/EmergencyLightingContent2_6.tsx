import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Users, FileText, Shield } from 'lucide-react';

export const EmergencyLightingContent2_6 = () => {
  return (
    <Card className="bg-elec-gray/50 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <FileText className="h-6 w-6 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        
        {/* Testing Schedules */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-xl font-semibold text-foreground">1. Testing Schedules</h3>
          </div>
          
          <p className="mb-4">
            BS 5266 outlines strict testing requirements for emergency lighting:
          </p>
          
          <div className="space-y-3 ml-4">
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
              <strong className="text-elec-yellow">Daily (visual check):</strong> Ensure central battery systems (if fitted) show no fault indicators.
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
              <strong className="text-elec-yellow">Monthly (functional test):</strong> Simulate a mains failure and check each luminaire operates from the emergency supply.
            </div>
            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-600">
              <strong className="text-elec-yellow">Annual (full-duration test):</strong> Simulate a mains failure for the full rated period (usually 3 hours) to confirm battery capacity.
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-foreground">
              ✅ <strong>Quick Check:</strong> How long must the annual full-duration test run for in most buildings?
            </p>
          </div>
        </div>

        {/* Responsibilities */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Users className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-xl font-semibold text-foreground">2. Responsibilities</h3>
          </div>
          
          <ul className="space-y-2 ml-4">
            <li>• Testing may be carried out by trained staff or contractors, but the duty holder (building owner, employer, or responsible person) is legally accountable</li>
            <li>• Electricians often perform or oversee the testing</li>
            <li>• Any faults must be reported immediately</li>
            <li>• Remedial works should be scheduled without delay</li>
          </ul>
          
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-foreground">
              ✅ <strong>Quick Check:</strong> Who holds ultimate responsibility for ensuring tests are carried out?
            </p>
          </div>
        </div>

        {/* Record Keeping */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <FileText className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-xl font-semibold text-foreground">3. Record Keeping Requirements</h3>
          </div>
          
          <p className="mb-4">
            All testing and maintenance must be recorded in an emergency lighting logbook, which should 
            be kept on-site for inspection. Each entry should include:
          </p>
          
          <ul className="space-y-2 ml-4">
            <li>• Date and time of the test</li>
            <li>• Name of the person carrying out the test</li>
            <li>• Test type (daily, monthly, annual)</li>
            <li>• Any faults found</li>
            <li>• Corrective action taken and date of completion</li>
          </ul>
          
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-foreground">
              ✅ <strong>Quick Check:</strong> What five details must be recorded in the emergency lighting logbook?
            </p>
          </div>
        </div>

        {/* Compliance */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-xl font-semibold text-foreground">4. Compliance and Inspection</h3>
          </div>
          
          <ul className="space-y-2 ml-4">
            <li>• Local authorities, insurers, and the fire service may request to see test records during inspections</li>
            <li>• Missing or incomplete records may invalidate insurance</li>
            <li>• The fire risk assessment will be judged partly on lighting system maintenance</li>
            <li>• Non-compliance may lead to fines or prosecution under the Fire Safety Order 2005</li>
          </ul>
          
          <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-4">
            <p className="text-foreground">
              ✅ <strong>Quick Check:</strong> Why can poor record keeping lead to legal penalties?
            </p>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
