import { ProgressBar } from 'react-loader-spinner'
import styles from './Loader.module.css'

const Loader = () => {
  return (
    <div className={styles.loader_container}>
      <ProgressBar
        visible={true}
        height="120"
        width="120"
        barColor="#f4e8e8"
        borderColor="#060606"
      />
    </div>
  )
}

export default Loader
