import { useReState } from '@raulpesilva/re-state';
import styles from './index.module.css';

const Foo = () => {
  const [value, setValue] = useReState<number>('value', 0);

  return (
    <div className={styles.actions}>
      <button className={styles.button} onClick={() => setValue(value > 0 ? value - 1 : 0)}>
        -
      </button>
      <p className={styles.display}>
        <span className={styles.text}>Foo - State value: </span>
        <strong className={styles.value}>{value}</strong>
      </p>
      <button className={styles.button} onClick={() => setValue((prevValue) => prevValue + 1)}>
        +
      </button>
    </div>
  );
};

const Bar = () => {
  const [value] = useReState<number>('value', 0);

  return (
    <div className={styles.container}>
      <p className={styles.display}>
        <span className={styles.text}>Bar - State value: </span>
        <strong className={styles.value}>{value}</strong>
      </p>
    </div>
  );
};

export const SimpleUsage = () => {
  return (
    <div className={styles.simpleUsage}>
      <Foo />
      <Bar />
    </div>
  );
};
