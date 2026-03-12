import { useState, useEffect, FormEvent } from 'react';
import type { Post } from '@/api';
import styles from './Modal.module.css';

type Props = {
  post: Post | null;
  onSave: (title: string, content: string) => Promise<void>;
  onCancel: () => void;
};

function getErrorMessage(err: unknown): string {
  return err instanceof Error ? err.message : 'Something went wrong. Please try again.';
}

export function EditModal({ post, onSave, onCancel }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setError(null);
    }
  }, [post]);

  if (!post) return null;

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError(null);
    setSubmitting(true);
    try {
      await onSave(title.trim(), content.trim());
      onCancel();
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-title"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className={styles.modal}>
        <h2 id="edit-title" className={styles.title}>
          Edit item
        </h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="edit-title-input">
            Title
          </label>
          <input
            id="edit-title-input"
            type="text"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setError(null); }}
            placeholder="Hello world"
            className={styles.input}
            disabled={submitting}
          />
          <label className={styles.label} htmlFor="edit-content-input">
            Content
          </label>
          <textarea
            id="edit-content-input"
            value={content}
            onChange={(e) => { setContent(e.target.value); setError(null); }}
            placeholder="Content here"
            className={styles.textarea}
            rows={4}
            disabled={submitting}
          />
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          <div className={styles.actions}>
            <button
              type="button"
              onClick={onCancel}
              className={styles.cancelButton}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={styles.saveButton}
              disabled={!canSubmit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
