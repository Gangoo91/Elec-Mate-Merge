const R1R2Step1 = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 1: Prepare for Testing</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>Isolate the circuit and ensure it's safe to test</li>
        <li>Verify the test instrument is functioning correctly using a calibration check</li>
        <li>Ensure all protective conductors are correctly identified</li>
        <li>Remove any electronic devices that might be damaged by testing</li>
      </ul>
      <div className="mt-4 bg-white/5 border border-white/10 p-4 rounded-md">
        <img
          loading="lazy"
          src="/placeholder.svg"
          alt="R1+R2 Testing Equipment Setup"
          className="mx-auto max-h-64"
        />
        <p className="text-xs text-center mt-2 text-white">
          Proper test equipment connection diagram
        </p>
      </div>
    </div>
  );
};

export default R1R2Step1;
