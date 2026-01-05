import { ArrowLeft, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PATTestingModule5Section4 = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../pat-testing-module-5">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 5
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Calendar className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Re-Test Period Planning
                </h1>
                <p className="text-xl text-gray-400">
                  Module 5, Section 4
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 5.4
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                8 minutes
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Testing Schedule Planning</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-4">
              <p>
                Plan and manage retest periods effectively to maintain compliance 
                and ensure continuous electrical safety.
              </p>
              <div className="space-y-2">
                <h4 className="text-white font-semibold">Key Topics:</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Determining appropriate retest intervals</li>
                  <li>Schedule planning and resource allocation</li>
                  <li>Reminder systems and notifications</li>
                  <li>Managing testing backlogs</li>
                  <li>Continuous improvement of testing programmes</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PATTestingModule5Section4;