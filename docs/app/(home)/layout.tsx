import type { ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { homeOptions } from '@/utils/layout.shared';
import './home.css';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout {...homeOptions()} className="dark">
      {children}
    </HomeLayout>
  );
}
