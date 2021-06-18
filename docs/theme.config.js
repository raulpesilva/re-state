const config = {
  repository: 'https://github.com/raulpesilva/re-state', // project repo
  docsRepository: 'https://github.com/raulpesilva/re-state', // docs repo
  branch: 'master', // branch of docs
  path: '/', // path of docs
  titleSuffix: ' – ReState',
  nextLinks: true,
  prevLinks: true,
  search: true,
  customSearch: null, // customizable, you can use algolia for example
  darkMode: true,
  footer: true,
  footerText: `MIT ${new Date().getFullYear()} © Raul Pereira da Silva.`,
  footerEditOnGitHubLink: true, // will link to the docs repo
  logo: (
    <>
      <span className="mr-2 font-extrabold hidden md:inline">ReState</span>
      <span className="text-gray-600 font-normal hidden md:inline">Manage State in React</span>
    </>
  ),
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="ReState: the next docs builder" />
      <meta name="og:title" content="ReState: the next docs builder" />
    </>
  ),
}

export default config
