import { useState, FormEvent } from 'react';
import { setStoredUsername } from '@/lib/username';
import { ThemeToggle } from './ThemeToggle';
import styles from './SignupModal.module.css';

type Props = {
  onEnter: (username: string) => void;
};

export function SignupModal({ onEnter }: Props) {
  const [username, setUsername] = useState('');

  const trimmed = username.trim();
  const canSubmit = trimmed.length > 0;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setStoredUsername(trimmed);
    onEnter(trimmed);
  };

  return (
    <div className={styles.overlay} role="dialog" aria-labelledby="signup-title">
      <div className={styles.toggleWrap}>
        <ThemeToggle />
      </div>
      <div className={styles.modal}>
        <h1 id="signup-title" className={styles.title}>
          Welcome to CodeLeap network!
        </h1>
        <p className={styles.prompt}>Please enter your username</p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className={styles.input}
            autoFocus
            autoComplete="username"
            aria-label="Username"
          />
          <button
            type="submit"
            className={styles.enterButton}
            disabled={!canSubmit}
            aria-disabled={!canSubmit}
          >
            ENTER
          </button>
        </form>
      </div>
    </div>
  );
}
