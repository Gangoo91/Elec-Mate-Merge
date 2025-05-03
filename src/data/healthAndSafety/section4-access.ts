
import { SectionData } from './types';

export const accessEquipmentSection: SectionData = {
  sectionNumber: "4",
  title: "Access Equipment Safety",
  content: {
    sectionNumber: "4",
    title: "Safety Requirements for Access Equipment",
    description: "Understanding the correct use and safety considerations for ladders, scaffolding, and other access tools used in electrical work.",
    icon: "hardhat",
    isMainSection: true,
    subsections: [
      {
        id: "4.1",
        title: "Ladder Safety and Inspection",
        content: "Ladders are among the most commonly used pieces of access equipment in electrical work, but they're also involved in many serious accidents when used improperly. Pre-use inspection is critical and should cover several key areas: stiles should be checked for cracks, bends, or splits; rungs must be firmly attached with no signs of wear or damage; feet should have secure, undamaged non-slip pads; locking mechanisms on extension ladders must function correctly; and any moving parts should operate smoothly. Positioning is equally important: ladders should be set at a 75° angle (1:4 ratio—one unit out for every four units up), on firm, level ground, and secured whenever possible by tying at top, middle, or bottom. If securing isn't possible, a second person should foot the ladder. The top of the ladder should extend at least 1 meter above the landing point to provide a handhold for users stepping off. Load ratings must be respected, with industrial-duty ladders (EN131 Professional) generally required for electrical work. The three points of contact rule is essential—maintaining two feet and one hand, or two hands and one foot, on the ladder at all times. This means tools should be carried in belts or pouches, not in hands while climbing. For electrical work specifically, fiberglass ladders are preferable to aluminum ones as they don't conduct electricity. Ladders should never be used in front of doors unless the door is locked or guarded, near live electrical equipment unless necessary safety measures are in place, or in high winds or adverse weather conditions.",
        keyPoints: [
          "Pre-use inspection procedures for ladders",
          "Proper positioning and securing techniques",
          "Maximum safe working heights and load ratings",
          "Three points of contact rule and safe climbing practices",
          "Specific considerations for electrical work, including ladder material"
        ]
      },
      {
        id: "4.2",
        title: "Scaffolding Requirements",
        content: "Scaffolding provides a more stable working platform than ladders but requires specific knowledge to use safely. Electrical workers should understand that scaffolding must be erected, modified, and dismantled only by trained and competent persons, never by unqualified workers. Before use, scaffolding must display a completed inspection tag confirming it has been checked by a competent person within the last seven days, after alteration, or following extreme weather. Tower scaffolds are commonly used for electrical installations and have specific safety requirements: the height should not exceed three times the smallest base dimension for outdoor use (3.5 times for indoor use); stabilizers or outriggers may be needed to achieve this ratio; and platforms should have full guardrails (top rail, mid-rail, and toe board) on all open sides. Access must be via internal ladders, never by climbing the frame. Working platforms must be fully boarded with no gaps and have adequate width for work activities (minimum 600mm). Load limitations must be strictly observed, with materials stored evenly to prevent instability. Tools and materials should be raised and lowered using a rope and bucket system, not carried up ladders. For electrical work near overhead lines, non-conductive scaffolding components may be required, and minimum separation distances must be maintained. Mobile tower scaffolds have additional requirements: wheels must be locked when in use; they should never be moved with people or materials on the platform; and they should be pushed at the base, not pulled at the top. Regular inspection should check for complete platforms, secure guardrails, proper bracing, stable foundations, and safe access ladders.",
        keyPoints: [
          "Types of scaffolding appropriate for electrical work",
          "Inspection tags and documentation requirements",
          "Safe working practices on scaffolding platforms",
          "Load limitations and material handling on scaffolds",
          "Requirements for guardrails, toe boards, and access ladders"
        ]
      },
      {
        id: "4.3",
        title: "Mobile Elevated Work Platforms",
        content: "Mobile Elevated Work Platforms (MEWPs) provide efficient access for electrical work at height, but require specific training and precautions. The two main types used in electrical work are boom lifts (articulated or telescopic) and scissor lifts. Operators must have completed IPAF (International Powered Access Federation) or equivalent training for the specific category of MEWP they will use. Daily pre-use checks are essential and should include: hydraulic fluid levels and leaks; battery condition; structural components for damage; controls for proper function; emergency lowering systems; outriggers and stabilizers; wheels and brakes; and guardrail systems. Ground conditions must be assessed before deployment, ensuring the surface can support the MEWP's weight, considering factors like underground services or voids. When used outdoors, maximum wind speed ratings must be observed, typically around 12.5m/s (28mph) for most MEWPs, with work ceasing and platforms lowered when this is exceeded. Fall protection varies by MEWP type: in boom lifts, operators must wear full body harnesses with short lanyards attached to designated anchor points; for scissor lifts, the guardrail system typically provides sufficient protection if gates are closed. Overhead hazards, particularly power lines, require careful assessment, with safe distances maintained according to the voltage involved (minimum 9m from overhead lines unless formally assessed and permitted). Outriggers must be fully extended and firmly supported on suitable load-spreading plates when required by the manufacturer. Emergency procedures must be established before work begins, including ground-level emergency controls for lowering the platform if the operator becomes incapacitated. Rescue plans should account for foreseeable emergencies like power failures, control malfunctions, or operator medical emergencies.",
        keyPoints: [
          "Types of MEWPs suitable for electrical installation work",
          "Training and certification requirements for operators",
          "Pre-use checks and operational safety measures",
          "Emergency procedures when using MEWPs",
          "Special considerations for working near live electrical equipment"
        ]
      },
      {
        id: "4.4",
        title: "Weather Considerations",
        content: "Weather conditions significantly impact the safety of access equipment, especially in the variable UK climate where conditions can change rapidly. Wind speed is a critical factor: ladders become difficult to control and unstable in winds above 17mph (Force 4); tower scaffolds typically have a maximum working wind speed of 17-21mph; and MEWPs have manufacturer-specified limits, usually around 28mph. Sudden gusts can be particularly dangerous, so local weather forecasts should be consulted before working at height, and work should cease if conditions deteriorate. Rain and snow create slip hazards on all access equipment surfaces, requiring extra caution and potentially non-slip footwear with enhanced grip. Wet conditions also affect electrical safety when using metal access equipment, increasing conductivity risks. Lightning presents a severe hazard when working at height, especially when using metal access equipment or working on external electrical systems—all such work should cease during thunderstorms, with workers descending to safe locations. Cold temperatures affect both equipment and workers: metal surfaces become colder to touch, requiring gloves; hydraulic systems on MEWPs may operate more slowly; and workers' dexterity and concentration can be impaired, requiring additional breaks and appropriate clothing. High temperatures also present risks, with metal surfaces potentially becoming hot enough to cause burns and workers at risk of heat stress or sunburn. The combination of high winds and rain significantly increases risks and often requires work postponement. Weather-related risk assessments should be dynamic, with workers empowered to stop work if conditions become unsafe, regardless of production pressures.",
        keyPoints: [
          "Wind speed limitations for different types of access equipment",
          "Precautions for wet or icy conditions",
          "Lightning risks when working at height",
          "Temperature effects on equipment stability and worker safety",
          "Dynamic risk assessment for changing weather conditions"
        ]
      }
    ]
  }
};
