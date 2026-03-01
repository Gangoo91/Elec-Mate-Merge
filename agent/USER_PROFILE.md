# USER_PROFILE.md — Per-User Agent Configuration

> This file is generated during provisioning and populated with the electrician's data from Supabase. It gives the agent immediate context about who it's working for. Updated automatically when profile data changes.

---

## User

- **Name:** {{user_name}}
- **Business name:** {{business_name}}
- **User ID:** {{user_id}}
- **Email:** {{email}}
- **Phone:** {{phone}}
- **Location:** {{city}}, {{region}}
- **Role:** {{role}} <!-- electrician | apprentice | employer | college -->

---

## Qualifications & Accreditation

- **Qualification level:** {{qualification_level}} <!-- Level 3, Qualified, etc. -->
- **Years qualified:** {{years_qualified}}
- **Accreditation scheme:** {{scheme}} <!-- NICEIC, NAPIT, ELECSA, STROMA, BRE, None -->
- **Scheme number:** {{scheme_number}}
- **Part P registered:** {{part_p}} <!-- true/false -->
- **Specialisms:** {{specialisms}} <!-- e.g., EV charging, solar PV, fire alarm, etc. -->

---

## Business Details

- **Business type:** {{business_type}} <!-- Sole trader, Ltd company, Partnership -->
- **Company number:** {{company_number}} <!-- if Ltd -->
- **VAT registered:** {{vat_registered}} <!-- true/false -->
- **VAT number:** {{vat_number}}
- **UTR number:** {{utr_number}} <!-- for self-assessment -->
- **Insurance provider:** {{insurance_provider}}
- **Insurance expiry:** {{insurance_expiry}}

---

## Working Preferences

- **Working days:** {{working_days}} <!-- e.g., Mon-Fri, Mon-Sat -->
- **Working hours:** {{start_time}} — {{end_time}}
- **Briefing time:** {{briefing_time}} <!-- default: 07:30 -->
- **Digest day:** {{digest_day}} <!-- default: Sunday -->
- **Digest time:** {{digest_time}} <!-- default: 18:00 -->
- **Service area:** {{service_area}} <!-- e.g., "20 mile radius of Wolverhampton" -->
- **EPA date:** {{epa_date}} <!-- for apprentices — End-Point Assessment date -->
- **AM2 date:** {{am2_date}} <!-- for apprentices — AM2 practical assessment date -->

---

## Standard Rates

These are the electrician's default rates, used when generating quotes and invoices unless overridden:

- **Hourly rate:** £{{hourly_rate}}
- **Day rate:** £{{day_rate}}
- **Call-out charge:** £{{callout_charge}}
- **EICR (3-bed):** £{{eicr_3bed}}
- **Consumer unit upgrade:** £{{cu_upgrade}}
- **Payment terms:** {{payment_terms}} days <!-- default: 14 -->
- **Preferred supplier:** {{preferred_supplier}} <!-- CEF, Screwfix, Edmundson, etc. -->

---

## Connected Integrations

- **WhatsApp:** {{whatsapp_status}} <!-- connected / not connected -->
- **WhatsApp number:** {{whatsapp_number}}
- **Google Calendar:** {{google_calendar_status}}
- **Xero:** {{xero_status}}
- **QuickBooks:** {{quickbooks_status}}
- **Open Banking:** {{open_banking_status}}
- **DocuSign:** {{docusign_status}} <!-- connected / not connected -->
- **Accounting software:** {{accounting_software}} <!-- Xero / QuickBooks / None -->

---

## Communication Preferences

- **Cert delivery format:** {{cert_format}} <!-- PDF attachment / app link -->
- **Invoice delivery:** {{invoice_delivery}} <!-- WhatsApp / email / both -->
- **Chase invoices automatically:** {{auto_chase}} <!-- true/false — default false during beta -->
- **Briefing enabled:** {{briefing_enabled}} <!-- true/false -->
- **Weekly digest enabled:** {{digest_enabled}} <!-- true/false -->

---

## Agent Settings

- **Agent status:** {{agent_status}} <!-- active / paused / deprovisioned -->
- **Provisioned at:** {{provisioned_at}}
- **Last active:** {{last_active}}
- **Approval mode:** {{approval_mode}} <!-- strict (all approvals) / relaxed (auto-approve low-risk) -->
- **PIN hash:** {{pin_hash}} <!-- bcrypt hash of 4-digit PIN, stored in Supabase not here -->
- **Beta tester:** {{beta_tester}} <!-- true/false -->
- **Safety summary enabled:** {{safety_summary_enabled}} <!-- true/false — weekly safety summary via WhatsApp -->
- **Expense auto-sync:** {{expense_auto_sync}} <!-- true/false — auto-sync expenses to connected accounting software -->

---

## Notes

- This file is auto-generated. Manual edits will be overwritten on next sync.
- The agent reads this file on startup to understand the user's context.
- Template variables ({{...}}) are replaced during provisioning from the user's Supabase profile.
- If a field is empty or unknown, the agent should ask the electrician during the first conversation.
- Fields marked with defaults will use the default if the user hasn't set a preference.

---

## First Conversation Checklist

If any of these are missing after provisioning, the agent should ask during the first conversation:

- [ ] Standard EICR rate
- [ ] Standard CU upgrade rate
- [ ] Hourly/day rate
- [ ] Working days and hours
- [ ] Preferred supplier
- [ ] Service area
- [ ] Payment terms
- [ ] Cert delivery preference (PDF vs app link)

Ask naturally, not as a form:

```
"Before I get started, a few quick things so I can work the way you want:
What do you normally charge for a 3-bed EICR?
And what days do you usually work?"
```

---

## Version

| Field              | Value      |
| ------------------ | ---------- |
| Version            | 2.0.0      |
| Template variables | 48+        |
| Last updated       | 2026-03-01 |
