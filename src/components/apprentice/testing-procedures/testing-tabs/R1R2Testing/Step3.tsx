
const R1R2Step3 = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 3: Evaluate Results</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>All readings should be low ohms (typically less than 1Ω)</li>
        <li>For long cable runs, calculate the expected resistance based on cable length</li>
        <li>Document all results on the appropriate certificate</li>
        <li>Investigate any unexpectedly high readings immediately</li>
        <li>Compare results with previous test values where available</li>
        <li>Ensure continuity of main and supplementary bonding connections</li>
        <li>Verify results are within the limits specified by BS 7671</li>
      </ul>
      
      <div className="p-4 border border-amber-500/30 rounded-md bg-amber-900/20 mt-4">
        <h4 className="font-medium text-amber-300 mb-1">Maximum Permissible Values</h4>
        <p className="text-sm text-amber-100/90">
          For radial circuits: R₁+R₂ should be less than the value that would cause excessive volt drop<br />
          For ring circuits: Compare with values calculated from (R₁+R₂)/4
        </p>
      </div>
      
      <div className="mt-4 bg-gray-800/30 p-4 rounded-md">
        <h4 className="font-medium text-gray-200 mb-2">Documentation Requirements</h4>
        <ul className="list-disc pl-6 space-y-1 text-sm text-gray-300">
          <li>Record all test values on the EICR or EIC form</li>
          <li>Note circuit identifiers and locations for each measurement</li>
          <li>Include date, time and test equipment details</li>
          <li>Sign and certify the documentation once complete</li>
          <li>Store records as required by BS 7671 for future reference</li>
        </ul>
      </div>
    </div>
  );
};

export default R1R2Step3;
