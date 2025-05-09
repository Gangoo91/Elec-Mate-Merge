
const ResourceUsage = () => {
  return (
    <div className="bg-elec-gray-light/10 p-4 rounded-lg">
      <h4 className="text-sm font-medium mb-4">Resource Usage</h4>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>Database Storage</span>
            <span>6.8 GB / 10 GB</span>
          </div>
          <div className="h-1.5 bg-elec-gray-light/30 rounded-full">
            <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '68%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>File Storage</span>
            <span>24.2 GB / 50 GB</span>
          </div>
          <div className="h-1.5 bg-elec-gray-light/30 rounded-full">
            <div className="h-1.5 bg-elec-yellow rounded-full" style={{ width: '48%' }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span>API Requests (Daily)</span>
            <span>452K / 500K</span>
          </div>
          <div className="h-1.5 bg-elec-gray-light/30 rounded-full">
            <div className="h-1.5 bg-amber-500 rounded-full" style={{ width: '90%' }}></div>
          </div>
        </div>
      </div>
      <button className="mt-4 w-full text-xs bg-elec-yellow text-black px-3 py-1.5 rounded hover:bg-elec-yellow/90">
        Upgrade Resources
      </button>
    </div>
  );
};

export default ResourceUsage;
