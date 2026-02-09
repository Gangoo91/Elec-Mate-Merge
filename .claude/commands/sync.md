Sync Capacitor builds for iOS and/or Android.

Usage: /sync [ios|android|all]

Steps:

1. Run `npm run build` first to create fresh dist/
2. If `$ARGUMENTS` is "ios": run `npx cap sync ios`
3. If `$ARGUMENTS` is "android": run `npx cap sync android`
4. If `$ARGUMENTS` is "all" or empty: run `npx cap sync`
5. Report what was synced and any warnings
6. If there are native plugin changes, mention they may need `npx cap update`
