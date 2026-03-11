const STORAGE_KEY = 'codeleap_username';

export function getStoredUsername(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '';
  } catch {
    return '';
  }
}

export function setStoredUsername(username: string): void {
  try {
    if (username.trim()) {
      localStorage.setItem(STORAGE_KEY, username.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // ignore
  }
}
