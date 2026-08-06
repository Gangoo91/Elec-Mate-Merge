export const STANDARD_NOTES = {
  mountingHeights: [
    { item: 'Light switches', height: '1200mm', notes: 'Centre of plate from finished floor level' },
    { item: 'Socket outlets (general)', height: '450mm', notes: 'Centre of plate from FFL' },
    { item: 'Socket outlets (worktop)', height: '1150mm', notes: 'Above worktop level' },
    { item: 'Cooker control unit', height: '1200mm', notes: 'Adjacent to cooker position' },
    // The old note cited "max 1750mm per AMD3". Amendment 3 (2015) covered
    // non-combustible consumer unit enclosures, not mounting height — the
    // citation was fabricated. Accessibility of switchgear comes from Approved
    // Document M of the Building Regulations, so that is what is referenced.
    { item: 'Consumer unit', height: '1350mm', notes: 'To main switch — accessible height per Approved Document M' },
    { item: 'Fused spur', height: '1200mm', notes: 'Or adjacent to appliance' },
    { item: 'TV / Data / Telephone', height: '450mm or 1200mm', notes: 'Low level or high level as specified' },
    { item: 'Extractor fan isolator', height: 'Above door frame', notes: 'Pull cord in bathrooms' },
    { item: 'Outdoor lights', height: '2500mm', notes: 'Minimum to prevent accidental contact' },
    { item: 'Smoke / CO detectors', height: 'Ceiling mounted', notes: '300mm from wall, min 300mm from lights' },
    { item: 'Shaver socket', height: '1500mm', notes: 'Bathrooms only — BS EN 61558-2-5' },
  ],
  generalNotes: [
    'All work to comply with BS 7671:2018+A4:2026 (IET Wiring Regulations 18th Edition)',
    'All circuits to be tested and certified upon completion (EIC/EICR)',
    'Existing installation to be verified before connection of new work',
    'Additional protection by 30mA RCD to AC final circuits supplying luminaires in domestic premises (Regulation 411.3.4)',
    'Additional protection by 30mA RCD to socket-outlets rated up to 32A (Regulation 411.3.3)',
    'Circuits in locations containing a bath or shower to be protected by 30mA RCD (Section 701)',
    'Cables concealed in a wall or partition at a depth of less than 50mm to be protected by 30mA RCD (Regulation 522.6.202, Table 52.1)',
    'Cable routes to follow prescribed zones (Regulation 522.6)',
    'All accessories to be flush mounted unless otherwise specified',
    'Fire stopping to be maintained at all penetrations through fire barriers',
    'Labelling to be applied to all circuits at the distribution board',
  ],
  abbreviations: [
    { abbr: 'CU', meaning: 'Consumer Unit' },
    { abbr: 'DB', meaning: 'Distribution Board' },
    { abbr: 'MCB', meaning: 'Miniature Circuit Breaker' },
    { abbr: 'RCD', meaning: 'Residual Current Device' },
    { abbr: 'RCBO', meaning: 'Residual Current Breaker with Overcurrent' },
    { abbr: 'T&E', meaning: 'Twin and Earth Cable' },
    { abbr: 'SWA', meaning: 'Steel Wire Armoured Cable' },
    { abbr: 'FFL', meaning: 'Finished Floor Level' },
    { abbr: 'FCU', meaning: 'Fused Connection Unit' },
    { abbr: 'DP', meaning: 'Double Pole' },
    { abbr: 'IP', meaning: 'Ingress Protection Rating' },
    { abbr: 'Zs', meaning: 'Earth Fault Loop Impedance' },
    { abbr: 'SPD', meaning: 'Surge Protection Device' },
  ],
};
