import { ArrowLeft, ArrowRight, Upload, BookOpen, Target, AlertTriangle, CheckCircle, Lightbulb, FileText, Users, Calendar, Camera, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { EVChargingModule7Section3Quiz } from '@/components/upskilling/quiz/EVChargingModule7Section3Quiz';

const EVChargingModule7Section3 = () => {
  useEffect(() => {
    document.title = 'Uploading Documents and Claiming Grants - EV Charging Module 7 Section 3';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Master the grant application process including document upload, evidence submission, and successful grant claims for EV charging installations.');
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
            <Upload className="h-8 w-8 text-yellow-400" />
            <Badge 
              variant="secondary" 
              className="bg-yellow-600/40 text-yellow-400 hover:bg-yellow-600/50 font-semibold text-sm px-3 py-1 border-0"
            >
              Module 7 - Section 3
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            Uploading Documents and Claiming Grants
          </h1>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl">
            Grant application processes and document submission for successful funding claims
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
                Successfully claiming OZEV grants requires meticulous documentation and evidence submission. 
                This section provides comprehensive guidance on the document upload process, evidence requirements, 
                and grant claiming procedures to ensure maximum success rates and timely payments.
              </p>
              <p>
                Understanding the specific documentation requirements, digital submission processes, and quality 
                standards is crucial for installers to maintain their approved status and secure grant funding 
                for their clients efficiently and reliably.
              </p>
              
              <div className="bg-card/80 p-4 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Section Coverage</h4>
                <ul className="text-sm space-y-1">
                  <li>• Document preparation and quality standards</li>
                  <li>• OZEV portal navigation and upload procedures</li>
                  <li>• Evidence requirements for different grant types</li>
                  <li>• Grant claim submission processes</li>
                  <li>• Common submission errors and solutions</li>
                  <li>• Payment processing and follow-up procedures</li>
                  <li>• Record retention and compliance requirements</li>
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
                <li>Prepare and submit high-quality documentation for grant applications</li>
                <li>Navigate the OZEV portal efficiently for document uploads</li>
                <li>Understand evidence requirements for successful grant claims</li>
                <li>Manage the grant claim process from submission to payment</li>
                <li>Avoid common documentation errors that delay payments</li>
                <li>Maintain comprehensive records for audit and compliance purposes</li>
              </ul>
            </CardContent>
          </Card>

          {/* Document Preparation Standards */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Document Preparation Standards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Digital Document Quality Requirements</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Technical Specifications</h5>
                      <ul className="space-y-1">
                        <li>• File format: PDF (preferred) or high-res JPEG</li>
                        <li>• Resolution: Minimum 300 DPI for scanned documents</li>
                        <li>• File size: Maximum 10MB per document</li>
                        <li>• Colour: Full colour for photos, greyscale acceptable for text</li>
                        <li>• Orientation: Correct orientation, no rotation required</li>
                        <li>• Clarity: All text must be clearly legible</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Content Requirements</h5>
                      <ul className="space-y-1">
                        <li>• Complete documents - no partial pages</li>
                        <li>• All corners and edges visible</li>
                        <li>• No shadows or distortion</li>
                        <li>• Watermarks and security features visible</li>
                        <li>• Date stamps clearly readable</li>
                        <li>• Professional presentation quality</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Naming Conventions and Organisation</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">File Naming</h5>
                      <ul className="space-y-1">
                        <li>• Project reference number</li>
                        <li>• Document type identifier</li>
                        <li>• Date in YYYY-MM-DD format</li>
                        <li>• Version number if applicable</li>
                        <li>• Example: WCS2024001_EIC_2024-03-15_v1.pdf</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Document Categories</h5>
                      <ul className="space-y-1">
                        <li>• Pre-installation evidence</li>
                        <li>• Installation documentation</li>
                        <li>• Testing and certification</li>
                        <li>• Financial documentation</li>
                        <li>• Photographic evidence</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Version Control</h5>
                      <ul className="space-y-1">
                        <li>• Initial submission: v1</li>
                        <li>• Revised documents: v2, v3, etc.</li>
                        <li>• Final approved: v_FINAL</li>
                        <li>• Superseded documents clearly marked</li>
                        <li>• Change log maintained</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* OZEV Portal Navigation */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Upload className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">OZEV Portal Navigation and Upload Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Portal Access and Security</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Account Management</h5>
                      <ul className="space-y-1">
                        <li>• Secure login credentials required</li>
                        <li>• Two-factor authentication enabled</li>
                        <li>• Session timeout after 30 minutes inactivity</li>
                        <li>• Regular password updates required</li>
                        <li>• Account lockout after failed attempts</li>
                        <li>• Data protection compliance maintained</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">User Permissions</h5>
                      <ul className="space-y-1">
                        <li>• Primary account holder: Full access</li>
                        <li>• Delegate users: Limited upload rights</li>
                        <li>• View-only access for stakeholders</li>
                        <li>• Audit trail for all actions</li>
                        <li>• Permission changes logged</li>
                        <li>• Access review requirements</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Step-by-Step Upload Process</h4>
                  <div className="space-y-3">
                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">Project Selection</h5>
                        <p className="text-sm mb-2">Navigate to the specific project or application</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Select active project from dashboard</li>
                          <li>• Verify project details and status</li>
                          <li>• Check outstanding document requirements</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">Document Category Selection</h5>
                        <p className="text-sm mb-2">Choose appropriate document type from dropdown menu</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Pre-installation documentation</li>
                          <li>• Installation certificates</li>
                          <li>• Photographic evidence</li>
                          <li>• Financial documentation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">File Upload and Validation</h5>
                        <p className="text-sm mb-2">Upload documents and complete validation checks</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Drag and drop or browse for files</li>
                          <li>• Automatic file validation</li>
                          <li>• Error checking and correction</li>
                          <li>• Preview and confirmation</li>
                        </ul>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        4
                      </div>
                      <div className="flex-1">
                        <h5 className="font-semibold text-white mb-1">Submission and Confirmation</h5>
                        <p className="text-sm mb-2">Final submission with confirmation receipt</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Review all uploaded documents</li>
                          <li>• Submit for OZEV review</li>
                          <li>• Receive confirmation reference</li>
                          <li>• Email notification sent</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Evidence Requirements by Grant Type */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Evidence Requirements by Grant Type</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Workplace Charging Scheme (WCS) Evidence</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Mandatory Documents</h5>
                      <ul className="space-y-1">
                        <li>• Electrical Installation Certificate (EIC)</li>
                        <li>• Installation photos (before/during/after)</li>
                        <li>• Equipment serial numbers and specifications</li>
                        <li>• Commissioning test results</li>
                        <li>• Final invoice with itemised costs</li>
                        <li>• Proof of payment to installer</li>
                        <li>• Site plan showing charging point locations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Supporting Evidence</h5>
                      <ul className="space-y-1">
                        <li>• DNO approval letter (if required)</li>
                        <li>• Building control approval</li>
                        <li>• Health and safety risk assessment</li>
                        <li>• User manual and warranty documents</li>
                        <li>• Smart charging capability confirmation</li>
                        <li>• Network connectivity test results</li>
                        <li>• Parking bay marking/signage photos</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Electric Vehicle Homecharge Scheme (EVHS) Evidence</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Installation Evidence</h5>
                      <ul className="space-y-1">
                        <li>• Electrical Installation Certificate</li>
                        <li>• Photos showing off-street parking</li>
                        <li>• Charge point installation photos</li>
                        <li>• Equipment specification sheets</li>
                        <li>• Testing and commissioning reports</li>
                        <li>• Customer declaration form</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Vehicle Evidence</h5>
                      <ul className="space-y-1">
                        <li>• Vehicle registration document (V5C)</li>
                        <li>• Lease agreement (if applicable)</li>
                        <li>• Insurance certificate showing EV</li>
                        <li>• MOT certificate (if applicable)</li>
                        <li>• Purchase/lease invoice</li>
                        <li>• Delivery confirmation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Photographic Evidence Standards */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Camera className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Photographic Evidence Standards</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Photo Quality Requirements</h4>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Technical Quality</h5>
                      <ul className="space-y-1">
                        <li>• Minimum 2MP resolution</li>
                        <li>• Good lighting conditions</li>
                        <li>• Sharp focus throughout</li>
                        <li>• No motion blur</li>
                        <li>• Colour accuracy</li>
                        <li>• Minimal digital noise</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Composition Standards</h5>
                      <ul className="space-y-1">
                        <li>• Full equipment visible</li>
                        <li>• Context of installation clear</li>
                        <li>• Multiple angles provided</li>
                        <li>• Scale reference included</li>
                        <li>• Background uncluttered</li>
                        <li>• Professional presentation</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Metadata Requirements</h5>
                      <ul className="space-y-1">
                        <li>• Date and time stamp</li>
                        <li>• GPS coordinates (if available)</li>
                        <li>• Camera/device information</li>
                        <li>• File integrity preserved</li>
                        <li>• No digital manipulation</li>
                        <li>• Original file format</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Required Photo Sequences</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Pre-Installation</h5>
                      <ul className="space-y-1">
                        <li>• Site overview showing parking area</li>
                        <li>• Electrical supply point location</li>
                        <li>• Existing electrical installation</li>
                        <li>• Access route and obstacles</li>
                        <li>• Utility services locations</li>
                        <li>• Site safety hazards identification</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Post-Installation</h5>
                      <ul className="space-y-1">
                        <li>• Completed charging point installation</li>
                        <li>• Electrical connections and terminations</li>
                        <li>• Protective devices and labelling</li>
                        <li>• Cable routes and supports</li>
                        <li>• Signage and markings</li>
                        <li>• Final site condition and tidiness</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Grant Claim Submission Process */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Download className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Grant Claim Submission Process</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Claim Submission Timeline</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Critical Deadlines</h5>
                      <ul className="space-y-1">
                        <li>• Installation completion: Within 6 months of approval</li>
                        <li>• Evidence submission: Within 30 days of completion</li>
                        <li>• Document upload: Within 14 days of evidence submission</li>
                        <li>• Response to queries: Within 7 days of receipt</li>
                        <li>• Final claim deadline: 60 days post-installation</li>
                        <li>• Appeals deadline: 30 days from rejection</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-yellow-400 mb-1">Processing Times</h5>
                      <ul className="space-y-1">
                        <li>• Initial review: 5-10 working days</li>
                        <li>• Technical assessment: 10-15 working days</li>
                        <li>• Additional information requests: 3-5 days</li>
                        <li>• Final approval: 2-5 working days</li>
                        <li>• Payment processing: 10-15 working days</li>
                        <li>• Total process: 4-8 weeks typical</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Financial Documentation Requirements</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Itemised invoice showing equipment and labour costs separately</li>
                    <li>• VAT breakdown clearly shown (if applicable)</li>
                    <li>• Payment confirmation (bank statement or receipt)</li>
                    <li>• Equipment purchase invoices from suppliers</li>
                    <li>• Any additional costs (DNO charges, planning fees)</li>
                    <li>• Credit note handling for any adjustments</li>
                    <li>• Currency conversion rates (for imported equipment)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Errors and Solutions */}
          <Card className="bg-card border-gray-700">
            <CardHeader>
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-yellow-400" />
                <CardTitle className="text-white">Common Submission Errors and Solutions</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <div className="space-y-4">
                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Document Quality Issues</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Poor Image Quality</h5>
                      <p className="text-sm mb-1">Blurry, dark, or illegible photographs and documents.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Use good lighting, steady camera position, and check image clarity before upload. Retake photos if necessary.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Incomplete Documentation</h5>
                      <p className="text-sm mb-1">Missing required documents or partial information provided.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Use the OZEV checklist to verify all required documents before submission. Double-check completeness.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Incorrect File Formats</h5>
                      <p className="text-sm mb-1">Using unsupported file types or exceeding size limits.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Convert to PDF or JPEG, compress large files while maintaining quality, follow naming conventions.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-card/80 p-4 rounded-lg">
                  <h4 className="font-semibold text-white mb-2">Technical Compliance Issues</h4>
                  <div className="space-y-3">
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Missing Equipment Serial Numbers</h5>
                      <p className="text-sm mb-1">Charging point serial numbers not clearly visible or documented.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Photograph equipment labels clearly, include close-up shots of serial number plates.</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-red-400 mb-1">❌ Inadequate Test Results</h5>
                      <p className="text-sm mb-1">Incomplete electrical testing or missing commissioning data.</p>
                      <p className="text-sm text-green-300">✅ <strong>Solution:</strong> Ensure all required tests completed and results clearly documented on certificates.</p>
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
                <h4 className="font-semibold text-yellow-400 mb-3">Successful Grant Claim: Manufacturing Company WCS</h4>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-white mb-2">Project Details</h5>
                    <ul className="text-sm space-y-1">
                      <li>• 12 × 7kW charging points installed</li>
                      <li>• Total project value: £15,600</li>
                      <li>• Grant claim: £4,200 (12 × £350)</li>
                      <li>• Documentation: 47 files uploaded</li>
                      <li>• Processing time: 6 weeks</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-semibold text-white mb-2">Success Factors</h5>
                    <ul className="text-sm space-y-1">
                      <li>• Complete documentation first submission</li>
                      <li>• High-quality photographic evidence</li>
                      <li>• Prompt response to OZEV queries</li>
                      <li>• Professional presentation</li>
                      <li>• Clear financial documentation</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-950/20 border border-green-800 rounded">
                  <p className="text-green-200 text-sm">
                    <strong>Result:</strong> Grant approved without queries, payment received within 8 weeks of submission. 
                    Client extremely satisfied with professional service and efficient process.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Component */}
          <EVChargingModule7Section3Quiz />

          <Separator className="bg-gray-700" />

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Link to="../ev-charging-module-7-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../ev-charging-module-7-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600 transition-colors">
                Next Section: Record-Keeping
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EVChargingModule7Section3;