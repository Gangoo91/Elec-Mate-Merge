# PDFMonkey G6 template additions (ELE-1397)

Template: **FA G6 Periodic Inspection** — ID `24C2EA56-CDC8-4777-AD17-7B1764AC0C2D`.

The payload already carries these fields (deployed 2026-07-26/27); the template
just needs sections to render them. Paste the blocks below wherever they fit
the existing layout — suggested positions noted per block. Styling classes
should be copied from the template's existing section markup.

## 1. Sampling detail — after the existing devices-tested counts

```liquid
{% if all_devices_tested_12mo_display != "" %}
  <p><strong>12-month cycle:</strong> {{ all_devices_tested_12mo_display }}</p>
{% endif %}

{% if has_sampled_devices %}
  <h4>Devices tested this visit</h4>
  <table>
    <thead>
      <tr><th>Device ref</th><th>Zone</th><th>Result</th></tr>
    </thead>
    <tbody>
      {% for d in sampled_devices %}
        <tr>
          <td>{{ d.ref }}</td>
          <td>{{ d.zone }}</td>
          <td>{{ d.result | capitalize }}</td>
        </tr>
      {% endfor %}
    </tbody>
  </table>
{% endif %}

{% if devices_not_tested_reason != "" %}
  <p><strong>Devices not tested — reason:</strong> {{ devices_not_tested_reason }}</p>
{% endif %}
```

## 2. Service history — new section near the false-alarm records

```liquid
{% if has_service_history %}
  <h4>Maintenance since last inspection</h4>
  <p style="white-space: pre-line;">{{ service_history_summary }}</p>
  {% if linked_log_book %}
    <p class="small">Drawn from the building's digital log book (BS 5839-1:2025 Clause 48.2).</p>
  {% endif %}
{% endif %}
```

## 3. Plan & cause-and-effect references — with the system details

```liquid
{% if zone_plan_ref != "" or cause_effect_ref != "" %}
  <table>
    {% if zone_plan_ref != "" %}
      <tr>
        <td>Zone plan reference</td>
        <td>{{ zone_plan_ref }}{% if zone_plan_verified %} — present at panel and checked against CIE{% endif %}</td>
      </tr>
    {% endif %}
    {% if cause_effect_ref != "" %}
      <tr>
        <td>Cause &amp; effect reference</td>
        <td>{{ cause_effect_ref }}{% if cause_effect_verified %} — operation verified this inspection{% endif %}</td>
      </tr>
    {% endif %}
  </table>
{% endif %}
```

## 4. Edition check

Confirm the header/footer prints `{{ standard_edition }}` (payload default is
`BS 5839-1:2025`) rather than a hardcoded 2017 string.
