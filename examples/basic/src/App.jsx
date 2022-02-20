import { ToDo } from './components';
import styles from './index.module.css';
import logo from './assets/logo.svg';

export default function App() {
  return (
    <div className={styles.app}>
      <img src={logo} alt="re-state logo" className={styles.logo} />
      <ToDo />
    </div>
  );
}
