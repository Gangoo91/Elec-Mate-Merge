
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Calendar, AlertCircle, Calculator } from "lucide-react";

const TaxPlanningTab = () => {
  const taxYearEvents = [
    {
      date: "5th April",
      event: "Tax Year End",
      description: "End of tax year - gather all financial records",
      importance: "Critical"
    },
    {
      date: "6th April",
      event: "New Tax Year Begins",
      description: "Start new record keeping for the new tax year",
      importance: "High"
    },
    {
      date: "31st May",
      event: "P60 & P11D Deadline",
      description: "Deadline for employers to provide tax documents",
      importance: "Medium"
    },
    {
      date: "31st October",
      event: "Self Assessment Registration",
      description: "Final deadline to register for Self Assessment",
      importance: "Critical"
    },
    {
      date: "31st January",
      event: "Self Assessment & Payment",
      description: "Submit tax return and pay any tax owed",
      importance: "Critical"
    },
    {
      date: "31st July",
      event: "Payment on Account",
      description: "Second payment on account for next year's tax",
      importance: "High"
    }
  ];

  const monthlyTasks = [
    {
      task: "Record all income and expenses",
      frequency: "Monthly",
      description: "Keep detailed records of all business transactions"
    },
    {
      task: "Reconcile bank statements",
      frequency: "Monthly", 
      description: "Match bank transactions with your records"
    },
    {
      task: "Review and categorise expenses",
      frequency: "Monthly",
      description: "Ensure all expenses are properly categorised"
    },
    {
      task: "Update mileage logs",
      frequency: "Weekly",
      description: "Record all business journeys promptly"
    },
    {
      task: "File receipts and invoices",
      frequency: "Weekly",
      description: "Organise physical and digital documentation"
    },
    {
      task: "Review cash flow",
      frequency: "Monthly",
      description: "Monitor business financial health"
    }
  ];

  const taxPlanningTips = [
    {
      category: "Income Spreading",
      tips: [
        "Consider timing of large invoices near year-end",
        "Spread work over tax years to manage tax bands",
        "Plan for irregular income months"
      ]
    },
    {
      category: "Expense Timing",
      tips: [
        "Purchase equipment before year-end if beneficial",
        "Time training courses for maximum tax relief",
        "Consider prepaying some expenses"
      ]
    },
    {
      category: "Pension Planning",
      tips: [
        "Maximise annual allowance contributions",
        "Consider carry forward of unused allowances",
        "Review pension tax relief benefits"
      ]
    },
    {
      category: "Business Structure",
      tips: [
        "Review if current structure is tax-efficient",
        "Consider incorporation timing",
        "Plan for future growth and tax implications"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2 text-lg md:text-xl">
            <Clock className="h-5 w-5" />
            Tax Planning & Key Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4 text-sm md:text-base leading-relaxed">
            Effective tax planning requires understanding key deadlines and maintaining organised records 
            throughout the year. Proper planning can significantly reduce your tax liability.
          </p>
        </CardContent>
      </Card>

      <Card className="border-red-500/50 bg-red-500/10">
        <CardHeader>
          <CardTitle className="text-red-300 flex items-center gap-2 text-lg md:text-xl">
            <Calendar className="h-5 w-5" />
            Key Tax Dates & Deadlines
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {taxYearEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 p-4 border border-red-500/30 rounded-lg">
                <div className="flex-shrink-0">
                  <Badge 
                    variant="outline" 
                    className={`border-red-500/50 ${
                      event.importance === 'Critical' ? 'text-red-300' : 'text-orange-300'
                    }`}
                  >
                    {event.date}
                  </Badge>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white mb-1">{event.event}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>
                </div>
                <Badge 
                  variant="outline" 
                  className={`shrink-0 ${
                    event.importance === 'Critical' 
                      ? 'border-red-500/50 text-red-300' 
                      : event.importance === 'High'
                      ? 'border-orange-500/50 text-orange-300'
                      : 'border-yellow-500/50 text-yellow-300'
                  }`}
                >
                  {event.importance}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/50 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg md:text-xl">
            <AlertCircle className="h-5 w-5" />
            Regular Tax Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            {monthlyTasks.map((task, index) => (
              <div key={index} className="p-4 border border-green-500/30 rounded-lg">
                <div className="flex items-start gap-2 mb-2">
                  <Badge variant="outline" className="border-green-500/30 shrink-0">
                    {task.frequency}
                  </Badge>
                  <h4 className="font-semibold text-white leading-tight">{task.task}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{task.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2 text-lg md:text-xl">
            <Calculator className="h-5 w-5" />
            Advanced Tax Planning Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {taxPlanningTips.map((category, index) => (
              <div key={index} className="border border-purple-500/30 rounded-lg p-4">
                <h4 className="font-semibold text-purple-200 mb-3">{category.category}</h4>
                <ul className="space-y-2">
                  {category.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-purple-400 mt-1 shrink-0">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TaxPlanningTab;
