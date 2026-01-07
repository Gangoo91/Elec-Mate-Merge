import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import { CalendarDays, GraduationCap, Award, ChevronRight, Loader2 } from 'lucide-react';
import { useQualifications } from '@/hooks/qualification/useQualifications';
import { Qualification } from '@/types/qualification';
import { toast } from 'sonner';
import QualificationConfirmationDialog from './QualificationConfirmationDialog';
import PortfolioSetupAnimation from './PortfolioSetupAnimation';
import { cn } from '@/lib/utils';

const QualificationSelector = () => {
  const { awardingBodies, categories, loading, selectQualification, userSelection } = useQualifications();
  const [selectedQualification, setSelectedQualification] = useState<Qualification | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isSettingUp, setIsSettingUp] = useState(false);

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

    // Close dialog and show animation
    setShowConfirmDialog(false);
    setIsSettingUp(true);

    try {
      await selectQualification(selectedQualification.id, targetDate);
    } catch (error) {
      setIsSettingUp(false);
      toast.error('Failed to set up portfolio. Please try again.');
    }
  };

  const handleSetupComplete = () => {
    setIsSettingUp(false);
    setSelectedQualification(null);
    toast.success('Your portfolio is ready!');
  };

  const selectedQualificationCategories = selectedQualification
    ? categories.filter(cat => cat.qualification_id === selectedQualification.id)
    : [];

  // Loading state with skeleton cards
  if (loading) {
    return (
      <Card className="bg-card border-border">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10">
              <Loader2 className="h-5 w-5 text-elec-yellow animate-spin" />
            </div>
            <div>
              <CardTitle className="text-lg">Loading Qualifications</CardTitle>
              <CardDescription className="text-sm">
                Fetching available courses...
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-20 bg-muted rounded-xl" />
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Already selected state
  if (userSelection) {
    return (
      <Card className="bg-card border-border overflow-hidden">
        {/* Header with gradient accent */}
        <div className="h-1 bg-gradient-to-r from-elec-yellow via-elec-yellow/80 to-orange-500" />
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
              <Award className="h-5 w-5 text-elec-yellow" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg">Current Qualification</CardTitle>
              <CardDescription className="text-sm">
                Your portfolio is tailored to these requirements
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="p-4 rounded-xl bg-muted/50 border border-border space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-elec-yellow text-black font-semibold text-xs">
                    {userSelection.qualification?.level}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {userSelection.qualification?.awarding_body}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground leading-tight">
                  {userSelection.qualification?.title}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Code: {userSelection.qualification?.code}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-elec-yellow">
                  {userSelection.progress_percentage}%
                </div>
                <span className="text-xs text-muted-foreground">Complete</span>
              </div>
            </div>
            {userSelection.target_completion_date && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                <CalendarDays className="h-4 w-4" />
                Target: {new Date(userSelection.target_completion_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Selection state
  return (
    <Card className="bg-card border-border overflow-hidden">
      {/* Header with gradient accent */}
      <div className="h-1 bg-gradient-to-r from-elec-yellow via-elec-yellow/80 to-orange-500" />
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20">
            <GraduationCap className="h-5 w-5 text-elec-yellow" />
          </div>
          <div>
            <CardTitle className="text-lg">Select Your Qualification</CardTitle>
            <CardDescription className="text-sm">
              Choose your course to get a tailored portfolio experience
            </CardDescription>
          </div>
        </div>
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
                <div className="space-y-3 mt-4">
                  {qualifications.map((qualification) => (
                    <button
                      key={qualification.id}
                      onClick={() => handleSelectQualification(qualification)}
                      className={cn(
                        'w-full text-left p-4 rounded-xl',
                        'bg-muted/50 border border-border',
                        'hover:border-elec-yellow/50 hover:bg-muted/80',
                        'active:scale-[0.98] transition-all duration-200',
                        'focus:outline-none focus:ring-2 focus:ring-elec-yellow/50',
                        selectedQualification?.id === qualification.id && 'ring-2 ring-elec-yellow border-elec-yellow/50'
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {/* Level Badge */}
                        <div className="flex-shrink-0">
                          <Badge className="bg-elec-yellow text-black font-semibold text-xs px-2.5 py-1">
                            {qualification.level}
                          </Badge>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 space-y-1">
                          <h3 className="font-semibold text-foreground leading-tight line-clamp-2">
                            {qualification.title}
                          </h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{qualification.awarding_body}</span>
                            <span className="text-border">•</span>
                            <span>{qualification.code}</span>
                          </div>
                          {qualification.description && (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {qualification.description}
                            </p>
                          )}
                        </div>

                        {/* Arrow */}
                        <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      </div>
                    </button>
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

        <PortfolioSetupAnimation
          isVisible={isSettingUp}
          onComplete={handleSetupComplete}
          qualificationTitle={selectedQualification?.title}
        />
      </CardContent>
    </Card>
  );
};

export default QualificationSelector;
