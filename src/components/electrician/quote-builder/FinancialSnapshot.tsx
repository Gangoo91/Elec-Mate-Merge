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
          <Card>
            <CardHeader>
              <CardTitle>Financial Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Revenue Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-mono">{formatCurrency(breakdown.totalRevenue - breakdown.vatTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT:</span>
                        <span className="font-mono">{formatCurrency(breakdown.vatTotal)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total Revenue:</span>
                        <span className="font-mono">{formatCurrency(breakdown.totalRevenue)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-lg">Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Materials:</span>
                        <span className="font-mono">{formatCurrency(breakdown.materialsTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Labour:</span>
                        <span className="font-mono">{formatCurrency(breakdown.labourTotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Overhead:</span>
                        <span className="font-mono">{formatCurrency(breakdown.overheadTotal)}</span>
                      </div>
                      <div className="flex justify-between border-t pt-2 font-semibold">
                        <span>Total Costs:</span>
                        <span className="font-mono">{formatCurrency(breakdown.totalCosts)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Net Profit:</span>
                    <span className={`font-mono ${breakdown.totalProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(breakdown.totalProfit)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                    <span>Profit Margin:</span>
                    <span>{formatPercentage(breakdown.profitMargin)}</span>
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