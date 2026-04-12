#!/usr/bin/env python3
"""Generate the first Wave 1 SEO guide pages from structured data."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
PAGES_DIR = ROOT / "src/pages/seo"


def make_fault_page(
    component_name: str,
    page_path: str,
    page_label: str,
    page_title: str,
    page_description: str,
    hero_title: str,
    hero_highlight: str,
    hero_subtitle: str,
    key_takeaways: list[str],
    sections: list[dict],
    faqs: list[dict],
) -> dict:
    return {
        "componentName": component_name,
        "pagePath": page_path,
        "pageLabel": page_label,
        "pageTitle": page_title,
        "pageDescription": page_description,
        "config": {
            "pageLabel": page_label,
            "datePublished": "2026-04-12",
            "dateModified": "2026-04-12",
            "badge": "Fault Guide",
            "badgeIconName": "AlertTriangle",
            "heroTitle": hero_title,
            "heroHighlight": hero_highlight,
            "heroSubtitle": hero_subtitle,
            "readingTime": 10,
            "keyTakeaways": key_takeaways,
            "sections": sections,
            "faqs": faqs,
            "relatedPages": [
                {
                    "href": "/guides/testing-sequence-guide",
                    "title": "Testing Sequence Guide",
                    "description": "Follow a clear dead-test and live-test order on site.",
                    "iconName": "ClipboardCheck",
                    "category": "Guide",
                },
                {
                    "href": "/guides/safe-isolation-procedure",
                    "title": "Safe Isolation Procedure",
                    "description": "Lock off properly before fault-finding or board work.",
                    "iconName": "ShieldCheck",
                    "category": "Guide",
                },
                {
                    "href": "/tools/electrical-testing-calculators",
                    "title": "Electrical Testing Calculators",
                    "description": "Check Zs, disconnection times, and other core test values quickly.",
                    "iconName": "Calculator",
                    "category": "Calculator",
                },
                {
                    "href": "/tools/ai-electrician",
                    "title": "AI Electrician Tools",
                    "description": "Use Elec-AI for guided diagnosis and clearer next steps.",
                    "iconName": "Brain",
                    "category": "Tool",
                },
                {
                    "href": "/tools/eicr-certificate",
                    "title": "EICR Certificate App",
                    "description": "Record defects, observations, and test results from your phone.",
                    "iconName": "FileCheck2",
                    "category": "Certificate",
                },
            ],
            "ctaHeading": "Diagnose faster and record the job properly",
            "ctaSubheading": "Use Elec-Mate for testing calculators, guided diagnosis, and clean certificate workflows when the fault turns into remedial work.",
        },
    }


def make_eicr_page(
    component_name: str,
    page_path: str,
    page_label: str,
    page_title: str,
    page_description: str,
    hero_title: str,
    hero_highlight: str,
    hero_subtitle: str,
    key_takeaways: list[str],
    sections: list[dict],
    faqs: list[dict],
) -> dict:
    return {
        "componentName": component_name,
        "pagePath": page_path,
        "pageLabel": page_label,
        "pageTitle": page_title,
        "pageDescription": page_description,
        "config": {
            "pageLabel": page_label,
            "datePublished": "2026-04-12",
            "dateModified": "2026-04-12",
            "badge": "Certificate Guide",
            "badgeIconName": "FileCheck2",
            "heroTitle": hero_title,
            "heroHighlight": hero_highlight,
            "heroSubtitle": hero_subtitle,
            "readingTime": 11,
            "keyTakeaways": key_takeaways,
            "sections": sections,
            "faqs": faqs,
            "relatedPages": [
                {
                    "href": "/tools/eicr-certificate",
                    "title": "Digital EICR Certificate",
                    "description": "Complete EICRs on your phone with schedules, coding, and PDF output.",
                    "iconName": "FileCheck2",
                    "category": "Certificate",
                },
                {
                    "href": "/guides/bs7671-observation-codes",
                    "title": "BS 7671 Observation Codes",
                    "description": "Use C1, C2, C3, and FI correctly and consistently.",
                    "iconName": "ShieldCheck",
                    "category": "Guide",
                },
                {
                    "href": "/guides/testing-sequence-guide",
                    "title": "Testing Sequence Guide",
                    "description": "Keep your dead and live testing in a clean working order.",
                    "iconName": "ClipboardCheck",
                    "category": "Guide",
                },
                {
                    "href": "/training/inspection-and-testing",
                    "title": "Inspection and Testing Training",
                    "description": "Refresh the theory behind the readings you are recording.",
                    "iconName": "BookOpen",
                    "category": "Training",
                },
                {
                    "href": "/tools/digital-certificates-app",
                    "title": "Digital Certificates App",
                    "description": "Handle EICRs, EICs, Minor Works, and other certificates from one workflow.",
                    "iconName": "PenTool",
                    "category": "Tool",
                },
            ],
            "ctaHeading": "Write better EICRs with less back-and-forth",
            "ctaSubheading": "Use Elec-Mate to capture schedules, observations, signatures, and client-ready PDFs in one certificate workflow.",
        },
    }


def make_pricing_page(
    component_name: str,
    page_path: str,
    page_label: str,
    page_title: str,
    page_description: str,
    hero_title: str,
    hero_highlight: str,
    hero_subtitle: str,
    key_takeaways: list[str],
    sections: list[dict],
    faqs: list[dict],
) -> dict:
    return {
        "componentName": component_name,
        "pagePath": page_path,
        "pageLabel": page_label,
        "pageTitle": page_title,
        "pageDescription": page_description,
        "config": {
            "pageLabel": page_label,
            "datePublished": "2026-04-12",
            "dateModified": "2026-04-12",
            "badge": "Pricing Guide",
            "badgeIconName": "PoundSterling",
            "heroTitle": hero_title,
            "heroHighlight": hero_highlight,
            "heroSubtitle": hero_subtitle,
            "readingTime": 10,
            "keyTakeaways": key_takeaways,
            "sections": sections,
            "faqs": faqs,
            "relatedPages": [
                {
                    "href": "/tools/electrical-quoting-app",
                    "title": "Electrical Quoting App",
                    "description": "Build clearer quotes with line items, labour, and client-ready PDFs.",
                    "iconName": "Calculator",
                    "category": "Tool",
                },
                {
                    "href": "/ai-cost-engineer",
                    "title": "AI Cost Engineer",
                    "description": "Use AI to turn site notes and defects into faster price builds.",
                    "iconName": "Brain",
                    "category": "Tool",
                },
                {
                    "href": "/tools/minimum-charge-calculator",
                    "title": "Minimum Charge Calculator",
                    "description": "Check your base call-out and small-job floor price.",
                    "iconName": "PoundSterling",
                    "category": "Calculator",
                },
                {
                    "href": "/guides/consumer-unit-regulations",
                    "title": "Consumer Unit Regulations",
                    "description": "Understand the standards that shape the job scope and price.",
                    "iconName": "ShieldCheck",
                    "category": "Guide",
                },
                {
                    "href": "/eic-certificate",
                    "title": "EIC Certificate App",
                    "description": "Issue the right certificate after the board change is complete.",
                    "iconName": "FileCheck2",
                    "category": "Certificate",
                },
            ],
            "ctaHeading": "Price board changes properly and issue the paperwork from one place",
            "ctaSubheading": "Use Elec-Mate for quoting, cost guidance, certificates, and the admin that follows the install.",
        },
    }


def make_property_page(
    component_name: str,
    page_path: str,
    page_label: str,
    page_title: str,
    page_description: str,
    hero_title: str,
    hero_highlight: str,
    hero_subtitle: str,
    key_takeaways: list[str],
    sections: list[dict],
    faqs: list[dict],
) -> dict:
    return {
        "componentName": component_name,
        "pagePath": page_path,
        "pageLabel": page_label,
        "pageTitle": page_title,
        "pageDescription": page_description,
        "config": {
            "pageLabel": page_label,
            "datePublished": "2026-04-12",
            "dateModified": "2026-04-12",
            "badge": "Property Guide",
            "badgeIconName": "Home",
            "heroTitle": hero_title,
            "heroHighlight": hero_highlight,
            "heroSubtitle": hero_subtitle,
            "readingTime": 9,
            "keyTakeaways": key_takeaways,
            "sections": sections,
            "faqs": faqs,
            "relatedPages": [
                {
                    "href": "/guides/consumer-unit-regulations",
                    "title": "Consumer Unit Regulations",
                    "description": "Understand the current board and protection expectations for domestic work.",
                    "iconName": "ShieldCheck",
                    "category": "Guide",
                },
                {
                    "href": "/guides/part-p-building-regulations",
                    "title": "Part P Building Regulations",
                    "description": "Check what needs notifying when domestic work is being altered.",
                    "iconName": "FileText",
                    "category": "Regulations",
                },
                {
                    "href": "/tools/electrical-testing-calculators",
                    "title": "Electrical Testing Calculators",
                    "description": "Use the calculator suite when planning verification and remedials.",
                    "iconName": "Calculator",
                    "category": "Calculator",
                },
                {
                    "href": "/tools/electrical-quoting-app",
                    "title": "Electrical Quoting App",
                    "description": "Turn survey notes into a clearer quote for the client.",
                    "iconName": "PoundSterling",
                    "category": "Tool",
                },
                {
                    "href": "/tools/eicr-certificate",
                    "title": "EICR Certificate App",
                    "description": "Record findings, test values, and outcomes cleanly on site.",
                    "iconName": "FileCheck2",
                    "category": "Certificate",
                },
            ],
            "ctaHeading": "Survey older properties with a clearer workflow",
            "ctaSubheading": "Use Elec-Mate for testing support, quotes, and digital certificates when an older installation needs careful planning.",
        },
    }


PAGES = [
    make_fault_page(
        component_name="RCDKeepsTrippingGuidePage",
        page_path="/guides/rcd-keeps-tripping-guide",
        page_label="RCD Keeps Tripping Guide",
        page_title="RCD Keeps Tripping Guide | Electrician Fault Guide",
        page_description="Practical electrician guide to an RCD that keeps tripping. Common causes, safe test order, what to check first, and when the issue points to the circuit, accessories, or the board.",
        hero_title="RCD Keeps Tripping Guide",
        hero_highlight="RCD",
        hero_subtitle="Use this guide when an RCD is nuisance tripping or dropping out under load. It covers the most common causes, the safest test sequence, and how to narrow the fault down before you start changing parts.",
        key_takeaways=[
            "An RCD that trips can be caused by genuine earth leakage, neutral-to-earth faults, damaged accessories, moisture ingress, or multiple small leakages adding up across several circuits.",
            "Start by identifying whether the trip happens instantly, only under load, or only when a specific circuit is energised. That pattern usually tells you where to look first.",
            "Safe isolation, circuit separation, insulation resistance testing, and controlled re-energisation are the fastest way to narrow the problem down cleanly.",
            "Do not assume the RCD itself is faulty until the connected circuits, accessories, and borrowed-neutral risks have been checked properly.",
            "If the fault leads to remedial work, record the findings clearly and move straight into the certificate or quote workflow.",
        ],
        sections=[
            {
                "id": "what-the-trip-pattern-tells-you",
                "label": "Trip Pattern",
                "heading": "What the trip pattern usually tells you",
                "paragraphs": [
                    "The first useful clue is [when the RCD trips](/guides/testing-sequence-guide). If it trips as soon as you reset it, think neutral-to-earth fault, trapped cable, or a damaged accessory still connected to the circuit.",
                    "If it holds until a load is switched on, the fault is more likely to be inside an appliance, heating element, outside accessory, or a circuit that only becomes live under use.",
                    "If it trips randomly, look for moisture, intermittent cable damage, nuisance leakage across several circuits, or an issue that appears only when weather or demand changes.",
                ],
                "note": {
                    "title": "Start with the pattern, not the part swap",
                    "text": "Electricians lose time when they replace the RCD first and test second. The trip pattern usually gives you a better starting point than the device itself.",
                    "variant": "warning",
                },
            },
            {
                "id": "most-common-causes",
                "heading": "Most common causes of repeated RCD tripping",
                "bullets": [
                    "Damaged accessories, fittings, or flexes creating a true earth leakage fault.",
                    "Outdoor equipment, garage circuits, or damp locations taking in moisture.",
                    "Neutral-to-earth contact on the load side of the board or at an accessory.",
                    "Appliances with failing heating elements, filters, or insulation.",
                    "Multiple circuits each leaking a small amount until the RCD threshold is exceeded.",
                    "Poor workmanship after recent board changes, alterations, or extensions.",
                ],
            },
            {
                "id": "safe-test-sequence",
                "heading": "Safe test sequence for fault-finding",
                "paragraphs": [
                    "Start with [safe isolation](/guides/safe-isolation-procedure), visual inspection, and a clear note of which circuits are on the affected RCD.",
                    "Disconnect and separate the outgoing circuits, then reset the RCD with circuits removed. If it now holds, the fault is downstream. If it still trips, the issue may be at the board or device.",
                    "Reconnect circuits methodically, testing insulation resistance and checking for neutral-to-earth faults before bringing them back on one by one.",
                ],
                "bullets": [
                    "Check for borrowed neutrals and shared neutral issues before chasing random accessories.",
                    "Pay extra attention to outside lights, sockets, heaters, immersion circuits, and recently altered wiring.",
                    "Use [electrical testing calculators](/tools/electrical-testing-calculators) and your readings together rather than relying on guesswork.",
                ],
            },
            {
                "id": "repair-upgrade-and-recording",
                "heading": "When to repair, when to upgrade, and how to record it",
                "paragraphs": [
                    "If the fault is clearly on one circuit or accessory, repair the defect and retest before restoring the installation to service.",
                    "If the board uses split-load protection and nuisance tripping is affecting multiple areas, it may be worth discussing RCBO conversion or board improvements with the client.",
                    "Where the trip leads to observations, remedials, or a wider inspection, record the findings in the [digital certificate workflow](/tools/eicr-certificate) and price any follow-on work through the [quoting app](/tools/electrical-quoting-app).",
                ],
            },
        ],
        faqs=[
            {
                "question": "Can one faulty appliance trip the whole RCD?",
                "answer": "Yes. A single appliance with insulation breakdown or a failing heating element can trip the RCD as soon as it is plugged in or switched on, especially on socket or appliance circuits.",
            },
            {
                "question": "Why does the RCD only trip in wet weather?",
                "answer": "That usually points to outside accessories, moisture ingress, damaged glands, or external fittings where insulation quality falls when damp conditions arrive.",
            },
            {
                "question": "Should I replace the RCD first?",
                "answer": "Not by default. Test the connected circuits and the trip pattern first. The device can be at fault, but swapping it early often hides the real problem and wastes time.",
            },
            {
                "question": "Can combined leakage from several circuits cause nuisance tripping?",
                "answer": "Yes. Several circuits can each leak a small amount, and together they can push the RCD over its trip threshold even though no single circuit looks dramatic on first inspection.",
            },
            {
                "question": "What is the cleanest way to narrow the fault down?",
                "answer": "Safe isolation, separating the outgoing circuits, testing in order, and re-energising methodically is usually the fastest and safest route to the answer.",
            },
        ],
    ),
    make_fault_page(
        component_name="RCDKeepsTrippingCausesAndFixesPage",
        page_path="/guides/rcd-keeps-tripping-causes-and-fixes",
        page_label="RCD Keeps Tripping Causes and Fixes",
        page_title="RCD Keeps Tripping Causes and Fixes | Electrician Fault Guide",
        page_description="Understand the most common reasons an RCD keeps tripping and the practical fixes electricians use on site. Covers damp circuits, borrowed neutrals, appliances, and board issues.",
        hero_title="RCD Keeps Tripping Causes and Fixes",
        hero_highlight="RCD",
        hero_subtitle="This page focuses on the common cause-and-fix patterns electricians see in domestic and light commercial work, so you can move from symptom to remedy faster.",
        key_takeaways=[
            "Most repeated RCD trips come from moisture, damaged accessories, faulty appliances, neutral-to-earth contact, or combined leakage across several circuits.",
            "The fix depends on the pattern: some jobs need one damaged accessory replacing, while others point to wider circuit segregation or board improvements.",
            "Outside circuits and recently altered wiring are two of the most common places to find the real fault.",
            "Borrowed neutrals and shared neutral mistakes can make an RCD look faulty when the wiring arrangement is actually the root issue.",
            "Once the defect is found, record the outcome clearly and avoid vague fault descriptions on the paperwork.",
        ],
        sections=[
            {
                "id": "quick-patterns",
                "heading": "The quickest cause patterns to recognise",
                "paragraphs": [
                    "If the trip happens after rain, think outside lights, garden sockets, garage accessories, and external junctions first.",
                    "If it happens when a single appliance is connected, isolate that appliance and verify the circuit separately before blaming the board.",
                    "If it began after recent work, look hard at terminations, neutrals, borrowed neutral risks, and anything that was disturbed.",
                ],
            },
            {
                "id": "common-causes",
                "heading": "Common causes and the usual fixes",
                "bullets": [
                    "Moisture in outside accessories: strip back, dry, remake, reseal, or replace the affected accessory.",
                    "Damaged flex or accessory: replace the damaged item and retest the circuit fully.",
                    "Neutral-to-earth fault: separate the circuit, find the contact point, and correct the wiring fault.",
                    "Faulty appliance: remove from service, prove the circuit, and advise the client clearly.",
                    "Accumulated leakage on split-load boards: consider circuit redistribution or RCBO upgrade if the install is otherwise sound.",
                ],
            },
            {
                "id": "borrowed-neutrals-and-board-work",
                "heading": "Borrowed neutrals and board-change mistakes",
                "paragraphs": [
                    "One of the most frustrating faults is a borrowed neutral or crossed neutral introduced during alterations or left over from older wiring arrangements.",
                    "These faults often appear after a board change, extension, or circuit split because the installation worked badly before but only starts tripping once RCD protection is arranged properly.",
                    "If the history points to altered wiring, treat the circuit separation and neutral paths as a priority rather than a late-stage check.",
                ],
                "note": {
                    "title": "Do not skip neutral checks after board work",
                    "text": "A neat-looking consumer unit can still hide crossed neutrals or borrowed-neutral faults. Confirm the wiring arrangement before closing the job.",
                    "variant": "warning",
                },
            },
            {
                "id": "what-good-recording-looks-like",
                "heading": "What good fault recording looks like",
                "paragraphs": [
                    "Write down the actual cause, the affected circuit, the tests carried out, and the remedial action taken. That helps the client and protects you if the issue returns.",
                    "If the visit uncovers wider defects, move into the [EICR certificate](/tools/eicr-certificate) or [digital certificates app](/tools/digital-certificates-app) rather than leaving the history vague.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Why does the RCD trip only when outside lights are used?",
                "answer": "That usually points to water ingress, damaged fittings, failed photocells, or poor joints in external lighting circuits.",
            },
            {
                "question": "Can a bad neutral cause RCD tripping?",
                "answer": "Yes. Neutral-to-earth contact or crossed neutrals on the load side of the device are common causes of persistent tripping.",
            },
            {
                "question": "Is RCBO conversion worth discussing with the client?",
                "answer": "Often yes. On busy domestic boards, RCBOs can improve fault discrimination and reduce the disruption caused by one leaking circuit taking down several others.",
            },
            {
                "question": "Should I code repeated nuisance tripping on an EICR?",
                "answer": "It depends on the cause. If the tripping is linked to missing protection, unsafe wiring, or a defect that could leave the installation unsafe, the observation should reflect that defect rather than the symptom alone.",
            },
            {
                "question": "What if the fault only happens occasionally?",
                "answer": "Record the conditions carefully, ask when it happens, and focus on intermittent loads, weather, and recently altered circuits before guessing.",
            },
        ],
    ),
    make_fault_page(
        component_name="RCDKeepsTrippingTestSequencePage",
        page_path="/guides/rcd-keeps-tripping-test-sequence",
        page_label="RCD Keeps Tripping Test Sequence",
        page_title="RCD Keeps Tripping Test Sequence | Electrician Fault Guide",
        page_description="Step-by-step electrician test sequence for an RCD that keeps tripping. Covers safe isolation, circuit separation, insulation resistance, reconnection order, and recording the result.",
        hero_title="RCD Keeps Tripping Test Sequence",
        hero_highlight="RCD",
        hero_subtitle="When an RCD keeps tripping, a clean test order matters. This guide is about the sequence that helps you find the defect quickly without turning the visit into guesswork.",
        key_takeaways=[
            "Start with safe isolation and a visual check before disconnecting anything.",
            "Separate the outgoing circuits and confirm whether the device holds with the circuits removed.",
            "Use insulation resistance and neutral checks before reconnecting each circuit.",
            "Bring circuits back on in a controlled order and watch the trip pattern carefully.",
            "Record the defect, the circuit, and the remedial action clearly once the fault is proven.",
        ],
        sections=[
            {
                "id": "before-you-start",
                "heading": "Before you start testing",
                "paragraphs": [
                    "Confirm what has been tripping, how often, and whether the client has noticed a pattern with weather, appliances, or a specific area of the property.",
                    "Apply [safe isolation](/guides/safe-isolation-procedure), verify dead, and inspect the board, labelling, and obvious signs of poor terminations or damage before you begin circuit work.",
                ],
            },
            {
                "id": "separate-and-prove",
                "heading": "Separate the circuits and prove the device first",
                "paragraphs": [
                    "Disconnect the outgoing circuits from the affected RCD arrangement and try resetting the device with the circuits removed.",
                    "If it now holds, the fault is downstream. If it still trips, inspect the board arrangement, the device, and any associated neutral paths before going further.",
                ],
                "bullets": [
                    "Label every disconnected circuit clearly before testing.",
                    "Keep neutrals and line conductors identified so you do not create fresh confusion during reconnection.",
                ],
            },
            {
                "id": "test-circuits-in-order",
                "heading": "Test the connected circuits in a sensible order",
                "paragraphs": [
                    "Start with insulation resistance and neutral checks on the most likely circuits first: outside accessories, heating loads, recently altered wiring, and circuits serving damp areas.",
                    "After dead testing, reconnect circuits one by one and re-energise in a controlled order. Watch for the exact point where the trip returns.",
                ],
                "bullets": [
                    "Do not reconnect everything at once just to save time.",
                    "Keep notes of each circuit result so the fault trail stays clear if the issue proves intermittent.",
                ],
            },
            {
                "id": "finish-the-job-properly",
                "heading": "Finish the job properly once the fault is found",
                "paragraphs": [
                    "Repair or isolate the defective accessory, appliance, or circuit section, then repeat the key tests to confirm the circuit now behaves correctly.",
                    "If the visit leads into wider inspection or follow-on work, use the [digital certificate workflow](/tools/eicr-certificate) and [quoting app](/tools/electrical-quoting-app) rather than leaving the job with incomplete notes.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Why disconnect all circuits first?",
                "answer": "Because it tells you quickly whether the fault is downstream or at the device and board arrangement, which saves time later.",
            },
            {
                "question": "What circuit should I check first?",
                "answer": "Start with the circuit that matches the trip pattern best, especially outside loads, heating loads, damp areas, or anything altered recently.",
            },
            {
                "question": "Is insulation resistance always enough on its own?",
                "answer": "No. It is a key test, but the trip pattern, neutral checks, and controlled reconnection order are often what actually identify the defective circuit.",
            },
            {
                "question": "What if the RCD still trips with every circuit removed?",
                "answer": "That points you back toward the device, the neutral arrangement, or the board itself rather than the connected circuits.",
            },
            {
                "question": "Should I issue paperwork after fault-finding only?",
                "answer": "If you have inspected, tested, or identified defects that need recording, clear notes and the right certificate path matter, especially when remedial work follows.",
            },
        ],
    ),
    make_fault_page(
        component_name="RCBOKeepsTrippingGuidePage",
        page_path="/guides/rcbo-keeps-tripping-guide",
        page_label="RCBO Keeps Tripping Guide",
        page_title="RCBO Keeps Tripping Guide | Electrician Fault Guide",
        page_description="Electrician guide to an RCBO that keeps tripping. Covers whether the trip is overload, short circuit, or earth leakage, plus the safest order for narrowing the problem down.",
        hero_title="RCBO Keeps Tripping Guide",
        hero_highlight="RCBO",
        hero_subtitle="An RCBO protects one circuit, so the fault is usually narrower than a split-load RCD problem. This guide helps you separate overload, short-circuit, and earth-leakage style faults more quickly.",
        key_takeaways=[
            "Because an RCBO serves one circuit, the fault is usually local to that circuit or the connected load.",
            "The trip behaviour matters: immediate trip, load-related trip, and random trip all point to different causes.",
            "Check whether you are dealing with overload or short circuit as well as earth leakage.",
            "Recent alterations, damaged accessories, and outdoor loads are common starting points.",
            "Once proven, the fix and the recording should be tied back to the exact circuit and defect.",
        ],
        sections=[
            {
                "id": "what-type-of-trip-is-it",
                "heading": "Work out what type of trip you are dealing with",
                "paragraphs": [
                    "An RCBO combines overcurrent and residual-current protection, so you need to think about more than earth leakage alone.",
                    "If the trip appears under heavy load, check for overload or poor terminations causing heat. If it is instant or unpredictable, inspect for short circuit, neutral-to-earth contact, or insulation failure on the circuit.",
                ],
            },
            {
                "id": "most-likely-fault-locations",
                "heading": "Most likely fault locations on an RCBO circuit",
                "bullets": [
                    "Damaged socket or spur accessories on a radial circuit.",
                    "Appliance faults on dedicated circuits such as ovens, showers, or heaters.",
                    "Outside or garage accessories where moisture is involved.",
                    "Recent additions or alterations where terminations or polarity may be wrong.",
                    "Loose neutral or line terminations at accessories or at the board.",
                ],
            },
            {
                "id": "practical-test-order",
                "heading": "Practical test order for a single RCBO fault",
                "paragraphs": [
                    "Use [safe isolation](/guides/safe-isolation-procedure), inspect the circuit accessories, and test the circuit in sections if necessary.",
                    "Because the fault is confined to one protected way, you can often work faster by checking the known loads and accessories on that circuit before moving into wider board investigation.",
                ],
                "bullets": [
                    "Check disconnected loads and appliances separately where possible.",
                    "Verify polarity, continuity, and insulation resistance based on the circuit type and suspected fault.",
                ],
            },
            {
                "id": "repair-and-record",
                "heading": "Repair, confirm, and record the result",
                "paragraphs": [
                    "Once the defective point is repaired or removed, prove the circuit with the right tests and verify that the RCBO now holds under normal use.",
                    "If the visit grows into wider inspection or additional defects, move into the [EICR certificate](/tools/eicr-certificate) or a formal remedial quote through [Elec-Mate](/tools/electrical-quoting-app).",
                ],
            },
        ],
        faqs=[
            {
                "question": "Does an RCBO trip for overload as well as earth faults?",
                "answer": "Yes. That is why the trip pattern matters. An RCBO can trip because of overload, short circuit, or residual current depending on the fault condition.",
            },
            {
                "question": "Is an RCBO fault easier to narrow down than an RCD fault?",
                "answer": "Usually yes, because it is protecting one circuit rather than several grouped together on one RCD.",
            },
            {
                "question": "Should I still suspect the board after an RCBO trip?",
                "answer": "You can, but the connected circuit and load are still the more likely source until testing proves otherwise.",
            },
            {
                "question": "What circuits often give trouble on RCBOs?",
                "answer": "Showers, ovens, outside power, heating circuits, and recently altered radials are common examples because they combine higher demand with harsher conditions or more recent alterations.",
            },
            {
                "question": "When should I recommend wider remedial work?",
                "answer": "When the tripping points to poor board layout, poor workmanship, ageing accessories, or a circuit condition that is bigger than a one-off component failure.",
            },
        ],
    ),
    make_eicr_page(
        component_name="EICRHowToFillInPage",
        page_path="/guides/eicr-how-to-fill-in",
        page_label="How to Fill In an EICR",
        page_title="How to Fill In an EICR | Electrician Certificate Guide",
        page_description="Step-by-step guide to filling in an EICR properly. Covers client details, supply characteristics, schedules, observations, codes, and the final outcome so the report is clear and defensible.",
        hero_title="How to Fill In an EICR",
        hero_highlight="EICR",
        hero_subtitle="This guide is for electricians who want cleaner, clearer EICRs. It walks through the report in the same order most people complete it on site, from the first client details to the final outcome.",
        key_takeaways=[
            "Start with accurate client, installation, and scope details so the report has a clear record of what was inspected.",
            "Supply characteristics, earthing, bonding, and distribution board information must be checked before you move into schedules and observations.",
            "Schedules should match the actual circuit arrangement, not a guessed or copied version of a previous report.",
            "Observations need a clear defect description, correct code, and enough wording for the client to understand what is wrong.",
            "Before issuing the report, make sure the overall outcome matches the coded observations and that signatures and dates are complete.",
        ],
        sections=[
            {
                "id": "client-and-scope",
                "heading": "Start with client details, installation details, and scope",
                "paragraphs": [
                    "Get the basic details right first. That means the client name, site address, agreed extent and limitations, occupancy type, and anything that affects access or the inspection scope.",
                    "If you leave these vague, the rest of the EICR becomes harder to defend later because there is no clean record of what was or was not inspected.",
                ],
            },
            {
                "id": "supply-and-earthing",
                "heading": "Record supply, earthing, and main protective information properly",
                "paragraphs": [
                    "Before you move into circuit schedules, confirm the supply characteristics, earthing arrangement, bonding, and main protective device details.",
                    "This is where many rushed EICRs lose credibility. The report should show that you understood the installation fundamentals before coding defects further downstream.",
                ],
                "bullets": [
                    "Check the earthing arrangement and main bonding rather than copying old notes.",
                    "Use [earthing arrangements](/guides/earthing-arrangements) and [Part P guidance](/guides/part-p-building-regulations) when the installation history is unclear.",
                ],
            },
            {
                "id": "schedules-and-observations",
                "heading": "Build clean schedules and write observations clearly",
                "paragraphs": [
                    "Your schedule of inspections and schedule of test results need to reflect the actual installation in front of you. Avoid carrying over old circuit labels that no longer match the board.",
                    "When you raise an observation, describe the defect plainly, apply the correct code from the [BS 7671 observation guide](/guides/bs7671-observation-codes), and state the affected area or circuit clearly.",
                ],
            },
            {
                "id": "outcome-and-final-check",
                "heading": "Check the overall outcome before you issue the report",
                "paragraphs": [
                    "Once the coded observations are complete, confirm that the overall result matches them. A report with a C1 or C2 cannot be left marked satisfactory.",
                    "Before sending the report, check dates, signatures, limitations, and any client-facing wording. The [digital certificate workflow](/tools/eicr-certificate) helps here because you can review the whole report cleanly before export.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Should I fill in the observations or the schedules first?",
                "answer": "Most electricians work more cleanly when the installation details and schedules are in place first, then the observations are written with the full context of the board and circuits.",
            },
            {
                "question": "How much wording should an EICR observation have?",
                "answer": "Enough for the client and any later reviewer to understand what the defect is, where it is, and why it matters. One vague line is rarely enough.",
            },
            {
                "question": "Can I copy old circuit schedules into a new EICR?",
                "answer": "Only if they still match the installation exactly, which is often not the case. The schedule should reflect what is actually in front of you on the day.",
            },
            {
                "question": "What is the biggest mistake when filling in an EICR?",
                "answer": "Rushing the front-end details and then trying to build the rest of the report on incomplete scope, poor labelling, or unverified supply information.",
            },
            {
                "question": "Do digital forms help with EICRs?",
                "answer": "Yes. They make it easier to keep schedules tidy, review observations, and export the finished report without rewriting or reformatting later.",
            },
        ],
    ),
    make_eicr_page(
        component_name="EICRCommonMistakesPage",
        page_path="/guides/eicr-common-mistakes",
        page_label="EICR Common Mistakes",
        page_title="EICR Common Mistakes | Electrician Certificate Guide",
        page_description="Common EICR mistakes electricians should avoid. Covers vague scope, poor schedules, weak observations, mismatched outcomes, and the checks worth doing before the report goes out.",
        hero_title="EICR Common Mistakes",
        hero_highlight="EICR",
        hero_subtitle="If your EICRs come back with questions, delays, or client confusion, the problem is usually not the form. It is usually the small mistakes that make the report look rushed or unclear.",
        key_takeaways=[
            "Weak scope details, copied schedules, and vague observations are three of the most common problems in poor EICRs.",
            "Clients struggle when the report explains codes but not the actual defect in plain language.",
            "An EICR can be technically correct and still look sloppy if the structure, wording, or outcome does not line up cleanly.",
            "A final review before issue catches more mistakes than most people expect, especially around coding and overall outcome.",
            "Digital workflows help because they reduce duplicated typing and make it easier to review the finished report as one document.",
        ],
        sections=[
            {
                "id": "weak-front-end",
                "heading": "Weak scope and installation details",
                "paragraphs": [
                    "One of the biggest mistakes is leaving the report front-end vague. If the extent, limitations, or installation details are incomplete, the whole report feels uncertain before the schedules even begin.",
                    "This creates avoidable problems later if the client, letting agent, or another electrician asks exactly what was inspected.",
                ],
            },
            {
                "id": "copied-schedules",
                "heading": "Copied schedules that do not match the board",
                "paragraphs": [
                    "It is tempting to pull forward old data, especially on repeat jobs, but mismatched board schedules are one of the quickest ways to undermine an EICR.",
                    "If the circuit labels, protective devices, or board arrangement have changed, the schedule must change with them.",
                ],
                "note": {
                    "title": "A tidy wrong schedule is still wrong",
                    "text": "Clients often assume the neatest part of the report is the most reliable. That is why copied schedules are so risky when they have not been rechecked properly.",
                    "variant": "warning",
                },
            },
            {
                "id": "bad-observations",
                "heading": "Observations that are too vague or coded badly",
                "paragraphs": [
                    "A code on its own is not enough. The report should explain the actual defect and where it was found, not just attach C2 or C3 to a short phrase.",
                    "Use the [observation code guide](/guides/bs7671-observation-codes) as support, but make sure the wording still makes sense to the client reading the finished EICR.",
                ],
            },
            {
                "id": "final-review",
                "heading": "No final review before the report goes out",
                "paragraphs": [
                    "A quick final review catches common mistakes such as missing signatures, mismatched outcomes, duplicated observations, and circuits left half-completed in the schedules.",
                    "That review is much easier when you can see the whole report in one place through the [digital certificate workflow](/tools/eicr-certificate).",
                ],
            },
        ],
        faqs=[
            {
                "question": "What is the most common mistake on an EICR?",
                "answer": "Poor front-end detail and schedules that do not truly match the installation are very common, especially on rushed reports.",
            },
            {
                "question": "Can a good test result section still be undermined by bad observations?",
                "answer": "Yes. If the observations are vague or coded badly, the client still leaves unsure what the defects are and what needs doing.",
            },
            {
                "question": "Should I write observations in technical language only?",
                "answer": "No. The wording should still make sense to the client, even when it references standards or specific components.",
            },
            {
                "question": "Why do digital EICRs help reduce mistakes?",
                "answer": "Because they make it easier to keep the schedules aligned, review the full report, and correct small errors before export.",
            },
            {
                "question": "Does the overall outcome need checking manually at the end?",
                "answer": "Yes. Even if the form system helps, the electrician still needs to confirm that the coded observations and the final result actually match.",
            },
        ],
    ),
    make_eicr_page(
        component_name="EICRWhatToIncludePage",
        page_path="/guides/eicr-what-to-include",
        page_label="What to Include in an EICR",
        page_title="What to Include in an EICR | Electrician Certificate Guide",
        page_description="What to include in an EICR so the report is complete and useful. Covers installation details, schedules, observations, signatures, and the supporting information clients expect to see.",
        hero_title="What to Include in an EICR",
        hero_highlight="EICR",
        hero_subtitle="A solid EICR is more than a few readings and a coded defect list. This guide covers the information that should be in the report if you want it to be complete, clear, and easy to stand behind.",
        key_takeaways=[
            "An EICR needs full installation details, scope, limitations, and client information before the schedules begin.",
            "Supply characteristics, earthing, bonding, distribution board information, and circuit data all need to support the test results and observations.",
            "The schedules of inspections and test results are not optional extras. They are core parts of the report.",
            "Observations, codes, signatures, and the overall outcome must all line up cleanly before the report is issued.",
            "Clients value a report that explains defects clearly, not one that only lists codes and abbreviations.",
        ],
        sections=[
            {
                "id": "installation-and-scope",
                "heading": "Installation details, scope, and limitations",
                "paragraphs": [
                    "Start with the client details, site address, installation description, occupancy type, and the extent of the inspection.",
                    "Limitations matter because they explain what you could not inspect and help the client understand the real scope of the report.",
                ],
            },
            {
                "id": "supply-board-circuit-information",
                "heading": "Supply, board, and circuit information",
                "paragraphs": [
                    "An EICR should show the supply characteristics, earthing arrangement, bonding, main protective device details, and the distribution board information that shapes the installation.",
                    "From there, the circuit schedules need to describe the circuits you actually inspected rather than a guessed summary.",
                ],
            },
            {
                "id": "inspections-tests-and-observations",
                "heading": "Inspection schedules, test results, and observations",
                "paragraphs": [
                    "The report should include the inspection schedule, schedule of test results, and the observations that explain any defects found.",
                    "If the observations need coding support, use the [BS 7671 observation guide](/guides/bs7671-observation-codes), but make sure your wording still explains the real defect and location.",
                ],
            },
            {
                "id": "signatures-and-client-output",
                "heading": "Signatures, outcome, and client-ready output",
                "paragraphs": [
                    "Before the report goes out, confirm the signatures, dates, outcome, and any remedial summary or client notes that should travel with the EICR.",
                    "The finished report should be something a client can understand and a scheme assessor or another electrician can review without guessing what happened on site.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Does every EICR need a schedule of test results?",
                "answer": "Yes. The test results are part of the core report structure and help support both the observations and the overall outcome.",
            },
            {
                "question": "Should limitations always be recorded?",
                "answer": "Yes. If there are access issues or areas you could not inspect, the report should say so clearly.",
            },
            {
                "question": "Do I need to include supply and earthing details?",
                "answer": "Yes. Those details provide essential context for the rest of the report and should not be treated as filler.",
            },
            {
                "question": "What makes an EICR look incomplete?",
                "answer": "Missing scope, vague schedules, thin observations, and an outcome that is not clearly backed up by the report contents.",
            },
            {
                "question": "Can digital forms help keep all of that organised?",
                "answer": "Yes. They are especially useful for keeping schedules, signatures, and final review steps together before the report is exported.",
            },
        ],
    ),
    make_pricing_page(
        component_name="ConsumerUnitUpgradeCostGuidePage",
        page_path="/guides/consumer-unit-upgrade-cost-guide",
        page_label="Consumer Unit Upgrade Cost Guide",
        page_title="Consumer Unit Upgrade Cost Guide | UK Electrician Pricing",
        page_description="Consumer unit upgrade cost guide for UK electricians and homeowners. Covers typical board change prices, what affects the quote, and what should be included in the final price.",
        hero_title="Consumer Unit Upgrade Cost Guide",
        hero_highlight="Cost Guide",
        hero_subtitle="Use this guide when pricing or checking the cost of a consumer unit upgrade. It focuses on real job scope, what changes the price, and what should be included so the quote does not come back to bite later.",
        key_takeaways=[
            "A consumer unit upgrade price depends on more than the board itself. The testing, remedials, tails, bonding, and certificate work all affect the total.",
            "Like-for-like board changes are rare once the existing installation is tested properly and the supply arrangement is reviewed.",
            "RCBO choice, SPD provision, board size, and remedial findings are some of the biggest price drivers.",
            "If the quote is too thin at the start, the job often turns into unpaid remedial work by the time testing is complete.",
            "Good pricing should line up with the certificate, notification, and client handover work that follows the install.",
        ],
        sections=[
            {
                "id": "typical-range",
                "heading": "Typical price range for a consumer unit upgrade",
                "paragraphs": [
                    "A straightforward domestic board change can sit at one price level, but the figure moves quickly once you factor in RCBO configuration, SPD provision, tails, bonding, or extra remedials found during testing.",
                    "That is why a consumer unit job should be priced as a full workflow, not just as the cost of one enclosure and a few protective devices.",
                ],
            },
            {
                "id": "what-moves-the-price",
                "heading": "What moves the price up or down",
                "bullets": [
                    "Number of circuits and board size needed.",
                    "RCBO versus split-load arrangement and whether an SPD is included.",
                    "Condition of meter tails, main earthing conductor, and bonding.",
                    "Access, labelling, and how much circuit identification work is needed before testing.",
                    "Any remedials found once the installation is properly tested.",
                ],
            },
            {
                "id": "what-should-be-included",
                "heading": "What should already be included in the quote",
                "paragraphs": [
                    "The price should reflect isolation, board swap, circuit identification, testing, certification, and the final paperwork. If notification or certificate work is left out at the quote stage, the job looks cheaper than it really is.",
                    "This is where the [quoting app](/tools/electrical-quoting-app) and [AI Cost Engineer](/ai-cost-engineer) help, because they force the job to be priced as a full piece of work rather than a materials-only number.",
                ],
            },
            {
                "id": "pricing-with-confidence",
                "heading": "Price it with enough margin to finish the job properly",
                "paragraphs": [
                    "A board change that turns into bonding upgrades, relabelling, circuit investigation, and certificate cleanup is not unusual. Your price needs to leave room for real site conditions.",
                    "That is especially important if the board change is being used to tidy up a poor older installation rather than simply replacing a like-for-like modern board.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Why does one consumer unit quote vary so much from another?",
                "answer": "Because some prices only cover the board swap, while others include testing, certification, tails, bonding, SPD, and likely remedial time.",
            },
            {
                "question": "Should an SPD be included in a board change quote?",
                "answer": "In many cases yes, but it depends on the installation and the approach you are pricing. It should at least be discussed and shown clearly.",
            },
            {
                "question": "Do I need to price for testing and certification separately?",
                "answer": "You can show it separately or include it in one total, but it should always be costed somewhere because it is part of the job.",
            },
            {
                "question": "What is the biggest pricing mistake on board changes?",
                "answer": "Treating the job as a simple board swap and not allowing for the real work that appears once the installation is opened up and tested.",
            },
            {
                "question": "Can AI help with pricing board changes?",
                "answer": "Yes. It can help structure the labour, materials, and likely remedial items more quickly so the quote is closer to the real scope of the work.",
            },
        ],
    ),
    make_pricing_page(
        component_name="ConsumerUnitUpgradePriceBreakdownPage",
        page_path="/guides/consumer-unit-upgrade-price-breakdown",
        page_label="Consumer Unit Upgrade Price Breakdown",
        page_title="Consumer Unit Upgrade Price Breakdown | UK Electrician Pricing",
        page_description="Consumer unit upgrade price breakdown for electricians. Split the job into labour, materials, testing, certification, and likely remedials so the final quote is easier to justify.",
        hero_title="Consumer Unit Upgrade Price Breakdown",
        hero_highlight="Price Breakdown",
        hero_subtitle="If you want to explain a consumer unit quote properly, the breakdown matters. This guide shows how electricians can split the job into sensible parts that clients understand.",
        key_takeaways=[
            "A clearer breakdown helps the client understand why a board change costs what it does.",
            "Materials, labour, testing, certification, and likely remedials should each be considered rather than bundled blindly.",
            "The more uncertain the existing installation is, the more important it becomes to explain assumptions and exclusions clearly.",
            "A breakdown is also useful internally because it shows whether the labour and margin really make sense.",
            "Good breakdowns make it easier to convert the quote into the final job and invoice without rewriting everything later.",
        ],
        sections=[
            {
                "id": "materials",
                "heading": "Materials",
                "paragraphs": [
                    "Materials are more than the metal board itself. Protective devices, blanks, SPD parts, labels, tails, glands, tails upgrades, and sundries all add up.",
                    "If you are pricing a premium RCBO board, the device selection can shift the whole job margin more than people expect.",
                ],
            },
            {
                "id": "labour",
                "heading": "Labour",
                "paragraphs": [
                    "Labour covers isolation, removal, fitting the new board, reconnecting circuits, identifying poor wiring, and the time needed to leave the board neat and fully labelled.",
                    "Allow enough time for older boards where circuit identification, conductor preparation, or layout correction will take longer than a clean new install.",
                ],
            },
            {
                "id": "testing-and-paperwork",
                "heading": "Testing, certification, and notification",
                "paragraphs": [
                    "Testing and paperwork are part of the price, not an afterthought. The board change needs full verification, the right certificate, and the notification path where required.",
                    "This is often the part underpriced by electricians who focus on the hardware and forget the admin that makes the job complete.",
                ],
            },
            {
                "id": "allowances-and-remedials",
                "heading": "Allowances, exclusions, and likely remedials",
                "paragraphs": [
                    "Older installations often reveal loose terminations, poor bonding, damaged accessories, or circuit issues only once testing begins. Your breakdown should make it clear whether those are included or separately chargeable.",
                    "Clients usually accept sensible variation items more easily when the original quote already explained that older installations may need additional corrective work.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Should I show labour and materials separately?",
                "answer": "Often yes. It helps the client understand the quote and helps you see whether the job still has enough margin once the work is done.",
            },
            {
                "question": "Do clients need to see testing and certification in the price?",
                "answer": "They do not always need a separate line, but it should be included and explained somewhere so the job scope is clear.",
            },
            {
                "question": "What if I am not sure what remedials will appear?",
                "answer": "Price the known scope clearly and state the likely variation areas up front so you are not cornered later.",
            },
            {
                "question": "Does a better quote breakdown help win jobs?",
                "answer": "Yes. A clear breakdown usually looks more professional and gives the client confidence that the electrician understands the full job.",
            },
            {
                "question": "Can I turn the breakdown straight into an invoice later?",
                "answer": "Yes, and that is one reason structured quoting tools save time once the job is underway.",
            },
        ],
    ),
    make_pricing_page(
        component_name="ConsumerUnitUpgradeLabourAndMaterialsPage",
        page_path="/guides/consumer-unit-upgrade-labour-and-materials",
        page_label="Consumer Unit Upgrade Labour and Materials",
        page_title="Consumer Unit Upgrade Labour and Materials | UK Electrician Pricing",
        page_description="Consumer unit upgrade labour and materials guide. Practical breakdown for electricians on what to allow for board hardware, protective devices, testing time, and the real labour involved.",
        hero_title="Consumer Unit Upgrade Labour and Materials",
        hero_highlight="Labour and Materials",
        hero_subtitle="This page is for the practical pricing side of the job: what hardware usually goes in, where the labour time really goes, and how to avoid underpricing the install.",
        key_takeaways=[
            "Board changes are often underpriced because labour is judged only on fitting time rather than the full testing and finishing process.",
            "RCBOs, SPD parts, tails, and sundries all affect the materials figure more than many quick estimates allow for.",
            "Older properties can add labour through relabelling, fault finding, or correcting poor existing terminations.",
            "A proper labour allowance leaves enough room to test, certify, and leave the board professionally finished.",
            "Material choice and labour quality together shape whether the job is profitable and whether the client sees value in the quote.",
        ],
        sections=[
            {
                "id": "materials-list",
                "heading": "What usually sits inside the materials figure",
                "paragraphs": [
                    "The materials figure should cover the board, protective devices, surge protection where included, labels, blanks, tails-related items, and the smaller sundries that make the install finish properly.",
                    "If you are upgrading to a cleaner RCBO layout, make sure the quote reflects the actual device choice rather than a cheaper placeholder figure.",
                ],
            },
            {
                "id": "real-labour-time",
                "heading": "Where the labour time really goes",
                "paragraphs": [
                    "The visible swap is only part of the labour. The real time often disappears into circuit identification, conductor preparation, testing, paperwork, and client handover.",
                    "This is why a rushed board change can look profitable on paper but actually lose money once the full day is counted honestly.",
                ],
            },
            {
                "id": "older-installations",
                "heading": "Older installations change both labour and materials",
                "paragraphs": [
                    "Older domestic boards often bring extra time for mixed cable colours, weak labelling, poor conductor condition, and protective device arrangements that no longer make sense.",
                    "In those cases, the labour figure should reflect more than a simple changeover because the board work becomes part install, part investigation.",
                ],
            },
            {
                "id": "quoting-cleanly",
                "heading": "Quote it cleanly so the job can be delivered cleanly",
                "paragraphs": [
                    "A clear [consumer unit regulations](/guides/consumer-unit-regulations) reference point, a proper [EIC certificate](/eic-certificate) path, and a structured [quote](/tools/electrical-quoting-app) make the whole job easier to deliver.",
                    "That is better for the electrician and better for the client, because there is less confusion about what is included once the board is open and the testing begins.",
                ],
            },
        ],
        faqs=[
            {
                "question": "What do electricians most often miss in the materials list?",
                "answer": "Sundries, SPD-related parts, tails-related items, and the real cost difference between device configurations are common misses.",
            },
            {
                "question": "What do electricians most often miss in the labour figure?",
                "answer": "Testing, certificate completion, relabelling, and dealing with messy existing wiring are the common labour misses.",
            },
            {
                "question": "Why do older boards take longer than expected?",
                "answer": "Because the install often needs more identification, correction, and testing than the original quick estimate assumed.",
            },
            {
                "question": "Should I price premium devices differently from budget boards?",
                "answer": "Yes. The device selection changes both the materials cost and the value proposition of the finished board.",
            },
            {
                "question": "How do I stop board changes becoming low-margin jobs?",
                "answer": "Price the labour honestly, include the real materials, and avoid treating testing and paperwork like free extras.",
            },
        ],
    ),
    make_property_page(
        component_name="VictorianTerraceElectricalRequirementsPage",
        page_path="/guides/victorian-terrace-electrical-requirements",
        page_label="Victorian Terrace Electrical Requirements",
        page_title="Victorian Terrace Electrical Requirements | Electrician Guide",
        page_description="Guide to electrical requirements in Victorian terraces. Covers common wiring issues, older layouts, consumer unit expectations, testing priorities, and what electricians should look for before quoting.",
        hero_title="Victorian Terrace Electrical Requirements",
        hero_highlight="Victorian Terrace",
        hero_subtitle="Victorian terraces can look straightforward from the outside but often hide layered alterations, limited routes, and older wiring history. This guide covers the electrical points worth checking before you quote or start work.",
        key_takeaways=[
            "Victorian terraces often contain mixed-age wiring, limited cable routes, and a history of piecemeal alterations.",
            "Before quoting, check the board, earthing, bonding, circuit layout, and any signs of old extensions or attic conversions being tied in badly.",
            "Access and making-good can shape the job as much as the electrical work itself in older terraces.",
            "Testing and investigation often need to be priced in early because assumptions can fall apart once circuits are opened up.",
            "A clear survey and quote help the client understand why older properties are rarely fixed-price jobs with no variation risk.",
        ],
        sections=[
            {
                "id": "what-you-often-find",
                "heading": "What you often find in Victorian terraces",
                "paragraphs": [
                    "Victorian terraces often contain a mixture of original layouts, later extensions, upgraded consumer units, and circuits altered over many years by different installers.",
                    "It is common to find awkward routes, borrowed neutrals, outdated bonding, and older accessory positions that no longer suit how the property is used.",
                ],
            },
            {
                "id": "survey-priorities",
                "heading": "What to check before you quote",
                "paragraphs": [
                    "Start with the [consumer unit](/guides/consumer-unit-regulations), earthing arrangement, bonding, and the visible condition of accessories and wiring routes.",
                    "Check whether later alterations such as kitchens, loft conversions, or garden rooms have been tied into the installation properly or simply added onto what was already there.",
                ],
                "bullets": [
                    "Board age and protective device arrangement.",
                    "Bonding and earthing condition.",
                    "Evidence of mixed wiring ages or poor extensions.",
                    "Access constraints that will affect first fix or rewire work.",
                ],
            },
            {
                "id": "special-considerations",
                "heading": "Special considerations in older terrace work",
                "paragraphs": [
                    "Older plaster, solid walls, narrow voids, and limited underfloor access can all increase labour and making-good requirements.",
                    "That is why it is important to separate the electrical scope from the access and finish assumptions in the quote instead of presenting the whole job as one simple number.",
                ],
            },
            {
                "id": "from-survey-to-job",
                "heading": "Move from survey into testing, quotes, and paperwork cleanly",
                "paragraphs": [
                    "If the property needs deeper investigation, an [EICR certificate](/tools/eicr-certificate) gives you a cleaner route into recorded findings and coded defects.",
                    "If it is moving toward a rewire or board change, use the [quoting app](/tools/electrical-quoting-app) so the client gets a clearer breakdown of the likely work and unknowns.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Why are Victorian terrace jobs harder to price?",
                "answer": "Because access, hidden alterations, mixed-age wiring, and making-good can all affect the labour more than the visible electrical scope suggests.",
            },
            {
                "question": "Should I recommend an EICR before quoting larger work?",
                "answer": "Often yes, especially where the installation history is unclear or the client is trying to avoid surprises on a larger job.",
            },
            {
                "question": "Are board changes common in Victorian terraces?",
                "answer": "Yes, but they often uncover wider issues with bonding, circuit layout, or older wiring that need to be addressed as part of the job.",
            },
            {
                "question": "What is the biggest quoting risk in older terraces?",
                "answer": "Assuming the visible part of the job tells the full story. In older properties, the hidden routes and previous alterations often change the scope.",
            },
            {
                "question": "Can one platform help with the survey and the follow-on work?",
                "answer": "Yes. That is useful because the survey notes, testing, quote, and final paperwork can stay connected rather than living in separate systems.",
            },
        ],
    ),
    make_property_page(
        component_name="VictorianTerraceRewireGuidePage",
        page_path="/guides/victorian-terrace-rewire-guide",
        page_label="Victorian Terrace Rewire Guide",
        page_title="Victorian Terrace Rewire Guide | Electrician Guide",
        page_description="Victorian terrace rewire guide for electricians and property owners. Covers survey priorities, access issues, first-fix planning, common defects, testing, certification, and quoting older terrace rewires properly.",
        hero_title="Victorian Terrace Rewire Guide",
        hero_highlight="Rewire Guide",
        hero_subtitle="Rewiring a Victorian terrace is rarely just about replacing cables. The layout, finishes, access, and previous alterations all shape the job. This guide focuses on the parts that usually matter most on site.",
        key_takeaways=[
            "A Victorian terrace rewire needs careful survey work before the first quote is issued.",
            "Access, making-good, and previous alterations often shape the programme more than the cable installation alone.",
            "First-fix planning matters because routes can be tight and later changes are expensive once finishes are disturbed.",
            "Testing and certification should be treated as part of the rewire plan from day one, not a final admin task.",
            "A good rewire quote explains assumptions, exclusions, and the effect of older building fabric on the work.",
        ],
        sections=[
            {
                "id": "survey-before-price",
                "heading": "Survey before you set the final price",
                "paragraphs": [
                    "A proper survey should look at the existing board, visible wiring condition, earthing and bonding, socket and lighting demand, and how any rear extensions or loft works have been integrated.",
                    "In older terraces, the hidden parts of the job are often what determine whether the quote was realistic.",
                ],
            },
            {
                "id": "first-fix-planning",
                "heading": "First-fix planning matters more than people think",
                "paragraphs": [
                    "Route planning, accessory positions, vertical and horizontal runs, and access through floors, stairs, and loft areas need to be thought through early.",
                    "A rushed first fix in an older terrace often leads to awkward second-fix decisions, extra damage, or cable routes that look untidy once the job is finished.",
                ],
            },
            {
                "id": "common-site-risks",
                "heading": "Common site risks during a terrace rewire",
                "bullets": [
                    "Unknown junctions and mixed-age additions hidden in floors or ceilings.",
                    "Limited underfloor or loft access increasing labour time.",
                    "Older plaster and finishes that make damage control more important.",
                    "Later kitchens, bathrooms, or loft conversions that do not follow the original terrace layout cleanly.",
                ],
            },
            {
                "id": "testing-certification-and-handover",
                "heading": "Testing, certification, and handover",
                "paragraphs": [
                    "A full rewire should move into structured testing, clear circuit schedules, and the right [EIC certificate](/eic-certificate) without the paperwork becoming an afterthought.",
                    "Using [Elec-Mate](/tools/digital-certificates-app) for the certificate, the [calculator suite](/tools/electrical-testing-calculators), and the [quoting workflow](/tools/electrical-quoting-app) keeps the whole job cleaner from survey to handover.",
                ],
            },
        ],
        faqs=[
            {
                "question": "Why do rewires in Victorian terraces vary so much in cost?",
                "answer": "Because access, layout, making-good, previous alterations, and the actual condition of the installation can vary dramatically between properties that look similar from the outside.",
            },
            {
                "question": "Should I split the quote into stages?",
                "answer": "Often yes. It can help separate survey work, first fix, second fix, testing, and any variation risk in a way the client understands.",
            },
            {
                "question": "What should I test before committing to a full rewire price?",
                "answer": "Where possible, check the existing earthing, bonding, board arrangement, and enough of the visible circuit condition to understand whether the property has deeper issues than the client expects.",
            },
            {
                "question": "Do older terraces often need board upgrades as part of a rewire?",
                "answer": "Yes. In practice a rewire and a compliant modern board arrangement usually travel together unless the board is already suitable and recent.",
            },
            {
                "question": "What makes the handover smoother on a rewire?",
                "answer": "Clear schedules, clean labelling, proper certification, and a quote structure that already matched the actual scope of the work.",
            },
        ],
    ),
]


TEMPLATE = """import {{ GeneratedGuidePage, type GeneratedGuidePageConfig }} from '@/pages/seo/generated/GeneratedGuidePage';

const PAGE_PATH = {page_path};
const PAGE_TITLE = {page_title};
const PAGE_DESCRIPTION = {page_description};

const config: GeneratedGuidePageConfig = {{
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  pagePath: PAGE_PATH,
{config_body}
}};

export default function {component_name}() {{
  return <GeneratedGuidePage config={{config}} />;
}}
"""


def to_ts_object(data: dict) -> str:
    raw = json.dumps(data, indent=2, ensure_ascii=False)
    lines = raw.splitlines()
    inner = lines[1:-1]
    return "\n".join(f"  {line}" for line in inner)


def write_pages() -> None:
    for page in PAGES:
        file_path = PAGES_DIR / f"{page['componentName']}.tsx"
        rendered = TEMPLATE.format(
            page_path=json.dumps(page["pagePath"]),
            page_title=json.dumps(page["pageTitle"]),
            page_description=json.dumps(page["pageDescription"]),
            config_body=to_ts_object(page["config"]),
            component_name=page["componentName"],
        )
        file_path.write_text(rendered + "\n")
        print(f"Wrote {file_path.relative_to(ROOT)}")


if __name__ == "__main__":
    write_pages()
