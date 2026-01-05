import { HelpCircle, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section3FAQ = () => {
  return (
    <Card className="bg-gradient-to-r from-slate-900/20 to-elec-gray border-slate-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Amendment 3 Implementation FAQ
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-slate-600 text-foreground">Expert Guidance</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="space-y-4">
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What are the mandatory cybersecurity requirements for smart home installations?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Amendment 3 requires comprehensive cybersecurity assessment for all connected electrical systems. 
              This includes: device authentication protocols, network segregation for critical systems, encrypted communication, 
              regular security updates, and user consent for data collection. All IoT devices must use secure configuration, 
              and installers must provide cybersecurity documentation including risk assessments, mitigation measures, and 
              ongoing maintenance requirements. Professional certification in cybersecurity for electrical systems is highly recommended.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: Where are AFDDs now mandatory under Amendment 3?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> AFDD requirements have significantly expanded. Mandatory applications now include: all residential 
              socket outlet circuits, lighting circuits in bedrooms and sleeping areas, commercial premises with public access, 
              healthcare facilities (all patient areas), educational buildings, and entertainment venues. Smart AFDDs with remote 
              monitoring are preferred. The devices must coordinate with existing RCD protection and provide diagnostic capabilities. 
              Installation must include commissioning records and ongoing test schedules.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What are the enhanced fire safety cable requirements?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Amendment 3 introduces enhanced fire-resistant cable specifications including 120-minute fire 
              survival for critical circuits (upgraded from 90 minutes), improved smoke and toxicity performance, and enhanced 
              mechanical protection requirements. Installation methods require improved fire stopping with tested and certified 
              products, enhanced cable support fire ratings, and mandatory compartmentation integrity maintenance. All fire 
              stopping must be documented with third-party certification, and regular inspection schedules are required.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What are the V2G (Vehicle-to-Grid) installation requirements?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> V2G systems require grid synchronisation equipment, anti-islanding protection enhanced for 
              bidirectional power flow, and power quality control systems. Installation must include dynamic grid support 
              capability, emergency backup power functionality, and smart charging management. Protection coordination must 
              account for bidirectional current flow, and systems must comply with G98/G99 grid connection standards. 
              Installers require specific V2G competence certification and ongoing training on grid integration requirements.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I implement the enhanced competence requirements?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Amendment 3 requires additional competence in smart systems, cybersecurity, and advanced safety 
              systems. This includes: 16 hours minimum annual technology update training, Amendment 3 specific certification, 
              cybersecurity awareness training, and emerging technology workshops. Practical assessment must demonstrate competence 
              in smart system installation, commissioning, and ongoing support. Professional development must include customer 
              advisory skills and digital documentation capabilities. Continuing professional development records must be maintained 
              and available for competent person scheme audits.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: What documentation changes are required for Amendment 3 compliance?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Enhanced documentation includes cybersecurity assessment certificates, smart device commissioning 
              records, network configuration documentation, and data protection compliance certificates. Digital certification 
              standards now include blockchain-verified certificate integrity, real-time test data integration, and automated 
              compliance verification. All smart systems require ongoing monitoring reports, performance analytics, and maintenance 
              schedules. Documentation must demonstrate compliance with enhanced fire safety, cybersecurity, and smart grid integration 
              requirements.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: When do the Amendment 3 requirements become mandatory?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Implementation is phased: immediate requirements (2025) include cybersecurity assessments, 
              enhanced AFDD installations, and updated fire safety cables. Phased implementation (2025-2027) covers smart grid 
              integration, predictive safety systems, and advanced monitoring. Full compliance is required by Q4 2025 for new 
              installations. Existing installations have transition periods based on risk assessment and modification scope. 
              Training and certification programs are available immediately, with mandatory compliance for all new work from 2025.
            </p>
          </div>

          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-start gap-3 mb-2">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <h5 className="text-elec-yellow font-semibold">Q: How do I handle existing installations that don't meet Amendment 3 requirements?</h5>
            </div>
            <p className="text-sm ml-8">
              <strong>A:</strong> Existing installations are assessed based on current safety standards and risk evaluation. 
              Where modifications are made, they must comply with Amendment 3 requirements for the modified sections. Risk-based 
              assessment determines upgrade priorities: immediate safety concerns first, followed by cybersecurity vulnerabilities 
              and fire safety enhancements. Phased upgrade programs can be implemented with clear timelines and priorities. 
              EICR coding must reflect Amendment 3 standards, with appropriate recommendations for enhancement. Client education 
              on benefits and legal requirements is essential for successful upgrade programs.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Amendment 3 Implementation Checklist:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Before Starting Amendment 3 Work:</h6>
              <ul className="text-sm space-y-1">
                <li>☐ Complete Amendment 3 training and certification</li>
                <li>☐ Update test equipment for smart system verification</li>
                <li>☐ Establish cybersecurity assessment procedures</li>
                <li>☐ Source enhanced fire-resistant cables and materials</li>
                <li>☐ Develop smart system commissioning procedures</li>
                <li>☐ Update insurance for advanced technology installations</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">During Installation and Commissioning:</h6>
              <ul className="text-sm space-y-1">
                <li>☐ Implement comprehensive cybersecurity measures</li>
                <li>☐ Install and commission smart AFDDs where required</li>
                <li>☐ Use enhanced fire-resistant cables and stopping</li>
                <li>☐ Complete smart system integration and testing</li>
                <li>☐ Document all advanced system configurations</li>
                <li>☐ Provide client training on smart system operation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Professional Support and Resources:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Training and Certification</h6>
              <p className="text-sm">IET Amendment 3 courses, competent person scheme updates, smart systems training, and cybersecurity certification programs are available to support professional development.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Technical Support</h6>
              <p className="text-sm">Manufacturer technical support, industry guidance documents, professional forums, and expert consultation services provide ongoing support for complex installations.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Regulatory Guidance</h6>
              <p className="text-sm">IET guidance notes, competent person scheme updates, building control liaison, and regulatory interpretation services help ensure compliant installations.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section3FAQ;