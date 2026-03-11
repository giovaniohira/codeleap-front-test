const BASE_URL = 'https://dev.codeleap.co.uk/careers/';

export type Post = {
  id: number;
  username: string;
  created_datetime: string;
  title: string;
  content: string;
};

export type CreatePostPayload = {
  username: string;
  title: string;
  content: string;
};

export type UpdatePostPayload = {
  title: string;
  content: string;
};

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const base = BASE_URL.endsWith('/') ? BASE_URL : `${BASE_URL}/`;
  const url = path.startsWith('http') ? path : base + (path && !path.endsWith('/') ? `${path}/` : path);
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

export const api = {
  getPosts(): Promise<{ results: Post[] }> {
    return request('');
  },

  createPost(payload: CreatePostPayload): Promise<Post> {
    return request('', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  updatePost(id: number, payload: UpdatePostPayload): Promise<Post> {
    return request(`${id}/`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    });
  },

  deletePost(id: number): Promise<void> {
    return request(`${id}/`, { method: 'DELETE' });
  },
};
