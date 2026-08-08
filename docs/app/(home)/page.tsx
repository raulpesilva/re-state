import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shared state without providers',
  description: 'A tiny, typed shared state library for React and React Native. No providers, reducers, or boilerplate.',
};

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-2">
    <path d="M4 10h11M11 5l5 5-5 5" />
  </svg>
);

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero relative isolate overflow-hidden border-b border-fd-border">
        <div aria-hidden="true" className="home-grid absolute inset-0 -z-20" />
        <div aria-hidden="true" className="home-glow absolute -z-10" />

        <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] w-full max-w-[1400px] grid-cols-[minmax(0,1fr)] items-center gap-16 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:px-12 lg:py-24">
          <div className="home-hero-copy min-w-0 max-w-3xl">
            <div className="home-kicker mb-8 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fd-muted-foreground">
              <span className="home-status-dot" />
              React &amp; React Native · v1.2.33
            </div>

            <h1 className="max-w-4xl font-mono text-[clamp(3rem,6.3vw,6.75rem)] font-semibold leading-[0.88] tracking-[-0.075em] text-fd-foreground">
              Share state.
              <span className="mt-2 block text-[#1596ff]">Skip the ceremony.</span>
            </h1>

            <p className="mt-9 max-w-2xl text-lg leading-8 text-fd-muted-foreground sm:text-xl">
              A tiny external store with the mental model of <code className="home-inline-code">useState</code>. Share
              values by key, generate typed state modules, and update from anywhere — without mounting a provider.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/docs"
                className="home-primary-action inline-flex h-12 items-center justify-center gap-2 rounded-full bg-fd-primary px-6 text-sm font-semibold text-fd-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                Read the documentation
                <Arrow />
              </Link>
              <a
                href="https://github.com/raulpesilva/re-state"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full border border-fd-border bg-fd-background/60 px-6 text-sm font-medium text-fd-foreground backdrop-blur transition-colors hover:bg-fd-accent"
              >
                View on GitHub
              </a>
            </div>

            <div className="home-install mt-12 flex w-fit items-center gap-4 border-l-2 border-[#1596ff] bg-fd-card/60 px-4 py-3 font-mono text-sm backdrop-blur">
              <span className="select-none text-[#1596ff]">$</span>
              <code>pnpm add @raulpesilva/re-state</code>
            </div>
          </div>

          <div className="home-code-wrap relative mx-auto min-w-0 w-full max-w-2xl lg:mx-0">
            <div aria-hidden="true" className="home-code-orbit" />
            <div className="home-code-panel relative overflow-hidden rounded-2xl border border-fd-border bg-[#050505]/95 shadow-2xl shadow-black/50">
              <div className="flex h-12 items-center border-b border-white/10 px-5">
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-white/20" />
                  <span className="size-2 rounded-full bg-[#1596ff]" />
                </div>
                <span className="mx-auto font-mono text-[11px] text-white/45">states/counter.ts</span>
                <span className="w-9 text-right font-mono text-[10px] text-[#1596ff]">TS</span>
              </div>

              <pre className="overflow-x-auto p-5 text-[13px] leading-7 sm:p-7 sm:text-sm">
                <code className="font-mono text-white/85">
                  <span className="text-[#ff7b9c]">import</span> {'{'}
                  {'\n  '}createReStateMethods,
                  {'\n'}
                  {'}'} <span className="text-[#ff7b9c]">from</span>{' '}
                  <span className="text-[#9bdcff]">'@raulpesilva/re-state'</span>;{'\n\n'}
                  <span className="text-[#7dd3fc]">export const</span> {'{'}
                  {'\n  '}useCounter,
                  {'\n  '}useCounterSelect,
                  {'\n  '}dispatchCounter,
                  {'\n  '}getCounter,
                  {'\n  '}resetCounter,
                  {'\n'}
                  {'}'} = <span className="text-[#ffd580]">createReStateMethods</span>({'\n  '}
                  <span className="text-[#9bdcff]">'counter'</span>,{'\n  '}
                  <span className="text-[#c4a7ff]">0</span>,{'\n'});
                </code>
              </pre>

              <div className="grid grid-cols-3 border-t border-white/10 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                <div className="border-r border-white/10 px-4 py-3">typed</div>
                <div className="border-r border-white/10 px-4 py-3">provider-free</div>
                <div className="px-4 py-3">1 import</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-fd-border bg-fd-card/30">
        <div className="mx-auto grid max-w-[1400px] divide-y divide-fd-border border-x border-fd-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {[
            ['01', 'No provider', 'Import a hook and share a key. There is no context tree to wrap or maintain.'],
            [
              '02',
              'Read or write anywhere',
              'Hooks inside React; typed dispatchers and getters in every other module.',
            ],
            ['03', 'One API, every surface', 'React DOM, React Native, Expo, Windows, macOS, ESM, and CommonJS.'],
          ].map(([index, title, description]) => (
            <article key={index} className="home-principle group min-h-64 p-7 sm:p-10">
              <span className="font-mono text-xs tracking-[0.18em] text-[#1596ff]">{index}</span>
              <h2 className="mt-14 text-2xl font-semibold tracking-tight text-fd-foreground">{title}</h2>
              <p className="mt-4 max-w-sm leading-7 text-fd-muted-foreground">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
        <div className="mx-auto grid max-w-[1200px] gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#1596ff]">A deliberately small surface</p>
            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.04em] text-fd-foreground sm:text-5xl">
              Start small.
              <br />
              Scale by composition.
            </h2>
          </div>

          <div className="divide-y divide-fd-border border-y border-fd-border">
            {[
              ['useReState', 'The familiar tuple for one shared value.', '/docs/methods/useReState'],
              [
                'createReStateMethods',
                'A complete, named state module in one call.',
                '/docs/methods/createReStateMethods',
              ],
              [
                'useReStateSelector',
                'Derived values across the complete keyed store.',
                '/docs/methods/useReStateSelector',
              ],
            ].map(([name, description, href]) => (
              <Link
                key={name}
                href={href}
                className="group grid gap-2 py-7 transition-colors hover:text-[#1596ff] sm:grid-cols-[1fr_1fr_auto] sm:items-center sm:gap-8"
              >
                <code className="font-mono text-sm font-semibold">{name}</code>
                <span className="text-sm text-fd-muted-foreground">{description}</span>
                <span className="transition-transform group-hover:translate-x-1">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-fd-border bg-[#1596ff] px-5 py-16 text-black sm:px-8">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] opacity-65">Ready when you are</p>
            <h2 className="mt-3 text-3xl font-bold tracking-[-0.04em] sm:text-4xl">
              Your first shared state is one minute away.
            </h2>
          </div>
          <Link
            href="/docs/getting-started/install"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
          >
            Install re-state
            <Arrow />
          </Link>
        </div>
      </section>

      <footer className="px-5 py-10 sm:px-8">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 text-sm text-fd-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo.svg" alt="" width={24} height={24} className="size-6 object-contain" />
            <span>re-state · MIT licensed</span>
          </div>
          <div className="flex gap-6">
            <Link href="/docs">Documentation</Link>
            <a href="https://www.npmjs.com/package/@raulpesilva/re-state">npm</a>
            <a href="https://github.com/raulpesilva/re-state">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
