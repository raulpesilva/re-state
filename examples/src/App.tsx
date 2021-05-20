import { AdvancedUsage, SimpleUsage } from './components'
import styles from './index.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <SimpleUsage />
      <AdvancedUsage />
    </div>
  )
}
