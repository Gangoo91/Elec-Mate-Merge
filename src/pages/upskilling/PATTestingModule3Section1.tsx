import { ArrowLeft, Cable } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PATTestingModule3Section1 = () => {
  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      <div className="px-8 pt-8 pb-12">
        <Link to="../pat-testing-module-3">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 3
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Cable className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Cable and Plug Damage Checks
                </h1>
                <p className="text-xl text-gray-400">
                  Module 3, Section 1
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.1
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                12 minutes
              </Badge>
            </div>
          </div>

          <div className="text-lg text-white mb-6">
            This section will be developed with the same comprehensive structure as the Emergency Lighting modules, 
            including detailed technical content, interactive elements, real-world examples, and assessment materials.
          </div>

          <Card className="bg-slate-200/20 border-yellow-400/30">
            <CardHeader>
              <CardTitle className="text-white">Visual Inspection Fundamentals</CardTitle>
            </CardHeader>
            <CardContent className="text-white space-y-4">
              <p>
                Learn to systematically inspect cables and plugs for damage that could 
                compromise electrical safety.
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Key Topics:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Cable sheath damage and conductor exposure</li>
                  <li>Plug casing cracks and damage</li>
                  <li>Pin damage and corrosion</li>
                  <li>Strain relief and cable entry inspection</li>
                  <li>Connection security and terminal condition</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule3Section1;