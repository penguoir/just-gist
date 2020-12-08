import styles from '../styles/file.module.css'

import { useMarked } from 'use-marked-hook'

const File = ({ filename, markdown }) => {
  const content = useMarked(markdown)

  return (
    <div className={styles.file}>
      <div className={styles.file_content} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default File
