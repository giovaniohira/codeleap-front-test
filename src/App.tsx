import { useState, useCallback, useEffect } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import type { Post } from '@/api';
import { Layout, LoadingScreen } from '@/components/layout';
import { SignupModal } from '@/components/auth';
import { CreatePostCard, PostList, DeleteModal, EditModal } from '@/components/posts';
import { ThemeProvider } from '@/contexts';
import { useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from '@/hooks';
import { getStoredUsername, queryClient } from '@/lib';

function AppContent() {
  const [username, setUsername] = useState(getStoredUsername);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const [postToEdit, setPostToEdit] = useState<Post | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

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
    setDeleteError(null);
    try {
      await deletePost.mutateAsync(postToDelete.id);
      setPostToDelete(null);
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : 'Failed to delete. Please try again.');
    }
  }, [postToDelete, deletePost]);

  const handleCancelDelete = useCallback(() => {
    setPostToDelete(null);
    setDeleteError(null);
  }, []);

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
        onCancel={handleCancelDelete}
        error={deleteError}
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
