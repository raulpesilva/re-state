# AGENTS.md

## Build & Test Commands
- **Install**: `pnpm install`
- **Test all**: `pnpm test`
- **Test single file**: `pnpm test -- path/to/file.spec.ts`
- **Test watch mode**: `pnpm test:dev`
- **Build**: `pnpm build`

## Code Style
- **Formatting**: Prettier with 2-space indent, single quotes, semicolons, trailing commas (es5), 120 char line width
- **Types**: Strict TypeScript (`strict: true`, `noImplicitAny`, `noUnusedLocals`, `noUnusedParameters`, `noUncheckedIndexedAccess`)
- **Naming**: camelCase for variables/functions, PascalCase for classes/types, prefix type params with `T` (e.g., `TListener`)
- **Imports**: Relative imports within modules, use `export *` for barrel files, named exports preferred
- **Tests**: Jest with `.spec.ts` extension, use `describe`/`test` blocks, `jest.fn()` for mocks, reset state in `afterEach`
- **Error handling**: Use TypeScript's type system; `@ts-ignore`/`@ts-expect-error` only for intentional test cases
- **Functions**: Arrow functions with explicit return types for public APIs, type parameters for generics
