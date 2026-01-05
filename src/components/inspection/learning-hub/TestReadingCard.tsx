
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Zap } from 'lucide-react';

interface TestReading {
  phase: string;
  liveToNeutral: string;
  liveToEarth: string;
  neutralToEarth: string;
  valid: boolean;
  notes?: string;
}

interface TestReadingCardProps {
  reading: TestReading;
  onReadingChange: (field: keyof Omit<TestReading, 'phase' | 'valid'>, value: string) => void;
}

const TestReadingCard = ({ reading, onReadingChange }: TestReadingCardProps) => {
  return (
    <Card className={`border-2 ${reading.valid ? 'border-green-500/30 bg-green-500/5' : 'border-border bg-card'}`}>
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-4 w-4" />
          Phase {reading.phase}
          {reading.valid && <CheckCircle2 className="h-4 w-4 text-green-400" />}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Live to Neutral (V)</label>
            <input
              type="number"
              value={reading.liveToNeutral}
              onChange={(e) => onReadingChange('liveToNeutral', e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
              placeholder="0.0"
              min="0"
              max="1000"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Live to Earth (V)</label>
            <input
              type="number"
              value={reading.liveToEarth}
              onChange={(e) => onReadingChange('liveToEarth', e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
              placeholder="0.0"
              min="0"
              max="1000"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Neutral to Earth (V)</label>
            <input
              type="number"
              value={reading.neutralToEarth}
              onChange={(e) => onReadingChange('neutralToEarth', e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
              placeholder="0.0"
              min="0"
              max="1000"
              step="0.1"
            />
          </div>
        </div>
        
        {reading.notes !== undefined && (
          <div className="mt-4">
            <label className="block text-sm font-medium text-foreground mb-2">Notes / Observations</label>
            <textarea
              value={reading.notes}
              onChange={(e) => onReadingChange('notes', e.target.value)}
              className="w-full p-3 bg-muted border border-border rounded-lg text-foreground"
              placeholder="Record any observations or anomalies..."
              rows={2}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TestReadingCard;
