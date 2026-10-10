# Sign in with Microsoft for colleges (ELE-1971): setup

The app side is built. The Microsoft button stays hidden until the Azure provider is switched on in Supabase, so nothing changes for users until you finish the steps below.

## What is already live

- **Database (applied 10 Oct 2026):** `college_sso_domains` table and these functions: `college_sso_add_domain`, `college_sso_remove_domain`, `sso_domain_enabled`, `sso_claim_my_college`. Migration: `supabase/migrations/20261010154000_college_sso_domains_ele1971.sql`.
- **College settings → Security and access:** the college admin adds their domains here, with an optional Microsoft tenant ID that pins sign-in to their own organisation.
- **Sign-in page:** a "Sign in with Microsoft" button. It appears on the web only, and only once the provider is on.
- **`/auth/microsoft`:** the return page. It exchanges the code, links the person to their college if the college already listed them, then sends staff to `/college` and learners to `/apprentice/college-plan`.

## Rules the server enforces

- A domain never grants a role on its own. It links only:
  - staff on the college's staff list (an unlinked `college_staff` row with exactly that email);
  - learners on the roster (an unlinked `college_students` row with exactly that email).
- The email must come from a Microsoft (`azure`) identity that Microsoft marks as verified. Microsoft only does this when the organisation owns the domain (the `xms_edov` claim). An unverified email links nothing.
- If the college sets its tenant ID, sign-ins from any other Microsoft organisation are refused (`wrong_tenant`).
- The following domains are refused: personal ones (outlook.com, hotmail, live, gmail, yahoo, icloud and similar) and every `*.onmicrosoft.com`.
- One college per domain.
- Every add, remove and link is written to the college's activity log.
- Email and password stay available, so an apprentice's personal account still belongs to them after they leave.

## Andrew: step by step

### 1. Register the app in Microsoft Entra (about 10 minutes)

1. Go to https://entra.microsoft.com and sign in with the Elec-Mate Microsoft account.
2. Open **Identity → Applications → App registrations → New registration**.
3. Fill in the form:
   - **Name:** `Elec-Mate`
   - **Supported account types:** *Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant)*. Leave personal Microsoft accounts out: colleges use work accounts.
   - **Redirect URI:** platform **Web**, value `https://jtwygbeceundfgnkirof.supabase.co/auth/v1/callback`
4. Click **Register**. Copy the **Application (client) ID**.
5. Open **Certificates & secrets → New client secret**. Name it `Supabase` and set it to expire in 24 months. Copy the secret **Value** now, because it is shown only once. Put a reminder in the calendar to renew it before it expires.
6. Open **Token configuration → Add optional claim → ID** and tick **email**, **xms_edov** and **tid**. If prompted, accept "Turn on the Microsoft Graph email permission".
7. Open **API permissions** and check that `openid`, `profile`, `email`, `offline_access` and `User.Read` (all delegated) are listed. Admin consent is not needed for these. Some colleges' IT teams require their own admin consent for any third-party app; their IT admin grants that from the consent prompt on the first sign-in.
8. Open **Branding & properties** and set:
   - **Home page:** `https://elec-mate.com`
   - **Terms of service:** the Terms URL
   - **Privacy statement:** the Privacy URL
   - Add the logo.
   Optionally, complete **publisher verification** with the company's Microsoft Partner ID. Without it, college users see an "unverified" label on the consent screen.

### 2. Turn on the provider in Supabase (about 2 minutes)

1. Go to https://supabase.com/dashboard/project/jtwygbeceundfgnkirof/auth/providers and open **Azure**.
2. Turn it on and fill in:
   - **Application (client) ID:** from step 1.4
   - **Secret value:** from step 1.5
   - **Azure Tenant URL:** leave it blank, or use `https://login.microsoftonline.com/organizations`. Do not put a single college's tenant here: each college can pin its own tenant in College settings.
3. Save.
4. Open **Authentication → URL Configuration** and add these to **Redirect URLs**:
   - `https://elec-mate.com/auth/microsoft`
   - `https://www.elec-mate.com/auth/microsoft`
   - `http://localhost:8080/auth/microsoft` (for testing)

### 3. Check it works (about 5 minutes)

1. In the Northgate demo college, open **College settings → Security and access** as the college admin and add a test domain you control.
2. Add a staff row for a Microsoft work account on that domain (People → Staff, with exactly that email).
3. Sign out, open `/auth/signin`, and click **Sign in with Microsoft**. You should land on `/college` as that staff member.
4. Try the same with an address that is not on the list. You should see "hasn't added you yet" and no role.
5. Run `npx playwright test -c playwright.college.config.ts e2e/college/49-microsoft-sso.spec.ts`. The spec checks the rules on the live database with rolled-back fixtures.

## Native app (not done yet)

The button is hidden in the iOS and Android apps for now. To add it there:

1. Add a deep link such as `com.elecmate.app://auth/microsoft` to the redirect URLs in Supabase, to the Capacitor iOS `Info.plist` URL types, and to the Android intent filter.
2. Open the OAuth URL from `signInWithOAuth({ options: { skipBrowserRedirect: true } })` in `@capacitor/browser`.
3. Use an `App.addListener('appUrlOpen')` handler to call `exchangeCodeForSession` and route as `/auth/microsoft` does.

## Next: Google sign-in

DfE's cloud solution standard asks for "one centrally managed login" per user. Some colleges run Google Workspace instead of Microsoft 365. To add it:

1. Add `'google'` to the `college_sso_domains.provider` check.
2. Add a `google` branch in `sso_claim_my_college`, using the identity's `hd` (hosted domain) claim in place of the tenant ID.
3. Add a "Sign in with Google" button that, like the Microsoft one, only shows when the provider is on.
