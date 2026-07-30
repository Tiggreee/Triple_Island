# Git Workflow

## Branches

- `main`: production release branch.
- `develop`: integration branch for validated tasks.
- `feature/<task>`: one explicit task per branch.
- `fix/<task-or-bug>`: focused fixes.

## Merge Rule

- Minimum one approval before merge into `develop`.
- No direct pushes to `main`.

## Commit Rule

- One commit per explicit task.
- Commit message format: `<TASK-ID>: <concrete action>`.

## Branch Protection (GitHub)

Configure on GitHub repository settings:

1. Protect `main`.
2. Require pull request before merging.
3. Require at least one approval.
4. Restrict direct pushes.
