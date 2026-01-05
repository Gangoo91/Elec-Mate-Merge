import { ArrowLeft, FileText, CheckCircle, AlertTriangle, Users, Calendar, MapPin, Zap, Shield, Eye, Clipboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const DocumentationGuide = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="module-8/section-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Practical Assessment
          </Button>
        </Link>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">Documentation Guide</h1>
            <p className="text-xl text-white">Complete guide to filling out test certificates and schedules for practical exams</p>
            <div className="flex justify-center gap-3">
              <Badge variant="secondary" className="bg-yellow-400 text-black">BS 7671:2018+A2</Badge>
              <Badge variant="outline" className="border-gray-600 text-white">IET Guidance Note 3</Badge>
              <Badge variant="outline" className="border-gray-600 text-white">City & Guilds</Badge>
            </div>
          </div>

          {/* Essential Documents Overview */}
          <Card className="bg-card border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Essential Documents for Practical Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-card p-4 rounded border border-yellow-400/30">
                  <h4 className="text-blue-300 font-semibold mb-2">New Installations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Electrical Installation Certificate (EIC)</li>
                    <li>• Schedule of Inspections</li>
                    <li>• Schedule of Test Results</li>
                    <li>• Circuit charts/schedules</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-green-500/30">
                  <h4 className="text-green-300 font-semibold mb-2">Additions/Alterations</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Minor Works Certificate</li>
                    <li>• EIC (for major alterations)</li>
                    <li>• Schedule of Test Results</li>
                    <li>• Updated circuit charts</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-orange-500/30">
                  <h4 className="text-orange-300 font-semibold mb-2">Inspection & Testing</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Electrical Installation Condition Report (EICR)</li>
                    <li>• Schedule of Inspections</li>
                    <li>• Schedule of Test Results</li>
                    <li>• Observation schedules</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EIC Completion Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-yellow-400" />
                Electrical Installation Certificate (EIC) - Step by Step
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Details of the Client */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Section 1: Details of the Client
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="text-white font-semibold mb-2">What to Include:</h4>
                      <ul className="space-y-1">
                        <li><strong>Client Name:</strong> Full name or company name</li>
                        <li><strong>Address:</strong> Complete postal address</li>
                        <li><strong>Postcode:</strong> Always include</li>
                        <li><strong>Purpose:</strong> Domestic, commercial, industrial</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Practical Exam Tips:</h4>
                      <ul className="space-y-1">
                        <li>• Write clearly and legibly</li>
                        <li>• Use the address given in exam scenario</li>
                        <li>• If no client given, use "Exam Centre"</li>
                        <li>• Purpose usually matches building type</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Installation Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Section 2: Details of the Installation
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Key Information Required:</h4>
                      <ul className="space-y-1">
                        <li><strong>Extent of installation:</strong> Complete/partial</li>
                        <li><strong>Date of completion:</strong> Work completion date</li>
                        <li><strong>Date of inspection:</strong> When tests performed</li>
                        <li><strong>Next inspection:</strong> Calculate from BS 7671</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Inspection Intervals:</h4>
                      <ul className="space-y-1">
                        <li>• <strong>Domestic:</strong> 10 years (rented: 5 years)</li>
                        <li>• <strong>Commercial:</strong> 5 years</li>
                        <li>• <strong>Industrial:</strong> 3 years</li>
                        <li>• <strong>Special locations:</strong> 1-3 years</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Supply Characteristics */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Section 3: Supply Characteristics and Earthing
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <h4 className="text-white font-semibold mb-2">Supply Details:</h4>
                        <ul className="space-y-1">
                          <li><strong>Nature of supply:</strong> AC (tick box)</li>
                          <li><strong>Number of phases:</strong> 1 or 3</li>
                          <li><strong>Frequency:</strong> 50Hz</li>
                          <li><strong>Nominal voltage:</strong> 230V/400V</li>
                          <li><strong>Prospective fault current:</strong> Measured value</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-2">Earthing Arrangements:</h4>
                        <ul className="space-y-1">
                          <li><strong>Type:</strong> TN-S, TN-C-S, or TT</li>
                          <li><strong>Ze:</strong> External earth loop impedance</li>
                          <li><strong>Main bonding:</strong> Size and material</li>
                          <li><strong>Electrode (TT only):</strong> Type and resistance</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-yellow-950/20 border border-yellow-400/30 p-3 rounded">
                      <h5 className="text-blue-300 font-semibold mb-2">Common System Types:</h5>
                      <ul className="text-sm space-y-1 text-blue-200">
                        <li>• <strong>TN-S:</strong> Separate neutral and earth (older cable systems)</li>
                        <li>• <strong>TN-C-S (PME):</strong> Combined neutral-earth from supplier (most common)</li>
                        <li>• <strong>TT:</strong> Local earth electrode (rural areas, temporary supplies)</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Particulars of Installation */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Section 4: Particulars of Installation
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="space-y-3">
                    <h4 className="text-white font-semibold">Means of Earthing and Bonding:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-yellow-400 font-medium mb-1">Main Earthing Conductor:</p>
                        <ul className="space-y-1">
                          <li>• Material: Usually copper</li>
                          <li>• CSA: 16mm² minimum (usually 25mm²)</li>
                          <li>• Connection: Verified to MET</li>
                          <li>• Label: "Safety Electrical Connection - Do Not Remove"</li>
                        </ul>
                      </div>
                      <div>
                        <p className="text-yellow-400 font-medium mb-1">Main Protective Bonding:</p>
                        <ul className="space-y-1">
                          <li>• Water: Size per Table 54.8</li>
                          <li>• Gas: Size per Table 54.8</li>
                          <li>• Oil: If metallic pipework present</li>
                          <li>• Other services: Structural steel, etc.</li>
                        </ul>
                      </div>
                    </div>
                    <div className="bg-yellow-950/30 border border-yellow-400/30 p-3 rounded">
                      <h5 className="text-yellow-300 font-semibold mb-2">Bonding Conductor Sizes (Table 54.8):</h5>
                      <ul className="text-sm space-y-1 text-yellow-200">
                        <li>• <strong>25mm² main earth:</strong> 10mm² main bonding minimum</li>
                        <li>• <strong>35mm² main earth:</strong> 16mm² main bonding minimum</li>
                        <li>• <strong>50mm² main earth:</strong> 25mm² main bonding minimum</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Schedule of Test Results */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Clipboard className="h-5 w-5 text-yellow-400" />
                Schedule of Test Results - Essential Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h4 className="text-white font-semibold mb-3">Circuit Information Columns:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-yellow-400 font-medium mb-2">Circuit Details:</p>
                      <ul className="space-y-1">
                        <li><strong>Circuit number:</strong> From consumer unit</li>
                        <li><strong>Circuit description:</strong> Kitchen sockets, upstairs lights</li>
                        <li><strong>Type:</strong> Radial, ring, lighting, etc.</li>
                        <li><strong>Reference method:</strong> Installation method</li>
                        <li><strong>Cable type/size:</strong> T&E 2.5mm², SWA 4mm²</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium mb-2">Protection:</p>
                      <ul className="space-y-1">
                        <li><strong>Overcurrent rating:</strong> MCB/fuse rating</li>
                        <li><strong>RCD rating:</strong> 30mA, 100mA, etc.</li>
                        <li><strong>Max Zs:</strong> From BS 7671 tables</li>
                        <li><strong>Circuit length:</strong> Measured/calculated</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h4 className="text-white font-semibold mb-3">Test Results Columns:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-yellow-400 font-medium mb-2">Continuity Tests:</p>
                      <ul className="space-y-1">
                        <li><strong>R1+R2:</strong> Live+CPC resistance</li>
                        <li><strong>Ring final:</strong> r1, r2, rn values</li>
                        <li><strong>Units:</strong> Always in Ohms (Ω)</li>
                        <li><strong>Polarity:</strong> Satisfactory ✓</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium mb-2">Insulation Tests:</p>
                      <ul className="space-y-1">
                        <li><strong>L-N:</strong> Phase to neutral</li>
                        <li><strong>L-E:</strong> Phase to earth</li>
                        <li><strong>N-E:</strong> Neutral to earth</li>
                        <li><strong>Units:</strong> MΩ (megohms)</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-yellow-400 font-medium mb-2">Final Tests:</p>
                      <ul className="space-y-1">
                        <li><strong>Zs:</strong> Earth fault loop impedance</li>
                        <li><strong>RCD test:</strong> Trip time at I∆n and 5×I∆n</li>
                        <li><strong>Units:</strong> Ω for Zs, ms for RCD</li>
                        <li><strong>Functional:</strong> Satisfactory ✓</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Minor Works Certificate */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="h-5 w-5 text-yellow-400" />
                Minor Works Certificate - Quick Reference
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">When to Use Minor Works:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Additional socket outlets or lighting points</li>
                    <li>• Replacing accessories (switches, sockets)</li>
                    <li>• Installing single items of fixed equipment</li>
                    <li>• Work not requiring design calculations</li>
                    <li>• Single circuit modifications only</li>
                  </ul>
                </div>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <h4 className="text-yellow-400 font-semibold mb-2">Essential Tests Required:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Continuity of protective conductors</li>
                    <li>• Insulation resistance (500V DC)</li>
                    <li>• Polarity verification</li>
                    <li>• Earth fault loop impedance (Zs)</li>
                    <li>• RCD operation (where applicable)</li>
                    <li>• Functional testing</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-yellow-950/20 border border-yellow-400/30 p-4 rounded">
                <h4 className="text-blue-300 font-semibold mb-2">Description of Minor Works - Be Specific:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-200 font-medium mb-1">Good Examples:</p>
                    <ul className="space-y-1 text-blue-200">
                      <li>• "Installation of 1 x 13A socket outlet in kitchen"</li>
                      <li>• "Replacement of bathroom light switch"</li>
                      <li>• "Addition of outside light to existing circuit"</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-blue-200 font-medium mb-1">Poor Examples:</p>
                    <ul className="space-y-1 text-blue-200">
                      <li>• "Electrical work" (too vague)</li>
                      <li>• "Socket" (incomplete description)</li>
                      <li>• "Minor works" (doesn't describe work)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* EICR Complete Guide */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Electrical Installation Condition Report (EICR) - Complete Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* EICR Purpose */}
              <div className="bg-orange-950/30 border border-orange-500/50 p-4 rounded">
                <h4 className="text-orange-300 font-semibold mb-2">EICR Purpose & Scope:</h4>
                <p className="text-sm text-orange-200 mb-2">
                  The EICR assesses the condition of an existing electrical installation against current standards.
                  It identifies deterioration, defects, non-compliances, and recommends remedial action.
                </p>
                <ul className="text-sm text-orange-200 space-y-1">
                  <li>• <strong>Not a certificate of compliance</strong> - it's a condition report</li>
                  <li>• <strong>Sampling basis</strong> - reasonable examination without damage</li>
                  <li>• <strong>Competent person</strong> - must be carried out by qualified inspector</li>
                  <li>• <strong>Current edition</strong> - assessed against BS 7671:2018+A2</li>
                </ul>
              </div>

              {/* Client and Installation Details */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Section A: Details of the Client
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Client Information:</h4>
                      <ul className="space-y-1">
                        <li><strong>Name:</strong> Full name or company</li>
                        <li><strong>Address:</strong> Complete postal address</li>
                        <li><strong>Installation type:</strong> Domestic/Commercial/Industrial</li>
                        <li><strong>Installation description:</strong> House, office, factory</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold mb-2">Installation Address:</h4>
                      <ul className="space-y-1">
                        <li>• If different from client address</li>
                        <li>• Must be specific and complete</li>
                        <li>• Include floor/unit numbers</li>
                        <li>• Postcode essential</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extent and Limitations */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Section B: Extent and Limitations of Inspection
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Extent of Installation Covered:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-yellow-400 font-medium mb-1">Tick all applicable:</p>
                          <ul className="space-y-1">
                            <li>□ Domestic installation</li>
                            <li>□ Commercial installation</li>
                            <li>□ Industrial installation</li>
                            <li>□ Other (specify)</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-yellow-400 font-medium mb-1">Percentage inspected:</p>
                          <ul className="space-y-1">
                            <li>• Usually 10% minimum sampling</li>
                            <li>• More if defects found</li>
                            <li>• 100% for critical circuits</li>
                            <li>• Document actual percentage</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-red-950/30 border border-red-500/50 p-3 rounded">
                      <h5 className="text-red-300 font-semibold mb-2">Common Limitations (must be recorded):</h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <ul className="text-sm space-y-1 text-red-200">
                          <li>• Fixed equipment not accessible</li>
                          <li>• Concealed cables not exposed</li>
                          <li>• Live equipment not isolated</li>
                          <li>• Floor/ceiling areas not lifted</li>
                        </ul>
                        <ul className="text-sm space-y-1 text-red-200">
                          <li>• External installations weather dependent</li>
                          <li>• Industrial processes couldn't be stopped</li>
                          <li>• Areas not accessible due to storage</li>
                          <li>• Equipment in continuous use</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Summary and Recommendations */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Section C: Summary of the Inspection
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-semibold mb-2">Overall Assessment:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="bg-green-950/30 border border-green-500/50 p-3 rounded">
                          <h5 className="text-green-300 font-semibold mb-1">Satisfactory</h5>
                          <p className="text-green-200 text-xs">Installation in satisfactory condition</p>
                        </div>
                        <div className="bg-yellow-950/30 border border-yellow-400/30 p-3 rounded">
                          <h5 className="text-yellow-300 font-semibold mb-1">Unsatisfactory</h5>
                          <p className="text-yellow-200 text-xs">Requires improvement but can remain in service</p>
                        </div>
                        <div className="bg-red-950/30 border border-red-500/50 p-3 rounded">
                          <h5 className="text-red-300 font-semibold mb-1">Dangerous</h5>
                          <p className="text-red-200 text-xs">Immediate action required</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-2">Recommendation for Next Inspection:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-yellow-400 font-medium mb-1">Standard Intervals:</p>
                          <ul className="space-y-1">
                            <li>• <strong>Domestic:</strong> 10 years (5 if rented)</li>
                            <li>• <strong>Commercial:</strong> 5 years</li>
                            <li>• <strong>Industrial:</strong> 3 years</li>
                            <li>• <strong>Special locations:</strong> 1 year</li>
                          </ul>
                        </div>
                        <div>
                          <p className="text-yellow-400 font-medium mb-1">Factors affecting interval:</p>
                          <ul className="space-y-1">
                            <li>• Environmental conditions</li>
                            <li>• Type and intensity of use</li>
                            <li>• Age of installation</li>
                            <li>• External influences present</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Observation Codes Section */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Section D: Observations and Recorded Defects
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold mb-2">Observation Classification Codes:</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="bg-red-950/30 border border-red-500/50 p-3 rounded">
                          <h5 className="text-red-300 font-semibold mb-1">C1 - Danger Present</h5>
                          <p className="text-red-200 text-sm mb-2">Risk of injury - immediate remedial action required</p>
                          <ul className="text-xs text-red-200 space-y-1">
                            <li>• Exposed live parts</li>
                            <li>• Missing circuit protection</li>
                            <li>• Broken enclosures on live equipment</li>
                            <li>• No main earthing conductor</li>
                          </ul>
                        </div>
                        
                        <div className="bg-orange-950/30 border border-orange-500/50 p-3 rounded">
                          <h5 className="text-orange-300 font-semibold mb-1">C2 - Potentially Dangerous</h5>
                          <p className="text-orange-200 text-sm mb-2">Urgent remedial action required</p>
                          <ul className="text-xs text-orange-200 space-y-1">
                            <li>• Lack of RCD protection</li>
                            <li>• Inadequate bonding</li>
                            <li>• Non-compliant modifications</li>
                            <li>• Damaged cables/accessories</li>
                          </ul>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="bg-yellow-950/30 border border-yellow-400/30 p-3 rounded">
                          <h5 className="text-yellow-300 font-semibold mb-1">C3 - Improvement Recommended</h5>
                          <p className="text-yellow-200 text-sm mb-2">Does not comply with current standards</p>
                          <ul className="text-xs text-yellow-200 space-y-1">
                            <li>• Old wiring systems</li>
                            <li>• Missing labels</li>
                            <li>• Non-current cable colours</li>
                            <li>• Absence of RCD (not required when installed)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-yellow-950/20 border border-yellow-400/30 p-3 rounded">
                          <h5 className="text-blue-300 font-semibold mb-1">FI - Further Investigation</h5>
                          <p className="text-blue-200 text-sm mb-2">Unable to fully inspect/test</p>
                          <ul className="text-xs text-blue-200 space-y-1">
                            <li>• Inaccessible equipment</li>
                            <li>• Installation could not be isolated</li>
                            <li>• Suspected concealed damage</li>
                            <li>• Requires specialist investigation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* EICR Testing and Practical Tips */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
                  <Clipboard className="h-4 w-4" />
                  EICR Practical Exam Tips
                </h3>
                <div className="bg-card p-4 rounded border border-gray-600">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-950/30 border border-green-500/50 p-3 rounded">
                      <h5 className="text-green-300 font-semibold mb-2">Before You Start:</h5>
                      <ul className="text-sm space-y-1 text-green-200">
                        <li>• Read all exam documentation thoroughly</li>
                        <li>• Understand what you're being asked to inspect</li>
                        <li>• Note any specific limitations mentioned</li>
                        <li>• Plan your inspection route logically</li>
                        <li>• Check you have all required test instruments</li>
                      </ul>
                    </div>
                    
                    <div className="bg-yellow-950/20 border border-yellow-400/30 p-3 rounded">
                      <h5 className="text-blue-300 font-semibold mb-2">During Inspection:</h5>
                      <ul className="text-sm space-y-1 text-blue-200">
                        <li>• Work systematically through the installation</li>
                        <li>• Record observations immediately</li>
                        <li>• Take photos of defects for evidence</li>
                        <li>• Don't assume anything is correct</li>
                        <li>• Question anything that looks unusual</li>
                      </ul>
                    </div>
                    
                    <div className="bg-purple-950/30 border border-purple-500/50 p-3 rounded">
                      <h5 className="text-purple-300 font-semibold mb-2">Common Exam Scenarios:</h5>
                      <ul className="text-sm space-y-1 text-purple-200">
                        <li>• Missing RCD protection for sockets</li>
                        <li>• Inadequate main protective bonding</li>
                        <li>• Old wiring systems (rubber/PVC)</li>
                        <li>• Non-compliant consumer unit</li>
                        <li>• Missing circuit protection</li>
                      </ul>
                    </div>
                    
                    <div className="bg-orange-950/30 border border-orange-500/50 p-3 rounded">
                      <h5 className="text-orange-300 font-semibold mb-2">Documentation Quality:</h5>
                      <ul className="text-sm space-y-1 text-orange-200">
                        <li>• Use clear, professional language</li>
                        <li>• Reference specific BS 7671 regulations</li>
                        <li>• Be specific about locations</li>
                        <li>• Assign appropriate observation codes</li>
                        <li>• Complete all sections fully</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Common Mistakes to Avoid */}
          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-400" />
                Common Documentation Mistakes in Exams
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-red-950/30 border border-red-500/50 p-4 rounded">
                  <h4 className="text-red-300 font-semibold mb-2">Frequent Errors:</h4>
                  <ul className="text-sm space-y-1 text-red-200">
                    <li>• Forgetting to sign and date certificates</li>
                    <li>• Missing qualification details</li>
                    <li>• Incorrect test instrument serial numbers</li>
                    <li>• Wrong units for test results (Ω vs MΩ vs mΩ)</li>
                    <li>• Incomplete circuit descriptions</li>
                    <li>• Missing RCD test results</li>
                    <li>• Incorrect earth loop impedance limits</li>
                  </ul>
                </div>
                <div className="bg-green-950/30 border border-green-500/50 p-4 rounded">
                  <h4 className="text-green-300 font-semibold mb-2">Best Practices:</h4>
                  <ul className="text-sm space-y-1 text-green-200">
                    <li>• Read all instructions carefully before starting</li>
                    <li>• Use clear, legible handwriting</li>
                    <li>• Double-check all calculations</li>
                    <li>• Verify test results against maximum values</li>
                    <li>• Complete all mandatory sections</li>
                    <li>• Use correct technical terminology</li>
                    <li>• Leave no blank sections unless N/A</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Reference Tables */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Quick Reference - Test Limits & Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h5 className="text-white font-semibold mb-2">Insulation Resistance Minimums:</h5>
                  <ul className="space-y-1">
                    <li>• SELV/PELV circuits: ≥0.25MΩ</li>
                    <li>• Up to 500V: ≥1.0MΩ</li>
                    <li>• Over 500V: ≥1000V per volt</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">RCD Test Requirements:</h5>
                  <ul className="space-y-1">
                    <li>• ½×IΔn: Should NOT trip</li>
                    <li>• 1×IΔn: ≤300ms (≤500ms for 300mA)</li>
                    <li>• 5×IΔn: ≤40ms (all types)</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-2">Next Inspection Intervals:</h5>
                  <ul className="space-y-1">
                    <li>• Domestic: 10 years (5 if rented)</li>
                    <li>• Commercial: 5 years</li>
                    <li>• Industrial: 3 years</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Exam Strategy */}
          <Card className="bg-gradient-to-r from-yellow-400/10 to-yellow-400/10 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">Practical Exam Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <ul className="space-y-2">
                <li><strong>Time Management:</strong> Allocate 10-15 minutes for documentation completion</li>
                <li><strong>Work Order:</strong> Complete testing first, then fill certificates with accurate results</li>
                <li><strong>Double Check:</strong> Verify all calculations and units before submitting</li>
                <li><strong>Completeness:</strong> Ensure every required section is filled in correctly</li>
                <li><strong>Legibility:</strong> Poor handwriting can lose marks - write clearly</li>
                <li><strong>Professional Presentation:</strong> Certificates represent your competence</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DocumentationGuide;