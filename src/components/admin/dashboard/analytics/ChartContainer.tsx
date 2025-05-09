
interface Metric {
  label: string;
  value: string;
}

interface ChartContainerProps {
  title: string;
  metrics?: Metric[];
  showBarMetrics?: boolean;
}

const ChartContainer = ({ title, metrics, showBarMetrics = false }: ChartContainerProps) => {
  return (
    <div className="bg-elec-gray-light/10 p-4 rounded-lg">
      <h4 className="text-sm font-medium mb-4">{title}</h4>
      <div className="h-48 flex items-center justify-center border border-dashed border-elec-yellow/20 rounded">
        <p className="text-sm text-gray-400">{title} chart would render here</p>
      </div>
      
      {metrics && (
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          {metrics.map((metric, index) => (
            <div key={index}>
              <p className="text-xs text-gray-400">{metric.label}</p>
              <p className="font-semibold">{metric.value}</p>
            </div>
          ))}
        </div>
      )}
      
      {showBarMetrics && (
        <div className="mt-4">
          <div className="text-xs mb-1">
            <span className="inline-block w-32 truncate">Electrical Installation Fundamentals</span>
            <span className="float-right">426 views</span>
            <div className="h-1.5 bg-elec-gray-light/30 rounded-full mt-1">
              <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '90%' }}></div>
            </div>
          </div>
          <div className="text-xs mb-1">
            <span className="inline-block w-32 truncate">Circuit Design & Analysis</span>
            <span className="float-right">298 views</span>
            <div className="h-1.5 bg-elec-gray-light/30 rounded-full mt-1">
              <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartContainer;
