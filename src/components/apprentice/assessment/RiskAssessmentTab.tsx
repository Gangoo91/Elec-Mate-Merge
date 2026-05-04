import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HazardIdentificationMatrix from './risk-assessment/HazardIdentificationMatrix';
import RiskCalculationMatrix from './risk-assessment/RiskCalculationMatrix';
import ControlMeasuresGenerator from './risk-assessment/ControlMeasuresGenerator';
import RiskOutcomeGuidance from './risk-assessment/RiskOutcomeGuidance';
import RiskDocumentation from './risk-assessment/RiskDocumentation';

interface RiskAssessment {
  id: string;
  hazard: string;
  likelihood: number;
  severity: number;
  riskScore: number;
  riskLevel: string;
  controlMeasures: string[];
  timestamp: string;
  assessor: string;
  location: string;
}

const RiskAssessmentTab = () => {
  const [currentAssessment, setCurrentAssessment] = useState<RiskAssessment | null>(null);
  const [selectedHazard, setSelectedHazard] = useState<string>('');
  const [activeTab, setActiveTab] = useState('process');

  const calculateRiskLevel = (score: number): string => {
    if (score >= 15) return 'Very High';
    if (score >= 10) return 'High';
    if (score >= 6) return 'Medium';
    if (score >= 3) return 'Low';
    return 'Very Low';
  };

  const handleHazardSelected = (hazard: string) => {
    setSelectedHazard(hazard);
    setCurrentAssessment(null);
  };

  const handleRiskCalculated = (likelihood: number, severity: number) => {
    if (!selectedHazard) return;

    const riskScore = likelihood * severity;
    const riskLevel = calculateRiskLevel(riskScore);

    const newAssessment: RiskAssessment = {
      id: `RA-${Date.now()}`,
      hazard: selectedHazard,
      likelihood,
      severity,
      riskScore,
      riskLevel,
      controlMeasures: [],
      timestamp: new Date().toISOString(),
      assessor: 'Current User',
      location: 'Site Location',
    };

    setCurrentAssessment(newAssessment);
    setActiveTab('guidance');
  };

  const handleControlMeasuresAdded = (controlMeasures: string[]) => {
    if (currentAssessment) {
      setCurrentAssessment({
        ...currentAssessment,
        controlMeasures,
      });
      setActiveTab('documentation');
    }
  };

  const processSteps = [
    {
      step: 1,
      title: 'Identify hazards',
      description: 'Systematically identify potential electrical hazards in the workplace',
    },
    {
      step: 2,
      title: 'Assess risk',
      description: 'Calculate risk level using likelihood and severity matrix',
    },
    {
      step: 3,
      title: 'Control measures',
      description: 'Implement appropriate control measures following hierarchy of controls',
    },
    {
      step: 4,
      title: 'Document & review',
      description: 'Document findings and establish review procedures',
    },
  ];

  const legalRequirements = [
    'Health and Safety at Work Act 1974',
    'Management of Health and Safety at Work Regulations 1999',
    'Electricity at Work Regulations 1989',
    'BS EN ISO 31000:2018 Risk Management',
  ];

  const bestPractices = [
    'Involve competent persons in assessments',
    'Regular review and updates',
    'Document all findings and decisions',
    'Monitor effectiveness of controls',
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="space-y-2">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Risk assessment tools
        </span>
        <h2 className="text-[20px] sm:text-[24px] font-semibold tracking-tight text-white leading-tight">
          HSE guidelines & BS EN ISO 31000 compliant
        </h2>
        <p className="text-[14px] text-white/70 leading-relaxed max-w-2xl">
          Comprehensive risk assessment tools following HSE guidelines and BS EN ISO 31000
          standards. Identify hazards, calculate risk levels, and implement effective control
          measures.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="w-full min-w-max bg-white/[0.02] border border-white/[0.06] p-1 rounded-xl">
            <TabsTrigger
              value="process"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Process
            </TabsTrigger>
            <TabsTrigger
              value="assessment"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Assessment
            </TabsTrigger>
            <TabsTrigger
              value="guidance"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Guidance
            </TabsTrigger>
            <TabsTrigger
              value="documentation"
              className="flex-1 data-[state=active]:bg-elec-yellow data-[state=active]:text-black rounded-lg transition-all"
            >
              Documentation
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="process" className="space-y-4 mt-5">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
              Risk assessment process
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {processSteps.map((step) => (
                <div
                  key={step.step}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4 space-y-2"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-md bg-elec-yellow text-black font-semibold text-[12px] flex items-center justify-center font-mono">
                      {step.step}
                    </span>
                    <p className="text-[14px] text-white">{step.title}</p>
                  </div>
                  <p className="text-[13px] text-white/70 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Legal requirements
              </span>
              <ul className="space-y-1.5">
                {legalRequirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
                Best practices
              </span>
              <ul className="space-y-1.5">
                {bestPractices.map((practice, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-[14px] text-white/85 leading-relaxed"
                  >
                    <span className="w-1 h-1 rounded-full bg-white/55 mt-2 flex-shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-4 mt-5">
          <HazardIdentificationMatrix onHazardSelected={handleHazardSelected} />

          {selectedHazard && (
            <div className="rounded-xl border border-elec-yellow/20 bg-elec-yellow/[0.04] p-4 sm:p-5 space-y-2">
              <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
                Selected hazard
              </span>
              <p className="text-[14px] text-white/85 leading-relaxed">{selectedHazard}</p>
            </div>
          )}

          {selectedHazard && <RiskCalculationMatrix onRiskCalculated={handleRiskCalculated} />}

          {currentAssessment && (
            <ControlMeasuresGenerator onControlMeasuresAdded={handleControlMeasuresAdded} />
          )}
        </TabsContent>

        <TabsContent value="guidance" className="space-y-4 mt-5">
          {currentAssessment ? (
            <RiskOutcomeGuidance
              riskLevel={currentAssessment.riskLevel}
              riskScore={currentAssessment.riskScore}
            />
          ) : (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-8 text-center space-y-2">
              <p className="text-[16px] font-medium text-white">No assessment data</p>
              <p className="text-[14px] text-white/70 leading-relaxed">
                Complete a risk assessment in the Assessment tab to view guidance
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4 mt-5">
          <RiskDocumentation assessment={currentAssessment} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RiskAssessmentTab;
