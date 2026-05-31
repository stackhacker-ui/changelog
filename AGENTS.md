# AGENTS.md

## Project Shape

- This is a Nuxt 4 single-app template, not a monorepo. The app lives under `app/`.
- Main shell: `app/app.vue`; page entrypoint: `app/pages/index.vue`.
- The changelog repository is configured in `app/app.config.ts` as `repository: "nuxt/ui"`.
- Release data is fetched from `https://ungh.cc/repos/<owner>/<repo>/releases` in `app/composables/useChangelogReleases.ts` and rendered by `app/components/ChangelogTimeline.vue`.
- GitHub-flavored markdown links are resolved by `remark-github` in `nuxt.config.ts`; keep its `repository` option aligned with `app/app.config.ts` when changing the demo repository.

## Commands

- Install: `pnpm install` (`postinstall` runs `nuxt prepare`).
- Dev server: `pnpm dev`; for agent-run browser checks, prefer `pnpm dev --port 4000` or another free port in `4000-4100`.
- Verification order used by CI and PR template: `pnpm lint`, `pnpm typecheck`, `pnpm build`.
- There is no test script in this repo; do not invent one.
- If `.nuxt/` is missing or stale and lint/typecheck fail to load Nuxt-generated config, run `pnpm install` or `pnpm exec nuxt prepare` first.

## Tooling And UI Conventions

- Package manager is `pnpm@10.15.1`; CI runs on Node 22.
- shadcn-vue components live in `app/components/ui` per `components.json` and `nuxt.config.ts`.
- `components.json` includes the `@stackhacker-ui` registry at `https://ui.stackhacker.io/r/{name}.json`.
- Styling uses Tailwind CSS v4 through `@tailwindcss/vite`; prefer semantic tokens/classes already used in the app.
- Editor formatting is 2-space indentation, LF, final newline, and trimmed trailing whitespace.

## Browser And Deployment Checks

- Use `playwright-cli` for browser verification; do not use `chrome-devtools` for this repo's agent checks.
- Check both desktop and mobile for UI changes.
- Treat SSR hydration mismatches as publication blockers. Random or time-zone-dependent rendering must be deterministic on server and client.
- Existing examples: `app/components/SkyBg.vue` uses seeded deterministic stars; `app/utils/changelog.ts` formats dates with `timeZone: "UTC"`.
- Canonical public demo URL: `https://changelog-template.stackhacker.io/`.
- Cloudflare Pages build settings are `pnpm build` -> `dist` from GitHub `stackhacker-ui/changelog` on `main`.

## Boundaries

- Keep private planning, handoff, and agent research artifacts out of the public repo.
- Public docs and UI should not link to private project docs.
