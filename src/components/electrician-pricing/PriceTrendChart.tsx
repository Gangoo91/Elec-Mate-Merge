import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Area,
  AreaChart
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, Info } from "lucide-react";

interface PricePoint {
  date: string;
  price: number;
  confidence: number;
  source: 'live' | 'estimated' | 'historical';
}

interface PriceTrendChartProps {
  data: PricePoint[];
  itemName: string;
  currentPrice: number;
  priceChange: number;
  priceChangePercent: number;
  timeframe: '7d' | '30d' | '90d' | '1y';
  onTimeframeChange: (timeframe: '7d' | '30d' | '90d' | '1y') => void;
}

const PriceTrendChart = ({
  data,
  itemName,
  currentPrice,
  priceChange,
  priceChangePercent,
  timeframe,
  onTimeframeChange
}: PriceTrendChartProps) => {
  
  const isPositiveTrend = priceChange >= 0;
  const TrendIcon = isPositiveTrend ? TrendingUp : TrendingDown;
  
  const timeframeLabels = {
    '7d': '7 Days',
    '30d': '30 Days', 
    '90d': '3 Months',
    '1y': '1 Year'
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div className="bg-elec-dark border border-elec-yellow/30 rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-white">{`Date: ${new Date(label).toLocaleDateString('en-GB')}`}</p>
          <p className="text-sm text-elec-yellow">{`Price: £${payload[0].value.toFixed(2)}`}</p>
          <p className="text-xs text-muted-foreground">{`Confidence: ${dataPoint.confidence}%`}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className={`w-2 h-2 rounded-full ${
              dataPoint.source === 'live' ? 'bg-green-400' : 
              dataPoint.source === 'estimated' ? 'bg-yellow-400' : 'bg-gray-400'
            }`}></div>
            <span className="text-xs text-muted-foreground capitalize">{dataPoint.source}</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{itemName} Price Trend</CardTitle>
          <div className="flex items-center gap-2">
            <TrendIcon className={`h-4 w-4 ${isPositiveTrend ? 'text-red-400' : 'text-green-400'}`} />
            <span className={`text-sm font-medium ${isPositiveTrend ? 'text-red-400' : 'text-green-400'}`}>
              {isPositiveTrend ? '+' : ''}{priceChangePercent.toFixed(1)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-white">£{currentPrice.toFixed(2)}</span>
            <span className={`ml-2 text-sm ${isPositiveTrend ? 'text-red-400' : 'text-green-400'}`}>
              ({isPositiveTrend ? '+' : ''}£{Math.abs(priceChange).toFixed(2)})
            </span>
          </div>
          
          <div className="flex gap-1">
            {(Object.keys(timeframeLabels) as Array<keyof typeof timeframeLabels>).map((period) => (
              <button
                key={period}
                onClick={() => onTimeframeChange(period)}
                className={`px-2 py-1 rounded text-xs transition-colors ${
                  timeframe === period 
                    ? 'bg-elec-yellow text-elec-dark font-medium' 
                    : 'text-muted-foreground hover:text-white hover:bg-elec-yellow/10'
                }`}
              >
                {timeframeLabels[period]}
              </button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        {/* Chart */}
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-GB', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tickFormatter={(value) => `£${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#F59E0B"
                strokeWidth={2}
                fill="url(#priceGradient)"
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  const colors = {
                    live: '#10B981',
                    estimated: '#F59E0B', 
                    historical: '#6B7280'
                  };
                  return (
                    <circle 
                      cx={cx} 
                      cy={cy} 
                      r={3} 
                      fill={colors[payload.source as keyof typeof colors]}
                      stroke="#1F2937"
                      strokeWidth={1}
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend and Data Quality */}
        <div className="mt-4 pt-4 border-t border-elec-yellow/10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                <span className="text-xs text-muted-foreground">Live Data</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <span className="text-xs text-muted-foreground">Estimated</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-xs text-muted-foreground">Historical</span>
              </div>
            </div>
            
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              <Calendar className="h-3 w-3 mr-1" />
              {timeframeLabels[timeframe]}
            </Badge>
          </div>

          {/* Data Quality Summary */}
          <div className="bg-elec-yellow/5 border border-elec-yellow/10 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Info className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="text-sm font-medium text-white mb-1">Price Trend Analysis</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">Data Points:</span> {data.length}
                  </div>
                  <div>
                    <span className="font-medium">Avg Confidence:</span> {
                      Math.round(data.reduce((acc, point) => acc + point.confidence, 0) / data.length)
                    }%
                  </div>
                  <div>
                    <span className="font-medium">Live Sources:</span> {
                      data.filter(point => point.source === 'live').length
                    }
                  </div>
                  <div>
                    <span className="font-medium">Volatility:</span> {
                      Math.abs(priceChangePercent) > 10 ? 'High' : 
                      Math.abs(priceChangePercent) > 5 ? 'Medium' : 'Low'
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceTrendChart;