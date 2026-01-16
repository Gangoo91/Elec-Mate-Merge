# PDFMonkey EICR Template Variable Mapping

This document shows how to update your PDFMonkey HTML template to use dynamic variables from the JSON payload.

## Template Syntax

PDFMonkey uses **Liquid template** syntax:
- `{{ variable }}` - Output a value
- `{% for item in array %}...{% endfor %}` - Loop through arrays
- `{% if condition %}...{% endif %}` - Conditionals

---

## Section A: Client Details

Replace static values with:

```html
<!-- Client Name -->
<input type="text" value="{{ client_details.client_name }}" />

<!-- Client Address -->
<input type="text" value="{{ client_details.client_address }}" />

<!-- Client Phone -->
<input type="text" value="{{ client_details.client_phone }}" />

<!-- Client Email -->
<input type="text" value="{{ client_details.client_email }}" />
```

---

## Section B: Installation Details

```html
<!-- Installation Address -->
<input type="text" value="{{ installation_details.address }}" />

<!-- Description/Premises Type -->
<span class="inline-value">{{ installation_details.description }}</span>

<!-- Estimated Age -->
<span class="inline-value">{{ installation_details.estimated_age }} {{ installation_details.age_unit }}</span>

<!-- Evidence of Alterations -->
{% if installation_details.evidence_of_alterations == 'yes' %}✓{% endif %}

<!-- Alterations Details -->
<span class="inline-value wide">{{ installation_details.alterations_details }}</span>

<!-- Date of Last Inspection -->
<span class="inline-value">{{ installation_details.date_of_last_inspection }}</span>
```

---

## Section D: Extent and Limitations

```html
<!-- Purpose of Inspection -->
<span class="inline-value wide">{{ installation_details.purpose_of_inspection }}</span>

<!-- Date of Inspection -->
<span class="inline-value">{{ installation_details.test_date }}</span>

<!-- Recommended Interval -->
<span class="inline-value">{{ installation_details.inspection_interval }} years</span>

<!-- Next Inspection Due -->
<span class="inline-value">{{ installation_details.next_inspection_date }}</span>

<!-- Extent -->
<span class="inline-value wide">{{ installation_details.extent_of_inspection }}</span>

<!-- Limitations -->
<span class="inline-value wide">{{ installation_details.limitations_of_inspection }}</span>
```

---

## Section E: Overall Assessment

```html
<!-- Satisfactory checkbox -->
{% if declarations.overall_assessment == 'satisfactory' %}✓{% endif %}

<!-- Unsatisfactory checkbox -->
{% if declarations.overall_assessment == 'unsatisfactory' %}✓{% endif %}
```

---

## Section F: Supply Characteristics

```html
<!-- System Type checkboxes -->
{% if supply_characteristics.earthing_arrangement == 'TN-C' %}✓{% endif %}
{% if supply_characteristics.earthing_arrangement == 'TN-S' %}✓{% endif %}
{% if supply_characteristics.earthing_arrangement == 'TN-C-S' %}✓{% endif %}
{% if supply_characteristics.earthing_arrangement == 'TT' %}✓{% endif %}

<!-- Supply PME -->
<div class="data-field-value">{{ supply_characteristics.supply_pme }}</div>

<!-- DNO -->
<div class="data-field-value">{{ supply_characteristics.dno_name }}</div>

<!-- Voltage -->
<div class="data-field-value">{{ supply_characteristics.supply_voltage }} V</div>

<!-- Frequency -->
<div class="data-field-value">{{ supply_characteristics.supply_frequency }} Hz</div>

<!-- Phases -->
<div class="data-field-value">{{ supply_characteristics.phases }}</div>

<!-- Main Protective Device -->
<div class="data-field-value">{{ main_protective_device.device_type }}</div>

<!-- Main Switch Rating -->
<div class="data-field-value">{{ main_protective_device.main_switch_rating }} A</div>
```

---

## Section G: Main Protective Bonding

```html
<!-- Main Bonding Size -->
<span class="inline-value">{{ earthing_bonding.main_bonding_size }}mm²</span>

<!-- Compliance -->
<span class="inline-value">{{ earthing_bonding.bonding_compliance }}</span>

<!-- Supplementary Bonding Size -->
<span class="inline-value">{{ earthing_bonding.supplementary_bonding_size }}mm²</span>

<!-- Main Bonding Locations -->
<span class="inline-value wide">{{ earthing_bonding.main_bonding_locations }}</span>
```

---

## Section H: Distribution Board

```html
<!-- Board Designation -->
<span class="board-card-badge">{{ distribution_board.board_designation }}</span>

<!-- Location -->
<span class="inline-value">{{ distribution_board.board_location }}</span>

<!-- Manufacturer -->
<span class="inline-value">{{ distribution_board.board_manufacturer }}</span>

<!-- Type -->
<span class="inline-value">{{ distribution_board.board_type }}</span>

<!-- Ways -->
<span class="inline-value">{{ distribution_board.board_size }}</span>

<!-- Zdb -->
<span class="inline-value">{{ distribution_board_verification.zdb }}</span>

<!-- Ipf -->
<span class="inline-value">{{ distribution_board_verification.ipf }}</span>

<!-- Polarity Confirmed -->
{% if distribution_board_verification.confirmed_correct_polarity %}✓{% endif %}

<!-- SPD Operational -->
{% if distribution_board_verification.spd_operational_status %}✓{% endif %}
```

---

## Cables

```html
<!-- Meter Tails Size -->
<span class="inline-value">{{ cables.tails_size }}mm²</span>

<!-- Tails Length -->
<span class="inline-value">{{ cables.tails_length }}</span>

<!-- Main Earth Conductor -->
<span class="inline-value">{{ earthing_bonding.main_earthing_conductor }}</span>
```

---

## Schedule of Inspection (Checklist)

Use a loop for inspection items:

```html
{% for item in inspection_checklist %}
<tr>
    <td class="item-num">{{ item.item_number }}</td>
    <td class="item-desc">{{ item.description }}</td>
    <td class="outcome">{% if item.outcome == 'satisfactory' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'not-applicable' %}✓{% endif %}</td>
    <td class="outcome-text">{% if item.outcome == 'C1' or item.outcome == 'C2' %}{{ item.outcome }}{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'C3' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'N/V' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'LIM' %}✓{% endif %}</td>
</tr>
{% endfor %}
```

---

## Schedule of Test Results (Circuits)

Use a loop for circuits:

```html
{% for circuit in schedule_of_tests %}
<tr>
    <td>{{ circuit.circuit_number }}</td>
    <td colspan="3" class="desc">{{ circuit.circuit_description }}</td>
    <td>{{ circuit.type_of_wiring }}</td>
    <td>{{ circuit.reference_method }}</td>
    <td>{{ circuit.points_served }}</td>
    <td>{{ circuit.live_size }}</td>
    <td>{{ circuit.cpc_size }}</td>
    <td>{{ circuit.bs_standard }}</td>
    <td>{{ circuit.protective_device_type }}</td>
    <td>{{ circuit.protective_device_rating }}</td>
    <td>{{ circuit.protective_device_ka_rating }}</td>
    <td>{{ circuit.max_zs }}</td>
    <td>{{ circuit.rcd_bs_standard }}</td>
    <td>{{ circuit.rcd_type }}</td>
    <td>{{ circuit.rcd_rating }}</td>
    <td>{{ circuit.rcd_rating_a }}</td>
    <td>{{ circuit.ring_r1 }}</td>
    <td>{{ circuit.ring_rn }}</td>
    <td>{{ circuit.ring_r2 }}</td>
    <td>{{ circuit.r1r2 }}</td>
    <td>{{ circuit.r2 }}</td>
    <td>{{ circuit.insulation_test_voltage }}</td>
    <td>{{ circuit.insulation_live_neutral }}</td>
    <td>{{ circuit.insulation_live_earth }}</td>
    <td>{% if circuit.polarity == 'correct' or circuit.polarity == 'Correct' %}✓{% else %}{{ circuit.polarity }}{% endif %}</td>
    <td>{{ circuit.zs }}</td>
    <td>{{ circuit.rcd_one_x }}</td>
    <td>{% if circuit.rcd_test_button == 'pass' or circuit.rcd_test_button == 'Pass' %}✓{% endif %}</td>
    <td>{{ circuit.afdd_test }}</td>
    <td class="remarks">{{ circuit.notes }}</td>
</tr>
{% endfor %}
```

---

## Test Instrument Details

```html
<!-- Make/Model -->
<span class="inline-value wide">{{ test_instrument_details.make_model }}</span>

<!-- Serial Number -->
<span class="inline-value">{{ test_instrument_details.serial_number }}</span>

<!-- Calibration Date -->
<span class="inline-value">{{ test_instrument_details.calibration_date }}</span>

<!-- Temperature -->
<span class="inline-value">{{ test_instrument_details.test_temperature }}°C</span>
```

---

## Observations Summary

Loop through observations:

```html
{% for obs in observations %}
<div class="observations-row">
    <div class="observations-text">{{ obs.description }}</div>
    <div class="observations-code code-{{ obs.defect_code | downcase }}">{{ obs.defect_code }}</div>
</div>
{% endfor %}
```

---

## Signatures

```html
<!-- Inspector Name -->
<span class="sig-field-value">{{ inspector.name }}</span>

<!-- Inspector Qualifications -->
<span class="inline-value wide">{{ inspector.qualifications }}</span>

<!-- Inspector Company -->
<span class="inline-value wide">{{ company_details.company_name }}</span>

<!-- Inspection Date -->
<span class="inline-value">{{ inspector.date }}</span>

<!-- Inspected By Name -->
<span class="sig-field-value">{{ declarations.inspected_by.name }}</span>

<!-- Inspected By Signature (base64 image) -->
{% if declarations.inspected_by.signature %}
<img src="{{ declarations.inspected_by.signature }}" style="max-height: 30px;" />
{% endif %}

<!-- Inspected By For/On Behalf Of -->
<span class="sig-field-value">{{ declarations.inspected_by.for_on_behalf_of }}</span>

<!-- Inspected By Position -->
<span class="sig-field-value">{{ declarations.inspected_by.position }}</span>

<!-- Inspected By Address -->
<span class="sig-field-value">{{ declarations.inspected_by.address }}</span>

<!-- CP Scheme -->
<span class="sig-field-value">{{ declarations.inspected_by.cp_scheme }}</span>

<!-- Report Authorised By Name -->
<span class="sig-field-value">{{ declarations.report_authorised_by.name }}</span>

<!-- Report Authorised By Date -->
<span class="sig-field-value">{{ declarations.report_authorised_by.date }}</span>

<!-- Report Authorised By Signature -->
{% if declarations.report_authorised_by.signature %}
<img src="{{ declarations.report_authorised_by.signature }}" style="max-height: 30px;" />
{% endif %}

<!-- Membership Number -->
<span class="sig-field-value">{{ declarations.report_authorised_by.membership_no }}</span>
```

---

## Certificate Number & Metadata

```html
<!-- Certificate Number -->
<div class="cert-number">{{ metadata.certificate_number }}</div>

<!-- Company Name -->
<div class="company-name">{{ company_details.company_name }}</div>
```

---

## Final Assessment Box

```html
<div class="final-assessment-option {% if declarations.overall_assessment == 'satisfactory' %}satisfactory-selected{% endif %}">
    {% if declarations.overall_assessment == 'satisfactory' %}✓{% endif %}
    <span class="option-label satisfactory-label">SATISFACTORY</span>
</div>
<div class="final-assessment-option {% if declarations.overall_assessment == 'unsatisfactory' %}unsatisfactory-selected{% endif %}">
    {% if declarations.overall_assessment == 'unsatisfactory' %}✓{% endif %}
    <span class="option-label unsatisfactory-label">UNSATISFACTORY</span>
</div>
```

---

## JSON Structure Reference

The app sends this structure to PDFMonkey:

```json
{
  "metadata": { "certificate_number": "..." },
  "client_details": { "client_name": "...", "client_address": "...", ... },
  "installation_details": { "address": "...", "test_date": "...", ... },
  "supply_characteristics": { "supply_voltage": "...", "earthing_arrangement": "...", ... },
  "main_protective_device": { "device_type": "...", ... },
  "distribution_board": { "board_location": "...", "board_manufacturer": "...", ... },
  "earthing_bonding": { "main_bonding_size": "...", ... },
  "cables": { "tails_size": "...", ... },
  "inspection_checklist": [
    { "id": "...", "item_number": "1.0", "description": "...", "outcome": "satisfactory", "notes": "" },
    ...
  ],
  "schedule_of_tests": [
    { "circuit_number": "1", "circuit_description": "...", "protective_device_type": "MCB", ... },
    ...
  ],
  "test_instrument_details": { "make_model": "...", "serial_number": "...", ... },
  "distribution_board_verification": { "zdb": "...", "ipf": "...", ... },
  "inspector": { "name": "...", "qualifications": "...", "signature": "data:image/png;base64,..." },
  "declarations": {
    "overall_assessment": "satisfactory",
    "inspected_by": { "name": "...", "signature": "...", ... },
    "report_authorised_by": { "name": "...", "signature": "...", ... }
  },
  "company_details": { "company_name": "...", "company_address": "...", ... },
  "observations": [
    { "description": "...", "defect_code": "C2", "recommendation": "..." },
    ...
  ]
}
```
