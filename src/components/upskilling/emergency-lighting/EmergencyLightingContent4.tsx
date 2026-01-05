import { Book, Scale, FileText, CheckSquare, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingContent4 = () => {
  return (
    <div className="space-y-6">
      {/* BS 5266-1:2016 Overview */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Book className="h-5 w-5 text-blue-400 drop-shadow-md" />
            BS 5266-1:2016 - Emergency Lighting Code of Practice
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <p className="text-gray-300">
            BS 5266-1:2016 is the comprehensive British Standard providing guidance on the provision and installation of emergency lighting systems for premises other than dwellings.
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-blue-300 font-semibold">Key Sections of BS 5266-1</h4>
              <div className="space-y-2 text-sm">
                <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                  <p><strong>Section 4:</strong> Risk assessment and emergency lighting strategy</p>
                </div>
                <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                  <p><strong>Section 5:</strong> System design criteria and illumination levels</p>
                </div>
                <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                  <p><strong>Section 6:</strong> Installation requirements and best practices</p>
                </div>
                <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                  <p><strong>Section 7:</strong> Commissioning and handover procedures</p>
                </div>
                <div className="p-2 bg-blue-500/10 border-l-2 border-blue-500 rounded">
                  <p><strong>Section 8:</strong> Operation, testing, and maintenance</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-green-300 font-semibold">Coverage and Scope</h4>
              <div className="space-y-2 text-sm">
                <p>• All non-domestic premises requiring emergency lighting</p>
                <p>• Design methodologies and calculation procedures</p>
                <p>• Equipment selection and specification criteria</p>
                <p>• Installation, commissioning, and handover requirements</p>
                <p>• Ongoing testing, maintenance, and record-keeping</p>
                <p>• Integration with fire alarm and building management systems</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Related Standards */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-purple-400 drop-shadow-md" />
            Related Standards and Regulations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-purple-300 font-semibold">European Standards</h4>
              <div className="space-y-3">
                <div className="p-3 bg-purple-500/10 border border-purple-500/40 rounded">
                  <p className="font-medium text-purple-200">BS EN 1838:2013</p>
                  <p className="text-sm">Emergency lighting photometric requirements and measurement methods</p>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/40 rounded">
                  <p className="font-medium text-purple-200">BS EN 50172:2004</p>
                  <p className="text-sm">Emergency escape lighting systems - Operation and testing requirements</p>
                </div>
                <div className="p-3 bg-purple-500/10 border border-purple-500/40 rounded">
                  <p className="font-medium text-purple-200">BS EN 60598-2-22:2014</p>
                  <p className="text-sm">Luminaires - Safety requirements for emergency lighting</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-amber-300 font-semibold">UK Regulations</h4>
              <div className="space-y-3">
                <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded">
                  <p className="font-medium text-amber-200">Building Regulations (England & Wales)</p>
                  <p className="text-sm">Approved Document B - Fire Safety provisions and escape lighting</p>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded">
                  <p className="font-medium text-amber-200">Regulatory Reform (Fire Safety) Order 2005</p>
                  <p className="text-sm">Legal duties for responsible persons and fire risk assessments</p>
                </div>
                <div className="p-3 bg-amber-500/10 border border-amber-500/40 rounded">
                  <p className="font-medium text-amber-200">The Workplace Regulations 1992</p>
                  <p className="text-sm">Emergency lighting requirements in places of work</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Testing and Maintenance Standards */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-green-400 drop-shadow-md" />
            Testing and Maintenance Standards
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-green-300 font-semibold">BS 5266-8:2004</h4>
              <p className="text-sm">Code of practice for the periodic inspection and testing of emergency lighting systems</p>
              <div className="space-y-2 text-sm mt-3">
                <div className="p-2 bg-green-500/10 border-l-2 border-green-500 rounded">
                  <p><strong>Daily:</strong> Visual inspection of indicator lights and signage</p>
                </div>
                <div className="p-2 bg-green-500/10 border-l-2 border-green-500 rounded">
                  <p><strong>Monthly:</strong> Brief functional test (switch test) for short duration</p>
                </div>
                <div className="p-2 bg-green-500/10 border-l-2 border-green-500 rounded">
                  <p><strong>Annually:</strong> Full duration test and comprehensive inspection</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-teal-300 font-semibold">BS EN 50172:2004</h4>
              <p className="text-sm">Emergency escape lighting systems - Operation and testing procedures</p>
              <div className="space-y-2 text-sm mt-3">
                <p>• Defines testing frequencies and procedures</p>
                <p>• Specifies record-keeping requirements</p>
                <p>• Covers both manual and automatic testing systems</p>
                <p>• Includes fault-finding and remedial actions</p>
                <p>• Integration with building management systems</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Framework */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5 text-indigo-400 drop-shadow-md" />
            Compliance Framework and Documentation
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-indigo-600/20 to-indigo-800/10 border border-indigo-500/40 rounded-lg">
              <h4 className="text-indigo-300 font-semibold mb-2">Design Phase</h4>
              <div className="text-sm space-y-1">
                <p>• Risk assessment documentation</p>
                <p>• Lighting calculations and layouts</p>
                <p>• Equipment specifications</p>
                <p>• Installation drawings</p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg">
              <h4 className="text-green-300 font-semibold mb-2">Installation Phase</h4>
              <div className="text-sm space-y-1">
                <p>• Installation certificates</p>
                <p>• Commissioning records</p>
                <p>• Initial test results</p>
                <p>• Handover documentation</p>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-amber-600/20 to-amber-800/10 border border-amber-500/40 rounded-lg">
              <h4 className="text-amber-300 font-semibold mb-2">Operation Phase</h4>
              <div className="text-sm space-y-1">
                <p>• Test and maintenance logs</p>
                <p>• Fault records and repairs</p>
                <p>• Modification records</p>
                <p>• Training documentation</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gradient-to-r from-red-600/20 to-red-800/20 border border-red-500/40 rounded-lg">
            <h4 className="text-red-300 font-semibold mb-2 flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Legal Compliance Requirements
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium text-red-200 mb-1">Responsible Person Duties:</p>
                <p>• Ensure adequate emergency lighting provision</p>
                <p>• Conduct regular risk assessments</p>
                <p>• Maintain systems in working order</p>
                <p>• Keep comprehensive records</p>
              </div>
              <div>
                <p className="font-medium text-red-200 mb-1">Enforcement and Penalties:</p>
                <p>• Fire and Rescue Service inspections</p>
                <p>• Improvement notices for non-compliance</p>
                <p>• Prohibition notices for serious risks</p>
                <p>• Criminal prosecution for serious breaches</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Standard Hierarchy and Relationships */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Scale className="h-5 w-5 text-cyan-400 drop-shadow-md" />
            Standard Hierarchy and Relationships
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 text-cyan-300">Level</th>
                  <th className="text-left p-3 text-cyan-300">Standard/Regulation</th>
                  <th className="text-left p-3 text-cyan-300">Scope</th>
                  <th className="text-left p-3 text-cyan-300">Legal Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-600">
                <tr>
                  <td className="p-3 font-medium text-red-300">Primary</td>
                  <td className="p-3">Fire Safety Order 2005</td>
                  <td className="p-3">Legal framework and duties</td>
                  <td className="p-3">Statutory requirement</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-amber-300">Primary</td>
                  <td className="p-3">Building Regulations</td>
                  <td className="p-3">New builds and major alterations</td>
                  <td className="p-3">Statutory requirement</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-blue-300">Supporting</td>
                  <td className="p-3">BS 5266-1:2016</td>
                  <td className="p-3">Design and installation guidance</td>
                  <td className="p-3">Best practice standard</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-green-300">Technical</td>
                  <td className="p-3">BS EN 1838:2013</td>
                  <td className="p-3">Photometric requirements</td>
                  <td className="p-3">Technical specification</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium text-purple-300">Technical</td>
                  <td className="p-3">BS 5266-8:2004</td>
                  <td className="p-3">Testing and maintenance</td>
                  <td className="p-3">Procedural guidance</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/40 rounded">
            <p className="text-cyan-200 text-sm">
              <strong>Key Principle:</strong> Standards work together as a hierarchy - statutory regulations provide the legal framework, 
              while British Standards offer detailed technical guidance on how to achieve compliance.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};