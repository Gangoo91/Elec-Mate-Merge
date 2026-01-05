import { Book, CheckCircle, Calendar, Settings, AlertTriangle, Shield, Info, Target, Clock, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const RCDMaintenanceContent = () => {
  const learningObjectives = [
    "Understand BS 7671 maintenance requirements for RCD installations",
    "Develop comprehensive maintenance schedules and procedures",
    "Implement routine testing and inspection protocols",
    "Identify signs of RCD deterioration and aging",
    "Maintain compliance records and documentation",
    "Plan replacement strategies for aging RCD installations"
  ];

  const maintenanceSchedule = [
    { frequency: "Monthly", task: "Test button operation by users", responsibility: "Building users/occupants" },
    { frequency: "6 Monthly", task: "Visual inspection and basic function check", responsibility: "Competent person" },
    { frequency: "Annually", task: "Full electrical testing and calibration", responsibility: "Qualified electrician" },
    { frequency: "5 Years", task: "Comprehensive periodic inspection", responsibility: "Qualified electrician" },
    { frequency: "10 Years", task: "Replace or major overhaul consideration", responsibility: "Qualified electrician" }
  ];

  const complianceRequirements = [
    "Regular testing to BS 7671 Section 643.10",
    "Documentation of all maintenance activities",
    "Immediate rectification of identified defects",
    "Compliance with manufacturer recommendations",
    "Training for responsible persons",
    "Emergency response procedures"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Book className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* What is RCD Maintenance */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">RCD Maintenance Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed text-sm sm:text-base">
              RCD maintenance is essential for ensuring continued protection and compliance with BS 7671. Regular 
              maintenance prevents deterioration, identifies potential failures, and maintains optimal performance throughout the RCD's service life.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm sm:text-base">
                <strong>Remember:</strong> Proper maintenance extends RCD life, reduces failure risk, and ensures 
                continuous protection for users and installations.
              </p>
            </div>
          </div>
        </div>

        {/* Regulatory Framework */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Regulatory Framework</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <h4 className="text-blue-200 font-medium mb-2">BS 7671 Section 643.10</h4>
              <p className="text-foreground text-sm sm:text-base">
                The effectiveness of all RCDs shall be verified during initial verification and 
                at appropriate intervals thereafter as determined by the inspection schedule.
              </p>
            </div>
            <div className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
              <h4 className="text-yellow-200 font-medium mb-2">IET Guidance Note 3</h4>
              <p className="text-foreground text-sm sm:text-base">
                Provides detailed guidance on RCD testing frequencies, methods, and acceptance criteria 
                for ongoing verification and maintenance activities.
              </p>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-3">
              <h4 className="text-red-200 font-medium mb-2">CDM Regulations 2015</h4>
              <p className="text-foreground text-sm sm:text-base">
                Require duty holders to maintain safe electrical systems throughout the building's lifecycle, 
                including proper RCD maintenance and testing regimes.
              </p>
            </div>
          </div>
        </div>

        {/* Learning Objectives */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {learningObjectives.map((objective, index) => (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-blue-600/50">
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <p className="text-foreground text-sm sm:text-base">{objective}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Maintenance Schedule */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Comprehensive Maintenance Schedule</h3>
          <div className="bg-[#323232] rounded-lg p-4">
            <div className="space-y-3">
              {maintenanceSchedule.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-3 rounded bg-gray-600/10 border border-gray-600/20">
                  <div className="flex items-center gap-3 flex-1">
                    <Calendar className="h-5 w-5 text-elec-yellow flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                        <span className="font-medium text-foreground">{item.frequency}</span>
                        <span className="text-foreground text-sm sm:text-base">{item.task}</span>
                      </div>
                      <span className="text-foreground text-xs sm:text-sm">{item.responsibility}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 bg-blue-600/10 border border-blue-600/20 rounded p-3">
              <p className="text-foreground text-sm sm:text-base">
                <strong>Purpose:</strong> To ensure RCD reliability through structured preventive maintenance and timely intervention.
              </p>
            </div>
          </div>
        </div>

        {/* Types of Maintenance */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Types of Maintenance Activities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <CheckCircle className="h-6 w-6 text-green-400 mb-3" />
              <h4 className="text-green-200 font-medium mb-2">Preventive</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Scheduled inspections</li>
                <li>• Routine testing programs</li>
                <li>• Cleaning and lubrication</li>
                <li>• Environmental monitoring</li>
              </ul>
            </div>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <Settings className="h-6 w-6 text-blue-400 mb-3" />
              <h4 className="text-blue-200 font-medium mb-2">Corrective</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Fault investigation</li>
                <li>• Component replacement</li>
                <li>• Performance restoration</li>
                <li>• Upgrade implementation</li>
              </ul>
            </div>
            <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
              <Clock className="h-6 w-6 text-orange-400 mb-3" />
              <h4 className="text-orange-200 font-medium mb-2">Predictive</h4>
              <ul className="text-foreground text-sm sm:text-base space-y-1">
                <li>• Performance trending</li>
                <li>• Condition monitoring</li>
                <li>• Life cycle assessment</li>
                <li>• Replacement planning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Compliance Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Compliance Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {complianceRequirements.map((requirement, index) => (
                <div key={index} className="bg-yellow-600/10 border border-yellow-600/20 rounded p-3">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm sm:text-base">{requirement}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Aging and Deterioration */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">RCD Aging and Deterioration Factors</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
                <h4 className="text-red-200 font-medium mb-2">Environmental Factors</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Temperature cycling effects</li>
                  <li>• Humidity and moisture ingress</li>
                  <li>• Dust and contamination</li>
                  <li>• UV exposure and oxidation</li>
                  <li>• Electromagnetic interference</li>
                  <li>• Vibration and mechanical stress</li>
                </ul>
              </div>
              <div className="bg-orange-600/10 border border-orange-600/20 rounded p-4">
                <h4 className="text-orange-200 font-medium mb-2">Electrical Factors</h4>
                <ul className="text-foreground text-sm sm:text-base space-y-1">
                  <li>• Contact erosion from switching</li>
                  <li>• Magnetic circuit degradation</li>
                  <li>• Electronic component aging</li>
                  <li>• Insulation deterioration</li>
                  <li>• Thermal cycling stress</li>
                  <li>• Overvoltage exposure</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Maintenance Notes */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Important Maintenance Considerations</h3>
          <div className="space-y-3">
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-blue-200 font-medium mb-2">Record Keeping</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Maintain comprehensive records of all maintenance activities, test results, and observations 
                    for legal compliance and performance trending.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-red-200 font-medium mb-2">Safety During Maintenance</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Always follow safe isolation procedures and coordinate maintenance activities with 
                    building operations to prevent service disruption.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Wrench className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-green-200 font-medium mb-2">Competency Requirements</h4>
                  <p className="text-foreground text-sm sm:text-base">
                    Ensure all maintenance personnel are appropriately trained and qualified for the 
                    specific maintenance activities they perform.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default RCDMaintenanceContent;