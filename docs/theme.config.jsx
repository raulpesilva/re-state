export default {
  logo: <span className="font-extrabold hidden md:inline">Re-state - Manage State in React</span>,
  project: {
    link: 'https://github.com/raulpesilva/re-state',
  },
  docsRepositoryBase: 'https://github.com/raulpesilva/re-state/tree/master/docs',
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="Re-state: Manage State in React" />
      <meta name="og:title" content="Re-state: Manage State in React" />
    </>
  ),
  footer: {
    text: `MIT ${new Date().getFullYear()} © Raul Pereira da Silva.`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – re-state',
    };
  },
};
