import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Users, ClipboardCheck, FileSignature } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HandoverPurposeQuickCheck } from './HandoverPurposeQuickCheck';
import { HandoverDocumentationQuickCheck } from './HandoverDocumentationQuickCheck';
import { ClientTrainingQuickCheck } from './ClientTrainingQuickCheck';
import { SignOffTransferQuickCheck } from './SignOffTransferQuickCheck';

export const EmergencyLightingModule5Section6Technical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        
        {/* Section 1: Purpose of the Handover */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="w-8 h-8 rounded-full flex items-center justify-center bg-elec-yellow text-elec-dark flex-shrink-0 text-base font-bold">
              1
            </Badge>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Purpose of the Handover</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="border-l-4 border-green-500 bg-green-500/10 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <ClipboardCheck className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2 text-sm sm:text-base">Handover Ensures</h4>
                  <p className="text-sm sm:text-base text-foreground">
                    A successful handover guarantees that responsibility, knowledge, and compliance transfer properly from installer to client.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-5 rounded-lg space-y-3">
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-foreground">A successful handover ensures:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">✓</span>
                  <span className="text-sm sm:text-base lg:text-lg">The client fully understands how the system operates</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">✓</span>
                  <span className="text-sm sm:text-base lg:text-lg">All compliance documents are received and signed for</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">✓</span>
                  <span className="text-sm sm:text-base lg:text-lg">The building remains legally compliant after the contractor departs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 text-lg">✓</span>
                  <span className="text-sm sm:text-base lg:text-lg">Maintenance can continue seamlessly without gaps in responsibility</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-lg">
              <h4 className="text-amber-400 font-semibold mb-2 text-sm sm:text-base">💡 Professional Tip: Handover Protects Both Parties</h4>
              <p className="text-sm sm:text-base text-foreground">
                Without documented handover, installers remain liable for maintenance failures that occur after project completion. 
                A signed handover form clearly establishes when responsibility transferred to the client.
              </p>
            </div>

            <HandoverPurposeQuickCheck />
          </div>
        </div>

        {/* Section 2: Handover Documentation */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="w-8 h-8 rounded-full flex items-center justify-center bg-elec-yellow text-elec-dark flex-shrink-0 text-base font-bold">
              2
            </Badge>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Handover Documentation</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="border-l-4 border-blue-500 bg-blue-500/10 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2 text-sm sm:text-base">Complete Documentation Package</h4>
                  <p className="text-sm sm:text-base text-foreground">
                    All certification, drawings, instructions, and records must be compiled and handed to the client in both digital and printed formats.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base lg:text-lg">The following must be included in the handover package:</p>

            <div className="space-y-3">
              {[
                { 
                  title: "Commissioning Certificates", 
                  desc: "BS 5266-1 Annex G completion certificate confirming installation and testing compliance",
                  std: "BS 5266-1"
                },
                { 
                  title: "Electrical Installation Certificate", 
                  desc: "BS 7671 certificate or minor works certificate covering wiring and circuit integrity",
                  std: "BS 7671"
                },
                { 
                  title: "As-Built Layout Drawings", 
                  desc: "Showing luminaire positions, circuit routes, and emergency lighting zones",
                  std: "Required"
                },
                { 
                  title: "Emergency Lighting Logbook", 
                  desc: "With recorded test results from commissioning and blank entries for future monthly and annual tests",
                  std: "BS 5266-1"
                },
                { 
                  title: "Maintenance Instructions", 
                  desc: "Battery replacement intervals, cleaning procedures, and manufacturer specifications",
                  std: "Essential"
                },
                { 
                  title: "User Training Notes", 
                  desc: "Summary of testing procedures, fault indicators, and system operation guidance",
                  std: "Recommended"
                },
                { 
                  title: "Contact Details", 
                  desc: "For technical support, warranty claims, and emergency call-outs",
                  std: "Essential"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge className="w-7 h-7 rounded-full flex items-center justify-center bg-purple-500 text-foreground flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </Badge>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground text-sm sm:text-base">{item.title}</h4>
                        <Badge variant="outline" className="border-purple-500 text-purple-400 text-xs">
                          {item.std}
                        </Badge>
                      </div>
                      <p className="text-sm sm:text-base text-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-l-4 border-blue-500 bg-blue-500/10 p-4 rounded-r-lg">
              <h4 className="text-blue-400 font-semibold mb-2 text-sm sm:text-base">📋 Documentation Best Practice</h4>
              <p className="text-sm sm:text-base text-foreground">
                Provide the client with a clearly labelled folder or binder containing all documentation. Include a checklist 
                on the front page listing each document with tick boxes. This demonstrates professionalism and ensures nothing is missed.
              </p>
            </div>

            <HandoverDocumentationQuickCheck />
          </div>
        </div>

        {/* Section 3: Client Training and Demonstration */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="w-8 h-8 rounded-full flex items-center justify-center bg-elec-yellow text-elec-dark flex-shrink-0 text-base font-bold">
              3
            </Badge>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Client Training and Demonstration</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="border-l-4 border-purple-500 bg-purple-500/10 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <Users className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2 text-sm sm:text-base">On-Site Training Session</h4>
                  <p className="text-sm sm:text-base text-foreground">
                    Before leaving site, the installer or commissioning engineer must conduct a practical demonstration and training session with the client.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base lg:text-lg font-semibold">Before leaving site, the installer or commissioning engineer must:</p>

            <div className="space-y-3">
              {[
                "Demonstrate how to carry out monthly and annual tests",
                "Show how to operate any test key switches or monitoring systems",
                "Explain how to recognise fault indicators or charging lights",
                "Confirm who is responsible for recording tests in the logbook",
                "Advise on battery replacement intervals and general maintenance"
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-start gap-3">
                  <Badge className="w-6 h-6 rounded-full flex items-center justify-center bg-elec-yellow text-elec-dark flex-shrink-0 text-xs font-bold mt-0.5">
                    {index + 1}
                  </Badge>
                  <p className="text-sm sm:text-base lg:text-lg text-foreground">{item}</p>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 p-5 rounded-lg border border-purple-500/30">
              <h4 className="text-purple-400 font-semibold mb-3 text-sm sm:text-base">Training Checklist for Installers</h4>
              <div className="space-y-2 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">□</span>
                  <span className="text-foreground">Walk through escape routes, pointing out luminaire coverage</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">□</span>
                  <span className="text-foreground">Demonstrate monthly functional test procedure</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">□</span>
                  <span className="text-foreground">Show annual 3-hour duration test process</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">□</span>
                  <span className="text-foreground">Explain logbook entries and record-keeping</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">□</span>
                  <span className="text-foreground">Identify fault indicators and charging status lights</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-purple-400">□</span>
                  <span className="text-foreground">Provide emergency contact details for technical support</span>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-amber-500 bg-amber-500/10 p-4 rounded-r-lg">
              <h4 className="text-amber-400 font-semibold mb-2 text-sm sm:text-base">💡 Professional Tip: Video Training</h4>
              <p className="text-sm sm:text-base text-foreground">
                Consider recording a short video during the training session showing test procedures and system operation. 
                This provides the client with a permanent reference and demonstrates your professionalism.
              </p>
            </div>

            <ClientTrainingQuickCheck />
          </div>
        </div>

        {/* Section 4: Sign-Off and Responsibility Transfer */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Badge className="w-8 h-8 rounded-full flex items-center justify-center bg-elec-yellow text-elec-dark flex-shrink-0 text-base font-bold">
              4
            </Badge>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Sign-Off and Responsibility Transfer</h3>
          </div>
          
          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="border-l-4 border-red-500 bg-red-500/10 p-4 rounded-r-lg">
              <div className="flex items-start gap-3">
                <FileSignature className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-foreground font-semibold mb-2 text-sm sm:text-base">Legal Transfer of Responsibility</h4>
                  <p className="text-sm sm:text-base text-foreground">
                    The handover form signature marks the exact moment when legal responsibility for maintenance 
                    and testing transfers from the installer to the client's Responsible Person.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base lg:text-lg font-semibold">At the point of handover:</p>

            <div className="space-y-3">
              {[
                { 
                  title: "Installer Provides Documentation Package", 
                  desc: "Complete handover folder containing all certificates, drawings, logbook, and instructions"
                },
                { 
                  title: "Client Acknowledges Receipt", 
                  desc: "Responsible Person signs handover form confirming they have received and understood all documentation"
                },
                { 
                  title: "Responsibility Transfers", 
                  desc: "Legal responsibility for ongoing testing, maintenance, and compliance transfers to the client under Fire Safety Order 2005"
                },
                { 
                  title: "Installer Retains Records", 
                  desc: "Contractor keeps signed copy of handover record for minimum six years for professional liability protection"
                }
              ].map((item, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Badge className="w-7 h-7 rounded-full flex items-center justify-center bg-red-500 text-foreground flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </Badge>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm sm:text-base mb-1">{item.title}</h4>
                      <p className="text-sm sm:text-base text-foreground">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 p-5 rounded-lg border border-red-500/30">
              <h4 className="text-red-400 font-semibold mb-3 text-sm sm:text-base">⚠️ Essential Handover Form Contents</h4>
              <p className="text-sm sm:text-base text-foreground mb-3">
                The handover form (or handover certificate) must include:
              </p>
              <ul className="space-y-2 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  <span className="text-foreground">Project details: Address, client name, installation date</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  <span className="text-foreground">List of all documents provided</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  <span className="text-foreground">Confirmation of training provided</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  <span className="text-foreground">Client signature, name, and date</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  <span className="text-foreground">Installer signature, company details, and date</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400">•</span>
                  <span className="text-foreground">Statement confirming transfer of responsibility</span>
                </li>
              </ul>
            </div>

            <div className="border-l-4 border-red-500 bg-red-500/10 p-4 rounded-r-lg">
              <h4 className="text-red-400 font-semibold mb-2 text-sm sm:text-base">⚠️ Legal Liability Warning</h4>
              <p className="text-sm sm:text-base text-foreground">
                Without a signed handover form, installers can be held liable for maintenance failures and compliance 
                breaches that occur months or years after project completion. Always obtain written acknowledgement of handover.
              </p>
            </div>

            <SignOffTransferQuickCheck />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
