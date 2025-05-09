
const MaintenanceCard = () => {
  return (
    <div className="bg-elec-gray-light/10 p-4 rounded-lg">
      <h4 className="text-sm font-medium mb-4">Maintenance</h4>
      <div className="space-y-3">
        <div className="text-xs p-3 bg-elec-gray-light/20 rounded-md">
          <div className="font-medium">Database Optimization</div>
          <div className="text-gray-400 mt-1">Last run: 3 days ago</div>
          <button className="mt-2 bg-elec-yellow text-black px-3 py-1 rounded text-xs hover:bg-elec-yellow/90">
            Run Now
          </button>
        </div>
        <div className="text-xs p-3 bg-elec-gray-light/20 rounded-md">
          <div className="font-medium">Clear Cache</div>
          <div className="text-gray-400 mt-1">Last cleared: 1 day ago</div>
          <button className="mt-2 bg-elec-yellow text-black px-3 py-1 rounded text-xs hover:bg-elec-yellow/90">
            Clear Now
          </button>
        </div>
        <div className="text-xs p-3 bg-elec-gray-light/20 rounded-md">
          <div className="font-medium">System Backup</div>
          <div className="text-gray-400 mt-1">Next scheduled: 2025-05-10 03:00</div>
          <button className="mt-2 bg-elec-yellow text-black px-3 py-1 rounded text-xs hover:bg-elec-yellow/90">
            Backup Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceCard;
