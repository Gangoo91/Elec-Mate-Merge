import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PATTestingModule3Section2 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
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
              <Zap className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Rewiring and Correct Fuse Ratings
                </h1>
                <p className="text-xl text-gray-400">
                  Module 3, Section 2
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 3.2
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                15 minutes
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Wiring and Fuse Assessment</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Understand how to assess rewiring quality and verify correct fuse ratings 
                for safe appliance operation.
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Key Topics:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Signs of unauthorised rewiring or repair</li>
                  <li>Correct fuse rating selection</li>
                  <li>Wire gauge and current capacity</li>
                  <li>Terminal connections and quality</li>
                  <li>Identifying substandard repairs</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule3Section2;