import Image from 'next/image';
import type { ReactElement } from 'react';
import { ToDo } from '../components';
import styles from './page.module.css';

export default function Home(): ReactElement {
  return (
    <main className={styles.container}>
      <Image src="/logo.svg" alt="Re-state Logo" width={300} height={300} priority />
      <ToDo />
    </main>
  );
}
