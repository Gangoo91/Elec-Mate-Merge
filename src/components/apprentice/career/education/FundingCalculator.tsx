import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Progress } from '@/components/ui/progress';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  Calculator,
  ArrowLeft,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const FUNDING_2025 = {
  undergraduate: { tuitionMax: 9250, maintenanceMax: 13022 },
  postgraduate: { maxLoan: 12858 },
  advancedLearner: { repaymentThreshold: 27295 },
  apprenticeship: { maxFunding: 27000 },
};

interface FundingResult {
  totalCost: number;
  totalFunding: number;
  fundingGap: number;
  coverage: number;
  sources: { name: string; amount: number; type: string }[];
  monthlyRepayment: number;
}

const FUNDING_TYPES = [
  {
    id: 'level6',
    title: 'Degree (Level 6)',
    subtitle: "Bachelor's, BEng",
    amount: '£9,250 / yr',
  },
  {
    id: 'level7',
    title: "Master's (Level 7)",
    subtitle: 'MSc, MBA',
    amount: '£12,858',
  },
  {
    id: 'hnc',
    title: 'HNC / HND (L4-5)',
    subtitle: 'Higher National',
    amount: '£6.5-9.2K',
  },
  {
    id: 'professional',
    title: 'Professional',
    subtitle: 'PRINCE2, NEBOSH',
    amount: '£500-5K',
  },
];

const OFFICIAL_LINKS = [
  { label: 'Student Finance', url: 'https://www.gov.uk/student-finance' },
  { label: 'Learner Loans', url: 'https://www.gov.uk/advanced-learner-loan' },
  {
    label: 'Skills Bootcamps',
    url: 'https://www.gov.uk/government/publications/skills-bootcamps-funding-allocations',
  },
  { label: 'IET Awards', url: 'https://www.theiet.org/impact-society/awards-prizes-and-scholarships' },
];

const FundingCalculator = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<FundingResult | null>(null);

  const [courseCost, setCourseCost] = useState('');
  const [salary, setSalary] = useState('');
  const [employerSupport, setEmployerSupport] = useState('');

  const calculateFunding = () => {
    const cost = parseFloat(courseCost) || 0;
    const currentSalary = parseFloat(salary) || 0;
    const employer = parseFloat(employerSupport) || 0;

    let totalFunding = employer;
    const sources: { name: string; amount: number; type: string }[] = [];

    if (employer > 0) {
      sources.push({ name: 'Employer support', amount: employer, type: 'employer' });
    }

    switch (selectedType) {
      case 'level6': {
        const tuition = Math.min(cost - employer, FUNDING_2025.undergraduate.tuitionMax);
        if (tuition > 0) {
          sources.push({ name: 'Tuition fee loan', amount: tuition, type: 'loan' });
          totalFunding += tuition;
        }
        break;
      }
      case 'level7': {
        const pgLoan = Math.min(cost - employer, FUNDING_2025.postgraduate.maxLoan);
        if (pgLoan > 0) {
          sources.push({ name: 'Postgraduate loan', amount: pgLoan, type: 'loan' });
          totalFunding += pgLoan;
        }
        break;
      }
      case 'hnc': {
        const allLoan = Math.min(cost - employer, 9250);
        if (allLoan > 0) {
          sources.push({ name: 'Advanced learner loan', amount: allLoan, type: 'loan' });
          totalFunding += allLoan;
        }
        break;
      }
      case 'professional': {
        const skillsBank = Math.min(cost * 0.5, 2000);
        if (skillsBank > 0) {
          sources.push({ name: 'Skills bank grant', amount: skillsBank, type: 'grant' });
          totalFunding += skillsBank;
        }
        break;
      }
    }

    const fundingGap = Math.max(0, cost - totalFunding);
    const coverage = cost > 0 ? Math.min((totalFunding / cost) * 100, 100) : 0;
    const aboveThreshold = Math.max(
      0,
      currentSalary - FUNDING_2025.advancedLearner.repaymentThreshold
    );
    const monthlyRepayment = (aboveThreshold * 0.09) / 12;

    setResult({
      totalCost: cost,
      totalFunding,
      fundingGap,
      coverage,
      sources,
      monthlyRepayment,
    });
    setShowResult(true);
  };

  const resetCalculator = () => {
    setSelectedType(null);
    setShowCalculator(false);
    setShowResult(false);
    setResult(null);
    setCourseCost('');
    setSalary('');
    setEmployerSupport('');
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Funding calculator
        </span>
        <h2 className="text-[18px] font-semibold text-white">Plan your study funding</h2>
      </motion.div>

      <div className="grid grid-cols-2 gap-2">
        {FUNDING_TYPES.map((type) => (
          <motion.button
            key={type.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              setSelectedType(type.id);
              setShowCalculator(true);
            }}
            className={cn(
              'flex items-center gap-3 p-3 rounded-xl text-left transition-colors touch-manipulation',
              'bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04]',
              selectedType === type.id && 'border-elec-yellow/40 bg-elec-yellow/[0.04]'
            )}
          >
            <div className="min-w-0 flex-1">
              <h3 className="text-[13px] text-white leading-tight">{type.title}</h3>
              <p className="text-[12px] text-white/55 mt-0.5">{type.amount}</p>
            </div>
            <ChevronRight className="h-3.5 w-3.5 text-white/55 flex-shrink-0" />
          </motion.button>
        ))}
      </div>

      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Official resources
        </span>
        <div className="grid grid-cols-2 gap-2">
          {OFFICIAL_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => openExternalUrl(link.url)}
              className="flex items-center gap-1.5 px-3 py-2.5 bg-white/[0.02] border border-white/[0.06] rounded-lg text-[12px] text-white/85 hover:bg-white/[0.04] transition-colors touch-manipulation text-left"
            >
              <ExternalLink className="h-3 w-3 flex-shrink-0 text-white/55" />
              <span className="truncate">{link.label}</span>
            </button>
          ))}
        </div>
      </div>

      <Sheet open={showCalculator} onOpenChange={setShowCalculator}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 bg-background">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowCalculator(false)}
                  className="h-9 w-9 text-white hover:bg-white/[0.05]"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-[18px] text-white">Calculate funding</SheetTitle>
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto p-4 space-y-5">
              {selectedType && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    {FUNDING_TYPES.find((t) => t.id === selectedType)?.title}
                  </span>
                  <p className="text-[14px] text-white/85 mt-1">
                    {FUNDING_TYPES.find((t) => t.id === selectedType)?.amount}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[12px] text-white/70">Course cost (£) *</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 9250"
                    value={courseCost}
                    onChange={(e) => setCourseCost(e.target.value)}
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px] text-white/70">Your annual salary (£)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 32000"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                  <p className="text-[12px] text-white/55">Used to calculate repayments</p>
                </div>

                <div className="space-y-2">
                  <Label className="text-[12px] text-white/70">Employer contribution (£)</Label>
                  <Input
                    type="number"
                    placeholder="e.g. 2000 (optional)"
                    value={employerSupport}
                    onChange={(e) => setEmployerSupport(e.target.value)}
                    className="h-11 text-base touch-manipulation bg-white/[0.03] border-white/10 text-white placeholder:text-white/40 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-white/[0.06] bg-background/95 backdrop-blur-lg">
              <Button
                onClick={calculateFunding}
                disabled={!courseCost}
                className="w-full h-11 bg-elec-yellow text-black hover:bg-elec-yellow/90 touch-manipulation"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Calculate my funding
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={showResult} onOpenChange={setShowResult}>
        <SheetContent side="bottom" className="h-[90vh] rounded-t-2xl p-0 bg-background">
          <div className="flex flex-col h-full">
            <SheetHeader className="p-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowResult(false)}
                  className="h-9 w-9 text-white hover:bg-white/[0.05]"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <SheetTitle className="text-[18px] text-white">Your funding plan</SheetTitle>
              </div>
            </SheetHeader>

            {result && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Course cost
                    </span>
                    <p className="text-[18px] font-semibold text-white">
                      £{result.totalCost.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Available funding
                    </span>
                    <p className="text-[18px] font-semibold text-white">
                      £{result.totalFunding.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Funding coverage
                    </span>
                    <span className="text-[12px] text-white/85 font-mono">
                      {result.coverage.toFixed(0)}%
                    </span>
                  </div>
                  <Progress value={result.coverage} className="h-1 bg-white/5" />
                  {result.fundingGap > 0 ? (
                    <div className="flex items-center gap-2 text-[14px] text-white/85">
                      <AlertTriangle className="h-4 w-4 text-white/55" />
                      <span>Gap: £{result.fundingGap.toLocaleString()}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[14px] text-white/85">
                      <CheckCircle2 className="h-4 w-4 text-elec-yellow" />
                      <span>Fully covered</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Funding sources
                  </span>
                  {result.sources.map((source, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2"
                    >
                      <div>
                        <p className="text-[14px] text-white/85">{source.name}</p>
                        <p className="text-[12px] text-white/55 capitalize">{source.type}</p>
                      </div>
                      <p className="text-[14px] text-white/85 font-mono">
                        £{source.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {result.monthlyRepayment > 0 && (
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                    <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                      Estimated repayment
                    </span>
                    <p className="text-[24px] font-semibold text-white">
                      £{result.monthlyRepayment.toFixed(0)}
                      <span className="text-[14px] font-normal text-white/55"> / month</span>
                    </p>
                    <p className="text-[12px] text-white/55">
                      9% of earnings above £
                      {FUNDING_2025.advancedLearner.repaymentThreshold.toLocaleString()}
                    </p>
                  </div>
                )}

                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-2">
                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                    Next steps
                  </span>
                  <ul className="space-y-1.5 text-[14px] text-white/85 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>Apply early — funding applications can take 6-8 weeks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>Ask your employer about training budgets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                      <span>Check IET / professional body grants</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            <div className="p-4 border-t border-white/[0.06] bg-background/95 backdrop-blur-lg">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="w-full h-11 border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] touch-manipulation"
              >
                Calculate another
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FundingCalculator;
