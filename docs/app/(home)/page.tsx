import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from 'fumadocs-ui/components/codeblock';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'fumadocs-ui/components/tabs';
import { HomeCodeShowcase } from '../../components/home-code-showcase';

export const metadata: Metadata = {
  title: 'Shared state without providers',
  description: 'A tiny, typed shared state library for React and React Native. No providers, reducers, or boilerplate.',
};

const Arrow = () => (
  <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4 fill-none stroke-current stroke-2">
    <path d="M4 10h11M11 5l5 5-5 5" />
  </svg>
);

const packageCommands = [
  ['npm', 'npm install @raulpesilva/re-state'],
  ['pnpm', 'pnpm add @raulpesilva/re-state'],
  ['yarn', 'yarn add @raulpesilva/re-state'],
  ['bun', 'bun add @raulpesilva/re-state'],
] as const;

export default function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero relative isolate overflow-hidden border-b border-fd-border">
        <div aria-hidden="true" className="home-grid absolute inset-0 -z-20" />
        <div aria-hidden="true" className="home-glow absolute -z-10" />

        <div className="home-hero-sheet mx-auto w-full max-w-[1500px]">
          <div className="home-hero-layout">
            <div className="home-hero-copy min-w-0">
              <p className="home-hero-overline">PROVIDER-FREE SHARED STATE</p>
              <h1>
                Shared state,
                <span>drawn to spec.</span>
              </h1>

              <p className="home-hero-description">
                A tiny external store with the mental model of <code className="home-inline-code">useState</code>.
                Define a keyed module once, then read, select, and update it from any React or React Native surface.
              </p>

              <div className="home-hero-actions">
                <Link href="/docs" className="home-spec-action home-spec-action-primary">
                  <span className="home-spec-action-number">01</span>
                  <span>
                    <small>OPEN SPECIFICATION</small>
                    Read the documentation
                  </span>
                  <Arrow />
                </Link>
                <a
                  href="https://github.com/raulpesilva/re-state"
                  target="_blank"
                  rel="noreferrer"
                  className="home-spec-action"
                >
                  <span className="home-spec-action-number">02</span>
                  <span>
                    <small>INSPECT SOURCE</small>
                    View on GitHub
                  </span>
                  <Arrow />
                </a>
              </div>

              <div className="home-install-note">
                <span>N-01 / INSTALL</span>
                <Tabs defaultValue="npm" groupId="package-manager" persist className="home-install-tabs">
                  <TabsList aria-label="Choose a package manager">
                    {packageCommands.map(([manager]) => (
                      <TabsTrigger key={manager} value={manager}>
                        {manager}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {packageCommands.map(([manager, command]) => (
                    <TabsContent key={manager} value={manager}>
                      <CodeBlock className="home-install-codeblock">
                        <pre>
                          <code>{command}</code>
                        </pre>
                      </CodeBlock>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            </div>

            <div className="home-code-wrap relative min-w-0">
              <HomeCodeShowcase />
            </div>
          </div>

          <div className="home-hero-title-block" aria-label="Project specifications">
            <div>
              <span>RUNTIME</span>
              <strong>REACT / REACT NATIVE</strong>
            </div>
            <div>
              <span>ARCHITECTURE</span>
              <strong>EXTERNAL KEYED STORE</strong>
            </div>
            <div>
              <span>PROVIDER</span>
              <strong>NOT REQUIRED</strong>
            </div>
            <div>
              <span>LICENSE</span>
              <strong>MIT</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-principles" aria-labelledby="principles-title">
        <h2 id="principles-title" className="sr-only">
          Operating principles
        </h2>
        <div className="home-principles-sheet">
          {[
            ['01', 'No provider', 'Import a hook and share a key. There is no context tree to wrap or maintain.'],
            [
              '02',
              'Read or write anywhere',
              'Hooks inside React; typed dispatchers and getters in every other module.',
            ],
            ['03', 'One API, every surface', 'React DOM, React Native, Expo, Windows, macOS, ESM, and CommonJS.'],
          ].map(([index, title, description]) => (
            <article key={index} className="home-principle">
              <div className="home-principle-heading">
                <span>OPERATING DETAIL</span>
                <strong>{index}</strong>
              </div>
              <div className="home-principle-schematic" aria-hidden="true">
                <i />
                <i />
                <i />
                <span />
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-surface" aria-labelledby="surface-title">
        <div aria-hidden="true" className="home-surface-grid" />
        <div className="home-surface-sheet">
          <div className="home-surface-copy">
            <p>A DELIBERATELY SMALL SURFACE</p>
            <h2 id="surface-title">
              Start small.
              <span>Scale by composition.</span>
            </h2>
            <dl className="home-surface-meta">
              <div>
                <dt>ENTRY POINTS</dt>
                <dd>03</dd>
              </div>
              <div>
                <dt>COMPOSITION</dt>
                <dd>UNBOUNDED</dd>
              </div>
            </dl>
          </div>

          <div className="home-api-table">
            <div className="home-api-table-heading" aria-hidden="true">
              <span>REF</span>
              <span>METHOD / ENTRY POINT</span>
              <span>SPECIFICATION</span>
              <span>OPEN</span>
            </div>
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
            ].map(([name, description, href], index) => (
              <Link key={name} href={href} className="home-api-row group">
                <span className="home-api-index">{String(index + 1).padStart(2, '0')}</span>
                <code>{name}</code>
                <span>{description}</span>
                <span className="home-api-arrow">
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="get-started" className="home-final-cta">
        <div aria-hidden="true" className="home-final-cta-grid" />
        <div className="home-final-cta-sheet">
          <div className="home-final-cta-index">
            <span>CONSTRUCTION SET</span>
            <strong>01</strong>
          </div>
          <div className="home-final-cta-copy">
            <p>APPROVED FOR IMPLEMENTATION</p>
            <h2>Your first shared state is one minute away.</h2>
            <span>Follow the installation plan, define a key, and start importing the generated API.</span>
          </div>
          <Link href="/docs/getting-started/install" className="home-final-cta-action">
            <span>
              <small>NEXT DRAWING / I-01</small>
              Open installation plan
            </span>
            <Arrow />
          </Link>
          <div className="home-final-cta-stamp" aria-hidden="true">
            <span>RE-STATE</span>
            <strong>READY</strong>
            <small>NO PROVIDER</small>
          </div>
        </div>
      </section>

      <footer className="home-footer">
        <div className="home-footer-sheet">
          <div className="home-footer-brand">
            <Image src="/logo.svg" alt="" width={24} height={24} className="size-6 object-contain" />
            <span>
              <small>PROJECT / RE-STATE</small>
              <strong>re-state</strong>
            </span>
          </div>
          <div className="home-footer-license">
            <small>LICENSE</small>
            <strong>MIT / OPEN SOURCE</strong>
          </div>
          <nav className="home-footer-links" aria-label="Footer navigation">
            <Link href="/docs">
              <small>01</small>
              Documentation
            </Link>
            <a href="https://www.npmjs.com/package/@raulpesilva/re-state">
              <small>02</small>
              npm
            </a>
            <a href="https://github.com/raulpesilva/re-state">
              <small>03</small>
              GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
