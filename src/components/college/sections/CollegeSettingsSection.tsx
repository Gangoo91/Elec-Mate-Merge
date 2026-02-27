import { Card, CardContent } from '@/components/ui/card';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { Settings, Building2, Bell, Calendar, Shield, ChevronRight } from 'lucide-react';

const upcomingFeatures = [
  {
    icon: Building2,
    title: 'Institution Details',
    description: 'Name, address, Ofsted number, contact info',
  },
  {
    icon: Bell,
    title: 'Notification Preferences',
    description: 'Email, push and in-app alert settings per role',
  },
  {
    icon: Calendar,
    title: 'Academic Year Settings',
    description: 'Term dates, holiday periods and assessment windows',
  },
  {
    icon: Shield,
    title: 'Security & Access Policies',
    description: 'Two-factor auth, session timeouts and role permissions',
  },
];

export function CollegeSettingsSection() {
  return (
    <div className="space-y-4 md:space-y-6 animate-fade-in">
      <CollegeSectionHeader
        title="College Settings"
        description="Manage your institution settings and preferences"
      />

      <Card className="border-elec-yellow/20 bg-elec-gray overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div className="h-12 w-12 rounded-xl bg-elec-yellow/10 border border-elec-yellow/20 flex items-center justify-center flex-shrink-0">
              <Settings className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Coming Soon</h3>
              <p className="text-sm text-white/70 mt-0.5">
                We're building a full settings panel for your institution.
              </p>
            </div>
          </div>

          {/* Upcoming features list */}
          <div className="space-y-3">
            {upcomingFeatures.map((feature) => (
              <div
                key={feature.title}
                className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
              >
                <div className="h-8 w-8 rounded-lg bg-elec-yellow/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <feature.icon className="h-4 w-4 text-elec-yellow" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{feature.title}</p>
                  <p className="text-xs text-white/60 mt-0.5">{feature.description}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-white/20 flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
