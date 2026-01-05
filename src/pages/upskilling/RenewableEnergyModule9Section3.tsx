import { ArrowLeft, ArrowRight, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import SingleQuestionQuiz from '@/components/upskilling/quiz/SingleQuestionQuiz';
import CostBenefitAnalysisTable from '@/components/upskilling/renewable-energy/CostBenefitAnalysisTable';
import TaxVATConsiderations from '@/components/upskilling/renewable-energy/TaxVATConsiderations';
import UsagePatternAnalysis from '@/components/upskilling/renewable-energy/UsagePatternAnalysis';
import RealWorldCaseStudies from '@/components/upskilling/renewable-energy/RealWorldCaseStudies';
import AdvancedFinancialConsiderations from '@/components/upskilling/renewable-energy/AdvancedFinancialConsiderations';

const RenewableEnergyModule9Section3 = () => {
  const quizQuestions = [
    {
      id: 1,
      question: "Why do commercial systems often have better ROI?",
      options: [
        "They have higher electricity rates",
        "Economy of scale and better financing options",
        "They generate more power per panel",
        "They don't need maintenance"
      ],
      correct: 1,
      explanation: "Commercial systems benefit from economy of scale (lower cost per kW), better financing options, tax advantages like capital allowances, and typically higher electricity consumption rates."
    },
    {
      id: 2,
      question: "What's a key difference in usage between homes and businesses?",
      options: [
        "Businesses use more electricity overall",
        "Homes peak in the evening, businesses during the day",
        "Businesses have lower electricity rates",
        "Homes need bigger systems"
      ],
      correct: 1,
      explanation: "Businesses typically have peak electricity demand during daytime hours (when solar generates most), while homes peak in the evening. This means better solar self-consumption for commercial systems."
    },
    {
      id: 3,
      question: "Can commercial installations claim VAT back?",
      options: [
        "No, VAT applies to all solar installations",
        "Only for systems over 100kW",
        "Yes, if the business is VAT registered",
        "Only for government buildings"
      ],
      correct: 2,
      explanation: "VAT-registered businesses can reclaim VAT on commercial solar installations, effectively reducing the installation cost by 20%. Domestic installations are VAT-exempt for systems up to certain sizes."
    },
    {
      id: 4,
      question: "What role do grants play in business installations?",
      options: [
        "They're not available for businesses",
        "They reduce upfront costs and improve payback",
        "They only apply to manufacturing businesses",
        "They replace the need for SEG payments"
      ],
      correct: 1,
      explanation: "Business grants (like Local Enterprise Partnership funding, green business grants, or sector-specific schemes) can significantly reduce upfront costs, improving ROI and making projects viable that might not otherwise proceed."
    },
    {
      id: 5,
      question: "What's the main downside of large commercial installations?",
      options: [
        "They generate less power per panel",
        "Higher complexity, planning requirements, and longer lead times",
        "They can't export to the grid",
        "Lower electricity rates"
      ],
      correct: 1,
      explanation: "Large commercial installations involve greater complexity in design, planning permissions, grid connection applications, structural assessments, and longer project timelines compared to domestic systems."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="px-8 pt-8 pb-12">
        <Link to="../renewable-energy-module-9">
          <Button
            variant="ghost"
            className="text-foreground hover:bg-card hover:text-yellow-400 transition-all duration-200 mb-8 px-4 py-2 rounded-md"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Module 9
          </Button>
        </Link>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Calculator className="h-8 w-8 text-yellow-400" />
              <div>
                <h1 className="text-4xl font-bold text-white">
                  Cost-Benefit Analysis (Domestic vs Commercial Systems)
                </h1>
                <p className="text-xl text-gray-400">
                  Comparing financial benefits across different system types
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <Badge variant="secondary" className="bg-yellow-400 text-black">
                Module 9
              </Badge>
              <Badge variant="outline" className="border-gray-600 text-gray-300">
                Section 3
              </Badge>
            </div>
          </div>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Commercial systems aren't just bigger — they offer different benefits, risks, and incentives 
                compared to domestic installations. This section compares both sectors to help installers 
                understand the distinct financial advantages and challenges of each market.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Learning Objectives</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Compare capital cost vs yield in both sectors</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Understand differences in tax, VAT, and grant eligibility</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Recognise how usage patterns affect ROI</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
                <span>Learn how to tailor design to user profiles</span>
              </div>
            </CardContent>
          </Card>

          <CostBenefitAnalysisTable />

          <TaxVATConsiderations />

          <UsagePatternAnalysis />

          <RealWorldCaseStudies />

          <AdvancedFinancialConsiderations />

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white">Summary</CardTitle>
            </CardHeader>
            <CardContent className="text-gray-300">
              <p>
                Commercial systems typically offer faster payback due to economies of scale and better 
                demand matching, but require more complex planning and larger capital investment. Domestic 
                systems offer easier installation and planning but longer payback periods. Both must be 
                carefully matched to user energy profiles and financial circumstances.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-transparent">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
                Knowledge Check
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SingleQuestionQuiz questions={quizQuestions} title="Cost-Benefit Analysis Quiz" />
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Link to="../renewable-energy-module-9-section-2">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-card">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous Section
              </Button>
            </Link>
            <Link to="../renewable-energy-module-9-section-4">
              <Button className="bg-yellow-400 text-black hover:bg-yellow-600">
                Next Section
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RenewableEnergyModule9Section3;