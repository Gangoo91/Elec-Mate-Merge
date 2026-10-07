# College Hub demo accounts (ELE-1852 / ELE-1857)

Demo college: **Northgate Technical College** (`a1b2c3d4-e5f6-7890-abcd-ef1234567890`).

## Which account is which

| Role in the demo | Account | Notes |
| --- | --- | --- |
| Demo tutor | `founder+collegedemo-tutor@elec-mate.com` ("Demo Tutor (fixture)") | Tutor of **L2 Electrical 2025-A** and **L2 Electrical 2026-A (Sept intake)**. Credentials in `e2e/.auth/college-demo-tutor.json` (gitignored). |
| Demo learner | `founder+collegedemo-learner@elec-mate.com` ("Demo Learner (fixture)") | In **L2 Electrical 2026-A (Sept intake)**, tutored by the demo tutor, so nothing it does notifies a real person. |
| IQA + designated safeguarding lead | `founder+collegedemo-iqa@elec-mate.com` ("Priya Nair (fixture)") | No known password; reset it if you need to sign in. |
| Assessor for the L3 cohort | `founder+collegedemo-assessor@elec-mate.com` ("Owen Price (fixture)") | No known password. |
| 23 learners | `founder+collegedemo-<first>.<last>@elec-mate.com`, every name ends "(fixture)" | No known passwords. Free access, no subscription, hidden from leaderboards, marketing emails marked as sent. |

Andrew's own accounts (founder@, andrewgangoo91) and James Eccleson stay as they were, in "Year 2 — Sept 2026 intake". Demo with the fixture tutor, not with them.

The App Store review account (access@elec-mate.com) has Northgate on its profile but no staff row. Giving it one would send it to the College Hub at sign-in, instead of to the electrician app the App Store reviewer expects. That needs a decision before anyone changes it.

The join code **NTCY2DEMO** now puts new joiners in the fixture cohort.

## Refreshing before a demo

```bash
npm run college:seed-demo -- --reset     # delete the seeded rows and rebuild them, dated from today
npm run college:seed-demo -- --dry-run   # build it all in a transaction, print the counts, roll back
npm run college:seed-demo -- --delete    # remove the seeded rows only
npm run college:seed-demo -- --purge     # also remove the fixture accounts and restore relabelled rows
```

Every row the script writes is recorded in `public.demo_fixture_rows`, and `--reset` deletes only those rows. Notification triggers are switched off inside the transaction. Before it commits, the script checks that no bell, push or HTTP call was queued for anyone who is not a fixture account; if one was, the whole run rolls back.
