import { ArrowLeft, ArrowRight, Scale, AlertTriangle, CheckCircle, BookOpen, Shield, FileText, Users, Lightbulb, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';
import BS7671EmbeddedQuiz from '@/components/upskilling/BS7671EmbeddedQuiz';
const BS7671Module1Section1 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Is BS 7671 a statutory legal requirement in the UK?",
      options: [
        "Yes",
        "No, but it is treated as a standard for compliance",
        "Only in Scotland", 
        "Yes, under the Health & Safety Act"
      ],
      correct: 1,
      explanation: "BS 7671 is not law itself, but it's the accepted standard for demonstrating compliance with legal duties under EAWR."
    },
    {
      id: 2,
      question: "Which regulation is most directly linked to electrical safety at work?",
      options: [
        "The Building Act",
        "The Planning Regulations", 
        "Electricity at Work Regulations 1989",
        "Housing Standards Act"
      ],
      correct: 2,
      explanation: "EAWR 1989 places specific duties on electrical safety in the workplace and is directly linked to BS 7671 compliance."
    },
    {
      id: 3,
      question: "Who publishes BS 7671?",
      options: [
        "NICEIC",
        "JIB",
        "The IET and BSI",
        "Ofgem"
      ],
      correct: 2,
      explanation: "BS 7671 is published jointly by the Institution of Engineering and Technology (IET) and the British Standards Institution (BSI)."
    },
    {
      id: 4,
      question: "What happens if you don't follow BS 7671?",
      options: [
        "Nothing, it's only a guideline",
        "Automatic prosecution",
        "You may struggle to prove compliance with legal duties",
        "Only insurance is affected"
      ],
      correct: 2,
      explanation: "While BS 7671 isn't law, not following it makes it very difficult to demonstrate compliance with legal electrical safety duties."
    },
    {
      id: 5,
      question: "When must electrical work comply with BS 7671?",
      options: [
        "Only in commercial premises",
        "Only for new installations",
        "For all electrical installations covered by EAWR",
        "Only when specifically requested"
      ],
      correct: 2,
      explanation: "BS 7671 applies to electrical installations within its scope, both new and existing, to ensure compliance with EAWR."
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div>
        <Link to="../bs7671-module-1">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 1
          </Button>
        </Link>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Scale className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                  Purpose and Legal Status of BS 7671
                </h1>
                <p className="text-lg sm:text-xl text-white">
                  Understanding the regulatory framework and legal standing
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 1.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-white">
                25 minutes
              </Badge>
            </div>
          </div>

          {/* Introduction */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                BS 7671, more commonly referred to as the IET Wiring Regulations, is the foundation of all electrical installation work in the UK. But is it the law? Not quite. This section explains its legal standing — and why you still must comply.
              </p>
              <Alert className="bg-yellow-400/10 border-blue-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  Understanding the legal status of BS 7671 is crucial for every electrical professional — it affects your legal liability, insurance coverage, and professional responsibility.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                Learning Outcomes
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>By the end of this section, you should be able to:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand what BS 7671 is and who issues it
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Explain its relationship to UK law and regulations
                  </li>
                </ul>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Identify situations where compliance becomes legally mandatory
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    Understand the role of Electricity at Work Regulations (EAWR)
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* What is BS 7671 */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-6 w-6 text-yellow-400" />
                What is BS 7671?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <div className="space-y-4">
                <p className="text-base leading-relaxed">
                  BS 7671 is the national standard for electrical installation design, erection, and verification in the United Kingdom. It's issued jointly by the Institution of Engineering and Technology (IET) and the British Standards Institution (BSI).
                </p>
                
                <div className="bg-card p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-3">Full Title and Edition</h4>
                  <p className="text-sm italic text-white">
                    "Requirements for Electrical Installations - IET Wiring Regulations - Eighteenth Edition"
                  </p>
                  <p className="text-sm mt-2">
                    The 18th Edition came into effect on 1st January 2019, with Amendment 2 published in March 2022.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Key Characteristics</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• National standard for electrical installations</li>
                      <li>• Covers design, erection, and verification</li>
                      <li>• Based on IEC international standards</li>
                      <li>• Regularly updated to reflect technological advances</li>
                      <li>• Harmonised with European standards (CENELEC)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-3">Publishing Bodies</h4>
                    <ul className="space-y-2 text-sm">
                      <li>• <strong>IET:</strong> Institution of Engineering and Technology</li>
                      <li>• <strong>BSI:</strong> British Standards Institution</li>
                      <li>• Joint publication ensuring technical excellence</li>
                      <li>• Supported by industry experts and committees</li>
                      <li>• Regular review and amendment process</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Legal Status */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Scale className="h-6 w-6 text-yellow-400" />
                Legal Status of BS 7671
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <Alert className="bg-orange-600/10 border-orange-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Key Point:</strong> BS 7671 is NOT law in itself, but it's the accepted standard for demonstrating compliance with legal requirements.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Non-Statutory Status</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• BS 7671 is not written into statute law</li>
                    <li>• It's a voluntary standard technically</li>
                    <li>• No direct legal enforcement of BS 7671 itself</li>
                    <li>• Cannot be prosecuted purely for BS 7671 non-compliance</li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-white font-semibold text-lg">Practical Legal Reality</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Universally accepted industry standard</li>
                    <li>• Used by courts to assess competence</li>
                    <li>• Referenced in insurance policies</li>
                    <li>• Expected by regulatory bodies</li>
                  </ul>
                </div>
              </div>

              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">The Legal Paradox</h4>
                <p className="text-sm">
                  While BS 7671 isn't law, deviation from it in professional electrical work is almost impossible to justify legally. Courts, insurers, and regulatory bodies consistently use it as the benchmark for assessing whether electrical work meets required safety standards.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Link to Law */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="h-6 w-6 text-yellow-400" />
                Link to UK Law
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-6">
              <p className="text-base leading-relaxed">
                Under the Electricity at Work Regulations 1989 (EAWR), you have a legal duty to ensure electrical systems are safe and properly maintained. BS 7671 is the benchmark used by courts, HSE, and insurance companies to assess whether you've met that legal duty.
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">Primary Statutory Regulations</h4>
                  
                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded-lg border border-gray-600">
                      <div className="flex items-start gap-3">
                        <Scale className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-white font-semibold">Electricity at Work Regulations 1989</h5>
                          <p className="text-sm mt-1">
                            The primary legislation governing electrical safety at work. Regulation 4 requires systems to be constructed and maintained to prevent danger.
                          </p>
                          <ul className="text-xs mt-2 space-y-1">
                            <li>• Absolute duty - no "so far as reasonably practicable" defence</li>
                            <li>• Applies to all electrical work in workplaces</li>
                            <li>• BS 7671 compliance demonstrates due diligence</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-gray-600">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-white font-semibold">Building Regulations Part P</h5>
                          <p className="text-sm mt-1">
                            Specifically covers electrical safety in dwellings. Makes BS 7671 compliance mandatory for domestic electrical work.
                          </p>
                          <ul className="text-xs mt-2 space-y-1">
                            <li>• Statutory requirement for domestic installations</li>
                            <li>• Notifiable work must comply with BS 7671</li>
                            <li>• Building Control approval required</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-card p-4 rounded-lg border border-gray-600">
                      <div className="flex items-start gap-3">
                        <Users className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <h5 className="text-white font-semibold">Health & Safety at Work Act 1974</h5>
                          <p className="text-sm mt-1">
                            General duty of care for health and safety. Section 2 requires employers to ensure safe systems of work.
                          </p>
                          <ul className="text-xs mt-2 space-y-1">
                            <li>• Duty to employees and others affected by work</li>
                            <li>• "So far as reasonably practicable" defence available</li>
                            <li>• BS 7671 compliance shows reasonable precautions taken</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-semibold text-lg mb-4">How Courts Use BS 7671</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-red-600/10 p-4 rounded-lg">
                      <h5 className="text-white font-semibold mb-2">If You Don't Follow BS 7671</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Burden of proof shifts to you</li>
                        <li>• Must justify why departure was acceptable</li>
                        <li>• Higher standard of care expected</li>
                        <li>• Insurance may not cover claims</li>
                      </ul>
                    </div>
                    <div className="bg-green-600/10 p-4 rounded-lg">
                      <h5 className="text-white font-semibold mb-2">If You Follow BS 7671</h5>
                      <ul className="text-sm space-y-1">
                        <li>• Strong defence against prosecution</li>
                        <li>• Demonstrates professional competence</li>
                        <li>• Insurance coverage more likely</li>
                        <li>• Meets industry expectations</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Scenario */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-orange-500" />
                Real World Scenario
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
                <h4 className="text-white font-semibold mb-3">Case Study: Consumer Unit Upgrade Gone Wrong</h4>
                <div className="space-y-3">
                  <p className="text-sm">
                    <strong>Situation:</strong> An electrical contractor completes a consumer unit upgrade in a domestic property but doesn't install RCDs as required by BS 7671 for socket outlets. Six months later, a faulty appliance causes a shock incident when a resident touches a metal washing machine case.
                  </p>
                  
                  <p className="text-sm">
                    <strong>Investigation:</strong> HSE investigates the incident. They find:
                  </p>
                  <ul className="text-xs space-y-1 ml-4">
                    <li>• No RCD protection despite BS 7671 requirements</li>
                    <li>• Electrical Installation Certificate issued incorrectly</li>
                    <li>• Work did not comply with Building Regulations Part P</li>
                  </ul>
                  
                  <p className="text-sm">
                    <strong>Outcome:</strong> Contractor prosecuted under EAWR for failing to ensure electrical safety. Non-compliance with BS 7671 used as evidence of failing to meet required standards. Result: Criminal conviction, £15,000 fine, and £8,000 costs.
                  </p>
                </div>
              </div>
              
              <Alert className="bg-red-600/10 border-red-600/30">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="text-white">
                  <strong>Key Lesson:</strong> The contractor wasn't prosecuted for "breaking BS 7671" but for failing their legal duty under EAWR. BS 7671 non-compliance was the evidence used to prove they hadn't met required safety standards.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Professional Implications */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Users className="h-6 w-6 text-yellow-400" />
                Professional Implications
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Insurance and Liability</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Professional indemnity policies expect BS 7671 compliance</li>
                    <li>• Non-compliance may void insurance coverage</li>
                    <li>• Higher premiums for poor compliance history</li>
                    <li>• Warranty claims may be rejected</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Scheme Provider Requirements</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• NICEIC, NAPIT, etc. require BS 7671 compliance</li>
                    <li>• Regular assessments check compliance</li>
                    <li>• Non-compliance can lead to suspension</li>
                    <li>• Competent Person Scheme membership depends on it</li>
                  </ul>
                </div>
              </div>
              
              <div>
                <h4 className="text-white font-semibold mb-3">Business Impact</h4>
                <div className="bg-card p-4 rounded-lg">
                  <ul className="text-sm space-y-1">
                    <li>• Loss of professional reputation</li>
                    <li>• Difficulty obtaining public liability insurance</li>
                    <li>• Clients may specify BS 7671 compliance in contracts</li>
                    <li>• Competitive disadvantage against compliant contractors</li>
                    <li>• Potential criminal liability for directors/business owners</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* When BS 7671 Becomes Mandatory */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <ExternalLink className="h-6 w-6 text-yellow-400" />
                When BS 7671 Becomes Mandatory
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                While BS 7671 isn't statutory law, there are specific situations where compliance becomes a legal requirement:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-yellow-400/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Domestic Installations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Building Regulations Part P</li>
                    <li>• Notifiable work in dwellings</li>
                    <li>• New builds and extensions</li>
                    <li>• Consumer unit replacements</li>
                  </ul>
                </div>
                
                <div className="bg-green-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Commercial/Industrial</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Contract specifications</li>
                    <li>• Local authority requirements</li>
                    <li>• Planning conditions</li>
                    <li>• Licensing requirements</li>
                  </ul>
                </div>
                
                <div className="bg-purple-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Special Locations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Swimming pools</li>
                    <li>• Medical locations</li>
                    <li>• Marinas and boats</li>
                    <li>• Agricultural premises</li>
                  </ul>
                </div>
                
                <div className="bg-orange-600/10 p-4 rounded-lg">
                  <h4 className="text-white font-semibold mb-2">Professional Practice</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Competent Person Schemes</li>
                    <li>• Professional certification</li>
                    <li>• Insurance requirements</li>
                    <li>• Industry best practice</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Summary */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-6 w-6 text-green-500" />
                Section Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p className="text-base leading-relaxed">
                BS 7671 isn't law, but it's as close as you can get without it being statute. It's the measuring stick that the industry, courts, and insurance companies will use to check if you did things right. Don't just follow it — understand why it matters.
              </p>
              
              <div className="bg-card p-4 rounded-lg">
                <h4 className="text-yellow-400 font-semibold mb-3">Key Takeaways</h4>
                <ul className="space-y-2 text-sm">
                  <li>• BS 7671 is non-statutory but universally accepted as the industry standard</li>
                  <li>• Compliance demonstrates meeting legal duties under EAWR and other regulations</li>
                  <li>• Non-compliance significantly increases legal, professional, and financial risks</li>
                  <li>• Courts consistently use BS 7671 as the benchmark for assessing electrical competence</li>
                  <li>• Professional survival depends on understanding and following BS 7671</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Section */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                Knowledge Check Quiz
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <BS7671EmbeddedQuiz 
                questions={quizQuestions}
                description="Test your understanding of BS 7671's purpose and legal status with these 5 questions."
              />
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
            <div></div>
            <Link to="../bs7671-module-1-section-2" className="w-full sm:w-auto">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 w-full sm:w-auto">
                <span className="hidden sm:inline">Next Section: Scope and Application</span>
                <span className="sm:hidden">Next: Scope & Application</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BS7671Module1Section1;