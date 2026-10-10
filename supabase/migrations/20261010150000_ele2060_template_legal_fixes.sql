-- ELE-2060: product templates stated law that changed in 2026.
-- These are product templates (no firm data). employer_policies and contracts
-- (the adopted copies) both had 0 rows on 10 Oct 2026, so nothing downstream
-- carries the old wording. Each replace is guarded: if the old wording is not
-- there (already fixed) the row is left alone.
--
-- Sources (checked 10 Oct 2026):
--   SSP day one, no LEL, from 6 Apr 2026: gov.uk/statutory-sick-pay (what-youll-get,
--     eligibility); gov.uk ERA timeline update.
--   OTJ minimum = hours published on each standard, 187-hour floor: DfE
--     Apprenticeship funding rules 2026 to 2027 v3, rules 85 to 86.
--   BS 7671:2018+A4:2026 current; Chapter 46 isolation and switching: IET
--     electrical.theiet.org/bs-7671 and the bs7671_facets RAG.
--   "All reasonable steps" + third-party harassment duty from 30 Oct 2026:
--     gov.uk ERA timeline update; Equality Act 2010 s.40A (reasonable steps
--     since 26 Oct 2024).

begin;

-- 1. Full-Time Electrician Contract: SSP from the 4th day -> day one.
update public.employment_contract_templates
   set content = replace(content,
         'SSP is currently payable from the 4th consecutive day of sickness.',
         'Since 6 April 2026, SSP is payable from your first day of sickness absence, at the statutory weekly rate or 80% of your average weekly earnings, whichever is lower, for up to 28 weeks.'),
       version = '1.1'
 where name = 'Full-Time Electrician Contract'
   and content like '%SSP is currently payable from the 4th consecutive day of sickness.%';

-- 2. Zero Hours Contract: SSP earnings threshold removed.
update public.employment_contract_templates
   set content = replace(content,
         'if you meet the qualifying conditions, including average earnings over the threshold.',
         'if you meet the qualifying conditions. Since 6 April 2026 there is no minimum earnings requirement, and SSP is payable from your first day of sickness absence at the statutory weekly rate or 80% of your average weekly earnings, whichever is lower.'),
       version = '1.1'
 where name = 'Zero Hours Contract'
   and content like '%including average earnings over the threshold.%';

-- 3. Apprentice Employment Contract: "minimum 20% of working hours" OTJ.
update public.employment_contract_templates
   set content = replace(content,
         '(minimum 20% of working hours)',
         '(at least the minimum off-the-job hours published for your apprenticeship standard, in paid working time)'),
       version = '1.1'
 where name = 'Apprentice Employment Contract'
   and content like '%(minimum 20\% of working hours)%';

-- 4. Electrical Safety Policy: current BS 7671.
update public.employer_policy_templates
   set content = replace(content,
         'BS 7671:2018+A2:2022 (IET Wiring Regulations)',
         'BS 7671:2018+A4:2026 (IET Wiring Regulations)'),
       version = '2.1'
 where name = 'Electrical Safety Policy'
   and content like '%BS 7671:2018+A2:2022 (IET Wiring Regulations)%';

-- 5. Safe Isolation Policy: current BS 7671, and name the chapter.
update public.employer_policy_templates
   set content = replace(content,
         '<strong>BS 7671:2018+A2:2022</strong> - Isolation and switching requirements',
         '<strong>BS 7671:2018+A4:2026</strong> - Chapter 46: Isolation and switching'),
       version = '2.1'
 where name = 'Safe Isolation Policy'
   and content like '%<strong>BS 7671:2018+A2:2022</strong> - Isolation and switching requirements%';

-- 6. Anti-Harassment Policy: the "all reasonable steps" duty and the
--    third-party harassment duty (both from 30 Oct 2026).
update public.employer_policy_templates
   set content = replace(replace(replace(content,
         'It covers behaviour in the workplace, at work events, on social media where work-related, and during any work-related activity including travel.</p>',
         'It covers behaviour in the workplace, at work events, on social media where work-related, and during any work-related activity including travel. It also covers harassment of our staff by third parties, such as customers, clients, site visitors, members of the public and other contractors, including in customers'' homes and on site.</p>'),
         '<li><strong>Equality Act 2010</strong> - Harassment as a form of discrimination</li>',
         '<li><strong>Equality Act 2010</strong> - Harassment as a form of discrimination</li>
<li><strong>Equality Act 2010, section 40A</strong> - Duty on employers to take all reasonable steps to prevent sexual harassment of their employees (strengthened from "reasonable steps" by the Employment Rights Act 2025, from 30 October 2026)</li>
<li><strong>Employment Rights Act 2025</strong> - Duty on employers not to permit harassment of their employees by third parties (from 30 October 2026)</li>'),
         '<h3>7. Responsibilities</h3>',
         '<h3>6A. Preventing Sexual Harassment and Third-Party Harassment</h3>
<p>[Company Name] will take all reasonable steps to prevent sexual harassment of its employees, and will not permit employees to be harassed by third parties. In practice this means we will:</p>
<ul>
<li>Assess where harassment could happen in our work, including in customers'' homes, on shared sites and when working alone, and record what we will do about it</li>
<li>Train all staff, and managers and supervisors in more depth, on this policy and how to report concerns</li>
<li>Give a clear way to report harassment by anyone, including customers, clients, site visitors and other contractors, and act on every report</li>
<li>Where a third party is responsible, take action such as raising it with the customer or main contractor, changing who attends, supervising visits, or stopping work on the job where needed</li>
<li>Review these steps at least once a year and after any complaint</li>
</ul>

<h3>7. Responsibilities</h3>'),
       version = '2.1'
 where name = 'Anti-Harassment Policy'
   and content not like '%all reasonable steps to prevent sexual harassment%';

commit;
