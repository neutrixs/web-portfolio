import React from 'react'
import Introduction from './introduction'
import styles from './style.module.scss'

export default function MainPage() {
    return (
        <div className={styles.fixedContainer}>
            <div className={styles.slidesContainer}>
                <Introduction />
            </div>
        </div>
    )
}
