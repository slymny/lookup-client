import React from 'react'
import styles from './ErrorHandling.module.css'

function ErrorHandling({msg}) {
  return (
    <div className={styles.error}>
      <h1>{msg}</h1>
    </div>
  )
}

export default ErrorHandling
