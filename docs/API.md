# API integration

## Base URL

- Production: `https://dev.codeleap.co.uk/careers/`
- All requests must use a **trailing slash** to avoid CORS/redirect issues with Django.

## Data types

### Post (from server)

```ts
{
  id: number;
  username: string;
  created_datetime: string;  // ISO 8601
  title: string;
  content: string;
}
```

### Create payload

```ts
{
  username: string;
  title: string;
  content: string;
}
```

### Update payload (PATCH)

```ts
{
  title: string;
  content: string;
}
```

Only `title` and `content` can be updated. `id`, `username`, and `created_datetime` are read-only.

## Endpoints

| Method | URL | Body | Response |
|--------|-----|------|----------|
| GET | `https://dev.codeleap.co.uk/careers/` | — | `{ count, next, previous, results: Post[] }` |
| POST | `https://dev.codeleap.co.uk/careers/` | Create payload | `Post` |
| PATCH | `https://dev.codeleap.co.uk/careers/{id}/` | Update payload | `Post` |
| DELETE | `https://dev.codeleap.co.uk/careers/{id}/` | — | No body |

## Client usage

The app uses `src/api/client.ts`:

- `api.getPosts()` → list
- `api.createPost(payload)` → create
- `api.updatePost(id, { title, content })` → update
- `api.deletePost(id)` → delete

React Query is used in `src/hooks/usePosts.ts` for caching and invalidation after mutations.
