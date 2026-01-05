import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Info, Zap, Layers, Monitor, Ruler, FileCheck, Building, AlertTriangle, ClipboardCheck } from 'lucide-react';

export const EmergencyLightingTechnicalSection3_5 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-8">
        
        {/* Section 1: Purpose of Layout Drawings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            1. Purpose of Layout Drawings
          </h3>
          
          <div className="space-y-3">
            <p>
              Emergency lighting drawings are critical communication tools that bridge the gap between design intent and practical implementation. They serve multiple essential functions in the emergency lighting installation process:
            </p>
            
            <ul className="space-y-2 ml-4">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong>Installation Guidance:</strong> Provide installers with precise fitting positions, mounting heights, and circuit arrangements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong>Compliance Demonstration:</strong> Prove to inspectors and fire officers that the installation meets BS 5266-1 requirements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong>Permanent Records:</strong> Form part of the building's fire safety documentation for ongoing compliance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong>Future Reference:</strong> Enable efficient modifications, testing, and maintenance throughout the building's lifecycle</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <span><strong>Legal Protection:</strong> Provide evidence of due diligence in case of insurance claims or legal proceedings</span>
              </li>
            </ul>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: Why are layout drawings an essential part of fire safety documentation?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> Layout drawings form part of the building's permanent fire safety records, demonstrating compliance to inspectors and providing essential information for future maintenance, testing, and modifications. They also serve as legal evidence of proper design and installation procedures.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Information Required on Drawings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Info className="h-5 w-5" />
            2. Essential Information Required on Drawings
          </h3>
          
          <div className="space-y-3">
            <p>
              A compliant emergency lighting layout drawing must include comprehensive information to ensure proper installation and ongoing maintenance. BS 5266-1 specifies the minimum requirements:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Essential Information:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Escape routes:</strong> Clearly marked with directional flow arrows</li>
                  <li>• <strong>Luminaire types:</strong> Maintained, non-maintained, exit signs, bulkheads</li>
                  <li>• <strong>Mounting heights:</strong> Specified where critical for illumination calculations</li>
                  <li>• <strong>Building layout:</strong> Walls, doors, windows, and structural elements</li>
                  <li>• <strong>Scale and dimensions:</strong> Typically 1:100 or 1:50 for detailed areas</li>
                </ul>
              </div>
              <div className="bg-elec-gray/50 p-4 rounded-lg">
                <h4 className="font-semibold text-elec-yellow mb-2">Technical Requirements:</h4>
                <ul className="space-y-2 text-sm">
                  <li>• <strong>Circuit references:</strong> Which fittings connect to which supply circuits</li>
                  <li>• <strong>Testing points:</strong> Access locations for periodic testing procedures</li>
                  <li>• <strong>Central battery locations:</strong> If applicable to the system design</li>
                  <li>• <strong>Legends and symbols:</strong> Clear interpretation keys for all stakeholders</li>
                  <li>• <strong>Control panel positions:</strong> For monitored and addressable systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
              <h4 className="text-amber-300 font-semibold mb-2">Additional Documentation Requirements</h4>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• North arrow and building orientation</li>
                <li>• Drawing revision dates and version control</li>
                <li>• Project title, address, and drawing number</li>
                <li>• Designer/contractor details and professional stamps</li>
                <li>• Notes regarding special requirements or deviations</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: Name five items of information that must appear on emergency lighting drawings.</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> Escape routes clearly marked, luminaire types and positions, mounting heights, circuit references, and testing points. Additional essential items include legends/symbols, building layout, scale/dimensions, and control panel locations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Drawing Software and CAD Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Monitor className="h-5 w-5" />
            3. Drawing Software and CAD Requirements
          </h3>
          
          <div className="space-y-3">
            <p>
              Modern emergency lighting drawings are typically produced using Computer-Aided Design (CAD) software, which offers precision, consistency, and easy revision management. Professional requirements include:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Professional CAD Software:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• AutoCAD for precision 2D drawings</li>
                  <li>• Revit for BIM integration projects</li>
                  <li>• SketchUp for 3D visualisation</li>
                  <li>• Industry-specific lighting design software</li>
                  <li>• Standardised symbol libraries</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">File Format Standards:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• DWG format for native CAD compatibility</li>
                  <li>• PDF for universal viewing and approval</li>
                  <li>• Layer organisation for different systems</li>
                  <li>• Standard title blocks and templates</li>
                  <li>• Version control and backup procedures</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: Why is CAD software preferred over hand-drawn sketches for emergency lighting drawings?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> CAD software provides precision, consistency, easy revisions, standardised symbols, proper scaling, layer organisation, and professional presentation. It also enables integration with BIM systems and ensures compliance with industry standards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 4: Scale, Measurements and Dimensioning Standards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Ruler className="h-5 w-5" />
            4. Scale, Measurements and Dimensioning Standards
          </h3>
          
          <div className="space-y-3">
            <p>
              Accurate scaling and dimensioning are crucial for proper installation and compliance verification. Industry standards dictate specific requirements:
            </p>
            
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Standard Drawing Scales:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>1:100</strong> - General building layouts and large spaces</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>1:50</strong> - Detailed areas requiring precise positioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>1:20</strong> - Complex installations with multiple luminaire types</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>NTS (Not To Scale)</strong> - Schematic diagrams only, must be clearly marked</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Dimensioning Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Critical mounting heights clearly marked</li>
                  <li>• Distances between luminaires specified</li>
                  <li>• Room dimensions for illumination calculations</li>
                  <li>• Exit door widths and corridor dimensions</li>
                </ul>
              </div>
              <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">Measurement Standards:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• All dimensions in millimetres (mm)</li>
                  <li>• Heights above finished floor level (AFFL)</li>
                  <li>• Grid references for large buildings</li>
                  <li>• Tolerances specified where critical</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: What is the most common scale used for emergency lighting layout drawings?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> 1:100 is the most common scale for general building layouts, with 1:50 used for detailed areas requiring precise positioning. The scale must be clearly indicated on all drawings.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Symbols and Standards */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Zap className="h-5 w-5" />
            5. Symbols and Standards Compliance
          </h3>
          
          <div className="space-y-3">
            <p>
              Standardised symbols ensure consistent interpretation across the industry. BS 5266-1 and related standards specify exact requirements for graphical representation:
            </p>
            
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Required Standard References:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>BS 5266-1:</strong> Emergency lighting for premises - Code of practice for the emergency lighting of premises</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>BS EN ISO 7010:</strong> Graphical symbols - Safety colours and safety signs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>BS 1192:</strong> Collaborative production of architectural, engineering and construction information</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>IET Wiring Regulations:</strong> For electrical installation symbols and circuit references</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Essential Symbol Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Running man pictogram for all exit signs</li>
                  <li>• Directional arrows showing escape routes</li>
                  <li>• Different symbols for maintained/non-maintained</li>
                  <li>• Testing point indicators</li>
                  <li>• Circuit identification markers</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Drawing Legend Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Complete symbol library on each drawing</li>
                  <li>• Text descriptions for all symbols used</li>
                  <li>• Line types and their meanings</li>
                  <li>• Colour coding explanations</li>
                  <li>• Abbreviations and terminology</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: What pictogram must be used for exit signage on layout drawings and which standard defines it?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> The running man pictogram with directional arrows must be used for exit signage, as specified in BS EN ISO 7010 standards. This ensures international consistency and recognition in emergency situations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Legal Requirements and Handover Procedures */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileCheck className="h-5 w-5" />
            6. Legal Requirements and Handover Procedures
          </h3>
          
          <div className="space-y-3">
            <p>
              Emergency lighting drawings have legal implications under building regulations, fire safety legislation, and health and safety requirements. Proper handover procedures are mandatory:
            </p>
            
            <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
              <h4 className="font-semibold text-red-300 mb-2">Legal Framework:</h4>
              <ul className="space-y-1 text-sm">
                <li>• Building Regulations Part B (Fire Safety)</li>
                <li>• Regulatory Reform (Fire Safety) Order 2005</li>
                <li>• Construction (Design and Management) Regulations</li>
                <li>• Health and Safety at Work Act 1974</li>
                <li>• Building Safety Act 2022 (higher-risk buildings)</li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Handover Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• As-built drawings in agreed formats</li>
                  <li>• Operation and maintenance manuals</li>
                  <li>• Test certificates and commissioning records</li>
                  <li>• Warranty information and contact details</li>
                  <li>• Training records for building personnel</li>
                </ul>
              </div>
              <div className="bg-amber-600/20 border border-amber-500/40 p-4 rounded-lg">
                <h4 className="font-semibold text-amber-300 mb-2">Professional Responsibilities:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Designer must certify compliance with standards</li>
                  <li>• Installer must verify actual installation</li>
                  <li>• Building owner must maintain records</li>
                  <li>• Regular review and update procedures</li>
                  <li>• Professional indemnity insurance coverage</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: Who is legally responsible for ensuring emergency lighting drawings are handed over to the building owner?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> The installing contractor has the primary legal responsibility to provide as-built drawings to the building owner, though the designer, principal contractor, and building owner all have specific duties under current legislation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 7: As-Built vs. Design Drawings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Layers className="h-5 w-5" />
            7. As-Built vs. Design Drawings Management
          </h3>
          
          <div className="space-y-3">
            <p>
              The distinction between design intent and final installation is critical for compliance and future maintenance. Professional management of drawing revisions ensures ongoing compliance:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Design Drawings:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Show intended positions before work begins</li>
                  <li>• Used for planning, procurement, and pricing</li>
                  <li>• Form basis of tender documentation</li>
                  <li>• May require site-specific adjustments</li>
                  <li>• Include design calculations and assumptions</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">As-Built Drawings:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Record actual installation once complete</li>
                  <li>• Document all variations from original design</li>
                  <li>• Include additional fittings or circuit changes</li>
                  <li>• Must be signed off by responsible persons</li>
                  <li>• Form permanent building records</li>
                </ul>
              </div>
            </div>

            <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-300 mb-2">Revision Control Procedures:</h4>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• Document all changes with revision clouds and notes</li>
                <li>• Maintain revision tables with dates and descriptions</li>
                <li>• Obtain approvals for significant modifications</li>
                <li>• Archive superseded drawings with clear version control</li>
                <li>• Ensure all stakeholders receive updated copies</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: What is the key difference between design drawings and as-built drawings in terms of compliance?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> Design drawings show intended compliance with standards, while as-built drawings provide evidence of actual compliance achieved. Only as-built drawings can be used to demonstrate final compliance to inspectors and for ongoing building management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 8: Integration with Building Information Modelling (BIM) */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Building className="h-5 w-5" />
            8. Integration with Building Information Modelling (BIM)
          </h3>
          
          <div className="space-y-3">
            <p>
              Modern construction projects increasingly use BIM technology for coordinated design and construction. Emergency lighting drawings must integrate seamlessly with BIM workflows:
            </p>
            
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">BIM Integration Benefits:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>3D Coordination:</strong> Clash detection with other building systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Automatic Schedules:</strong> Generate luminaire schedules and specifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Lifecycle Management:</strong> Link to maintenance and testing schedules</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Data Rich Models:</strong> Include product specifications and performance data</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">BIM Software Compatibility:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Autodesk Revit for architectural integration</li>
                  <li>• Bentley MicroStation for infrastructure projects</li>
                  <li>• Tekla for structural coordination</li>
                  <li>• IFC file format for multi-platform sharing</li>
                </ul>
              </div>
              <div className="bg-teal-900/20 border border-teal-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-teal-300 mb-2">Data Requirements:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Product manufacturer and model data</li>
                  <li>• Performance specifications and ratings</li>
                  <li>• Installation and maintenance requirements</li>
                  <li>• Warranty and lifecycle information</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: How does BIM technology improve emergency lighting design and documentation?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> BIM provides 3D coordination with other systems, automatic generation of schedules and documentation, clash detection, data-rich models with specifications, and improved lifecycle management from design through maintenance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 9: Common Drawing Errors and Prevention */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            9. Common Drawing Errors and Prevention
          </h3>
          
          <div className="space-y-3">
            <p>
              Understanding and preventing common errors in emergency lighting drawings is essential for compliance and professional practice. These errors frequently cause installation delays and compliance failures:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-red-300 mb-2">Frequent Drawing Errors:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Missing or incorrect escape route markings</li>
                  <li>• Inconsistent symbol usage and legends</li>
                  <li>• Inadequate dimensioning and scaling</li>
                  <li>• Unclear circuit references and testing points</li>
                  <li>• Outdated standards or symbol libraries</li>
                  <li>• Missing revision control and version tracking</li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Prevention Strategies:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Use standardised templates and symbol libraries</li>
                  <li>• Implement systematic quality checking procedures</li>
                  <li>• Regular training on current standards and regulations</li>
                  <li>• Peer review processes for critical drawings</li>
                  <li>• Maintain up-to-date software and standard libraries</li>
                  <li>• Document common errors and lessons learned</li>
                </ul>
              </div>
            </div>

            <div className="bg-amber-600/20 border border-amber-500/40 rounded-lg p-4">
              <h4 className="font-semibold text-amber-300 mb-2">Quality Assurance Checklist:</h4>
              <ul className="space-y-1 text-sm text-foreground">
                <li>• All escape routes clearly marked with correct flow direction</li>
                <li>• Legend includes all symbols used on the drawing</li>
                <li>• Scale, north point, and grid references shown</li>
                <li>• All luminaires have circuit references and mounting heights</li>
                <li>• Testing points identified and accessible</li>
                <li>• Drawing title, date, revision, and author details complete</li>
              </ul>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: What is the most common cause of emergency lighting drawing compliance failures?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> Missing or incorrectly marked escape routes are the most common cause of compliance failures, followed by inconsistent symbol usage and inadequate legends. These errors make it impossible to verify compliance with BS 5266-1 requirements.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 10: Inspection, Approval and Maintenance Documentation */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            10. Inspection, Approval and Maintenance Documentation
          </h3>
          
          <div className="space-y-3">
            <p>
              Emergency lighting drawings form the foundation for ongoing inspection, testing, and maintenance throughout the building's operational life. Proper documentation supports compliance and reduces liability:
            </p>
            
            <div className="bg-elec-gray/50 p-4 rounded-lg">
              <h4 className="font-semibold text-elec-yellow mb-2">Inspection Documentation Requirements:</h4>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Commissioning Records:</strong> Initial testing and verification against drawings</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Periodic Testing Logs:</strong> Monthly and annual testing results linked to drawing locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Maintenance Records:</strong> Repairs, replacements, and modifications with drawing updates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow">•</span>
                  <span><strong>Compliance Certificates:</strong> Professional sign-offs and regulatory approvals</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Testing Schedule Integration:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Daily visual inspections using drawings</li>
                  <li>• Monthly functional testing at marked points</li>
                  <li>• Annual full duration testing procedures</li>
                  <li>• Results recorded against drawing references</li>
                </ul>
              </div>
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Digital Documentation Systems:</h4>
                <ul className="space-y-1 text-sm">
                  <li>• QR codes linking drawings to test records</li>
                  <li>• Mobile apps for on-site testing and updates</li>
                  <li>• Cloud-based document management systems</li>
                  <li>• Automatic reminder and scheduling systems</li>
                </ul>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="text-blue-300 font-semibold mb-2">✅ Quick Check: How often must emergency lighting drawings be reviewed and potentially updated?</h4>
              <div className="p-3 bg-green-900/20 border border-green-600/30 rounded">
                <p className="text-green-300">
                  <strong>Answer:</strong> Drawings should be reviewed annually during full testing procedures and updated immediately following any modifications to the installation. They must also be reviewed whenever building layouts change or new escape routes are established.
                </p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};