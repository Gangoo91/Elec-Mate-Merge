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

## Section A: Client Details (continued)

```html
<!-- Occupier (if different from client) -->
<span class="inline-value">{{ installation_details.occupier }}</span>
<!-- Also available as flat: {{ occupier }} -->
```

---

## Section B/C: Installation Details

```html
<!-- Installation Address -->
<input type="text" value="{{ installation_details.address }}" />

<!-- Premises Type (was 'description') -->
<span class="inline-value">{{ installation_details.premises_type }}</span>
<!-- When "other": {{ installation_details.other_premises_description }} -->
<!-- Also available as flat: {{ premises_type }}, {{ other_premises_description }} -->

<!-- Estimated Age -->
<span class="inline-value">{{ installation_details.estimated_age }} {{ installation_details.age_unit }}</span>

<!-- Evidence of Alterations (yes / no / not-apparent) -->
{% if installation_details.evidence_of_alterations == 'yes' %}✓{% endif %}
{% if installation_details.evidence_of_alterations == 'not-apparent' %}✓ Not Apparent{% endif %}

<!-- Alterations Details -->
<span class="inline-value wide">{{ installation_details.alterations_details }}</span>

<!-- Estimated Age of Alterations -->
<span class="inline-value">{{ installation_details.alterations_age }}</span>
<!-- Also available as flat: {{ alterations_age }} -->

<!-- Date of Last Inspection -->
<span class="inline-value">{{ installation_details.date_of_last_inspection }}</span>

<!-- Installation Records Available (Reg 651.1) -->
{% if installation_details.installation_records_available == 'yes' %}✓ Yes{% else %}✗ No{% endif %}
<!-- Also available as flat: {{ installation_records_available }} -->
```

---

## Section D: Extent and Limitations

```html
<!-- Agreed With -->
<span class="inline-value">{{ installation_details.agreed_with }}</span>
<!-- Also available as flat: {{ agreed_with }} -->

<!-- Purpose of Inspection -->
<span class="inline-value wide">{{ installation_details.purpose_of_inspection }}</span>

<!-- BS 7671 Amendment Edition -->
<span class="inline-value">{{ installation_details.bs_amendment }}</span>
<!-- Values: "amd1-2020" or "amd2-2022" -->
<!-- Also available as flat: {{ bs_amendment }} -->

<!-- Date of Inspection -->
<span class="inline-value">{{ installation_details.test_date }}</span>

<!-- Recommended Interval -->
<span class="inline-value">{{ installation_details.inspection_interval }} years</span>

<!-- Reasons for Recommended Interval -->
<span class="inline-value wide">{{ installation_details.interval_reasons }}</span>
<!-- Also available as flat: {{ interval_reasons }} -->

<!-- Next Inspection Due -->
<span class="inline-value">{{ installation_details.next_inspection_date }}</span>

<!-- Extent -->
<span class="inline-value wide">{{ installation_details.extent_of_inspection }}</span>

<!-- Limitations -->
<span class="inline-value wide">{{ installation_details.limitations_of_inspection }}</span>

<!-- Operational Limitations -->
<span class="inline-value wide">{{ installation_details.operational_limitations }}</span>
<!-- Also available as flat: {{ operational_limitations }} -->
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
<!-- AC/DC Indicator -->
<span class="inline-value">{{ supply_characteristics.supply_ac_dc }}</span>
<!-- Values: "ac" or "dc". Also available as flat: {{ supply_ac_dc }} -->

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

<!-- Conductor Configuration (Wire Count) -->
<span class="inline-value">{{ supply_characteristics.conductor_configuration }}</span>
<!-- Values: "2-wire", "3-wire", "4-wire". Also available as flat: {{ conductor_configuration }} -->

<!-- External Ze (Ω) -->
<span class="inline-value">{{ supply_characteristics.external_ze }} Ω</span>
<!-- Also available as flat: {{ external_ze }} -->

<!-- Prospective Fault Current Ipf at Origin (kA) -->
<span class="inline-value">{{ supply_characteristics.prospective_fault_current }} kA</span>
<!-- Also available as flat: {{ prospective_fault_current }} -->

<!-- Confirmation of Supply Polarity -->
{% if supply_characteristics.supply_polarity_confirmed %}✓{% endif %}
<!-- Also available as flat: {{ supply_polarity_confirmed }} -->

<!-- Other Sources of Supply -->
<span class="inline-value wide">{{ supply_characteristics.other_sources_of_supply }}</span>
<!-- Also available as flat: {{ other_sources_of_supply }} -->

<!-- Main Protective Device -->
<div class="data-field-value">{{ main_protective_device.device_type }}</div>

<!-- Main Switch Rating -->
<div class="data-field-value">{{ main_protective_device.main_switch_rating }} A</div>

<!-- Main Switch Poles -->
<span class="inline-value">{{ main_protective_device.main_switch_poles }}P</span>
<!-- Also available as flat: {{ main_switch_poles }} -->

<!-- Main Switch Voltage Rating -->
<span class="inline-value">{{ main_protective_device.main_switch_voltage_rating }} V</span>
<!-- Also available as flat: {{ main_switch_voltage_rating }} -->

<!-- Fuse/Device Rating or Setting -->
<span class="inline-value">{{ main_protective_device.fuse_device_rating }} A</span>
<!-- Also available as flat: {{ fuse_device_rating }} -->

<!-- RCD Rated Time Delay (ms) -->
<span class="inline-value">{{ rcd_details.rcd_time_delay }} ms</span>
<!-- Values: "0" (Instantaneous), "40", "150", "200", "300", "500". Also available as flat: {{ rcd_time_delay }} -->

<!-- RCD Measured Operating Time (ms) -->
<span class="inline-value">{{ rcd_details.rcd_measured_time }} ms</span>
<!-- Also available as flat: {{ rcd_measured_time }} -->
```

---

## Section G: Earthing & Main Protective Bonding

```html
<!-- Means of Earthing: Distributor's Facility -->
{% if earthing_bonding.means_of_earthing_distributor %}✓{% endif %}
<!-- Also available as flat: {{ means_of_earthing_distributor }} -->

<!-- Means of Earthing: Installation Earth Electrode -->
{% if earthing_bonding.means_of_earthing_electrode %}✓{% endif %}
<!-- Also available as flat: {{ means_of_earthing_electrode }} -->

<!-- Main Bonding Size -->
<span class="inline-value">{{ earthing_bonding.main_bonding_size }}mm²</span>

<!-- Compliance -->
<span class="inline-value">{{ earthing_bonding.bonding_compliance }}</span>

<!-- Supplementary Bonding Size -->
<span class="inline-value">{{ earthing_bonding.supplementary_bonding_size }}mm²</span>

<!-- Main Bonding Locations -->
<span class="inline-value wide">{{ earthing_bonding.main_bonding_locations }}</span>

<!-- Earthing Conductor Connection/Continuity Verified -->
{% if earthing_bonding.earthing_conductor_continuity_verified %}✓{% endif %}
<!-- Also available as flat: {{ earthing_conductor_continuity_verified }} -->

<!-- Bonding Conductor Connection/Continuity Verified -->
{% if earthing_bonding.bonding_conductor_continuity_verified %}✓{% endif %}
<!-- Also available as flat: {{ bonding_conductor_continuity_verified }} -->
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

The template uses **flat variables** for each inspection item (not a loop), since PDFMonkey requires pre-defined variable names. Columns: Acc, N/A, C1/C2, C3, FI, N/V, LIM.

```html
<!-- Header row (9 columns) -->
<tr>
    <th>Item</th>
    <th>Description</th>
    <th>Acc</th>
    <th>N/A</th>
    <th>C1/C2</th>
    <th>C3</th>
    <th>FI</th>
    <th>N/V</th>
    <th>LIM</th>
</tr>

<!-- Each inspection item uses flat variables: insp_{item}_{column} -->
<!-- Example for item 1.0: -->
<tr>
    <td>1.0</td>
    <td>Service cable, Service head, Earthing arrangement...</td>
    <td>{{ insp_1_0_acc }}</td>
    <td>{{ insp_1_0_na }}</td>
    <td>{{ insp_1_0_c1c2 }}</td>
    <td>{{ insp_1_0_c3 }}</td>
    <td>{{ insp_1_0_fi }}</td>
    <td>{{ insp_1_0_nv }}</td>
    <td>{{ insp_1_0_lim }}</td>
</tr>

<!-- Section header rows use colspan="9" -->
<tr class="section-header-row"><td colspan="9">1.0 INTAKE EQUIPMENT</td></tr>
```

The `inspection_checklist` array is also available for alternative loop-based rendering:

```html
{% for item in inspection_checklist %}
<tr>
    <td class="item-num">{{ item.item_number }}</td>
    <td class="item-desc">{{ item.description }}</td>
    <td class="outcome">{% if item.outcome == 'satisfactory' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'not-applicable' %}✓{% endif %}</td>
    <td class="outcome-text">{% if item.outcome == 'C1' or item.outcome == 'C2' %}{{ item.outcome }}{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'C3' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'FI' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'not-verified' %}✓{% endif %}</td>
    <td class="outcome">{% if item.outcome == 'limitation' %}✓{% endif %}</td>
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

## Multi-Board Schedule of Test Results (Recommended)

For installations with multiple distribution boards, use `boards_with_schedules` to render a separate test schedule table per board, each with its own SPD checkboxes and board metadata:

```html
{% for board in boards_with_schedules %}
<div class="board-schedule">
  <h3>{{ board.db_reference }} - {{ board.db_location }}{% if board.supplied_from %} | Supplied from: {{ board.supplied_from }}{% endif %}</h3>
  <div class="board-meta">
    <span>Manufacturer: {{ board.db_manufacturer }}</span>
    <span>Type: {{ board.db_type }}</span>
    <span>Ways: {{ board.db_ways }}</span>
    <span>Zdb: {{ board.db_zdb }} Ω</span>
    <span>Ipf: {{ board.db_ipf }} kA</span>
  </div>

  <!-- Incoming Protective Device (distribution circuit OCPD) -->
  {% if board.incoming_device_type %}
  <div class="incoming-device-row">
    <span>Incoming Device: BS EN {{ board.incoming_device_bs_en }} {{ board.incoming_device_type }} {{ board.incoming_device_rating }}A</span>
  </div>
  {% endif %}

  <!-- SPD T1/T2/T3 checkboxes per board -->
  <div class="spd-row">
    <span>SPD:</span>
    {% if board.spd_t1 %}<span class="spd-check">T1 ✓</span>{% endif %}
    {% if board.spd_t2 %}<span class="spd-check">T2 ✓</span>{% endif %}
    {% if board.spd_t3 %}<span class="spd-check">T3 ✓</span>{% endif %}
    {% if board.spd_na %}<span class="spd-check">N/A ✓</span>{% endif %}
    {% if board.spd_operational %}<span class="spd-check">Operational ✓</span>{% endif %}
  </div>

  <!-- Main switch for this board -->
  <div class="main-switch-row">
    <span>Main Switch: {{ board.main_switch_type }} {{ board.main_switch_rating }}A {{ board.main_switch_poles }}P</span>
    <span>BS EN: {{ board.main_switch_bs_en }}</span>
  </div>

  <!-- Polarity / Phase Sequence -->
  <div class="verification-row">
    {% if board.polarity_confirmed %}<span>Polarity ✓</span>{% endif %}
    {% if board.phase_sequence_confirmed %}<span>Phase Sequence ✓</span>{% endif %}
  </div>

  <!-- Circuit table for this board -->
  <table>
    <thead>...</thead>
    <tbody>
    {% for circuit in board.circuits %}
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
    </tbody>
  </table>
</div>
{% endfor %}
```

> **Note:** The flat `schedule_of_tests` array is still available for backward compatibility (all circuits in one flat list).

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

<!-- Flat top-level alternatives (same data, accessible without nesting) -->
<!-- {{ test_instrument_make }} -->
<!-- {{ test_instrument_serial }} -->
<!-- {{ calibration_date }} -->
<!-- {{ test_method }} -->
<!-- {{ test_voltage }} -->
<!-- {{ test_notes }} -->
<!-- {{ test_temperature }} -->
```

---

## Section K: Observations Summary

```html
<!-- No Remedial Action Required checkbox -->
{% if no_remedial_action %}✓ No remedial action is required{% endif %}

<!-- Inspection/Test Schedule Counts -->
<span>Inspection Schedules: {{ inspection_schedule_count }}</span>
<span>Test Result Schedules: {{ test_schedule_count }}</span>
```

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
  "installation_details": {
    "address": "...", "test_date": "...",
    "occupier": "...", "premises_type": "...", "other_premises_description": "...",
    "alterations_age": "...", "installation_records_available": "yes|no",
    "agreed_with": "...", "operational_limitations": "...",
    "bs_amendment": "amd1-2020|amd2-2022", "interval_reasons": "...",
    ...
  },
  "supply_characteristics": {
    "supply_voltage": "...", "earthing_arrangement": "...",
    "supply_ac_dc": "ac|dc", "conductor_configuration": "2-wire|3-wire|4-wire",
    "external_ze": "...", "prospective_fault_current": "...",
    "supply_polarity_confirmed": true, "other_sources_of_supply": "...",
    ...
  },
  "main_protective_device": {
    "device_type": "...", "main_switch_poles": "...",
    "main_switch_voltage_rating": "...", "fuse_device_rating": "...",
    ...
  },
  "rcd_details": { "rcd_time_delay": "...", "rcd_measured_time": "..." },
  "distribution_board": { "board_location": "...", "board_manufacturer": "...", ... },
  "earthing_bonding": {
    "main_bonding_size": "...",
    "means_of_earthing_distributor": true, "means_of_earthing_electrode": false,
    "earthing_conductor_continuity_verified": true, "bonding_conductor_continuity_verified": true,
    ...
  },
  "cables": { "tails_size": "...", ... },
  "inspection_checklist": [
    { "id": "...", "item_number": "1.0", "description": "...", "outcome": "satisfactory", "notes": "" },
    ...
  ],
  "schedule_of_tests": [
    { "circuit_number": "1", "circuit_description": "...", "protective_device_type": "MCB", ... },
    ...
  ],
  "boards_with_schedules": [
    {
      "db_reference": "Main DB",
      "db_location": "Hallway",
      "db_manufacturer": "Hager",
      "db_type": "Split load",
      "db_ways": "12",
      "db_zdb": "0.35",
      "db_ipf": "16",
      "polarity_confirmed": true,
      "phase_sequence_confirmed": false,
      "spd_operational": true,
      "spd_na": false,
      "spd_t1": false,
      "spd_t2": true,
      "spd_t3": false,
      "main_switch_bs_en": "BS EN 60898",
      "main_switch_type": "MCB",
      "main_switch_rating": "100",
      "main_switch_poles": "2",
      "supplied_from": "Main CU",
      "incoming_device_bs_en": "60898",
      "incoming_device_type": "MCB",
      "incoming_device_rating": "63",
      "circuit_count": 6,
      "circuits": [
        { "circuit_number": "1", "circuit_description": "Lighting", ... },
        ...
      ]
    },
    ...
  ],
  "test_instrument_details": { "make_model": "...", "serial_number": "...", ... },
  "test_method": "...",
  "test_voltage": "...",
  "test_notes": "...",
  "test_temperature": "...",
  "test_instrument_make": "...",
  "test_instrument_serial": "...",
  "calibration_date": "...",
  "main_switch_rating": "...",
  "breaking_capacity": "...",
  "service_entry": "...",
  "distribution_board_verification": { "zdb": "...", "ipf": "...", "spd_t1": false, "spd_t2": true, "spd_t3": false, ... },
  "inspector": { "name": "...", "qualifications": "...", "signature": "data:image/png;base64,..." },
  "declarations": {
    "overall_assessment": "satisfactory",
    "inspected_by": { "name": "...", "signature": "...", ... },
    "report_authorised_by": { "name": "...", "signature": "...", ... }
  },
  "company_details": { "company_name": "...", "company_address": "...", ... },
  "no_remedial_action": false,
  "inspection_schedule_count": 1,
  "test_schedule_count": 2,
  "observations": [
    { "description": "...", "defect_code": "C2", "recommendation": "..." },
    ...
  ],

  "// Flat inspection variables (one per item per column)": "",
  "insp_1_0_acc": "✓", "insp_1_0_na": "", "insp_1_0_c1c2": "", "insp_1_0_c3": "", "insp_1_0_fi": "", "insp_1_0_nv": "", "insp_1_0_lim": "",
  "// ... (continues for all inspection items 1.0 through 8.0)": "",

  "// Flat top-level copies of all new fields": "",
  "occupier": "...", "premises_type": "...", "other_premises_description": "...",
  "alterations_age": "...", "installation_records_available": "...",
  "agreed_with": "...", "operational_limitations": "...", "bs_amendment": "...", "interval_reasons": "...",
  "supply_ac_dc": "ac", "conductor_configuration": "2-wire", "external_ze": "...", "prospective_fault_current": "...",
  "supply_polarity_confirmed": true, "other_sources_of_supply": "...",
  "main_switch_poles": "...", "main_switch_voltage_rating": "...", "fuse_device_rating": "...",
  "rcd_time_delay": "...", "rcd_measured_time": "...",
  "means_of_earthing_distributor": true, "means_of_earthing_electrode": false,
  "earthing_conductor_continuity_verified": true, "bonding_conductor_continuity_verified": true
}
```

## Notes

- **Cable sizes**: The `stripUnit()` helper strips `mm` suffixes from stored values (e.g., `"25mm"` becomes `"25"`). This prevents the PDF template from rendering `25mmmm²` when it appends `mm²`. Affected fields: `intake_cable_size`, `tails_size`, and composite conductor strings.
- **Multi-board**: `boards_with_schedules` groups circuits by `boardId`. The flat `schedule_of_tests` array remains for backward compatibility.
- **SPD per board**: Each entry in `boards_with_schedules` includes `spd_t1`, `spd_t2`, `spd_t3`, `spd_na`, and `spd_operational` for per-board SPD display.
- **Incoming device per board**: Each board in `boards_with_schedules` includes `supplied_from`, `incoming_device_bs_en`, `incoming_device_type`, and `incoming_device_rating` for the distribution circuit OCPD.
- **FI column**: The inspection schedule now includes an FI (Further Investigation) column between C3 and N/V. Each item has an `_fi` flat variable (e.g., `insp_1_0_fi`).
- **Flat variables**: All new fields are available both nested (e.g., `installation_details.occupier`) and as flat top-level keys (e.g., `occupier`) for maximum template flexibility.
