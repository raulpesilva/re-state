import { Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import 'nextra-theme-docs/style.css';

export const metadata = {
  metadataBase: new URL('https://restate.vercel.app'),
  title: {
    default: 're-state documentation',
    template: '%s – re-state',
  },
  description: 'Provider-free shared state for React and React Native.',
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 're-state documentation',
    description: 'Provider-free shared state for React and React Native.',
    type: 'website',
  },
};

const navbar = <Navbar logo={<strong>re-state</strong>} projectLink="https://github.com/raulpesilva/re-state" />;

const footer = <Footer>MIT {new Date().getFullYear()} © Raul Pereira da Silva.</Footer>;

export default async function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/raulpesilva/re-state/tree/master/docs"
          footer={footer}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
