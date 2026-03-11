import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api, type Post, type CreatePostPayload, type UpdatePostPayload } from '@/api/client';

const QUERY_KEY = ['posts'] as const;

function sortByNewestFirst(posts: Post[]): Post[] {
  return [...posts].sort(
    (a, b) =>
      new Date(b.created_datetime).getTime() -
      new Date(a.created_datetime).getTime()
  );
}

export function usePostsQuery() {
  return useQuery({
    queryKey: QUERY_KEY,
    queryFn: async () => {
      const { results } = await api.getPosts();
      return sortByNewestFirst(results ?? []);
    },
  });
}

export function useCreatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreatePostPayload) => api.createPost(payload),
    onSuccess: (newPost) => {
      queryClient.setQueryData<Post[]>(QUERY_KEY, (prev = []) =>
        sortByNewestFirst([newPost, ...prev])
      );
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useUpdatePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePostPayload }) =>
      api.updatePost(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeletePostMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}
