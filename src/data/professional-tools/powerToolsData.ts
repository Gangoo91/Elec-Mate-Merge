import type { ToolSubSection } from "./types";

export const powerToolSections: ToolSubSection[] = [
  {
    id: "cordless-drill",
    title: "Cordless Drill System",
    tools: [
      {
        name: "18V Combi Drill",
        description:
          "Your primary power tool — drill, hammer drill, and screwdriver in one. 18V lithium-ion platform is the industry standard. Choose a brushless motor for longer life and more power.",
        price: "£90-200",
        priority: "essential",
        brands: ["DeWalt", "Milwaukee", "Makita", "Bosch Professional"],
        apprenticeTip:
          "Pick a battery platform and stick with it — all your cordless tools should share the same batteries. DeWalt, Milwaukee, and Makita are the big three on UK sites.",
      },
      {
        name: "18V Impact Driver",
        description:
          "High-torque rotary impact for driving screws fast. Uses 1/4 hex bits. Much faster than a combi drill for screw driving and removes the risk of wrist strain.",
        price: "£60-190",
        priority: "essential",
        brands: ["DeWalt", "Milwaukee", "Makita"],
        apprenticeTip:
          "An impact driver and combi drill as a twin pack is the best value way to start your cordless kit. Never use an impact driver for drilling — use the combi drill.",
      },
      {
        name: "Spare Batteries (5.0Ah+)",
        description:
          "Always carry at least 3 batteries — one in each tool and one on charge. 5.0Ah gives a full day of moderate use.",
        price: "£50-90 each",
        priority: "essential",
        brands: ["Match your platform"],
        apprenticeTip:
          "A dead battery with no spare stops your day. 5.0Ah batteries are the sweet spot — lighter than 6.0Ah but last most of the day.",
      },
      {
        name: "Drill Bit Sets",
        description:
          "HSS bits for metal (1-13mm), masonry bits for brick/concrete (5-13mm), wood bits (flat/spade and auger). Buy quality — cheap bits break and wander.",
        price: "£15-40 per set",
        priority: "essential",
        brands: ["Bosch", "DeWalt", "Milwaukee", "Irwin"],
        apprenticeTip:
          "A 6mm masonry bit and a 7mm masonry bit (for red and brown rawl plugs) are your most-used drill bits. Keep spares.",
      },
    ],
  },
  {
    id: "heavy-drilling",
    title: "Heavy Duty Drilling",
    tools: [
      {
        name: "SDS-Plus Rotary Hammer Drill",
        description:
          "Dedicated hammer drill for masonry, concrete, and brick. SDS chuck system provides much more impact energy than a combi drill. Essential for concrete and hard masonry.",
        price: "£120-300",
        priority: "essential",
        brands: ["DeWalt", "Milwaukee", "Makita", "Bosch Professional"],
        apprenticeTip:
          "A combi drill struggles in concrete — an SDS drill makes it effortless. Available corded or cordless (36V). Corded is cheaper and more powerful.",
      },
      {
        name: "SDS Drill Bit Set",
        description:
          "SDS-Plus masonry bits from 5mm to 16mm. Must-have sizes: 6mm (rawl plugs), 7mm (rawl plugs), 8mm (throughbolts), 10mm (larger fixings), 12mm (drop-in anchors).",
        price: "£15-40",
        priority: "essential",
        brands: ["Bosch", "DeWalt", "Hilti", "Milwaukee"],
        apprenticeTip:
          "SDS bits have a special shank — they are not interchangeable with standard drill bits. Always use SDS bits in an SDS drill.",
      },
      {
        name: "SDS Chisel Set",
        description:
          "Point chisel and flat chisel for SDS drill in chisel mode. For cutting chases, breaking out back boxes in masonry, and removing old plaster.",
        price: "£15-30",
        priority: "recommended",
        brands: ["Bosch", "DeWalt", "Makita"],
        apprenticeTip:
          "Use chisel mode (no rotation) for chasing out. The SDS does the hard work — guide it, do not force it.",
      },
      {
        name: "Diamond Core Drill",
        description:
          "Water-cooled diamond-tipped core drill for cutting clean circular holes through brick, block, and concrete for cable entry.",
        price: "£50-200 (bits) + £100-300 (drill rig)",
        priority: "nice-to-have",
        brands: ["Marcrist", "Bosch", "OX"],
        apprenticeTip:
          "Core drills give a clean professional finish. Use water feed to keep the bit cool and prevent dust. Common sizes: 52mm, 78mm, 107mm, 127mm.",
      },
      {
        name: "Hole Saws",
        description:
          "Bi-metal hole saws for cutting holes in metal enclosures, plastic, plasterboard, and wood. Available in sets or individual sizes.",
        price: "£15-50",
        priority: "recommended",
        brands: ["Starrett", "Milwaukee", "Bosch"],
        apprenticeTip:
          "Common sizes: 20mm and 25mm for cable entry, 32mm for conduit, 65mm for downlights. Use a pilot drill and low speed for metal.",
      },
    ],
  },
  {
    id: "cutting-tools",
    title: "Cutting Tools",
    tools: [
      {
        name: "Angle Grinder (115mm / 4.5 inch)",
        description:
          "Versatile cutting and grinding tool. With the right disc: cuts steel, stone, trunking, cable tray, and can chase masonry walls.",
        price: "£30-80",
        priority: "recommended",
        brands: ["DeWalt", "Makita", "Bosch Professional", "Milwaukee"],
        apprenticeTip:
          "ALWAYS wear safety glasses, ear defenders, gloves, and use the guard. Never remove the guard. An angle grinder is one of the most dangerous tools you will use.",
      },
      {
        name: "Wall Chaser",
        description:
          "Twin-disc tool specifically for cutting parallel channels in masonry walls for cable routing. Adjustable depth and width.",
        price: "£80-250",
        priority: "nice-to-have",
        brands: ["DeWalt", "Makita", "Milwaukee"],
        apprenticeTip:
          "Use with a vacuum for dust extraction — chasing creates huge amounts of silica dust. Much faster and neater than an angle grinder and chisel.",
      },
      {
        name: "Reciprocating Saw",
        description:
          "Powerful saw for cutting through timber, metal, pipe, and general demolition. Different blades for different materials.",
        price: "£50-150",
        priority: "nice-to-have",
        brands: ["DeWalt", "Milwaukee", "Makita"],
        apprenticeTip:
          "The Milwaukee Hackzall (one-handed) is popular with electricians for cutting conduit, cable tray, and notching joists in tight spaces.",
      },
      {
        name: "Jigsaw",
        description:
          "For curved cuts and cut-outs in plywood, plasterboard, and thin metal. Useful for cutting holes in MDF covers and plasterboard.",
        price: "£40-100",
        priority: "nice-to-have",
        brands: ["Bosch", "DeWalt", "Makita"],
        apprenticeTip:
          "Use a fine-tooth blade for plasterboard and a metal-cutting blade for thin steel. Clamp the workpiece to prevent vibration.",
      },
    ],
  },
  {
    id: "inspection-access",
    title: "Inspection & Access",
    tools: [
      {
        name: "Head Torch (Rechargeable)",
        description:
          "Hands-free lighting for working in dark loft spaces, under floors, and inside consumer units. Rechargeable USB-C is most practical.",
        price: "£20-55",
        priority: "essential",
        brands: ["Milwaukee", "LED Lenser", "Petzl"],
        apprenticeTip:
          "A good head torch is essential — you will use it every single day. Get one with a red-light mode to preserve night vision in dark spaces.",
      },
      {
        name: "Inspection Camera / Endoscope",
        description:
          "Flexible camera on a cable for inspecting inside walls, conduit runs, and inaccessible spaces. Connects to your phone via Wi-Fi or cable.",
        price: "£30-150",
        priority: "nice-to-have",
        brands: ["DeWalt", "Milwaukee", "DEPSTECH"],
        apprenticeTip:
          "Saves cutting exploratory holes. Feed it into the wall cavity to check for obstructions before drilling or routing cables.",
      },
      {
        name: "Access Tower / Step Ladder",
        description:
          "Fibreglass step ladder (insulating) for electrical work at height. Minimum Class 1 (industrial duty). GRP (fibreglass) is essential near live equipment.",
        price: "£60-200",
        priority: "essential",
        standard: "BS EN 131",
        brands: ["Lyte", "Werner", "Zarges"],
        apprenticeTip:
          "NEVER use an aluminium ladder near live equipment — use fibreglass (GRP) only. Check for damage before every use. Follow the 1-in-4 rule for leaning ladders.",
      },
      {
        name: "Dust Sheets & Mats",
        description:
          "Protect customers' floors and surfaces. Canvas dust sheets for floors, plastic sheeting for furniture.",
        price: "£5-20",
        priority: "essential",
        brands: ["Any good quality"],
        apprenticeTip:
          "Putting down dust sheets before starting work shows professionalism and respect for the customer's property. It is never optional.",
      },
    ],
  },
  {
    id: "cable-work",
    title: "Cable Work Tools",
    tools: [
      {
        name: "Cable Rods (Glow Rods)",
        description:
          "Flexible fibreglass rods that screw together for routing cables through cavities, under floors, and through ceiling voids.",
        price: "£20-60",
        priority: "essential",
        brands: ["C.K", "Super Rod", "Mighty Rod"],
        apprenticeTip:
          "Super Rod is the market leader. Use the hook attachment to grab cables and the bullet nose to push through insulation. Tape the cable to the rod with electrical tape.",
      },
      {
        name: "Draw Tape / Fish Tape",
        description:
          "Flat steel or nylon tape on a reel for pulling cables through conduit. Feed the tape through, attach the cable, and pull back.",
        price: "£15-40",
        priority: "recommended",
        brands: ["C.K", "Draper", "Greenlee"],
        apprenticeTip:
          "Use cable lubricant on long conduit runs to reduce friction. Apply it to the tape, not the cable — it gets distributed as you pull.",
      },
      {
        name: "Cable Ties (Assorted)",
        description:
          "Nylon cable ties in various sizes — 100mm, 200mm, 300mm, 370mm. Black (UV resistant) for outdoor, natural for indoor.",
        price: "£5-15",
        priority: "essential",
        brands: ["Hellermann Tyton", "Thomas & Betts"],
        apprenticeTip:
          "Cut cable tie tails flush — protruding tails are sharp and unprofessional. Use a proper cable tie gun for neat results.",
      },
      {
        name: "Cable Clips (Assorted)",
        description:
          "Nail-on clips in various sizes for T&E flat cable. Round clips for flex. Keep a selection in your tool bag.",
        price: "£3-10 per box",
        priority: "essential",
        brands: ["Tower", "BG"],
        apprenticeTip:
          "Spacing: 300mm horizontal, 400mm vertical, 150mm from accessories (BS 7671 guidance). Use the right clip size — too big and the cable sags.",
      },
      {
        name: "Heat Gun",
        description:
          "Hot air gun for heat-shrink tubing, freeing seized fixings, stripping paint, and drying damp enclosures. Variable temperature control essential.",
        price: "£25-60",
        priority: "nice-to-have",
        brands: ["DeWalt", "Makita", "Bosch"],
        apprenticeTip:
          "Heat-shrink is the professional way to insulate cable joints and terminations. A heat gun with temperature control prevents burning the cable insulation.",
      },
      {
        name: "Cordless Torch / Work Light",
        description:
          "Battery-powered work light for illuminating dark areas — loft spaces, ceiling voids, under floors. Should run on your main battery platform.",
        price: "£25-60",
        priority: "recommended",
        brands: ["DeWalt", "Milwaukee", "Makita"],
        apprenticeTip:
          "Get a work light that uses the same batteries as your drill. A head torch plus a work light means you can always see what you are doing.",
      },
    ],
  },
];
