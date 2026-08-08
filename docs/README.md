# re-state documentation site

The public documentation is a Fumadocs site running on the Next.js App Router with the official `black` color theme.
Its dependencies and lockfile are kept inside this directory so documentation changes do not affect the library or
examples workspace.

## Requirements

- Node.js 22.18 or newer
- pnpm 11.7.0

## Local development

From `docs/`:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open <http://localhost:3000> for the presentation home and <http://localhost:3000/docs> for the documentation.
Documentation pages and navigation metadata live in `content/`; the site layout lives in `app/`, and the Fumadocs
content source lives in `utils/source.ts`.

## Validate

```sh
pnpm check
```

The check runs Oxfmt, Oxlint, and a production Next.js build. Use `pnpm format` to apply documentation formatting.

The nested `pnpm-workspace.yaml` keeps these commands isolated from the library and examples workspace. The library
version is managed only by the repository root package, and building this site does not publish it.
