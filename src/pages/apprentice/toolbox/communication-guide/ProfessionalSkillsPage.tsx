import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import ProfessionalSkillsTab from '@/components/apprentice/communication-skills/ProfessionalSkillsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const ProfessionalSkillsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/communication-skills')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Communication"
          title="Professional Skills"
          tone="yellow"
        />
      </motion.div>

      {/* Intro Card */}
      <Card className="border-green-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Building Professional Communication
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Professional communication goes beyond just talking. It includes
            active listening, body language, written communication, and knowing
            how to express yourself clearly. These skills set top electricians
            apart and are essential for career progression.
          </p>

          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <h3 className="text-green-400 font-semibold text-sm mb-3">
              Core Skills Covered
            </h3>
            <ul className="space-y-2">
              {[
                'Active listening — hear what is actually being said',
                'Clear speaking — get your point across effectively',
                'Body language — non-verbal communication matters',
                'Written communication — emails, reports, and site notes',
                'Professional language — choosing the right words',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <ProfessionalSkillsTab />
    </PageFrame>
  );
};

export default ProfessionalSkillsPage;
