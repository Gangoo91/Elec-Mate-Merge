import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import SupportSystemsTab from '@/components/apprentice/learning-mistakes/SupportSystemsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const SupportPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/learning-from-mistakes')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Resilience"
          title="Support Systems"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-red-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Building Your Support Network
          </h2>
          <p className="text-white text-sm leading-relaxed">
            You do not have to face challenges alone. Building a strong support
            network — mentors, colleagues, training providers, and external
            resources — gives you people to turn to when things get tough.
            Knowing who to talk to and when is a professional skill in itself.
          </p>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <h3 className="text-red-400 font-semibold text-sm mb-3">
              Support Network
            </h3>
            <ul className="space-y-2">
              {[
                'Your mentor or supervisor — first port of call',
                'Fellow apprentices — shared experience and peer support',
                'Training provider — academic and pastoral support',
                'Trade unions — workplace advice and representation',
                'Professional organisations — IET, JIB, NICEIC',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-red-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <SupportSystemsTab />
    </PageFrame>
  );
};

export default SupportPage;
