import { useReState } from '@raulpesilva/re-state';
import styles from './index.module.css';

const Foo = () => {
  const [value, setValue] = useReState('value', 0);

  const decrement = () => setValue((currentValue) => Math.max(currentValue - 1, 0));
  const increment = () => setValue((currentValue) => currentValue + 1);

  return (
    <div className={styles.panel}>
      <div className={styles.display}>
        <span className={styles.label}>Foo</span>
        <strong className={styles.value}>{value}</strong>
      </div>
      <div className={styles.actions}>
        <button type="button" className={styles.button} onClick={decrement}>
          −
        </button>
        <button type="button" className={styles.button} onClick={increment}>
          +
        </button>
      </div>
    </div>
  );
};

const Bar = () => {
  const [value] = useReState('value', 0);

  return (
    <div className={styles.panel}>
      <div className={styles.display}>
        <span className={styles.label}>Bar reads the same state</span>
        <strong className={styles.value}>{value}</strong>
      </div>
    </div>
  );
};

export const SimpleUsage = () => (
  <div className={styles.simpleUsage}>
    <Foo />
    <Bar />
  </div>
);
