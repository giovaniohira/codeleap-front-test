import styles from './Layout.module.css';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';

type Props = {
  children: React.ReactNode;
};

export function Layout({ children }: Props) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          <Logo />
        </h1>
        <ThemeToggle />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
}
