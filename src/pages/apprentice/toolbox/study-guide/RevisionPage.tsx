import { SmartBackButton } from '@/components/ui/smart-back-button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import RevisionTechniquesTab from '@/components/apprentice/study-tips/RevisionTechniquesTab';

const RevisionPage = () => {
  return (
    <div className="animate-fade-in max-w-2xl mx-auto px-4 pb-20 space-y-6 text-left">
      <div className="flex items-center gap-3">
        <SmartBackButton />
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Learning & Revision
        </h1>
      </div>

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
    </div>
  );
};

export default RevisionPage;
