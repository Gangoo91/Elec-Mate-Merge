
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, ArrowRight, ExternalLink } from "lucide-react";
import EnhancedFundingCalculator from "@/components/enhanced-funding/EnhancedFundingCalculator";

const FundingCalculator = () => {
  const [showEnhanced, setShowEnhanced] = useState(false);

  if (showEnhanced) {
    return (
      <div className="space-y-4">
        <Button 
          variant="outline" 
          onClick={() => setShowEnhanced(false)}
          className="mb-4"
        >
          ← Back to Basic Calculator
        </Button>
        <EnhancedFundingCalculator />
      </div>
    );
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-primary" />
          Education Funding Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Quick funding estimates for professional development courses
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Updated 2025 Information */}
        <Alert className="border-blue-500/20 bg-blue-500/5">
          <AlertDescription>
            <strong>2025 Update:</strong> This calculator now includes updated funding rates for 2025/26 including 
            the increased Postgraduate Loan (£12,858), professional qualification funding, and regional variations.
          </AlertDescription>
        </Alert>

        {/* Quick Reference */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold mb-1">Student Finance (Level 6)</h4>
            <p className="text-muted-foreground">Up to £9,250 tuition + maintenance loan</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold mb-1">Postgraduate Loan (Level 7)</h4>
            <p className="text-muted-foreground">Up to £12,858 for master's courses</p>
          </div>
          <div className="p-3 bg-muted rounded-lg">
            <h4 className="font-semibold mb-1">Advanced Learner Loan</h4>
            <p className="text-muted-foreground">Levels 3-6, repay when earning £27,295+</p>
          </div>
        </div>

        {/* Enhanced Calculator Button */}
        <div className="text-center space-y-4">
          <Button 
            onClick={() => setShowEnhanced(true)}
            size="lg"
            className="w-full"
          >
            <Calculator className="mr-2 h-4 w-4" />
            Use Enhanced Funding Calculator (2025)
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Get comprehensive funding analysis including professional qualifications, 
            regional variations, employer support, and updated 2025 rates
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <a 
            href="https://www.gov.uk/student-finance" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span>Apply for Student Finance</span>
          </a>
          <a 
            href="https://www.gov.uk/advanced-learner-loan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span>Advanced Learner Loan Info</span>
          </a>
          <a 
            href="https://www.gov.uk/guidance/skills-bank" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span>Skills Bank Funding</span>
          </a>
          <a 
            href="https://www.theiet.org/membership/awards-scholarships/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 p-3 border rounded-lg hover:bg-muted transition-colors"
          >
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <span>IET Professional Funding</span>
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default FundingCalculator;
