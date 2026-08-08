import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/utils/layout.shared';
import { source } from '@/utils/source';

export default function DocumentationLayout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout {...baseOptions()} tree={source.getPageTree()} sidebar={{ defaultOpenLevel: 1 }}>
      {children}
    </DocsLayout>
  );
}
