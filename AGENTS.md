# AGENTS.md

## Build & Test Commands

- **Install**: `pnpm install`
- **Test all**: `pnpm test`
- **Test single file**: `pnpm test -- path/to/file.spec.ts`
- **Test watch mode**: `pnpm test:dev`
- **Test with coverage**: `pnpm test:coverage`
- **Typecheck**: `pnpm typecheck`
- **Lint**: `pnpm lint`
- **Format check**: `pnpm format:check`
- **Full check**: `pnpm check`
- **Build**: `pnpm build`

## Code Style

- **Formatting**: Oxfmt with 2-space indent, single quotes, semicolons, trailing commas (es5), 120 char line width
- **Linting**: Oxlint; keep the correctness category error-free
- **Types**: Strict TypeScript (`strict: true`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`)
- **Naming**: camelCase for variables/functions, PascalCase for classes/types, prefix type params with `T` (e.g., `TListener`)
- **Imports**: Relative imports within modules, use `export *` for barrel files, named exports preferred
- **Tests**: Vitest with `.spec.ts` extension, explicit imports from `vitest`, `vi.fn()` for mocks, reset state in `afterEach`
- **Error handling**: Use TypeScript's type system; `@ts-ignore`/`@ts-expect-error` only for intentional test cases
- **Functions**: Arrow functions with explicit return types for public APIs, type parameters for generics
