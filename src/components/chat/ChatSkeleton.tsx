
const ChatSkeleton = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-[#2c2c2c] animate-pulse p-6 rounded-lg border border-elec-yellow/20">
          <div className="h-4 bg-elec-gray-light/20 rounded w-1/4 mb-4"></div>
          <div className="h-3 bg-elec-gray-light/20 rounded w-full mb-2"></div>
          <div className="h-3 bg-elec-gray-light/20 rounded w-full mb-2"></div>
          <div className="h-3 bg-elec-gray-light/20 rounded w-3/4"></div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
