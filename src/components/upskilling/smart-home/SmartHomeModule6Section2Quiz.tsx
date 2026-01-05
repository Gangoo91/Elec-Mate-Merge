import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award } from 'lucide-react';

// Simplified quiz component with just a few key questions
export const SmartHomeModule6Section2Quiz = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Award className="h-7 w-7 text-elec-yellow" />
          Knowledge Check Quiz
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {!quizStarted ? (
          <div className="text-center space-y-4">
            <p className="text-foreground">Test your knowledge of voice assistant integration with a 10-question quiz.</p>
            <Button 
              onClick={() => setQuizStarted(true)}
              className="bg-elec-yellow text-elec-dark hover:bg-yellow-500"
            >
              Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-elec-yellow text-elec-dark">
              Quiz content loading...
            </Badge>
            <p className="text-foreground text-sm">Quiz implementation in progress</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};