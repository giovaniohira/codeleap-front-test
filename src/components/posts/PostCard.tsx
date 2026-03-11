import type { Post } from '@/api';
import { getRelativeTime } from '@/lib';
import styles from './PostCard.module.css';

type Props = {
  post: Post;
  currentUsername: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
};

export function PostCard({ post, currentUsername, onEdit, onDelete }: Props) {
  const isOwner =
    currentUsername.trim().toLowerCase() === post.username.trim().toLowerCase();

  return (
    <article className={styles.card} data-post-id={post.id}>
      <header className={styles.header}>
        <h3 className={styles.postTitle}>{post.title}</h3>
        {isOwner && (
          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => onDelete(post)}
              className={styles.iconButton}
              aria-label="Delete post"
            >
              <TrashIcon />
            </button>
            <button
              type="button"
              onClick={() => onEdit(post)}
              className={styles.iconButton}
              aria-label="Edit post"
            >
              <EditIcon />
            </button>
          </div>
        )}
      </header>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.author}>@{post.username}</span>
          <span className={styles.time}>
            {getRelativeTime(post.created_datetime)}
          </span>
        </div>
        <p className={styles.content}>{post.content}</p>
      </div>
    </article>
  );
}

function TrashIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14z" />
      <path d="M10 11v6M14 11v6" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
