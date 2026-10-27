# Project Instructions

These instructions apply to all tasks in this workspace. Use them when answering questions about the project and when planning, implementing, reviewing, or validating changes.

## Project Structure

Use the following React structure as the default organizational guide. Adapt it to the existing codebase rather than moving files or creating empty folders without a task that needs them.

- `public/`: Static files served as-is.
- `src/assets/`: Imported images, icons, and fonts.
- `src/components/`: Shared components; put foundational design-system components in `src/components/ui/`.
- `src/features/<feature>/`: Feature-specific code. Keep its components, hooks, and API services together in `components/`, `hooks/`, and `services/`; place its main view or feature entry point alongside those folders.
- `src/hooks/`: Reusable hooks shared across features.
- `src/layouts/`: Shared application shells and page layouts.
- `src/pages/`: Route-level views that compose layouts and features.
- `src/services/`: Shared API clients, SDK setup, and cross-feature service configuration.
- `src/store/`: Application-wide state management, using the approach already present in the project.
- `src/styles/`: Global styles, theme, and styling configuration.
- `src/utils/`: Reusable helpers, formatters, and constants.
- `src/App.jsx`: Main application component and route composition, if that matches the app setup.
- `src/main.jsx`: Browser entry point and DOM mounting, if that matches the app setup.

## Working Practices

- Inspect the existing files, dependencies, and scripts before making assumptions; preserve established patterns and avoid unnecessary restructuring.
- Keep feature-only logic inside its feature. Promote code to shared folders only when it is genuinely reused across features.
- Prefer small, accessible, reusable React components and clear component boundaries.
- Reuse the project's existing routing, styling, API, and state-management choices. Do not introduce a library or architectural layer without a concrete need.
- Make focused changes that satisfy the request; do not generate the full suggested folder tree or unrelated boilerplate by default.
- For code changes, run the most relevant available checks from `package.json` (such as tests, lint, or build) and report any checks that could not be run.
