import { useState, FormEvent } from 'react';
import styles from './CreatePostCard.module.css';

type Props = {
  onCreate: (title: string, content: string) => Promise<void>;
};

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.';
}

export function CreatePostCard({ onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      await onCreate(title.trim(), content.trim());
      setTitle('');
      setContent('');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <section className={styles.card} aria-labelledby="create-title">
      <h2 id="create-title" className={styles.title}>
        What's on your mind?
      </h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label} htmlFor="post-title">
          Title
        </label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(e) => { setTitle(e.target.value); clearError(); }}
          placeholder="Hello world"
          className={styles.input}
          disabled={submitting}
          aria-label="Post title"
        />
        <label className={styles.label} htmlFor="post-content">
          Content
        </label>
        <textarea
          id="post-content"
          value={content}
          onChange={(e) => { setContent(e.target.value); clearError(); }}
          placeholder="Content here"
          className={styles.textarea}
          rows={4}
          disabled={submitting}
          aria-label="Post content"
        />
        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}
        <button
          type="submit"
          className={styles.createButton}
          disabled={!canSubmit}
          aria-disabled={!canSubmit}
        >
          Create
        </button>
      </form>
    </section>
  );
}
