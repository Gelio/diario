import { FunctionComponent } from 'react';

import styles from './header.module.css';

export const Header: FunctionComponent = () => {
  return (
    <header className={styles.container}>
      <div className="centered-content with-borders">
        <div className={styles.content}>
          <span className={styles['app-name']}>Diario</span>
        </div>
        <hr className={styles['bottom-border']} />
      </div>
    </header>
  );
};
