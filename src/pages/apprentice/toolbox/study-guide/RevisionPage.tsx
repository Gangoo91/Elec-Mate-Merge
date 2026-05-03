import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import RevisionTechniquesTab from '@/components/apprentice/study-tips/RevisionTechniquesTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const RevisionPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice/toolbox/study-tips')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Study"
          title="Learning & Revision"
          tone="yellow"
        />
      </motion.div>

      <Card className="border-orange-500/20 bg-white/5">
        <CardContent className="p-4 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Proven Revision Techniques
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Not all revision methods are equal. Research shows that some
            techniques are far more effective than others for long-term
            retention. Learn the science-backed methods that will help you
            remember cable sizes, regulation numbers, and testing procedures.
          </p>

          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
            <h3 className="text-orange-400 font-semibold text-sm mb-3">
              Techniques Covered
            </h3>
            <ul className="space-y-2">
              {[
                'Spaced repetition — review at increasing intervals',
                'Active recall — test yourself, do not just re-read',
                'Flashcards — for regulations, cable sizes, and formulas',
                'Mind mapping — connect related concepts visually',
                'Practice questions — the closest thing to the real exam',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm text-white"
                >
                  <CheckCircle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <RevisionTechniquesTab />
    </PageFrame>
  );
};

export default RevisionPage;
