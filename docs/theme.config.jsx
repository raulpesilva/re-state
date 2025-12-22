export default {
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">ReState</span>
      <span className="text-gray-600 font-normal hidden md:inline">Manage State in React</span>
    </>
  ),
  project: {
    link: 'https://github.com/raulpesilva/re-state',
  },
  docsRepositoryBase: 'https://github.com/raulpesilva/re-state/tree/master/docs',
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="ReState: the next docs builder" />
      <meta name="og:title" content="ReState: the next docs builder" />
    </>
  ),
  footer: {
    text: `MIT ${new Date().getFullYear()} © Raul Pereira da Silva.`,
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – ReState',
    }
  },
}
