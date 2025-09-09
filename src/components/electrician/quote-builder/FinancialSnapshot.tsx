import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Quote } from '@/types/quote';
import { calculateFinancialBreakdown } from '@/utils/quote-analytics';
import { TrendingUp, DollarSign, PieChart, Target, Wrench, Clock, Receipt, CreditCard } from 'lucide-react';

interface FinancialSnapshotProps {
  isOpen: boolean;
  onClose: () => void;
  quotes: Quote[];
}

const FinancialSnapshot: React.FC<FinancialSnapshotProps> = ({ 
  isOpen, 
  onClose, 
  quotes 
}) => {
  const breakdown = calculateFinancialBreakdown(quotes);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount);
  };

  const formatPercentage = (percentage: number) => {
    return `${percentage.toFixed(1)}%`;
  };

  const metrics = [
    {
      title: "Total Revenue",
      value: formatCurrency(breakdown.totalRevenue),
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Total Costs",
      value: formatCurrency(breakdown.totalCosts),
      icon: Receipt,
      color: "text-red-500"
    },
    {
      title: "Total Profit",
      value: formatCurrency(breakdown.totalProfit),
      icon: TrendingUp,
      color: "text-blue-500"
    },
    {
      title: "Profit Margin",
      value: formatPercentage(breakdown.profitMargin),
      icon: Target,
      color: "text-purple-500"
    },
    {
      title: "Average Quote Value",
      value: formatCurrency(breakdown.averageQuoteValue),
      icon: PieChart,
      color: "text-orange-500"
    },
    {
      title: "Materials Total",
      value: formatCurrency(breakdown.materialsTotal),
      icon: Wrench,
      color: "text-yellow-500"
    },
    {
      title: "Labour Total",
      value: formatCurrency(breakdown.labourTotal),
      icon: Clock,
      color: "text-indigo-500"
    },
    {
      title: "VAT Total",
      value: formatCurrency(breakdown.vatTotal),
      icon: CreditCard,
      color: "text-pink-500"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <TrendingUp className="h-6 w-6" />
            Financial Snapshot
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index} className="border-0 shadow-lg bg-gradient-to-br from-card to-card/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <p className="text-xl font-bold">{metric.value}</p>
                    </div>
                    <div className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800`}>
                      <metric.icon className={`h-5 w-5 ${metric.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

           {/* Breakdown Summary */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5 border-b">
              <CardTitle className="flex items-center gap-2 text-xl">
                <PieChart className="h-5 w-5" />
                Financial Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Revenue Breakdown */}
                <div className="p-6 border-b lg:border-b-0 lg:border-r">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <h4 className="font-semibold text-lg text-green-700 dark:text-green-400">Revenue Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-sm font-medium">Subtotal:</span>
                        <span className="font-mono text-sm font-semibold">{formatCurrency(breakdown.totalRevenue - breakdown.vatTotal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-sm font-medium">VAT:</span>
                        <span className="font-mono text-sm font-semibold">{formatCurrency(breakdown.vatTotal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                        <span className="font-semibold text-green-800 dark:text-green-200">Total Revenue:</span>
                        <span className="font-mono font-bold text-green-800 dark:text-green-200">{formatCurrency(breakdown.totalRevenue)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Cost Breakdown */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="h-3 w-3 rounded-full bg-red-500"></div>
                      <h4 className="font-semibold text-lg text-red-700 dark:text-red-400">Cost Breakdown</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-sm font-medium">Materials:</span>
                        <span className="font-mono text-sm font-semibold">{formatCurrency(breakdown.materialsTotal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-sm font-medium">Labour:</span>
                        <span className="font-mono text-sm font-semibold">{formatCurrency(breakdown.labourTotal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 px-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
                        <span className="text-sm font-medium">Overhead:</span>
                        <span className="font-mono text-sm font-semibold">{formatCurrency(breakdown.overheadTotal)}</span>
                      </div>
                      <div className="flex justify-between items-center py-3 px-3 rounded-lg bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800">
                        <span className="font-semibold text-red-800 dark:text-red-200">Total Costs:</span>
                        <span className="font-mono font-bold text-red-800 dark:text-red-200">{formatCurrency(breakdown.totalCosts)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Net Profit Section */}
              <div className="p-6 border-t bg-gradient-to-r from-gray-50 to-blue-50 dark:from-gray-900/50 dark:to-blue-900/20">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <TrendingUp className={`h-5 w-5 ${breakdown.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                      <span className="text-lg font-bold">Net Profit:</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Profit Margin: {formatPercentage(breakdown.profitMargin)}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-2xl font-bold font-mono ${breakdown.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(breakdown.totalProfit)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {breakdown.totalProfit >= 0 ? 'Profitable' : 'Loss'}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="font-semibold text-green-800 dark:text-green-200">Revenue Performance</div>
                  <div className="text-green-600 dark:text-green-300">
                    {breakdown.totalRevenue > 0 ? 'Active revenue stream' : 'No completed quotes yet'}
                  </div>
                </div>
                
                <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="font-semibold text-blue-800 dark:text-blue-200">Profit Health</div>
                  <div className="text-blue-600 dark:text-blue-300">
                    {breakdown.profitMargin >= 20 ? 'Healthy margins' : 
                     breakdown.profitMargin >= 10 ? 'Moderate margins' : 
                     breakdown.profitMargin > 0 ? 'Low margins' : 'Operating at loss'}
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                  <div className="font-semibold text-purple-800 dark:text-purple-200">Quote Efficiency</div>
                  <div className="text-purple-600 dark:text-purple-300">
                    {breakdown.averageQuoteValue > 1000 ? 'High-value projects' : 
                     breakdown.averageQuoteValue > 500 ? 'Medium-value projects' : 'Small projects'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinancialSnapshot;