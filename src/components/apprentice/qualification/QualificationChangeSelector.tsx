import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { CalendarDays, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { Qualification } from '@/types/qualification';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface QualificationChangeSelectorProps {
  onComplete: () => void;
  onCancel: () => void;
}

const QualificationChangeSelector = ({ onComplete, onCancel }: QualificationChangeSelectorProps) => {
  const { awardingBodies, loading, selectQualification } = useQualifications();
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [targetDate, setTargetDate] = useState('');
  const [isSelecting, setIsSelecting] = useState(false);

  const awardingBodyIcons = {
    'EAL': Award,
    'City & Guilds': GraduationCap,
    'MOET': BookOpen
  };

  const handleSelectQualification = async () => {
    if (!selectedQualification) return;

    setIsSelecting(true);
    try {
      await selectQualification(selectedQualification.id, targetDate || undefined);
      toast.success('Course changed successfully! Your portfolio has been updated.');
      onComplete();
    } catch (error) {
      toast.error('Failed to change course');
    } finally {
      setIsSelecting(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Qualifications...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Select New Qualification</CardTitle>
        <CardDescription>
          Choose your new awarding body and qualification. Your existing portfolio entries will be preserved.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <DropdownTabs
          placeholder="Select awarding body"
          defaultValue={Object.keys(awardingBodies)[0]}
          tabs={Object.entries(awardingBodies).map(([body, qualifications]) => {
            const Icon = awardingBodyIcons[body as keyof typeof awardingBodyIcons] || Award;
            return {
              value: body,
              label: body,
              icon: Icon,
              content: (
                <div className="grid gap-4 mt-4">
                  {qualifications.map((qualification) => (
                    <Card
                      key={qualification.id}
                      className={`cursor-pointer transition-all hover:shadow-md border-elec-yellow/20 bg-elec-dark ${
                        selectedQualification?.id === qualification.id ? 'ring-2 ring-elec-yellow' : ''
                      }`}
                      onClick={() => setSelectedQualification(qualification)}
                    >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <Badge variant="outline" className="border-elec-yellow bg-elec-yellow text-elec-dark font-semibold">
                            {qualification.level}
                          </Badge>
                        </div>
                        <div className="space-y-2 text-center">
                          <h3 className="font-semibold text-lg leading-tight">{qualification.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {qualification.description}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Code: {qualification.code}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    </Card>
                  ))}
                </div>
              )
            };
          })}
        />

        {selectedQualification && (
          <div className="mt-6 space-y-4 border-t border-elec-yellow/20 pt-4">
            <div className="space-y-2">
              <Label htmlFor="target-date" className="text-sm font-medium">Target Completion Date (Optional)</Label>
              <Input
                id="target-date"
                type="date"
                value={targetDate}
                onChange={(e) => setTargetDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="bg-elec-dark border-elec-yellow/20"
              />
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-elec-yellow/50 text-elec-yellow hover:bg-elec-yellow/10"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSelectQualification}
                disabled={isSelecting}
                className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                {isSelecting ? 'Changing Course...' : 'Change to This Course'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QualificationChangeSelector;