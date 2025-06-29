
export interface JargonTerm {
  term: string;
  definition: string;
  category: string;
  context?: string;
  commonUsage?: string;
  relatedTerms?: string[];
  difficulty?: 'basic' | 'intermediate' | 'advanced';
  tags?: string[];
}

export const siteJargonCategories = [
  {
    id: 'electrical-terms',
    name: 'Electrical Terms',
    description: 'Core electrical terminology and concepts',
    icon: 'Zap'
  },
  {
    id: 'tools-equipment',
    name: 'Tools & Equipment',
    description: 'Common tools and equipment used on site',
    icon: 'Wrench'
  },
  {
    id: 'safety-terms',
    name: 'Safety Terms',
    description: 'Health and safety terminology',
    icon: 'Shield'
  },
  {
    id: 'site-language',
    name: 'Site Language',
    description: 'General construction and site language',
    icon: 'MessageCircle'
  },
  {
    id: 'regulations-standards',
    name: 'Regulations & Standards',
    description: 'Building regulations and electrical standards',
    icon: 'BookOpen'
  },
  {
    id: 'installation-methods',
    name: 'Installation Methods',
    description: 'Installation techniques and methods',
    icon: 'Settings'
  },
  {
    id: 'testing-terminology',
    name: 'Testing & Inspection',
    description: 'Testing and inspection terminology',
    icon: 'CheckCircle'
  },
  {
    id: 'commercial-industrial',
    name: 'Commercial & Industrial',
    description: 'Commercial and industrial specific terms',
    icon: 'Building'
  }
];

export const siteJargonTerms: JargonTerm[] = [
  // Electrical Terms
  {
    term: "Armoured Cable",
    definition: "Cable with a protective metal sheath, typically steel wire armour (SWA)",
    category: "electrical-terms",
    context: "Used for external installations and underground runs",
    commonUsage: "Run some SWA to the garage",
    relatedTerms: ["SWA", "Steel Wire Armour", "Glanding"],
    difficulty: "basic",
    tags: ["cable", "protection", "external"]
  },
  {
    term: "Bang",
    definition: "Electrical fault causing a loud noise, often a short circuit",
    category: "electrical-terms",
    context: "When something goes wrong electrically",
    commonUsage: "There was a big bang from the board",
    relatedTerms: ["Short circuit", "Fault", "Trip"],
    difficulty: "basic"
  },
  {
    term: "Board",
    definition: "Distribution board or consumer unit containing protective devices",
    category: "electrical-terms",
    context: "Main electrical distribution point",
    commonUsage: "Check the board for any trips",
    relatedTerms: ["Consumer Unit", "CU", "Fuse Board"],
    difficulty: "basic",
    tags: ["distribution", "protection"]
  },
  {
    term: "Banjo",
    definition: "Metal earthing washer used behind electrical fittings",
    category: "electrical-terms",
    context: "Ensures earth continuity in metal conduit systems",
    commonUsage: "Don't forget the banjo behind that socket",
    relatedTerms: ["Earth continuity", "Conduit", "Earthing"],
    difficulty: "intermediate"
  },
  {
    term: "Chocolate Block",
    definition: "Terminal connector strip, usually brown in colour",
    category: "electrical-terms",
    context: "For joining cables in junction boxes",
    commonUsage: "Use a chocolate block to join those cables",
    relatedTerms: ["Terminal strip", "Connector", "Junction"],
    difficulty: "basic"
  },
  {
    term: "Crimp",
    definition: "Method of joining cables using a crimping tool and terminal",
    category: "electrical-terms",
    context: "Permanent cable connection method",
    commonUsage: "Crimp the earth tails together",
    relatedTerms: ["Terminal", "Cable joint", "Crimping tool"],
    difficulty: "basic"
  },
  {
    term: "Dead",
    definition: "No electrical voltage present, safe to work on",
    category: "electrical-terms",
    context: "Safety term for isolated circuits",
    commonUsage: "Make sure it's dead before you start",
    relatedTerms: ["Isolated", "Safe", "Voltage indicator"],
    difficulty: "basic",
    tags: ["safety", "testing"]
  },
  {
    term: "DNO",
    definition: "Distribution Network Operator - company that owns the local electricity network",
    category: "electrical-terms",
    context: "Responsible for supply to properties",
    commonUsage: "Need to contact the DNO for a new supply",
    relatedTerms: ["Utility company", "Supply", "Meter"],
    difficulty: "intermediate"
  },
  {
    term: "Earthing",
    definition: "Connection to earth/ground for safety protection",
    category: "electrical-terms",
    context: "Essential safety requirement",
    commonUsage: "Check the earthing arrangement",
    relatedTerms: ["Bonding", "CPC", "Earth rod"],
    difficulty: "basic",
    tags: ["safety", "protection"]
  },
  {
    term: "Flying Lead",
    definition: "Short length of cable with no fixed connection",
    category: "electrical-terms",
    context: "Temporary or test connections",
    commonUsage: "Make up a flying lead for testing",
    relatedTerms: ["Test lead", "Temporary", "Connection"],
    difficulty: "basic"
  },
  {
    term: "Gland",
    definition: "Device for sealing and securing cable entry points",
    category: "electrical-terms",
    context: "Used with armoured cables and weatherproof enclosures",
    commonUsage: "Fit a gland to that SWA cable",
    relatedTerms: ["Cable entry", "SWA", "Sealing"],
    difficulty: "intermediate"
  },
  {
    term: "HEMP",
    definition: "House Electrical Main Panel - older term for consumer unit",
    category: "electrical-terms",
    context: "Older electrical terminology",
    commonUsage: "The HEMP is in the garage",
    relatedTerms: ["Consumer unit", "Main panel", "Board"],
    difficulty: "intermediate"
  },
  {
    term: "Isolator",
    definition: "Switch that completely disconnects electrical supply",
    category: "electrical-terms",
    context: "Safety device for maintenance",
    commonUsage: "Hit the isolator before you start",
    relatedTerms: ["Isolation", "Safety switch", "Disconnect"],
    difficulty: "basic",
    tags: ["safety", "switching"]
  },
  {
    term: "JB",
    definition: "Junction Box - enclosure for cable connections",
    category: "electrical-terms",
    context: "Housing for cable joints",
    commonUsage: "Put a JB in the ceiling void",
    relatedTerms: ["Junction box", "Enclosure", "Connection"],
    difficulty: "basic"
  },
  {
    term: "Knockout",
    definition: "Pre-formed hole in electrical enclosures that can be removed",
    category: "electrical-terms",
    context: "Cable entry points in boxes",
    commonUsage: "Knock out a 20mm entry",
    relatedTerms: ["Cable entry", "Enclosure", "Hole"],
    difficulty: "basic"
  },
  {
    term: "Live",
    definition: "Electrical conductor carrying voltage - dangerous",
    category: "electrical-terms",
    context: "Active electrical circuit",
    commonUsage: "That's live, be careful",
    relatedTerms: ["Hot", "Energised", "Voltage"],
    difficulty: "basic",
    tags: ["safety", "voltage"]
  },
  {
    term: "Loop",
    definition: "Earth fault loop impedance or complete electrical circuit path",
    category: "electrical-terms",
    context: "Testing and circuit design",
    commonUsage: "What's the loop impedance?",
    relatedTerms: ["Zs", "Earth fault", "Circuit"],
    difficulty: "intermediate",
    tags: ["testing", "impedance"]
  },
  {
    term: "MCB",
    definition: "Miniature Circuit Breaker - automatic protective device",
    category: "electrical-terms",
    context: "Circuit protection in consumer units",
    commonUsage: "The MCB has tripped",
    relatedTerms: ["Circuit breaker", "Protection", "Trip"],
    difficulty: "basic",
    tags: ["protection", "overcurrent"]
  },
  {
    term: "Neutral",
    definition: "Return conductor in electrical circuit, normally at earth potential",
    category: "electrical-terms",
    context: "Part of electrical supply system",
    commonUsage: "Connect the neutral to terminal 2",
    relatedTerms: ["Return", "N conductor", "Supply"],
    difficulty: "basic",
    tags: ["conductor", "supply"]
  },
  {
    term: "OCPD",
    definition: "Over Current Protective Device - fuse or circuit breaker",
    category: "electrical-terms",
    context: "Circuit protection terminology",
    commonUsage: "What's the rating of the OCPD?",
    relatedTerms: ["MCB", "Fuse", "Protection"],
    difficulty: "intermediate"
  },
  {
    term: "Pendant",
    definition: "Hanging light fitting, typically in centre of room",
    category: "electrical-terms",
    context: "Common domestic lighting",
    commonUsage: "Fit a pendant in the dining room",
    relatedTerms: ["Light fitting", "Ceiling rose", "Hanging"],
    difficulty: "basic"
  },
  {
    term: "Quench",
    definition: "To extinguish an electrical arc",
    category: "electrical-terms",
    context: "Circuit breaker operation",
    commonUsage: "The breaker quenched the arc",
    relatedTerms: ["Arc", "Circuit breaker", "Extinguish"],
    difficulty: "advanced"
  },
  {
    term: "RCD",
    definition: "Residual Current Device - earth leakage protection",
    category: "electrical-terms",
    context: "Personal protection device",
    commonUsage: "Test the RCD monthly",
    relatedTerms: ["Earth leakage", "RCBO", "Protection"],
    difficulty: "basic",
    tags: ["protection", "safety"]
  },
  {
    term: "Ring",
    definition: "Ring final circuit - common UK domestic wiring method",
    category: "electrical-terms",
    context: "Socket outlet circuits",
    commonUsage: "Wire it as a ring circuit",
    relatedTerms: ["Ring main", "Socket circuit", "Final circuit"],
    difficulty: "basic",
    tags: ["circuit", "sockets"]
  },
  {
    term: "Spur",
    definition: "Branch connection from a ring or radial circuit",
    category: "electrical-terms",
    context: "Additional socket outlets",
    commonUsage: "Take a spur off the ring",
    relatedTerms: ["Branch", "Extension", "Socket"],
    difficulty: "basic"
  },
  {
    term: "SWA",
    definition: "Steel Wire Armoured cable",
    category: "electrical-terms",
    context: "External and underground cable",
    commonUsage: "Use SWA for the outside run",
    relatedTerms: ["Armoured cable", "External", "Protection"],
    difficulty: "basic",
    tags: ["cable", "armoured"]
  },
  {
    term: "T&E",
    definition: "Twin and Earth cable - standard domestic wiring cable",
    category: "electrical-terms",
    context: "Most common UK domestic cable",
    commonUsage: "Run some 2.5mm T&E to the sockets",
    relatedTerms: ["Twin and earth", "Flat cable", "Domestic"],
    difficulty: "basic",
    tags: ["cable", "domestic"]
  },
  {
    term: "Trip",
    definition: "Protective device operating to disconnect supply",
    category: "electrical-terms",
    context: "When circuit protection operates",
    commonUsage: "The RCD has tripped",
    relatedTerms: ["Operate", "Disconnect", "Protection"],
    difficulty: "basic"
  },
  {
    term: "Volt Drop",
    definition: "Reduction in voltage along a cable due to resistance",
    category: "electrical-terms",
    context: "Cable sizing consideration",
    commonUsage: "Check the volt drop calculation",
    relatedTerms: ["Voltage drop", "Cable sizing", "Resistance"],
    difficulty: "intermediate",
    tags: ["calculation", "design"]
  },
  {
    term: "Wylex",
    definition: "Brand name often used generically for consumer units",
    category: "electrical-terms",
    context: "Common consumer unit manufacturer",
    commonUsage: "It's an old Wylex board",
    relatedTerms: ["Consumer unit", "Brand", "Fuse board"],
    difficulty: "basic"
  },

  // Tools & Equipment
  {
    term: "Bovver Boots",
    definition: "Heavy work boots, steel toe-capped safety footwear",
    category: "tools-equipment",
    context: "Site safety footwear",
    commonUsage: "Get your bovver boots on",
    relatedTerms: ["Safety boots", "Steel toecaps", "PPE"],
    difficulty: "basic"
  },
  {
    term: "Combi",
    definition: "Combination pliers or multi-tool",
    category: "tools-equipment",
    context: "Essential electrician's tool",
    commonUsage: "Pass me the combis",
    relatedTerms: ["Pliers", "Multi-tool", "Hand tool"],
    difficulty: "basic"
  },
  {
    term: "Cutters",
    definition: "Wire cutters or side cutters",
    category: "tools-equipment",
    context: "For cutting cables and wires",
    commonUsage: "Use the cutters to trim that cable",
    relatedTerms: ["Side cutters", "Snips", "Wire cutters"],
    difficulty: "basic"
  },
  {
    term: "Fish Tape",
    definition: "Flexible steel tape for pulling cables through conduit",
    category: "tools-equipment",
    context: "Cable installation in conduit",
    commonUsage: "Use the fish tape to pull the cable",
    relatedTerms: ["Draw tape", "Cable puller", "Installation"],
    difficulty: "basic"
  },
  {
    term: "Grips",
    definition: "Cable pulling grips or mole grips",
    category: "tools-equipment",
    context: "For gripping and pulling cables",
    commonUsage: "Put some grips on that cable",
    relatedTerms: ["Cable grips", "Mole grips", "Pulling"],
    difficulty: "basic"
  },
  {
    term: "Hacky",
    definition: "Hacksaw for cutting metal conduit and trunking",
    category: "tools-equipment",
    context: "Cutting metal installation systems",
    commonUsage: "Use the hacky to cut that conduit",
    relatedTerms: ["Hacksaw", "Cutting", "Metal"],
    difficulty: "basic"
  },
  {
    term: "Hammer Drill",
    definition: "Power drill with hammering action for masonry",
    category: "tools-equipment",
    context: "Drilling into brick and concrete",
    commonUsage: "Need the hammer drill for those wall plugs",
    relatedTerms: ["SDS drill", "Masonry drill", "Percussion"],
    difficulty: "basic"
  },
  {
    term: "Junior Hacksaw",
    definition: "Small hacksaw for precision cutting",
    category: "tools-equipment",
    context: "Fine cutting work",
    commonUsage: "Use the junior hacksaw for that small pipe",
    relatedTerms: ["Small hacksaw", "Precision", "Fine cutting"],
    difficulty: "basic"
  },
  {
    term: "Megger",
    definition: "Insulation resistance tester (brand name used generically)",
    category: "tools-equipment",
    context: "Testing cable insulation",
    commonUsage: "Megger that cable before connection",
    relatedTerms: ["Insulation tester", "IR tester", "Testing"],
    difficulty: "intermediate",
    tags: ["testing", "brand"]
  },
  {
    term: "Multifunction Tester",
    definition: "Electronic tester for various electrical measurements",
    category: "tools-equipment",
    context: "Comprehensive electrical testing",
    commonUsage: "Use the MFT to test the circuit",
    relatedTerms: ["MFT", "Test equipment", "Electrical tester"],
    difficulty: "intermediate",
    tags: ["testing", "measurement"]
  },
  {
    term: "Neon Screwdriver",
    definition: "Voltage indicator screwdriver",
    category: "tools-equipment",
    context: "Basic voltage detection",
    commonUsage: "Check it with the neon screwdriver",
    relatedTerms: ["Voltage tester", "Test screwdriver", "Indicator"],
    difficulty: "basic",
    tags: ["testing", "voltage"]
  },
  {
    term: "Proving Unit",
    definition: "Device to check voltage indicators are working",
    category: "tools-equipment",
    context: "Testing test equipment",
    commonUsage: "Prove your tester with the proving unit",
    relatedTerms: ["Test equipment", "Proving", "Calibration"],
    difficulty: "intermediate",
    tags: ["testing", "safety"]
  },
  {
    term: "Ratchet Set",
    definition: "Socket set with ratcheting handle",
    category: "tools-equipment",
    context: "For nuts and bolts",
    commonUsage: "Use the ratchet set on those earth clamps",
    relatedTerms: ["Socket set", "Spanners", "Mechanical"],
    difficulty: "basic"
  },
  {
    term: "Reciprocating Saw",
    definition: "Power saw with back-and-forth blade motion",
    category: "tools-equipment",
    context: "Rough cutting work",
    commonUsage: "Use the recip saw to cut through that joist",
    relatedTerms: ["Recip saw", "Sabre saw", "Power tool"],
    difficulty: "basic"
  },
  {
    term: "Snips",
    definition: "Heavy-duty scissors for cutting sheet metal",
    category: "tools-equipment",
    context: "Cutting metal trunking and ducting",
    commonUsage: "Use the snips to cut that trunking",
    relatedTerms: ["Metal cutters", "Shears", "Cutting"],
    difficulty: "basic"
  },
  {
    term: "Strippers",
    definition: "Wire stripping tool for removing cable insulation",
    category: "tools-equipment",
    context: "Preparing cable ends",
    commonUsage: "Use the strippers to prepare those cores",
    relatedTerms: ["Wire strippers", "Cable prep", "Insulation"],
    difficulty: "basic"
  },
  {
    term: "Tank Cutter",
    definition: "Hole saw or cutting tool for large holes",
    category: "tools-equipment",
    context: "Cutting holes for cables or pipes",
    commonUsage: "Need the tank cutter for that big hole",
    relatedTerms: ["Hole saw", "Core drill", "Cutting"],
    difficulty: "basic"
  },

  // Safety Terms
  {
    term: "COSHH",
    definition: "Control of Substances Hazardous to Health regulations",
    category: "safety-terms",
    context: "Chemical and substance safety",
    commonUsage: "Check the COSHH data sheet",
    relatedTerms: ["Safety data", "Hazardous substances", "Regulations"],
    difficulty: "intermediate",
    tags: ["regulations", "health"]
  },
  {
    term: "Hot Work",
    definition: "Work involving heat, sparks, or naked flames",
    category: "safety-terms",
    context: "Fire risk activities",
    commonUsage: "That's hot work, need a permit",
    relatedTerms: ["Fire risk", "Permit", "Sparks"],
    difficulty: "intermediate"
  },
  {
    term: "JSA",
    definition: "Job Safety Analysis - risk assessment for specific tasks",
    category: "safety-terms",
    context: "Task-specific safety planning",
    commonUsage: "Complete the JSA before starting",
    relatedTerms: ["Risk assessment", "Method statement", "Safety"],
    difficulty: "intermediate"
  },
  {
    term: "Lock Off",
    definition: "Isolation procedure using padlocks and tags",
    category: "safety-terms",
    context: "Electrical isolation safety",
    commonUsage: "Lock off the supply before you start",
    relatedTerms: ["LOTO", "Isolation", "Padlock"],
    difficulty: "basic",
    tags: ["isolation", "procedure"]
  },
  {
    term: "LOTO",
    definition: "Lock Out Tag Out - isolation safety procedure",
    category: "safety-terms",
    context: "Equipment isolation",
    commonUsage: "Follow LOTO procedures",
    relatedTerms: ["Lock off", "Isolation", "Safety"],
    difficulty: "intermediate"
  },
  {
    term: "Method Statement",
    definition: "Document describing how work will be carried out safely",
    category: "safety-terms",
    context: "Safety planning document",
    commonUsage: "Read the method statement first",
    relatedTerms: ["Risk assessment", "RAMS", "Safety plan"],
    difficulty: "intermediate"
  },
  {
    term: "Near Miss",
    definition: "Incident that could have caused injury but didn't",
    category: "safety-terms",
    context: "Safety reporting",
    commonUsage: "Report that as a near miss",
    relatedTerms: ["Incident", "Safety report", "Prevention"],
    difficulty: "basic"
  },
  {
    term: "Permit to Work",
    definition: "Formal written system for controlling hazardous work",
    category: "safety-terms",
    context: "High-risk work authorisation",
    commonUsage: "Need a permit to work for that job",
    relatedTerms: ["PTW", "Authorisation", "High risk"],
    difficulty: "intermediate"
  },
  {
    term: "PPE",
    definition: "Personal Protective Equipment",
    category: "safety-terms",
    context: "Individual safety equipment",
    commonUsage: "Don your PPE before entering",
    relatedTerms: ["Safety equipment", "Protection", "Hard hat"],
    difficulty: "basic",
    tags: ["equipment", "protection"]
  },
  {
    term: "RAMS",
    definition: "Risk Assessment and Method Statement",
    category: "safety-terms",
    context: "Safety documentation",
    commonUsage: "The RAMS are in the site office",
    relatedTerms: ["Risk assessment", "Method statement", "Safety"],
    difficulty: "intermediate"
  },
  {
    term: "Safe System of Work",
    definition: "Formal procedure for carrying out work safely",
    category: "safety-terms",
    context: "Systematic safety approach",
    commonUsage: "Follow the safe system of work",
    relatedTerms: ["Procedure", "Method", "Safety system"],
    difficulty: "intermediate"
  },
  {
    term: "Tag Out",
    definition: "Warning tag placed on isolated equipment",
    category: "safety-terms",
    context: "Part of isolation procedure",
    commonUsage: "Tag out that isolator",
    relatedTerms: ["LOTO", "Warning tag", "Isolation"],
    difficulty: "basic"
  },
  {
    term: "Toolbox Talk",
    definition: "Short safety briefing at start of shift",
    category: "safety-terms",
    context: "Daily safety communication",
    commonUsage: "Time for the toolbox talk",
    relatedTerms: ["Safety briefing", "Daily brief", "Communication"],
    difficulty: "basic"
  },

  // Site Language
  {
    term: "All Day Job",
    definition: "Task that will take the entire working day",
    category: "site-language",
    context: "Time estimation",
    commonUsage: "That's an all day job, that is",
    relatedTerms: ["Long job", "Full day", "Time consuming"],
    difficulty: "basic"
  },
  {
    term: "Bodge",
    definition: "Poor quality repair or temporary fix",
    category: "site-language",
    context: "Substandard workmanship",
    commonUsage: "That's a proper bodge job",
    relatedTerms: ["Temporary fix", "Poor work", "Quick fix"],
    difficulty: "basic"
  },
  {
    term: "Brew",
    definition: "Tea or coffee break",
    category: "site-language",
    context: "Break time",
    commonUsage: "Time for a brew",
    relatedTerms: ["Tea break", "Coffee", "Break"],
    difficulty: "basic"
  },
  {
    term: "Chipper",
    definition: "Apprentice or junior worker",
    category: "site-language",
    context: "Junior team member",
    commonUsage: "Send the chipper to get the materials",
    relatedTerms: ["Apprentice", "Junior", "Trainee"],
    difficulty: "basic"
  },
  {
    term: "Gaffer",
    definition: "Boss or supervisor",
    category: "site-language",
    context: "Site hierarchy",
    commonUsage: "The gaffer wants to see you",
    relatedTerms: ["Boss", "Supervisor", "Foreman"],
    difficulty: "basic"
  },
  {
    term: "Graft",
    definition: "Hard physical work",
    category: "site-language",
    context: "Work intensity",
    commonUsage: "That's proper graft, that is",
    relatedTerms: ["Hard work", "Labour", "Effort"],
    difficulty: "basic"
  },
  {
    term: "Knock Off",
    definition: "Finish work for the day",
    category: "site-language",
    context: "End of working day",
    commonUsage: "Right, let's knock off",
    relatedTerms: ["Finish", "End work", "Home time"],
    difficulty: "basic"
  },
  {
    term: "Lash Up",
    definition: "Temporary or makeshift arrangement",
    category: "site-language",
    context: "Temporary solution",
    commonUsage: "Just lash it up for now",
    relatedTerms: ["Temporary", "Quick fix", "Makeshift"],
    difficulty: "basic"
  },
  {
    term: "Muck In",
    definition: "Help out with a task",
    category: "site-language",
    context: "Team cooperation",
    commonUsage: "Everyone muck in and help",
    relatedTerms: ["Help out", "Pitch in", "Assist"],
    difficulty: "basic"
  },
  {
    term: "Numpty",
    definition: "Someone who makes silly mistakes",
    category: "site-language",
    context: "Gentle insult for errors",
    commonUsage: "Don't be a numpty, check it first",
    relatedTerms: ["Silly person", "Mistake maker", "Plonker"],
    difficulty: "basic"
  },
  {
    term: "Ocker",
    definition: "Someone from Australia (in UK context)",
    category: "site-language",
    context: "Nationality reference",
    commonUsage: "The new ocker starts Monday",
    relatedTerms: ["Australian", "Aussie", "Nationality"],
    difficulty: "basic"
  },
  {
    term: "Punter",
    definition: "Customer or client",
    category: "site-language",
    context: "Customer reference",
    commonUsage: "The punter wants it done today",
    relatedTerms: ["Customer", "Client", "Homeowner"],
    difficulty: "basic"
  },
  {
    term: "Skive",
    definition: "Avoid work or be lazy",
    category: "site-language",
    context: "Work avoidance",
    commonUsage: "Stop skiving and get on with it",
    relatedTerms: ["Slack off", "Avoid work", "Lazy"],
    difficulty: "basic"
  },
  {
    term: "Spark",
    definition: "Electrician",
    category: "site-language",
    context: "Trade nickname",
    commonUsage: "Get the spark to check that circuit",
    relatedTerms: ["Electrician", "Tradesman", "Electrician nickname"],
    difficulty: "basic"
  },

  // Regulations & Standards
  {
    term: "18th Edition",
    definition: "Current edition of BS 7671 wiring regulations",
    category: "regulations-standards",
    context: "Current UK electrical standard",
    commonUsage: "That's not 18th Edition compliant",
    relatedTerms: ["BS 7671", "Wiring regs", "Current standard"],
    difficulty: "basic",
    tags: ["standards", "regulations"]
  },
  {
    term: "BS EN",
    definition: "British Standard European Norm - harmonised European standard",
    category: "regulations-standards",
    context: "European standardisation",
    commonUsage: "Check the BS EN specification",
    relatedTerms: ["European standard", "British standard", "Harmonised"],
    difficulty: "intermediate"
  },
  {
    term: "Building Regs",
    definition: "Building Regulations - legal requirements for construction",
    category: "regulations-standards",
    context: "Legal construction requirements",
    commonUsage: "That needs Building Regs approval",
    relatedTerms: ["Building control", "Legal requirements", "Part P"],
    difficulty: "basic"
  },
  {
    term: "CDM",
    definition: "Construction Design and Management Regulations",
    category: "regulations-standards",
    context: "Construction safety regulations",
    commonUsage: "CDM applies to this project",
    relatedTerms: ["Construction regulations", "Safety", "Design"],
    difficulty: "intermediate"
  },
  {
    term: "EICR",
    definition: "Electrical Installation Condition Report",
    category: "regulations-standards",
    context: "Electrical safety inspection report",
    commonUsage: "Property needs an EICR",
    relatedTerms: ["Condition report", "Inspection", "Safety check"],
    difficulty: "intermediate",
    tags: ["inspection", "report"]
  },
  {
    term: "EIC",
    definition: "Electrical Installation Certificate",
    category: "regulations-standards",
    context: "New installation certification",
    commonUsage: "Issue an EIC for the new circuit",
    relatedTerms: ["Installation certificate", "New work", "Certification"],
    difficulty: "intermediate"
  },
  {
    term: "Minor Works",
    definition: "Small electrical work certificate",
    category: "regulations-standards",
    context: "Minor electrical alterations",
    commonUsage: "Just needs a Minor Works cert",
    relatedTerms: ["Small works", "Certificate", "Minor alterations"],
    difficulty: "basic"
  },
  {
    term: "Part P",
    definition: "Building Regulations covering electrical safety",
    category: "regulations-standards",
    context: "Electrical building regulations",
    commonUsage: "That's notifiable under Part P",
    relatedTerms: ["Building regs", "Notification", "Electrical safety"],
    difficulty: "basic",
    tags: ["building regs", "notification"]
  },
  {
    term: "Schedule of Test Results",
    definition: "Document recording electrical test measurements",
    category: "regulations-standards",
    context: "Test result documentation",
    commonUsage: "Complete the Schedule of Test Results",
    relatedTerms: ["Test results", "Documentation", "Measurements"],
    difficulty: "intermediate"
  },

  // Installation Methods
  {
    term: "Back to Back",
    definition: "Two sockets installed on opposite sides of the same wall",
    category: "installation-methods",
    context: "Socket installation method",
    commonUsage: "Install them back to back",
    relatedTerms: ["Socket placement", "Wall mounting", "Installation"],
    difficulty: "basic"
  },
  {
    term: "Chasing",
    definition: "Cutting grooves in walls for cables",
    category: "installation-methods",
    context: "Hidden cable installation",
    commonUsage: "Chase out for the cables",
    relatedTerms: ["Wall chasing", "Cable groove", "Hidden wiring"],
    difficulty: "basic"
  },
  {
    term: "Clipping Direct",
    definition: "Securing cable directly to surface with clips",
    category: "installation-methods",
    context: "Surface cable installation",
    commonUsage: "Clip it direct to the wall",
    relatedTerms: ["Surface mounting", "Cable clips", "Direct fixing"],
    difficulty: "basic"
  },
  {
    term: "Conduit Run",
    definition: "Route taken by electrical conduit",
    category: "installation-methods",
    context: "Conduit installation planning",
    commonUsage: "Plan the conduit run first",
    relatedTerms: ["Cable route", "Installation path", "Conduit"],
    difficulty: "basic"
  },
  {
    term: "Daisy Chain",
    definition: "Connecting devices in series, one after another",
    category: "installation-methods",
    context: "Sequential connection method",
    commonUsage: "Daisy chain the smoke detectors",
    relatedTerms: ["Series connection", "Chain", "Sequential"],
    difficulty: "basic"
  },
  {
    term: "Drop",
    definition: "Vertical cable run, usually downward",
    category: "installation-methods",
    context: "Cable routing terminology",
    commonUsage: "Take a drop down to the socket",
    relatedTerms: ["Vertical run", "Cable drop", "Downward"],
    difficulty: "basic"
  },
  {
    term: "Flush Mounting",
    definition: "Installing equipment level with the surface",
    category: "installation-methods",
    context: "Neat installation method",
    commonUsage: "Flush mount the switch",
    relatedTerms: ["Recessed", "Level mounting", "Built-in"],
    difficulty: "basic"
  },
  {
    term: "Loop In",
    definition: "Connection method where supply loops through each point",
    category: "installation-methods",
    context: "Lighting circuit wiring",
    commonUsage: "Wire it as loop in",
    relatedTerms: ["Through connection", "Looping", "Circuit method"],
    difficulty: "intermediate"
  },
  {
    term: "Radial Circuit",
    definition: "Circuit that branches out from the distribution board",
    category: "installation-methods",
    context: "Circuit design method",
    commonUsage: "Wire it as a radial",
    relatedTerms: ["Branch circuit", "Tree circuit", "Non-ring"],
    difficulty: "basic"
  },
  {
    term: "Surface Mounting",
    definition: "Installing equipment on top of the surface",
    category: "installation-methods",
    context: "Visible installation method",
    commonUsage: "Surface mount the consumer unit",
    relatedTerms: ["External mounting", "Visible", "On surface"],
    difficulty: "basic"
  },
  {
    term: "Trunking Run",
    definition: "Route taken by cable trunking",
    category: "installation-methods",
    context: "Cable management system",
    commonUsage: "Plan the trunking run",
    relatedTerms: ["Cable management", "Trunking route", "Installation path"],
    difficulty: "basic"
  },

  // Testing & Inspection
  {
    term: "Continuity Test",
    definition: "Test to verify electrical continuity of conductors",
    category: "testing-terminology",
    context: "Basic electrical testing",
    commonUsage: "Do a continuity test on the earth",
    relatedTerms: ["R1+R2", "Earth continuity", "Circuit test"],
    difficulty: "basic",
    tags: ["testing", "continuity"]
  },
  {
    term: "Dead Test",
    definition: "Electrical test performed with power off",
    category: "testing-terminology",
    context: "Safe testing practice",
    commonUsage: "Complete the dead tests first",
    relatedTerms: ["De-energised test", "Safe test", "Power off"],
    difficulty: "basic"
  },
  {
    term: "Earth Loop",
    definition: "Complete path for earth fault current",
    category: "testing-terminology",
    context: "Safety circuit testing",
    commonUsage: "Measure the earth loop impedance",
    relatedTerms: ["Zs", "Earth fault", "Loop impedance"],
    difficulty: "intermediate"
  },
  {
    term: "Functional Test",
    definition: "Test to verify equipment operates correctly",
    category: "testing-terminology",
    context: "Operational verification",
    commonUsage: "Do a functional test on the RCD",
    relatedTerms: ["Operation test", "Function check", "Working test"],
    difficulty: "basic"
  },
  {
    term: "Insulation Resistance",
    definition: "Measurement of insulation quality between conductors",
    category: "testing-terminology",
    context: "Cable insulation testing",
    commonUsage: "Check the insulation resistance",
    relatedTerms: ["IR test", "Insulation test", "Megohm"],
    difficulty: "intermediate",
    tags: ["testing", "insulation"]
  },
  {
    term: "Live Test",
    definition: "Electrical test performed with power on",
    category: "testing-terminology",
    context: "Energised testing",
    commonUsage: "Now do the live tests",
    relatedTerms: ["Energised test", "Power on test", "Live circuit"],
    difficulty: "intermediate"
  },
  {
    term: "Polarity Test",
    definition: "Test to verify correct connection of line and neutral",
    category: "testing-terminology",
    context: "Connection verification",
    commonUsage: "Check the polarity is correct",
    relatedTerms: ["Phase sequence", "Connection test", "Correct wiring"],
    difficulty: "basic"
  },
  {
    term: "RCD Test",
    definition: "Test of residual current device operation",
    category: "testing-terminology",
    context: "Safety device testing",
    commonUsage: "RCD test every quarter",
    relatedTerms: ["Trip test", "Safety test", "Protective device"],
    difficulty: "basic"
  },
  {
    term: "Verification",
    definition: "Process of checking installation meets requirements",
    category: "testing-terminology",
    context: "Installation checking",
    commonUsage: "Complete the verification process",
    relatedTerms: ["Compliance check", "Standard check", "Requirement check"],
    difficulty: "intermediate"
  },
  {
    term: "Ze Test",
    definition: "Test of external earth fault loop impedance",
    category: "testing-terminology",
    context: "Supply system testing",
    commonUsage: "What's the Ze reading?",
    relatedTerms: ["External impedance", "Supply test", "DNO system"],
    difficulty: "intermediate"
  },
  {
    term: "Zs Test",
    definition: "Test of earth fault loop impedance at furthest point",
    category: "testing-terminology",
    context: "Circuit protection verification",
    commonUsage: "Zs is too high for that MCB",
    relatedTerms: ["Loop impedance", "Protection test", "Fault current"],
    difficulty: "intermediate"
  },

  // Commercial & Industrial
  {
    term: "Busbar",
    definition: "Rigid conductor system for high current distribution",
    category: "commercial-industrial",
    context: "Heavy current distribution",
    commonUsage: "Connect to the main busbar",
    relatedTerms: ["Conductor bar", "Distribution", "High current"],
    difficulty: "intermediate"
  },
  {
    term: "Cable Ladder",
    definition: "Support system for multiple cables",
    category: "commercial-industrial",
    context: "Commercial cable management",
    commonUsage: "Run the cables on cable ladder",
    relatedTerms: ["Cable support", "Cable tray", "Support system"],
    difficulty: "basic"
  },
  {
    term: "Cable Tray",
    definition: "Perforated metal tray for supporting cables",
    category: "commercial-industrial",
    context: "Commercial installation method",
    commonUsage: "Install the cables in cable tray",
    relatedTerms: ["Cable support", "Tray system", "Commercial"],
    difficulty: "basic"
  },
  {
    term: "Fire Rated",
    definition: "Equipment designed to maintain integrity during fire",
    category: "commercial-industrial",
    context: "Fire safety requirements",
    commonUsage: "Use fire rated cable for escape routes",
    relatedTerms: ["Fire protection", "Fire safety", "Emergency"],
    difficulty: "intermediate"
  },
  {
    term: "HV",
    definition: "High Voltage - typically above 1000V AC",
    category: "commercial-industrial",
    context: "High voltage electrical systems",
    commonUsage: "That's HV, need special training",
    relatedTerms: ["High voltage", "Transmission", "Dangerous"],
    difficulty: "advanced",
    tags: ["voltage", "high risk"]
  },
  {
    term: "LV",
    definition: "Low Voltage - typically 50V to 1000V AC",
    category: "commercial-industrial",
    context: "Standard electrical installations",
    commonUsage: "Standard LV installation",
    relatedTerms: ["Low voltage", "Standard voltage", "Normal"],
    difficulty: "intermediate"
  },
  {
    term: "Motor Control Centre",
    definition: "Assembly of motor control equipment",
    category: "commercial-industrial",
    context: "Industrial motor control",
    commonUsage: "Install the MCC for the pumps",
    relatedTerms: ["MCC", "Motor control", "Industrial"],
    difficulty: "advanced"
  },
  {
    term: "PLC",
    definition: "Programmable Logic Controller",
    category: "commercial-industrial",
    context: "Industrial automation",
    commonUsage: "Program the PLC for the conveyor",
    relatedTerms: ["Programmable controller", "Automation", "Control"],
    difficulty: "advanced"
  },
  {
    term: "Standby Generator",
    definition: "Backup power supply for critical systems",
    category: "commercial-industrial",
    context: "Emergency power systems",
    commonUsage: "Test the standby generator weekly",
    relatedTerms: ["Backup power", "Emergency supply", "Generator"],
    difficulty: "intermediate"
  },
  {
    term: "Switchgear",
    definition: "Electrical switching and protection equipment",
    category: "commercial-industrial",
    context: "Power distribution control",
    commonUsage: "Isolate at the main switchgear",
    relatedTerms: ["Switching equipment", "Protection", "Control gear"],
    difficulty: "intermediate"
  },
  {
    term: "Three Phase",
    definition: "AC supply system with three alternating currents",
    category: "commercial-industrial",
    context: "Industrial power supply",
    commonUsage: "Connect the motor to three phase",
    relatedTerms: ["3-phase", "Poly-phase", "Industrial supply"],
    difficulty: "intermediate",
    tags: ["supply", "industrial"]
  },
  {
    term: "UPS",
    definition: "Uninterruptible Power Supply",
    category: "commercial-industrial",
    context: "Critical power backup",
    commonUsage: "Server room needs a UPS",
    relatedTerms: ["Backup power", "Uninterruptible", "Critical supply"],
    difficulty: "intermediate"
  }
];
