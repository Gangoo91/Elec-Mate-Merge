
interface AnalyticsFooterProps {
  gaInitialized: boolean;
}

const AnalyticsFooter = ({ gaInitialized }: AnalyticsFooterProps) => {
  return (
    <div className="text-xs text-muted-foreground mt-8 p-4 border border-elec-yellow/20 rounded-md bg-elec-dark">
      <p className="font-medium">Admin Access Notice</p>
      <p>This page is only visible to administrators or when development mode is enabled.</p>
      <p>Regular users cannot access this analytics dashboard.</p>
      <p className="mt-2 text-elec-yellow">
        {gaInitialized 
          ? "Google Analytics integration is active. Click the \"Configure GA\" button to modify your settings."
          : "Google Analytics integration is available. Click the \"Set Up GA Tracking\" button to configure your Google Analytics credentials."}
      </p>
    </div>
  );
};

export default AnalyticsFooter;
