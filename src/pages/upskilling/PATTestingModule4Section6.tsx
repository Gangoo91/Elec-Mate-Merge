import { ArrowLeft, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PATTestingModule4Section6 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../pat-testing-module-4">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 4
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <BarChart className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Interpreting Results and Common Failures
                </h1>
                <p className="text-xl text-gray-400">
                  Module 4, Section 6
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 4.6
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                16 minutes
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Test Result Interpretation</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Learn to interpret test results correctly and identify common failure 
                modes to make informed pass/fail decisions.
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Key Topics:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Pass/fail criteria for all test types</li>
                  <li>Common failure modes and causes</li>
                  <li>Borderline results and retesting</li>
                  <li>Troubleshooting failed appliances</li>
                  <li>When appliances can be repaired vs replaced</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule4Section6;