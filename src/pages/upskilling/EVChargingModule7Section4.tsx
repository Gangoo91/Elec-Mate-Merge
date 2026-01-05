import { ArrowLeft, ArrowRight, Archive, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, FileText, Users, Calendar, Shield, Database, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule7Section4Quiz } from '@/components/upskilling/quiz/EVChargingModule7Section4Quiz';

const EVChargingModule7Section4 = () => {
  useEffect(() => {
    document.title = 'Audit-Readiness and Record-Keeping Best Practice - EV Charging Module 7 Section 4';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master comprehensive record-keeping systems and audit preparation for OZEV compliance and business excellence in EV charging installations.');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="px-4 sm:px-6 lg:px-8 pt-8 pb-8">
        <Link to="../ev-charging-module-7">
          <Button
            variant="ghost"
            className="bg-card text-white hover:bg-card/80 hover:text-yellow-400 transition-all duration-200 mb-6 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 7
          </Button>
        </Link>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Archive className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 4
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Audit-Readiness and Record-Keeping Best Practice
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Maintaining comprehensive records for compliance and audit excellence
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-4xl mx-auto space-y-8">

          {/* Introduction */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Introduction</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Comprehensive record-keeping and audit-readiness are fundamental requirements for OZEV approved installers. 
                This section provides detailed guidance on establishing robust documentation systems, maintaining compliance 
                records, and preparing for both routine and investigative audits.
              </p>
              <p>
                Effective record management not only ensures regulatory compliance but also protects business interests, 
                supports quality assurance, enables continuous improvement, and demonstrates professionalism to clients 
                and regulatory bodies. The systems and processes covered here form the backbone of a successful, compliant installation business.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Comprehensive Coverage</h4>
                <ul className="text-sm space-y-1">
                  <li>• Legal and regulatory record-keeping requirements</li>
                  <li>• Document management systems and digital archiving</li>
                  <li>• Audit preparation and response procedures</li>
                  <li>• Quality assurance and performance monitoring</li>
                  <li>• Data protection and information security</li>
                  <li>• Business continuity and disaster recovery</li>
                  <li>• Continuous improvement and lessons learned systems</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Learning Outcomes */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Learning Outcomes</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p className="mb-4">Upon completion of this section, you will be able to:</p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Establish comprehensive record-keeping systems for OZEV compliance</li>
                <li>Prepare effectively for OZEV audits and inspections</li>
                <li>Implement digital document management and archiving systems</li>
                <li>Understand legal requirements for record retention and data protection</li>
                <li>Develop quality assurance monitoring and reporting procedures</li>
                <li>Create business continuity plans for record preservation</li>
              </ul>
            </CardContent>
          </Card>

          {/* Legal and Regulatory Requirements */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Legal and Regulatory Record-Keeping Requirements</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">OZEV Compliance Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Mandatory Records</h5>
                      <ul className="space-y-1">
                        <li>• Installation certificates for all projects</li>
                        <li>• Customer contracts and agreements</li>
                        <li>• Equipment specifications and warranties</li>
                        <li>• Testing and commissioning results</li>
                        <li>• Training and qualification records</li>
                        <li>• Insurance certificates and renewals</li>
                        <li>• Complaint handling documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Retention Periods</h5>
                      <ul className="space-y-1">
                        <li>• Installation records: 10 years minimum</li>
                        <li>• Financial records: 7 years (HMRC requirement)</li>
                        <li>• Training certificates: Duration of validity + 2 years</li>
                        <li>• Insurance records: 7 years post-expiry</li>
                        <li>• Customer contracts: 7 years post-completion</li>
                        <li>• Audit records: 7 years minimum</li>
                        <li>• Health and safety records: 40 years (certain types)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Industry Standard Compliance</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">BS 7671 Requirements</h5>
                      <ul className="space-y-1">
                        <li>• Electrical Installation Certificates</li>
                        <li>• Periodic inspection records</li>
                        <li>• Test result documentation</li>
                        <li>• Schedule of circuits</li>
                        <li>• Risk assessment records</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">CDM Regulations</h5>
                      <ul className="space-y-1">
                        <li>• Pre-construction information</li>
                        <li>• Construction phase plans</li>
                        <li>• Health and safety files</li>
                        <li>• Risk assessment documents</li>
                        <li>• Method statements</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">ISO 9001 Quality</h5>
                      <ul className="space-y-1">
                        <li>• Quality manual and procedures</li>
                        <li>• Internal audit records</li>
                        <li>• Corrective action reports</li>
                        <li>• Management review minutes</li>
                        <li>• Customer satisfaction data</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Document Management Systems */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Database className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Digital Document Management Systems</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">System Architecture and Structure</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">File Organisation Structure</h5>
                      <ul className="space-y-1">
                        <li>• Master folder: Company_Documents</li>
                        <li>• Year folders: 2024, 2023, etc.</li>
                        <li>• Project folders: ProjectRef_ClientName</li>
                        <li>• Document categories: Pre-install, Installation, Post-install</li>
                        <li>• Version control: Document_v1, Document_v2</li>
                        <li>• Archive folder: Completed_Projects</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Metadata and Tagging</h5>
                      <ul className="space-y-1">
                        <li>• Project reference numbers</li>
                        <li>• Client name and contact details</li>
                        <li>• Installation date and location</li>
                        <li>• Equipment types and serial numbers</li>
                        <li>• Installer name and qualifications</li>
                        <li>• Document type and version</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Cloud Storage and Backup Solutions</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Primary Storage</h5>
                      <ul className="space-y-1">
                        <li>• Cloud-based document management</li>
                        <li>• Real-time synchronisation</li>
                        <li>• Multi-device access</li>
                        <li>• Automatic version control</li>
                        <li>• Search functionality</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Backup Strategy</h5>
                      <ul className="space-y-1">
                        <li>• 3-2-1 backup rule implementation</li>
                        <li>• Daily automated backups</li>
                        <li>• Off-site storage locations</li>
                        <li>• Monthly backup testing</li>
                        <li>• Recovery time objectives</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Security Measures</h5>
                      <ul className="space-y-1">
                        <li>• End-to-end encryption</li>
                        <li>• Multi-factor authentication</li>
                        <li>• Access control and permissions</li>
                        <li>• Audit trails and logging</li>
                        <li>• Regular security updates</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Audit Preparation and Response */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Audit Preparation and Response Procedures</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Pre-Audit Preparation Checklist</h4>
                  <div className="space-y-3">
                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">Document Review and Organisation</h5>
                        <p className="text-sm mb-2">Comprehensive review of all records and documentation</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Verify completeness of all project files</li>
                          <li>• Check document versions and currency</li>
                          <li>• Organise physical and digital archives</li>
                          <li>• Prepare document index and register</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">Compliance Verification</h5>
                        <p className="text-sm mb-2">Systematic check of regulatory and standard compliance</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Qualification and certification status</li>
                          <li>• Insurance coverage and validity</li>
                          <li>• Installation standard compliance</li>
                          <li>• Customer satisfaction records</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">Staff Briefing and Training</h5>
                        <p className="text-sm mb-2">Prepare team for audit interaction and procedures</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Audit process overview training</li>
                          <li>• Document location and access procedures</li>
                          <li>• Communication protocols during audit</li>
                          <li>• Escalation procedures for issues</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">During Audit Best Practices</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Professional Conduct</h5>
                      <ul className="space-y-1">
                        <li>• Designated audit liaison person</li>
                        <li>• Prompt response to auditor requests</li>
                        <li>• Honest and transparent communication</li>
                        <li>• Professional workspace preparation</li>
                        <li>• Refreshments and facilities provision</li>
                        <li>• Escort and security procedures</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Documentation Management</h5>
                      <ul className="space-y-1">
                        <li>• Rapid document retrieval systems</li>
                        <li>• Controlled access to sensitive information</li>
                        <li>• Document tracking and sign-out procedures</li>
                        <li>• Digital access and demonstration capability</li>
                        <li>• Backup systems availability</li>
                        <li>• Progress tracking and reporting</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Assurance and Performance Monitoring */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Quality Assurance and Performance Monitoring</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Key Performance Indicators (KPIs)</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Installation Quality</h5>
                      <ul className="space-y-1">
                        <li>• First-time installation success rate: &gt;95%</li>
                        <li>• Customer satisfaction score: &gt;4.5/5</li>
                        <li>• Defect rate: &lt;2% of installations</li>
                        <li>• Compliance score: 100%</li>
                        <li>• Rework incidents: &lt;1%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Service Delivery</h5>
                      <ul className="space-y-1">
                        <li>• Response time: &lt;24 hours</li>
                        <li>• Installation completion: Within agreed timeframe</li>
                        <li>• Documentation submission: &lt;48 hours</li>
                        <li>• Grant claim success rate: &gt;98%</li>
                        <li>• Call-back rate: &lt;3%</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Business Performance</h5>
                      <ul className="space-y-1">
                        <li>• Training compliance: 100%</li>
                        <li>• Insurance validity: Current</li>
                        <li>• Audit compliance: 100%</li>
                        <li>• Customer retention: &gt;90%</li>
                        <li>• Repeat business: &gt;30%</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Monitoring and Reporting Systems</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Data Collection</h5>
                      <ul className="space-y-1">
                        <li>• Automated installation tracking</li>
                        <li>• Customer feedback systems</li>
                        <li>• Financial performance monitoring</li>
                        <li>• Compliance status dashboards</li>
                        <li>• Quality incident logging</li>
                        <li>• Training record updates</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Reporting Frequency</h5>
                      <ul className="space-y-1">
                        <li>• Daily: Installation completion reports</li>
                        <li>• Weekly: Performance dashboard updates</li>
                        <li>• Monthly: KPI summary and trends</li>
                        <li>• Quarterly: Management review reports</li>
                        <li>• Annually: Strategic performance analysis</li>
                        <li>• Ad-hoc: Incident and investigation reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Protection and Security */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lock className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Data Protection and Information Security</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">GDPR Compliance Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Data Processing Principles</h5>
                      <ul className="space-y-1">
                        <li>• Lawfulness, fairness, and transparency</li>
                        <li>• Purpose limitation and data minimisation</li>
                        <li>• Accuracy and timely updates</li>
                        <li>• Storage limitation and retention policies</li>
                        <li>• Integrity and confidentiality</li>
                        <li>• Accountability and documentation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Subject Rights Management</h5>
                      <ul className="space-y-1">
                        <li>• Right to information and access</li>
                        <li>• Right to rectification and erasure</li>
                        <li>• Right to restrict processing</li>
                        <li>• Right to data portability</li>
                        <li>• Right to object to processing</li>
                        <li>• Breach notification procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Information Security Framework</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Access Control</h5>
                      <ul className="space-y-1">
                        <li>• Role-based access permissions</li>
                        <li>• Multi-factor authentication</li>
                        <li>• Regular access reviews</li>
                        <li>• Privileged account management</li>
                        <li>• Session timeout controls</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Data Encryption</h5>
                      <ul className="space-y-1">
                        <li>• At-rest encryption standards</li>
                        <li>• In-transit encryption protocols</li>
                        <li>• Key management procedures</li>
                        <li>• Certificate lifecycle management</li>
                        <li>• Encryption algorithm updates</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Monitoring and Logging</h5>
                      <ul className="space-y-1">
                        <li>• Security event monitoring</li>
                        <li>• Audit trail maintenance</li>
                        <li>• Intrusion detection systems</li>
                        <li>• Log analysis and reporting</li>
                        <li>• Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Business Continuity Planning */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Shield className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Business Continuity and Disaster Recovery</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Risk Assessment and Mitigation</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Identified Risks</h5>
                      <ul className="space-y-1">
                        <li>• Hardware failure and data loss</li>
                        <li>• Cyber security incidents</li>
                        <li>• Natural disasters and emergencies</li>
                        <li>• Staff absence and skill gaps</li>
                        <li>• Supplier and vendor failures</li>
                        <li>• Regulatory changes and compliance</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Mitigation Strategies</h5>
                      <ul className="space-y-1">
                        <li>• Redundant systems and backups</li>
                        <li>• Security awareness training</li>
                        <li>• Emergency response procedures</li>
                        <li>• Cross-training and documentation</li>
                        <li>• Supplier diversity and contracts</li>
                        <li>• Regulatory monitoring systems</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Recovery Procedures and Testing</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Recovery Time Objectives (RTO): 4 hours for critical systems</li>
                    <li>• Recovery Point Objectives (RPO): Maximum 1 hour data loss</li>
                    <li>• Quarterly disaster recovery testing and validation</li>
                    <li>• Annual business continuity plan review and update</li>
                    <li>• Staff training on emergency procedures</li>
                    <li>• Communication plans for stakeholders and clients</li>
                    <li>• Alternative working arrangements and remote access</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Audit Findings */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Common Audit Findings and Prevention</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Documentation Deficiencies</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Incomplete Project Files</h5>
                      <p className="text-sm mb-1">Missing documentation for some projects or incomplete record sets.</p>
                      <p className="text-sm text-green-300">✅ <strong>Prevention:</strong> Implement project file checklists and automated tracking systems to ensure completeness.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Outdated Qualification Records</h5>
                      <p className="text-sm mb-1">Expired certifications or missing training update records.</p>
                      <p className="text-sm text-green-300">✅ <strong>Prevention:</strong> Set up qualification expiry alerts and maintain continuous training schedules.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Poor Record Organisation</h5>
                      <p className="text-sm mb-1">Difficulty locating specific documents or inconsistent filing systems.</p>
                      <p className="text-sm text-green-300">✅ <strong>Prevention:</strong> Standardise document management systems with clear naming conventions and indexing.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Process and Procedure Gaps</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Inadequate Quality Control</h5>
                      <p className="text-sm mb-1">Lack of systematic quality checks or performance monitoring.</p>
                      <p className="text-sm text-green-300">✅ <strong>Prevention:</strong> Implement regular internal audits and continuous improvement processes.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Weak Customer Complaint Handling</h5>
                      <p className="text-sm mb-1">No formal complaint process or inadequate response tracking.</p>
                      <p className="text-sm text-green-300">✅ <strong>Prevention:</strong> Establish formal complaint procedures with documented resolution processes.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real World Example */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Real World Case Study</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-400 mb-3">Successful Audit: Premium Electrical Solutions</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Audit Preparation</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 6 weeks preparation time used</li>
                      <li>• Complete document review undertaken</li>
                      <li>• Digital archive system implemented</li>
                      <li>• Staff training on audit procedures</li>
                      <li>• Mock audit conducted internally</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-white mb-2">Audit Results</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Zero non-conformities identified</li>
                      <li>• 100% document availability achieved</li>
                      <li>• Exemplary record-keeping noted</li>
                      <li>• Continuous improvement recognised</li>
                      <li>• 3-year approval renewal granted</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-950/20 border border-green-800 rounded">
                  <p className="text-green-200 text-sm">
                    <strong>Outcome:</strong> The company received commendation for exceptional record-keeping standards 
                    and was selected as a case study example for other OZEV approved installers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule7Section4Quiz />

          <Separator className="bg-gray-700" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link to="../ev-charging-module-7-section-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <div></div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule7Section4;