import type { Post } from '@/api';
import { usePostsQuery } from '@/hooks';
import { PostCard } from './PostCard';
import styles from './PostList.module.css';

type Props = {
  currentUsername: string;
  onEdit: (post: Post) => void;
  onDelete: (post: Post) => void;
};

export function PostList({
  currentUsername,
  onEdit,
  onDelete,
}: Props) {
  const { data: posts = [], isLoading, isError, error } = usePostsQuery();

  if (isLoading) {
    return (
      <div className={styles.state} aria-live="polite">
        Loading posts…
      </div>
    );
  }

  if (isError) {
    return (
      <div className={styles.state} role="alert">
        Failed to load posts: {error instanceof Error ? error.message : 'Unknown error'}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.state} aria-live="polite">
        No posts yet. Create one above!
      </div>
    );
  }

  return (
    <ul className={styles.list} aria-label="Posts">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard
            post={post}
            currentUsername={currentUsername}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  );
}
