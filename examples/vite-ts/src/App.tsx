import type { ReactElement } from 'react';

import { SimpleUsage, ToDo } from './components';
import styles from './index.module.css';
import logo from './assets/logo.svg';

export default function App(): ReactElement {
  return (
    <div className={styles.app}>
      <img src={logo} alt="re-state logo" className={styles.logo} />
      <main className={styles.content}>
        <SimpleUsage />
        <ToDo />
      </main>
    </div>
  );
}
