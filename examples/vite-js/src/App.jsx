import { SimpleUsage, ToDo } from './components';
import styles from './App.module.css';

export default function App() {
  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <div className={styles.logo} aria-hidden="true">
          re
        </div>
        <div>
          <p className={styles.eyebrow}>@raulpesilva/re-state</p>
          <h1>Shared state, kept simple.</h1>
          <p className={styles.intro}>
            Two small React examples showing shared state, actions, and selectors in practice.
          </p>
        </div>
      </header>

      <div className={styles.examples}>
        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.eyebrow}>Example 01</p>
            <h2>SimpleUsage</h2>
            <p>Both components read the same value, while one of them owns the update actions.</p>
          </div>
          <SimpleUsage />
        </section>

        <section className={styles.card}>
          <div className={styles.cardHeader}>
            <p className={styles.eyebrow}>Example 02</p>
            <h2>ToDo</h2>
            <p>A small store with actions for updates and selectors for derived counts.</p>
          </div>
          <ToDo />
        </section>
      </div>
    </main>
  );
}
