import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users, FileText } from "lucide-react";
import { IncomeStream, ExpenseCategory } from "@/hooks/use-cash-flow";

interface QuickStartTemplatesProps {
  onLoadTemplate: (
    incomeStreams: Omit<IncomeStream, 'id'>[],
    expenseCategories: Omit<ExpenseCategory, 'id'>[]
  ) => void;
}

export const QuickStartTemplates = ({ onLoadTemplate }: QuickStartTemplatesProps) => {
  const loadSoleTraderTemplate = () => {
    const incomeStreams: Omit<IncomeStream, 'id'>[] = [
      {
        name: 'Domestic Installations',
        amount: 4500,
        frequency: 'monthly',
        paymentDelayDays: 14,
        growth: 0.05
      },
      {
        name: 'Emergency Callouts',
        amount: 1200,
        frequency: 'monthly',
        paymentDelayDays: 0,
        growth: 0.03
      },
      {
        name: 'Maintenance Contracts',
        amount: 800,
        frequency: 'monthly',
        paymentDelayDays: 30,
        growth: 0.08
      }
    ];

    const expenseCategories: Omit<ExpenseCategory, 'id'>[] = [
      {
        name: 'Materials & Supplies',
        amount: 1500,
        frequency: 'monthly',
        variable: true,
        growth: 0.03
      },
      {
        name: 'Van Costs (Fuel, Tax, etc.)',
        amount: 650,
        frequency: 'monthly',
        variable: true,
        growth: 0.04
      },
      {
        name: 'Tools & Equipment',
        amount: 300,
        frequency: 'monthly',
        variable: false,
        growth: 0.02
      },
      {
        name: 'Insurance (Van, Public Liability)',
        amount: 1800,
        frequency: 'annual',
        timing: 3,
        variable: false,
        growth: 0.05
      },
      {
        name: 'Professional Fees (NICEIC/NAPIT)',
        amount: 600,
        frequency: 'annual',
        timing: 1,
        variable: false,
        growth: 0.03
      },
      {
        name: 'Marketing & Website',
        amount: 150,
        frequency: 'monthly',
        variable: false,
        growth: 0.05
      }
    ];

    onLoadTemplate(incomeStreams, expenseCategories);
  };

  const loadSmallBusinessTemplate = () => {
    const incomeStreams: Omit<IncomeStream, 'id'>[] = [
      {
        name: 'Commercial Contracts',
        amount: 12000,
        frequency: 'monthly',
        paymentDelayDays: 30,
        growth: 0.06
      },
      {
        name: 'Domestic Projects',
        amount: 5000,
        frequency: 'monthly',
        paymentDelayDays: 14,
        growth: 0.04
      },
      {
        name: 'Maintenance Contracts',
        amount: 3500,
        frequency: 'monthly',
        paymentDelayDays: 30,
        growth: 0.08
      },
      {
        name: 'Emergency Services',
        amount: 2000,
        frequency: 'monthly',
        paymentDelayDays: 7,
        growth: 0.03
      }
    ];

    const expenseCategories: Omit<ExpenseCategory, 'id'>[] = [
      {
        name: 'Materials & Supplies',
        amount: 5500,
        frequency: 'monthly',
        variable: true,
        growth: 0.03
      },
      {
        name: 'Employee Wages (3 staff)',
        amount: 9000,
        frequency: 'monthly',
        variable: false,
        growth: 0.04
      },
      {
        name: 'Vehicle Fleet Costs',
        amount: 1800,
        frequency: 'monthly',
        variable: true,
        growth: 0.04
      },
      {
        name: 'Office & Storage Rent',
        amount: 1200,
        frequency: 'monthly',
        variable: false,
        growth: 0.03
      },
      {
        name: 'Tools & Equipment',
        amount: 800,
        frequency: 'monthly',
        variable: false,
        growth: 0.02
      },
      {
        name: 'Insurance (Full Coverage)',
        amount: 4500,
        frequency: 'annual',
        timing: 3,
        variable: false,
        growth: 0.05
      },
      {
        name: 'Professional Fees & Memberships',
        amount: 1200,
        frequency: 'annual',
        timing: 1,
        variable: false,
        growth: 0.03
      },
      {
        name: 'Marketing & Advertising',
        amount: 600,
        frequency: 'monthly',
        variable: false,
        growth: 0.08
      },
      {
        name: 'Accountancy & Legal',
        amount: 2400,
        frequency: 'annual',
        timing: 12,
        variable: false,
        growth: 0.04
      }
    ];

    onLoadTemplate(incomeStreams, expenseCategories);
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-card">
      <CardHeader>
        <CardTitle className="text-elec-light">Quick Start Templates</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-elec-light/80 text-sm mb-4">
          Choose a template to get started quickly with pre-configured income and expenses based on typical UK electrician businesses.
        </p>
        <div className="grid gap-3 sm:grid-cols-3">
          <Button 
            onClick={loadSoleTraderTemplate}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-auto py-4 flex flex-col items-center gap-2"
          >
            <User className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">Sole Trader</div>
              <div className="text-xs opacity-90">1-2 person operation</div>
            </div>
          </Button>
          
          <Button 
            onClick={loadSmallBusinessTemplate}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-auto py-4 flex flex-col items-center gap-2"
          >
            <Users className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">Small Business</div>
              <div className="text-xs opacity-90">3-5 employees</div>
            </div>
          </Button>
          
          <Button 
            variant="outline"
            className="h-auto py-4 flex flex-col items-center gap-2 border-elec-yellow/30 text-elec-light hover:bg-elec-yellow/10"
          >
            <FileText className="h-6 w-6" />
            <div className="text-center">
              <div className="font-semibold">Start from Scratch</div>
              <div className="text-xs opacity-80">Build your own</div>
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
