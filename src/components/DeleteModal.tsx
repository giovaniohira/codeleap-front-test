import type { Post } from '@/api/client';
import styles from './Modal.module.css';

type Props = {
  post: Post | null;
  onConfirm: () => void;
  onCancel: () => void;
};

export function DeleteModal({ post, onConfirm, onCancel }: Props) {
  if (!post) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-title"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className={styles.modal}>
        <h2 id="delete-title" className={styles.title}>
          Are you sure you want to delete this item?
        </h2>
        <div className={styles.actions}>
          <button
            type="button"
            onClick={onCancel}
            className={styles.cancelButton}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={styles.deleteButton}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
