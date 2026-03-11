import { useState, useCallback, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getStoredUsername } from '@/lib/username';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { SignupModal } from '@/components/auth/SignupModal';
import { Layout } from '@/components/layout/Layout';
import { CreatePostCard } from '@/components/posts/CreatePostCard';
import { PostList } from '@/components/posts/PostList';
import { DeleteModal } from '@/components/posts/DeleteModal';
import { EditModal } from '@/components/posts/EditModal';
import type { Post } from '@/api/client';
import {
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} from '@/hooks/usePosts';

const queryClient = new QueryClient();

function AppContent() {
  const [username, setUsername] = useState(getStoredUsername);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);

  const createPost = useCreatePostMutation();
  const updatePost = useUpdatePostMutation();
  const deletePost = useDeletePostMutation();

  const handleCreatePost = useCallback(
    async (title: string, content: string) => {
      await createPost.mutateAsync({ username, title, content });
    },
    [username, createPost]
  );

  const handleUpdatePost = useCallback(
    async (title: string, content: string) => {
      if (!postToEdit) return;
      await updatePost.mutateAsync({
        id: postToEdit.id,
        payload: { title, content },
      });
      setPostToEdit(null);
    },
    [postToEdit, updatePost]
  );

  const handleConfirmDelete = useCallback(async () => {
    if (!postToDelete) return;
    await deletePost.mutateAsync(postToDelete.id);
    setPostToDelete(null);
  }, [postToDelete, deletePost]);

  if (!username) {
    return <SignupModal onEnter={setUsername} />;
  }

  return (
    <>
      <Layout>
        <CreatePostCard onCreate={handleCreatePost} />
        <PostList
          currentUsername={username}
          onEdit={setPostToEdit}
          onDelete={setPostToDelete}
        />
      </Layout>
      <DeleteModal
        post={postToDelete}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPostToDelete(null)}
      />
      <EditModal
        post={postToEdit}
        onSave={handleUpdatePost}
        onCancel={() => setPostToEdit(null)}
      />
    </>
  );
}

type LoadingPhase = 'visible' | 'exiting' | 'done';

export default function App() {
  const [loadingPhase, setLoadingPhase] = useState<LoadingPhase>('visible');

  useEffect(() => {
    const startExit = setTimeout(() => setLoadingPhase('exiting'), 1000);
    const unmount = setTimeout(() => setLoadingPhase('done'), 1350);
    return () => {
      clearTimeout(startExit);
      clearTimeout(unmount);
    };
  }, []);

  return (
    <ThemeProvider>
      {loadingPhase !== 'done' && (
        <LoadingScreen exiting={loadingPhase === 'exiting'} />
      )}
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
