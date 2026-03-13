-- Migration: Add structured_content to safety document templates
-- Generated: 2026-03-13
-- Description: Adds structured JSONB content to safety_document_templates and user_safety_documents
--              tables, then populates structured_content for all 15 templates with
--              comprehensive section/field definitions including validation rules,
--              BS 7671 regulation references, and sensible defaults.
--
-- Templates included:
--   Risk Assessments (6):
--     1. Consumer Unit Replacement
--     2. DB Board Installation
--     3. Cable Installation
--     4. Testing and Inspection
--     5. Solar PV Installation
--     6. EV Charger Installation
--   Method Statements (3):
--     7. First Fix Electrical
--     8. Second Fix Electrical
--     9. Safe Isolation Procedure
--   Permit / Safety Docs (6):
--    10. Safe Isolation (GS38)
--    11. Lock-Out/Tag-Out
--    12. Lone Working
--    13. Pre-Start Site Safety Checklist
--    14. Daily Tool Check
--    15. PPE Condition Check

-- ============================================================================
-- 1. Schema changes — add structured_content column if not present
-- ============================================================================

ALTER TABLE safety_document_templates
  ADD COLUMN IF NOT EXISTS structured_content JSONB DEFAULT NULL;

ALTER TABLE user_safety_documents
  ADD COLUMN IF NOT EXISTS structured_content JSONB DEFAULT NULL;

-- ============================================================================
-- 2. Populate structured_content for all 15 templates
-- ============================================================================

-- 1. Consumer Unit Replacement
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "risk_assessment",
  "fields": [
    {
      "id": "company_name",
      "type": "text",
      "label": "Company Name",
      "required": true
    },
    {
      "id": "site_address",
      "type": "text",
      "label": "Site Address",
      "required": true
    },
    {
      "id": "date",
      "type": "date",
      "label": "Assessment Date",
      "required": true,
      "default_value": "today"
    },
    {
      "id": "assessor_name",
      "type": "text",
      "label": "Assessor Name",
      "required": true,
      "placeholder": "Full name of assessor"
    },
    {
      "id": "review_date",
      "type": "date",
      "label": "Review Date",
      "required": false
    }
  ],
  "sections": [
    {
      "id": "hazard_table",
      "type": "hazard_table",
      "title": "Hazard Identification and Control Measures",
      "hazards": [
        {
          "hazard": "Electric shock from live parts during isolation and testing",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 5,
          "risk_rating": 15,
          "controls": [
            "Isolate supply at meter position and verify dead with GS38 voltage indicator",
            "Lock off main switch with personal padlock and warning notice",
            "Test for voltage at consumer unit terminals before commencing work",
            "Use insulated tools to BS EN 60900 throughout installation",
            "Maintain safe working distance from DNO equipment and meter tails"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Arc flash incident during isolation or switching operations",
          "who_at_risk": "Electricians",
          "likelihood": 3,
          "severity": 4,
          "risk_rating": 12,
          "controls": [
            "Wear arc-rated face shield and flame-resistant clothing during switching",
            "Stand to side of enclosure when operating isolator",
            "Ensure all loose connections tightened to manufacturer torque settings",
            "Check for signs of overheating or damage before energising",
            "Use insulated switching tools where possible"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Asbestos exposure from drilling backing board or disturbing old materials",
          "who_at_risk": "Electricians, other trades, building occupants",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Check asbestos register before commencing work",
            "Do not drill or disturb materials suspected to contain asbestos",
            "Use non-destructive fixings where asbestos backing board identified",
            "If asbestos confirmed, engage licensed contractor for removal",
            "Seal work area and provide local exhaust ventilation if drilling approved non-asbestos boards"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Working in confined spaces such as under-stairs cupboards with poor ventilation",
          "who_at_risk": "Electricians",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Assess work area for confined space hazards before entry",
            "Ensure adequate ventilation with doors/hatches open",
            "Use cordless tools to eliminate trailing cables and trip hazards",
            "Take regular breaks outside confined area",
            "Maintain communication with second person outside space"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Manual handling injuries from lifting and positioning consumer unit",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use two-person lift for consumer units over 15kg",
            "Maintain straight back and bend knees when lifting",
            "Position unit at waist height before fixing to wall",
            "Use trolley or board to transport unit from vehicle to installation point",
            "Take rest breaks during installation to avoid fatigue"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Falls from stepladder when working on high-level consumer units",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Use Class 1 industrial stepladder to BS EN 131",
            "Ensure three points of contact maintained at all times",
            "Position ladder on firm level surface with feet extended",
            "Do not overreach - reposition ladder as required",
            "Have second person foot ladder during termination work"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Inhalation of dust from removal of old consumer unit",
          "who_at_risk": "Electricians, building occupants",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Wear FFP3 disposable respirator to EN 149 during removal",
            "Use battery-powered vacuum with HEPA filter to capture dust",
            "Seal work area with dust sheets and close internal doors",
            "Dampen surfaces before drilling or cutting to suppress dust",
            "Dispose of waste in sealed bags immediately after removal"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Burns from soldering copper busbars or cable lugs",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 3,
          "risk_rating": 6,
          "controls": [
            "Use temperature-controlled soldering station with tip guard",
            "Wear heat-resistant gloves to EN 407 Level 2 minimum",
            "Provide stable heat-proof mat for hot tools",
            "Allow connections to cool before handling",
            "Keep first aid cold pack available on site"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Cuts and lacerations from sharp edges on consumer unit metalwork",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Wear cut-resistant gloves to EN 388 Level 3 when handling enclosures",
            "File or deburr sharp edges before cable installation",
            "Use grommets on all cable entries to protect conductors",
            "Keep first aid kit with dressings accessible",
            "Inspect enclosure for sharp edges before commencing terminations"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Inadequate lighting in cupboards or areas without natural light",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 3,
          "risk_rating": 6,
          "controls": [
            "Provide 110V or battery-powered task lighting with minimum 500 lux",
            "Position light to eliminate shadows on work area",
            "Ensure head-mounted torch available as backup",
            "Do not rely solely on mobile phone torch",
            "Allow time for eyes to adjust when moving between bright and dark areas"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Finger contact with live busbars during installation of MCBs or RCBOs",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Keep main switch isolated and locked off during device installation",
            "Verify dead at busbar with GS38 tester before installing devices",
            "Install insulating barriers between phases on three-phase boards",
            "Use only one hand when clipping devices onto DIN rail",
            "Do not energise board until all covers and barriers fitted"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Cable damage during removal of old consumer unit causing shock or fire risk",
          "who_at_risk": "Electricians, building occupants",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Photograph and label all circuits before disconnection",
            "Support cables during removal to prevent strain on terminations",
            "Inspect cables for damage and test insulation resistance before re-termination",
            "Replace any damaged cables rather than attempting repair",
            "Ensure adequate cable length available for neat termination in new unit"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Trip hazards from temporary cable runs and tools on floor",
          "who_at_risk": "Electricians, building occupants, other trades",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Keep work area clear and organised throughout installation",
            "Route temporary cables along walls and secure with tape",
            "Store tools in toolbag or on elevated surface when not in use",
            "Erect barrier tape around work area to exclude public",
            "Brief building occupants on hazards and alternative routes"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Eye injury from debris when drilling fixing holes or removing old fixings",
          "who_at_risk": "Electricians",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Wear impact-rated safety glasses to EN 166 at all times",
            "Use drill with built-in dust extraction where possible",
            "Point drill downwards to direct debris away from face",
            "Keep eyewash bottle available on site",
            "Inspect drill bits for damage before use to prevent fragments"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Fire risk from loose connections or incorrect circuit protection",
          "who_at_risk": "Building occupants, electricians, public",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Torque all terminations to manufacturer specifications using calibrated driver",
            "Verify correct protective device rating for each circuit cable size",
            "Conduct thermal imaging survey after energisation to detect hot spots",
            "Complete insulation resistance and polarity tests before final connection",
            "Ensure smoke alarms operational before leaving site"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        }
      ]
    },
    {
      "id": "ppe_grid",
      "type": "ppe_grid",
      "title": "Personal Protective Equipment Requirements",
      "items": [
        {
          "name": "Safety footwear",
          "required": true,
          "specification": "Steel toe cap boots to EN ISO 20345 S3"
        },
        {
          "name": "Safety glasses",
          "required": true,
          "specification": "Impact-rated to EN 166, clear lens"
        },
        {
          "name": "Insulated gloves",
          "required": true,
          "specification": "Class 00 rubber insulating gloves to EN 60903 for live working"
        },
        {
          "name": "Cut-resistant gloves",
          "required": true,
          "specification": "EN 388 Level 3 minimum for metalwork handling"
        },
        {
          "name": "Dust mask",
          "required": true,
          "specification": "FFP3 disposable respirator to EN 149"
        },
        {
          "name": "Arc-rated face shield",
          "required": true,
          "specification": "Switching operations only, 8 cal/cm² minimum"
        },
        {
          "name": "High-visibility vest",
          "required": false,
          "specification": "Class 2 to EN ISO 20471 if working near roadways"
        }
      ]
    },
    {
      "id": "emergency_procedures",
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "In event of electric shock, isolate supply immediately and call 999. Do not touch casualty until supply confirmed dead.",
        "If fire occurs, evacuate building and call 999. Do not attempt to fight electrical fires with water extinguishers.",
        "For arc flash injuries, activate emergency services immediately. Remove casualty from area and treat for burns.",
        "First aider contact details displayed on site notice board. First aid kit located in site welfare area.",
        "Report all accidents and near misses to site supervisor immediately. Preserve scene for investigation."
      ]
    },
    {
      "id": "competence_requirements",
      "type": "key_value",
      "title": "Competence Requirements",
      "pairs": [
        {
          "key": "Minimum qualification",
          "value": "City & Guilds 2365 Level 3 or equivalent electrical qualification"
        },
        {
          "key": "Experience required",
          "value": "Minimum 12 months experience in domestic consumer unit installations"
        },
        {
          "key": "Scheme membership",
          "value": "Registered with NICEIC, NAPIT, ELECSA or equivalent competent person scheme"
        },
        {
          "key": "Training",
          "value": "18th Edition BS 7671, safe isolation procedures, manual handling, asbestos awareness"
        }
      ]
    },
    {
      "id": "signature_block",
      "type": "signature_block",
      "title": "Assessment Sign-Off",
      "entries": [
        {
          "role": "Assessor",
          "name": "",
          "date": "",
          "signature": ""
        },
        {
          "role": "Reviewed by",
          "name": "",
          "date": "",
          "signature": ""
        },
        {
          "role": "Site supervisor acknowledgement",
          "name": "",
          "date": "",
          "signature": ""
        }
      ]
    },
    {
      "id": "references",
      "type": "references",
      "title": "Regulatory References",
      "items": [
        "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
        "GS38 Electrical test equipment for use by electricians",
        "Electricity at Work Regulations 1989"
      ]
    }
  ]
}'::jsonb WHERE name = 'Consumer Unit Replacement';

-- 2. DB Board Installation
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "risk_assessment",
  "fields": [
    {
      "id": "company_name",
      "type": "text",
      "label": "Company Name",
      "required": true
    },
    {
      "id": "site_address",
      "type": "text",
      "label": "Site Address",
      "required": true
    },
    {
      "id": "date",
      "type": "date",
      "label": "Assessment Date",
      "required": true,
      "default_value": "today"
    },
    {
      "id": "assessor_name",
      "type": "text",
      "label": "Assessor Name",
      "required": true,
      "placeholder": "Full name of assessor"
    },
    {
      "id": "review_date",
      "type": "date",
      "label": "Review Date",
      "required": false
    }
  ],
  "sections": [
    {
      "id": "hazard_table",
      "type": "hazard_table",
      "title": "Hazard Identification and Control Measures",
      "hazards": [
        {
          "hazard": "Electric shock during connection to incoming supply and main terminals",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 5,
          "risk_rating": 15,
          "controls": [
            "Coordinate supply isolation with DNO or building management",
            "Verify dead at incoming terminals using GS38 voltage indicator",
            "Apply personal isolation lock and danger notice at isolation point",
            "Use insulated tools to BS EN 60900 for all termination work",
            "Maintain minimum approach distance from adjacent live equipment"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Arc flash event during energisation or fault conditions",
          "who_at_risk": "Electricians",
          "likelihood": 3,
          "severity": 4,
          "risk_rating": 12,
          "controls": [
            "Wear arc-rated PPE including face shield and flame-resistant coveralls",
            "Stand to side of distribution board when closing main isolator",
            "Conduct insulation resistance and continuity tests before energising",
            "Torque all busbar and cable terminations to manufacturer specifications",
            "Ensure arc fault detection devices fitted where specified"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Drilling through concealed services including gas pipes, water mains, or live cables",
          "who_at_risk": "Electricians, building occupants, other trades",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Use CAT4 cable avoidance tool to scan wall before drilling",
            "Review building drawings and services layout plans",
            "Drill pilot holes and probe with insulated rod before full-diameter drilling",
            "Set drill depth stop to prevent over-penetration",
            "Maintain emergency contact numbers for gas and water utilities"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Working at height when installing distribution boards in elevated positions",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Use podium steps or mobile tower scaffold for prolonged work above 2 metres",
            "Ensure scaffold tagged and inspected within last 7 days",
            "Maintain three points of contact when using ladders",
            "Use tool lanyards to prevent dropped objects",
            "Erect exclusion zone barriers below work area"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Manual handling injuries from lifting and positioning heavy distribution boards",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use mechanical lifting aids or two-person lift for boards over 20kg",
            "Pre-position board at correct height using adjustable platform before fixing",
            "Bend knees and keep back straight during lifting operations",
            "Remove internal components to reduce weight before wall mounting",
            "Rotate tasks to avoid prolonged repetitive lifting"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Inhalation of harmful dust from wall chasing and core drilling",
          "who_at_risk": "Electricians, building occupants, other trades",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Use on-tool dust extraction with M-class vacuum to BS 60335-2-69",
            "Wear FFP3 respirator to EN 149 during all cutting and drilling",
            "Seal work area with dust barrier sheeting and close doors",
            "Dampen surfaces before cutting to suppress airborne dust",
            "Dispose of dust waste in sealed bags as hazardous material"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Noise exposure from SDS drills, angle grinders, and impact drivers",
          "who_at_risk": "Electricians, other trades, building occupants",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Wear ear defenders or ear plugs rated to reduce noise below 85dB(A)",
            "Use low-noise power tools where available",
            "Limit exposure time for high-noise tasks and rotate personnel",
            "Provide advance notice to building occupants of noisy works",
            "Schedule noisy operations to minimise disruption"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Falling tools or materials injuring people working below",
          "who_at_risk": "Other trades, building occupants, public",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Erect solid barriers or netting below elevated work areas",
            "Use tool lanyards for all hand tools used at height",
            "Secure loose items in tool belt or bucket before ascending",
            "Establish exclusion zone with barrier tape and signage",
            "Coordinate with other trades to prevent access below work area"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Strain injuries from pulling and terminating heavy armoured cables",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use cable pulling equipment including winches and rollers for long runs",
            "Apply cable lubricant to reduce friction in ducts and trunking",
            "Team lift for cables over 10mm² cross-sectional area",
            "Support cable at intervals during installation to prevent sagging",
            "Take rest breaks during prolonged cable pulling operations"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Cuts and lacerations from cable stripping and armour removal",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Use purpose-designed cable stripping tools rather than knives",
            "Wear cut-resistant gloves to EN 388 Level 3 when handling armoured cable",
            "Cut away from body and keep hands behind cutting edge",
            "Dispose of cable off-cuts and armour wire in designated sharp waste container",
            "Maintain sharp tools to reduce slippage risk"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Electrocution from contact with faulty temporary electrical supplies",
          "who_at_risk": "Electricians, other trades",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Use 110V centre-tapped earth supply for all portable power tools",
            "Visually inspect all temporary supply equipment before use",
            "Protect temporary supplies with 30mA RCD protection",
            "PAT test all electrical equipment within last 3 months",
            "Do not use damaged cables, plugs, or extension leads"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Sharps injuries from burrs and sharp edges on metal trunking and enclosures",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "File and deburr all cut edges on trunking before cable installation",
            "Wear cut-resistant gloves when handling metalwork",
            "Use grommets or edge protection on all cable entries",
            "Inspect enclosures for sharp edges and manufacturing defects",
            "Keep first aid kit with wound dressings accessible"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Fire risk from overheating connections during commissioning and testing",
          "who_at_risk": "Building occupants, electricians, public",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Torque all terminations using calibrated torque screwdriver to BS 7671 Appendix 10",
            "Conduct thermal imaging survey after 30 minutes of load operation",
            "Verify protective device ratings match circuit design calculations",
            "Check for signs of overheating including discolouration or burning smell",
            "Ensure fire extinguishers and emergency procedures in place before energisation"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Eye injuries from drilling and grinding operations",
          "who_at_risk": "Electricians",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Wear impact-rated safety glasses to EN 166 at all times during fabrication",
            "Use face shield when grinding or cutting with angle grinder",
            "Ensure adequate lighting to prevent eye strain",
            "Keep eyewash station or bottle available on site",
            "Inspect grinding discs for cracks before use"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Slips and trips on debris, cable off-cuts, and wet surfaces",
          "who_at_risk": "Electricians, other trades, building occupants",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Maintain clean and tidy work area throughout installation",
            "Remove cable drums and packaging immediately after use",
            "Use warning signs for wet floors after cleaning dust",
            "Route cables and temporary supplies to avoid pedestrian routes",
            "Conduct end-of-shift clean-up and waste removal"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        }
      ]
    },
    {
      "id": "ppe_grid",
      "type": "ppe_grid",
      "title": "Personal Protective Equipment Requirements",
      "items": [
        {
          "name": "Safety footwear",
          "required": true,
          "specification": "Steel toe cap boots to EN ISO 20345 S3"
        },
        {
          "name": "Safety glasses",
          "required": true,
          "specification": "Impact-rated to EN 166 with side protection"
        },
        {
          "name": "Hard hat",
          "required": true,
          "specification": "EN 397 Class B for elevated work or multi-trade sites"
        },
        {
          "name": "Insulated gloves",
          "required": true,
          "specification": "Class 00 rubber insulating gloves to EN 60903"
        },
        {
          "name": "Cut-resistant gloves",
          "required": true,
          "specification": "EN 388 Level 3 minimum for metalwork and cable handling"
        },
        {
          "name": "Dust mask",
          "required": true,
          "specification": "FFP3 disposable respirator to EN 149"
        },
        {
          "name": "Arc-rated PPE",
          "required": true,
          "specification": "Face shield and FR clothing, 8 cal/cm² minimum for switching operations"
        }
      ]
    },
    {
      "id": "emergency_procedures",
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "In event of electric shock, isolate supply at main isolation point and call 999. Do not approach casualty until supply confirmed dead.",
        "If fire occurs in distribution board, evacuate building and call 999. Use CO2 extinguisher only if safe to do so.",
        "For arc flash injuries, activate emergency services immediately. Cool burns with running water for at least 20 minutes.",
        "Report all accidents, dangerous occurrences, and near misses to site supervisor and HSE where required under RIDDOR.",
        "First aid kit location and trained first aider details displayed on site notice board. Nearest A&E department identified in site induction.",
        "In event of drilling strike on gas pipe, evacuate building, isolate gas at meter, call National Gas Emergency on 0800 111 999."
      ]
    },
    {
      "id": "competence_requirements",
      "type": "key_value",
      "title": "Competence Requirements",
      "pairs": [
        {
          "key": "Minimum qualification",
          "value": "City & Guilds 2365 Level 3 Diploma in Electrical Installations or equivalent NVQ Level 3"
        },
        {
          "key": "Experience required",
          "value": "Minimum 2 years experience in commercial distribution board installations and three-phase systems"
        },
        {
          "key": "Scheme membership",
          "value": "Registered electrician with NICEIC, NAPIT, ECA or equivalent competent person scheme"
        },
        {
          "key": "Training",
          "value": "18th Edition BS 7671, safe isolation, inspection and testing, manual handling, working at height, asbestos awareness"
        }
      ]
    },
    {
      "id": "signature_block",
      "type": "signature_block",
      "title": "Assessment Sign-Off",
      "entries": [
        {
          "role": "Assessor",
          "name": "",
          "date": "",
          "signature": ""
        },
        {
          "role": "Reviewed by",
          "name": "",
          "date": "",
          "signature": ""
        },
        {
          "role": "Principal contractor acknowledgement",
          "name": "",
          "date": "",
          "signature": ""
        }
      ]
    },
    {
      "id": "references",
      "type": "references",
      "title": "Regulatory References",
      "items": [
        "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
        "GS38 Electrical test equipment for use by electricians"
      ]
    }
  ]
}'::jsonb WHERE name = 'DB Board Installation';

-- 3. Cable Installation
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "risk_assessment",
  "fields": [
    {
      "id": "company_name",
      "type": "text",
      "label": "Company Name",
      "required": true
    },
    {
      "id": "site_address",
      "type": "text",
      "label": "Site Address",
      "required": true
    },
    {
      "id": "date",
      "type": "date",
      "label": "Assessment Date",
      "required": true,
      "default_value": "today"
    },
    {
      "id": "assessor_name",
      "type": "text",
      "label": "Assessor Name",
      "required": true,
      "placeholder": "Full name of assessor"
    },
    {
      "id": "review_date",
      "type": "date",
      "label": "Review Date",
      "required": false
    }
  ],
  "sections": [
    {
      "id": "hazard_table",
      "type": "hazard_table",
      "title": "Hazard Identification and Control Measures",
      "hazards": [
        {
          "hazard": "Contact with live electrical services concealed in walls, ceilings, or floors",
          "who_at_risk": "Electricians, apprentices, other trades",
          "likelihood": 2,
          "severity": 5,
          "risk_rating": 10,
          "controls": [
            "Use CAT4 cable avoidance tool to scan route before drilling or chasing",
            "Review electrical installation drawings and as-built records",
            "Assume all concealed metallic services are live unless proven dead",
            "Use battery-powered tools to eliminate risk of cutting through supply cable",
            "Mark identified service routes on walls before commencing installation work"
          ],
          "residual_likelihood": 1,
          "residual_severity": 5,
          "residual_risk": 5
        },
        {
          "hazard": "Working at height when installing cable tray, basket, or ladder rack systems",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Use mobile tower scaffold with handrails for overhead cable installation",
            "Ensure scaffold inspected and tagged within last 7 days",
            "Wear safety harness when working on fixed ladders or platforms above 2 metres",
            "Use podium steps with handrails for short-duration elevated work",
            "Maintain exclusion zone below cable installation work with barrier tape"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Inhalation of harmful dust from wall chasing and core drilling operations",
          "who_at_risk": "Electricians, building occupants, other trades",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Use wall chaser with integrated M-class dust extraction to BS 60335-2-69",
            "Wear FFP3 respirator to EN 149 during all cutting and drilling",
            "Seal doorways with dust barrier sheeting and maintain negative pressure",
            "Wet-cut where possible to suppress airborne respirable crystalline silica",
            "Dispose of collected dust as hazardous waste in sealed containers"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Noise exposure from SDS hammer drills and wall chasing machines",
          "who_at_risk": "Electricians, building occupants, other trades",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Wear ear defenders rated to reduce noise exposure below 85dB(A)",
            "Limit duration of high-noise tasks to prevent daily exposure exceeding limits",
            "Use low-noise equipment where available including battery-powered tools",
            "Provide advance notice to building occupants of noisy operations",
            "Rotate personnel to minimise individual noise exposure time"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Manual handling injuries from lifting and manoeuvring cable drums",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use drum jacks or trolleys to transport cable drums over 30kg",
            "Team lift for drums over 25kg and maintain straight back during lift",
            "Position drums at waist height on stillages before commencing cable pull",
            "Use cable pulling equipment including winches for heavy armoured cable",
            "Rotate tasks to avoid prolonged repetitive pulling and bending"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Trip hazards from temporary cable runs, drums, and off-cuts on floor",
          "who_at_risk": "Electricians, other trades, building occupants, public",
          "likelihood": 4,
          "severity": 2,
          "risk_rating": 8,
          "controls": [
            "Route cables along walls and secure with temporary clips or tape",
            "Use cable protectors or ramps where cables cross pedestrian routes",
            "Remove drums and packaging from work area immediately after use",
            "Maintain clear access routes and emergency exits at all times",
            "Conduct regular housekeeping sweeps to remove cable off-cuts and debris"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Slips on dust, debris, and wet surfaces created during installation",
          "who_at_risk": "Electricians, other trades, building occupants",
          "likelihood": 3,
          "severity": 2,
          "risk_rating": 6,
          "controls": [
            "Clean work area regularly using vacuum with HEPA filtration",
            "Use wet floor warning signs after cleaning dust-contaminated surfaces",
            "Wear slip-resistant safety footwear to EN ISO 20345 SRC rating",
            "Contain water and slurry from wet-cutting operations with absorbent mats",
            "Conduct end-of-shift clean-up before leaving site"
          ],
          "residual_likelihood": 1,
          "residual_severity": 2,
          "residual_risk": 2
        },
        {
          "hazard": "Cuts and lacerations from stripping steel wire armoured cable",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use purpose-designed armour stripping tools rather than knives or hacksaws",
            "Wear cut-resistant gloves to EN 388 Level 5 when handling SWA cable",
            "Cut away from body and keep hands behind cutting edge at all times",
            "Dispose of armour wire and sharp off-cuts in designated sharps container",
            "Inspect cables for damage and sharp edges before handling"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Eye injuries from cable clipping, drilling, and cutting operations",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 2,
          "severity": 3,
          "risk_rating": 6,
          "controls": [
            "Wear impact-rated safety glasses to EN 166 with side protection at all times",
            "Use face shield when drilling overhead or cutting with angle grinder",
            "Point drill downwards where possible to direct debris away from face",
            "Keep eyewash bottle or station available on site for emergency irrigation",
            "Inspect fixings and clips for burrs before use"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Falls from stepladders or portable ladders during cable installation",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Use Class 1 industrial ladder to BS EN 131 and inspect before use",
            "Ensure ladder secured at top or footed by second person",
            "Maintain three points of contact and do not overreach",
            "Use podium steps with handrails for prolonged work above 2 metres",
            "Position ladder at 75-degree angle on firm level ground"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Hand-arm vibration syndrome from prolonged use of power tools",
          "who_at_risk": "Electricians",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use low-vibration tools and maintain equipment in good condition",
            "Limit exposure time to vibrating tools and monitor trigger time",
            "Wear anti-vibration gloves to EN ISO 10819 during drilling and cutting",
            "Take regular breaks to allow hands to warm up and recover",
            "Report symptoms of tingling or numbness to supervisor immediately"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Crushing injuries from cable drums falling or rolling",
          "who_at_risk": "Electricians, apprentices, other trades",
          "likelihood": 2,
          "severity": 4,
          "risk_rating": 8,
          "controls": [
            "Chock cable drums immediately after positioning to prevent rolling",
            "Store drums on purpose-built stillages or drum jacks",
            "Never stand drums vertically unless designed for vertical storage",
            "Secure drums during transport with straps and load restraints",
            "Keep feet clear when rotating drums to dispense cable"
          ],
          "residual_likelihood": 1,
          "residual_severity": 4,
          "residual_risk": 4
        },
        {
          "hazard": "Back and shoulder injuries from pulling heavy cables through trunking and conduit",
          "who_at_risk": "Electricians, apprentices",
          "likelihood": 3,
          "severity": 3,
          "risk_rating": 9,
          "controls": [
            "Use cable winches or pulling equipment for cables over 10mm² CSA",
            "Apply pulling lubricant to reduce friction in long conduit runs",
            "Team pull with coordinated signals for heavy or armoured cables",
            "Install cable rollers at bends and pull points to reduce friction",
            "Adopt stable stance with feet shoulder-width apart during pulling"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Burns from cables overheating during insulation resistance testing",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 3,
          "risk_rating": 6,
          "controls": [
            "Allow adequate cooling time between insulation resistance test cycles",
            "Do not exceed manufacturer recommended test voltage for cable type",
            "Monitor cable temperature during high-voltage testing",
            "Ensure cable fully supported and not coiled during testing",
            "Disconnect test leads immediately if unusual heat or odour detected"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        },
        {
          "hazard": "Exposure to rodent droppings and contamination in roof voids and service ducts",
          "who_at_risk": "Electricians",
          "likelihood": 2,
          "severity": 3,
          "risk_rating": 6,
          "controls": [
            "Wear disposable gloves and FFP3 respirator when working in contaminated areas",
            "Do not disturb rodent nests or droppings - withdraw and notify client",
            "Wash hands thoroughly with antibacterial soap after working in voids",
            "Avoid contact with eyes, nose, and mouth until hands washed",
            "Dispose of contaminated PPE in sealed waste bags"
          ],
          "residual_likelihood": 1,
          "residual_severity": 3,
          "residual_risk": 3
        }
      ]
    },
    {
      "id": "ppe_grid",
      "type": "ppe_grid",
      "title": "Personal Protective Equipment Requirements",
      "items": [
        {
          "name": "Safety footwear",
          "required": true,
          "specification": "Steel toe cap boots to EN ISO 20345 S3 with slip-resistant sole (SRC)"
        },
        {
          "name": "Safety glasses",
          "required": true,
          "specification": "Impact-rated to EN 166 with side protection"
        },
        {
          "name": "Hard hat",
          "required": true,
          "specification": "EN 397 Class B for multi-trade sites or overhead hazards"
        },
        {
          "name": "Cut-resistant gloves",
          "required": true,
          "specification": "EN 388 Level 5 for SWA cable handling and armour stripping"
        },
        {
          "name": "Dust mask",
          "required": true,
          "specification": "FFP3 disposable respirator to EN 149 for cutting and drilling"
        },
        {
          "name": "Ear defenders",
          "required": true,
          "specification": "SNR 25dB minimum for drilling and chasing operations"
        },
        {
          "name": "High-visibility vest",
          "required": false,
          "specification": "Class 2 to EN ISO 20471 if working near vehicle routes"
        }
      ]
    },
    {
      "id": "emergency_procedures",
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "In event of electric shock from striking live cable, isolate supply at nearest distribution board and call 999. Do not touch casualty until confirmed dead.",
        "If fire occurs, activate fire alarm and evacuate building. Call 999 and use CO2 extinguisher on electrical fires only if safe to do so.",
        "For injuries from falls or falling objects, do not move casualty unless in immediate danger. Call 999 and provide first aid until ambulance arrives.",
        "Report all accidents, dangerous occurrences, and near misses to site supervisor immediately. Preserve scene and evidence for investigation.",
        "First aider contact details and first aid kit location displayed on site notice board. Nearest hospital with A&E department identified in site induction.",
        "In event of drilling strike on gas pipe, evacuate building immediately, isolate gas at meter, and call National Gas Emergency Service on 0800 111 999."
      ]
    },
    {
      "id": "competence_requirements",
      "type": "key_value",
      "title": "Competence Requirements",
      "pairs": [
        {
          "key": "Minimum qualification",
          "value": "City & Guilds 2365 Level 3 Diploma in Electrical Installations or NVQ Level 3 Electrotechnical"
        },
        {
          "key": "Experience required",
          "value": "Minimum 12 months experience in commercial cable installation including trunking, tray, and containment systems"
        },
        {
          "key": "Scheme membership",
          "value": "Registered electrician with NICEIC, NAPIT, ECA, or equivalent competent person scheme"
        },
        {
          "key": "Training",
          "value": "18th Edition BS 7671, manual handling, working at height, asbestos awareness, COSHH, use of cable avoidance tools"
        }
      ]
    },
    {
      "id": "signature_block",
      "type": "signature_block",
      "title": "Assessment Sign-Off",
      "entries": [
        {
          "role": "Assessor",
          "name": "",
          "date": "",
          "signature": ""
        },
        {
          "role": "Reviewed by",
          "name": "",
          "date": "",
          "signature": ""
        },
        {
          "role": "Site supervisor acknowledgement",
          "name": "",
          "date": "",
          "signature": ""
        }
      ]
    },
    {
      "id": "references",
      "type": "references",
      "title": "Regulatory References",
      "items": [
        "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
        "Construction (Design and Management) Regulations 2015"
      ]
    }
  ]
}'::jsonb WHERE name = 'Cable Installation';

-- 4. Testing and Inspection
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "risk_assessment",
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"assessor_name","label":"Assessor Name","type":"text","required":true,"placeholder":"Full name of assessor"},
    {"key":"review_date","label":"Review Date","type":"date","required":false}
  ],
  "sections": [
    {
      "type": "hazard_table",
      "title": "Hazard Identification and Risk Assessment",
      "columns": ["hazard","who_at_risk","likelihood","severity","risk_rating","controls","residual_likelihood","residual_severity","residual_risk"],
      "rows": [
        {"hazard":"Electric shock during live testing","who_at_risk":"Electrician, test engineer","likelihood":3,"severity":5,"risk_rating":15,"controls":["Use approved voltage indicators to BS GS 38","Isolate and lock off where practicable","Prove dead before test","Wear insulated gloves rated for voltage","Maintain safe working distances","Work with competent assistant"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Arc flash at test points","who_at_risk":"Electrician, nearby workers","likelihood":2,"severity":4,"risk_rating":8,"controls":["Use arc-rated PPE for high-energy circuits","Position body away from potential arc path","Use remote test probes where available","Ensure correct current rating of test equipment"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Incorrect instrument use","who_at_risk":"Electrician, building occupants","likelihood":2,"severity":4,"risk_rating":8,"controls":["Use only calibrated test instruments","Follow manufacturer instructions precisely","Check instrument function before use","Verify test leads for damage before each use","Select correct test range and function","Record instrument calibration dates"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Cramped working spaces","who_at_risk":"Electrician","likelihood":3,"severity":3,"risk_rating":9,"controls":["Assess accessibility before commencing work","Use portable lighting to improve visibility","Take regular breaks to prevent fatigue","Use mirrors or cameras to inspect confined areas"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Slip/trip in plant rooms","who_at_risk":"All site workers","likelihood":3,"severity":2,"risk_rating":6,"controls":["Keep walkways clear of cables and equipment","Use non-slip footwear","Ensure adequate lighting in all areas","Clean up spillages immediately","Mark trip hazards with warning tape"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Contact with rotating machinery","who_at_risk":"Electrician, maintenance staff","likelihood":2,"severity":5,"risk_rating":10,"controls":["Isolate machinery before testing associated circuits","Lock out rotating equipment","Maintain safe clearance distances","Wear close-fitting clothing","Ensure guards are in place before re-energising"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Burns from overheated components","who_at_risk":"Electrician","likelihood":2,"severity":3,"risk_rating":6,"controls":["Use thermal imaging to identify hot components","Allow cooling time before contact","Wear heat-resistant gloves when necessary","Avoid touching components immediately after testing"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Finger contact with exposed terminals","who_at_risk":"Electrician","likelihood":2,"severity":5,"risk_rating":10,"controls":["Use insulated tools to BS GS 38","Keep hands behind probe guards","Use one-handed test method where possible","Ensure terminal shrouds are replaced after testing","Maintain minimum clearance distances"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Overhead hazards in ceiling voids","who_at_risk":"Electrician","likelihood":3,"severity":3,"risk_rating":9,"controls":["Wear hard hat when working above false ceilings","Inspect void before entry","Use appropriate access equipment","Ensure adequate headroom before entering","Brief others on overhead work"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Lone working risks","who_at_risk":"Electrician","likelihood":2,"severity":4,"risk_rating":8,"controls":["Implement check-in procedures","Carry mobile phone with emergency contacts","Use buddy system for high-risk tasks","Ensure someone knows location and expected finish time","Avoid live testing when working alone"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Contaminated environments","who_at_risk":"Electrician","likelihood":2,"severity":3,"risk_rating":6,"controls":["Assess for asbestos, chemicals, biological hazards","Wear appropriate respiratory protection if required","Follow COSHH assessments","Wash hands before eating or drinking","Use barrier cream on exposed skin"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Falls from ladders accessing distribution boards","who_at_risk":"Electrician","likelihood":2,"severity":4,"risk_rating":8,"controls":["Use stepladders with handrails","Ensure ladder is on firm, level ground","Maintain three points of contact","Use platform if extended work required","Secure ladder to prevent movement"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Sharp edges on switchgear","who_at_risk":"Electrician","likelihood":3,"severity":2,"risk_rating":6,"controls":["Wear cut-resistant gloves when handling panels","Inspect for burrs and sharp edges before work","File down sharp edges where safe to do so","Handle panels carefully during removal"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Stress/fatigue from prolonged testing","who_at_risk":"Electrician","likelihood":3,"severity":2,"risk_rating":6,"controls":["Schedule regular breaks during long test sessions","Rotate tasks to vary workload","Ensure adequate staffing for large installations","Maintain hydration and nutrition","Plan realistic testing schedules"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Inadequate emergency access","who_at_risk":"All workers, emergency services","likelihood":2,"severity":4,"risk_rating":8,"controls":["Keep emergency exits clear at all times","Ensure fire extinguishers are accessible","Maintain clear evacuation routes","Identify assembly points before starting work","Ensure first aid kit is readily available"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4}
      ]
    },
    {
      "type": "ppe_grid",
      "title": "Personal Protective Equipment Requirements",
      "items": [
        {"item":"Safety footwear","standard":"EN ISO 20345"},
        {"item":"Hard hat","standard":"EN 397"},
        {"item":"Safety glasses","standard":"EN 166"},
        {"item":"Insulated gloves","standard":"EN 60903"},
        {"item":"High-visibility vest","standard":"EN ISO 20471"},
        {"item":"Arc-rated clothing (where required)","standard":"IEC 61482"},
        {"item":"Ear defenders (noisy plant rooms)","standard":"EN 352"}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "In the event of electric shock, isolate supply immediately and do not touch the casualty until safe",
        "Administer CPR if trained and casualty is not breathing",
        "Call 999 and request ambulance, stating electrical incident",
        "Evacuate area if fire or serious hazard develops",
        "Report all incidents to site supervisor and complete accident book entry",
        "Preserve scene for investigation if serious injury occurs"
      ]
    },
    {
      "type": "key_value",
      "title": "Competence and Training",
      "pairs": [
        {"key":"Minimum qualification","value":"City & Guilds 2391 Inspection and Testing or equivalent"},
        {"key":"Experience required","value":"Minimum 2 years post-qualification electrical testing experience"},
        {"key":"Test equipment training","value":"Competent in use of multifunction testers, insulation resistance testers, RCD testers"},
        {"key":"Authorisation","value":"Must be authorised by duty holder before conducting live testing"}
      ]
    },
    {
      "type": "signature_block",
      "title": "Approval and Review",
      "entries": [
        {"role":"Assessed by","name":"","date":"","signature":""},
        {"role":"Reviewed by","name":"","date":"","signature":""},
        {"role":"Approved by","name":"","date":"","signature":""}
      ]
    },
    {
      "type": "bullet_list",
      "title": "References and Standards",
      "items": [
        "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
        "GS 38 Electrical test equipment for use by electricians",
        "Electricity at Work Regulations 1989"
      ]
    }
  ]
}'::jsonb WHERE name = 'Testing and Inspection';

-- 5. Solar PV Installation
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "risk_assessment",
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"assessor_name","label":"Assessor Name","type":"text","required":true,"placeholder":"Full name of assessor"},
    {"key":"review_date","label":"Review Date","type":"date","required":false}
  ],
  "sections": [
    {
      "type": "hazard_table",
      "title": "Hazard Identification and Risk Assessment",
      "columns": ["hazard","who_at_risk","likelihood","severity","risk_rating","controls","residual_likelihood","residual_severity","residual_risk"],
      "rows": [
        {"hazard":"Working at height on roof","who_at_risk":"Installer, solar technician","likelihood":3,"severity":5,"risk_rating":15,"controls":["Use appropriate access equipment (scaffolding, MEWPs)","Install edge protection and guardrails","Wear full-body harness with anchor points","Conduct pre-work roof survey for load capacity","Implement rescue plan for working at height","Ensure weather conditions are suitable"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"DC shock from solar panels","who_at_risk":"Installer, maintenance staff","likelihood":3,"severity":5,"risk_rating":15,"controls":["Cover panels during installation to prevent voltage generation","Use insulated tools rated for DC voltage","Wear insulated gloves when making DC connections","Install DC isolators before making final connections","Test for voltage before touching conductors","Follow manufacturer lockout procedures"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Manual handling of solar panels","who_at_risk":"Installation team","likelihood":3,"severity":3,"risk_rating":9,"controls":["Use mechanical lifting aids where possible","Work in teams of two for panel handling","Maintain good posture and lifting technique","Take regular breaks to prevent fatigue","Use panel grips or suction lifters"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Fragile roof surfaces","who_at_risk":"All roof workers","likelihood":2,"severity":5,"risk_rating":10,"controls":["Identify fragile areas before work starts","Use crawl boards on fragile roofs","Install roof ladders to spread load","Mark fragile areas with warning signs","Never step on roof lights or translucent panels","Ensure adequate structural support for equipment"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Weather exposure (sun, wind, rain)","who_at_risk":"All outdoor workers","likelihood":3,"severity":3,"risk_rating":9,"controls":["Monitor weather forecast daily","Cease work in high winds (over 25mph)","Provide sun protection (cream, hats, water)","Avoid working on wet roofs","Implement lightning protection procedure"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"UV radiation exposure","who_at_risk":"Installation team","likelihood":3,"severity":2,"risk_rating":6,"controls":["Provide high-factor sunscreen (SPF 30+)","Wear long-sleeved clothing and wide-brimmed hats","Schedule work to avoid midday sun where possible","Ensure adequate water supply to prevent dehydration"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Falls from scaffolding","who_at_risk":"All workers on scaffold","likelihood":2,"severity":5,"risk_rating":10,"controls":["Ensure scaffold is erected by competent person","Check scaffold tag before use","Maintain three points of contact when climbing","Do not overload working platforms","Report any defects immediately","Use toeboards and guardrails on all platforms"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Cable routing electrocution risk","who_at_risk":"Installer, electrician","likelihood":2,"severity":5,"risk_rating":10,"controls":["Use cable detection equipment before drilling","Isolate existing circuits in work area","Follow safe zones for cable routing","Use RCD protection on all power tools","Verify absence of voltage before cable work"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Inverter AC/DC connection hazards","who_at_risk":"Electrician","likelihood":2,"severity":4,"risk_rating":8,"controls":["Follow manufacturer installation procedures precisely","Isolate AC supply before inverter connection","Verify DC isolation before opening inverter","Use lockout/tagout on isolators","Wear appropriate PPE for electrical work","Test installation before energising"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Battery storage system risks","who_at_risk":"Installer, occupants","likelihood":2,"severity":5,"risk_rating":10,"controls":["Install batteries in well-ventilated location","Follow manufacturer fire safety guidance","Ensure thermal runaway protection is fitted","Install appropriate fire suppression if required","Maintain clearances from combustible materials","Label battery hazards clearly"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Bird and insect nests on roof","who_at_risk":"Installation team","likelihood":2,"severity":2,"risk_rating":4,"controls":["Inspect roof for nests before starting work","Do not disturb active nests during breeding season","Install bird protection mesh under panels","Wear gloves when handling nest material","Dispose of nests in accordance with wildlife regulations"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Hot panel surfaces in sunlight","who_at_risk":"Installer","likelihood":3,"severity":2,"risk_rating":6,"controls":["Wear heat-resistant gloves when handling panels in sun","Schedule installation for cooler parts of day where possible","Cover panels to reduce temperature","Warn team of burn risk from hot surfaces"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Structural collapse from weak roof","who_at_risk":"All workers, building occupants","likelihood":2,"severity":5,"risk_rating":10,"controls":["Commission structural survey before installation","Obtain engineer approval for roof loading","Distribute panel weight across roof structure","Reinforce roof structure if required","Do not exceed maximum roof load capacity","Use appropriate mounting systems for roof type"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Cuts from panel frame edges","who_at_risk":"Installer","likelihood":3,"severity":2,"risk_rating":6,"controls":["Wear cut-resistant gloves","Handle panels carefully to avoid sharp edges","Use panel grips rather than gripping frame edges","File down any burrs on mounting rails"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Tools or materials falling from height","who_at_risk":"Ground workers, public","likelihood":2,"severity":4,"risk_rating":8,"controls":["Use tool lanyards for all hand tools","Store materials securely on roof","Establish exclusion zone below work area","Use toolbags and buckets for small items","Ensure public cannot access danger zone","Brief all workers on drop hazard"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4}
      ]
    },
    {
      "type": "ppe_grid",
      "title": "Personal Protective Equipment Requirements",
      "items": [
        {"item":"Safety footwear (slip-resistant)","standard":"EN ISO 20345"},
        {"item":"Hard hat","standard":"EN 397"},
        {"item":"Safety glasses/goggles","standard":"EN 166"},
        {"item":"Full-body harness with shock absorber","standard":"EN 361, EN 355"},
        {"item":"Cut-resistant gloves","standard":"EN 388"},
        {"item":"High-visibility clothing","standard":"EN ISO 20471"},
        {"item":"Sun protection (hat, sunscreen SPF 30+)","standard":"N/A"}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "In the event of fall from height, do not move casualty and call 999 immediately",
        "For electric shock, isolate DC and AC supplies before approaching casualty",
        "Implement height rescue plan if worker is suspended in harness",
        "Evacuate roof immediately if weather conditions deteriorate suddenly",
        "Report all accidents and near-misses to site supervisor",
        "Ensure first aider is on site and first aid kit is accessible from roof level"
      ]
    },
    {
      "type": "key_value",
      "title": "Competence and Training",
      "pairs": [
        {"key":"Minimum qualification","value":"MCS accredited solar PV installer or equivalent, 18th Edition"},
        {"key":"Working at height training","value":"Valid PASMA or IPAF certification, harness training"},
        {"key":"DC systems competence","value":"Trained in safe isolation and testing of DC photovoltaic systems"},
        {"key":"Roof work experience","value":"Demonstrated competence in safe roof access and working practices"}
      ]
    },
    {
      "type": "signature_block",
      "title": "Approval and Review",
      "entries": [
        {"role":"Assessed by","name":"","date":"","signature":""},
        {"role":"Reviewed by","name":"","date":"","signature":""},
        {"role":"Approved by","name":"","date":"","signature":""}
      ]
    },
    {
      "type": "bullet_list",
      "title": "References and Standards",
      "items": [
        "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
        "BS EN 62446 Photovoltaic (PV) systems - Requirements for testing, documentation and maintenance",
        "Work at Height Regulations 2005",
        "MCS 012 Installer Standard for Solar Photovoltaic Systems"
      ]
    }
  ]
}'::jsonb WHERE name = 'Solar PV Installation';

-- 6. EV Charger Installation
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "risk_assessment",
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"assessor_name","label":"Assessor Name","type":"text","required":true,"placeholder":"Full name of assessor"},
    {"key":"review_date","label":"Review Date","type":"date","required":false}
  ],
  "sections": [
    {
      "type": "hazard_table",
      "title": "Hazard Identification and Risk Assessment",
      "columns": ["hazard","who_at_risk","likelihood","severity","risk_rating","controls","residual_likelihood","residual_severity","residual_risk"],
      "rows": [
        {"hazard":"Electric shock during connection to supply","who_at_risk":"Electrician, building occupants","likelihood":3,"severity":5,"risk_rating":15,"controls":["Isolate main supply and lock off before connection work","Use approved voltage indicators to verify isolation","Wear insulated gloves rated for supply voltage","Follow permit to work procedure","Ensure competent person conducts final connection","Test RCD operation before energising"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Excavation for underground cable routes","who_at_risk":"Installation team, public","likelihood":2,"severity":4,"risk_rating":8,"controls":["Obtain service plans from utility companies","Use CAT and Genny to locate underground services","Hand-dig trial holes to confirm service locations","Shore trenches over 1.2m deep","Barrier off excavations and use warning signs","Implement traffic management if working near roads"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Drilling into external walls - hidden services","who_at_risk":"Installer, building occupants","likelihood":2,"severity":5,"risk_rating":10,"controls":["Use cable detection equipment before drilling","Check building plans for concealed services","Drill pilot holes and inspect before enlarging","Use RCD protection on all power tools","Avoid drilling in known service routes (above sockets, switches)","Test for voltage in wall cavity before drilling"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Vehicle movement around installation area","who_at_risk":"All workers, drivers, public","likelihood":3,"severity":4,"risk_rating":12,"controls":["Establish exclusion zone with barriers and cones","Wear high-visibility clothing at all times","Use banksman for reversing vehicles","Ensure adequate lighting for evening work","Brief drivers on pedestrian routes","Separate vehicle and pedestrian routes where possible"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Weather exposure during external work","who_at_risk":"Installation team","likelihood":3,"severity":3,"risk_rating":9,"controls":["Monitor weather forecast daily","Cease work in heavy rain or high winds","Provide weatherproof clothing","Ensure shelter available for breaks","Implement lightning procedure (cease work, retreat to vehicle)","Maintain hydration in hot weather"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Underground service strikes (gas, water, electric)","who_at_risk":"All workers, public, building occupants","likelihood":2,"severity":5,"risk_rating":10,"controls":["Obtain service plans minimum 3 days before excavation","Use cable avoidance tools (CAT) on all excavations","Hand-dig within 500mm of known services","Mark identified services with paint or pins","Brief team on emergency procedures for service strikes","Have emergency contact numbers readily available"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Cable joint failures causing fire or shock","who_at_risk":"Building occupants, future users","likelihood":2,"severity":4,"risk_rating":8,"controls":["Use only approved cable jointing methods","Follow manufacturer instructions for joint kits","Ensure cables are dry before jointing","Apply appropriate IP rating for environment","Test insulation resistance of all joints","Conduct visual inspection before backfilling"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Back injury from trenching and backfilling","who_at_risk":"Installation team","likelihood":3,"severity":3,"risk_rating":9,"controls":["Use mechanical excavators where practicable","Rotate manual digging tasks between team","Maintain good lifting posture and technique","Take regular breaks during heavy work","Provide mechanical aids for heavy materials"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Eye injury from masonry drilling and dust","who_at_risk":"Installer","likelihood":3,"severity":3,"risk_rating":9,"controls":["Wear safety goggles or face shield when drilling","Use dust extraction on power tools where possible","Wear dust mask for prolonged drilling work","Clear dust from eyes with clean water if contaminated","Ensure goggles are impact-rated to EN 166"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Water ingress contact with live parts","who_at_risk":"Building occupants, electrician","likelihood":2,"severity":4,"risk_rating":8,"controls":["Install charger with appropriate IP rating (minimum IP54 outdoor)","Seal all cable entries with weatherproof glands","Install charger above flood risk level","Fit Type A RCD for additional protection","Test RCD function after installation","Inspect seals annually"],"residual_likelihood":1,"residual_severity":4,"residual_risk":4},
        {"hazard":"Manual handling of heavy charger unit","who_at_risk":"Installation team","likelihood":3,"severity":3,"risk_rating":9,"controls":["Use two-person lift for units over 15kg","Use mechanical lifting aids where available","Position mounting height to minimise lifting","Clear route before carrying charger","Maintain good posture during installation"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3},
        {"hazard":"Electrocution during supply connection","who_at_risk":"Electrician","likelihood":2,"severity":5,"risk_rating":10,"controls":["Only competent persons to make supply connections","Isolate supply at main switchboard","Use lockout/tagout procedures","Verify dead using approved voltage indicator","Wear insulated gloves and use insulated tools","Test installation before connection to supply"],"residual_likelihood":1,"residual_severity":5,"residual_risk":5},
        {"hazard":"Trip hazards from temporary cables","who_at_risk":"All workers, public, building occupants","likelihood":4,"severity":2,"risk_rating":8,"controls":["Route cables overhead or secure to walls where possible","Use cable protectors where cables cross walkways","Mark cables with hazard tape","Keep cables tidy and coiled when not in use","Remove temporary cables at end of each day"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Cuts from conduit threading and cutting","who_at_risk":"Installer","likelihood":3,"severity":2,"risk_rating":6,"controls":["Wear cut-resistant gloves when handling conduit","Use proper conduit cutters, not hacksaws where possible","Deburr all cut ends before handling","Keep hands behind cutting blade","Store cut conduit safely to prevent contact with sharp edges"],"residual_likelihood":1,"residual_severity":2,"residual_risk":2},
        {"hazard":"Burns from cable termination work","who_at_risk":"Electrician","likelihood":2,"severity":3,"risk_rating":6,"controls":["Allow cables to cool after cutting or stripping","Use heat-resistant gloves when using heat shrink","Keep fire extinguisher nearby when using heat gun","Ensure adequate ventilation when using flux or solder","Avoid touching terminals immediately after tightening"],"residual_likelihood":1,"residual_severity":3,"residual_risk":3}
      ]
    },
    {
      "type": "ppe_grid",
      "title": "Personal Protective Equipment Requirements",
      "items": [
        {"item":"Safety footwear","standard":"EN ISO 20345"},
        {"item":"Hard hat","standard":"EN 397"},
        {"item":"Safety glasses/goggles","standard":"EN 166"},
        {"item":"High-visibility vest or jacket","standard":"EN ISO 20471"},
        {"item":"Insulated gloves","standard":"EN 60903"},
        {"item":"Cut-resistant gloves","standard":"EN 388"},
        {"item":"Dust mask (drilling operations)","standard":"EN 149 FFP2"}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "In the event of electric shock, isolate supply immediately and do not touch casualty until safe",
        "If underground service is struck, evacuate area immediately and call emergency services",
        "For gas leak, cease all work, evacuate area, and call National Gas Emergency on 0800 111 999",
        "Administer first aid if trained and safe to do so",
        "Report all accidents to site supervisor and complete accident book entry",
        "Preserve scene for investigation if serious incident occurs"
      ]
    },
    {
      "type": "key_value",
      "title": "Competence and Training",
      "pairs": [
        {"key":"Minimum qualification","value":"18th Edition BS 7671, City & Guilds 2919 EV Charging or equivalent"},
        {"key":"Installation experience","value":"Demonstrated competence in outdoor electrical installations"},
        {"key":"Excavation safety","value":"Awareness of safe digging practices and service location"},
        {"key":"Manufacturer training","value":"Completed training for specific EV charger model being installed"}
      ]
    },
    {
      "type": "signature_block",
      "title": "Approval and Review",
      "entries": [
        {"role":"Assessed by","name":"","date":"","signature":""},
        {"role":"Reviewed by","name":"","date":"","signature":""},
        {"role":"Approved by","name":"","date":"","signature":""}
      ]
    },
    {
      "type": "bullet_list",
      "title": "References and Standards",
      "items": [
        "BS 7671:2018+A2:2022 Requirements for Electrical Installations",
        "IET Code of Practice for Electric Vehicle Charging Equipment Installation (4th Edition)",
        "New Roads and Street Works Act 1991"
      ]
    }
  ]
}'::jsonb WHERE name = 'EV Charger Installation';

-- 7. First Fix Electrical
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "method_statement",
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"prepared_by","label":"Prepared By","type":"text","required":true},
    {"key":"approved_by","label":"Approved By","type":"text","required":true}
  ],
  "sections": [
    {
      "type": "key_value",
      "title": "Project Details",
      "items": [
        {"key": "Project Name", "value": ""},
        {"key": "Client", "value": ""},
        {"key": "Contract Number", "value": ""},
        {"key": "Estimated Duration", "value": ""}
      ]
    },
    {
      "type": "text_block",
      "title": "Scope of Works",
      "content": "This method statement covers the installation of electrical first fix works including containment, back boxes, cable runs, and associated mechanical and fire protection works. All works shall be carried out in accordance with BS 7671:2018+A2:2022 and the project electrical specifications."
    },
    {
      "type": "steps",
      "title": "Work Procedure",
      "steps": [
        {"step_number": 1, "title": "Review architectural and electrical drawings", "description": "Attend pre-start meeting with site supervisor and other trades. Check drawing revisions are current and mark up site drawings with key dimensions. Identify any clashes or coordination requirements.", "safety_notes": "Ensure safe access to review locations before commencing marking out."},
        {"step_number": 2, "title": "Mark out positions", "description": "Use laser level and measuring equipment to mark positions of all electrical accessories. Sockets to be positioned at 450mm above finished floor level, switches at 1200mm AFL. Mark distribution board positions ensuring adequate access and clearances.", "safety_notes": "Ensure marking equipment is PAT tested and used in accordance with manufacturer instructions."},
        {"step_number": 3, "title": "Install containment runs", "description": "Install trunking, conduit, and cable tray systems using fixings appropriate to the substrate. Fix containment at maximum 1 metre centres horizontally and vertically. Ensure all joints are mechanically and electrically sound.", "safety_notes": "Use appropriate access equipment when working at height and ensure all fixings are suitable for load and substrate."},
        {"step_number": 4, "title": "Chase walls for concealed installations", "description": "Use CAT scanner to locate existing services before chasing. Chase depth must not exceed one-third of wall thickness. Use wall chaser with integrated dust extraction to minimise dust.", "safety_notes": "Wear appropriate RPE and eye protection when chasing and ensure adequate ventilation."},
        {"step_number": 5, "title": "Install back boxes", "description": "Fix back boxes at correct depth to suit finished surface levels. Fit grommets to all cable entry points to prevent cable damage. Ensure boxes are securely fixed and level.", "safety_notes": "Check behind plasterboard for services before drilling fixing holes."},
        {"step_number": 6, "title": "Install floor and ceiling penetrations", "description": "Drill joists within safe zones only, ensuring holes do not exceed 0.25 times the joist depth and are positioned in the neutral axis. Install protective grommets through all penetrations.", "safety_notes": "Confirm structural engineer approval for any penetrations exceeding safe zone limitations."},
        {"step_number": 7, "title": "Fire stopping at compartment penetrations", "description": "Install intumescent sleeves or collars at all fire compartment boundaries. Ensure fire stopping achieves minimum 60-minute rating to match compartment requirements. Maintain fire integrity of all penetrations.", "safety_notes": "Use fire stopping products appropriate to cable type and ensure correct installation depth."},
        {"step_number": 8, "title": "Draw in cables for lighting circuits", "description": "Install 1.5mm² twin and earth cable for lighting circuits. Fix cables at 250mm vertical intervals and 400mm horizontal intervals using appropriate clips. Maintain adequate separation from other services.", "safety_notes": "Avoid tight radius bends and ensure cables are not damaged during installation."},
        {"step_number": 9, "title": "Draw in cables for socket circuits", "description": "Install 2.5mm² twin and earth cable for socket circuits configured as ring finals or radials per design. Ensure correct routing and separation from other services. Maintain continuity of protective conductor.", "safety_notes": "Do not exceed maximum floor area or socket outlet numbers for ring final circuits."},
        {"step_number": 10, "title": "Label all cables at both ends", "description": "Apply permanent indelible labels to all cables at termination points indicating circuit designation and reference. Ensure labels correspond to electrical drawings and distribution board schedules.", "safety_notes": "Use labels suitable for installation environment and ensure clear legibility."},
        {"step_number": 11, "title": "Test continuity of circuit protective conductor", "description": "Use calibrated multifunction tester to verify continuity of all protective conductors. Record all readings on test sheets and compare against expected values for cable length and cross-sectional area.", "safety_notes": "Ensure all circuits are isolated before commencing testing."},
        {"step_number": 12, "title": "Photograph cable routes before covering", "description": "Take comprehensive photographs of all cable routes including measurements from fixed reference points such as walls, ceilings, and structural elements. Store photographs securely for as-built records.", "safety_notes": "Ensure adequate lighting for clear photographic records."},
        {"step_number": 13, "title": "Install temporary protection", "description": "Fit protective caps to all back boxes and cover exposed cables where necessary. Protect containment systems from damage by other trades using suitable covers or barriers.", "safety_notes": "Clearly mark protected areas and communicate with other trades to prevent damage."},
        {"step_number": 14, "title": "Test insulation resistance", "description": "Conduct insulation resistance testing at 500V DC between all live conductors and earth. Verify minimum reading of 1 megohm is achieved on all circuits. Record all results.", "safety_notes": "Ensure sensitive equipment is disconnected before insulation resistance testing."},
        {"step_number": 15, "title": "Prepare for plastering and following trades", "description": "Confirm all cables are adequately secured and will not be displaced during plastering operations. Brief plasterers on cable locations and protection requirements.", "safety_notes": "Ensure all containment and cables are adequately protected from plaster damage."},
        {"step_number": 16, "title": "Notify other trades of completion", "description": "Inform site supervisor and following trades that first fix electrical works are complete. Provide drawings and photographs showing cable routes and accessory positions.", "safety_notes": "Maintain communication with other trades to prevent damage to completed works."},
        {"step_number": 17, "title": "Update as-built drawings", "description": "Mark all deviations from original design on as-built drawings including any changes to cable routes, accessory positions, or containment runs. Submit marked drawings to supervisor.", "safety_notes": "Ensure accurate recording of all variations for compliance and future maintenance."},
        {"step_number": 18, "title": "Clean work area and remove waste", "description": "Remove all cable offcuts, packaging, and debris from work area. Use HEPA vacuum to collect dust from chasing operations. Segregate waste for recycling where possible.", "safety_notes": "Handle sharp cable ends and metal offcuts with care to prevent injury."},
        {"step_number": 19, "title": "Record deviations or non-conformances", "description": "Document any deviations from drawings, method statement, or specifications. Report non-conformances to supervisor immediately and agree resolution before proceeding.", "safety_notes": "Do not proceed with works that deviate from approved designs without authorisation."},
        {"step_number": 20, "title": "Handover to site supervisor and quality check", "description": "Conduct final quality inspection with site supervisor. Confirm all works meet specification and are ready for following trades. Obtain sign-off on completion records.", "safety_notes": "Ensure safe access is maintained to all installed works for inspection purposes."}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Plant and Equipment",
      "items": [
        "Laser level and tripod",
        "Wall chaser with dust extraction",
        "CAT scanner and signal generator",
        "Cordless drill and impact driver with appropriate bits",
        "Multifunction electrical tester (calibrated)",
        "Voltage indicator and proving unit (GS38 compliant)",
        "Cable pulling equipment and lubricant",
        "Conduit bending machine and stocks and dies",
        "Step ladders and tower scaffold",
        "HEPA vacuum cleaner"
      ]
    },
    {
      "type": "bullet_list",
      "title": "Materials",
      "items": [
        "PVC conduit, trunking, and cable tray (various sizes)",
        "1.5mm² and 2.5mm² twin and earth cable",
        "Back boxes (25mm and 35mm depth)",
        "Cable clips and fixings appropriate to substrate",
        "Grommets and bushes for cable protection",
        "Intumescent fire sleeves and collars",
        "Cable labels and permanent markers",
        "Junction boxes and connector blocks",
        "Protective caps for back boxes",
        "Fixing plugs and screws (various sizes)"
      ]
    },
    {
      "type": "ppe_grid",
      "title": "Personal Protective Equipment",
      "items": [
        {"item": "Safety footwear", "standard": "EN ISO 20345"},
        {"item": "Hard hat", "standard": "EN 397"},
        {"item": "High-visibility vest", "standard": "EN ISO 20471"},
        {"item": "Safety glasses", "standard": "EN 166"},
        {"item": "Dust mask FFP3", "standard": "EN 149"},
        {"item": "Cut-resistant gloves", "standard": "EN 388"},
        {"item": "Hearing protection", "standard": "EN 352"}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Waste Management",
      "items": [
        "Segregate cable offcuts for metal recycling",
        "Collect packaging materials for general waste or recycling",
        "Dispose of plasterboard and building waste in designated skips",
        "Remove dust and debris using HEPA vacuum to prevent airborne contamination",
        "Ensure all waste is removed from site daily",
        "Maintain clean and tidy work areas throughout installation"
      ]
    },
    {
      "type": "text_block",
      "title": "Emergency Procedures",
      "content": "<p><strong>Fire:</strong> Raise the alarm immediately, evacuate to assembly point, call 999, do not re-enter building.</p><p><strong>Injury:</strong> Provide first aid from trained first aider, call 999 for serious injuries, complete accident book entry, notify site supervisor immediately.</p><p><strong>Electrical incident:</strong> Isolate supply if safe to do so, do not touch casualty until supply is isolated, call 999, administer first aid only when safe.</p><p><strong>Emergency contacts:</strong> Site supervisor, first aider, and emergency services numbers to be displayed prominently on site notice board.</p>"
    },
    {
      "type": "signature_block",
      "title": "Approval",
      "signatures": [
        {"role": "Prepared by", "name": "", "date": "", "signature": ""},
        {"role": "Reviewed by", "name": "", "date": "", "signature": ""},
        {"role": "Approved by", "name": "", "date": "", "signature": ""}
      ]
    },
    {
      "type": "text_block",
      "title": "References",
      "content": "BS 7671:2018+A2:2022 Requirements for Electrical Installations<br>CDM Regulations 2015<br>Electricity at Work Regulations 1989<br>Project electrical specifications and drawings"
    }
  ]
}'::jsonb WHERE name = 'First Fix Electrical';

-- 8. Second Fix Electrical
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "method_statement",
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"prepared_by","label":"Prepared By","type":"text","required":true},
    {"key":"approved_by","label":"Approved By","type":"text","required":true}
  ],
  "sections": [
    {
      "type": "key_value",
      "title": "Project Details",
      "items": [
        {"key": "Project Name", "value": ""},
        {"key": "Client", "value": ""},
        {"key": "Contract Number", "value": ""},
        {"key": "Estimated Duration", "value": ""}
      ]
    },
    {
      "type": "text_block",
      "title": "Scope of Works",
      "content": "This method statement covers the installation and commissioning of electrical second fix works including termination of all accessories, luminaires, consumer units, and final testing and certification. All works shall be carried out in accordance with BS 7671:2018+A2:2022 and project specifications."
    },
    {
      "type": "steps",
      "title": "Work Procedure",
      "steps": [
        {"step_number": 1, "title": "Review first fix records and inspection notes", "description": "Obtain and review all first fix test results, photographs, and as-built drawings. Check for any recorded defects or non-conformances requiring rectification. Verify all circuits are ready for termination.", "safety_notes": "Confirm all circuits remain isolated before commencing second fix works."},
        {"step_number": 2, "title": "Isolate circuits at distribution board", "description": "Follow safe isolation procedure in accordance with GS38. Verify voltage indicator before and after testing. Secure isolation with lock-off devices and warning notices.", "safety_notes": "Only authorised and competent persons may carry out isolation procedures."},
        {"step_number": 3, "title": "Terminate socket outlets", "description": "Connect line, neutral, and earth conductors to socket outlets ensuring correct polarity. Torque tighten all terminals to manufacturer specifications. Check connections are mechanically and electrically sound.", "safety_notes": "Ensure adequate cable sheath length is retained within accessory and no bare conductors are visible."},
        {"step_number": 4, "title": "Terminate switches and dimmers", "description": "Wire switches and dimmer controls using loop-in or switch-drop configuration as per design. Ensure correct identification of switched live conductors with brown sleeving. Verify mechanical security of all connections.", "safety_notes": "Check dimmer switch ratings are suitable for connected load type and wattage."},
        {"step_number": 5, "title": "Terminate fused connection units and spurs", "description": "Terminate all fused connection units ensuring correct fuse rating is installed for connected load. Label FCUs with equipment served. Verify polarity and earth continuity.", "safety_notes": "Confirm fuse ratings do not exceed circuit protective device rating or cable current-carrying capacity."},
        {"step_number": 6, "title": "Fit luminaires and lighting accessories", "description": "Install all light fittings ensuring weight does not exceed fixing capability. Use appropriate fixings for substrate and fitting weight. Connect earth continuity to all class I fittings.", "safety_notes": "Check ceiling void for adequate support where luminaires exceed 5kg weight."},
        {"step_number": 7, "title": "Connect smoke and carbon monoxide detectors", "description": "Wire all smoke and CO detectors ensuring interconnection between units is functional. Test alarm function and interconnection using test button. Record serial numbers and installation locations.", "safety_notes": "Verify detector locations comply with Building Regulations and manufacturer recommendations."},
        {"step_number": 8, "title": "Wire consumer unit and distribution boards", "description": "Terminate all circuits in consumer unit maintaining correct circuit order and grouping. Ensure adequate cable bend radii are maintained. Dress cables neatly and secure with cable ties.", "safety_notes": "Verify RCD and RCBO devices are appropriate type for circuits and installation."},
        {"step_number": 9, "title": "Label circuits on distribution board schedule", "description": "Complete consumer unit schedule with clear circuit descriptions including location served and circuit type. Affix schedule securely inside consumer unit cover. Ensure labels are permanent and legible.", "safety_notes": "Verify schedule accuracy before energising circuits."},
        {"step_number": 10, "title": "Fit external items", "description": "Install external lighting, PIR sensors, and other external equipment using appropriate IP-rated fittings. Ensure cable entries are sealed against moisture ingress. Verify earthing arrangements.", "safety_notes": "Confirm external equipment has minimum IP rating of IP44 or higher as appropriate to location."},
        {"step_number": 11, "title": "Commission circuits progressively", "description": "Energise circuits individually verifying correct operation before proceeding to next circuit. Check for any signs of overheating, arcing, or abnormal operation. Monitor for tripping or fault conditions.", "safety_notes": "Do not energise multiple circuits simultaneously until individual testing is complete."},
        {"step_number": 12, "title": "Conduct initial verification testing", "description": "Perform continuity of protective conductors, insulation resistance, and polarity testing on all circuits. Record all results on electrical installation certificate schedules. Compare results against expected values.", "safety_notes": "Ensure all sensitive electronic equipment is disconnected before insulation resistance testing."},
        {"step_number": 13, "title": "RCD testing and verification", "description": "Test all RCDs and RCBOs for correct operation at rated residual current and within required disconnection times. Test at both half and full rated tripping current. Record all results.", "safety_notes": "Verify RCD trip times comply with BS 7671 requirements for circuit protection type."},
        {"step_number": 14, "title": "Functional testing of all installed equipment", "description": "Operate all switches, dimmers, timers, and control devices to verify correct function. Check PIR sensors, smoke detectors, and other automatic devices. Rectify any functional defects identified.", "safety_notes": "Ensure client or occupants are aware testing is in progress to avoid alarm."},
        {"step_number": 15, "title": "Rectify any defects found during testing", "description": "Address all defects, failed tests, or non-conformances identified during commissioning and testing. Re-test affected circuits after rectification. Document all remedial works undertaken.", "safety_notes": "Do not proceed to certification until all defects are resolved and test results are satisfactory."},
        {"step_number": 16, "title": "Issue electrical installation certificates", "description": "Complete Electrical Installation Certificate or Minor Works Certificate as appropriate in accordance with BS 7671. Provide all required schedules and test results. Ensure certificates are signed by competent person.", "safety_notes": "Verify all certification is accurate and complete before handover to client."},
        {"step_number": 17, "title": "Update drawings and clean up work areas", "description": "Mark any deviations on as-built drawings and submit final versions. Remove all waste materials, packaging, and debris. Clean all accessories and fittings removing finger marks and installation marks.", "safety_notes": "Dispose of all waste in accordance with site waste management procedures."},
        {"step_number": 18, "title": "Client walkthrough and handover", "description": "Conduct walkthrough with client demonstrating operation of all controls, explaining consumer unit layout, and providing user instructions. Hand over all certification, warranties, and operating manuals.", "safety_notes": "Provide clear instruction on isolation procedures and emergency contact details."}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Plant and Equipment",
      "items": [
        "Multifunction electrical tester (calibrated within 12 months)",
        "RCD tester (calibrated)",
        "Voltage indicator and proving unit (GS38 compliant)",
        "Torque screwdriver set with appropriate bits",
        "Insulated screwdrivers and hand tools",
        "Cable strippers and side cutters",
        "Step ladders and access equipment",
        "Label printer or permanent markers",
        "Digital camera for record photographs",
        "Lock-off kit and warning notices"
      ]
    },
    {
      "type": "bullet_list",
      "title": "Materials",
      "items": [
        "Socket outlets, switches, and dimmer controls",
        "Luminaires and light fittings (as specified)",
        "Faceplates and accessory covers",
        "Fuses for FCUs (various ratings)",
        "Consumer unit labels and circuit schedules",
        "Cable ties and fixings",
        "Sleeving for identification (brown, blue, green/yellow)",
        "Earth terminal blocks and connectors",
        "Smoke and CO detector batteries (if required)",
        "Silicone sealant for external penetrations"
      ]
    },
    {
      "type": "ppe_grid",
      "title": "Personal Protective Equipment",
      "items": [
        {"item": "Safety footwear", "standard": "EN ISO 20345"},
        {"item": "Hard hat", "standard": "EN 397"},
        {"item": "High-visibility vest", "standard": "EN ISO 20471"},
        {"item": "Safety glasses", "standard": "EN 166"},
        {"item": "Insulated gloves", "standard": "EN 60903"},
        {"item": "Arc-rated clothing (if working live)", "standard": "EN 61482"}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Waste Management",
      "items": [
        "Collect packaging materials from accessories and luminaires for recycling",
        "Segregate cable offcuts and metal waste for recycling",
        "Dispose of damaged or rejected components appropriately",
        "Remove all installation debris and clean work areas daily",
        "Vacuum dust and debris from consumer units before closing",
        "Ensure site is left clean and tidy on completion"
      ]
    },
    {
      "type": "text_block",
      "title": "Emergency Procedures",
      "content": "<p><strong>Fire:</strong> Raise alarm immediately, evacuate to assembly point, call 999, isolate electrical supply if safe to do so.</p><p><strong>Electric shock:</strong> Do not touch casualty until supply is confirmed isolated, call 999 immediately, administer CPR if trained and safe to do so.</p><p><strong>Injury:</strong> Summon trained first aider, call 999 for serious injuries, complete accident book, notify supervisor.</p><p><strong>Equipment failure:</strong> Isolate faulty equipment immediately, do not attempt repairs unless qualified, report to supervisor.</p><p><strong>Emergency contacts:</strong> Emergency services 999, site supervisor, appointed person responsible for electrical safety.</p>"
    },
    {
      "type": "signature_block",
      "title": "Approval",
      "signatures": [
        {"role": "Prepared by", "name": "", "date": "", "signature": ""},
        {"role": "Reviewed by", "name": "", "date": "", "signature": ""},
        {"role": "Approved by", "name": "", "date": "", "signature": ""}
      ]
    },
    {
      "type": "text_block",
      "title": "References",
      "content": "BS 7671:2018+A2:2022 Requirements for Electrical Installations<br>GS38 Electrical Test Equipment for Use by Electricians<br>Electricity at Work Regulations 1989<br>Project electrical specifications and drawings"
    }
  ]
}'::jsonb WHERE name = 'Second Fix Electrical';

-- 9. Safe Isolation Procedure
UPDATE safety_document_templates SET structured_content = '{
  "version": 1,
  "document_type": "method_statement",
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"prepared_by","label":"Prepared By","type":"text","required":true},
    {"key":"approved_by","label":"Approved By","type":"text","required":true}
  ],
  "sections": [
    {
      "type": "key_value",
      "title": "Project Details",
      "items": [
        {"key": "Project Name", "value": ""},
        {"key": "Client", "value": ""},
        {"key": "Contract Number", "value": ""},
        {"key": "Estimated Duration", "value": ""}
      ]
    },
    {
      "type": "text_block",
      "title": "Scope of Works",
      "content": "This procedure defines the safe isolation process to be followed before commencing work on electrical circuits or equipment. The procedure complies with the Electricity at Work Regulations 1989 and follows GS38 guidance for electrical test equipment. All persons carrying out isolation must be competent and authorised."
    },
    {
      "type": "steps",
      "title": "Safe Isolation Procedure",
      "steps": [
        {"step_number": 1, "title": "Identify the circuit or equipment to be worked on", "description": "Obtain accurate information from electrical drawings, distribution board schedules, and circuit labels. Verify the exact circuit reference and ensure complete understanding of the installation layout. Confirm with client or responsible person if any uncertainty exists.", "safety_notes": "Never assume circuit identification without verification from multiple sources."},
        {"step_number": 2, "title": "Consult installation drawings to identify means of isolation", "description": "Locate the appropriate isolation device from up-to-date electrical drawings and schematic diagrams. Identify whether isolation is via MCB, MCCB, isolator switch, or fuse carrier. Confirm physical location of isolation point.", "safety_notes": "Verify drawings are current issue and check for any as-built modifications."},
        {"step_number": 3, "title": "Notify all affected persons of planned isolation", "description": "Inform all personnel who may be affected by the isolation including building occupants, other contractors, and supervising staff. Agree isolation time and expected duration. Display warning notices at point of isolation.", "safety_notes": "Ensure critical systems are not inadvertently isolated without proper authorisation."},
        {"step_number": 4, "title": "Select appropriate isolation device", "description": "Identify the correct MCB, MCCB, isolator switch, or fuse carrier that controls the circuit to be worked on. Verify device rating and confirm it is suitable for complete isolation. Check device is accessible and operable.", "safety_notes": "Ensure isolation device provides secure off position and adequate isolation gap."},
        {"step_number": 5, "title": "Verify voltage indicator against known source or proving unit", "description": "Test voltage indicator on known live source or proprietary proving unit before use. Confirm indicator gives clear and unambiguous indication of voltage presence. Record proving unit battery condition and functionality.", "safety_notes": "Voltage indicators must comply with GS38 and be within calibration date."},
        {"step_number": 6, "title": "Record proving unit reading", "description": "Document that proving unit or known source has provided a positive indication of voltage. Record proving unit serial number, battery condition, and test result. This confirms test equipment is functioning correctly before use.", "safety_notes": "Do not proceed if voltage indicator fails to give clear indication on proving unit."},
        {"step_number": 7, "title": "Switch off the circuit at the local isolator", "description": "If a local isolation point exists, switch off the circuit at point of use. This may include FCU, local isolator switch, or equipment isolation device. Verify switch is in off position.", "safety_notes": "Local switching alone is not sufficient for safe isolation and must be followed by supply isolation."},
        {"step_number": 8, "title": "Isolate at the distribution board", "description": "Switch off the MCB or MCCB, or withdraw the fuse carrier from the distribution board. Ensure isolation device is in the fully off position. For fuse carriers, remove fuse from carrier and retain.", "safety_notes": "Verify correct circuit is being isolated by checking circuit labels and schedules."},
        {"step_number": 9, "title": "Fit lock-off device with unique padlock", "description": "Apply lock-off device to MCB, MCCB, or isolator to prevent inadvertent re-energisation. Secure with unique padlock and retain key on person of individual carrying out work. Ensure lock-off is mechanically secure.", "safety_notes": "Only the person who applied the lock-off may remove it upon completion of work."},
        {"step_number": 10, "title": "Attach warning notice at point of isolation", "description": "Affix clearly visible warning notice stating 'Danger - Do Not Switch On - Electrician at Work' or similar. Include name of person working, time of isolation, and contact details. Ensure notice is secure and legible.", "safety_notes": "Warning notices must remain in place for entire duration of work."},
        {"step_number": 11, "title": "Test between all live conductors and earth", "description": "Using verified voltage indicator, test between line and neutral, line and earth, and neutral and earth at point of work. Conduct tests on all poles of supply. Confirm zero voltage reading on all tests.", "safety_notes": "Test at point of work, not just at distribution board, to confirm isolation is effective."},
        {"step_number": 12, "title": "Confirm dead using voltage indicator", "description": "Verify voltage indicator gives zero indication between all combinations of live conductors and earth. Ensure test is conducted at the exact point where work will be undertaken. Do not rely on local switching alone.", "safety_notes": "Assume circuit is live until proven dead with properly functioning test equipment."},
        {"step_number": 13, "title": "Re-verify voltage indicator against proving unit", "description": "Immediately after confirming dead, re-test voltage indicator against proving unit or known live source. Confirm indicator still gives positive indication of voltage. This verifies test equipment has not failed during dead testing.", "safety_notes": "If indicator fails to respond to proving unit, do not proceed as previous dead test is invalid."},
        {"step_number": 14, "title": "Begin work on confirmed dead circuit", "description": "Only after completing all previous steps and confirming circuit is dead and secured against re-energisation may work commence. Maintain lock-off and warning notices throughout work. Treat circuit as live if any doubt exists.", "safety_notes": "Regularly verify isolation remains in place during extended work periods."},
        {"step_number": 15, "title": "Re-energisation procedure", "description": "Remove all tools, equipment, and materials from work area. Replace all covers, enclosures, and barriers. Remove warning notices and lock-off devices only when authorised. Re-energise circuit and verify correct operation. Record completion time and confirm with affected persons.", "safety_notes": "Verify no persons are at risk before re-energising and ensure all safety measures are restored."}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Plant and Equipment",
      "items": [
        "Voltage indicator (GS38 compliant, fused leads, shrouded probes)",
        "Proving unit or known voltage source for verification",
        "Lock-off devices suitable for MCBs, MCCBs, and isolators",
        "Unique padlocks with single key",
        "Warning notices and tags",
        "Insulated hand tools",
        "Electrical drawings and circuit schedules",
        "Personal issue test equipment"
      ]
    },
    {
      "type": "bullet_list",
      "title": "Materials",
      "items": [
        "Warning notice labels and tags",
        "Lock-off devices (MCB, MCCB, isolator types)",
        "Padlocks and keys",
        "Permit to work documentation",
        "Isolation record sheets",
        "Circuit identification labels",
        "Barrier tape if required",
        "Personal protective equipment as required"
      ]
    },
    {
      "type": "ppe_grid",
      "title": "Personal Protective Equipment",
      "items": [
        {"item": "Safety footwear", "standard": "EN ISO 20345"},
        {"item": "Insulated gloves (for live testing)", "standard": "EN 60903"},
        {"item": "Safety glasses", "standard": "EN 166"},
        {"item": "Arc-rated clothing (if live testing required)", "standard": "EN 61482"},
        {"item": "Hard hat (construction sites)", "standard": "EN 397"}
      ]
    },
    {
      "type": "bullet_list",
      "title": "Waste Management",
      "items": [
        "Dispose of damaged voltage indicators or proving units in accordance with WEEE regulations",
        "Recycle damaged lock-off devices where possible",
        "Remove and dispose of temporary warning notices after re-energisation",
        "Maintain records and permits in accordance with document retention policy",
        "Ensure no tools or materials are left in electrical enclosures",
        "Remove all temporary barriers and keep work area clean"
      ]
    },
    {
      "type": "text_block",
      "title": "Emergency Procedures",
      "content": "<p><strong>Electric shock:</strong> Do not touch the casualty until supply is confirmed isolated. Call 999 immediately. Isolate supply if safe to do so. Commence CPR if trained and casualty is not breathing.</p><p><strong>Inadvertent re-energisation:</strong> Immediately stop work, verify isolation is still in place, check lock-off devices are secure, investigate cause of incident.</p><p><strong>Test equipment failure:</strong> Stop work immediately if voltage indicator or proving unit fails. Do not proceed until replacement test equipment is verified functional. Treat all circuits as live.</p><p><strong>Uncertainty about isolation:</strong> If any doubt exists about effectiveness of isolation, stop work, re-verify isolation from beginning of procedure, seek assistance from senior authorised person.</p><p><strong>Emergency contacts:</strong> Site supervisor, authorised person responsible for electrical safety, emergency services 999.</p>"
    },
    {
      "type": "signature_block",
      "title": "Approval",
      "signatures": [
        {"role": "Prepared by", "name": "", "date": "", "signature": ""},
        {"role": "Reviewed by", "name": "", "date": "", "signature": ""},
        {"role": "Approved by", "name": "", "date": "", "signature": ""}
      ]
    },
    {
      "type": "text_block",
      "title": "References",
      "content": "GS38 Electrical Test Equipment for Use by Electricians (HSE)<br>Electricity at Work Regulations 1989<br>BS 7671:2018+A2:2022 Requirements for Electrical Installations<br>Company electrical safety policy and procedures"
    }
  ]
}'::jsonb WHERE name = 'Safe Isolation Procedure';

-- 10. Safe Isolation (GS38)
UPDATE safety_document_templates SET structured_content = '{
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"responsible_person","label":"Responsible Person","type":"text","required":true}
  ],
  "sections": [
    {
      "id": "purpose",
      "type": "text_block",
      "title": "Purpose",
      "content": "<p>This safe system of work defines the mandatory procedure for safe electrical isolation in accordance with GS38 (Electrical Test Equipment for Use by Electricians). The purpose is to ensure that electrical circuits and equipment are made safe before any work commences, protecting personnel from electric shock, arc flash, and inadvertent re-energisation.</p>"
    },
    {
      "id": "requirements",
      "type": "bullet_list",
      "title": "Required Equipment",
      "items": [
        "GS38-compliant voltage indicator with shrouded probes (max 4mm exposed tip)",
        "Proving unit or known live source for indicator testing",
        "Lock-off devices suitable for isolation point (MCB locks, padlocks, hasps)",
        "Warning notices and danger tags",
        "Insulated tools appropriate for voltage level",
        "Isolation logbook or permit system"
      ]
    },
    {
      "id": "procedure",
      "type": "steps",
      "title": "Isolation Procedure",
      "steps": [
        {
          "step_number": 1,
          "title": "Identify the circuit",
          "description": "Confirm the exact circuit or equipment to be isolated through visual inspection, circuit schedules, and discussion with client or responsible person. Verify the circuit designation and rating.",
          "safety_notes": "Never assume circuit identification is correct. Always verify with multiple sources."
        },
        {
          "step_number": 2,
          "title": "Check drawings and diagrams",
          "description": "Review electrical drawings, single-line diagrams, and distribution board schedules to identify all sources of supply. Check for alternative feeds, backup generators, and parallel supplies.",
          "safety_notes": "Outdated drawings can be lethal. Confirm any changes with site personnel."
        },
        {
          "step_number": 3,
          "title": "Select isolation point",
          "description": "Choose the appropriate isolation point that provides a visible break in all live conductors. Ensure the isolation device is suitable and accessible (e.g. main switch, circuit breaker, isolator).",
          "safety_notes": "The isolation point must break ALL live conductors including neutral where applicable."
        },
        {
          "step_number": 4,
          "title": "Prove voltage indicator against proving unit",
          "description": "Before approaching the electrical installation, test the voltage indicator against a proving unit or known live source. Confirm audible and visual indications are functioning correctly.",
          "safety_notes": "A faulty voltage indicator that fails to detect live voltage can be fatal. This step is non-negotiable."
        },
        {
          "step_number": 5,
          "title": "Switch off equipment",
          "description": "Where possible, switch off equipment or loads in a controlled manner to avoid damage or hazardous conditions. Notify affected personnel before switching off.",
          "safety_notes": "Sudden loss of power can create hazards (e.g. lighting failure, machinery stopping mid-cycle)."
        },
        {
          "step_number": 6,
          "title": "Isolate the supply",
          "description": "Open the isolation device ensuring a visible break in all live conductors. Confirm the device is fully open and locked in the off position.",
          "safety_notes": "A partially open isolation device may still be live or may close unexpectedly."
        },
        {
          "step_number": 7,
          "title": "Apply lock-off and warning notices",
          "description": "Secure the isolation device with a lock-off device and attach danger tags stating 'DO NOT SWITCH ON - ELECTRICIAN AT WORK' with name and date. Record isolation in logbook.",
          "safety_notes": "Lock-off devices must be unique to the individual. Never share keys."
        },
        {
          "step_number": 8,
          "title": "Test dead on all conductors",
          "description": "Using the proven voltage indicator, test between all live conductors (L-N, L-E, N-E for single phase; L1-L2, L1-L3, L2-L3, L1-E, L2-E, L3-E, N-E for three phase). Confirm no voltage is detected.",
          "safety_notes": "Test at the point of work, not just at the isolation point. Induced voltages or alternative supplies may still be present."
        },
        {
          "step_number": 9,
          "title": "Re-prove voltage indicator",
          "description": "Immediately after testing dead, re-prove the voltage indicator against the proving unit or known live source to confirm it is still functioning correctly.",
          "safety_notes": "An indicator that fails during testing may have given a false 'dead' reading. Re-proving is mandatory."
        },
        {
          "step_number": 10,
          "title": "Begin work safely",
          "description": "Only after completing steps 1-9 may work commence. Maintain isolation throughout work. Before re-energisation, remove personnel and tools, re-test installation if required, remove lock-off (only by installer), and restore supply.",
          "safety_notes": "Never remove another person's lock-off device. Ensure all persons are clear before re-energisation."
        }
      ]
    },
    {
      "id": "emergency",
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "If voltage indicator fails during testing, stop work immediately and replace with a proven instrument before continuing.",
        "If unable to prove dead at point of work, do not proceed. Investigate alternative supplies and seek assistance from senior electrician or client's electrical representative.",
        "If lock-off device is found tampered with or removed, treat circuit as live. Re-test from step 4 before resuming work.",
        "If unexpected voltage is detected during work, isolate immediately, evacuate area, and investigate source before returning."
      ]
    },
    {
      "id": "review",
      "type": "key_value",
      "title": "Review Information",
      "pairs": [
        {"key":"Next Review Date","value":""},
        {"key":"Review Frequency","value":"Annually"},
        {"key":"Document Owner","value":""}
      ]
    },
    {
      "id": "signatures",
      "type": "signature_block",
      "title": "Authorisation",
      "signature_entries": [
        {"role":"Prepared by","name":"","date":""},
        {"role":"Reviewed by","name":"","date":""},
        {"role":"Authorised by","name":"","date":""}
      ]
    },
    {
      "id": "references",
      "type": "text_block",
      "title": "References",
      "content": "<p><strong>HSE Guidance Note GS38:</strong> Electrical Test Equipment for Use by Electricians<br><strong>Electricity at Work Regulations 1989:</strong> Regulation 4(3) (means of cutting off supply and isolation), Regulation 12 (means for cutting off supply and isolation), Regulation 13 (precautions for work on equipment made dead)</p>"
    }
  ]
}'::jsonb WHERE name = 'Safe Isolation (GS38)';

-- 11. Lock-Out/Tag-Out
UPDATE safety_document_templates SET structured_content = '{
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"responsible_person","label":"Responsible Person","type":"text","required":true}
  ],
  "sections": [
    {
      "id": "purpose",
      "type": "text_block",
      "title": "Purpose",
      "content": "<p>This procedure establishes the lock-out/tag-out (LOTO) system for controlling hazardous energy during maintenance, installation, or testing of electrical equipment. LOTO prevents accidental energisation, start-up, or release of stored energy that could cause injury or death. All energy sources (electrical, mechanical, hydraulic, pneumatic, thermal, chemical) must be isolated and locked out before work begins.</p>"
    },
    {
      "id": "requirements",
      "type": "bullet_list",
      "title": "Required Equipment",
      "items": [
        "Personal lock-out/tag-out kit with unique padlocks and danger tags",
        "Unique padlocks (one per person working on equipment) with single key held by installer",
        "Danger tags stating 'DO NOT OPERATE' with space for name, date, and reason",
        "Multi-lock hasp for group lock-out (when multiple persons working on same equipment)",
        "Isolation register or LOTO logbook for recording isolations",
        "Secure key cabinet for storing duplicate keys (emergency access only)"
      ]
    },
    {
      "id": "procedure",
      "type": "steps",
      "title": "Lock-Out/Tag-Out Procedure",
      "steps": [
        {
          "step_number": 1,
          "title": "Identify all energy sources",
          "description": "Conduct a thorough survey to identify all energy sources that could cause unexpected movement, start-up, or release of hazardous energy. Include electrical supplies, stored energy (capacitors, springs, compressed air), and secondary sources (backup generators, UPS).",
          "safety_notes": "Hidden energy sources (e.g. capacitors in VFDs, residual pressure in hydraulic systems) can remain hazardous long after isolation."
        },
        {
          "step_number": 2,
          "title": "Notify affected personnel",
          "description": "Inform all personnel who may be affected by the isolation, including operators, production staff, and other contractors. Explain the nature of work, expected duration, and any temporary loss of services.",
          "safety_notes": "Sudden isolation can create hazards (e.g. loss of ventilation in confined spaces, loss of lighting in occupied areas)."
        },
        {
          "step_number": 3,
          "title": "Prepare equipment for shutdown",
          "description": "Where applicable, shut down equipment in a controlled manner following manufacturer's procedures. Save work, close files, park moving parts in safe positions, and relieve pressure in systems.",
          "safety_notes": "Emergency stops should only be used in emergencies. Controlled shutdown prevents damage and secondary hazards."
        },
        {
          "step_number": 4,
          "title": "Shut down equipment normally",
          "description": "Use normal operating controls to shut down equipment. Do not use emergency stops unless there is an immediate hazard. Confirm equipment has come to a complete stop and all moving parts are stationary.",
          "safety_notes": "Coasting machinery can take time to stop. Allow sufficient time for all motion to cease."
        },
        {
          "step_number": 5,
          "title": "Isolate each energy source",
          "description": "Operate isolation devices to disconnect all energy sources. Ensure a visible break in electrical supplies. Close valves, bleed pressure, discharge capacitors, and block mechanical energy (springs, gravity).",
          "safety_notes": "Isolation devices must provide a visible break. Contactors and relays are NOT isolation devices."
        },
        {
          "step_number": 6,
          "title": "Apply personal padlocks",
          "description": "Each person working on the equipment must apply their own unique padlock to the isolation device. If multiple isolation points exist, lock out each one. Use multi-lock hasps where multiple persons are working on the same equipment.",
          "safety_notes": "NEVER work on equipment locked out by someone else's lock only. Always apply your own lock."
        },
        {
          "step_number": 7,
          "title": "Attach danger tags",
          "description": "Attach a danger tag to each locked isolation device stating 'DO NOT OPERATE', the name of person who applied the lock, the date, and reason for isolation. Use durable tags that will not detach or become illegible.",
          "safety_notes": "Tags are warnings, not physical barriers. They supplement locks but do not replace them."
        },
        {
          "step_number": 8,
          "title": "Record isolation in register",
          "description": "Enter details of the isolation into the LOTO logbook or isolation register. Record equipment isolated, isolation points locked, names of persons involved, date and time of isolation, and expected duration.",
          "safety_notes": "The register provides a complete record for handovers, shift changes, and emergency situations."
        },
        {
          "step_number": 9,
          "title": "Verify isolation and test dead",
          "description": "Attempt to operate equipment using normal controls to verify isolation is effective. Test electrical circuits dead using proven voltage indicator. Check for stored energy by attempting to move parts or checking pressure gauges.",
          "safety_notes": "Verification must be done at the point of work, not just at the isolation point. Always prove your voltage indicator before and after testing."
        },
        {
          "step_number": 10,
          "title": "Perform work safely",
          "description": "Only after completing steps 1-9 may work commence. Maintain isolation throughout work. If work extends across shifts or days, brief incoming personnel and ensure locks remain in place.",
          "safety_notes": "If you leave the job for any reason, even briefly, re-verify isolation before resuming work."
        },
        {
          "step_number": 11,
          "title": "Remove locks (only by installer)",
          "description": "When work is complete, each person must remove ONLY their own lock and tag. Check that all personnel, tools, and materials are clear of the equipment. Inspect the work area and ensure equipment is safe to re-energise.",
          "safety_notes": "NEVER remove another person's lock. If a worker is unavailable, use documented emergency lock removal procedure with management authorisation."
        },
        {
          "step_number": 12,
          "title": "Re-energise and verify operation",
          "description": "After all locks are removed, notify affected personnel that equipment will be re-energised. Restore energy sources in the correct sequence. Test equipment operation and monitor for abnormalities during initial start-up.",
          "safety_notes": "Stand clear during re-energisation. Be prepared to isolate again if abnormal operation is observed."
        }
      ]
    },
    {
      "id": "emergency",
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "Emergency lock removal: If a worker is unavailable to remove their lock (illness, emergency departure), a documented emergency removal procedure must be followed with authorisation from two levels of management and confirmation that the worker is not at the equipment.",
        "Multi-person lock-out: When multiple persons are working, use a multi-lock hasp. The last person to apply their lock is NOT responsible for the safety of others. Each person is individually responsible for applying and removing their own lock.",
        "Shift handover: When work extends across shifts, the outgoing shift must brief incoming shift on isolation points and hazards. Locks must remain in place. Incoming shift may add their own locks but must not remove outgoing shift's locks until work is handed over.",
        "Partial re-energisation: If partial re-energisation is required for testing, treat it as a new isolation sequence. All personnel must be notified, locks removed from circuits being re-energised, and re-applied after testing."
      ]
    },
    {
      "id": "review",
      "type": "key_value",
      "title": "Review Information",
      "pairs": [
        {"key":"Next Review Date","value":""},
        {"key":"Review Frequency","value":"Annually"},
        {"key":"Document Owner","value":""}
      ]
    },
    {
      "id": "signatures",
      "type": "signature_block",
      "title": "Authorisation",
      "signature_entries": [
        {"role":"Prepared by","name":"","date":""},
        {"role":"Reviewed by","name":"","date":""},
        {"role":"Authorised by","name":"","date":""}
      ]
    },
    {
      "id": "references",
      "type": "text_block",
      "title": "References",
      "content": "<p><strong>Electricity at Work Regulations 1989:</strong> Regulation 12 (means for cutting off supply and isolation), Regulation 13 (precautions for work on equipment made dead)</p>"
    }
  ]
}'::jsonb WHERE name = 'Lock-Out/Tag-Out';

-- 12. Lone Working
UPDATE safety_document_templates SET structured_content = '{
  "fields": [
    {"key":"company_name","label":"Company Name","type":"text","required":true},
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"responsible_person","label":"Responsible Person","type":"text","required":true}
  ],
  "sections": [
    {
      "id": "purpose",
      "type": "text_block",
      "title": "Purpose",
      "content": "<p>This safe system of work establishes controls for lone working where an electrician works without direct supervision or the immediate availability of assistance. Lone working increases risk because there is no one to provide help in an emergency, monitor unsafe practices, or raise the alarm. This procedure defines when lone working is acceptable, what precautions must be in place, and what work activities are prohibited when working alone.</p>"
    },
    {
      "id": "requirements",
      "type": "bullet_list",
      "title": "Required Equipment and Arrangements",
      "items": [
        "Mobile phone (fully charged) with emergency contact numbers programmed",
        "Buddy system contact (office-based person or fellow tradesperson) with agreed check-in times",
        "Regular check-in schedule (minimum every 2 hours) with buddy or office",
        "First aid kit appropriate for electrical injuries (burns, shock)",
        "Emergency contact card (carried on person) with ICE details and medical information",
        "Personal alarm or man-down device (where available and appropriate to risk level)",
        "Torch or headlamp (in case of power failure or working in low light areas)"
      ]
    },
    {
      "id": "procedure",
      "type": "steps",
      "title": "Lone Working Procedure",
      "steps": [
        {
          "step_number": 1,
          "title": "Assess suitability for lone working",
          "description": "Before working alone, assess whether the task is suitable. Low-risk tasks (e.g. socket replacement on isolated circuit, cable pulling, lighting installation after isolation) may be suitable. High-risk tasks (e.g. live working, confined spaces, work at height above 2 metres, work in remote or hazardous locations) are NOT suitable for lone working.",
          "safety_notes": "If in doubt, do not work alone. The additional cost of a second person is negligible compared to the consequences of a serious incident."
        },
        {
          "step_number": 2,
          "title": "Notify buddy or office of location and expected duration",
          "description": "Before starting work, contact your buddy or office to confirm your location (full site address, specific area within building), the nature of work, and expected finish time. Provide contact details for site supervisor or keyholder if available.",
          "safety_notes": "Be specific with locations. 'Working at Smith's office' is not enough. State 'Working in basement plant room, Smith & Co, 14 High Street, Manchester M1 2AB'."
        },
        {
          "step_number": 3,
          "title": "Confirm mobile signal and emergency access",
          "description": "On arrival, check mobile phone signal strength. Identify the nearest emergency exit and assembly point. Confirm you are not locked in (can you exit without assistance?). Note location of nearest first aider, AED (if available), and confirm site address for emergency services.",
          "safety_notes": "If there is no mobile signal, lone working is not permitted unless alternative communication (e.g. site radio, landline) is available and tested."
        },
        {
          "step_number": 4,
          "title": "Check in on arrival",
          "description": "Immediately on arrival, send a check-in message or call to your buddy/office confirming safe arrival, mobile signal confirmed, and work commencing. Set a timer or alarm for your next check-in (maximum 2 hours).",
          "safety_notes": "Do not assume your buddy knows you have arrived. Explicit check-in is mandatory."
        },
        {
          "step_number": 5,
          "title": "Conduct periodic check-ins every 2 hours",
          "description": "Contact your buddy or office at least every 2 hours during work. Confirm you are safe, describe progress, and confirm expected finish time. If work is ahead or behind schedule, update your expected finish time.",
          "safety_notes": "Set alarms on your phone. It is easy to lose track of time when focused on work."
        },
        {
          "step_number": 6,
          "title": "No live working when alone",
          "description": "Live working (work on or near exposed live conductors) is strictly prohibited when working alone. All circuits must be isolated, locked off, and tested dead before any work commences. If live testing is essential (e.g. fault-finding), arrange for a second person to attend.",
          "safety_notes": "Electric shock when alone is likely to be fatal. There is no circumstance that justifies live working when alone."
        },
        {
          "step_number": 7,
          "title": "Check out on completion",
          "description": "On completing work, conduct a final check-in with your buddy or office confirming work complete, leaving site, and expected arrival at next location or return to base. If you are the last person on site, confirm secure exit (doors locked, alarms set if applicable).",
          "safety_notes": "Do not delay check-out. Your buddy is waiting to confirm you are safe."
        },
        {
          "step_number": 8,
          "title": "Report any incidents or near misses",
          "description": "If any incident, near miss, or concern arises during lone working (e.g. unexpected hazard, feeling unwell, security concern, aggressive behaviour), report it immediately to your buddy or office. Do not wait until end of shift. If necessary, stop work and leave site.",
          "safety_notes": "Feeling pressured to continue when unsafe is a sign to stop. Your employer has a duty to protect you, not the client's schedule."
        }
      ]
    },
    {
      "id": "emergency",
      "type": "bullet_list",
      "title": "Emergency Procedures",
      "items": [
        "Missed check-in procedure: If a lone worker fails to check in within 15 minutes of agreed time, buddy or office must attempt to call. If no answer, send text and email. If still no response after 15 minutes, dispatch a colleague to the site. If colleague cannot make contact or gain access, call emergency services and provide last known location.",
        "Medical emergency: If lone worker suffers injury or feels unwell, call 999 immediately. If conscious and mobile, exit to a safe location. If unconscious or unable to move, stay on the line with emergency services. Do not attempt to continue working. Contact buddy or office to inform them emergency services have been called.",
        "Personal safety threat: If approached by aggressive individuals, threatened, or feel unsafe, leave site immediately. Do not confront. Call 999 if immediate threat. Report all incidents to employer regardless of severity.",
        "Stranded or locked in: If locked in or unable to exit, contact site supervisor or keyholder immediately. If unavailable, contact buddy or office. If no resolution within 30 minutes, call 999 (non-emergency 101) to request assistance."
      ]
    },
    {
      "id": "review",
      "type": "key_value",
      "title": "Review Information",
      "pairs": [
        {"key":"Next Review Date","value":""},
        {"key":"Review Frequency","value":"Annually"},
        {"key":"Document Owner","value":""}
      ]
    },
    {
      "id": "signatures",
      "type": "signature_block",
      "title": "Authorisation",
      "signature_entries": [
        {"role":"Prepared by","name":"","date":""},
        {"role":"Reviewed by","name":"","date":""},
        {"role":"Authorised by","name":"","date":""}
      ]
    },
    {
      "id": "references",
      "type": "text_block",
      "title": "References",
      "content": "<p><strong>Health and Safety at Work etc. Act 1974:</strong> Section 2 (general duties of employers to their employees)<br><strong>Management of Health and Safety at Work Regulations 1999:</strong> Regulation 3 (risk assessment)</p>"
    }
  ]
}'::jsonb WHERE name = 'Lone Working';

-- 13. Pre-Start Site Safety Checklist
UPDATE safety_document_templates SET structured_content = '{
  "fields": [
    {"key":"site_address","label":"Site Address","type":"text","required":true},
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"checked_by","label":"Checked By","type":"text","required":true}
  ],
  "sections": [
    {
      "id": "checklist",
      "type": "checklist",
      "title": "Pre-Start Checks",
      "items": [
        {"id":"prestart_01","text":"Site induction completed","checked":false},
        {"id":"prestart_02","text":"RAMS (risk assessments and method statements) reviewed and signed","checked":false},
        {"id":"prestart_03","text":"PPE appropriate for task and in good condition","checked":false},
        {"id":"prestart_04","text":"Work area inspected for hazards (overhead cables, underground services, fragile surfaces, sharp objects, biological hazards)","checked":false},
        {"id":"prestart_05","text":"Emergency exits and assembly points identified and route confirmed clear","checked":false},
        {"id":"prestart_06","text":"First aid facilities located (first aider contact details, first aid kit location, AED location if available)","checked":false},
        {"id":"prestart_07","text":"Welfare facilities available and accessible (toilet, drinking water, rest area, washing facilities)","checked":false},
        {"id":"prestart_08","text":"Permits to work obtained if required (hot work permit, confined space permit, isolation permit, work at height permit)","checked":false},
        {"id":"prestart_09","text":"Tools and equipment pre-use checked (visual inspection, PAT test labels, calibration dates, GS38 compliance)","checked":false},
        {"id":"prestart_10","text":"Service detection completed using CAT and Genny (cable avoidance tool) and drawings consulted","checked":false},
        {"id":"prestart_11","text":"Access equipment inspected (ladder tag in date, scaffold tag and weekly inspection record, MEWP pre-use checks)","checked":false},
        {"id":"prestart_12","text":"Fire extinguisher locations noted and type appropriate for electrical fires (CO2 or dry powder)","checked":false},
        {"id":"prestart_13","text":"Nearest A&E hospital identified, postcode known, and directions confirmed (especially for remote sites)","checked":false},
        {"id":"prestart_14","text":"Weather conditions assessed and acceptable (no work at height in high wind, no excavation in heavy rain, no outdoor live work in wet conditions)","checked":false},
        {"id":"prestart_15","text":"Communication established with site supervisor or principal contractor (contact number saved, check-in times agreed)","checked":false}
      ]
    },
    {
      "id": "actions",
      "type": "text_block",
      "title": "Actions Required",
      "content": "<p></p>"
    },
    {
      "id": "signatures",
      "type": "signature_block",
      "title": "Sign-Off",
      "signature_entries": [
        {"role":"Checked by","name":"","date":""},
        {"role":"Supervisor","name":"","date":""}
      ]
    },
    {
      "id": "references",
      "type": "text_block",
      "title": "References",
      "content": "<p><strong>Construction (Design and Management) Regulations 2015:</strong> Schedule 2 (welfare facilities), Regulation 13 (information and training)</p>"
    }
  ]
}'::jsonb WHERE name = 'Pre-Start Site Safety Checklist';

-- 14. Daily Tool Check
UPDATE safety_document_templates SET structured_content = '{
  "fields": [
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"checked_by","label":"Checked By","type":"text","required":true}
  ],
  "sections": [
    {
      "id": "checklist",
      "type": "checklist",
      "title": "Daily Tool Checks",
      "items": [
        {"id":"tool_01","text":"Power tool casings undamaged and free from cracks, splits, or impact damage","checked":false},
        {"id":"tool_02","text":"Cables and flexes in good condition with no cuts, abrasion, crushing, or damage to outer sheath","checked":false},
        {"id":"tool_03","text":"Plug pins not bent or loose, plug body intact (no cracks), moulded plug with no signs of overheating or damage","checked":false},
        {"id":"tool_04","text":"PAT test label present and within date (Class I tools tested annually, Class II tools tested every 2 years, site equipment tested every 3 months)","checked":false},
        {"id":"tool_05","text":"Guards and safety features operational (blade guards return freely, emergency stops function, trigger locks operate correctly)","checked":false},
        {"id":"tool_06","text":"Chuck, blade, or bit secure and appropriate for the task (correct size, sharp, undamaged, rated for material being worked)","checked":false},
        {"id":"tool_07","text":"Ventilation adequate if tool used in confined space (dust extraction connected and functioning, LEV examination in date)","checked":false},
        {"id":"tool_08","text":"Test instruments within calibration date (multifunction testers annually, clamp meters every 2 years, calibration sticker present and legible)","checked":false},
        {"id":"tool_09","text":"Test leads GS38 compliant (shrouded probes with maximum 4mm exposed tip, fused leads where required, insulation intact, no repairs with tape)","checked":false},
        {"id":"tool_10","text":"Battery tools adequately charged for planned work (spare battery available if full day's work, charger present on site)","checked":false},
        {"id":"tool_11","text":"Extension leads in good condition with RCD protection (30mA RCD tested using test button, plug and socket ends undamaged, cable not coiled when in use to prevent overheating)","checked":false},
        {"id":"tool_12","text":"Carrying cases and tool bags intact and clean (no sharp edges that could damage cables, dry and free from debris, zips and catches functional)","checked":false}
      ]
    },
    {
      "id": "actions",
      "type": "text_block",
      "title": "Actions Required",
      "content": "<p></p>"
    },
    {
      "id": "signatures",
      "type": "signature_block",
      "title": "Sign-Off",
      "signature_entries": [
        {"role":"Checked by","name":"","date":""},
        {"role":"Supervisor","name":"","date":""}
      ]
    },
    {
      "id": "references",
      "type": "text_block",
      "title": "References",
      "content": "<p><strong>Provision and Use of Work Equipment Regulations 1998 (PUWER):</strong> Regulation 5 (maintenance), Regulation 6 (inspection)</p>"
    }
  ]
}'::jsonb WHERE name = 'Daily Tool Check';

-- 15. PPE Condition Check
UPDATE safety_document_templates SET structured_content = '{
  "fields": [
    {"key":"date","label":"Date","type":"date","required":true,"default_value":"today"},
    {"key":"checked_by","label":"Checked By","type":"text","required":true}
  ],
  "sections": [
    {
      "id": "checklist",
      "type": "checklist",
      "title": "PPE Condition Checks",
      "items": [
        {"id":"ppe_01","text":"Safety boots — soles intact with good tread depth, steel toe cap undamaged (no dents or exposed metal), ankle support firm, laces or fastenings secure","checked":false},
        {"id":"ppe_02","text":"Hard hat — shell free from cracks, dents, or impact damage, headband and chin strap intact and adjustable, within 5-year expiry from date of manufacture (check internal date stamp)","checked":false},
        {"id":"ppe_03","text":"Safety glasses or goggles — lenses clean and free from scratches or cracks, frames undamaged, side shields present and secure, anti-fog coating effective","checked":false},
        {"id":"ppe_04","text":"Insulated gloves — no tears, punctures, or cuts in rubber, clean and dry, within 6-month electrical test date (Class 00 for 500V, Class 0 for 1000V), finger dexterity adequate for task","checked":false},
        {"id":"ppe_05","text":"Hi-vis vest or jacket — clean and free from excessive dirt or contamination, reflective strips intact and visible (not peeling or faded), fluorescent fabric still bright (replace when washed out), correct size and fits over other clothing","checked":false},
        {"id":"ppe_06","text":"Hearing protection — ear defenders: foam pads intact and soft, headband provides firm but comfortable seal; ear plugs: clean, soft, and expand fully after compression, stored in case when not in use","checked":false},
        {"id":"ppe_07","text":"Knee pads — padding intact (not compressed or hardened), straps secure and adjustable, no sharp edges or protruding parts, clean and dry","checked":false},
        {"id":"ppe_08","text":"Arc-rated overalls or arc flash suit (if required for task) — no burns, holes, or contamination, fastenings (zips, Velcro, press-studs) secure and functional, arc rating label present and legible (minimum ATPV/EBT rating appropriate to fault level)","checked":false},
        {"id":"ppe_09","text":"Face shield — lens clear and free from cracks or scratches, bracket and headband secure and adjustable, arc-rated if used for electrical work (check rating label)","checked":false},
        {"id":"ppe_10","text":"Safety harness (for work at height) — webbing undamaged (no cuts, fraying, burns, or chemical contamination), stitching intact, buckles and D-rings functional, within annual competent person inspection date (check tag)","checked":false},
        {"id":"ppe_11","text":"Dust masks or FFP3 respirators — within expiry date (check packaging or mask printing), seal intact, straps elastic and secure, valve (if fitted) opens and closes freely, stored in sealed bag when not in use","checked":false},
        {"id":"ppe_12","text":"First aid kit — fully stocked (minimum: sterile dressings, bandages, eye wash, burn gel, scissors, disposable gloves), all items within expiry date, portable and accessible, contents list present","checked":false}
      ]
    },
    {
      "id": "actions",
      "type": "text_block",
      "title": "Actions Required",
      "content": "<p></p>"
    },
    {
      "id": "signatures",
      "type": "signature_block",
      "title": "Sign-Off",
      "signature_entries": [
        {"role":"Checked by","name":"","date":""},
        {"role":"Supervisor","name":"","date":""}
      ]
    },
    {
      "id": "references",
      "type": "text_block",
      "title": "References",
      "content": "<p><strong>Personal Protective Equipment at Work Regulations 1992 (as amended 2002):</strong> Regulation 4 (suitability of PPE), Regulation 7 (maintenance and replacement)</p>"
    }
  ]
}'::jsonb WHERE name = 'PPE Condition Check';

