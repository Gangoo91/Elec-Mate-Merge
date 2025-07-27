import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { CalendarDays, GraduationCap, Award, BookOpen } from 'lucide-react';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { Qualification } from '@/types/qualification';
import { toast } from 'sonner';
import QualificationConfirmationDialog from './QualificationConfirmationDialog';

const QualificationSelector = () => {
  const { awardingBodies, categories, loading, selectQualification, userSelection } = useQualifications();
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const awardingBodyIcons = {
    'EAL': Award,
    'City & Guilds': GraduationCap
  };

  const handleSelectQualification = (qualification: Qualification) => {
    setSelectedQualification(qualification);
    setShowConfirmDialog(true);
  };

  const handleConfirmSelection = async (targetDate?: string) => {
    if (!selectedQualification) return;

    await selectQualification(selectedQualification.id, targetDate);
    toast.success('Qualification selected successfully! Your portfolio is now being set up.');
    setSelectedQualification(null);
  };

  const selectedQualificationCategories = selectedQualification 
    ? categories.filter(cat => cat.qualification_id === selectedQualification.id)
    : [];

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Loading Qualifications...</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  if (userSelection) {
    return (
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Current Qualification
          </CardTitle>
          <CardDescription>
            You have selected your qualification. Your portfolio is now tailored to meet these requirements.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{userSelection.qualification?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {userSelection.qualification?.awarding_body} • {userSelection.qualification?.level}
                </p>
              </div>
              <Badge variant="secondary" className="border-elec-yellow/50 bg-elec-yellow/20 text-elec-yellow">
                {userSelection.progress_percentage}% Complete
              </Badge>
            </div>
            {userSelection.target_completion_date && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Target completion: {new Date(userSelection.target_completion_date).toLocaleDateString()}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle>Select Your Qualification</CardTitle>
        <CardDescription>
          Choose your awarding body and qualification to get a tailored portfolio experience with specific requirements and guidance.
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
                      onClick={() => handleSelectQualification(qualification)}
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

        <QualificationConfirmationDialog
          open={showConfirmDialog}
          onOpenChange={setShowConfirmDialog}
          qualification={selectedQualification}
          categories={selectedQualificationCategories}
          onConfirm={handleConfirmSelection}
        />
      </CardContent>
    </Card>
  );
};

export default QualificationSelector;