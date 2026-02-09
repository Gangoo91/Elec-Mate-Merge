Create a pull request for the current branch.

Usage: /pr [title]

Steps:

1. Run `git status` and `git diff main...HEAD` to understand all changes
2. Run `git log main..HEAD --oneline` to see all commits
3. If on main branch, create a new branch first with a descriptive name
4. Push the branch to origin with `-u` flag
5. Draft a PR title (use `$ARGUMENTS` if provided, otherwise generate from commits)
6. Draft a PR body with:
   - ## Summary (3-5 bullet points covering ALL commits, not just the latest)
   - ## Test plan (checklist of what to test)
   - Footer: 🤖 Generated with [Claude Code](https://claude.com/claude-code)
7. Create the PR using `gh pr create`
8. Return the PR URL
