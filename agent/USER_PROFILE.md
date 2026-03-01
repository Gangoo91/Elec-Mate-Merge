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
- **Avatar:** {{avatar_url}}

---

## Company Details

- **Company address:** {{company_address}}
- **Company postcode:** {{company_postcode}}
- **Company phone:** {{company_phone}}
- **Company email:** {{company_email}}
- **Company website:** {{company_website}}
- **Company registration:** {{company_registration}} <!-- Companies House number if Ltd -->
- **Business type:** {{business_type}} <!-- Sole trader, Ltd company, Partnership -->
- **VAT registered:** {{vat_registered}} <!-- true/false -->
- **VAT number:** {{vat_number}}
- **VAT rate:** {{vat_rate}} <!-- default: 20 -->
- **UTR number:** {{utr_number}} <!-- for self-assessment -->
- **Currency:** {{currency}} <!-- default: GBP -->
- **Locale:** {{locale}} <!-- default: en-GB -->
- **Logo URL:** {{logo_url}} <!-- for PDF generation on quotes/invoices/certs -->

---

## Banking & Payments

- **Bank name:** {{bank_name}}
- **Account name:** {{bank_account_name}}
- **Account number:** {{bank_account_number}}
- **Sort code:** {{bank_sort_code}}
- **Preferred payment method:** {{preferred_payment_method}} <!-- bank transfer / card / cash / Stripe -->
- **Stripe Connect status:** {{stripe_account_status}} <!-- not_connected / pending / active / restricted -->
- **Stripe account ID:** {{stripe_account_id}}

---

## Qualifications & Accreditation

- **Qualification level:** {{qualification_level}} <!-- Level 3, Qualified, etc. -->
- **Years qualified:** {{years_qualified}}
- **Accreditation scheme:** {{scheme}} <!-- NICEIC, NAPIT, ELECSA, STROMA, BRE, None -->
- **Scheme number:** {{scheme_number}}
- **Registration expiry:** {{registration_expiry}}
- **Part P registered:** {{part_p}} <!-- true/false -->
- **Specialisms:** {{specialisms}} <!-- e.g., EV charging, solar PV, fire alarm, etc. -->
- **ECS card type:** {{ecs_card_type}} <!-- Gold, Blue, Black, White, Green, Red -->
- **ECS card number:** {{ecs_card_number}}
- **ECS card expiry:** {{ecs_card_expiry}}

---

## Inspector Details (for Certificates)

- **Inspector name:** {{inspector_name}} <!-- name printed on certificates -->
- **Inspector qualifications:** {{inspector_qualifications}} <!-- array of qualifications for cert headers -->
- **Signature data:** {{has_signature}} <!-- true/false — whether digital signature is set up -->

---

## Insurance

- **Insurance provider:** {{insurance_provider}}
- **Insurance policy number:** {{insurance_policy_number}}
- **Insurance coverage:** {{insurance_coverage}} <!-- £1M, £2M, £5M, £10M -->
- **Insurance expiry:** {{insurance_expiry}}

---

## Worker Rates

Default rates used when generating quotes, invoices, and cost estimates:

- **Electrician rate:** £{{rate_electrician}}/hr <!-- default: 45 -->
- **Apprentice rate:** £{{rate_apprentice}}/hr <!-- default: 25 -->
- **Labourer rate:** £{{rate_labourer}}/hr <!-- default: 20 -->
- **Designer rate:** £{{rate_designer}}/hr <!-- default: 65 -->
- **Owner rate:** £{{rate_owner}}/hr <!-- default: 75 -->
- **Overhead percentage:** {{overhead_percentage}}% <!-- applied to cost calculations -->
- **Profit margin:** {{profit_margin}}% <!-- applied to quote pricing -->

---

## Standard Job Rates

- **Hourly rate:** £{{hourly_rate}}
- **Day rate:** £{{day_rate}}
- **Call-out charge:** £{{callout_charge}}
- **EICR (3-bed):** £{{eicr_3bed}}
- **Consumer unit upgrade:** £{{cu_upgrade}}
- **Payment terms:** {{payment_terms}} days <!-- default: 14 -->
- **Preferred supplier:** {{preferred_supplier}} <!-- CEF, Screwfix, Edmundson, etc. -->

---

## Testing Instruments

Array of registered testing instruments (used for calibration reminders and certificate generation):

```
{{testing_instruments}}
<!-- Array of: { instrument_type, make, model, serial_number, calibration_date, calibration_due } -->
<!-- instrument_type: multifunction | insulation | loop_impedance | rcd | pat | clamp_meter | other -->
<!-- make: Fluke, Megger, Kewtech, etc. -->
```

---

## Quote Settings

- **Quote validity:** {{quote_validity_days}} days <!-- default: 30 -->
- **Deposit required:** {{deposit_percentage}}% <!-- default: 30 -->
- **Warranty period:** {{warranty_period}} <!-- default: "12 months" -->
- **Default quote terms:** {{quote_terms}} <!-- JSON: selected term IDs + custom terms -->

---

## Invoice Settings

- **Invoice display:** {{invoice_display}} <!-- summary / itemised -->
- **CIS deductions enabled:** {{cis_enabled}} <!-- true/false -->
- **CIS deduction rate:** {{cis_rate}}% <!-- 20% or 30% -->
- **Default invoice terms:** {{invoice_terms}} <!-- JSON: selected term IDs -->
- **Payment terms text:** {{payment_terms_text}} <!-- freetext shown on invoice -->

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

## Connected Integrations

- **WhatsApp:** {{whatsapp_status}} <!-- connected / not connected -->
- **WhatsApp number:** {{whatsapp_number}}
- **Google Calendar:** {{google_calendar_status}}
- **Xero:** {{xero_status}}
- **QuickBooks:** {{quickbooks_status}}
- **Open Banking:** {{open_banking_status}}
- **DocuSign:** {{docusign_status}} <!-- connected / not connected -->
- **Accounting software:** {{accounting_software}} <!-- Xero / QuickBooks / Sage / FreeAgent / None -->
- **Gmail:** {{gmail_status}} <!-- connected / not connected -->
- **Outlook:** {{outlook_status}} <!-- connected / not connected -->

---

## Communication Preferences

- **Cert delivery format:** {{cert_format}} <!-- PDF attachment / app link -->
- **Invoice delivery:** {{invoice_delivery}} <!-- WhatsApp / email / both -->
- **Chase invoices automatically:** {{auto_chase}} <!-- true/false — default false during beta -->
- **Briefing enabled:** {{briefing_enabled}} <!-- true/false -->
- **Weekly digest enabled:** {{digest_enabled}} <!-- true/false -->
- **Default certificate type:** {{default_cert_type}} <!-- eicr / eic / minor_works / domestic_eic -->

---

## Notification Preferences

- **Push notifications enabled:** {{push_enabled}} <!-- true/false -->
- **Email updates:** {{email_updates_enabled}} <!-- true/false -->
- **Mentor messages:** {{mentor_messages_enabled}} <!-- true/false -->
- **Course completion alerts:** {{course_completion_alerts}} <!-- true/false -->
- **Expiry alerts:** {{expiry_alerts_enabled}} <!-- true/false -->
- **Billing alerts:** {{billing_alerts_enabled}} <!-- true/false -->
- **Mute all:** {{mute_all_notifications}} <!-- true/false -->

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
- **AI suggestions enabled:** {{ai_suggestions_enabled}} <!-- true/false -->
- **Voice assistant enabled:** {{voice_assistant_enabled}} <!-- true/false -->

---

## Elec-ID

- **Elec-ID number:** {{elec_id_number}}
- **Elec-ID activated:** {{elec_id_activated}} <!-- true/false -->
- **Verification tier:** {{verification_tier}} <!-- basic / verified / premium -->
- **Elec-ID verified:** {{elec_id_verified}} <!-- true/false -->
- **Elec-ID opt out:** {{elec_id_opt_out}} <!-- true/false -->

---

## Role-Specific: Apprentice

Only populated when `role: 'apprentice'`:

- **Apprentice year:** {{apprentice_year}} <!-- 1, 2, 3, 4 -->
- **Apprentice level:** {{apprentice_level}} <!-- Level 2, Level 3, Level 3 + AM2 -->
- **Training provider:** {{training_provider}}
- **Supervisor name:** {{supervisor_name}}
- **ECS card status:** {{ecs_card_status}}

---

## Role-Specific: Electrician

Only populated when `role: 'electrician'`:

- **Job title:** {{job_title}} <!-- Electrician, Approved Electrician, Site Manager, etc. -->
- **Specialisation:** {{specialisation}} <!-- Domestic, Commercial, Industrial, Solar, EV, Fire Alarm, Data, Hazardous -->
- **Years experience:** {{years_experience}}

---

## Role-Specific: Employer

Only populated when `role: 'employer'`:

- **Business position:** {{business_position}} <!-- Director, Managing Director, Owner, Operations Manager, Office Manager -->
- **Company size:** {{company_size}} <!-- 1-5, 6-20, 21-50, 50+ -->

---

## Notes

- This file is auto-generated. Manual edits will be overwritten on next sync.
- The agent reads this file on startup to understand the user's context.
- Template variables ({{...}}) are replaced during provisioning from the user's Supabase profile.
- If a field is empty or unknown, the agent should ask the electrician during the first conversation.
- Fields marked with defaults will use the default if the user hasn't set a preference.
- Banking details are read-only for the agent — never modified via conversation.
- Testing instruments array is read from `inspector_profiles` and used for calibration reminders.

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
- [ ] Quote validity period
- [ ] Deposit percentage
- [ ] Warranty period

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
| Version            | 3.0.0      |
| Template variables | 110+       |
| Last updated       | 2026-03-01 |
