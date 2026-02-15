import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { SmartBackButton } from '@/components/ui/smart-back-button';

const IndustryGuidancePage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Industry Guidance
        </h1>
      </div>

      {/* Intro */}
      <Card className="border-amber-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">
            Sector-Specific Portfolio Guidance
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Different sectors of the electrical industry have different types
            of work, evidence, and regulations. Whether you work primarily in
            domestic, commercial, or industrial settings, this section helps
            you collect the right evidence for your specific environment.
            Most apprentices experience a mix of sectors — collect evidence
            from all areas you work in.
          </p>
        </CardContent>
      </Card>

      {/* Domestic */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Domestic Electrical Work
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Residential installations are the most common starting point for
            apprentices. Domestic work covers everything from rewires to new
            builds to additions and alterations.
          </p>
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <h3 className="text-blue-400 font-semibold text-sm mb-2">
              Key Work Areas to Evidence
            </h3>
            <ul className="space-y-1">
              {[
                'Consumer unit installations and upgrades (split-load, RCBO boards)',
                'Domestic wiring systems — ring finals, radial circuits, lighting circuits',
                'Kitchen and bathroom electrical work (special locations per BS 7671)',
                'Garden and outdoor installations — external sockets, lighting, ponds',
                'Electric vehicle charging point installations (OZEV/EVHS scheme)',
                'Smoke and heat alarm installations (BS 5839-6)',
                'Rewires — full and partial, including first-fix and second-fix',
                'Additions and alterations to existing installations',
                'New build electrical installations from scratch',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-blue-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <h3 className="text-green-400 font-semibold text-sm mb-2">
              Evidence Types for Domestic Work
            </h3>
            <ul className="space-y-1">
              {[
                'EICRs (Electrical Installation Condition Reports)',
                'Minor Works Certificates',
                'Electrical Installation Certificates',
                'Schedule of Test Results (R1+R2, Zs, insulation resistance, RCD times)',
                'Customer testimonials about your professionalism',
                'Before/during/after installation photos',
                'Wiring diagrams and circuit charts you have produced',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <h3 className="text-amber-400 font-semibold text-sm mb-2">
              Key Regulations for Domestic Work
            </h3>
            <ul className="space-y-1">
              {[
                'BS 7671 (18th Edition Wiring Regulations)',
                'Part P of the Building Regulations (England and Wales)',
                'BS 5839-6 (domestic fire detection and fire alarm systems)',
                'NICEIC / NAPIT / ELECSA scheme requirements',
                'IET Guidance Notes (particularly GN1, GN3, GN7)',
                'Building Regulations Approved Document P',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-amber-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Commercial */}
      <Card className="border-purple-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-purple-400">
            Commercial Electrical Work
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Commercial work includes offices, shops, schools, hospitals, and
            other non-industrial buildings. This sector often involves larger
            systems, 3-phase supplies, and specialist systems like fire
            alarms and emergency lighting.
          </p>
          <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-3">
            <h3 className="text-purple-400 font-semibold text-sm mb-2">
              Key Work Areas to Evidence
            </h3>
            <ul className="space-y-1">
              {[
                'Three-phase distribution systems and sub-distribution boards',
                'Commercial lighting installations and controls (DALI, PIR, lux sensors)',
                'Emergency lighting systems (maintained and non-maintained)',
                'Fire alarm installations (conventional and addressable)',
                'Structured cabling and data installations (Cat6/Cat6a)',
                'Access control and intruder alarm systems',
                'Power distribution units (PDUs) in server rooms',
                'Energy monitoring and building management systems (BMS)',
                'External lighting — car parks, building facades, pathways',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-purple-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <h3 className="text-green-400 font-semibold text-sm mb-2">
              Evidence Types for Commercial Work
            </h3>
            <ul className="space-y-1">
              {[
                'Periodic inspection reports (5-yearly for commercial)',
                'Commissioning test results and handover documents',
                'Emergency lighting certificates (BS 5266)',
                'Fire alarm commissioning records (BS 5839-1)',
                'Cable schedule documentation',
                'As-built drawings showing your installations',
                'Snagging lists and completion records',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <h3 className="text-amber-400 font-semibold text-sm mb-2">
              Key Regulations for Commercial Work
            </h3>
            <ul className="space-y-1">
              {[
                'BS 7671 (18th Edition Wiring Regulations)',
                'BS 5266 (Emergency lighting)',
                'BS 5839-1 (Fire detection and fire alarm systems)',
                'CDM Regulations 2015 (Construction Design and Management)',
                'Workplace (Health, Safety and Welfare) Regulations 1992',
                'The Electricity at Work Regulations 1989',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-amber-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Industrial */}
      <Card className="border-orange-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-orange-400">
            Industrial Electrical Work
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Industrial work covers manufacturing plants, factories, process
            facilities, and heavy engineering environments. This sector
            involves larger power systems, motor control, automation, and
            potentially hazardous areas.
          </p>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3">
            <h3 className="text-orange-400 font-semibold text-sm mb-2">
              Key Work Areas to Evidence
            </h3>
            <ul className="space-y-1">
              {[
                'Motor control centres (MCCs) and variable speed drives (VSDs)',
                'PLC (Programmable Logic Controller) systems and automation',
                'High voltage switching and protection systems',
                'Industrial process control instrumentation',
                'Hazardous area installations (ATEX zones)',
                'Power factor correction equipment',
                'Industrial lighting (high bays, floodlighting)',
                'Cable tray and ladder rack containment systems',
                'Busbar trunking systems',
                'Standby generator installations and changeover systems',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-orange-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <h3 className="text-green-400 font-semibold text-sm mb-2">
              Evidence Types for Industrial Work
            </h3>
            <ul className="space-y-1">
              {[
                'Commissioning reports for plant and machinery',
                'FAT (Factory Acceptance Test) and SAT (Site Acceptance Test) documents',
                'Loop testing certificates for instrumentation',
                'Motor testing results (insulation, winding resistance)',
                'Safety system validation records',
                'Permit-to-work documentation',
                'Lock-out/tag-out (LOTO) procedure evidence',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
            <h3 className="text-amber-400 font-semibold text-sm mb-2">
              Key Regulations for Industrial Work
            </h3>
            <ul className="space-y-1">
              {[
                'BS 7671 (18th Edition Wiring Regulations)',
                'BS EN 60079 (Explosive atmospheres — equipment classification)',
                'DSEAR (Dangerous Substances and Explosive Atmospheres Regulations)',
                'PUWER (Provision and Use of Work Equipment Regulations)',
                'Machinery Directive (2006/42/EC)',
                'The Electricity at Work Regulations 1989',
                'LOLER (Lifting Operations and Lifting Equipment Regulations)',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-white"
                >
                  <span className="text-amber-400 flex-shrink-0">&bull;</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Universal Requirements */}
      <Card className="border-green-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-green-400">
            Universal Requirements (All Sectors)
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Regardless of which sector you work in, these evidence
            requirements apply everywhere:
          </p>
          <div className="space-y-3">
            {[
              {
                category: 'Health & Safety',
                items: [
                  'Risk assessment completion evidence',
                  'Method statement preparation or contribution',
                  'PPE usage documentation',
                  'Accident/incident/near-miss reporting',
                  'Safety training records (CSCS, first aid, manual handling)',
                  'Safe isolation procedure compliance',
                ],
              },
              {
                category: 'Testing & Inspection',
                items: [
                  'Initial verification testing (new installations)',
                  'Periodic inspection and testing (existing installations)',
                  'Portable appliance testing (PAT)',
                  'Emergency lighting testing and records',
                  'Fire alarm system testing and records',
                  'Earth fault loop impedance and RCD testing',
                ],
              },
              {
                category: 'Professional Standards',
                items: [
                  'BS 7671 (18th Edition) compliance in all work',
                  'IET Guidance Note understanding and application',
                  'On-Site Guide reference and use',
                  'Building Regulations awareness and compliance',
                  'CDM Regulations awareness (commercial and industrial)',
                  'Environmental regulations and waste management',
                ],
              },
            ].map((section) => (
              <div
                key={section.category}
                className="bg-white/5 border border-green-500/20 rounded-lg p-3"
              >
                <h3 className="text-green-400 font-semibold text-sm mb-2">
                  {section.category}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-white"
                    >
                      <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Maximising Your Exposure */}
      <Card className="border-blue-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-blue-400">
            Maximising Your Industry Exposure
          </h2>
          <p className="text-white text-sm leading-relaxed">
            If your employer works primarily in one sector, try to gain
            experience in other areas too. A well-rounded portfolio showing
            domestic, commercial, and industrial work is stronger than one
            focused on a single sector.
          </p>
          <ul className="space-y-2">
            {[
              'Ask your employer about job variety — can you shadow other teams?',
              'Use college workshops to practise work outside your usual sector',
              'Volunteer for different types of projects when opportunities arise',
              'Discuss exposure gaps with your training provider at reviews',
              'If you only do domestic work, focus heavily on the domestic evidence requirements',
              'Some EPAOs will accept college-based evidence if site exposure is limited',
              'Your pathway choice (Installation vs Maintenance) affects what is expected',
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-white"
              >
                <CheckCircle className="h-4 w-4 text-blue-400 flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Assessment Tips */}
      <Card className="border-red-500/30 bg-white/5">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-red-400">
            Portfolio Assessment Tips
          </h2>
          <div className="space-y-3">
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
              <h3 className="text-green-400 font-semibold text-sm mb-2">
                What Assessors Look For
              </h3>
              <ul className="space-y-1">
                {[
                  'Evidence that is authentic, verifiable, and clearly your own work',
                  'Dates, witness signatures, and location details on all evidence',
                  'Progression and development over the 4-year programme',
                  'Coverage of ALL required KSBs, not just the easy ones',
                  'Quality over quantity in evidence selection',
                  'Clear organisation and easy navigation',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <h3 className="text-red-400 font-semibold text-sm mb-2">
                What Weakens a Portfolio
              </h3>
              <ul className="space-y-1">
                {[
                  'Evidence not mapped to specific KSBs',
                  'Missing or incomplete sections',
                  'All evidence from one time period (shows last-minute collection)',
                  'No reflective commentary — just raw evidence with no analysis',
                  'Generic content copied from textbooks or the internet',
                  'Messy presentation and poor organisation',
                  'Confidential client information included without consent',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-white"
                  >
                    <span className="text-red-400 flex-shrink-0">&bull;</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Confidentiality */}
      <Card className="border-amber-500/30 bg-amber-500/10">
        <CardContent className="p-4 space-y-3">
          <h2 className="text-lg font-semibold text-amber-400">
            Client Confidentiality
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Always respect client confidentiality when collecting portfolio
            evidence. Remove or redact client names, addresses, and personal
            details from certificates and photos. Never share portfolio
            evidence publicly on social media. If in doubt about whether
            you can include something, ask your employer and the client
            for permission first.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default IndustryGuidancePage;
