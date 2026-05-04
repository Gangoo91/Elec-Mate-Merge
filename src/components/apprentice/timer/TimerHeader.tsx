import StatusIndicator from './StatusIndicator';

interface TimerHeaderProps {
  isInactive: boolean;
  isVideoContent: boolean;
}

const TimerHeader = ({ isInactive, isVideoContent }: TimerHeaderProps) => {
  return (
    <div className="flex items-center gap-2">
      <h3 className="text-[16px] font-semibold text-white">Off-the-job training timer</h3>

      {isInactive && !isVideoContent && (
        <StatusIndicator isActive={true} text="Inactive" className="ml-2" />
      )}
    </div>
  );
};

export default TimerHeader;
