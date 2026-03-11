import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from './client';

describe('api client', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });

  it('getPosts returns results from server', async () => {
    const mockResults = [
      {
        id: 1,
        username: 'a',
        created_datetime: '2025-03-10T10:00:00Z',
        title: 'First',
        content: 'C1',
      },
    ];
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify({ results: mockResults })),
    });

    const result = await api.getPosts();
    expect(result.results).toHaveLength(1);
    expect(result.results![0]).toEqual(mockResults[0]);
  });

  it('createPost sends POST with payload', async () => {
    const created = {
      id: 1,
      username: 'u',
      created_datetime: '2025-03-10T12:00:00Z',
      title: 'T',
      content: 'C',
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(created)),
    });

    const result = await api.createPost({
      username: 'u',
      title: 'T',
      content: 'C',
    });
    expect(result).toEqual(created);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('careers'),
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({ username: 'u', title: 'T', content: 'C' }),
      })
    );
  });

  it('updatePost sends PATCH with id in URL', async () => {
    const updated = {
      id: 1,
      username: 'u',
      created_datetime: '2025-03-10T12:00:00Z',
      title: 'T2',
      content: 'C2',
    };
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(JSON.stringify(updated)),
    });

    await api.updatePost(1, { title: 'T2', content: 'C2' });
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/1\/?$/),
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({ title: 'T2', content: 'C2' }),
      })
    );
  });

  it('deletePost sends DELETE with id in URL', async () => {
    (fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve(''),
    });

    await api.deletePost(1);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/\/1\/?$/),
      expect.objectContaining({ method: 'DELETE' })
    );
  });
});
