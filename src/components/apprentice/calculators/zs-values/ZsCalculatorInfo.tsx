
const ZsCalculatorInfo = () => {
  return (
    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
      <h4 className="text-sm font-medium text-blue-300 mb-2">International Fuse Types Explained</h4>
      <div className="text-xs text-muted-foreground space-y-1">
        <p><strong>BS 88 (HRC):</strong> High Rupturing Capacity fuses for distribution boards and industrial use</p>
        <p><strong>BS 1361:</strong> Cartridge fuses commonly used in older consumer units (Type I & II)</p>
        <p><strong>BS 3036:</strong> Rewirable fuses (wire element) - less common in modern installations</p>
        <p><strong>BS 1362:</strong> Plug fuses found in 13A socket outlets and plugs</p>
        <p><strong>BS 646:</strong> Cartridge fuses for lighting and small appliance circuits</p>
        <p><strong>BS 88-4:</strong> Compact HRC fuses for modern consumer units</p>
        <p><strong>BS 88-6:</strong> Motor circuit protection HRC fuses for industrial applications</p>
        <p><strong>IEC 60269:</strong> European standard fuses (General & Partial range types)</p>
        <p><strong>DIN:</strong> German/European industrial fuses for motor and industrial circuits</p>
        <p><strong>NEOZED:</strong> German bottle-type fuses commonly used in Europe</p>
        <p><strong>DIAZED:</strong> German screw-in fuses for distribution boards</p>
      </div>
    </div>
  );
};

export default ZsCalculatorInfo;
