
const R1R2Step3 = () => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Step 3: Evaluate Results</h3>
      <ul className="list-disc pl-6 space-y-2 text-sm">
        <li>All readings should be low ohms (typically less than 1Ω)</li>
        <li>For long cable runs, calculate the expected resistance based on cable length</li>
        <li>Document all results on the appropriate certificate</li>
        <li>Investigate any unexpectedly high readings</li>
      </ul>
      <div className="p-4 border border-amber-500/30 rounded-md bg-amber-900/20 mt-4">
        <h4 className="font-medium text-amber-300 mb-1">Maximum Permissible Values</h4>
        <p className="text-sm text-amber-100/90">
          For radial circuits: R₁+R₂ should be less than the value that would cause excessive volt drop<br />
          For ring circuits: Compare with values calculated from (R₁+R₂)/4
        </p>
      </div>
    </div>
  );
};

export default R1R2Step3;
