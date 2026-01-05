import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info, Zap } from 'lucide-react';

const BMSModule7Section6Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Info className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          A Building Management System (BMS) installation is not complete until the client understands 
          how to operate it and has all the documentation required for safe and efficient use. A rushed 
          or incomplete handover often leads to confusion, system misuse, and expensive call-backs.
        </p>
        
        <p>
          This phase is crucial for the electrician's reputation and project success. Poor handover practices 
          lead to call-backs, disputes, and dissatisfied clients, while thorough handover builds trust and 
          leads to future business opportunities.
        </p>
        
        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Zap className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Professional Success Factor</h4>
              <p className="text-sm text-foreground">
                A thorough handover is the difference between a one-time job and a long-term client relationship. 
                Professional documentation and training demonstrate quality workmanship and build trust.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { BMSModule7Section6Intro };