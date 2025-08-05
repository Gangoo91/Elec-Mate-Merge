import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  TrendingUp, 
  PiggyBank, 
  Calendar,
  Zap,
  Shield,
  Target,
  Clock,
  DollarSign
} from "lucide-react";

interface Insight {
  type: 'warning' | 'success' | 'info';
  title: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
}

interface FinancialInsightsProps {
  insights: Insight[];
  financialMetrics: {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    avgMonthlyIncome: number;
    avgMonthlyExpenses: number;
    minBalance: number;
    maxBalance: number;
    cashRunway: number;
    profitMargin: number;
    breakEvenMonth: number;
  };
  emergencyFundTarget: number;
}

export const FinancialInsights = ({ insights, financialMetrics, emergencyFundTarget }: FinancialInsightsProps) => {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  const getInsightVariant = (type: string) => {
    switch (type) {
      case 'warning':
        return 'destructive';
      case 'success':
        return 'default'; // Use default variant instead of success
      default:
        return 'default';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="yellow">Medium Priority</Badge>;
      default:
        return <Badge variant="secondary">Low Priority</Badge>;
    }
  };

  const emergencyFundProgress = Math.min((financialMetrics.minBalance / emergencyFundTarget) * 100, 100);
  const profitMarginHealth = financialMetrics.profitMargin >= 20 ? 'excellent' : 
                            financialMetrics.profitMargin >= 10 ? 'good' : 
                            financialMetrics.profitMargin >= 5 ? 'fair' : 'poor';

  const industryBenchmarks = {
    profitMargin: { excellent: 20, good: 15, fair: 10 },
    cashRunway: { excellent: 6, good: 4, fair: 2 },
    emergencyFund: { excellent: 6, good: 4, fair: 2 }
  };

  const electricianSpecificMetrics = [
    {
      title: "Certification Compliance",
      icon: <Shield className="h-5 w-5 text-blue-400" />,
      value: "18th Edition",
      description: "Current BS7671 compliance",
      status: "compliant"
    },
    {
      title: "Equipment Replacement",
      icon: <Zap className="h-5 w-5 text-yellow-400" />,
      value: "£2,400",
      description: "Annual equipment budget",
      status: "adequate"
    },
    {
      title: "VAT Planning",
      icon: <Calendar className="h-5 w-5 text-purple-400" />,
      value: "Quarterly",
      description: "VAT return frequency",
      status: "optimal"
    },
    {
      title: "Seasonal Planning",
      icon: <Clock className="h-5 w-5 text-orange-400" />,
      value: "Summer Peak",
      description: "Revenue pattern identified",
      status: "planned"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Financial Health Dashboard */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Financial Health Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-green-400" />
                <span className="text-sm text-muted-foreground">Profit Margin</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {financialMetrics.profitMargin.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Industry benchmark: 15%
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-muted-foreground">Cash Runway</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {financialMetrics.cashRunway} months
              </div>
              <div className="text-xs text-muted-foreground">
                Target: 6+ months
              </div>
            </div>

            <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
              <div className="flex items-center gap-2 mb-2">
                <PiggyBank className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-muted-foreground">Emergency Fund</span>
              </div>
              <div className="text-2xl font-bold text-white">
                {emergencyFundProgress.toFixed(0)}%
              </div>
              <Progress value={emergencyFundProgress} className="mt-2" />
            </div>

            <div className="p-4 rounded-lg bg-secondary/20 border border-secondary/40">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-muted-foreground">Break-Even</span>
              </div>
              <div className="text-2xl font-bold text-white">
                Month {financialMetrics.breakEvenMonth || 'N/A'}
              </div>
              <div className="text-xs text-muted-foreground">
                {financialMetrics.breakEvenMonth <= 6 ? 'Healthy' : 'Needs attention'}
              </div>
            </div>
          </div>

          {/* Industry-Specific Metrics */}
          <div>
            <h4 className="text-white font-medium mb-3">Electrician Business Metrics</h4>
            <div className="grid gap-3 md:grid-cols-2">
              {electricianSpecificMetrics.map((metric, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                  {metric.icon}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{metric.title}</span>
                      <span className="text-elec-yellow font-bold">{metric.value}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{metric.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Insights & Alerts */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            Business Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.length > 0 ? (
            insights.map((insight, index) => (
              <Alert key={index} variant={getInsightVariant(insight.type)}>
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium">{insight.title}</h4>
                      {getPriorityBadge(insight.priority)}
                    </div>
                    <AlertDescription>
                      {insight.message}
                    </AlertDescription>
                  </div>
                </div>
              </Alert>
            ))
          ) : (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Your cash flow appears healthy with no immediate concerns identified.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Growth Opportunities */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-elec-yellow" />
            Growth Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
              <h4 className="font-medium text-green-400 mb-2">Revenue Optimization</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Consider premium service packages</li>
                <li>• Implement value-based pricing</li>
                <li>• Expand into renewable energy installations</li>
                <li>• Offer maintenance contracts</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <h4 className="font-medium text-blue-400 mb-2">Cost Management</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Negotiate bulk supplier discounts</li>
                <li>• Optimize vehicle routes and fuel costs</li>
                <li>• Review insurance policies annually</li>
                <li>• Invest in energy-efficient tools</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/30">
              <h4 className="font-medium text-purple-400 mb-2">Cash Flow Improvement</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Implement progress billing</li>
                <li>• Offer payment incentives for early settlement</li>
                <li>• Use invoice factoring for large jobs</li>
                <li>• Establish supplier payment terms</li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
              <h4 className="font-medium text-yellow-400 mb-2">Risk Mitigation</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Diversify customer base</li>
                <li>• Build relationships with multiple suppliers</li>
                <li>• Maintain comprehensive insurance</li>
                <li>• Keep certifications current</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};