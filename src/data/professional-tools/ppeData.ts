import type { PPEItem } from "./types";

export const ppeItems: PPEItem[] = [
  // ─── Daily Essentials ──────────────────────────────────────────────────
  {
    name: "Safety Boots (ESD Rated)",
    description:
      "Steel or composite toe cap boots with anti-static (ESD) soles. Must be S3 rated minimum — steel toe, midsole protection, water resistant, anti-slip sole.",
    standard: "BS EN ISO 20345:2022 (S3 rated)",
    replacementFrequency: "Every 6-12 months or when sole is worn, toe cap exposed, or waterproofing fails",
    price: "£55-130",
    group: "daily",
    apprenticeTip:
      "Cheap boots hurt your feet and fail quickly. Invest in good boots — you are on your feet 8+ hours a day. DeWalt, Scruffs, and Timberland Pro are popular on UK sites.",
  },
  {
    name: "Safety Glasses (Clear + Tinted)",
    description:
      "Impact-resistant safety glasses that protect against flying debris, dust, and cable off-cuts. Clear for indoor, tinted for outdoor work.",
    standard: "BS EN 166:2002",
    replacementFrequency: "Replace when scratched (reduces clarity) or damaged. Keep a spare pair.",
    price: "£5-15",
    group: "daily",
    apprenticeTip:
      "Wear them EVERY time you drill, chase, cut, or work overhead. Eye injuries are one of the most common and preventable injuries on site. Over-glasses are available if you wear prescription glasses.",
  },
  {
    name: "Work Gloves (General Purpose)",
    description:
      "Cut-resistant gloves for handling cable tray, trunking, SWA cable, and sharp materials. Nitrile-coated palm for grip.",
    standard: "BS EN 388:2016 (Cut Level B or C minimum)",
    replacementFrequency: "Replace when torn, worn through, or grip is lost",
    price: "£5-12",
    group: "daily",
    apprenticeTip:
      "SWA cable armour and cut cable tray edges are razor sharp. Never handle them bare-handed. Keep a few pairs in your van.",
  },
  {
    name: "Knee Pads",
    description:
      "Protective knee pads for working at floor level — installing sockets, floor boxes, and underfloor work. Foam or gel padding.",
    standard: "BS EN 14404:2004+A1:2010",
    replacementFrequency: "Every 6-12 months or when padding is compressed",
    price: "£10-30",
    group: "daily",
    apprenticeTip:
      "Your knees take a beating in this trade. Use knee pads from day one — knee problems develop over years and are irreversible. Trouser-integrated pads are the most comfortable.",
  },
  {
    name: "Hi-Vis Vest / Jacket",
    description:
      "High-visibility vest or jacket required on all construction sites. Class 2 minimum for most sites, Class 3 for roadside work.",
    standard: "BS EN ISO 20471:2013",
    replacementFrequency: "Replace when dirty/faded (reflective tape loses effectiveness) or damaged",
    price: "£5-25",
    group: "daily",
    apprenticeTip:
      "Most sites will not let you through the gate without hi-vis. Keep a clean one in your van for site visits. Some sites require sleeved hi-vis (Class 3) — check site rules.",
  },
  {
    name: "Hard Hat",
    description:
      "Safety helmet for protection against falling objects and head impacts. Required on all construction sites. Choose a vented type for comfort.",
    standard: "BS EN 397:2012+A1:2012",
    replacementFrequency: "Replace every 3-5 years (UV degrades the plastic), immediately after an impact, or if cracked",
    price: "£5-20",
    group: "daily",
    apprenticeTip:
      "Write the date of first use inside your hard hat. Never drill holes in it for ventilation — this weakens the shell. Modern vented hard hats are much more comfortable.",
  },

  // ─── Task-Specific PPE ─────────────────────────────────────────────────
  {
    name: "Insulated Gloves (Class 00)",
    description:
      "Electrically insulated rubber gloves rated for up to 500V AC. Used when working near live parts where there is a risk of contact. Must be worn with leather over-gloves for mechanical protection.",
    standard: "BS EN 60903:2003",
    replacementFrequency: "Inspect before every use. Replace every 6 months or if any signs of damage, cracks, or discolouration",
    price: "£45-90",
    group: "task-specific",
    apprenticeTip:
      "Inflate them like a balloon before each use — if air escapes, they are compromised and must be replaced. Store flat, away from sharp objects and UV light.",
  },
  {
    name: "Ear Defenders / Plugs",
    description:
      "Hearing protection for use with power tools — SDS drills, angle grinders, wall chasers, and chop saws generate dangerous noise levels.",
    standard: "BS EN 352-1:2020 (muffs) / BS EN 352-2:2020 (plugs)",
    replacementFrequency: "Muffs: replace cushions every 6 months. Plugs: disposable or clean reusable daily",
    price: "£5-30",
    group: "task-specific",
    apprenticeTip:
      "Hearing damage is permanent and cumulative. If you have to raise your voice to be heard over a tool, you need ear protection. SDS drilling in a confined space is especially loud.",
  },
  {
    name: "Dust Mask / FFP2 Respirator",
    description:
      "Particulate filter mask for protection against dust from drilling, chasing, and cutting. FFP2 minimum for masonry dust. FFP3 for silica dust (concrete, stone).",
    standard: "BS EN 149:2001+A1:2009",
    replacementFrequency: "Disposable: replace after each use or when breathing becomes restricted. Reusable: replace filters as per manufacturer",
    price: "£1-5 each (disposable) / £20-40 (reusable with filters)",
    group: "task-specific",
    apprenticeTip:
      "Silica dust from concrete and brick causes silicosis — a serious lung disease. Always wear a mask when drilling concrete, chasing walls, or cutting masonry. A reusable half-mask with P3 filters is more comfortable for all-day use.",
  },
  {
    name: "Face Shield",
    description:
      "Full face protection for heavy grinding, cutting, and any work generating large amounts of debris. Worn over safety glasses for maximum protection.",
    standard: "BS EN 166:2002",
    replacementFrequency: "Replace when visor is scratched or cracked",
    price: "£10-25",
    group: "task-specific",
    apprenticeTip:
      "Use when grinding metal or cutting trunking with an angle grinder. A face shield stops hot sparks and metal fragments that safety glasses cannot catch.",
  },
  {
    name: "Arc Flash PPE (Cat 2)",
    description:
      "Flame-resistant clothing, face shield, and insulated gloves for working near or on energised high-energy equipment. Required for work on distribution boards and switchgear over 230V.",
    standard: "BS EN 61482-1-1:2019 (Arc Flash PPE) / NFPA 70E",
    replacementFrequency: "Replace when damaged, contaminated, or after an arc flash event",
    price: "£100-400 (kit)",
    group: "task-specific",
    apprenticeTip:
      "Arc flash can reach 20,000°C and cause fatal burns in milliseconds. Most domestic electricians will never need full arc flash PPE, but understanding the risk is important for commercial and industrial work.",
  },
  {
    name: "Fall Protection Harness",
    description:
      "Full body harness with lanyard and shock absorber for working at height above 2m where edge protection is not available.",
    standard: "BS EN 361:2002 (harness) / BS EN 355:2002 (lanyard)",
    replacementFrequency: "Inspect before every use. Replace after a fall arrest event. Maximum service life: 5-10 years per manufacturer",
    price: "£50-150",
    group: "task-specific",
    apprenticeTip:
      "Falls from height are the number one cause of death on construction sites. If you are working above 2m without edge protection, you need a harness. Get trained before using one.",
  },
];

export const ppeTip =
  "PPE is your LAST line of defence, not your first. The hierarchy of control is: (1) Eliminate the hazard, (2) Substitute for something less hazardous, (3) Engineering controls, (4) Administrative controls, (5) PPE. But when you need PPE — wear it properly every single time.";
