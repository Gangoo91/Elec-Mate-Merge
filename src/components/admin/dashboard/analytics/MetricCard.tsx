
interface MetricCardProps {
  color: string;
  label: string;
  value: string;
}

const MetricCard = ({ color, label, value }: MetricCardProps) => {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`h-2.5 w-2.5 rounded-full ${color}`}></span>
      <span>{label}: {value}</span>
    </div>
  );
};

export default MetricCard;
