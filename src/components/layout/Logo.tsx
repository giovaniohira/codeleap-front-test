import styles from './Logo.module.css';

export function Logo() {
  return (
    <img
      src="/codeleap-logo.png"
      alt="CodeLeap Network"
      className={styles.logo}
    />
  );
}
