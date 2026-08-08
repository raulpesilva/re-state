import Image from 'next/image';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

const brand = (showDocsLabel: boolean) => (
  <span className="flex items-center gap-2.5">
    <Image src="/logo.svg" alt="" width={24} height={24} className="size-6 object-contain" priority />
    <span className="font-semibold tracking-tight">re-state</span>
    {showDocsLabel && <span className="hidden text-xs font-normal text-fd-muted-foreground sm:inline">docs</span>}
  </span>
);

export function baseOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/raulpesilva/re-state',
    nav: {
      title: brand(true),
      url: '/',
    },
  };
}

export function homeOptions(): BaseLayoutProps {
  return {
    githubUrl: 'https://github.com/raulpesilva/re-state',
    links: [
      {
        text: 'Documentation',
        url: '/docs',
      },
      {
        text: 'API Reference',
        url: '/docs/methods/createReStateMethods',
      },
    ],
    nav: {
      title: brand(false),
      transparentMode: 'top',
      url: '/',
    },
    searchToggle: {
      enabled: false,
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
