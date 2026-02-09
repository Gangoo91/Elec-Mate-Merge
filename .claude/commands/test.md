Run the test suite.

Usage: /test [options]

Steps:

1. If `$ARGUMENTS` is empty, run `npm run test` (all Playwright tests)
2. If `$ARGUMENTS` contains a file path, run `npx playwright test $ARGUMENTS`
3. If `$ARGUMENTS` is "ui", run `npm run test:ui`
4. If `$ARGUMENTS` is "headed", run `npm run test:headed`
5. Report results: passed, failed, skipped
6. For failures, read the test file and the tested component to diagnose the issue
7. Suggest fixes for any failing tests
