import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { CollegeFeatureTile } from '@/components/college/CollegeFeatureTile';
import { CollegeSectionHeader } from '@/components/college/CollegeSectionHeader';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import { useHapticFeedback } from '@/components/college/ui/HapticFeedback';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { Shield, Plug, Settings, FileCheck, Users, FileText, Link } from 'lucide-react';

interface ResourcesHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function ResourcesHub({ onNavigate }: ResourcesHubProps) {
  const { staff } = useCollegeSupabase();
  const { staggerContainer, staggerItem } = useHapticFeedback();

  const activeStaff = staff.filter((s) => s.status === 'Active').length;

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <motion.div
        className="space-y-4 md:space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <CollegeSectionHeader
          title="Resources Hub"
          description="Compliance, integrations and system settings"
        />

        {/* Quick Stats */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1 -mx-4 px-4 md:mx-0 md:px-0">
          <Card className="relative overflow-hidden bg-success/[0.08] border-success/20 hover:border-success/40 hover:bg-success/[0.12] shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-success via-green-400 to-success/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-success/20 to-success/5 border border-success/20 shadow-lg shadow-success/5 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">{activeStaff}</p>
                <p className="text-xs text-white">Active Staff</p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden bg-info/[0.08] border-info/20 hover:border-info/40 hover:bg-info/[0.12] shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-info via-blue-400 to-info/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-info/20 to-info/5 border border-info/20 shadow-lg shadow-info/5 group-hover:scale-110 transition-transform duration-300">
                <Plug className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">0</p>
                <p className="text-xs text-white">VLE Connected</p>
              </div>
            </CardContent>
          </Card>
          <Card className="relative overflow-hidden bg-elec-yellow/[0.08] border-elec-yellow/20 hover:border-elec-yellow/40 hover:bg-elec-yellow/[0.12] shrink-0 transition-all duration-300 cursor-pointer group touch-manipulation">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-elec-yellow via-amber-400 to-elec-yellow/50" />
            <CardContent className="p-3 flex items-center gap-2">
              <div className="p-2 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/20 shadow-lg shadow-elec-yellow/5 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-4 w-4 text-elec-yellow" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">0</p>
                <p className="text-xs text-white">Compliance Docs</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Compliance & Documents */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
            Compliance & Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CollegeFeatureTile
              icon={Shield}
              title="Compliance"
              description="Policies, DBS checks & staff documents"
              onClick={() => onNavigate('compliancedocs')}
            />
            <CollegeFeatureTile
              icon={FileText}
              title="Teaching Resources"
              description="Shared materials & uploads"
              onClick={() => onNavigate('teachingresources')}
            />
          </div>
        </motion.div>

        {/* Integrations */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-info to-blue-500 rounded-full"></span>
            Integrations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <CollegeFeatureTile
              icon={Plug}
              title="VLE Integration"
              description="Canvas, Moodle & LTI 1.3"
              onClick={() => onNavigate('ltisettings')}
              badge="Not connected"
              badgeVariant="info"
            />
            <CollegeFeatureTile
              icon={Link}
              title="Employer Portal"
              description="Apprentice progress & employer engagement"
              onClick={() => onNavigate('employerportal')}
            />
          </div>
        </motion.div>

        {/* Settings */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-success to-green-500 rounded-full"></span>
            Administration
          </h2>
          <CollegeFeatureTile
            icon={Settings}
            title="College Settings"
            description="Institution preferences & configuration"
            onClick={() => onNavigate('collegesettings')}
          />
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={staggerItem}>
          <h2 className="text-base md:text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 bg-gradient-to-b from-elec-yellow to-amber-500 rounded-full"></span>
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <CollegeFeatureTile
              icon={FileCheck}
              title="Check Compliance"
              description="Review docs"
              onClick={() => onNavigate('compliancedocs')}
              compact
            />
            <CollegeFeatureTile
              icon={Plug}
              title="Connect VLE"
              description="LTI setup"
              onClick={() => onNavigate('ltisettings')}
              compact
            />
            <CollegeFeatureTile
              icon={FileText}
              title="Resources"
              description="View materials"
              onClick={() => onNavigate('teachingresources')}
              compact
            />
            <CollegeFeatureTile
              icon={Settings}
              title="Settings"
              description="Configure"
              onClick={() => onNavigate('collegesettings')}
              compact
            />
          </div>
        </motion.div>
      </motion.div>
    </PullToRefresh>
  );
}
