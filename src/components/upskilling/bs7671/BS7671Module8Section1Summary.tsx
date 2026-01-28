import { CheckCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BS7671Module8Section1Summary = () => {
  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-elec-gray border-green-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <CheckCircle className="h-6 w-6 text-elec-yellow" />
          Section Summary and Key Takeaways
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-green-600 text-foreground">Essential Knowledge</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Key Learning Points:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Appendix Navigation Mastery:</h6>
              <ul className="text-sm space-y-1">
                <li>• Appendix 4: Current-carrying capacities are installation method dependent</li>
                <li>• Appendix 12: Voltage drop calculations must consider circuit type and loading</li>
                <li>• Appendix 14: Zs values are critical for protective device coordination</li>
                <li>• Cross-referencing between appendices is essential for accurate design</li>
                <li>• Amendment 3 updates include enhanced safety margins</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Practical Application Skills:</h6>
              <ul className="text-sm space-y-1">
                <li>• Systematic approach to conductor sizing prevents errors</li>
                <li>• Multiple correction factors often apply simultaneously</li>
                <li>• Real-world conditions require conservative design approaches</li>
                <li>• Verification testing confirms design calculations</li>
                <li>• Future expansion considerations prevent costly modifications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Critical Formulas and References:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-blue-400 mb-2">Conductor Sizing</h6>
              <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                It = In / (Ca × Cg × Ci × Cr)
              </div>
              <p className="text-xs">Required tabulated current accounting for all correction factors</p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-green-400 mb-2">Voltage Drop</h6>
              <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                Vd = (mV/A/m) × Ib × L / 1000
              </div>
              <p className="text-xs">Single-phase voltage drop using tabulated values</p>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="font-bold text-red-400 mb-2">Earth Fault Loop</h6>
              <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                Zs = Ze + (R1 + R2)
              </div>
              <p className="text-xs">Total earth fault loop impedance for protective device coordination</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Professional Practice Standards:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Design Verification</h6>
              <p className="text-sm">Always verify calculations using multiple methods and cross-reference with different appendix sections to ensure accuracy and compliance.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Documentation Standards</h6>
              <p className="text-sm">Maintain detailed calculation records with clear references to BS 7671 tables and correction factors used for future reference and inspection.</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Continuous Learning</h6>
              <p className="text-sm">Stay updated with amendment changes and industry best practices as electrical technology and regulations continue to evolve.</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Next Steps in Your Learning Journey:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Immediate Actions:</h6>
              <ul className="text-sm space-y-1">
                <li>• Practice calculations with real project examples</li>
                <li>• Familiarize yourself with Amendment 3 changes</li>
                <li>• Build a personal reference guide for quick lookups</li>
                <li>• Test your knowledge with the section quiz</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Advanced Development:</h6>
              <ul className="text-sm space-y-1">
                <li>• Explore specialised installation methods</li>
                <li>• Study harmonics and power quality considerations</li>
                <li>• Investigate renewable energy integration requirements</li>
                <li>• Consider professional development courses</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Resources for Further Study:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <BookOpen className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Essential References</h6>
              <ul className="text-xs space-y-1">
                <li>• BS 7671:2018+A3:2025</li>
                <li>• IET Guidance Notes</li>
                <li>• IET On-Site Guide</li>
                <li>• IET Code of Practice</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <BookOpen className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Calculation Tools</h6>
              <ul className="text-xs space-y-1">
                <li>• IET Cable Calculator</li>
                <li>• Manufacturer design software</li>
                <li>• Mobile calculation apps</li>
                <li>• Online design tools</li>
              </ul>
            </div>
            <div className="bg-gray-800 p-3 rounded">
              <BookOpen className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Professional Development</h6>
              <ul className="text-xs space-y-1">
                <li>• IET technical seminars</li>
                <li>• Amendment update courses</li>
                <li>• Specialist application training</li>
                <li>• Industry conferences</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BS7671Module8Section1Summary;