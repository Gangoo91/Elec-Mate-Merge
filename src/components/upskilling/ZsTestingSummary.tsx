import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Target, CheckCircle, TrendingUp } from 'lucide-react';

export const ZsTestingSummary = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <div className="flex items-center gap-3">
          <BookOpen className="h-6 w-6 text-elec-yellow" />
          <CardTitle className="text-foreground">Section Summary</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-foreground space-y-4 sm:space-y-6">
        {/* Key Learning Outcomes */}
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Strategic Testing Knowledge Gained
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="text-foreground font-medium mb-2">Test Point Selection</h4>
              <ul className="text-sm space-y-1">
                <li>• Minimum 10% of outlets (BS 7671 requirement)</li>
                <li>• Furthest point on each circuit (essential)</li>
                <li>• Each protective device type</li>
                <li>• All fixed equipment with exposed metalwork</li>
                <li>• Special locations and challenging environments</li>
              </ul>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="text-foreground font-medium mb-2">Circuit-Specific Strategies</h4>
              <ul className="text-sm space-y-1">
                <li>• Ring circuits: both ends plus furthest point</li>
                <li>• Radial circuits: progressive testing along route</li>
                <li>• Three-phase: each phase tested separately</li>
                <li>• Lighting: accessible fittings and junction boxes</li>
                <li>• Fixed equipment: at terminals and isolators</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Result Interpretation */}
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            Result Interpretation Mastery
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-green-900/20 border border-green-600 p-4 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2">Normal Patterns</h4>
              <ul className="text-sm space-y-1">
                <li>• Gradual increase in radial circuits</li>
                <li>• Similar readings at ring circuit ends</li>
                <li>• Consistent values across similar circuits</li>
                <li>• All readings within BS 7671 limits</li>
              </ul>
            </div>
            
            <div className="bg-yellow-900/20 border border-yellow-600 p-4 rounded-lg">
              <h4 className="text-yellow-400 font-medium mb-2">Investigation Triggers</h4>
              <ul className="text-sm space-y-1">
                <li>• Unexpected reading variations</li>
                <li>• Values approaching maximum limits</li>
                <li>• Inconsistent ring circuit readings</li>
                <li>• Higher than calculated values</li>
              </ul>
            </div>
            
            <div className="bg-red-900/20 border border-red-600 p-4 rounded-lg">
              <h4 className="text-red-400 font-medium mb-2">Immediate Action</h4>
              <ul className="text-sm space-y-1">
                <li>• Readings exceeding maximum Zs</li>
                <li>• Open circuit protective conductor</li>
                <li>• No reading obtained</li>
                <li>• Significant safety concerns</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Practical Competencies */}
        <div className="space-y-4">
          <h3 className="text-foreground font-semibold flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-400" />
            Practical Competencies Developed
          </h3>
          
          <div className="space-y-3">
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Testing Efficiency
              </h4>
              <p className="text-sm text-gray-300">
                Learned to plan test sequences strategically, minimising disruption while ensuring 
                comprehensive verification. Developed skills in managing access challenges and 
                working around sensitive equipment.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                Problem Solving
              </h4>
              <p className="text-sm text-gray-300">
                Gained expertise in troubleshooting high Zs readings, identifying root causes, 
                and implementing effective solutions. Understand how to handle parallel earth 
                paths and electronic equipment challenges.
              </p>
            </div>
            
            <div className="bg-elec-dark p-4 rounded-lg">
              <h4 className="text-foreground font-medium mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Documentation Standards
              </h4>
              <p className="text-sm text-gray-300">
                Developed professional documentation practices including detailed location 
                descriptions, environmental conditions, and compliance assessments. Learned 
                to create clear, actionable reports.
              </p>
            </div>
          </div>
        </div>

        {/* Common Challenges Addressed */}
        <div className="bg-blue-900/20 border border-blue-600 p-4 rounded-lg">
          <h4 className="text-blue-400 font-semibold mb-3">Common Challenges Successfully Addressed</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-blue-300 mb-2">Access and Practical Issues:</p>
              <ul className="space-y-1">
                <li>• Inaccessible ceiling voids and junction boxes</li>
                <li>• Electronic equipment causing RCD trips</li>
                <li>• Customer liaison and disruption management</li>
                <li>• Outdoor and harsh environment testing</li>
              </ul>
            </div>
            <div>
              <p className="font-medium text-blue-300 mb-2">Technical Interpretation:</p>
              <ul className="space-y-1">
                <li>• Parallel earth path effects on readings</li>
                <li>• Three-phase system testing complexities</li>
                <li>• Ring circuit end-to-end variations</li>
                <li>• Temperature and environmental corrections</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Professional Development */}
        <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3">Professional Competence Achievement</h4>
          <p className="text-sm mb-3 text-gray-300">
            This section has equipped you with the practical skills and knowledge to conduct 
            comprehensive Zs testing across various installation types, interpret results 
            professionally, and solve complex measurement challenges.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Strategic Planning
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Efficient Testing
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Problem Resolution
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Professional Documentation
            </Badge>
            <Badge variant="outline" className="border-elec-yellow text-elec-yellow">
              Customer Liaison
            </Badge>
          </div>
        </div>

        {/* Next Module Preview */}
        <div className="bg-purple-900/20 border border-purple-600 p-4 rounded-lg">
          <h4 className="text-purple-400 font-semibold mb-2">Ready for Advanced Topics</h4>
          <p className="text-sm text-gray-300">
            With comprehensive Zs testing skills mastered, you're prepared to tackle more 
            advanced testing scenarios including fault current calculations, prospective 
            short circuit current testing, and complex installation verification procedures.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};