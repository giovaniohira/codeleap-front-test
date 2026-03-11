import { useState, FormEvent } from 'react';
import styles from './CreatePostCard.module.css';

type Props = {
  onCreate: (title: string, content: string) => Promise<void>;
};

export function CreatePostCard({ onCreate }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit =
    title.trim().length > 0 && content.trim().length > 0 && !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    try {
      await onCreate(title.trim(), content.trim());
      setTitle('');
      setContent('');
    } finally {
      setSubmitting(false);
    }
  };

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
          onChange={(e) => setTitle(e.target.value)}
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
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content here"
          className={styles.textarea}
          rows={4}
          disabled={submitting}
          aria-label="Post content"
        />
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
