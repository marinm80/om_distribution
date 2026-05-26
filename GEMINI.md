# Project Instructions: OM Distribution

## Agent Configuration
To optimize performance and quality, the following model assignments are established for this project:

- **Gemini 2.0 Flash:** Used for information gathering, research, and routing agents.
  - `codebase_investigator`
  - `cli_help`
  - `team-manager`
  - `scope-guardian`
- **Gemini 1.5 Pro:** Used for reasoning, planning, code writing, and documentation agents.
  - Main Agent (Gemini CLI)
  - `code-implementer`
  - `code-reviewer`
  - `plan-builder`
  - `readme-curator`
  - `spec-definer`
  - `task-decomposer`
  - `tech-advisor`
  - `generalist`

These settings are enforced in `.gemini/settings.json`.
