# Dependency maintenance

- Review the Dependabot alert queue and grouped update PRs weekly. Triage new critical and high alerts promptly, including those that affect build or test tooling.
- Review major upgrades individually. For transitive alerts, prefer updating or removing the dependency that introduces the vulnerable package.
- Verify dependency changes with `npm ci`, `npm run lint`, `npm test`, `npm pack --dry-run`, and `npm audit`. Confirm the corresponding GitHub alerts close after merging.
- If a fix is blocked, record the alert number, blocker, owner, and review date. Revisit the Mocha `glob` and `minimatch` overrides when Mocha adopts patched versions. Remove the overrides once the clean install, audit, and tests pass without them.
