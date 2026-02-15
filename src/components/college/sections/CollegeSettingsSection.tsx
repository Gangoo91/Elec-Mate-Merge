import { Card, CardContent } from '@/components/ui/card';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { Settings } from 'lucide-react';

export function CollegeSettingsSection() {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="College Settings"
        description="Manage your institution settings and preferences"
      />

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardContent className="p-8 sm:p-12 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-elec-yellow/10 flex items-center justify-center">
            <Settings className="h-8 w-8 text-elec-yellow" />
          </div>
          <h3 className="text-lg font-semibold text-white">Coming Soon</h3>
          <p className="text-white max-w-md mx-auto">
            College settings will allow you to configure institution details, notification
            preferences, academic year settings, and security policies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
