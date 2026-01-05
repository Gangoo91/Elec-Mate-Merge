
import { ArrowLeft, Clock, Shield, AlertTriangle, FileText, Calendar, Building2, Home, Factory, Lightbulb } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import WhenIsInspectionRequiredQuiz from '@/components/upskilling/WhenIsInspectionRequiredQuiz';

const Module1Section3 = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../module-1">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Clock className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 1 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            When Is Inspection & Testing Required?
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-3xl">
            Circumstances and timescales requiring electrical inspection and testing procedures
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="space-y-4 sm:space-y-6">
          
          {/* Overview Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="h-6 w-6 text-yellow-400" />
                When Inspection & Testing Is Required
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Electrical inspection and testing is required at specific intervals and circumstances to ensure continued safety and compliance. The timing depends on the type of installation, its use, environmental conditions, and regulatory requirements.
              </p>
              <p className="text-base leading-relaxed">
                Understanding when inspection and testing is required is crucial for maintaining electrical safety and meeting legal obligations under various regulations.
              </p>
            </CardContent>
          </Card>

          {/* Types of Inspection Timing */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-yellow-400" />
                Types of Inspection & Testing Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-yellow-400" />
                    Initial Verification
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Before first use of new installation</li>
                    <li>• After major alterations or additions</li>
                    <li>• Following rewiring work</li>
                    <li>• New circuit installations</li>
                  </ul>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-green-400" />
                    Periodic Inspection
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• At recommended time intervals</li>
                    <li>• Based on installation type and use</li>
                    <li>• Environmental considerations</li>
                    <li>• Regulatory requirements</li>
                  </ul>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-orange-400" />
                    Condition Reports
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Change of occupancy</li>
                    <li>• Insurance requirements</li>
                    <li>• Property transactions</li>
                    <li>• Landlord obligations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Intervals Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-yellow-400" />
                Recommended Inspection Intervals
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left py-3 px-4 text-white font-semibold">Installation Type</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Maximum Interval</th>
                      <th className="text-left py-3 px-4 text-white font-semibold">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <Home className="h-4 w-4 text-yellow-400" />
                        Domestic installations
                      </td>
                      <td className="py-3 px-4">10 years</td>
                      <td className="py-3 px-4">May be reduced for high-risk areas</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-green-400" />
                        Commercial premises
                      </td>
                      <td className="py-3 px-4">5 years</td>
                      <td className="py-3 px-4">Offices, shops, general commercial</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4 flex items-center gap-2">
                        <Factory className="h-4 w-4 text-orange-400" />
                        Industrial installations
                      </td>
                      <td className="py-3 px-4">3 years</td>
                      <td className="py-3 px-4">Manufacturing, heavy industry</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4">Swimming pools</td>
                      <td className="py-3 px-4">1 year</td>
                      <td className="py-3 px-4">High-risk wet locations</td>
                    </tr>
                    <tr className="border-b border-gray-700">
                      <td className="py-3 px-4">Agricultural installations</td>
                      <td className="py-3 px-4">3 years</td>
                      <td className="py-3 px-4">Farms, livestock areas</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4">Caravans and mobile units</td>
                      <td className="py-3 px-4">3 years</td>
                      <td className="py-3 px-4">Mobile and temporary installations</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Specific Circumstances Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Specific Circumstances Requiring Inspection
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Immediate Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Safety concerns:</strong> Visible damage, burning smells, or electrical faults</li>
                    <li>• <strong className="text-white">After incidents:</strong> Following electrical accidents or near misses</li>
                    <li>• <strong className="text-white">Water damage:</strong> Flooding or significant water ingress</li>
                    <li>• <strong className="text-white">Fire damage:</strong> Even if electrical system appears undamaged</li>
                    <li>• <strong className="text-white">Vandalism:</strong> Damage to electrical equipment or cables</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Regulatory Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• <strong className="text-white">Change of occupancy:</strong> New tenants or property owners</li>
                    <li>• <strong className="text-white">Insurance requirements:</strong> As specified by insurance providers</li>
                    <li>• <strong className="text-white">Landlord obligations:</strong> Legal requirements for rental properties</li>
                    <li>• <strong className="text-white">Building regulations:</strong> Part P compliance verification</li>
                    <li>• <strong className="text-white">Health & Safety Executive:</strong> Following workplace incidents</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Factors Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Environmental Factors Affecting Frequency
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                Environmental conditions can significantly affect the recommended inspection intervals. Harsh conditions may require more frequent inspections:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Increased Frequency Required</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• High humidity or damp conditions</li>
                    <li>• Extreme temperatures (hot or cold)</li>
                    <li>• Corrosive atmospheres (chemicals, salt air)</li>
                    <li>• Vibration or mechanical stress</li>
                    <li>• Areas with high dust or contamination</li>
                    <li>• Outdoor or exposed installations</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Usage Considerations</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Heavy electrical loads</li>
                    <li>• Frequent switching operations</li>
                    <li>• Critical installations (hospitals, emergency services)</li>
                    <li>• Public access areas</li>
                    <li>• Installations with history of problems</li>
                    <li>• Temporary or construction installations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Timeline Requirements */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                Legal Timeline Requirements
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Landlord Obligations (England)</h4>
                <p className="text-sm leading-relaxed mb-2">
                  From 1st July 2020, landlords must ensure electrical installations in residential properties are inspected and tested at least every 5 years by a qualified person.
                </p>
                <p className="text-sm leading-relaxed">
                  A copy of the electrical safety report must be provided to tenants within 28 days of the inspection.
                </p>
              </div>
              <div className="bg-green-600/10 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Commercial Properties</h4>
                <p className="text-sm leading-relaxed">
                  Under the Electricity at Work Regulations 1989, employers must maintain electrical systems to prevent danger. This typically requires regular inspection and testing based on risk assessment.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes Section */}
          <Card className="bg-card border-transparent border-l-4 border-l-yellow-400">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Important Considerations
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Risk-Based Approach:</strong> The intervals shown are maximum recommendations. A risk assessment should always be carried out to determine if more frequent inspection is required for specific installations.
                </p>
              </div>
              <div className="bg-yellow-400/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Professional Judgement:</strong> Qualified electricians should use their professional judgement to recommend appropriate inspection intervals based on installation conditions and use.
                </p>
              </div>
              <div className="bg-red-600/10 p-4 rounded-lg">
                <p className="text-sm leading-relaxed">
                  <strong className="text-white">Documentation:</strong> All inspection and testing activities must be properly documented with appropriate certification issued in accordance with BS 7671.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Knowledge Checks */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Quick Knowledge Checks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 1: Domestic Intervals</h4>
                  <p className="text-sm">What's the maximum inspection interval for domestic installations?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">10 years (but may be reduced for high-risk areas or based on environmental conditions)</p>
                  </details>
                </div>
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 2: Special Locations</h4>
                  <p className="text-sm">How often should swimming pool installations be inspected?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Annually (1 year) due to the high-risk wet environment</p>
                  </details>
                </div>
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 3: Landlord Duties</h4>
                  <p className="text-sm">How often must landlords inspect rental properties in England?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Every 5 years (since July 2020 regulation)</p>
                  </details>
                </div>
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Check 4: Initial Verification</h4>
                  <p className="text-sm">When must initial verification be completed?</p>
                  <details className="mt-2">
                    <summary className="text-yellow-400 cursor-pointer text-sm">Show Answer</summary>
                    <p className="text-xs text-white mt-2">Before the installation is put into service</p>
                  </details>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Frequently Asked Questions */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="space-y-4">
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can inspection intervals be extended beyond the recommendations?</h4>
                  <p className="text-sm text-white">A: No, the published intervals are maximum recommendations. However, they can and should be reduced based on risk assessment, environmental conditions, usage patterns, or the condition of the installation.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Who determines when an installation needs inspection after an incident?</h4>
                  <p className="text-sm text-white">A: A competent person should assess the situation. For serious incidents involving potential damage (fire, flood, accident), inspection should be immediate. The HSE may also require inspection following workplace incidents.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: What happens if an inspection is overdue?</h4>
                  <p className="text-sm text-white">A: The installation may not comply with insurance requirements, landlord legal obligations, or workplace safety regulations. In extreme cases, it could result in prosecution, insurance claim rejection, or HSE enforcement action.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Do all installations need the same level of inspection?</h4>
                  <p className="text-sm text-white">A: No, the depth and frequency of inspection should be proportionate to the risk. Critical installations (hospitals, emergency services) may need more comprehensive and frequent inspection than low-risk domestic installations.</p>
                </div>
                <div className="border-b border-gray-600 pb-4">
                  <h4 className="text-white font-semibold mb-2">Q: Can I carry out my own periodic inspection if I'm competent?</h4>
                  <p className="text-sm text-white">A: While technically possible if you're competent, BS 7671 recommends that inspection should be carried out by someone other than the original installer where practicable, to ensure independence and objectivity.</p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Q: What's the difference between an inspection and a condition report?</h4>
                  <p className="text-sm text-white">A: Inspection is the process of examining the installation. A condition report (EICR) is the document that records the findings of a periodic inspection and testing, often required for specific purposes like change of occupancy or insurance.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-World Scenario */}
          <Card className="bg-yellow-400/10 border-blue-600/30">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Real-World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-yellow-400/20 p-4 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Scenario: Factory Inspection Scheduling</h4>
                <p className="text-sm mb-3">
                  You're managing electrical safety for a food processing factory with high humidity, frequent washdowns, and 24/7 operations. The last inspection was 2 years ago, and management wants to extend to the maximum 3-year interval to save costs.
                </p>
                <h5 className="text-white font-semibold mb-2">Risk Factors to Consider:</h5>
                <ul className="text-sm space-y-1">
                  <li>• High humidity and moisture from washdown procedures</li>
                  <li>• Continuous operation increasing wear and tear</li>
                  <li>• Food safety implications of electrical failures</li>
                  <li>• Potential for corrosion in aggressive environment</li>
                  <li>• Critical nature of electrical supply for refrigeration</li>
                </ul>
                <div className="mt-3 p-3 bg-yellow-600/20 rounded">
                  <p className="text-xs"><strong>Recommendation:</strong> Annual inspections would be more appropriate despite the 3-year maximum, due to the harsh environment and critical nature of the installation.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Test Your Knowledge - 10 Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white mb-6">
                Complete this comprehensive quiz to test your understanding of when inspection and testing is required. The quiz now contains 10 questions covering all key scenarios and requirements.
              </p>
              <WhenIsInspectionRequiredQuiz />
            </CardContent>
          </Card>

        </div>
      </main>
    </div>
  );
};

export default Module1Section3;
