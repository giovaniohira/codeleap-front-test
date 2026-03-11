import styles from './LoadingScreen.module.css';
import { Logo } from './Logo';

type Props = {
  exiting?: boolean;
};

export function LoadingScreen({ exiting = false }: Props) {
  return (
    <div
      className={`${styles.overlay} ${exiting ? styles.exiting : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.content}>
        <div className={styles.title}>
          <Logo />
        </div>
        <div className={styles.spinner} aria-hidden />
      </div>
    </div>
  );
}
